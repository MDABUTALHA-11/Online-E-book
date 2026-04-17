import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, User, School, Sparkles } from 'lucide-react';
import { useQuizCount } from '../../hooks/useQuizCount';

const QuizStart = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'exam';
  const subjectId = searchParams.get('subject') || 'physics';
  
  const [formData, setFormData] = useState({ name: '', school: '' });
  const [error, setError] = useState('');
  const { incrementCount } = useQuizCount();

  const handleStart = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.school.trim()) {
      setError('অনুগ্রহ করে আপনার নাম এবং স্কুলের নাম সঠিকভাবে পূরণ করুন।');
      return;
    }
    setError('');
    
    // Increment the count in Firebase
    incrementCount();
    
    // Store user data
    localStorage.setItem("user", JSON.stringify({ ...formData, mode }));
    // Redirect to quiz play
    navigate(`/quiz/play?subject=${subjectId}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] flex items-center justify-center p-6 pt-32 pb-40 relative overflow-hidden">
       {/* Background Decorators */}
       <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#22C55E]/10 rounded-full blur-[150px] animate-pulse-soft -mt-80 pointer-events-none" />
       
       <motion.div 
         initial={{ opacity: 0, scale: 0.95, y: 30 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         className="w-full max-w-xl p-8 md:p-14 rounded-[2rem] shadow-2xl relative z-10"
         style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
       >
         <div className="relative mb-10 text-center">
            <div className="w-20 h-20 bg-[#22C55E]/10 rounded-2xl mx-auto flex items-center justify-center border border-[#22C55E]/20 shadow-lg rotate-6" >
               <GraduationCap className="w-10 h-10 text-[#22C55E]" />
            </div>
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 right-1/4 text-yellow-500/50"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
         </div>
         
         <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl sf-headline text-white mb-4 italic">
              আপনার <span className="text-[#22C55E]">পরিচয় দিন</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 font-bn italic leading-relaxed">
              সেরাদের তালিকায় নাম লেখাতে তথ্যগুলো পূরণ করুন।
            </p>
         </div>

         {error && (
           <motion.div 
             initial={{ opacity: 0, y: -10 }}
             animate={{ opacity: 1, y: 0 }}
             className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 font-bn font-bold text-center italic"
           >
             {error}
           </motion.div>
         )}
         
         <form onSubmit={handleStart} className="space-y-6">
           <div className="relative group">
              <label className="block sf-label text-slate-500 mb-3 px-2 transition-colors group-focus-within:text-[#22C55E]">
                NAME
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#22C55E] transition-colors">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text"
                  placeholder="আপনার নাম লিখুন..."
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-16 pl-14 pr-6 rounded-xl font-bn text-xl italic transition-all outline-none text-white shadow-inner"
                  style={{ background: 'var(--bg-elevated)', border: '1.5px solid var(--bg-border)' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--bg-border)'}
                />
              </div>
           </div>

           <div className="relative group">
              <label className="block sf-label text-slate-500 mb-3 px-2 transition-colors group-focus-within:text-[#22C55E]">
                SCHOOL
              </label>
              <div className="relative">
                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#22C55E] transition-colors">
                  <School className="w-5 h-5" />
                </div>
                <input 
                  type="text"
                  placeholder="আপনার স্কুলের নাম দিন..."
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full h-16 pl-14 pr-6 rounded-xl font-bn text-xl italic transition-all outline-none text-white shadow-inner"
                  style={{ background: 'var(--bg-elevated)', border: '1.5px solid var(--bg-border)' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--bg-border)'}
                />
              </div>
           </div>

           <button 
             type="submit"
             className="w-full h-16 mt-10 bg-[#22C55E] hover:bg-[#16a34a] text-white flex justify-center items-center text-xl sf-headline rounded-xl shadow-lg group transition-all duration-300 hover:scale-[1.02] active:scale-95 border-b-4 border-[#15803d]"
           >
             শুরু করুন <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
           </button>
         </form>

       </motion.div>
    </div>
  );
};

export default QuizStart;


