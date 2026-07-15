import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, ArrowRight, User, School, Sparkles, Timer } from 'lucide-react';
import { useQuizCount } from '../../hooks/useQuizCount';

const QuizStart = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'exam';
  const subjectId = searchParams.get('subject') || 'physics';
  
  const [formData, setFormData] = useState({ name: '', school: '' });
  const [timerSetting, setTimerSetting] = useState('none'); // 'none', '30', '45', '60'
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
    localStorage.removeItem("quiz_answers");
    localStorage.setItem("user", JSON.stringify({ ...formData, mode, timerSetting }));
    
    // Redirect to quiz play with subject and timer parameters
    navigate(`/quiz/play?subject=${subjectId}&timer=${timerSetting}`);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-app)] flex items-center justify-center p-6 pt-32 pb-40 relative overflow-hidden font-bn">
       {/* Background Decorators */}
       <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#2563EB]/10 rounded-full blur-[150px] animate-pulse-soft -mt-80 pointer-events-none" />
       
       <motion.div 
         initial={{ opacity: 0, scale: 0.95, y: 30 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         className="w-full max-w-xl p-8 md:p-14 rounded-[2.5rem] shadow-2xl relative z-10"
         style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
       >
          <div className="relative mb-10 text-center">
             <div className="w-20 h-20 bg-[#2563EB]/10 rounded-2xl mx-auto flex items-center justify-center border border-[#2563EB]/20 shadow-lg rotate-6" >
                <GraduationCap className="w-10 h-10 text-[#2563EB]" />
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
             <h1 className="text-4xl md:text-5xl font-black text-[#0F172A] mb-4 italic">
               আপনার <span className="text-[#2563EB]">পরিচয় দিন</span>
             </h1>
             <p className="text-lg text-slate-500 italic leading-relaxed">
               সেরাদের তালিকায় নাম লেখাতে এবং চ্যালেঞ্জে অংশ নিতে তথ্যগুলো পূরণ করুন।
             </p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-500 font-bold text-center italic"
            >
              {error}
            </motion.div>
          )}
          
          <form onSubmit={handleStart} className="space-y-6">
            {/* Name input */}
            <div className="relative group">
               <label className="block text-xs font-black tracking-widest text-slate-400 mb-3 px-2 transition-colors group-focus-within:text-[#2563EB]">
                 আপনার নাম
               </label>
               <div className="relative">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] transition-colors">
                   <User className="w-5 h-5" />
                 </div>
                 <input 
                   type="text"
                   placeholder="আপনার নাম লিখুন..."
                   value={formData.name}
                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                   className="w-full h-16 pl-14 pr-6 rounded-xl text-lg italic transition-all outline-none text-[#0F172A] shadow-inner"
                   style={{ background: 'var(--bg-elevated)', border: '1.5px solid var(--bg-border)' }}
                   onFocus={e => e.currentTarget.style.borderColor = '#2563EB'}
                   onBlur={e => e.currentTarget.style.borderColor = 'var(--bg-border)'}
                 />
               </div>
            </div>

            {/* School input */}
            <div className="relative group">
               <label className="block text-xs font-black tracking-widest text-slate-400 mb-3 px-2 transition-colors group-focus-within:text-[#2563EB]">
                 আপনার বিদ্যালয়ের নাম
               </label>
               <div className="relative">
                 <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#2563EB] transition-colors">
                   <School className="w-5 h-5" />
                 </div>
                 <input 
                   type="text"
                   placeholder="বিদ্যালয়ের নাম লিখুন..."
                   value={formData.school}
                   onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                   className="w-full h-16 pl-14 pr-6 rounded-xl text-lg italic transition-all outline-none text-[#0F172A] shadow-inner"
                   style={{ background: 'var(--bg-elevated)', border: '1.5px solid var(--bg-border)' }}
                   onFocus={e => e.currentTarget.style.borderColor = '#2563EB'}
                   onBlur={e => e.currentTarget.style.borderColor = 'var(--bg-border)'}
                 />
               </div>
            </div>

            {/* Timer setting selection */}
            <div className="relative group">
               <label className="block text-xs font-black tracking-widest text-slate-400 mb-3 px-2 flex items-center gap-1.5">
                 <Timer className="w-4 h-4 text-[#2563EB]" /> টাইমার নির্বাচন করুন
               </label>
               <div className="grid grid-cols-2 gap-3">
                 {[
                   { id: 'none', label: 'কোনো টাইমার নয়' },
                   { id: '30', label: '৩০ সেকেন্ড' },
                   { id: '45', label: '৪৫ সেকেন্ড' },
                   { id: '60', label: '৬০ সেকেন্ড' }
                 ].map(t => (
                   <button
                     key={t.id}
                     type="button"
                     onClick={() => setTimerSetting(t.id)}
                     className={`h-14 px-4 rounded-xl text-sm font-bold transition-all border ${timerSetting === t.id ? 'bg-[#2563EB] text-white border-[#2563EB] shadow-md' : 'bg-[var(--bg-elevated)] text-slate-500 border-[var(--bg-border)] hover:bg-slate-100'}`}
                   >
                     {t.label}
                   </button>
                 ))}
               </div>
            </div>

            <button 
              type="submit"
              className="w-full h-16 mt-10 bg-[#EF4444] hover:bg-[#DC2626] text-white flex justify-center items-center text-xl font-black rounded-xl shadow-lg group transition-all duration-300 hover:scale-[1.02] active:scale-95 border-b-4 border-red-955"
            >
              কুইজ শুরু করুন <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

       </motion.div>
    </div>
  );
};

export default QuizStart;
