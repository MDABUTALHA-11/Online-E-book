import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, setDoc, increment } from 'firebase/firestore';

export const useReadCount = (bookId) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) return;
    
    const docRef = doc(db, "reading_counts", String(bookId));
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCount(docSnap.data().count || 0);
      } else {
        setCount(0);
      }
      setLoading(false);
    }, (error) => {
      console.error("Firebase Snapshot Error:", error);
      setCount(0);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [bookId]);

  const incrementReadCount = async () => {
    if (!bookId) return;
    const docRef = doc(db, "reading_counts", String(bookId));
    const globalRef = doc(db, "stats", "universal_readers");
    
    try {
      // Increment book specific count
      await setDoc(docRef, { count: increment(1) }, { merge: true });
      // Increment universal count
      await setDoc(globalRef, { count: increment(1) }, { merge: true });
    } catch (error) {
      console.error("Error incrementing count:", error);
    }
  };

  return { count, loading, incrementReadCount };
};
