import { useState, useEffect, useCallback } from 'react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc, setDoc, getDoc, increment } from 'firebase/firestore';

export const useViewCount = (id, type = 'views') => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Memoize incrementView to avoid unnecessary re-renders in useEffect
  const incrementView = useCallback(async (targetId = id, targetType = type) => {
    if (!targetId) return;
    const docRef = doc(db, targetType, String(targetId));
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, { count: increment(1) });
      } else {
        await setDoc(docRef, { count: 1 });
      }
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }
  }, [id, type]);

  useEffect(() => {
    if (!id) return;
    
    const docRef = doc(db, type, String(id));
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCount(docSnap.data().count || 0);
      } else {
        setCount(0);
      }
      setLoading(false);
    }, (error) => {
      console.error(`Firebase error [${type}/${id}]:`, error);
      setCount(0);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [id, type]);

  return { count, loading, incrementView };
};

