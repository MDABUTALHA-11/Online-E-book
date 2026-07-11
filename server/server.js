const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

// Enable CORS for frontend requests
// Update this with your actual React App URL when deploying (e.g. 'https://shaifly.com')
const ALLOWED_ORIGINS = [
  'http://localhost:5173', 
  'http://localhost:5174', 
  'https://shaifly.com',
  'https://shaifly-count-download.firebaseapp.com',
  'https://shaifly-count-download.web.app'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || ALLOWED_ORIGINS.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Middlewares to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mock Firestore classes for local development fallback when Firebase credentials are not configured
class MockDoc {
  constructor(data) {
    this.exists = data !== undefined;
    this._data = data;
  }
  data() {
    return this._data;
  }
}

class MockDocRef {
  constructor(collectionName, docId, store) {
    this.collectionName = collectionName;
    this.docId = docId;
    this.store = store;
  }
  async set(data) {
    this.store[this.collectionName] = this.store[this.collectionName] || {};
    const cleanedData = { ...data };
    for (let key in cleanedData) {
      if (typeof cleanedData[key] === 'function') {
        cleanedData[key] = new Date();
      }
    }
    this.store[this.collectionName][this.docId] = cleanedData;
    console.log(`[Mock DB] Set ${this.collectionName}/${this.docId}:`, cleanedData);
  }
  async get() {
    const coll = this.store[this.collectionName] || {};
    const data = coll[this.docId];
    return new MockDoc(data);
  }
  async update(data) {
    this.store[this.collectionName] = this.store[this.collectionName] || {};
    const current = this.store[this.collectionName][this.docId] || {};
    const cleanedData = { ...data };
    for (let key in cleanedData) {
      if (typeof cleanedData[key] === 'function') {
        cleanedData[key] = new Date();
      }
    }
    this.store[this.collectionName][this.docId] = { ...current, ...cleanedData };
    console.log(`[Mock DB] Updated ${this.collectionName}/${this.docId}:`, cleanedData);
  }
}

class MockCollectionRef {
  constructor(collectionName, store) {
    this.collectionName = collectionName;
    this.store = store;
  }
  doc(docId) {
    return new MockDocRef(this.collectionName, docId, this.store);
  }
}

class MockFirestore {
  constructor() {
    this.store = {};
  }
  collection(collectionName) {
    return new MockCollectionRef(collectionName, this.store);
  }
}

let db;

// Initialize Firebase Admin
// If you have a serviceAccountKey.json file in the server directory, use it.
// Otherwise, fall back to environment variables.
const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
try {
  if (fs.existsSync(serviceAccountPath)) {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log("Firebase Admin initialized with serviceAccountKey.json");
    db = admin.firestore();
  } else {
    // Tries to initialize using environment credentials or default configuration
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || "shaifly-count-download"
    });
    console.log("Firebase Admin initialized with Project ID:", admin.app().options.projectId);
    db = admin.firestore();
  }
} catch (error) {
  console.warn("Firebase Admin early initialization error:", error.message);
}

// Test Firestore connection on startup. If it fails, fall back to In-Memory DB.
(async () => {
  try {
    if (!db) throw new Error("Database not initialized");
    // Perform a test read
    await db.collection('connection_test').doc('test').get();
    console.log("Firestore connection test: SUCCESS");
  } catch (err) {
    console.warn("\n⚠️  [Firestore Warning]: Connection test failed. Credentials might be invalid or missing.");
    console.warn("   Error:", err.message);
    console.warn("   -> Falling back to In-Memory Mock Database for this session.");
    console.warn("   -> To resolve, place a valid serviceAccountKey.json in the server/ folder.\n");
    
    db = new MockFirestore();
    
    // Override admin.firestore helper to avoid TypeError when calling serverTimestamp()
    admin.firestore = {
      FieldValue: {
        serverTimestamp: () => {
          return () => new Date();
        }
      }
    };
  }
})();

// SSLCommerz Credentials (using sandbox values provided by user)
const STORE_ID = process.env.SSL_STORE_ID || "path6a262bfa39b75";
const STORE_PASSWORD = process.env.SSL_STORE_PASSWORD || "path6a262bfa39b75@ssl";
const IS_SANDBOX = process.env.SSL_IS_SANDBOX !== 'false'; // Default to true (Sandbox)

const SSLCOMMERZ_API = IS_SANDBOX 
  ? "https://sandbox.sslcommerz.com/gwprocess/v4/api.php" 
  : "https://gwprocess.sslcommerz.com/gwprocess/v4/api.php";

const SSLCOMMERZ_VALIDATION_API = IS_SANDBOX
  ? "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"
  : "https://gwprocess.sslcommerz.com/validator/api/validationserverAPI.php";

// Redirect Base URLs
const BACKEND_BASE_URL = process.env.BACKEND_BASE_URL || "http://localhost:5000";
const FRONTEND_BASE_URL = process.env.FRONTEND_BASE_URL || "http://localhost:5173";

// Simple health check endpoint
app.get('/', (req, res) => {
  res.send('Shaifly Payment Gateway API is running.');
});

/**
 * 1. INITIATE PAYMENT ROUTE
 * Called by React frontend when a user wants to pay.
 */
app.post('/api/payment/initiate', async (req, res) => {
  const { amount, planName, userName, userEmail, userPhone, userId, type, subject, studentProblem } = req.body;

  if (!amount || !planName) {
    return res.status(400).json({ error: "Amount and Plan Name are required" });
  }

  // Clean the currency symbol and convert to number if it's a string like "৳৯৯" or "৳৪৯"
  let parsedAmount = amount;
  if (typeof amount === 'string') {
    // Convert Bengali digits to English
    const bnToEn = { '০':'0', '১':'1', '২':'2', '৩':'3', '৪':'4', '৫':'5', '৬':'6', '৭':'7', '৮':'8', '৯':'9' };
    let sanitized = amount.replace(/[৳\s,]/g, '');
    let englishDigits = sanitized.split('').map(char => bnToEn[char] || char).join('');
    parsedAmount = parseFloat(englishDigits);
  }

  if (isNaN(parsedAmount) || parsedAmount <= 0) {
    return res.status(400).json({ error: "Invalid amount value" });
  }

  // Generate a unique transaction ID
  const transactionId = `TXN_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;

  try {
    // 1. Create a pending payment record in Firestore
    await db.collection('payments').doc(transactionId).set({
      amount: parsedAmount,
      planName: planName,
      userPhone: userPhone || "N/A",
      userName: userName || "Anonymous",
      userEmail: userEmail || "N/A",
      userId: userId || "guest",
      tid: transactionId,
      status: 'pending',
      method: 'sslcommerz',
      type: type || 'subscription',
      subject: subject || null,
      studentProblem: studentProblem || null,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    // 2. Prepare SSLCommerz parameters
    const paymentParams = new URLSearchParams();
    paymentParams.append('store_id', STORE_ID);
    paymentParams.append('store_passwd', STORE_PASSWORD);
    paymentParams.append('total_amount', parsedAmount.toString());
    paymentParams.append('currency', 'BDT');
    paymentParams.append('tran_id', transactionId);

    // Callbacks pointing back to our Node.js backend
    paymentParams.append('success_url', `${BACKEND_BASE_URL}/api/payment/success?txnId=${transactionId}`);
    paymentParams.append('fail_url', `${BACKEND_BASE_URL}/api/payment/fail?txnId=${transactionId}`);
    paymentParams.append('cancel_url', `${BACKEND_BASE_URL}/api/payment/cancel?txnId=${transactionId}`);
    paymentParams.append('ipn_url', `${BACKEND_BASE_URL}/api/payment/ipn`);

    // Customer details
    paymentParams.append('cus_name', userName || 'Student');
    paymentParams.append('cus_email', userEmail || 'student@shaifly.com');
    paymentParams.append('cus_phone', userPhone || '01700000000');
    paymentParams.append('cus_add1', 'Dhaka');
    paymentParams.append('cus_city', 'Dhaka');
    paymentParams.append('cus_country', 'Bangladesh');

    // Product profile parameters
    paymentParams.append('shipping_method', 'NO');
    paymentParams.append('product_name', planName);
    paymentParams.append('product_category', 'Education');
    paymentParams.append('product_profile', 'non-physical-goods');

    console.log(`Initiating payment for ${transactionId} with amount ${parsedAmount} BDT`);

    // 3. Post to SSLCommerz API
    const response = await axios.post(SSLCOMMERZ_API, paymentParams.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (response.data && response.data.status === 'SUCCESS') {
      console.log(`Payment session created successfully for ${transactionId}. Redirect URL: ${response.data.GatewayPageURL}`);
      return res.status(200).json({ url: response.data.GatewayPageURL });
    } else {
      console.error("SSLCommerz Init Error:", response.data);
      return res.status(400).json({ error: response.data.failedreason || "Payment session creation failed" });
    }
  } catch (error) {
    console.error("Payment initiation error: ", error.message);
    return res.status(500).json({ error: "Internal Server Error initiating payment" });
  }
});

/**
 * 2. PAYMENT SUCCESS CALLBACK ROUTE
 * SSLCommerz will POST here upon successful payment.
 */
app.post('/api/payment/success', async (req, res) => {
  const transactionId = req.query.txnId;
  const paymentData = req.body; // Contains val_id, card_type, bank_tran_id, etc.

  console.log(`Received success callback for transaction: ${transactionId}`);

  try {
    const val_id = paymentData.val_id;

    if (!val_id) {
      console.error("Missing val_id in payment response");
      return res.redirect(`${FRONTEND_BASE_URL}/payment-fail?error=missing_validation_id`);
    }

    // Securely validate transaction with SSLCommerz Servers
    const validationUrl = `${SSLCOMMERZ_VALIDATION_API}?val_id=${val_id}&store_id=${STORE_ID}&store_passwd=${STORE_PASSWORD}&format=json`;
    const checkResponse = await axios.get(validationUrl);

    if (checkResponse.data && (checkResponse.data.status === 'VALID' || checkResponse.data.status === 'VALIDATED')) {
      console.log(`Transaction ${transactionId} successfully verified as VALID by SSLCommerz.`);

      const paymentRef = db.collection('payments').doc(transactionId);
      const paymentDoc = await paymentRef.get();

      if (paymentDoc.exists) {
        const paymentRecord = paymentDoc.data();

        // 1. Update Payment Status in Firestore
        await paymentRef.update({
          status: 'completed',
          bankTranId: paymentData.bank_tran_id || 'N/A',
          cardType: paymentData.card_type || 'N/A',
          cardBrand: paymentData.card_brand || 'N/A',
          paymentTime: paymentData.tran_date || new Date().toISOString(),
          verifiedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        // 2. Activate membership if this is a subscription
        if (paymentRecord.type === 'subscription' && paymentRecord.userId && paymentRecord.userId !== 'guest') {
          await db.collection('users').doc(paymentRecord.userId).update({
            membershipActive: true,
            plan: paymentRecord.planName,
            planActivatedAt: admin.firestore.FieldValue.serverTimestamp()
          }).then(() => {
            console.log(`Activated subscription for user: ${paymentRecord.userId}`);
          }).catch(err => {
            console.error(`Error activating user membership: ${err.message}`);
          });
        }
      }

      // Redirect student browser back to React frontend success page
      return res.redirect(`${FRONTEND_BASE_URL}/payment-success?txnId=${transactionId}`);
    } else {
      console.warn(`Transaction validation failed for ${transactionId}:`, checkResponse.data);
      await db.collection('payments').doc(transactionId).update({
        status: 'failed',
        reason: 'Payment validation failed at SSLCommerz verification API'
      });
      return res.redirect(`${FRONTEND_BASE_URL}/payment-fail?error=validation_failed`);
    }
  } catch (error) {
    console.error("Payment success processing error: ", error.message);
    return res.redirect(`${FRONTEND_BASE_URL}/payment-fail?error=server_processing_error`);
  }
});

/**
 * 3. PAYMENT FAIL ROUTE
 * SSLCommerz will POST here if payment fails.
 */
app.post('/api/payment/fail', async (req, res) => {
  const transactionId = req.query.txnId;
  console.log(`Payment failed for transaction: ${transactionId}`);

  try {
    await db.collection('payments').doc(transactionId).update({
      status: 'rejected',
      reason: 'SSLCommerz payment failed / card rejected by bank'
    });
  } catch (err) {
    console.error("Error updating failed payment:", err.message);
  }

  return res.redirect(`${FRONTEND_BASE_URL}/payment-fail`);
});

/**
 * 4. PAYMENT CANCEL ROUTE
 * SSLCommerz will POST here if customer cancels the payment.
 */
app.post('/api/payment/cancel', async (req, res) => {
  const transactionId = req.query.txnId;
  console.log(`Payment cancelled by user for transaction: ${transactionId}`);

  try {
    await db.collection('payments').doc(transactionId).update({
      status: 'rejected',
      reason: 'Transaction cancelled by customer'
    });
  } catch (err) {
    console.error("Error updating cancelled payment:", err.message);
  }

  return res.redirect(`${FRONTEND_BASE_URL}/payment-cancel`);
});

/**
 * 5. INSTANT PAYMENT NOTIFICATION (IPN) ROUTE
 * Backup callback triggered asynchronously by SSLCommerz.
 */
app.post('/api/payment/ipn', async (req, res) => {
  const paymentData = req.body;
  const transactionId = paymentData.tran_id;

  console.log(`Received IPN request for transaction: ${transactionId}`);

  try {
    if (paymentData.status === 'VALID' || paymentData.status === 'VALIDATED') {
      const val_id = paymentData.val_id;
      const validationUrl = `${SSLCOMMERZ_VALIDATION_API}?val_id=${val_id}&store_id=${STORE_ID}&store_passwd=${STORE_PASSWORD}&format=json`;
      const checkResponse = await axios.get(validationUrl);

      if (checkResponse.data && (checkResponse.data.status === 'VALID' || checkResponse.data.status === 'VALIDATED')) {
        const paymentRef = db.collection('payments').doc(transactionId);
        const paymentDoc = await paymentRef.get();

        if (paymentDoc.exists && paymentDoc.data().status === 'pending') {
          const paymentRecord = paymentDoc.data();
          
          await paymentRef.update({
            status: 'completed',
            bankTranId: paymentData.bank_tran_id || 'N/A',
            cardType: paymentData.card_type || 'N/A',
            paymentTime: paymentData.tran_date || new Date().toISOString(),
            verifiedAt: admin.firestore.FieldValue.serverTimestamp()
          });

          // Activate membership
          if (paymentRecord.type === 'subscription' && paymentRecord.userId && paymentRecord.userId !== 'guest') {
            await db.collection('users').doc(paymentRecord.userId).update({
              membershipActive: true,
              plan: paymentRecord.planName,
              planActivatedAt: admin.firestore.FieldValue.serverTimestamp()
            });
            console.log(`IPN: Activated subscription for user: ${paymentRecord.userId}`);
          }
        }
      }
    }
    return res.status(200).send("IPN processed");
  } catch (error) {
    console.error("IPN handling error: ", error.message);
    return res.status(500).send("IPN error");
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Shaifly SSLCommerz payment server listening on port ${PORT}`);
  console.log(`Backend Mode: ${IS_SANDBOX ? 'SANDBOX (Testing)' : 'LIVE (Production)'}`);
});
