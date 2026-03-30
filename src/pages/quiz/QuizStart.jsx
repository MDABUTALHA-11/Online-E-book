import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { GraduationCap, Keyboard, Rocket, ArrowRight } from 'lucide-react';

const QuizStart = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'exam';
  
  const [formData, setFormData] = useState({ name: '', school: '' });
  const [error, setError] = useState('');

  const handleStart = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.school.trim()) {
      setError('অনুগ্রহ করে আপনার নাম এবং স্কুলের নাম সঠিকভাবে পূরণ করুন।');
      return;
    }
    setError('');
    // Store user data
    localStorage.setItem("user", JSON.stringify({ ...formData, mode }));
    // Redirect to quiz play
    navigate('/quiz/play');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
       {/* Background Decorators */}
       <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse-soft -mr-80 -mt-80 pointer-events-none" />
       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] animate-pulse-soft delay-1000 -ml-40 -mb-40 pointer-events-none" />

       <motion.div 
         initial={{ opacity: 0, scale: 0.9, y: 30 }}
         animate={{ opacity: 1, scale: 1, y: 0 }}
         className="w-full max-w-lg glass-dark p-10 md:p-14 rounded-[3.5rem] shadow-2xl relative z-10 border border-white/10"
       >
         <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] mx-auto flex items-center justify-center mb-8 border border-primary/20 shadow-xl shadow-primary/20 rotate-6" >
            <GraduationCap className="w-12 h-12 text-primary" />
         </div>
         
         <div className="text-center mb-10">
           <h2 className="text-4xl md:text-5xl font-bn font-black text-white italic tracking-tighter mb-4">
             তথ্য <span className="text-primary italic">পূরণ করুন</span>
           </h2>
           <p className="text-slate-400 font-bn italic text-xl">
             কুইজে অংশগ্রহণ করার জন্য আপনার নাম ও স্কুলের নাম দেওয়া আবশ্যক।
           </p>
         </div>

         {error && (
           <div className="mb-8 p-4 bg-red-500/10 border border-red-500/50 rounded-2xl text-red-500 font-bn font-bold text-center animate-pulse">
             {error}
           </div>
         )}
         
         <form onSubmit={handleStart} className="space-y-6">
           <div>
             <label className="block text-slate-400 text-sm font-black en-font uppercase tracking-widest mb-3 px-2">
               Full Name
             </label>
             <div className="relative group">
                <input 
                  type="text"
                  placeholder="আপনার সম্পূর্ণ নাম লিখুন"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900 border-2 border-slate-800 focus:border-primary text-white h-16 px-6 rounded-2xl font-bn text-xl italic transition-all shadow-inner focus:bg-slate-800"
                />
             </div>
           </div>

           <div>
             <label className="block text-slate-400 text-sm font-black en-font uppercase tracking-widest mb-3 px-2 mt-8">
               School Name
             </label>
             <div className="relative group">
                <input 
                  type="text"
                  placeholder="আপনার স্কুলের নাম দিন"
                  value={formData.school}
                  onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                  className="w-full bg-slate-900 border-2 border-slate-800 focus:border-primary text-white h-16 px-6 rounded-2xl font-bn text-xl italic transition-all shadow-inner focus:bg-slate-800"
                />
             </div>
           </div>

           <button 
             type="submit"
             className="w-full h-16 mt-12 btn btn-primary flex justify-center items-center text-xl font-bn font-black italic rounded-[1.5rem] shadow-[0_20px_50px_-15px_rgba(16,185,129,0.5)] group hover:scale-105 transition-transform"
           >
             Quiz শুরু করুন <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform" />
           </button>
         </form>

       </motion.div>
    </div>
  );
};

export default QuizStart;
