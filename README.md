# Shaifly Platform Integration & Local Setup Guide

This project contains two main parts:
1. **Frontend**: A React/Vite-based application that serves as the educational portal.
2. **Backend**: An Express.js-based server that handles secure payments (such as SSLCommerz) and interacts with Firestore.

---

## ⚡ How to Run the Project Locally

### Prerequisite
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

---

### Step 1: Run the Backend Server

The backend server is located in the `/server` folder. It handles SSLCommerz session initiation and updates Firestore upon successful payment.

1. **Open a terminal** and navigate to the `server` directory:
   ```bash
   cd server
   ```

2. **Install the backend dependencies**:
   ```bash
   npm install
   ```

3. **Verify/Configure Environment Variables**:
   A pre-configured `.env` file is already in the `server` directory containing:
   ```env
   PORT=5000
   BACKEND_BASE_URL=http://localhost:5000
   FRONTEND_BASE_URL=http://localhost:5173
   SSL_STORE_ID=path6a262bfa39b75
   SSL_STORE_PASSWORD=path6a262bfa39b75@ssl
   SSL_IS_SANDBOX=true
   FIREBASE_PROJECT_ID=shaifly-count-download
   ```

4. **Start the Backend Server**:
   - In development mode (automatic reload on file changes):
     ```bash
     npm run dev
     ```
   - Or standard mode:
     ```bash
     npm start
     ```
   The backend will be running at **`http://localhost:5000`**.

---

### Step 2: Run the Frontend Application

The frontend is located in the root directory.

1. **Open a new terminal window/tab** in the root directory (`Online-Book`).

2. **Install the frontend dependencies**:
   *(Dependencies in the root folder are usually already installed, but to be sure, run):*
   ```bash
   npm install
   ```

3. **Start the Frontend Development Server**:
   ```bash
   npm run dev
   ```
   The frontend will start running, usually at **`http://localhost:5173`**.

---

## 🔒 Firebase Configuration

- The frontend Firebase configuration is already initialized in `src/lib/firebase.js`.
- The backend uses administrative privileges. For the backend database updates to succeed, it is recommended to add your Firebase service account private key:
  1. Generate a new private key from **Firebase Console -> Project Settings -> Service Accounts**.
  2. Save it as `serviceAccountKey.json` inside the `server/` directory.

---

## 🛠️ Production Deployment

### Backend
Deploy to platforms like **Render.com**, **Railway**, or **Heroku**:
- Root directory: `server`
- Build Command: `npm install`
- Start Command: `npm start`
- Set the environment variables in your deployment dashboard accordingly (e.g., set `SSL_IS_SANDBOX=false` for live payments).

### Frontend
Deploy to platforms like **Vercel**, **Netlify**, or **Firebase Hosting**:
- Build command: `npm run build`
- Output directory: `dist`
- Set `VITE_API_URL` environment variable pointing to your deployed backend URL.
