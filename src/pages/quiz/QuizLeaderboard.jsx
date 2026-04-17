import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, MapPin, Search, ArrowRight, Activity, Zap, Loader2, BookOpen } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { quizSubjects } from './QuizHome';

const QuizLeaderboard = () => {
  const [scores, setScores] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialSubject = params.get('subject') || 'physics';
  const [activeSubject, setActiveSubject] = useState(initialSubject);

  useEffect(() => {
    // Load current user profile from storage
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    setCurrentUser(loggedUser);

    const scoresRef = collection(db, 'quiz_scores');
    const q = query(scoresRef, orderBy('score', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const uniqueMap = new Map();
      snapshot.forEach((doc) => {
        const data = doc.data();
        if ((data.subject || 'physics') === activeSubject) {
          const key = `${data.name}-${data.school}`;
          if (!uniqueMap.has(key) || uniqueMap.get(key).score < data.score) {
            uniqueMap.set(key, data);
          }
        }
      });
      
      let finalScores = Array.from(uniqueMap.values()).sort((a, b) => b.score - a.score);
      
      if (finalScores.length === 0) {
        const local = JSON.parse(localStorage.getItem('scores')) || [];
        const localUniqueMap = new Map();
        local.forEach((data) => {
          if ((data.subject || 'physics') === activeSubject) {
            const key = `${data.name}-${data.school}`;
            if (!localUniqueMap.has(key) || localUniqueMap.get(key).score < data.score) {
              localUniqueMap.set(key, data);
            }
          }
        });
        finalScores = Array.from(localUniqueMap.values()).sort((a, b) => b.score - a.score);
      }
      
      setScores(finalScores);
      setLoading(false);
    }, (error) => {
      console.error("Firebase error fetching leaderboard:", error);
      const local = JSON.parse(localStorage.getItem('scores')) || [];
      const localUniqueMap = new Map();
      local.forEach((data) => {
        if ((data.subject || 'physics') === activeSubject) {
          const key = `${data.name}-${data.school}`;
          if (!localUniqueMap.has(key) || localUniqueMap.get(key).score < data.score) {
            localUniqueMap.set(key, data);
          }
        }
      });
      setScores(Array.from(localUniqueMap.values()).sort((a, b) => b.score - a.score));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeSubject]);

  const handleSubjectChange = (id) => {
    setActiveSubject(id);
    navigate(`/quiz/leaderboard?subject=${id}`);
    setLoading(true);
  };

  const getRankBadge = (idx) => {
    switch(idx) {
      case 0: return { color: 'text-yellow-400', bg: 'bg-yellow-400/10 border-yellow-400/30' };
      case 1: return { color: 'text-slate-300', bg: 'bg-slate-300/10 border-slate-300/30' };
      case 2: return { color: 'text-amber-600', bg: 'bg-amber-600/10 border-amber-600/30' };
      default: return { color: 'text-slate-500', bg: 'bg-white/5 border-white/10' };
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] pt-32 md:pt-48 pb-40 overflow-hidden relative">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none -mt-80 animate-pulse-soft" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
           <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-[2.5rem] mx-auto flex items-center justify-center mb-8 border border-white/20 shadow-[0_20px_60px_-15px_rgba(251,191,36,0.5)] rotate-6">
              <Trophy className="w-12 h-12 text-white drop-shadow-md" />
           </div>
           
           <h1 className="text-5xl md:text-[6rem] font-bn font-black text-white italic leading-none mb-6 tracking-tighter">
             সেরাদের <span className="text-yellow-400 italic">তালিকা</span>
           </h1>
           <p className="text-2xl text-slate-400 font-bn italic leading-relaxed mb-12">
             SSC Super Group Quiz-এর সকল প্রতিযোগীর লাইভ র‍্যাঙ্কিং। যারা সেরা, তাদের নাম সবসময় উপরে!
           </p>

           {/* Subject Selector Tabs */}
           <div className="flex overflow-x-auto no-scrollbar gap-3 pb-4 mb-4 justify-start md:justify-center">
              {quizSubjects.map((s) => (
                <button
                  key={s.id}
                  onClick={() => handleSubjectChange(s.id)}
                  className={`flex-shrink-0 px-6 py-3 rounded-2xl font-bn font-black italic text-[15px] transition-all border ${activeSubject === s.id ? 'bg-[#22C55E] text-white border-[#22C55E] shadow-[0_10px_30px_rgba(34,197,94,0.3)]' : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'}`}
                >
                  {s.titleBn}
                </button>
              ))}
           </div>
        </div>

        {/* Action Button Section */}
        <div className="flex justify-center mb-16">
           <button 
             onClick={() => navigate('/quiz')}
             className="btn bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:text-white h-16 px-10 rounded-[2rem] font-bn font-black italic text-xl shadow-xl transition-all flex items-center gap-3 backdrop-blur-md"
           >
             কুইজে ফেরত যান <ArrowRight className="w-6 h-6" />
           </button>
        </div>

        {/* Board */}
        <div className="bg-[var(--bg-surface)]/50 backdrop-blur-3xl rounded-[3rem] md:rounded-[4rem] border border-white/10 shadow-2xl overflow-hidden p-6 md:p-12 min-h-[400px]">
           {loading ? (
             <div className="flex flex-col items-center justify-center h-full py-32 opacity-70">
               <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
               <p className="text-xl font-bn italic text-slate-400">Loading Leaderboard...</p>
             </div>
           ) : scores.length === 0 ? (
             <div className="py-32 text-center text-white/50 font-bn italic text-3xl font-black">
                এখনো কেউ কুইজ শেষ করেনি। আপনিই প্রথম হন!
             </div>
           ) : (
             <div className="flex flex-col gap-6">
                {/* Header Row */}
                <div className="hidden md:grid grid-cols-12 gap-8 px-10 py-4 text-[10px] font-black en-font tracking-[0.2em] uppercase text-slate-500 border-b border-white/5">
                   <div className="col-span-2 text-center">Rank</div>
                   <div className="col-span-5">Player Info</div>
                   <div className="col-span-3">Mode</div>
                   <div className="col-span-2 text-center">Score</div>
                </div>

                {scores.map((score, idx) => {
                  const badge = getRankBadge(idx);
                  const isMe = currentUser && currentUser.name === score.name && currentUser.school === score.school;
                  
                  return (
                    <motion.div 
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center px-8 md:px-10 py-6 md:py-8 rounded-[2rem] md:rounded-[2.5rem] border hover:bg-white/10 transition-all duration-300 group relative overflow-hidden ${isMe ? 'bg-primary/20 border-primary shadow-[0_0_30px_rgba(16,185,129,0.3)] scale-[1.02] z-10' : 'bg-white/5 border-white/5'}`}
                    >
                      {isMe && <div className="absolute top-0 right-10 bg-primary text-white text-[10px] font-black uppercase px-4 py-1 rounded-b-xl shadow-lg en-font tracking-[0.2em]">You</div>}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                      
                      {/* Rank */}
                      <div className="col-span-1 md:col-span-2 flex justify-center">
                         <div className={`w-16 h-16 rounded-[1.25rem] border flex items-center justify-center font-black en-font text-2xl shadow-inner ${badge.bg} ${badge.color}`}>
                           {idx <= 2 ? <Medal className="w-8 h-8" /> : `#${idx + 1}`}
                         </div>
                      </div>

                      {/* Info */}
                      <div className="col-span-1 md:col-span-5 text-center md:text-left">
                         <h3 className="text-3xl font-bn font-black text-white italic mb-2 tracking-tight">{score.name}</h3>
                         <p className="flex items-center justify-center md:justify-start gap-2 text-slate-400 font-bn italic text-lg opacity-80">
                            <MapPin className="w-4 h-4" /> {score.school}
                         </p>
                      </div>
                      
                      {/* Mode Badge */}
                      <div className="col-span-1 md:col-span-3 flex justify-center md:justify-start">
                         <span className={`px-4 py-1 rounded-full text-[10px] font-black en-font tracking-[0.2em] uppercase border flex items-center gap-2 shadow-sm ${score.mode === 'exam' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'}`}>
                           {score.mode === 'exam' ? <Zap className="w-3 h-3" /> : <Activity className="w-3 h-3" />} {score.mode || 'exam'}
                         </span>
                      </div>

                      {/* Score Highlight */}
                      <div className="col-span-1 md:col-span-2 flex justify-center flex-col items-center">
                         <div className="text-4xl md:text-5xl font-bn font-black text-white italic tracking-tighter">
                           {score.score}<span className="text-xl md:text-3xl text-slate-600">/{score.total}</span>
                         </div>
                         <div className="text-primary font-black en-font text-[9px] uppercase tracking-widest mt-1">Accuracy {Math.round((score.score/score.total)*100)}%</div>
                      </div>
                    </motion.div>
                  )
                })}
             </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default QuizLeaderboard;
