import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, Award, ArrowRight, Activity, Zap, ShieldCheck, Trophy, Home } from 'lucide-react';
import { physicsQuestions } from '../../data/physicsQuestions';
import { chemistryQuestions } from '../../data/chemistryQuestions';
import { higherMathQuestions } from '../../data/higherMathQuestions';
import { biologyQuestions } from '../../data/biologyQuestions';
import { scienceQuestions } from '../../data/scienceQuestions';
import { mathQuestions } from '../../data/mathQuestions';
import { db } from '../../lib/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const QuizResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const answers = JSON.parse(localStorage.getItem('quiz_answers')) || {};
    
    if (!user) {
      navigate('/quiz');
      return;
    }

    const params = new URLSearchParams(location.search);
    const subjectId = params.get('subject') || 'physics';

    const questionsMap = {
      'physics': physicsQuestions,
      'chemistry': chemistryQuestions,
      'higher-math': higherMathQuestions,
      'biology': biologyQuestions,
      'science': scienceQuestions,
      'math': mathQuestions,
    };
    const questions = questionsMap[subjectId] || physicsQuestions;

    // Calculate score
    let calculatedScore = 0;
    questions.forEach((q, index) => {
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
          if ((data.subject || 'physics') === subjectId) {
            const key = `${data.name}-${data.school}`;
            if (!uniqueMap.has(key) || uniqueMap.get(key).score < data.score) {
              uniqueMap.set(key, data);
            }
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

  }, [navigate, location.search]);

  if (!result) return null;

  const percentage = Math.round((result.score / result.total) * 100);
  const isGood = percentage >= 80;
  const isPass = percentage >= 40;

  return (
    <div className="min-h-screen bg-[var(--bg-app)] flex items-center justify-center p-6 relative overflow-hidden pt-32 pb-40">
      {/* Background Decorator */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#22C55E]/10 rounded-full blur-[150px] animate-pulse-soft -mt-80 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="w-full max-w-3xl p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] shadow-2xl relative z-10 text-center"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
      >
        {/* Animated Trophy Icon */}
        <div className="relative mb-10">
           <motion.div 
             initial={{ scale: 0 }}
             animate={{ scale: 1 }}
             transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
             className="w-28 h-28 md:w-36 md:h-36 mx-auto bg-[#22C55E]/10 rounded-[2.5rem] md:rounded-[3rem] shadow-lg flex items-center justify-center rotate-6 border border-[#22C55E]/20"
           >
             <Trophy className="w-14 h-14 md:w-18 md:h-18 text-[#22C55E] drop-shadow-md" />
           </motion.div>
        </div>

        <div className="mb-10 text-center">
           <div className="sf-label text-[#22C55E] tracking-[0.3em] uppercase text-[11px] mb-4">EXAM COMPLETED</div>
           <h1 className="text-4xl md:text-7xl sf-headline text-white mb-4 italic tracking-tighter leading-none">
             অভিনন্দন, <span className="text-[#22C55E]">{result.name}</span>!
           </h1>
           <p className="text-xl md:text-2xl font-bn text-slate-400 italic">
              সেরাদের তালিকায় তুমি এখন <span className="text-white font-black italic">#{result.rank}</span> অবস্থানে।
           </p>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-12">
           <div className="p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center transition-all shadow-inner" style={{ background: 'var(--bg-elevated)', border: '1.5px solid var(--bg-border)' }}>
              <Activity className="w-8 h-8 text-[#22C55E] mb-3 opacity-50" />
              <div className="text-3xl md:text-4xl sf-headline text-white italic">{result.score}<span className="text-xl text-slate-700 italic">/{result.total}</span></div>
              <div className="sf-label text-[10px] tracking-widest text-slate-600 uppercase mt-2">Score</div>
           </div>

           <div className="p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center transition-all shadow-xl" style={{ 
             background: isGood ? '#22C55E' : (isPass ? '#eab308' : '#ef4444'),
             border: '1.5px solid rgba(255,255,255,0.2)'
           }}>
              <Zap className="w-8 h-8 text-white mb-3" />
              <div className="text-3xl md:text-4xl sf-headline text-white italic">{percentage}%</div>
              <div className="sf-label text-[10px] tracking-widest uppercase text-white/70 mt-2">Accuracy</div>
           </div>

           <div className="p-6 md:p-8 rounded-2xl flex flex-col items-center justify-center transition-all shadow-inner" style={{ background: 'var(--bg-elevated)', border: '1.5px solid var(--bg-border)' }}>
              <Award className="w-8 h-8 text-indigo-400 mb-3 opacity-50" />
              <div className="text-3xl md:text-4xl sf-headline text-indigo-400 italic">#{result.rank}</div>
              <div className="sf-label text-[10px] tracking-widest uppercase text-slate-600 mt-2">Rank</div>
           </div>
        </div>

        {/* Buttons Action Area */}
        <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-12 pt-10 border-t border-[var(--bg-border)]">
           <button 
             onClick={() => navigate('/quiz')}
             className="w-full h-16 rounded-2xl bg-[var(--bg-elevated)] hover:bg-[#1a2e4a] border border-[var(--bg-border)] text-slate-400 hover:text-white transition-all sf-headline text-lg italic flex items-center justify-center gap-3"
           >
             <Home className="w-5 h-5" /> ঘরে ফিরুন
           </button>
           <button 
             onClick={() => navigate(`/quiz/leaderboard?subject=${result.subject}`)}
             className="w-full h-16 rounded-2xl bg-[#22C55E] hover:bg-[#16a34a] text-white sf-headline text-lg italic flex items-center justify-center gap-3 shadow-lg border-b-4 border-[#15803d] hover:scale-[1.02] active:scale-95 transition-all"
           >
             লিডারবোর্ড দেখুন <Award className="w-5 h-5" />
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizResult;


