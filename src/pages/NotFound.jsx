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
    <div className="pt-32 pb-20 min-h-[80vh] flex items-center justify-center">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative inline-block mb-12"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
          <h1 className="text-[10rem] md:text-[15rem] leading-none font-black en-font text-slate-100 select-none">404</h1>
          <AlertCircle className="w-24 h-24 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 border-4 border-slate-50 shadow-2xl" />
        </motion.div>

        <h2 className="text-4xl md:text-6xl font-bn font-black mb-6 italic text-slate-800">
          পাতাটি <span className="text-primary italic">খুঁজে পাওয়া যায়নি!</span>
        </h2>
        
        <p className="text-xl text-slate-500 max-w-xl mx-auto mb-12 italic font-bn">
          হয়তো আপনি ভুল লিংকে ক্লিক করেছেন অথবা পাতাটি সরিয়ে ফেলা হয়েছে। নিচের বোতামগুলো ব্যবহার করে মূল পাতায় ফিরে যেতে পারেন।
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/" className="btn btn-primary btn-lg rounded-2xl px-12 h-16 w-full sm:w-auto shadow-2xl shadow-primary/20 hover:scale-105 transition-transform flex items-center justify-center gap-3">
            <Home className="w-6 h-6" /> হোম পেজ
          </Link>
          <Link to="/categories" className="btn btn-outline btn-lg rounded-2xl px-12 h-16 w-full sm:w-auto hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
            <Search className="w-6 h-6" /> সকল বিষয়সমূহ
          </Link>
        </div>

        <div className="mt-24 flex items-center justify-center gap-8 text-slate-400">
          <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-2">
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
