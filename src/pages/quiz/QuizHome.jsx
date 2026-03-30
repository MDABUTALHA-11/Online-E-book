import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Rocket, Trophy, BookOpen, Clock, Activity, ArrowRight, Zap, Users } from 'lucide-react';
import { useQuizCount } from '../../hooks/useQuizCount';

const QuizHome = () => {
  const navigate = useNavigate();
  const { count } = useQuizCount();

  const handleStart = (mode) => {
    navigate(`/quiz/start?mode=${mode}`);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden flex flex-col justify-center items-center">
      {/* Background Decorators */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-soft delay-1000 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 max-w-5xl text-center relative z-10"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(16,185,129,0.2)]">
            <Activity className="w-4 h-4 animate-pulse" /> The Ultimate Challenge
          </div>
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 font-black uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(99,102,241,0.2)]"
          >
            <Users className="w-4 h-4" /> 
            {count > 0 ? `${count.toLocaleString()} Students Joined` : 'Be the first to join!'}
          </motion.div>
        </div>

        <h1 className="text-white text-6xl md:text-[7rem] font-bn font-black italic leading-[0.9] tracking-tighter mb-8">
          SSC Super <br /> <span className="text-primary italic">Group</span> Quiz System
        </h1>
        
        <p className="text-slate-400 font-bn text-xl md:text-3xl italic max-w-3xl mx-auto leading-relaxed mb-16">
          "Test your Physics knowledge" — পদার্থবিজ্ঞানের ৫০টি গুরুত্বপূর্ণ প্রশ্নের সমন্বয়ে গঠিত এই কুইজে অংশগ্রহণ করে যাচাই করুন আপনার প্রস্তুতি।
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Practice Mode */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="rounded-[3rem] p-10 bg-slate-900 border border-slate-800 hover:border-primary/40 transition-all shadow-xl text-center relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-20 h-20 mx-auto bg-slate-800 rounded-[2rem] flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 mb-8 border border-white/5 shadow-2xl group-hover:rotate-6">
              <BookOpen className="w-10 h-10" />
            </div>
            <h3 className="text-3xl font-bn font-black text-white italic mb-4">Practice Mode</h3>
            <p className="text-slate-400 font-bn italic mb-8">কোনো টাইম লিমিট নেই! প্রতি প্রশ্নের উত্তর সাথে সাথেই দেখা যাবে। অনুশীলন করার জন্য দারুণ একটি মাধ্যম।</p>
            <button 
              onClick={() => handleStart('practice')}
              className="btn btn-outline border-slate-700 text-white w-full h-16 rounded-[1.5rem] group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all text-xl font-bn font-black italic"
            >
              Practice শুরু করুন <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          {/* Exam Mode */}
          <motion.div 
            whileHover={{ y: -10 }}
            className="rounded-[3rem] p-10 bg-gradient-to-br from-primary to-emerald-700 border border-primary/40 transition-all shadow-[0_30px_60px_-15px_rgba(16,185,129,0.4)] text-center relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-3xl rounded-full" />
            <div className="w-20 h-20 mx-auto bg-white/10 rounded-[2rem] flex items-center justify-center text-white backdrop-blur-md transition-all duration-500 mb-8 border border-white/20 shadow-2xl group-hover:rotate-6">
              <Zap className="w-10 h-10 animate-pulse" />
            </div>
            <h3 className="text-3xl font-bn font-black text-white italic mb-4">Exam Mode</h3>
            <p className="text-white/80 font-bn italic mb-8">৩০ মিনিট টাইমার! পরীক্ষা শেষে একসাথে ফলাফল ও সম্পূর্ণ লিডারবোর্ড র‍্যাঙ্কিং দেখা যাবে। একদম রিয়েল পরীক্ষার ফিল!</p>
            <button 
              onClick={() => handleStart('exam')}
              className="btn bg-white text-primary w-full h-16 rounded-[1.5rem] hover:bg-slate-100 transition-all text-xl font-bn font-black italic shadow-2xl shadow-primary/40"
            >
              Start Full Exam <Rocket className="w-6 h-6 ml-2 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        <div className="mt-12 text-center">
           <button 
             onClick={() => navigate('/quiz/leaderboard')}
             className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all font-bn italic text-xl shadow-lg"
           >
             <Trophy className="w-6 h-6 text-yellow-500" /> View Leaderboard Rankings
           </button>
        </div>
      </motion.div>
    </div>
  );
};

export default QuizHome;
