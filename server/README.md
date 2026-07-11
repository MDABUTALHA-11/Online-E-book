# Shaifly Payment Backend API

This is a lightweight Express.js server that securely communicates with SSLCommerz to initiate transactions, validate callbacks, and update the Firestore database.

## Local Development Setup

1. **Install dependencies:**
   ```bash
   cd server
   npm install
   ```

2. **Configure Environment Variables:**
   A `.env` file has been pre-created for you. It contains:
   ```env
   PORT=5000
   BACKEND_BASE_URL=http://localhost:5000
   FRONTEND_BASE_URL=http://localhost:5173
   SSL_STORE_ID=path6a262bfa39b75
   SSL_STORE_PASSWORD=path6a262bfa39b75@ssl
   SSL_IS_SANDBOX=true
   FIREBASE_PROJECT_ID=shaifly-count-download
   ```

3. **Provide Firebase Credentials (Optional but Recommended):**
   - Go to your Firebase Console -> Project Settings -> Service Accounts.
   - Generate a new private key and download the JSON file.
   - Rename the file to `serviceAccountKey.json` and place it in the `server/` directory. 
   *(If not provided, the SDK will fall back to using application default credentials, which is fine for local simulation if configured)*.

4. **Run the server:**
   - In development mode (restarts on save):
     ```bash
     npm run dev
     ```
   - In production mode:
     ```bash
     npm start
     ```

---

## Production Deployment (e.g., Render.com)

1. Create a new Web Service on Render, linking your GitHub repository.
2. Set the root directory parameter to `server`.
3. Set the **Build Command** to `npm install` and the **Start Command** to `npm start`.
4. Add the following **Environment Variables** in the Render settings panel:
   - `PORT=10000`
   - `BACKEND_BASE_URL=https://your-backend-app.onrender.com` (Render service URL)
   - `FRONTEND_BASE_URL=https://shaifly.com` (Your custom domain)
   - `SSL_IS_SANDBOX=false` (To enable production payments)
   - `SSL_STORE_ID=your_live_store_id`
   - `SSL_STORE_PASSWORD=your_live_store_password`
   - `FIREBASE_PROJECT_ID=shaifly-count-download`
5. Place your downloaded service account JSON content as a secret file or parse it from an environment variable to allow production Firestore updates.
