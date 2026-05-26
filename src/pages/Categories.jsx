import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/books';
import CategoryCard from '../components/CategoryCard';
import { BookOpen, Search, ArrowLeft, Lightbulb, Zap } from 'lucide-react';
import usePageSEO from '../hooks/usePageSEO';

const tabs = ['All', 'SSC', 'HSC', 'Admission'];

export default function Categories() {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  usePageSEO({
    title: 'সকল বিষয় — Shaifly Library',
    description: 'বাংলাদেশের SSC ও HSC শিক্ষার্থীদের জন্য সকল একাডেমিক হ্যান্ডনোট।',
    keywords: 'SSC, HSC, Science, Math, Physics, Chemistry, Shaifly',
  });

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) setSearchTerm(q);
  }, [searchParams]);

  const filteredCategories = categories.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-12 text-slate-800">

      {/* ── Hero ── */}
      <div className="relative rounded-2xl overflow-hidden mb-7 px-8 py-12" style={{ background:'var(--bg-surface)', border:'1px solid var(--bg-border)' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background:'rgba(20,184,166,0.06)', filter:'blur(60px)' }} />
        <div className="relative z-10 text-center">
          <Link to="/" className="inline-flex items-center gap-1.5 text-[12px] font-black uppercase tracking-widest no-underline mb-4 transition-colors group"
            style={{ color:'#334155' }}
            onMouseEnter={e=>e.currentTarget.style.color='#14B8A6'} onMouseLeave={e=>e.currentTarget.style.color='#334155'}
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" /> হোম
          </Link>
          <h1 className="text-[#0F172A] text-[28px] md:text-[44px] font-bn font-black leading-tight mb-3">
            সকল <span style={{ color:'#F97316' }}>বিষয়সমূহ</span>
          </h1>
          <p className="font-bn text-[14px] max-w-md mx-auto leading-relaxed mb-5 text-slate-500">
            তোমার পছন্দের বিষয় বেছে নাও। SSC ও HSC-র সবচেয়ে গোছানো হ্যান্ডনোট সংগ্রহ।
          </p>
          <div className="flex items-center gap-3 justify-center flex-wrap">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-black" style={{ background:'rgba(15,23,42,0.05)', border:'1px solid rgba(15,23,42,0.12)', color:'#0F172A' }}>
              <BookOpen className="w-3.5 h-3.5 text-[#14B8A6]" /> {categories.length} বিষয়
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-black" style={{ background:'rgba(15,23,42,0.05)', border:'1px solid rgba(15,23,42,0.12)', color:'#0F172A' }}>
              <Zap className="w-3.5 h-3.5 text-[#F97316]" /> সম্পূর্ণ বিনামূল্যে
            </div>
          </div>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-7 p-4 rounded-2xl" style={{ background:'var(--bg-surface)', border:'1px solid var(--bg-border)' }}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color:'#334155' }} />
          <input
            type="text"
            placeholder="বিষয় খুঁজুন..."
            className="w-full h-[44px] pl-11 pr-4 rounded-xl text-[13.5px] font-bn placeholder:text-[#334155] outline-none transition-all"
            style={{ background:'var(--bg-elevated)', border:'1.5px solid var(--bg-border)', color:'#0F172A' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={e => e.target.style.borderColor = '#14B8A6'}
            onBlur={e => e.target.style.borderColor = 'var(--bg-border)'}
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {tabs.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)}
              className="h-[44px] px-5 rounded-xl font-black text-[13px] transition-all whitespace-nowrap"
              style={activeTab === tab
                ? { background:'#0F172A', color:'white', boxShadow:'0 4px 12px rgba(15,23,42,0.15)' }
                : { background:'var(--bg-elevated)', border:'1.5px solid var(--bg-border)', color:'#64748b' }
              }
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* ── Count ── */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1" style={{ background:'var(--bg-border)' }} />
        <span className="font-bold text-[11px] uppercase tracking-widest whitespace-nowrap" style={{ color:'#334155' }}>
          {filteredCategories.length} টি বিষয় পাওয়া গেছে
        </span>
        <div className="h-px flex-1" style={{ background:'var(--bg-border)' }} />
      </div>

      {/* ── Grid ── */}
      <AnimatePresence mode="popLayout">
        <motion.div layout className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-6">
          {filteredCategories.map((category, i) => (
            <motion.div layout key={category.id}
              initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }}
              exit={{ opacity:0, scale:0.9 }} transition={{ delay:i*0.04, duration:0.3 }}
            >
              <CategoryCard category={category} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* ── CTA ── */}
      <div className="mt-12 rounded-2xl px-7 py-8 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden" style={{ background:'linear-gradient(135deg,#0F172A,#153E66)', boxShadow:'0 10px 40px rgba(15,23,42,0.1)' }}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background:'rgba(255,255,255,0.15)' }}>
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white text-[18px] font-black font-bn">আরও নতুন বিষয় আসছে!</h3>
            <p className="text-white/80 font-bn text-[13px]">প্রতিদিন নতুন হ্যান্ডনোট ও গাইড যোগ করা হচ্ছে।</p>
          </div>
        </div>
        <div className="flex gap-3 shrink-0">
          <Link to="/" className="bg-white font-black text-[13.5px] px-6 py-3 rounded-xl no-underline transition-all hover:bg-slate-50" style={{ color:'#0F172A' }}>
            হোমে ফিরুন
          </Link>
          <a href="mailto:feedback@shaifly.com" className="font-black text-[13.5px] px-6 py-3 rounded-xl no-underline" style={{ background:'rgba(255,255,255,0.15)', color:'white', border:'1.5px solid rgba(255,255,255,0.2)' }}>
            মতামত দিন
          </a>
        </div>
      </div>
    </div>
  );
}
