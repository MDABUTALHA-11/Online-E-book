// Function to increment view count
function incrementView(blogId) {
    if (typeof firebase === 'undefined' || !firebase.apps.length) {
        console.warn("Firebase not ready. Cannot increment view.");
        return;
    }

    try {
        const db = firebase.firestore();
        const docId = String(blogId); // Ensure ID is a string
        const docRef = db.collection("views").doc(docId);

        // Use a transaction or simpler increment
        docRef.get().then((docSnapshot) => {
            if (docSnapshot.exists) {
                docRef.update({
                    count: firebase.firestore.FieldValue.increment(1)
                });
            } else {
                docRef.set({
                    count: 1
                });
            }
        }).catch((error) => {
            console.error("Error updating view count: ", error);
        });
    } catch (e) {
        console.error("Error in incrementView:", e);
    }
}

// Function to initialize view count display with real-time updates
function initViewCount(blogId) {
    if (typeof firebase === 'undefined' || !firebase.apps.length) {
        // Retry logic handled in HTML or just fail silently
        return;
    }

    try {
        const db = firebase.firestore();
        const docId = String(blogId); // Ensure ID is a string
        const docRef = db.collection("views").doc(docId);
        const countSpan = document.getElementById('view-count-' + blogId);

        if (!countSpan) return;

        // Listen for real-time updates
        docRef.onSnapshot((doc) => {
            if (doc.exists) {
                const data = doc.data();
                countSpan.innerText = data.count + " views";
            } else {
                countSpan.innerText = "0 views";
            }
        }, (error) => {
            // console.error("Error getting view document:", error);
            countSpan.innerText = "0 views";
        });
    } catch (e) {
        console.error("Error in initViewCount:", e);
    }
}
