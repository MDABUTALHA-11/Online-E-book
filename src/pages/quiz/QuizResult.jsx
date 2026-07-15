import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Award, ArrowRight, Activity, Zap, ShieldCheck, Trophy, Home, RefreshCw, Share2 } from 'lucide-react';
import { getSubjectChapterQuestions, getSubjectMeta, getSubjectChapters } from '../../data/unifiedSubjectsData';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const QuizResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  const params = new URLSearchParams(location.search);
  const subjectId = params.get('subject') || 'physics-ch1';
  const xpEarned = parseInt(params.get('xp')) || 0;

  // Resolve Subject Title
  const parts = subjectId.split("-ch");
  const subjSlug = parts[0];
  const matchedSubj = getSubjectMeta(subjSlug);
  const matchedChaps = getSubjectChapters(subjSlug);
  const matchedChap = matchedChaps.find(c => c.id === subjectId);
  
  let subjectTitle = "পদার্থবিজ্ঞান কুইজ";
  if (matchedSubj && matchedChap) {
    subjectTitle = `${matchedSubj.nameBn} - অধ্যায় ${matchedChap.num}: ${matchedChap.titleBn}`;
  } else if (matchedSubj) {
    subjectTitle = matchedSubj.nameBn;
  }

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const answers = JSON.parse(localStorage.getItem('quiz_answers')) || {};
    
    if (!user) {
      navigate('/quiz');
      return;
    }

    const parts = subjectId.split("-ch");
    const subjSlug = parts[0];
    const questions = getSubjectChapterQuestions(subjSlug, subjectId);

    // Calculate score
    let calculatedScore = 0;
    questions.forEach((q, index) => {
      // Find option inside answers. We shuffled questions in Play, but answers are saved with originalIndex.
      if (answers[index] === q.answer) {
        calculatedScore++;
      }
    });

    const parsedData = { 
      name: user.name, 
      school: user.school, 
      score: calculatedScore, 
      total: questions.length,
      mode: user.mode || 'exam',
      subject: subjectId,
      timestamp: new Date().getTime()
    };
    
    const saveAndCalculateRank = async () => {
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
          if ((data.subject || 'physics-ch1') === subjectId) {
            const key = `${data.name}-${data.school}`;
            if (!uniqueMap.has(key) || uniqueMap.get(key).score < data.score) {
              uniqueMap.set(key, data);
            }
          }
        });
        
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
    };

    saveAndCalculateRank();

  }, [navigate, subjectId]);

  if (!result) return null;

  const percentage = Math.round((result.score / result.total) * 100);
  const isGood = percentage >= 80;
  const isPass = percentage >= 40;
  const wrongCount = result.total - result.score;

  const handleNextChapter = () => {
    const parts = subjectId.split("-ch");
    const subjSlug = parts[0];
    const chNum = parseInt(parts[1]);
    const maxChapters = getSubjectChapters(subjSlug).length;
    
    if (chNum < maxChapters) {
      navigate(`/quiz/play?subject=${subjSlug}-ch${chNum + 1}`);
    } else {
      navigate(`/subject/${subjSlug}`);
    }
  };

  const handleShare = () => {
    const text = `🎉 আমি এসএসসি পদার্থবিজ্ঞান কুইজের "${subjectTitle}" শেষ করেছি! স্কোর: ${result.score}/${result.total} (${percentage}%), অর্জন করেছি ${xpEarned} XP! আপনিও খেলুন Shaifly Library-তে!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] flex items-center justify-center p-6 relative overflow-hidden pt-32 pb-40 font-bn">
      {/* Background Decorator */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-[150px] animate-pulse-soft -mt-80 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-3xl p-8 md:p-14 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl relative z-10 text-center bg-white border border-slate-200"
      >
        {/* Animated Trophy Icon */}
        <div className="relative mb-10">
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
             className="w-28 h-28 md:w-36 md:h-36 mx-auto bg-[#2563EB]/10 rounded-[2.5rem] md:rounded-[3rem] shadow-lg flex items-center justify-center rotate-6 border border-[#2563EB]/20"
           >
             <Trophy className="w-14 h-14 md:w-18 md:h-18 text-[#2563EB] drop-shadow-md" />
           </motion.div>
        </div>

        <div className="mb-10 text-center">
           <div className="text-[#2563EB] tracking-widest uppercase text-xs font-black mb-4">অধ্যায় সম্পন্ন হয়েছে</div>
           <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] mb-4 italic tracking-tighter leading-none">
             🎉 অভিনন্দন, <span className="text-[#7C3AED]">{result.name}</span>!
           </h1>
           <p className="text-xl md:text-2xl text-slate-500 italic">
              তুমি সফলভাবে এই অধ্যায় শেষ করেছো।
           </p>
           <p className="text-sm text-[#2563EB] font-bold mt-2">
             {subjectTitle}
           </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
           {/* Correct Score */}
           <div className="p-5 rounded-2xl flex flex-col items-center justify-center transition-all bg-slate-50 border border-slate-200 shadow-inner">
              <span className="text-2xl md:text-3xl font-black text-[#22C55E]">{result.score}</span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-black mt-2">সঠিক উত্তর</span>
           </div>

           {/* Wrong count */}
           <div className="p-5 rounded-2xl flex flex-col items-center justify-center transition-all bg-slate-50 border border-slate-200 shadow-inner">
              <span className="text-2xl md:text-3xl font-black text-[#EF4444]">{wrongCount}</span>
              <span className="text-[10px] tracking-widest text-slate-400 uppercase font-black mt-2">ভুল উত্তর</span>
           </div>

           {/* Accuracy */}
           <div className="p-5 rounded-2xl flex flex-col items-center justify-center transition-all shadow-md text-white" style={{ background: isGood ? '#22C55E' : (isPass ? '#F59E0B' : '#EF4444') }}>
              <span className="text-2xl md:text-3xl font-black">{percentage}%</span>
              <span className="text-[10px] tracking-widest uppercase text-white/80 font-black mt-2">শতকরা ফলাফল</span>
           </div>

           {/* XP Earned */}
           <div className="p-5 rounded-2xl flex flex-col items-center justify-center transition-all bg-yellow-400/10 border border-yellow-400/30 shadow-inner">
              <span className="text-2xl md:text-3xl font-black text-yellow-600">+{xpEarned}</span>
              <span className="text-[10px] tracking-widest uppercase text-yellow-600/80 font-black mt-2">অর্জিত XP</span>
           </div>
        </div>

        {/* Global rank block */}
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between mb-12">
          <div className="text-left">
            <h4 className="text-sm font-black text-slate-500">গ্লোবাল র‍্যাঙ্ক</h4>
            <p className="text-2xl font-black text-slate-800 italic">সারাদেশের শিক্ষার্থীদের মধ্যে আপনি #{result.rank} অবস্থানে!</p>
          </div>
          <span className="px-5 py-2.5 rounded-xl bg-[#7C3AED] text-white font-black text-xs uppercase tracking-widest mt-4 sm:mt-0 shadow-md">
            লিডারবোর্ড
          </span>
        </div>

        {/* Share Feedback Toast */}
        {copied && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-600 text-xs font-bold"
          >
            ফলাফল ক্লিপবোর্ডে কপি করা হয়েছে! বন্ধুদের সাথে শেয়ার করুন।
          </motion.div>
        )}

        {/* Buttons Action Area */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-200">
            <button 
              onClick={() => navigate(`/quiz/play?subject=${subjectId}`)}
              className="flex-1 h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 transition-all font-black text-sm flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> আবার অনুশীলন
            </button>
            
            <button 
              onClick={handleShare}
              className="flex-1 h-14 rounded-2xl bg-indigo-500 hover:bg-indigo-600 text-white font-black text-sm flex items-center justify-center gap-2 shadow-sm transition-all"
            >
              <Share2 className="w-4 h-4" /> ফলাফল শেয়ার করুন
            </button>

            {subjectId.includes("-ch") && (
              <button 
                onClick={handleNextChapter}
                className="flex-1 h-14 rounded-2xl bg-[#22C55E] hover:bg-[#166534] text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg border-b-4 border-green-900 transition-all"
              >
                পরবর্তী অধ্যায় <ArrowRight className="w-4 h-4" />
              </button>
            )}
         </div>

         <button 
           onClick={() => {
             const parts = subjectId.split("-ch");
             navigate(`/subject/${parts[0]}`);
           }}
           className="mt-6 text-slate-400 hover:text-[#2563EB] text-xs font-bold flex items-center gap-1 mx-auto hover:underline transition-all"
         >
           <Home className="w-4.5 h-4.5" /> বিষয়ে ফিরে যান
         </button>
      </motion.div>
    </div>
  );
};

export default QuizResult;
