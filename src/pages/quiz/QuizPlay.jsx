import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, ChevronLeft, ChevronRight, CheckCircle2, XCircle, Flag, Zap, Check } from 'lucide-react';
import { physicsQuestions } from '../../data/physicsQuestions';
import { chemistryQuestions } from '../../data/chemistryQuestions';
import { higherMathQuestions } from '../../data/higherMathQuestions';
import { biologyQuestions } from '../../data/biologyQuestions';

const QuizPlay = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const subjectId = queryParams.get('subject') || 'physics';

  const questionsMap = {
    'physics': physicsQuestions,
    'chemistry': chemistryQuestions,
    'higher-math': higherMathQuestions,
    'biology': biologyQuestions
  };

  const questions = questionsMap[subjectId] || physicsQuestions;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [user, setUser] = useState(null);

  useEffect(() => {
    let userData = JSON.parse(localStorage.getItem('user'));
    
    // Auto-login as Guest if accessed directly
    if (!userData) {
      userData = { name: "Guest User", school: "Guest School", mode: "exam" };
      localStorage.setItem('user', JSON.stringify(userData));
    }
    
    setUser(userData);
    
    // Initialize empty answers from local storage if exists
    const saved = JSON.parse(localStorage.getItem('quiz_answers')) || {};
    setAnswers(saved);
  }, []);

  useEffect(() => {
    if (!user || user.mode === 'practice') return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, user]);

  // Web Audio Synthesis for crisp, instant sound effects
  const playSound = useCallback((type) => {
    try {
      const authCtx = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = authCtx.createOscillator();
      const gainNode = authCtx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(authCtx.destination);
      
      if (type === 'click') {
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(600, authCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, authCtx.currentTime + 0.1);
        gainNode.gain.setValueAtTime(0.1, authCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, authCtx.currentTime + 0.1);
        oscillator.start(authCtx.currentTime);
        oscillator.stop(authCtx.currentTime + 0.1);
      } else if (type === 'correct') {
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(400, authCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(800, authCtx.currentTime + 0.2);
        gainNode.gain.setValueAtTime(0.1, authCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, authCtx.currentTime + 0.2);
        oscillator.start(authCtx.currentTime);
        oscillator.stop(authCtx.currentTime + 0.2);
      } else if (type === 'wrong') {
        oscillator.type = 'sawtooth';
        oscillator.frequency.setValueAtTime(300, authCtx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(150, authCtx.currentTime + 0.3);
        gainNode.gain.setValueAtTime(0.1, authCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, authCtx.currentTime + 0.3);
        oscillator.start(authCtx.currentTime);
        oscillator.stop(authCtx.currentTime + 0.3);
      }
    } catch (e) {
      // Ignored if browser blocks audio
    }
  }, []);

  const handleSelect = useCallback((option) => {
    if (user?.mode === 'practice' && answers[currentIdx]) return; // disable change in practice mode if already answered
    
      // Play interaction sound
    if (user?.mode === 'practice') {
      playSound(questions[currentIdx].answer === option ? 'correct' : 'wrong');
    } else {
      playSound('click');
    }
    
    setAnswers(prev => {
      const updated = { ...prev, [currentIdx]: option };
      localStorage.setItem('quiz_answers', JSON.stringify(updated));
      return updated;
    });
  }, [user, answers, currentIdx, playSound, questions]);

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      playSound('click');
      setCurrentIdx(prev => prev + 1);
    }
  }, [currentIdx, playSound, questions.length]);

  const handlePrev = useCallback(() => {
    if (currentIdx > 0) {
      playSound('click');
      setCurrentIdx(prev => prev - 1);
    }
  }, [currentIdx, playSound]);

  const handleSubmit = useCallback(() => {
    playSound('click');
    navigate(`/quiz/result?subject=${subjectId}`);
  }, [navigate, playSound, subjectId]);

  const getOptionStyle = useCallback((opt) => {
    if (!user) return '';
    const currentQ = questions[currentIdx];
    const isSelected = answers[currentIdx] === opt;
    const isCorrect = currentQ.answer === opt;
    
    if (user.mode === 'practice' && answers[currentIdx]) {
      if (isCorrect) return 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]';
      if (isSelected && !isCorrect) return 'bg-red-500 border-red-500 text-white shadow-lg shadow-red-500/20 scale-[1.02]';
      return 'bg-white/5 border-white/10 text-slate-500 opacity-50'; // unselected disabled lookup
    }

    if (isSelected) return 'bg-primary border-primary text-white shadow-lg shadow-primary/20 scale-[1.02]';
    return 'bg-slate-900 border-slate-800 text-slate-300 hover:border-primary/50 hover:bg-slate-800 hover:-translate-y-1 transform';
  }, [answers, currentIdx, user, questions]);

  if (!user) return null;

  const currentQ = questions[currentIdx];
  const isLast = currentIdx === questions.length - 1;
  const progress = ((currentIdx + 1) / questions.length) * 100;
  
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6 pt-32 pb-40 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl mx-auto relative z-10 flex flex-col min-h-[70vh]">
        {/* Header Dashboard */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 bg-slate-900/50 p-6 md:p-8 rounded-[2rem] md:rounded-[3.5rem] border border-white/5 backdrop-blur-xl shadow-2xl">
          <div className="flex items-center gap-4 group">
             <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner group-hover:rotate-6 transition-transform">
               <Flag className="w-8 h-8 text-primary" />
             </div>
             <div>
               <p className="text-slate-500 uppercase tracking-widest text-[10px] md:text-xs font-black en-font mb-1">Question Progress ({subjectId.replace('-', ' ').toUpperCase()})</p>
               <h3 className="text-3xl md:text-5xl font-bn font-black text-white italic tracking-tight">{currentIdx + 1} <span className="text-slate-600 text-xl md:text-3xl">/ {questions.length}</span></h3>
             </div>
          </div>
          
          <div className="flex items-center gap-6">
             {user.mode === 'exam' ? (
                <div className={`flex items-center gap-4 px-6 md:px-8 py-4 rounded-[2rem] border shadow-2xl transition-colors duration-1000 ${timeLeft < 300 ? 'bg-red-500/10 border-red-500 text-red-500 animate-pulse' : 'bg-primary/10 border-primary/30 text-primary'}`}>
                  <Clock className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="text-3xl md:text-5xl font-bn font-black italic">{formatTime(timeLeft)}</span>
                </div>
             ) : (
                <div className="flex items-center gap-3 px-6 md:px-8 py-4 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
                  <Zap className="w-6 h-6 md:w-8 md:h-8" />
                  <span className="text-2xl md:text-4xl font-bn font-black italic tracking-widest uppercase">Practice Mode</span>
                </div>
             )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-3 bg-slate-900 rounded-full mb-12 overflow-hidden border border-white/5 shadow-inner">
           <motion.div 
             className="h-full bg-gradient-to-r from-primary to-emerald-400"
             initial={{ width: 0 }}
             animate={{ width: `${progress}%` }}
             transition={{ duration: 0.5, ease: "easeOut" }}
           />
        </div>

        {/* Question Container */}
        <div className="flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIdx}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-900/50 backdrop-blur-xl p-6 md:p-14 rounded-[2rem] md:rounded-[4rem] border border-white/10 shadow-2xl relative"
            >
              <div className="absolute top-0 right-10 -translate-y-1/2 px-6 py-2 bg-slate-800 text-white/50 text-xs font-black uppercase tracking-widest rounded-full border border-white/10 shadow-xl en-font select-none">
                 Q-{currentIdx + 1}
              </div>

              <h2 className="text-3xl md:text-[2.5rem] font-bn font-black text-white italic leading-relaxed mb-12">
                <span className="text-primary mr-4 block md:inline mb-4 md:mb-0 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">প্রশ্ন: </span> 
                {currentQ.question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {currentQ.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelect(opt)}
                    className={`flex items-center p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] border-2 transition-all duration-300 text-left font-bn text-xl md:text-2xl italic group ${getOptionStyle(opt)}`}
                  >
                    <span className="w-10 h-10 md:w-12 md:h-12 rounded-2xl md:rounded-[1.25rem] bg-white/10 flex items-center justify-center mr-6 font-black uppercase text-sm md:text-base en-font shrink-0 group-hover:scale-110 transition-transform">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                    
                    {/* Practice Mode Feedback Icons */}
                    {user.mode === 'practice' && answers[currentIdx] === opt && currentQ.answer === opt && (
                      <CheckCircle2 className="w-8 h-8 ml-auto text-white" />
                    )}
                    {user.mode === 'practice' && answers[currentIdx] === opt && currentQ.answer !== opt && (
                      <XCircle className="w-8 h-8 ml-auto text-white" />
                    )}
                  </button>
                ))}
              </div>

              {/* Practice Mode Explainer Area - Optional */}
              <AnimatePresence>
                {user.mode === 'practice' && answers[currentIdx] && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 bg-white/5 p-6 rounded-[2rem] border border-white/10 text-center font-bn italic"
                  >
                    {answers[currentIdx] === currentQ.answer ? (
                      <div className="text-primary flex items-center justify-center gap-3 text-2xl font-black">
                         <Check className="w-8 h-8" /> সঠিক উত্তর!
                      </div>
                    ) : (
                      <div className="text-red-400 flex items-center justify-center gap-3 text-xl">
                         সঠিক উত্তর হবে: <span className="font-black text-white px-4 py-2 bg-white/10 rounded-xl">{currentQ.answer}</span>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation Box */}
        <div className="flex items-center justify-between mt-12">
          <button
            onClick={handlePrev}
            disabled={currentIdx === 0}
            className={`h-14 md:h-20 px-5 md:px-12 rounded-[1.5rem] md:rounded-[2rem] font-bn font-black italic text-lg md:text-xl transition-all flex items-center gap-2 md:gap-4 ${currentIdx === 0 ? 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5' : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-700 shadow-xl shadow-black/20 group'}`}
          >
            <ChevronLeft className={`w-5 h-5 md:w-8 md:h-8 ${currentIdx === 0 ? '' : 'group-hover:-translate-x-2 transition-transform'}`} /> <span className="hidden sm:inline">আগের প্রশ্ন</span><span className="inline sm:hidden">আগে</span>
          </button>

          {!isLast ? (
            <button
              onClick={handleNext}
              className="h-14 md:h-20 px-5 md:px-12 rounded-[1.5rem] md:rounded-[2rem] bg-white text-slate-900 hover:bg-slate-100 font-bn font-black italic text-lg md:text-xl transition-all flex items-center gap-2 md:gap-4 shadow-xl shadow-white/10 group"
            >
              <span className="hidden sm:inline">পরের প্রশ্ন</span><span className="inline sm:hidden">পরে</span> <ChevronRight className="w-5 h-5 md:w-8 md:h-8 group-hover:translate-x-2 transition-transform" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="h-14 md:h-20 px-6 md:px-16 rounded-[1.5rem] md:rounded-[2rem] btn-primary hover:scale-105 font-bn font-black italic text-lg md:text-2xl transition-all flex items-center gap-2 md:gap-4 shadow-2xl shadow-primary/40 group active:scale-95"
            >
              <span className="hidden sm:inline">ফলাফল দেখুন</span><span className="inline sm:hidden">ফলাফল</span> <CheckCircle2 className="w-5 h-5 md:w-8 md:h-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPlay;
