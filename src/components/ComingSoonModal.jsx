import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Hammer, Construction, Clock, ChevronRight } from 'lucide-react';

const ComingSoonContext = createContext();

export const ComingSoonProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentTitle, setContentTitle] = useState('');

  const showComingSoon = (title = '') => {
    setContentTitle(title);
    setIsOpen(true);
  };

  const closeComingSoon = () => setIsOpen(false);

  return (
    <ComingSoonContext.Provider value={{ showComingSoon }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeComingSoon}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-primary/10 rounded-full blur-[80px]" />
              <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-secondary/10 rounded-full blur-[80px]" />

              {/* Close Button */}
              <button 
                onClick={closeComingSoon}
                className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:text-primary hover:bg-white hover:scale-110 shadow-lg transition-all duration-300"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Icon Section */}
              <div className="relative mb-10 inline-block">
                <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-primary rotate-3">
                  <Construction className="w-12 h-12 animate-pulse" />
                </div>
                <motion.div 
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 12, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-4 -right-4 w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-xl"
                >
                  <Clock className="w-6 h-6" />
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="absolute -bottom-2 -left-6"
                >
                  <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
                </motion.div>
              </div>

              {/* Text Section */}
              <div className="mb-10">
                <h2 className="text-4xl md:text-5xl font-bn font-black mb-6 leading-tight italic">
                  আমরা এটি নিয়ে <span className="text-primary underline decoration-primary/20 decoration-8 underline-offset-8">কাজ করছি!</span>
                </h2>
                <div className="bg-slate-50 p-4 md:p-6 rounded-2xl md:rounded-3xl border border-dashed border-slate-200 mb-6">
                  <p className="text-slate-500 text-base md:text-lg leading-relaxed">
                    আগ্রহী হওয়ার জন্য ধন্যবাদ! 
                    {contentTitle ? (
                      <span className="text-slate-800 font-bold block mt-2">"{contentTitle}"-এর </span>
                    ) : ''}
                    সম্পূর্ণ নোট এবং রিসোর্স দ্রুতই এই পোর্টালে যুক্ত হবে। 
                  </p>
                </div>
                <p className="text-slate-400 flex items-center gap-2 text-sm italic">
                  <Hammer className="w-4 h-4" /> আরও প্রিমিয়াম অভিজ্ঞতার জন্য অপেক্ষা করুন...
                </p>
              </div>

              {/* Action Button */}
              <button 
                onClick={closeComingSoon}
                className="w-full bg-slate-900 hover:bg-primary text-white py-5 rounded-2xl text-xl font-bn font-black tracking-widest uppercase transition-all duration-500 flex items-center justify-center gap-4 group shadow-2xl"
              >
                ঠিক আছে <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </ComingSoonContext.Provider>
  );
};

export const useComingSoon = () => {
  const context = useContext(ComingSoonContext);
  if (!context) {
    throw new Error('useComingSoon must be used within a ComingSoonProvider');
  }
  return context;
};
