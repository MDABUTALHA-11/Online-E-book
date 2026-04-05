import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight, GraduationCap, School, Lightbulb, Sparkles, BookOpen } from 'lucide-react';

const SurveyPopup = () => {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState({ class: '', science: '' });

  useEffect(() => {
    const answered = localStorage.getItem('shaifly_survey_v2');
    if (!answered) {
      setTimeout(() => setShow(true), 2000);
    }
  }, []);

  const handleFinish = () => {
    localStorage.setItem('shaifly_survey_v2', 'true');
    localStorage.setItem('shaifly_user_pref', JSON.stringify(data));
    setShow(false);
  };

  const nextStep = (update) => {
    setData({ ...data, ...update });
    setStep(step + 1);
  };

  if (!show) return null;

  return (
    <div className="survey-overlay">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          className="bg-[#0d1b2a] border border-[#1e3a5f] w-full max-w-xl rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] relative overflow-hidden"
        >
          {/* Progress Indicator */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#112236]">
             <motion.div 
               className="h-full bg-gradient-to-r from-[#EF4444] to-[#22C55E] rounded-full transition-all duration-500"
               initial={{ width: '25%' }}
               animate={{ width: `${(step + 1) * 25}%` }}
             />
          </div>

          {step === 0 && (
            <div className="text-center py-6">
              <div className="w-24 h-24 bg-[#22C55E]/10 border-2 border-[#22C55E]/20 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 animate-float text-[#22C55E] shadow-2xl shadow-[#22C55E]/10">
                <Sparkles className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-bn font-black mb-4 text-white italic">শাইফলি লাইব্রেরিতে স্বাগতম!</h2>
              <p className="text-slate-400 text-lg mb-10 leading-relaxed font-bn italic font-bold">আপনার জন্য সঠিক একাডেমিক নোট খুঁজে পেতে আমাদের ছোট একটি তথ্য দিন। সময় লাগবে মাত্র ৩০ সেকেন্ড!</p>
              <button 
                onClick={() => setStep(1)}
                className="w-full py-5 text-xl rounded-2xl bg-[#22C55E] text-white font-bn font-black italic shadow-[0_8px_25px_rgba(34,197,94,0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                আরম্ভ করুন <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="text-4xl font-bn font-black mb-10 text-center text-white italic">আপনার শ্রেণি কোনটি?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-bn italic font-black">
                {[
                  { id: 'SSC', name: 'SSC', icon: GraduationCap, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/5', border: 'hover:border-[#22C55E]/40' },
                  { id: 'HSC', name: 'HSC', icon: School, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/5', border: 'hover:border-[#EF4444]/40' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => nextStep({ class: item.id })}
                    className={`flex flex-col items-center justify-center p-12 rounded-[2.5rem] border-2 border-[#1e3a5f] ${item.bg} ${item.border} transition-all group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <item.icon className={`w-16 h-16 mb-4 ${item.color} group-hover:scale-110 transition-transform relative z-10`} />
                    <span className="text-3xl font-black text-white relative z-10">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-4xl font-bn font-black mb-10 text-center text-white italic">আপনি কি বিজ্ঞান পছন্দ করেন?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 font-bn italic font-black">
                {[
                  { id: 'Yes', name: 'হ্যাঁ, ভালোবাসি', icon: Lightbulb, color: 'text-[#22C55E]', bg: 'bg-[#22C55E]/5', border: 'hover:border-[#22C55E]/40' },
                  { id: 'No', name: 'অন্য বিভাগ', icon: BookOpen, color: 'text-[#EF4444]', bg: 'bg-[#EF4444]/5', border: 'hover:border-[#EF4444]/40' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => nextStep({ science: item.id })}
                    className={`flex flex-col items-center justify-center p-12 rounded-[2.5rem] border-2 border-[#1e3a5f] ${item.bg} ${item.border} transition-all group relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <item.icon className={`w-16 h-16 mb-4 ${item.color} group-hover:scale-110 transition-transform relative z-10`} />
                    <span className="text-xl font-bold text-white relative z-10">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-24 h-24 bg-gradient-to-br from-[#22C55E] to-[#16a34a] rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 shadow-[0_15px_40px_rgba(34,197,94,0.4)] text-white relative">
                <Check className="w-12 h-12" />
                <motion.div 
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
                  className="absolute -top-4 -right-4 w-10 h-10 bg-[#EF4444] text-white rounded-full flex items-center justify-center shadow-lg"
                >
                   <Sparkles className="w-5 h-5" />
                </motion.div>
              </div>
              <h3 className="text-4xl font-bn font-black mb-4 text-white italic">সব তৈরি!</h3>
              <p className="text-slate-400 text-lg mb-10 font-bn italic font-bold">ধন্যবাদ তথ্য দেওয়ার জন্য। শাইফলি লাইব্রেরি এখন আপনার জন্য প্রস্তুত।</p>
              <button 
                onClick={handleFinish}
                className="w-full py-5 text-xl rounded-2xl bg-gradient-to-r from-[#22C55E] to-[#16a34a] text-white font-bn font-black italic shadow-2xl hover:scale-[1.02] active:scale-95 transition-all"
              >
                প্রবেশ করুন
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SurveyPopup;
