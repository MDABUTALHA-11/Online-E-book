import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { doc, onSnapshot, updateDoc, setDoc, getDoc, increment } from 'firebase/firestore';

export const useQuizCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We use a fixed document ID "physics_quiz" to track overall participants
    const docRef = doc(db, "quiz_stats", "physics_quiz");
    
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setCount(docSnap.data().participants || 0);
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
  }, []);

  const incrementCount = async () => {
    // Prevent duplicate counting on the same device
    if (localStorage.getItem('quiz_joined')) return;

    const docRef = doc(db, "quiz_stats", "physics_quiz");
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        await updateDoc(docRef, {
          participants: increment(1)
        });
      } else {
        await setDoc(docRef, {
          participants: 1
        });
      }
      localStorage.setItem('quiz_joined', 'true');
    } catch (error) {
      console.error("Error incrementing quiz count:", error);
    }
  };

  return { count, loading, incrementCount };
};
