# How to Set Up Firebase for Your Global Download Counter

1.  **Go to Firebase Console**:
    -   Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
    -   Log in with your Google account.

2.  **Create a New Project**:
    -   Click **"Add project"**.
    -   Name it (e.g., "Shaifly-Books").
    -   Disable Google Analytics (optional, makes it faster).
    -   Click **"Create project"**.

3.  **Create a Database**:
    -   In the left sidebar, click **"Build"** -> **"Firestore Database"**.
    -   Click **"Create database"**.
    -   Choose a location (e.g., `asia-southeast1` or `us-central1`).
    -   **Important**: Start in **test mode** (for now) or **production mode**.
    -   Click **"Enable"**.

4.  **Set Rules (Important)**:
    -   Go to the **"Rules"** tab in Firestore.
    -   Paste this rule to allow anyone to read/write (since it's a public counter):
        ```javascript
        rules_version = '2';
        service cloud.firestore {
          match /databases/{database}/documents {
            match /downloads/{document=**} {
              allow read, write: if true;
            }
          }
        }
        ```
    -   Click **"Publish"**.

5.  **Get Your API Keys**:
    -   Click the **Gear icon** (Project Settings) > **General** tab.
    -   Scroll down to "Your apps".
    -   Click the **Web icon** (`</>`).
    -   Register app (e.g., "Shaifly Web").
    -   **Copy the `firebaseConfig` object**. It looks like this:
        ```javascript
        const firebaseConfig = {
          apiKey: "AIzaSy...",
          authDomain: "...",
          projectId: "...",
          storageBucket: "...",
          messagingSenderId: "...",
          appId: "..."
        };
        ```

6.  **Paste into Your Code**:
    -   Open `js/firebase-config.js` in your editor.
    -   Replace the placeholder `firebaseConfig` object with the one you just copied. **Do not remove the code below it.**

**Done!** Your website now has a real-time global download counter.
