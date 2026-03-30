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
          className="bg-white w-full max-w-xl rounded-[2rem] md:rounded-[3rem] p-6 md:p-14 shadow-2xl relative overflow-hidden"
        >
          {/* Progress Indicator */}
          <div className="absolute top-0 left-0 w-full h-2 bg-slate-100">
             <motion.div 
               className="h-full bg-primary rounded-full transition-all duration-500"
               initial={{ width: '25%' }}
               animate={{ width: `${(step + 1) * 25}%` }}
             />
          </div>

          {step === 0 && (
            <div className="text-center py-6">
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 animate-pulse text-primary shadow-lg shadow-primary/20">
                <Sparkles className="w-12 h-12" />
              </div>
              <h2 className="text-3xl font-bn font-black mb-4">শাইফলি লাইব্রেরিতে স্বাগতম!</h2>
              <p className="text-slate-500 text-lg mb-10 leading-relaxed">আপনার জন্য সঠিক একাডেমিক নোট খুঁজে পেতে আমাদের ছোট একটি তথ্য দিন। সময় লাগবে মাত্র ৩০ সেকেন্ড!</p>
              <button 
                onClick={() => setStep(1)}
                className="btn btn-primary btn-lg w-full py-5 text-xl rounded-2xl group"
              >
                আরম্ভ করুন <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          )}

          {step === 1 && (
            <div>
              <h3 className="text-3xl font-bn font-black mb-8 text-center text-slate-800">আপনার শ্রেণি কোনটি?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { id: 'SSC', name: 'SSC', icon: GraduationCap, color: 'text-primary' },
                  { id: 'HSC', name: 'HSC', icon: School, color: 'text-secondary' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => nextStep({ class: item.id })}
                    className="flex flex-col items-center justify-center p-12 rounded-3xl border-2 border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                  >
                    <item.icon className={`w-14 h-14 mb-4 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-2xl font-black en-font text-slate-700">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-3xl font-bn font-black mb-8 text-center text-slate-800">আপনি কি বিজ্ঞান পছন্দ করেন?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { id: 'Yes', name: 'হ্যাঁ, ভালোবাসি', icon: Lightbulb, color: 'text-primary' },
                  { id: 'No', name: 'না, অন্য বিভাগ', icon: BookOpen, color: 'text-slate-400' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => nextStep({ science: item.id })}
                    className="flex flex-col items-center justify-center p-12 rounded-3xl border-2 border-slate-100 hover:border-primary/30 hover:bg-primary/5 transition-all group"
                  >
                    <item.icon className={`w-14 h-14 mb-4 ${item.color} group-hover:scale-110 transition-transform`} />
                    <span className="text-xl font-bold font-bn text-slate-700">{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-6">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-primary/40 text-white">
                <Check className="w-12 h-12" />
              </div>
              <h3 className="text-3xl font-bn font-black mb-4">সব তৈরি!</h3>
              <p className="text-slate-500 text-lg mb-10">ধন্যবাদ তথ্য দেওয়ার জন্য। শাইফলি লাইব্রেরি এখন আপনার জন্য প্রস্তুত।</p>
              <button 
                onClick={handleFinish}
                className="btn btn-primary btn-lg w-full py-5 text-xl rounded-2xl"
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
