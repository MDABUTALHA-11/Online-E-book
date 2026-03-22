import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc, setDoc, getDoc, increment } from 'firebase/firestore';

export const useDownloadCount = (bookId) => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookId) return;
    
    const docRef = doc(db, "downloads", String(bookId));
    
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

  const incrementCount = async () => {
    const docRef = doc(db, "downloads", String(bookId));
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          count: increment(1)
        });
      } else {
        await setDoc(docRef, {
          count: 1
        });
      }
    } catch (error) {
      console.error("Error incrementing count:", error);
    }
  };

  return { count, loading, incrementCount };
};
