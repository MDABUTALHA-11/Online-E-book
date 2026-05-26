import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search, Compass, AlertCircle } from 'lucide-react';
import usePageSEO from '../hooks/usePageSEO';

const NotFound = () => {
  usePageSEO({
    title: 'পাতাটি খুঁজে পাওয়া যায়নি',
    description: 'দুঃখিত, আপনি যে পাতাটি খুঁজছেন তা পাওয়া যায়নি।'
  });

  return (
    <div className="pt-20 md:pt-32 pb-20 min-h-[80vh] flex items-center justify-center text-slate-800">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block mb-12"
        >
          <div className="absolute inset-0 rounded-full blur-[100px]" style={{ background: 'rgba(20,184,166,0.12)' }} />
          <h1 className="text-[10rem] md:text-[15rem] leading-none font-black en-font select-none text-slate-200" style={{ textShadow: '0 0 40px rgba(20,184,166,0.2)' }}>404</h1>
          <AlertCircle className="w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full p-2" style={{ background: 'var(--bg-elevated)', color: '#F97316', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', border: '2px solid var(--bg-border)' }} />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bn font-black mb-6 italic text-[#0F172A]">
          পাতাটি <span className="italic" style={{ color: '#F97316' }}>খুঁজে পাওয়া যায়নি!</span>
        </h2>
        
        <p className="text-xl max-w-xl mx-auto mb-12 italic font-bn" style={{ color: '#64748b' }}>
          হয়তো আপনি ভুল লিংকে ক্লিক করেছেন অথবা পাতাটি সরিয়ে ফেলা হয়েছে। নিচের বোতামগুলো ব্যবহার করে মূল পাতায় ফিরে যেতে পারেন।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/" className="rounded-2xl px-12 h-16 w-full sm:w-auto hover:scale-105 transition-transform flex items-center justify-center gap-3 text-[16px] font-bold text-white shadow-lg" style={{ background: '#0F172A', boxShadow: '0 10px 30px rgba(15,23,42,0.2)' }}>
            <Home className="w-5 h-5" /> হোম পেজ
          </Link>
          <Link to="/categories" className="rounded-2xl px-12 h-16 w-full sm:w-auto transition-all flex items-center justify-center gap-3 text-[16px] font-bold" style={{ background: 'var(--bg-elevated)', border: '1.5px solid var(--bg-border)', color: '#14B8A6' }}>
            <Search className="w-5 h-5" /> সকল বিষয়সমূহ
          </Link>
        </div>

        <div className="mt-24 flex items-center justify-center gap-8" style={{ color: '#64748b' }}>
          <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-2" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
                 <Compass className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest">Navigator</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
