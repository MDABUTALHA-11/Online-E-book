// Function to increment download count
function incrementDownload(bookId) {
    if (typeof firebase === 'undefined' || !firebase.apps.length) {
        console.warn("Firebase not ready. Cannot increment download.");
        return;
    }

    try {
        const db = firebase.firestore();
        const docRef = db.collection("downloads").doc(bookId);

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
            console.error("Error updating download count: ", error);
        });
    } catch (e) {
        console.error("Error in incrementDownload:", e);
    }
}

// Function to initialize count display with real-time updates
function initDownloadCount(bookId) {
    if (typeof firebase === 'undefined' || !firebase.apps.length) {
        // console.warn("Firebase not loaded yet");
        return;
    }

    try {
        const db = firebase.firestore();
        const docId = String(bookId); // Ensure ID is a string
        const docRef = db.collection("downloads").doc(docId);
        const countSpan = document.getElementById('count-' + bookId);

        // Listen for real-time updates
        docRef.onSnapshot((doc) => {
            if (doc.exists) {
                const data = doc.data();
                if (countSpan) {
                    countSpan.innerText = data.count;
                    // Validation flash
                    countSpan.style.color = '#28a745';
                    setTimeout(() => countSpan.style.color = '', 500);
                }
            } else {
                if (countSpan) {
                    countSpan.innerText = 0;
                }
            }
        }, (error) => {
            // Suppress permission errors likely caused by bad config
            // console.error("Error getting document:", error);
            if (countSpan) countSpan.innerText = "0";
        });
    } catch (e) {
        console.error("Error in initDownloadCount:", e);
        // Fallback
        const countSpan = document.getElementById('count-' + bookId);
        if (countSpan) countSpan.innerText = "...";
    }
}
