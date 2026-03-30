import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Zap, Users, Activity, FlaskConical, Sigma, Dna, Play } from 'lucide-react';
import { useQuizCount } from '../../hooks/useQuizCount';

const quizSubjects = [
  {
    id: 'physics',
    titleEn: 'Physics 1.0',
    titleBn: 'পদার্থবিজ্ঞান',
    desc: 'Fundamentals of Physics',
    icon: Zap,
    gradient: 'from-blue-600/10 to-indigo-900/10',
    hoverGradient: 'group-hover:from-blue-600/20 group-hover:to-indigo-900/20',
    iconBg: 'bg-blue-500/20',
    iconColor: 'text-blue-400',
    borderColor: 'border-blue-500/20 group-hover:border-blue-500/50',
    shadow: 'hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)]',
    btnBg: 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/30'
  },
  {
    id: 'chemistry',
    titleEn: 'Chemistry 1.0',
    titleBn: 'রসায়ন',
    desc: 'Basic Concepts of Chemistry',
    icon: FlaskConical,
    gradient: 'from-emerald-600/10 to-teal-900/10',
    hoverGradient: 'group-hover:from-emerald-600/20 group-hover:to-teal-900/20',
    iconBg: 'bg-emerald-500/20',
    iconColor: 'text-emerald-400',
    borderColor: 'border-emerald-500/20 group-hover:border-emerald-500/50',
    shadow: 'hover:shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)]',
    btnBg: 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-500/30'
  },
  {
    id: 'higher-math',
    titleEn: 'Higher Math 1.0',
    titleBn: 'উচ্চতর গণিত',
    desc: 'Advanced Mathematics',
    icon: Sigma,
    gradient: 'from-orange-600/10 to-red-900/10',
    hoverGradient: 'group-hover:from-orange-600/20 group-hover:to-red-900/20',
    iconBg: 'bg-orange-500/20',
    iconColor: 'text-orange-400',
    borderColor: 'border-orange-500/20 group-hover:border-orange-500/50',
    shadow: 'hover:shadow-[0_0_40px_-10px_rgba(249,115,22,0.3)]',
    btnBg: 'bg-orange-600 hover:bg-orange-500 shadow-orange-500/30'
  },
  {
    id: 'biology',
    titleEn: 'Biology 1.0',
    titleBn: 'জীববিজ্ঞান',
    desc: 'Life Sciences',
    icon: Dna,
    gradient: 'from-green-600/10 to-emerald-900/10',
    hoverGradient: 'group-hover:from-green-600/20 group-hover:to-emerald-900/20',
    iconBg: 'bg-green-500/20',
    iconColor: 'text-green-400',
    borderColor: 'border-green-500/20 group-hover:border-green-500/50',
    shadow: 'hover:shadow-[0_0_40px_-10px_rgba(34,197,94,0.3)]',
    btnBg: 'bg-green-600 hover:bg-green-500 shadow-green-500/30'
  }
];

const QuizHome = () => {
  const navigate = useNavigate();
  const { count } = useQuizCount();

  const handleStart = (subjectId) => {
    navigate(`/quiz/start?subject=${subjectId}&mode=exam`);
  };

  return (
    <div className="min-h-screen bg-slate-950 pt-32 pb-20 relative overflow-hidden flex flex-col items-center">
      {/* Background Decorators */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] animate-pulse-soft delay-1000 pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 max-w-6xl relative z-10"
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

        <div className="text-center mb-16">
          <h1 className="text-white text-5xl md:text-7xl font-bn font-black italic leading-[1.1] tracking-tighter mb-4">
            SSC Super <span className="text-primary">Group</span> Quiz
          </h1>
          <p className="text-slate-400 font-bn text-xl md:text-3xl italic max-w-3xl mx-auto leading-relaxed">
            Choose your subject and start the challenge. Real exam environment with timer and live leaderboard.
          </p>
        </div>

        {/* 2x2 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {quizSubjects.map((subject) => {
            const Icon = subject.icon;
            
            return (
              <motion.div 
                key={subject.id}
                whileHover={{ y: -5 }}
                className={`rounded-[2.5rem] p-8 md:p-10 bg-gradient-to-br ${subject.gradient} ${subject.hoverGradient} border ${subject.borderColor} transition-all duration-300 ${subject.shadow} relative overflow-hidden group backdrop-blur-sm bg-slate-900/50 flex flex-col`}
              >
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full blur-2xl" />

                <div className="flex items-start justify-between mb-8">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${subject.iconBg} ${subject.iconColor} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  
                  <div className="text-right">
                    <h3 className="text-2xl font-black text-white tracking-tight">{subject.titleEn}</h3>
                    <p className="text-slate-400 text-sm tracking-wide">{subject.desc}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-4xl font-bn font-black italic text-white mb-2">{subject.titleBn}</h4>
                  <div className="flex items-center gap-4 text-slate-300">
                    <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="text-sm font-bold">{subject.questions} Quiz</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-black/20 px-3 py-1.5 rounded-lg border border-white/5">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-sm font-bold">{subject.time} Minutes</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={() => handleStart(subject.id)}
                    className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-bold transition-all shadow-lg text-lg group/btn ${subject.btnBg}`}
                  >
                    <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="currentColor" />
                    Enter Exam
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizHome;
