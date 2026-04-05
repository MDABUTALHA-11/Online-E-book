import React, { createContext, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Copy, Send, Phone, CreditCard, ChevronRight, AlertCircle, Loader2, Sparkles } from 'lucide-react';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from './Toast';

const BkashContext = createContext();

export const BkashProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tid, setTid] = useState('');
  const [phone, setPhone] = useState('');
  const [step, setStep] = useState(1); // 1: Instructions, 2: Verification, 3: Success
  const { showToast } = useToast();

  // EDIT THIS: Your bKash Personal/Merchant Number
  const BKASH_NUMBER = "+8801742761220"; 
  const BKASH_TYPE = "Personal"; // or "Merchant"

  const openBkash = (selectedPlan) => {
    setPlan(selectedPlan);
    setIsOpen(true);
    setStep(1);
    setTid('');
    setPhone('');
  };

  const closeBkash = () => {
    if (!isSubmitting) {
      setIsOpen(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast('বিকাশ নম্বর কপি করা হয়েছে!', 'success');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!tid || !phone) {
      showToast('সবগুলো ঘর পূরণ করুন', 'error');
      return;
    }

    if (tid.length < 8) {
      showToast('সঠিক ট্রানজেকশন আইডি দিন', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      await addDoc(collection(db, 'payments'), {
        amount: plan.price,
        planName: plan.name,
        tid: tid.toUpperCase(),
        userPhone: phone,
        userName: user.name || 'Anonymous',
        userEmail: user.email || 'N/A',
        status: 'pending',
        createdAt: serverTimestamp(),
        method: 'bkash'
      });
      
      setStep(3); // Success step
      showToast('আপনার তথ্য জমা দেওয়া হয়েছে!', 'success');
    } catch (error) {
      console.error("Error adding document: ", error);
      showToast('দুঃখিত, কোনো সমস্যা হয়েছে', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <BkashContext.Provider value={{ openBkash }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[10001] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeBkash}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0d1b2a] border border-[#1e3a5f] rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* bKash Header Accent */}
              <div className="h-3 w-full bg-[#D12053]" />

              {/* Close Button */}
              <button 
                onClick={closeBkash}
                className="absolute top-6 right-6 w-10 h-10 bg-[#112236] rounded-2xl flex items-center justify-center text-slate-400 hover:text-white hover:scale-110 shadow-lg transition-all duration-300 z-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-12">
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-16 h-16 bg-[#D12053] rounded-2xl flex items-center justify-center shadow-lg shadow-[#D12053]/20">
                          <Send className="w-8 h-8 text-white" />
                       </div>
                       <div>
                          <h2 className="text-2xl md:text-3xl font-bn font-black italic text-white leading-tight">বিকাশ পেমেন্ট</h2>
                          <p className="text-[#D12053] font-bn font-bold italic text-sm">{plan?.name} — {plan?.price}</p>
                       </div>
                    </div>

                    <div className="space-y-4 mb-10">
                       <div className="bg-[#112236] p-6 rounded-3xl border border-[#1e3a5f] relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-3 bg-[#D12053]/10 text-[#D12053] text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                             {BKASH_TYPE}
                          </div>
                          <p className="text-slate-500 font-bn italic text-sm mb-2 font-bold">এই নম্বরে সেন্ড মানি করুন:</p>
                          <div className="flex items-center justify-between">
                             <span className="text-2xl md:text-3xl font-en font-black text-white tracking-widest">{BKASH_NUMBER}</span>
                             <button 
                               onClick={() => copyToClipboard(BKASH_NUMBER)}
                               className="p-3 bg-[#D12053]/10 text-[#D12053] rounded-xl hover:bg-[#D12053] hover:text-white transition-all shadow-lg"
                             >
                               <Copy className="w-5 h-5" />
                             </button>
                          </div>
                       </div>

                       <div className="grid grid-cols-1 gap-3">
                          {[
                            'বিকাশ অ্যাপে গিয়ে "Send Money" অপশনে যান',
                            `উপরে দেওয়া নম্বরে সঠিক ${plan?.price} টাকা পাঠান`,
                            'ট্রানজেকশন সফল হলে Transaction ID কপি করুন'
                          ].map((text, i) => (
                            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[#060d14]/50 border border-[#1e3a5f]/30">
                               <div className="w-6 h-6 rounded-full bg-[#1e3a5f] flex items-center justify-center text-[10px] font-black text-white shrink-0 mt-0.5">{i+1}</div>
                               <p className="text-[14px] font-bn font-bold italic text-slate-400">{text}</p>
                            </div>
                          ))}
                       </div>
                    </div>

                    <button 
                      onClick={() => setStep(2)}
                      className="w-full h-16 bg-[#D12053] hover:bg-[#E2136E] text-white rounded-2xl text-xl font-bn font-black italic shadow-2xl shadow-[#D12053]/20 transition-all flex items-center justify-center gap-3"
                    >
                      পরবর্তী ধাপ <ChevronRight className="w-6 h-6" />
                    </button>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-16 h-16 bg-[#D12053] rounded-2xl flex items-center justify-center shadow-lg shadow-[#D12053]/20">
                          <CheckCircle className="w-8 h-8 text-white" />
                       </div>
                       <div>
                          <h2 className="text-2xl md:text-3xl font-bn font-black italic text-white leading-tight">ভেরিফিকেশন</h2>
                          <p className="text-slate-400 font-bn font-bold italic text-sm">পেমেন্ট তথ্য প্রদান করুন</p>
                       </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5 mb-10">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4 font-en">Transaction ID (TID)</label>
                          <div className="relative group">
                            <CreditCard className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#D12053] transition-colors" />
                            <input 
                              required
                              type="text" 
                              placeholder="উদাহরণ: ABC123DEF4"
                              className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[#112236] border-[1.5px] border-[#1e3a5f] text-white font-en font-black italic text-[16px] outline-none focus:border-[#D12053]/40 transition-all placeholder:text-slate-700"
                              value={tid}
                              onChange={e => setTid(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 ml-4 font-en">Phone Number</label>
                          <div className="relative group">
                            <Phone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-[#D12053] transition-colors" />
                            <input 
                              required
                              type="tel" 
                              placeholder="আপনার বিকাশ নম্বরটি দিন..."
                              className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[#112236] border-[1.5px] border-[#1e3a5f] text-white font-bn font-black italic text-[16px] outline-none focus:border-[#D12053]/40 transition-all placeholder:text-slate-700"
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="bg-[#D12053]/5 p-4 rounded-2xl border border-[#D12053]/20 flex items-start gap-3">
                           <AlertCircle className="w-5 h-5 text-[#D12053] shrink-0 mt-0.5" />
                           <p className="text-[12px] font-bn italic font-bold text-slate-400">
                              সঠিক তথ্য দিন। ভুল তথ্য দিলে আপনার মেম্বারশিপ এক্টিভেট হতে দেরি হতে পারে।
                           </p>
                        </div>

                        <div className="flex flex-col gap-4">
                           <button 
                             disabled={isSubmitting}
                             type="submit"
                             className="w-full h-16 bg-[#D12053] hover:bg-[#E2136E] text-white rounded-2xl text-xl font-bn font-black italic shadow-2xl shadow-[#D12053]/20 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                           >
                             {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'জমা দিন'}
                           </button>
                           <button 
                             type="button" onClick={() => setStep(1)}
                             className="text-[14px] font-bn font-bold italic text-slate-500 hover:text-white transition-colors"
                           >
                             আগের ধাপে ফিরে যান
                           </button>
                        </div>
                    </form>
                  </motion.div>
                )}

                {step === 3 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                     <div className="w-24 h-24 bg-[#22C55E]/10 rounded-[2.5rem] flex items-center justify-center text-[#22C55E] mx-auto mb-8 shadow-2xl relative">
                        <CheckCircle className="w-12 h-12" />
                        <motion.div 
                          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
                          className="absolute -top-4 -right-4 w-10 h-10 bg-[#22C55E] text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                           <Sparkles className="w-5 h-5" />
                        </motion.div>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bn font-black italic text-white mb-4">ধন্যবাদ!</h2>
                     <p className="text-slate-400 font-bn font-bold italic text-lg leading-relaxed mb-10">
                        আপনার তথ্য আমাদের কাছে পৌঁছেছে। আগামী ১২-২৪ ঘণ্টার মধ্যে ভেরিফিকেশন সম্পন্ন করে আপনার মেম্বারশিপ এক্টিভেট করে দেওয়া হবে।
                     </p>
                     <button 
                       onClick={closeBkash}
                       className="w-full h-16 bg-[#112236] border border-[#1e3a5f] text-white rounded-2xl text-xl font-bn font-black italic hover:bg-[#1e3a5f] transition-all"
                     >
                       বন্ধ করুন
                     </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </BkashContext.Provider>
  );
};

export const useBkash = () => {
  const context = useContext(BkashContext);
  if (!context) {
    throw new Error('useBkash must be used within a BkashProvider');
  }
  return context;
};
