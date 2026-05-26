import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronRight, ChevronLeft, AlertCircle, Zap, CheckCircle2 } from "lucide-react";
import { physicsQuestions } from "../../data/physicsQuestions";
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

const QUIZ_DURATION = 30 * 60;

const questionsMap = {
  physics: physicsQuestions,
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

const QuizPlay = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subject") || "physics";
  const questions = questionsMap[subjectId] || physicsQuestions;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION);
  const [submitted, setSubmitted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/quiz");
  }, [navigate]);

  const handleSubmit = useCallback(() => {
    clearInterval(timerRef.current);
    setSubmitted(true);
    localStorage.setItem("quiz_answers", JSON.stringify(answers));
    navigate("/quiz/result?subject=" + subjectId);
  }, [answers, navigate, subjectId]);

  useEffect(() => {
    if (submitted) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [submitted, handleSubmit]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return m + ":" + s;
  };

  const isCritical = timeLeft <= 120;
  const progress = ((currentIndex + 1) / questions.length) * 100;
  const answeredCount = Object.keys(answers).length;
  const currentQ = questions[currentIndex];

  const handleOptionSelect = (option) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [currentIndex]: option }));
  };

  const goNext = () => {
    if (currentIndex < questions.length - 1) setCurrentIndex((i) => i + 1);
  };

  const goPrev = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const jumpTo = (idx) => setCurrentIndex(idx);

  return (
    <div className="min-h-screen pb-40 text-slate-800">
      {/* Top Bar */}
      <div
        className="sticky top-0 z-50 flex items-center justify-between px-5 py-4 mb-8 rounded-2xl"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)" }}
      >
        <div className="flex flex-col gap-1 min-w-0">
          <span className="text-[10px] font-black uppercase tracking-widest text-[#14B8A6]">
            {subjectId.toUpperCase()} QUIZ
          </span>
          <span className="text-[#0F172A] font-black text-[15px] font-bn italic">
            {currentIndex + 1} / {questions.length}
          </span>
        </div>

        <div
          className="flex items-center gap-2 px-4 py-2 rounded-xl font-black text-[18px] transition-all"
          style={
            isCritical
              ? { background: "rgba(239,68,68,0.15)", color: "#f87171", border: "1px solid rgba(239,68,68,0.3)" }
              : { background: "var(--bg-elevated)", color: "#14B8A6", border: "1px solid var(--bg-border)" }
          }
        >
          <Clock className="w-4 h-4" />
          {formatTime(timeLeft)}
        </div>

        <button
          onClick={() => setShowConfirm(true)}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-black text-[13px] text-white transition-all hover:scale-105"
          style={{ background: "#F97316", boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}
        >
          <Zap className="w-4 h-4" />
          জমা দিন
        </button>
      </div>

      {/* Progress Bar */}
      <div className="h-1.5 rounded-full mb-8 overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: "#14B8A6" }}
          animate={{ width: progress + "%" }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">
        {/* Question Card */}
        <div>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl p-7 md:p-10 mb-6"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-[14px] text-white"
                  style={{ background: "rgba(20,184,166,0.12)", border: "1px solid rgba(20,184,166,0.25)" }}
                >
                  {currentIndex + 1}
                </span>
                <div className="h-px flex-1" style={{ background: "var(--bg-border)" }} />
              </div>

              <h2 className="text-[20px] md:text-[26px] font-black font-bn text-[#0F172A] leading-relaxed mb-9 italic">
                {currentQ.question}
              </h2>

              <div className="flex flex-col gap-3">
                {currentQ.options.map((option, idx) => {
                  const isSelected = answers[currentIndex] === option;
                  const letter = ["\u0995", "\u0996", "\u0997", "\u0998"][idx];
                  return (
                    <motion.button
                      key={option}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionSelect(option)}
                      className="w-full flex items-center gap-4 px-6 py-5 rounded-xl text-left transition-all duration-200 font-bn font-black text-[16px] italic"
                      style={
                        isSelected
                          ? { background: "rgba(20,184,166,0.12)", border: "2px solid #14B8A6", color: "#14B8A6", boxShadow: "0 4px 20px rgba(20,184,166,0.12)" }
                          : { background: "var(--bg-elevated)", border: "1.5px solid var(--bg-border)", color: "#94a3b8" }
                      }
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-[13px] shrink-0"
                        style={
                          isSelected
                            ? { background: "#14B8A6", color: "white" }
                            : { background: "var(--bg-surface)", color: "#475569", border: "1px solid var(--bg-border)" }
                        }
                      >
                        {letter}
                      </span>
                      <span className={isSelected ? "text-[#0F172A]" : ""}>{option}</span>
                      {isSelected && <CheckCircle2 className="w-5 h-5 ml-auto text-[#14B8A6]" />}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="flex items-center gap-2 px-6 py-4 rounded-xl font-black text-[14px] transition-all disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "var(--bg-elevated)", border: "1.5px solid var(--bg-border)", color: "#64748b" }}
            >
              <ChevronLeft className="w-5 h-5" /> Previous
            </button>
            <span className="text-[13px] font-black text-slate-500">
              {answeredCount}/{questions.length} answered
            </span>
            <button
              onClick={goNext}
              disabled={currentIndex === questions.length - 1}
              className="flex items-center gap-2 px-6 py-4 rounded-xl font-black text-[14px] text-white transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed"
              style={{ background: "#0F172A", boxShadow: "0 4px 14px rgba(15,23,42,0.15)" }}
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Navigator */}
        <div
          className="rounded-2xl p-5 h-fit sticky top-28"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)" }}
        >
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">
            Question Navigator
          </p>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((_, idx) => {
              const isAnswered = answers[idx] !== undefined;
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={idx}
                  onClick={() => jumpTo(idx)}
                  className="w-full aspect-square rounded-xl font-black text-[13px] transition-all"
                  style={
                    isCurrent
                      ? { background: "#14B8A6", color: "white", boxShadow: "0 4px 12px rgba(20,184,166,0.3)" }
                      : isAnswered
                      ? { background: "rgba(20,184,166,0.12)", border: "1.5px solid rgba(20,184,166,0.35)", color: "#14B8A6" }
                      : { background: "var(--bg-elevated)", border: "1.5px solid var(--bg-border)", color: "#475569" }
                  }
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="mt-6 pt-5 border-t border-[var(--bg-border)]">
            <div className="flex justify-between font-black text-[12px] mb-3">
              <span className="text-slate-500">Answered</span>
              <span className="text-[#14B8A6]">{answeredCount}/{questions.length}</span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--bg-elevated)" }}>
              <div
                className="h-full rounded-full transition-all"
                style={{ width: (answeredCount / questions.length) * 100 + "%", background: "#14B8A6" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6"
            style={{ background: "rgba(15,23,42,0.45)", backdropFilter: "blur(12px)" }}
            onClick={() => setShowConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl p-10 text-center"
              style={{ background: "var(--bg-surface)", border: "1px solid var(--bg-border)" }}
            >
              <AlertCircle className="w-12 h-12 mx-auto mb-5 text-yellow-500" />
              <h3 className="text-[24px] font-black font-bn text-[#0F172A] italic mb-3">
                কুইজ জমা দিতে চান?
              </h3>
              <p className="text-[15px] font-bn text-[#64748b] italic mb-8">
                আপনি <span className="text-[#0F172A] font-black">{answeredCount}</span> টি প্রশ্নের উত্তর দিয়েছেন।
                {answeredCount < questions.length && (
                  <span className="block mt-1 text-yellow-500">
                    {questions.length - answeredCount} টি প্রশ্ন বাকি আছে।
                  </span>
                )}
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-4 rounded-xl font-black text-[15px] font-bn transition-all"
                  style={{ background: "var(--bg-elevated)", border: "1.5px solid var(--bg-border)", color: "#64748b" }}
                >
                  ফিরে যান
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-4 rounded-xl font-black text-[15px] font-bn text-white transition-all hover:scale-105"
                  style={{ background: "#F97316", boxShadow: "0 4px 20px rgba(249,115,22,0.3)" }}
                >
                  হ্যাঁ, জমা দিন
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizPlay;
