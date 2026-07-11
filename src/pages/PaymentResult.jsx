import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle, AlertOctagon, XCircle, Home, RefreshCw, Star, CreditCard } from 'lucide-react';
import usePageSEO from '../hooks/usePageSEO';

const PaymentResult = ({ status }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const txnId = searchParams.get('txnId') || searchParams.get('tranId') || '';
  const error = searchParams.get('error') || '';

  usePageSEO({
    title: `${status === 'success' ? 'পেমেন্ট সফল' : status === 'cancel' ? 'পেমেন্ট বাতিল' : 'পেমেন্ট ব্যর্থ'} — Shaifly Library`,
    description: 'পেমেন্ট ট্রানজেকশন ফিডব্যাক পেজ',
    keywords: 'Payment, SSLCommerz, Shaifly Library',
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 bg-[var(--bg-app)]">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-xl p-8 md:p-12 text-center bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-[3rem] shadow-2xl relative overflow-hidden"
      >
        {/* Soft background glow based on payment status */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none -mr-40 -mt-40 ${
          status === 'success' ? 'bg-[#10B981]/5' : status === 'cancel' ? 'bg-amber-500/5' : 'bg-red-500/5'
        }`} />

        {/* 1. SUCCESS STATE */}
        {status === 'success' && (
          <>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-24 bg-[#10B981]/10 rounded-[2.5rem] flex items-center justify-center text-[#10B981] mx-auto mb-8 shadow-2xl relative border border-[#10B981]/25"
            >
              <CheckCircle className="w-12 h-12" />
              <motion.div 
                initial={{ scale: 0 }} 
                animate={{ scale: 1 }} 
                transition={{ delay: 0.4 }}
                className="absolute -top-2 -right-2 w-8 h-8 bg-[#14B8A6] text-white rounded-full flex items-center justify-center shadow-lg"
              >
                <Star className="w-4 h-4 fill-white" />
              </motion.div>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-bn font-black text-[#0F172A] mb-4 italic tracking-tight"
            >
              পেমেন্ট <span className="text-[#10B981]">সফল হয়েছে!</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-slate-500 font-bn font-bold italic mb-8 leading-relaxed px-4"
            >
              অভিনন্দন! আপনার পেমেন্টটি সফলভাবে সম্পন্ন হয়েছে। আপনার VIP সাবস্ক্রিপশন সাথে সাথে একটিভ করে দেওয়া হয়েছে।
            </motion.p>
          </>
        )}

        {/* 2. FAILURE STATE */}
        {status === 'fail' && (
          <>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-24 bg-red-500/10 rounded-[2.5rem] flex items-center justify-center text-red-500 mx-auto mb-8 shadow-2xl relative border border-red-500/25"
            >
              <XCircle className="w-12 h-12" />
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-bn font-black text-[#0F172A] mb-4 italic tracking-tight"
            >
              পেমেন্ট <span className="text-red-500">ব্যর্থ হয়েছে!</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-slate-500 font-bn font-bold italic mb-8 leading-relaxed px-4"
            >
              দুঃখিত! কোনো কারণে আপনার লেনদেনটি সম্পন্ন করা সম্ভব হয়নি। কার্ডে পর্যাপ্ত ব্যালেন্স আছে কিনা অথবা কার্ড ইনফরমেশন সঠিক কিনা চেক করুন।
            </motion.p>
          </>
        )}

        {/* 3. CANCEL STATE */}
        {status === 'cancel' && (
          <>
            <motion.div 
              variants={itemVariants}
              className="w-24 h-24 bg-amber-500/10 rounded-[2.5rem] flex items-center justify-center text-amber-500 mx-auto mb-8 shadow-2xl relative border border-amber-500/25"
            >
              <AlertOctagon className="w-12 h-12" />
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-4xl font-bn font-black text-[#0F172A] mb-4 italic tracking-tight"
            >
              পেমেন্ট <span className="text-amber-500">বাতিল করা হয়েছে</span>
            </motion.h1>
            
            <motion.p 
              variants={itemVariants}
              className="text-lg text-slate-500 font-bn font-bold italic mb-8 leading-relaxed px-4"
            >
              আপনি পেমেন্ট প্রক্রিয়াটি বাতিল করেছেন। পুনরায় পেমেন্ট করতে নিচের বাটনে ক্লিক করুন।
            </motion.p>
          </>
        )}

        {/* TRANSACTION METADATA */}
        {txnId && (
          <motion.div 
            variants={itemVariants}
            className="bg-[var(--bg-elevated)] p-5 rounded-3xl mb-10 border border-[var(--bg-border)] flex items-center justify-between"
          >
            <div className="text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5 font-en">Method</span>
              <span className="text-sm font-bn font-bold text-[#0F172A] italic flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-[#14B8A6]" /> SSLCommerz Gateway
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-0.5 font-en">Transaction ID</span>
              <span className="text-sm font-en font-black text-[#0F172A] tracking-wider">{txnId}</span>
            </div>
          </motion.div>
        )}

        {/* NAVIGATION / RETRY BUTTONS */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          {status === 'success' ? (
            <Link 
              to="/" 
              className="flex-1 h-16 bg-[#14B8A6] hover:bg-[#0D9488] text-white font-bn font-black italic text-xl rounded-2xl transition-all shadow-lg shadow-[#14B8A6]/20 flex items-center justify-center gap-3"
            >
              <Home className="w-5 h-5" /> হোম পেজে যান
            </Link>
          ) : (
            <>
              <button 
                onClick={() => navigate('/subscription')}
                className="flex-1 h-16 bg-[#F97316] hover:bg-[#E85E2A] text-white font-bn font-black italic text-xl rounded-2xl transition-all shadow-lg shadow-[#F97316]/20 flex items-center justify-center gap-3"
              >
                <RefreshCw className="w-5 h-5 animate-spin-slow" /> আবার চেষ্টা করুন
              </button>
              <Link 
                to="/" 
                className="h-16 px-8 bg-[var(--bg-elevated)] hover:bg-[var(--bg-border)] text-[#0F172A] border border-[var(--bg-border)] font-bn font-black italic text-xl rounded-2xl transition-all flex items-center justify-center gap-3"
              >
                <Home className="w-5 h-5 text-slate-455" /> হোম
              </Link>
            </>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentResult;
