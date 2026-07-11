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
  const [step, setStep] = useState(1); // 1: Selection, 'manual-instructions': Instructions, 2: Verification, 3: Success
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

  const handleSslPayment = async () => {
    setIsSubmitting(true);
    try {
      const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
      
      const payload = {
        amount: plan.price,
        planName: plan.name,
        userName: currentUser.name || 'Anonymous',
        userEmail: currentUser.email || 'N/A',
        userPhone: phone || currentUser.phone || '',
        userId: currentUser.uid || 'guest',
        type: plan.type || 'subscription',
        subject: plan.subject || null,
        studentProblem: plan.studentProblem || null
      };

      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/payment/initiate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.url) {
        window.location.href = data.url;
      } else {
        showToast(data.error || 'পেমেন্ট গেটওয়ে চালু করা যায়নি।', 'error');
      }
    } catch (error) {
      console.error(error);
      showToast('পেমেন্ট সার্ভারে সংযোগ ব্যর্থ হয়েছে।', 'error');
    } finally {
      setIsSubmitting(false);
    }
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
        method: 'bkash',
        // Support for appointment data
        type: plan.type || 'subscription',
        subject: plan.subject || null,
        studentProblem: plan.studentProblem || null
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
              className="absolute inset-0 bg-[var(--bg-app)]/80 backdrop-blur-xl"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-[2.5rem] md:rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] overflow-hidden"
            >
              {/* Header Accent */}
              <div className="h-3 w-full bg-[#14B8A6]" />

              {/* Close Button */}
              <button 
                onClick={closeBkash}
                className="absolute top-6 right-6 w-10 h-10 bg-[var(--bg-elevated)] rounded-2xl flex items-center justify-center text-slate-400 hover:text-[#0F172A] hover:scale-110 shadow-lg transition-all duration-300 z-50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-12">
                {/* Step 1: Payment Method Selection */}
                {step === 1 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-16 h-16 bg-[#14B8A6] rounded-2xl flex items-center justify-center shadow-lg shadow-[#14B8A6]/20">
                          <CreditCard className="w-8 h-8 text-white" />
                       </div>
                       <div>
                          <h2 className="text-2xl md:text-3xl font-bn font-black italic text-[#0F172A] leading-tight">পেমেন্ট পদ্ধতি</h2>
                          <p className="text-[#14B8A6] font-bn font-bold italic text-sm">{plan?.name} — {plan?.price}</p>
                       </div>
                    </div>

                    <div className="space-y-4 mb-2">
                       {/* Option 1: Automatic SSLCommerz Payment */}
                       <button
                         onClick={handleSslPayment}
                         disabled={isSubmitting}
                         className="w-full p-6 bg-[var(--bg-elevated)] hover:bg-[var(--bg-border)] border border-[var(--bg-border)] hover:border-[#14B8A6]/30 rounded-3xl flex items-center gap-5 transition-all text-left cursor-pointer group animate-fade-in"
                       >
                         <div className="w-12 h-12 rounded-2xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                           {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : <CreditCard className="w-6 h-6" />}
                         </div>
                         <div className="flex-1">
                           <h4 className="text-lg font-bn font-black italic text-[#0F172A] mb-1">স্বয়ংক্রিয় পেমেন্ট (অটোমেটিক)</h4>
                           <p className="text-[12px] font-bn font-bold italic text-slate-500">বিকাশ, নগদ, রকেট, কার্ড দিয়ে সাথে সাথে এক্টিভ করুন</p>
                         </div>
                         <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                       </button>

                       {/* Option 2: Manual Send Money */}
                       <button
                         onClick={() => setStep('manual-instructions')}
                         className="w-full p-6 bg-[var(--bg-elevated)] hover:bg-[var(--bg-border)] border border-[var(--bg-border)] hover:border-[#D12053]/30 rounded-3xl flex items-center gap-5 transition-all text-left cursor-pointer group"
                       >
                         <div className="w-12 h-12 rounded-2xl bg-[#D12053]/10 text-[#D12053] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                           <Send className="w-6 h-6" />
                         </div>
                         <div className="flex-1">
                           <h4 className="text-lg font-bn font-black italic text-[#0F172A] mb-1">ম্যানুয়াল পেমেন্ট (সেন্ড মানি)</h4>
                           <p className="text-[12px] font-bn font-bold italic text-slate-500">আমাদের বিকাশ নম্বরে টাকা পাঠিয়ে ভেরিফাই করুন</p>
                         </div>
                         <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
                       </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 1.5: Manual Payment Instructions */}
                {step === 'manual-instructions' && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-16 h-16 bg-[#D12053] rounded-2xl flex items-center justify-center shadow-lg shadow-[#D12053]/20">
                          <Send className="w-8 h-8 text-white" />
                       </div>
                       <div>
                          <h2 className="text-2xl md:text-3xl font-bn font-black italic text-[#0F172A] leading-tight">ম্যানুয়াল সেন্ড মানি</h2>
                          <p className="text-[#D12053] font-bn font-bold italic text-sm">{plan?.name} — {plan?.price}</p>
                       </div>
                    </div>

                    <div className="space-y-4 mb-10">
                       <div className="bg-[var(--bg-elevated)] p-6 rounded-3xl border border-[var(--bg-border)] relative overflow-hidden group">
                          <div className="absolute top-0 right-0 p-3 bg-[#D12053]/10 text-[#D12053] text-[10px] font-black uppercase tracking-widest rounded-bl-2xl">
                             {BKASH_TYPE}
                          </div>
                          <p className="text-slate-500 font-bn italic text-sm mb-2 font-bold">এই নম্বরে সেন্ড মানি করুন:</p>
                          <div className="flex items-center justify-between">
                             <span className="text-2xl md:text-3xl font-en font-black text-[#0F172A] tracking-widest">{BKASH_NUMBER}</span>
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
                            <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-[var(--bg-app)]/50 border border-[var(--bg-border)]/30">
                               <div className="w-6 h-6 rounded-full bg-[var(--bg-border)] flex items-center justify-center text-[10px] font-black text-slate-500 shrink-0 mt-0.5">{i+1}</div>
                               <p className="text-[14px] font-bn font-bold italic text-slate-500">{text}</p>
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="flex flex-col gap-4">
                       <button 
                         onClick={() => setStep(2)}
                         className="w-full h-16 bg-[#D12053] hover:bg-[#E2136E] text-white rounded-2xl text-xl font-bn font-black italic shadow-2xl shadow-[#D12053]/20 transition-all flex items-center justify-center gap-3"
                       >
                         পরবর্তী ধাপ <ChevronRight className="w-6 h-6" />
                       </button>
                       <button 
                         type="button" onClick={() => setStep(1)}
                         className="text-[14px] font-bn font-bold italic text-slate-500 hover:text-[#0F172A] transition-colors text-center"
                       >
                         আগের ধাপে ফিরে যান
                       </button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Verification */}
                {step === 2 && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                    <div className="flex items-center gap-4 mb-8">
                       <div className="w-16 h-16 bg-[#D12053] rounded-2xl flex items-center justify-center shadow-lg shadow-[#D12053]/20">
                          <CheckCircle className="w-8 h-8 text-white" />
                       </div>
                       <div>
                          <h2 className="text-2xl md:text-3xl font-bn font-black italic text-[#0F172A] leading-tight">ভেরিফিকেশন</h2>
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
                              className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[var(--bg-elevated)] border-[1.5px] border-[var(--bg-border)] text-[#0F172A] font-en font-black italic text-[16px] outline-none focus:border-[#D12053]/40 transition-all placeholder:text-slate-400"
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
                              className="w-full h-16 pl-14 pr-6 rounded-2xl bg-[var(--bg-elevated)] border-[1.5px] border-[var(--bg-border)] text-[#0F172A] font-bn font-black italic text-[16px] outline-none focus:border-[#D12053]/40 transition-all placeholder:text-slate-400"
                              value={phone}
                              onChange={e => setPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="bg-[#D12053]/5 p-4 rounded-2xl border border-[#D12053]/20 flex items-start gap-3">
                           <AlertCircle className="w-5 h-5 text-[#D12053] shrink-0 mt-0.5" />
                           <p className="text-[12px] font-bn italic font-bold text-slate-500">
                               সদস্যপদ ম্যানুয়ালি এক্টিভেট হতে কিছু সময় লাগতে পারে। তাৎক্ষণিক এক্টিভেশনের জন্য পূর্বের ধাপে গিয়ে অটোমেটিক পেমেন্ট ব্যবহার করুন।
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
                             type="button" onClick={() => setStep('manual-instructions')}
                             className="text-[14px] font-bn font-bold italic text-slate-500 hover:text-[#0F172A] transition-colors"
                           >
                             আগের ধাপে ফিরে যান
                           </button>
                        </div>
                    </form>
                  </motion.div>
                )}

                {/* Step 3: Success Screen */}
                {step === 3 && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                     <div className="w-24 h-24 bg-[#10B981]/10 rounded-[2.5rem] flex items-center justify-center text-[#10B981] mx-auto mb-8 shadow-2xl relative">
                        <CheckCircle className="w-12 h-12" />
                        <motion.div 
                          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }}
                          className="absolute -top-4 -right-4 w-10 h-10 bg-[#10B981] text-white rounded-full flex items-center justify-center shadow-lg"
                        >
                           <Sparkles className="w-5 h-5" />
                        </motion.div>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-bn font-black italic text-[#0F172A] mb-4">ধন্যবাদ!</h2>
                     <p className="text-slate-500 font-bn font-bold italic text-lg leading-relaxed mb-10">
                        আপনার তথ্য আমাদের কাছে পৌঁছেছে। আগামী ১২-২৪ ঘণ্টার মধ্যে ভেরিফিকেশন সম্পন্ন করে আপনার মেম্বারশিপ এক্টিভেট করে দেওয়া হবে।
                     </p>
                     <button 
                       onClick={closeBkash}
                       className="w-full h-16 bg-[var(--bg-elevated)] border border-[var(--bg-border)] text-[#0F172A] rounded-2xl text-xl font-bn font-black italic hover:bg-[var(--bg-border)] transition-all"
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
