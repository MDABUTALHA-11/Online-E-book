import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight, ChevronLeft, AlertCircle, Zap, CheckCircle2, Heart, Volume2, VolumeX, RefreshCw, Trophy, Home, Sparkles, BookOpen, X } from "lucide-react";
import { getSubjectChapterQuestions, getSubjectMeta, getSubjectChapters } from "../../data/unifiedSubjectsData";
import { chemistryQuestions } from "../../data/chemistryQuestions";
import { higherMathQuestions } from "../../data/higherMathQuestions";
import { biologyQuestions } from "../../data/biologyQuestions";
import { scienceQuestions } from "../../data/scienceQuestions";
import { mathQuestions } from "../../data/mathQuestions";
import { hscPhysics1Questions } from "../../data/hscPhysics1Questions";
import { hscChemistry1Questions } from "../../data/hscChemistry1Questions";
import { hscHigherMath1Questions } from "../../data/hscHigherMath1Questions";
import { hscBiology1Questions } from "../../data/hscBiology1Questions";
import { hscIctQuestions } from "../../data/hscIctQuestions";

const questionsMap = {
  chemistry: chemistryQuestions,
  "higher-math": higherMathQuestions,
  biology: biologyQuestions,
  science: scienceQuestions,
  math: mathQuestions,
  "hsc-physics-1": hscPhysics1Questions,
  "hsc-chemistry-1": hscChemistry1Questions,
  "hsc-higher-math-1": hscHigherMath1Questions,
  "hsc-biology-1": hscBiology1Questions,
  "hsc-ict": hscIctQuestions,
};

const SUCCESS_MESSAGES = [
  "🎉 দারুণ!", "🌟 অসাধারণ!", "🔥 চমৎকার!", "🏆 একদম সঠিক!", "👏 খুব ভালো!",
  "💯 ব্রাভো!", "🚀 তুমি অসাধারণ!", "✨ দারুণ কাজ!", "🌈 চালিয়ে যাও!", "⭐ মাশাআল্লাহ!",
  "🎯 একদম ঠিক!", "🥳 বাহ! দুর্দান্ত!", "🏅 তুমি সত্যিই মেধাবী!", "❤️ অনেক ভালো করছো!", "🎊 এভাবেই এগিয়ে যাও!"
];

const WRONG_MESSAGES = [
  "🙂 সমস্যা নেই!", "💪 আবার চেষ্টা করো!", "📚 ভুল থেকেই শেখা শুরু হয়।", "🌟 তুমি পারবে!",
  "🚀 আরেকবার ভাবো।", "❤️ হাল ছেড়ো না।", "🔥 অনুশীলনই সফলতার চাবিকাঠি।", "😊 খুব কাছাকাছি ছিলে!",
  "⭐ পরেরবার ঠিক হবে।", "📖 ব্যাখ্যাটি পড়ে আবার চেষ্টা করো।", "💡 আরেকটু মনোযোগ দাও।", "🌈 শেখার যাত্রা চলতেই থাকে।",
  "🎯 চেষ্টা চালিয়ে যাও।"
];

const playSound = (type, isSoundOn) => {
  if (!isSoundOn) return;
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    if (type === 'correct') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.setValueAtTime(659.25, ctx.currentTime + 0.08); // E5
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else if (type === 'wrong') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(110, ctx.currentTime + 0.2);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + 0.22);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } else if (type === 'complete') {
      const playTone = (freq, start, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime + start);
        osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
        gain.gain.setValueAtTime(0.06, ctx.currentTime + start);
        gain.gain.exponentialRampToValueAtTime(0.005, ctx.currentTime + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + start);
        osc.stop(ctx.currentTime + start + duration);
      };
      playTone(523.25, 0, 0.12);
      playTone(659.25, 0.12, 0.12);
      playTone(783.99, 0.24, 0.12);
      playTone(1046.50, 0.36, 0.25);
    }
  } catch (e) {
    console.error("Audio Synthesis error:", e);
  }
};

const QuizPlay = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subject") || "physics-ch1";
  const timerParam = searchParams.get("timer") || "none";

  // Resolve Subject Title
  const parts = subjectId.split("-ch");
  const subjSlug = parts[0];
  const matchedSubj = getSubjectMeta(subjSlug);
  const matchedChaps = getSubjectChapters(subjSlug);
  const matchedChap = matchedChaps.find(c => c.id === subjectId);
  
  let subjectTitle = "কুইজ জোন";
  if (matchedSubj && matchedChap) {
    subjectTitle = `${matchedSubj.nameBn} - অধ্যায় ${matchedChap.num}: ${matchedChap.titleBn}`;
  } else {
    if (subjectId === 'chemistry') subjectTitle = 'রসায়নবিজ্ঞান';
    else if (subjectId === 'higher-math') subjectTitle = 'উচ্চতর গণিত';
    else if (subjectId === 'biology') subjectTitle = 'জীববিজ্ঞান';
    else if (subjectId === 'science') subjectTitle = 'সাধারণ বিজ্ঞান';
    else if (subjectId === 'math') subjectTitle = 'সাধারণ গণিত';
  }

  // Resolve questions source
  const rawQuestions = useMemo(() => getSubjectChapterQuestions(subjSlug, subjectId), [subjSlug, subjectId]);

  // States
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({}); // Stores originalIndex: selectedOption
  const [currentSelected, setCurrentSelected] = useState(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Game metrics
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [consecutiveWrong, setConsecutiveWrong] = useState(0);
  const [soundOn, setSoundOn] = useState(() => localStorage.getItem("quiz_sound") !== "off");

  // Timer logic
  const isPerQuestionTimer = timerParam !== "none";
  const questionDuration = isPerQuestionTimer ? parseInt(timerParam) : 30; // seconds
  const [timeLeft, setTimeLeft] = useState(questionDuration);
  const timerRef = useRef(null);

  // Shuffling on load
  useEffect(() => {
    if (rawQuestions && rawQuestions.length > 0) {
      const shuffled = rawQuestions.map((q, idx) => {
        const shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);
        return {
          ...q,
          originalIndex: idx,
          options: shuffledOpts
        };
      }).sort(() => Math.random() - 0.5);
      
      setShuffledQuestions(shuffled);
    }
  }, [rawQuestions]);

  // Auth checking
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/quiz");
  }, [navigate]);

  // Timer logic for per-question timer
  useEffect(() => {
    if (!isPerQuestionTimer || hasAnswered || shuffledQuestions.length === 0) return;
    
    setTimeLeft(questionDuration);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex, hasAnswered, shuffledQuestions, isPerQuestionTimer]);

  const handleTimeOut = () => {
    if (hasAnswered) return;
    // Count as incorrect
    setIsCorrect(false);
    setHasAnswered(true);
    setCurrentSelected("");
    const randomMsg = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
    setFeedbackMsg(`⏰ সময় শেষ! ${randomMsg}`);
    playSound('wrong', soundOn);

    // Consecutive wrong count for lives system
    setStreak(0);
    setConsecutiveWrong(prev => {
      const next = prev + 1;
      if (next === 3) {
        setLives(l => Math.max(0, l - 1));
        return 0;
      }
      return next;
    });
  };

  const handleOptionSelect = (option) => {
    if (hasAnswered) return;
    
    setCurrentSelected(option);
    const currentQ = shuffledQuestions[currentIndex];
    const correct = option === currentQ.answer;
    
    setIsCorrect(correct);
    setHasAnswered(true);
    clearInterval(timerRef.current);

    // Save answer under original index for backward-compatibility recalculation
    setAnswers(prev => ({ ...prev, [currentQ.originalIndex]: option }));

    if (correct) {
      const randomMsg = SUCCESS_MESSAGES[Math.floor(Math.random() * SUCCESS_MESSAGES.length)];
      setFeedbackMsg(randomMsg);
      playSound('correct', soundOn);

      // Streak and XP increases
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      setConsecutiveWrong(0);

      // XP: +10 base. If streak is multiple of 3 or 5, give streak bonus +20 XP!
      let xpEarned = 10;
      if (nextStreak > 0 && (nextStreak % 3 === 0 || nextStreak % 5 === 0)) {
        xpEarned += 20;
      }
      setXp(prev => prev + xpEarned);

    } else {
      const randomMsg = WRONG_MESSAGES[Math.floor(Math.random() * WRONG_MESSAGES.length)];
      setFeedbackMsg(randomMsg);
      playSound('wrong', soundOn);

      setStreak(0);
      setConsecutiveWrong(prev => {
        const next = prev + 1;
        if (next === 3) {
          setLives(l => Math.max(0, l - 1));
          return 0;
        }
        return next;
      });
    }
  };

  const toggleSound = () => {
    const nextVal = !soundOn;
    setSoundOn(nextVal);
    localStorage.setItem("quiz_sound", nextVal ? "on" : "off");
  };

  const handleNext = () => {
    if (currentIndex < shuffledQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentSelected(null);
      setHasAnswered(false);
      setFeedbackMsg("");
    } else {
      handleQuizFinished();
    }
  };

  const handleQuizFinished = () => {
    playSound('complete', soundOn);
    
    // Save final stats to LocalStorage
    localStorage.setItem("quiz_answers", JSON.stringify(answers));
    
    // Calculate final score
    let calculatedScore = 0;
    shuffledQuestions.forEach((q) => {
      if (answers[q.originalIndex] === q.answer) {
        calculatedScore++;
      }
    });

    const user = JSON.parse(localStorage.getItem('user')) || {};
    
    // Accumulate total XP
    const currentTotalXp = parseInt(localStorage.getItem("ssc_physics_total_xp")) || 0;
    const isPerfect = calculatedScore === shuffledQuestions.length;
    const finalXpEarned = xp + (isPerfect ? 100 : 0); // +100 XP for completion / perfect
    localStorage.setItem("ssc_physics_total_xp", currentTotalXp + finalXpEarned);

    // Save completed chapter IDs
    if (calculatedScore >= (shuffledQuestions.length * 0.4)) { // completed if accuracy >= 40%
      const completedList = JSON.parse(localStorage.getItem("ssc_physics_completed_chapters")) || [];
      if (!completedList.includes(subjectId)) {
        completedList.push(subjectId);
        localStorage.setItem("ssc_physics_completed_chapters", JSON.stringify(completedList));
      }
    }

    // Save highest streak
    const savedStreak = parseInt(localStorage.getItem("ssc_physics_current_streak")) || 0;
    if (streak > savedStreak) {
      localStorage.setItem("ssc_physics_current_streak", streak);
    }

    // Navigate to results page
    navigate(`/quiz/result?subject=${subjectId}&xp=${finalXpEarned}`);
  };

  const handleRestart = () => {
    // Reload/Restart
    setAnswers({});
    setCurrentIndex(0);
    setCurrentSelected(null);
    setHasAnswered(false);
    setFeedbackMsg("");
    setLives(3);
    setConsecutiveWrong(0);
    setXp(0);
    setStreak(0);
    
    // Reshuffle
    if (rawQuestions && rawQuestions.length > 0) {
      const shuffled = rawQuestions.map((q, idx) => {
        const shuffledOpts = [...q.options].sort(() => Math.random() - 0.5);
        return {
          ...q,
          originalIndex: idx,
          options: shuffledOpts
        };
      }).sort(() => Math.random() - 0.5);
      
      setShuffledQuestions(shuffled);
    }
  };

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--bg-app)]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[var(--bg-border)] border-t-[#2563EB] rounded-full animate-spin" />
          <span className="text-[#0F172A] font-bold text-sm font-bn">কুইজ সাজানো হচ্ছে...</span>
        </div>
      </div>
    );
  }

  const currentQ = shuffledQuestions[currentIndex];
  const progress = ((currentIndex + 1) / shuffledQuestions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  // Custom Streak Alerts
  let streakAlertText = "";
  if (streak > 0) {
    if (streak === 3) streakAlertText = "🔥 টানা ৩টি সঠিক উত্তর!";
    else if (streak === 5) streakAlertText = "🔥 ৫টি সঠিক উত্তর! অসাধারণ!";
    else if (streak === 10) streakAlertText = "🔥 ১০টি সঠিক উত্তর! তুমি সত্যিই প্রতিভাবান!";
    else if (streak > 0 && streak % 3 === 0) streakAlertText = `🔥 টানা ${streak}টি সঠিক উত্তর!`;
  }

  return (
    <div className="min-h-screen pb-40 text-slate-800 font-bn">
      
      {/* Lives game over screen */}
      {lives === 0 && (
        <div className="fixed inset-0 z-[300] bg-[#0A0E1A]/85 backdrop-blur-md flex items-center justify-center p-6">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-md p-10 rounded-[2.5rem] bg-white border border-slate-200 text-center shadow-2xl"
          >
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-red-500 fill-red-500 animate-pulse" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-3 italic">খেলা সমাপ্ত!</h2>
            <p className="text-slate-500 mb-8 leading-relaxed">
              পরপর ভুল উত্তরের কারণে আপনি সমস্ত হার্ট হারিয়েছেন। হাল ছাড়বেন না, অনুশীলনই সফলতার মূল চাবিকাঠি!
            </p>
            <div className="space-y-3">
              <button 
                onClick={handleRestart}
                className="w-full h-14 rounded-2xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-black text-md flex items-center justify-center gap-2 shadow-lg"
              >
                <RefreshCw className="w-5 h-5" /> পুনরায় চেষ্টা করুন
              </button>
              <button 
                onClick={() => navigate('/quiz')}
                className="w-full h-14 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-md flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" /> কুইজ হোমে ফিরুন
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Top HUD Bar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 mb-8 rounded-2xl shadow-md"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)" }}
      >
        <div className="flex flex-col gap-0.5 min-w-0">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#2563EB]">
            {subjectTitle}
          </span>
          <span className="text-[#0F172A] font-black text-[15px] italic">
            প্রশ্ন {currentIndex + 1} / {shuffledQuestions.length}
          </span>
        </div>

        {/* HUD Middle stats */}
        <div className="flex items-center gap-4">
          {/* XP counter */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400/10 text-yellow-600 border border-yellow-400/20 rounded-xl text-xs font-black">
            <Sparkles className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>{xp} XP</span>
          </div>

          {/* Hearts / Lives indicator */}
          <div className="flex items-center gap-1">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Heart 
                key={idx} 
                className={`w-5 h-5 ${idx < lives ? "text-red-500 fill-red-500 animate-pulse" : "text-slate-200"}`} 
              />
            ))}
          </div>

          {/* Audio Toggler */}
          <button 
            onClick={toggleSound}
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-slate-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>
        </div>

        {/* Timer countdown (if active) */}
        {isPerQuestionTimer ? (
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-xl font-black text-md transition-all border"
            style={
              timeLeft <= 5
                ? { background: "rgba(239,68,68,0.15)", color: "#ef4444", borderColor: "rgba(239,68,68,0.3)" }
                : { background: "var(--bg-elevated)", color: "#2563EB", borderColor: "var(--bg-border)" }
            }
          >
            <Clock className="w-4 h-4 animate-spin" />
            {timeLeft} সে.
          </div>
        ) : (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl font-black text-md border bg-slate-50 text-slate-400">
            <Clock className="w-4 h-4" />
            আনলিমিটেড
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-xs font-black text-slate-500 mb-2">
          <span>প্রগতি</span>
          <span>{Math.round(progress)}% সম্পন্ন</span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ background: "#2563EB" }}
            animate={{ width: progress + "%" }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
        
        {/* Question Panel */}
        <div className="space-y-6">
          
          {/* Shuffling Info Banner */}
          {streakAlertText && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-2xl bg-orange-500/10 border border-orange-500/20 text-orange-600 font-bold text-center flex items-center justify-center gap-2 animate-bounce shadow-sm"
            >
              <Sparkles className="w-5 h-5 fill-orange-500 text-orange-500" />
              {streakAlertText}
            </motion.div>
          )}

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
            className="rounded-3xl p-7 md:p-10 shadow-lg border"
            style={{ background: "var(--bg-surface)", borderColor: "var(--bg-border)" }}
          >
            {/* Index badge */}
            <div className="flex items-center gap-3 mb-6">
              <span
                className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm text-[#2563EB]"
                style={{ background: "rgba(37,99,235,0.12)", border: "1px solid rgba(37,99,235,0.25)" }}
              >
                {currentIndex + 1}
              </span>
              <div className="h-px flex-1" style={{ background: "var(--bg-border)" }} />
            </div>

            {/* Question Text */}
            <h2 className="text-[20px] md:text-[25px] font-black text-[#0F172A] leading-relaxed mb-9 italic">
              {currentQ.question}
            </h2>

            {/* Options grid */}
            <div className="flex flex-col gap-3">
              {currentQ.options.map((option, idx) => {
                const isSelected = currentSelected === option;
                const letter = ["ক", "খ", "গ", "ঘ"][idx];
                const isCorrectOption = option === currentQ.answer;

                // Color configuration based on status
                let btnStyle = { background: "var(--bg-elevated)", border: "1.5px solid var(--bg-border)", color: "#0F172A" };
                let numBadgeStyle = { background: "var(--bg-surface)", color: "#475569", border: "1px solid var(--bg-border)" };

                if (hasAnswered) {
                  if (isCorrectOption) {
                    // Reveal correct in green
                    btnStyle = { background: "rgba(34,197,94,0.12)", border: "2px solid #22C55E", color: "#166534" };
                    numBadgeStyle = { background: "#22C55E", color: "white", border: "none" };
                  } else if (isSelected && !isCorrectOption) {
                    // User selected wrong choice
                    btnStyle = { background: "rgba(239,68,68,0.12)", border: "2px solid #EF4444", color: "#991B1B" };
                    numBadgeStyle = { background: "#EF4444", color: "white", border: "none" };
                  } else {
                    // Mute remaining options
                    btnStyle = { background: "var(--bg-surface)", border: "1.5px solid var(--bg-border)", color: "#94a3b8" };
                  }
                } else if (isSelected) {
                  btnStyle = { background: "rgba(37,99,235,0.12)", border: "2px solid #2563EB", color: "#2563EB" };
                  numBadgeStyle = { background: "#2563EB", color: "white", border: "none" };
                }

                return (
                  <motion.button
                    key={option}
                    whileTap={{ scale: hasAnswered ? 1 : 0.98 }}
                    onClick={() => handleOptionSelect(option)}
                    disabled={hasAnswered}
                    className="w-full flex items-center gap-4 px-6 py-5 rounded-2xl text-left transition-all duration-200 font-bold text-md italic shadow-sm hover:shadow-md"
                    style={btnStyle}
                  >
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm shrink-0"
                      style={numBadgeStyle}
                    >
                      {letter}
                    </span>
                    <span className="flex-1">{option}</span>
                    {hasAnswered && isCorrectOption && <CheckCircle2 className="w-5 h-5 ml-auto text-[#22C55E]" />}
                    {hasAnswered && isSelected && !isCorrectOption && <X className="w-5 h-5 ml-auto text-[#EF4444]" />}
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Feedback & Detailed Explanation Section */}
          <AnimatePresence>
            {hasAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="rounded-3xl p-6 md:p-8 border shadow-lg overflow-hidden relative"
                style={{ 
                  background: isCorrect ? "rgba(34,197,94,0.06)" : "rgba(239,68,68,0.04)", 
                  borderColor: isCorrect ? "rgba(34,197,94,0.3)" : "rgba(239,68,68,0.3)" 
                }}
              >
                {/* Visual feedback cards */}
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6 pb-5 border-b border-dashed border-slate-200">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl shadow ${isCorrect ? 'bg-[#22C55E] text-white' : 'bg-[#EF4444] text-white'}`}>
                      {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <X className="w-6 h-6" />}
                    </div>
                    <div>
                      <h3 className={`text-xl font-black italic ${isCorrect ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
                        {feedbackMsg}
                      </h3>
                      <p className="text-slate-400 text-xs mt-0.5 font-bold">
                        {isCorrect ? "অর্জিত: +১০ এক্সপি (XP)" : "ভুল উত্তরের জন্য কোনো এক্সপি দেওয়া হয়নি"}
                      </p>
                    </div>
                  </div>

                  <button 
                    onClick={handleNext}
                    className="h-12 px-6 rounded-xl text-white font-black text-sm flex items-center gap-1 shadow-lg hover:scale-105 active:scale-95 transition-all w-full sm:w-auto justify-center"
                    style={{ background: "#2563EB" }}
                  >
                    {currentIndex === shuffledQuestions.length - 1 ? "কুইজ শেষ করুন" : "পরবর্তী প্রশ্ন"} 
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Explanation Details */}
                {currentQ.explanation && (
                  <div className="space-y-4 text-[#0F172A]">
                    <h4 className="text-lg font-black text-[#7C3AED] flex items-center gap-1.5">
                      <BookOpen className="w-5 h-5" /> বিস্তারিত ব্যাখ্যা
                    </h4>
                    
                    {/* Explain detail */}
                    {currentQ.explanation.detail && (
                      <div className="p-4 rounded-xl bg-white border border-slate-200 text-slate-700 leading-relaxed shadow-sm">
                        {currentQ.explanation.detail}
                      </div>
                    )}

                    {/* Technical details grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Formula */}
                      {currentQ.explanation.formula && currentQ.explanation.formula !== "কোনো সূত্র নেই" && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-xs font-black text-[#2563EB] tracking-wider block mb-1">প্রয়োজনীয় সূত্র</span>
                          <span className="font-mono text-sm block font-bold text-[#0F172A]">{currentQ.explanation.formula}</span>
                        </div>
                      )}

                      {/* Shortcut */}
                      {currentQ.explanation.shortcut && currentQ.explanation.shortcut !== "কোনো শর্টকাট নেই" && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-xs font-black text-[#22C55E] tracking-wider block mb-1">সহজ শর্টকাট</span>
                          <span className="text-sm block text-slate-700 italic">{currentQ.explanation.shortcut}</span>
                        </div>
                      )}

                      {/* Memorization Tip */}
                      {currentQ.explanation.tip && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-xs font-black text-[#F97316] tracking-wider block mb-1">মনে রাখার কৌশল</span>
                          <span className="text-sm block text-slate-700 italic">{currentQ.explanation.tip}</span>
                        </div>
                      )}

                      {/* Real Life Example */}
                      {currentQ.explanation.example && (
                        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <span className="text-xs font-black text-[#7C3AED] tracking-wider block mb-1">বাস্তব জীবনের উদাহরণ</span>
                          <span className="text-sm block text-slate-700 italic">{currentQ.explanation.example}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Question Navigator */}
        <div
          className="rounded-3xl p-5 h-fit sticky top-28 shadow border"
          style={{ background: "var(--bg-surface)", borderColor: "var(--bg-border)" }}
        >
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4" /> প্রশ্ন নেভিগেটর
          </p>
          <div className="grid grid-cols-5 gap-2 max-h-[250px] overflow-y-auto pr-1 no-scrollbar">
            {shuffledQuestions.map((_, idx) => {
              const isCurrent = idx === currentIndex;
              const isAnswered = answers[shuffledQuestions[idx].originalIndex] !== undefined;
              
              let navBtnStyle = { background: "var(--bg-elevated)", border: "1.5px solid var(--bg-border)", color: "#475569" };

              if (isCurrent) {
                navBtnStyle = { background: "#2563EB", border: "none", color: "white" };
              } else if (isAnswered) {
                // Find if correct
                const isQCorrect = answers[shuffledQuestions[idx].originalIndex] === shuffledQuestions[idx].answer;
                navBtnStyle = isQCorrect
                  ? { background: "rgba(34,197,94,0.15)", border: "1.5px solid rgba(34,197,94,0.35)", color: "#22C55E" }
                  : { background: "rgba(239,68,68,0.15)", border: "1.5px solid rgba(239,68,68,0.35)", color: "#EF4444" };
              }

              return (
                <button
                  key={idx}
                  disabled={!isAnswered && idx > currentIndex}
                  onClick={() => setCurrentIndex(idx)}
                  className="w-full aspect-square rounded-xl font-black text-sm transition-all shadow-sm flex items-center justify-center"
                  style={navBtnStyle}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-[var(--bg-border)]">
            <div className="flex justify-between font-black text-xs mb-3">
              <span className="text-slate-400">উত্তর দেওয়া হয়েছে</span>
              <span className="text-[#2563EB]">{answeredCount} / {shuffledQuestions.length}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: (answeredCount / shuffledQuestions.length) * 100 + "%", background: "#2563EB" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizPlay;
