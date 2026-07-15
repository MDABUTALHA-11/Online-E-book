import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, MapPin, Search, ArrowRight, Activity, Zap, Loader2, BookOpen } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { quizSubjects } from './QuizHome';
import { physicsChaptersMeta } from '../../data/physicsQuestions';

const QuizLeaderboard = () => {
  const [scores, setScores] = useState([]);
  const [currentUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialSubject = params.get('subject') || 'physics-ch1';
  
  // If subject is just 'physics', redirect to 'physics-ch1'
  const startSubject = initialSubject === 'physics' ? 'physics-ch1' : initialSubject;
  const [activeSubject, setActiveSubject] = useState(startSubject);

  useEffect(() => {
    setLoading(true);
    const scoresRef = collection(db, 'quiz_scores');
    const q = query(scoresRef, orderBy('score', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const uniqueMap = new Map();
      snapshot.forEach((doc) => {
        const data = doc.data();
        if ((data.subject || 'physics-ch1') === activeSubject) {
          const key = `${data.name}-${data.school}`;
          if (!uniqueMap.has(key) || uniqueMap.get(key).score < data.score) {
            uniqueMap.set(key, data);
          }
        }
      });
      
      let finalScores = Array.from(uniqueMap.values()).sort((a, b) => b.score - a.score);
      
      if (finalScores.length === 0) {
        const local = JSON.parse(localStorage.getItem("scores")) || [];
        const localUniqueMap = new Map();
        local.forEach((data) => {
          if ((data.subject || 'physics-ch1') === activeSubject) {
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
      const local = JSON.parse(localStorage.getItem("scores")) || [];
      const localUniqueMap = new Map();
      local.forEach((data) => {
        if ((data.subject || 'physics-ch1') === activeSubject) {
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
    let targetId = id;
    if (id === 'physics') {
      targetId = 'physics-ch1';
    }
    setActiveSubject(targetId);
    navigate(`/quiz/leaderboard?subject=${targetId}`);
  };

  const getRankBadge = (idx) => {
    switch(idx) {
      case 0: return { color: 'text-yellow-500', bg: 'bg-yellow-400/10 border-yellow-400/30' };
      case 1: return { color: 'text-slate-400', bg: 'bg-slate-300/10 border-slate-300/30' };
      case 2: return { color: 'text-amber-600', bg: 'bg-amber-600/10 border-amber-600/30' };
      default: return { color: 'text-slate-500', bg: 'bg-slate-100 border-[var(--bg-border)]' };
    }
  };

  const isPhysicsActive = activeSubject.startsWith("physics-ch");

  return (
    <div className="min-h-screen bg-[var(--bg-app)] pt-32 md:pt-48 pb-40 overflow-hidden relative text-slate-800 font-bn">
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-[150px] pointer-events-none -mt-80 animate-pulse-soft" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center mb-24 max-w-3xl mx-auto">
           <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-[2.5rem] mx-auto flex items-center justify-center mb-8 border border-white/20 shadow-[0_20px_60px_-15px_rgba(251,191,36,0.35)] rotate-6">
              <Trophy className="w-12 h-12 text-white drop-shadow-md" />
           </div>
           
           <h1 className="text-5xl md:text-7xl font-black text-[#0F172A] italic leading-none mb-6 tracking-tighter">
             সেরাদের <span className="text-yellow-500 italic">তালিকা</span>
           </h1>
           <p className="text-xl md:text-2xl text-slate-500 italic leading-relaxed mb-12">
             কুইজে অংশগ্রহণকারী সকল প্রতিযোগীর লাইভ র‍্যাঙ্কিং। যারা সেরা, তাদের নাম সবার উপরে!
           </p>

           {/* Subject Selector Tabs */}
           <div className="flex overflow-x-auto no-scrollbar gap-3 pb-4 mb-4 justify-start md:justify-center">
              {quizSubjects.map((s) => {
                const isSelected = activeSubject === s.id || (s.id === 'physics' && isPhysicsActive);
                return (
                  <button
                    key={s.id}
                    onClick={() => handleSubjectChange(s.id)}
                    className={`flex-shrink-0 px-6 py-3 rounded-2xl font-black italic text-[15px] transition-all border ${isSelected ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-[0_10px_30px_rgba(37,99,235,0.2)]' : 'bg-[var(--bg-elevated)] text-slate-500 border-[var(--bg-border)] hover:bg-slate-100'}`}
                  >
                    {s.titleBn}
                  </button>
                );
              })}
           </div>

           {/* Physics Chapters Sub-selector */}
           {isPhysicsActive && (
             <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 p-4 bg-white rounded-2xl border border-slate-200 shadow-sm animate-fade-in max-w-md mx-auto">
               <span className="text-xs font-black text-[#2563EB] tracking-wider shrink-0">পদার্থবিজ্ঞান অধ্যায়:</span>
               <select
                 value={activeSubject}
                 onChange={(e) => handleSubjectChange(e.target.value)}
                 className="px-4 py-2.5 rounded-xl font-bold bg-slate-50 border border-slate-200 text-slate-700 outline-none focus:border-[#2563EB] w-full text-sm"
               >
                 {physicsChaptersMeta.map(ch => (
                   <option key={ch.id} value={ch.id}>
                     অধ্যায় {ch.num}: {ch.titleBn}
                   </option>
                 ))}
               </select>
             </div>
           )}
        </div>

        {/* Action Button Section */}
        <div className="flex justify-center mb-16">
           <button 
             onClick={() => navigate('/quiz')}
             className="bg-[var(--bg-elevated)] text-[#0F172A] border border-[var(--bg-border)] hover:bg-slate-100 h-16 px-10 rounded-[2rem] font-black italic text-xl shadow-lg transition-all flex items-center gap-3 backdrop-blur-md"
           >
             কুইজে ফেরত যান <ArrowRight className="w-6 h-6" />
           </button>
        </div>

        {/* Board */}
        <div className="bg-[var(--bg-surface)] rounded-[3rem] md:rounded-[4rem] border border-[var(--bg-border)] shadow-2xl overflow-hidden p-6 md:p-12 min-h-[400px]">
           {loading ? (
             <div className="flex flex-col items-center justify-center h-full py-32 opacity-70">
                <Loader2 className="w-12 h-12 text-[#2563EB] animate-spin mb-4" />
                <p className="text-xl italic text-slate-500">র‍্যাঙ্কিং লোড হচ্ছে...</p>
             </div>
           ) : scores.length === 0 ? (
             <div className="py-32 text-center text-slate-400 italic text-2xl font-black">
                এখনো কেউ এই অধ্যায়ের কুইজ সম্পন্ন করেনি। প্রথম স্থান অর্জন করতে এখনই অংশ নিন!
             </div>
           ) : (
             <div className="flex flex-col gap-6">
                  {/* Header Row */}
                  <div className="hidden md:grid grid-cols-12 gap-8 px-10 py-4 text-[11px] font-black tracking-[0.2em] uppercase text-slate-400 border-b border-[var(--bg-border)]">
                     <div className="col-span-2 text-center">স্থান</div>
                     <div className="col-span-5">প্রতিযোগী</div>
                     <div className="col-span-3">মোড</div>
                     <div className="col-span-2 text-center">নম্বর</div>
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
                        className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center px-8 md:px-10 py-6 md:py-8 rounded-[2rem] md:rounded-[2.5rem] border hover:bg-slate-50/50 transition-all duration-300 group relative overflow-hidden ${isMe ? 'bg-[#2563EB]/10 border-[#2563EB] shadow-[0_0_30px_rgba(37,99,235,0.15)] scale-[1.02] z-10' : 'bg-white border-[var(--bg-border)]'}`}
                      >
                        {isMe && <div className="absolute top-0 right-10 bg-[#2563EB] text-white text-[10px] font-black uppercase px-4 py-1 rounded-b-xl shadow-lg">আপনি</div>}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        
                        {/* Rank */}
                        <div className="col-span-1 md:col-span-2 flex justify-center">
                           <div className={`w-16 h-16 rounded-[1.25rem] border flex items-center justify-center font-black text-2xl shadow-inner ${badge.bg} ${badge.color}`}>
                             {idx <= 2 ? <Medal className="w-8 h-8" /> : `#${idx + 1}`}
                           </div>
                        </div>

                        {/* Info */}
                        <div className="col-span-1 md:col-span-5 text-center md:text-left">
                           <h3 className="text-2xl font-black text-[#0F172A] italic mb-2 tracking-tight">{score.name}</h3>
                           <p className="flex items-center justify-center md:justify-start gap-2 text-slate-400 italic text-sm">
                              <MapPin className="w-4 h-4 text-slate-400" /> {score.school}
                           </p>
                        </div>
                        
                        {/* Mode Badge */}
                        <div className="col-span-1 md:col-span-3 flex justify-center md:justify-start">
                           <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-[0.2em] uppercase border flex items-center gap-2 shadow-sm ${score.mode === 'exam' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' : 'bg-purple-500/10 text-purple-500 border-purple-500/20'}`}>
                             {score.mode === 'exam' ? <Zap className="w-3 h-3" /> : <Activity className="w-3 h-3" />} {score.mode === 'exam' ? 'পরীক্ষা' : 'অনুশীলন'}
                           </span>
                        </div>

                        {/* Score Highlight */}
                        <div className="col-span-1 md:col-span-2 flex justify-center flex-col items-center">
                           <div className="text-3xl md:text-4xl font-black text-[#0F172A] italic tracking-tighter">
                             {score.score}<span className="text-lg md:text-2xl text-slate-400">/{score.total}</span>
                           </div>
                           <div className="text-[#2563EB] font-black text-[9px] uppercase tracking-widest mt-1">সঠিকতা {Math.round((score.score/score.total)*100)}%</div>
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
