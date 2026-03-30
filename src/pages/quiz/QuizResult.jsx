import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Award, ArrowRight, Activity, Zap, ShieldCheck } from 'lucide-react';
import { physicsQuestions } from '../../data/physicsQuestions';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const QuizResult = () => {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const answers = JSON.parse(localStorage.getItem('quiz_answers')) || {};
    
    if (!user) {
      navigate('/quiz');
      return;
    }

    // Calculate score
    let calculatedScore = 0;
    physicsQuestions.forEach((q, index) => {
      if (answers[index] === q.answer) {
        calculatedScore++;
      }
    });

    const parsedData = { 
      name: user.name, 
      school: user.school, 
      score: calculatedScore, 
      total: physicsQuestions.length,
      mode: user.mode || 'exam',
      timestamp: new Date().getTime()
    };
    
    const saveAndCalculateRank = async () => {
      // Check if already saved locally (React 18 Strict Mode prevents duplicate pushes)
      let scores = JSON.parse(localStorage.getItem("scores")) || [];
      const isDuplicate = scores.find(s => s.name === parsedData.name && s.score === parsedData.score && (parsedData.timestamp - s.timestamp < 5000));
      
      if (!isDuplicate) {
         scores.push(parsedData);
         localStorage.setItem("scores", JSON.stringify(scores));
         
         // Push to Firebase
         try {
           await addDoc(collection(db, 'quiz_scores'), parsedData);
         } catch (error) {
           console.error("Error pushing to firebase scores:", error);
         }
      }

      // Read ranks from Firebase for accurate global rank
      try {
        const querySnapshot = await getDocs(collection(db, 'quiz_scores'));
        
        const uniqueMap = new Map();
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const key = `${data.name}-${data.school}`;
          if (!uniqueMap.has(key) || uniqueMap.get(key).score < data.score) {
            uniqueMap.set(key, data);
          }
        });
        
        // Include current user in case they didn't get saved due to error
        const myKey = `${parsedData.name}-${parsedData.school}`;
        if (!uniqueMap.has(myKey) || uniqueMap.get(myKey).score < parsedData.score) {
          uniqueMap.set(myKey, parsedData);
        }

        const sorted = Array.from(uniqueMap.values()).sort((a, b) => b.score - a.score);
        const myRank = sorted.findIndex(s => s.name === parsedData.name && s.score === parsedData.score) + 1;
        
        parsedData.rank = myRank > 0 ? myRank : 1;
        setResult(parsedData);
      } catch (error) {
        console.error("Error fetching firebase scores for rank:", error);
        // Fallback to local
        const allScores = JSON.parse(localStorage.getItem("scores")) || scores;
        const sorted = allScores.sort((a, b) => b.score - a.score);
        const myRank = sorted.findIndex(s => s.name === parsedData.name && s.score === parsedData.score) + 1;
        
        parsedData.rank = myRank > 0 ? myRank : 1;
        setResult(parsedData);
      }
      
      // Clear answers storage from localStorage
      localStorage.removeItem('quiz_answers');
    };

    saveAndCalculateRank();

  }, [navigate]);

  if (!result) return null;

  const percentage = Math.round((result.score / result.total) * 100);
  const isGood = percentage >= 80;
  const isPass = percentage >= 40;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden pt-20 pb-20">
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-2xl glass-dark p-10 md:p-16 rounded-[4rem] shadow-2xl text-center border border-white/10 relative z-10"
      >
        <div className="w-32 h-32 mx-auto bg-gradient-to-br from-primary to-emerald-600 rounded-[3rem] shadow-[0_30px_60px_-15px_rgba(16,185,129,0.5)] flex items-center justify-center mb-10 rotate-6 border border-white/20">
          <Target className="w-16 h-16 text-white" />
        </div>

        <div className="mb-12">
           <h2 className="text-slate-400 font-bn text-xl italic font-bold tracking-widest uppercase mb-2">Quiz Completed</h2>
           <h1 className="text-5xl md:text-7xl font-bn font-black text-white italic mb-4 leading-none tracking-tighter">
             Congratulations, <span className="text-primary italic block mt-2">{result.name}</span>
           </h1>
           <p className="text-slate-500 font-bn text-2xl italic">{result.school}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
           <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden group hover:border-primary/50 transition-all">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100" />
              <Activity className="w-8 h-8 text-secondary mb-4" />
              <p className="text-4xl md:text-5xl font-bn font-black text-white italic">{result.score}<span className="text-2xl text-slate-500">/{result.total}</span></p>
              <span className="text-[10px] md:text-sm font-black en-font tracking-[0.2em] text-slate-400 uppercase mt-4">Score</span>
           </div>

           <div className={`border p-8 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl ${isGood ? 'bg-primary/20 border-primary/30 shadow-primary/20' : (isPass ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-red-500/20 border-red-500/30')}`}>
              <Zap className={`w-8 h-8 mb-4 ${isGood ? 'text-primary' : (isPass ? 'text-yellow-400' : 'text-red-400')}`} />
              <p className={`text-4xl md:text-5xl font-bn font-black italic ${isGood ? 'text-primary' : (isPass ? 'text-yellow-400' : 'text-red-400')}`}>{percentage}%</p>
              <span className={`text-[10px] md:text-sm font-black en-font tracking-[0.2em] uppercase mt-4 ${isGood ? 'text-primary/70' : 'text-white/50'}`}>Accuracy</span>
           </div>

           <div className="bg-gradient-to-br from-indigo-500/20 to-purple-600/20 border border-indigo-500/30 p-8 rounded-[2.5rem] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl shadow-indigo-500/20">
              <Award className="w-8 h-8 text-indigo-400 mb-4" />
              <p className="text-4xl md:text-5xl font-bn font-black italic text-indigo-400">#{result.rank}</p>
              <span className="text-[10px] md:text-sm font-black en-font tracking-[0.2em] uppercase mt-4 text-indigo-400/80">Current Rank</span>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-16 pt-12 border-t border-white/5">
           <button 
             onClick={() => navigate('/quiz')}
             className="btn btn-outline border-white/10 text-white w-full h-20 rounded-[2rem] hover:bg-white/5 transition-all text-xl font-bn font-black italic flex items-center justify-center gap-3"
           >
             ব্যাক টু হোম
           </button>
           <button 
             onClick={() => navigate('/quiz/leaderboard')}
             className="btn btn-primary w-full h-20 rounded-[2rem] text-xl font-bn font-black italic flex items-center justify-center gap-3 shadow-2xl shadow-primary/20 hover:scale-105 transition-transform"
           >
             লিডারবোর্ড দেখুন <Award className="w-6 h-6" />
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizResult;
