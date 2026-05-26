import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';
import usePageSEO from '../hooks/usePageSEO';
import GoogleAd from '../components/GoogleAd';
import { Search, ArrowLeft, BookOpen, GraduationCap, Info, ChevronRight, Quote } from 'lucide-react';

import PhysicsImg from '../assets/scientists/physics.png';
import ChemistryImg from '../assets/scientists/chemistry.png';
import MathImg from '../assets/scientists/math.png';
import BiologyImg from '../assets/scientists/biology.png';
import HigherMathImg from '../assets/scientists/highermath.png';
import NewtonImg from '../assets/scientists/newton.png';

const SubjectPage = () => {
  const { subjectId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const scientistData = useMemo(() => ({
    physics: { name: 'Albert Einstein', quote: 'কল্পনা জ্ঞানের চেয়েও বেশি গুরুত্বপূর্ণ।', image: PhysicsImg },
    chemistry: { name: 'Niels Bohr', quote: 'বাস্তবতা হলো সেটিই যা কোনো কিছু বাস্তব বলে গণ্য করার পর থাকে।', image: ChemistryImg },
    math: { name: 'Srinivasa Ramanujan', quote: 'আমার কাছে কোনো সমীকরণের অর্থ নেই যতক্ষণ না সেটি ঈশ্বরের চিন্তা প্রকাশ করে।', image: MathImg },
    biology: { name: 'Charles Darwin', quote: 'যারা পরিবর্তনের সাথে খাপ খাওয়াতে পারে তারাই টিকে থাকে।', image: BiologyImg },
    'higher-math': { name: 'Leonhard Euler', quote: 'গণিত হলো প্রকৃতির ভাষা এবং মহাবিশ্বের রহস্য উন্মোচনের চাবিকাঠি।', image: HigherMathImg },
    science: { name: 'Isaac Newton', quote: 'আমি যদি অন্যদের চেয়ে বেশি দূরে দেখে থাকি, তবে তা মহাপুরুষদের কাঁধে দাঁড়িয়ে থাকার কারণে।', image: NewtonImg }
  }), []);

  const subject = categories.find(c => c.slug === subjectId);
  const scientist = (subjectId && scientistData[subjectId]) ? scientistData[subjectId] : scientistData.science;
  const subjectBooks = useMemo(() => books.filter(b => b.subject === subjectId), [subjectId]);

  usePageSEO({
    title: subject ? `${subject.name} - Shaifly Library` : 'Handnote - Shaifly',
    description: subject ? `SSC ও HSC শিক্ষার্থীদের জন্য ${subject.name} বিষয়ের সকল হ্যান্ডনোট।` : 'একাডেমিক হ্যান্ডনোট লাইব্রেরি',
    keywords: `${subject?.name || ''} Handnote, note ssc, handnote ssc`,
  });

  React.useEffect(() => {
    if (subjectId) { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  }, [subjectId]);

  const filteredBooks = useMemo(() => {
    return subjectBooks.filter(book => {
      const ok = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      if (activeTab === 'All') return ok;
      if (activeTab === 'SSC') return ok && book.level === 'SSC';
      if (activeTab === 'HSC 1') return ok && book.level === 'HSC' && book.part === 1;
      if (activeTab === 'HSC 2') return ok && book.level === 'HSC' && book.part === 2;
      return ok;
    });
  }, [subjectBooks, searchTerm, activeTab]);

  if (!subject) return (
    <div className="min-h-[60vh] flex items-center justify-center flex-col gap-5">
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background:'var(--bg-surface)', border:'1px solid var(--bg-border)' }}>
        <Info className="w-8 h-8 text-[#334155]" />
      </div>
      <h2 className="text-[#0F172A] text-xl font-black font-bn uppercase tracking-widest">Subject Not Found!</h2>
      <Link to="/categories" className="font-black text-[14px] px-6 py-3 rounded-xl no-underline text-white transition-all bg-[#0F172A]">View Categories</Link>
    </div>
  );

  const tabs = [
    { id:'All',   label:'সকল নোট' },
    { id:'SSC',   label:'SSC' },
    { id:'HSC 1', label:'HSC ১ম পত্র' },
    { id:'HSC 2', label:'HSC ২য় পত্র' },
  ];

  return (
    <div className="min-h-screen pb-12">

      <div className="flex items-center gap-2 mb-6 px-2 text-[12px] font-black uppercase tracking-widest text-slate-500 font-en italic">
        <Link to="/" className="hover:text-[#0F172A] no-underline transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/categories" className="hover:text-[#0F172A] no-underline transition-colors">Categories</Link>
        <ChevronRight className="w-3 h-3 text-[#0F172A]" />
        <span className="text-[#0F172A]">{subject.name}</span>
      </div>

      {/* ── Hero Banner with Scientist ── */}
      <div className="relative rounded-[2.5rem] overflow-hidden mb-10 min-h-[320px] md:min-h-[420px] flex flex-col md:flex-row items-center border border-[var(--bg-border)]" style={{ background:'var(--bg-surface)' }}>
        
        {/* Background Scientist Image */}
        {scientist && (
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] z-0 h-full pointer-events-none select-none">
             <img 
               src={scientist.image} 
               alt={scientist.name} 
               className="w-full h-full object-cover object-center opacity-60 md:opacity-80 mix-blend-luminosity md:mix-blend-normal transform scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)]/80 md:via-[var(--bg-surface)]/30 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-8 md:p-16 max-w-2xl w-full">
           <Link to="/categories" className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] no-underline transition-colors mb-8 group font-en italic text-slate-500 hover:text-[#0F172A]">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Library
           </Link>
           
           <h1 className="text-[#0F172A] text-[42px] md:text-[72px] font-bn font-black leading-[0.85] mb-8 italic tracking-tighter">
             {subject.name} <span className="text-[#14B8A6]">লাইব্রেরি</span>
           </h1>

           {/* Quote Section */}
           {scientist && (
             <div className="mt-8 border-l-4 border-[#14B8A6] pl-6 py-2 bg-[var(--bg-elevated)] rounded-r-2xl pr-8">
                <Quote className="w-8 h-8 text-[#14B8A6] opacity-20 mb-2 rotate-180" />
                <p className="text-[20px] md:text-[28px] font-bn leading-relaxed font-bold italic text-[#0F172A] mb-2 tracking-tight">
                  "{scientist.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-[#14B8A6]/40" />
                  <span className="text-[#14B8A6] font-en font-black text-[12px] uppercase tracking-[0.3em] opacity-80">
                     {scientist.name}
                  </span>
                </div>
             </div>
           )}

            <div className="flex items-center gap-4 mt-12">
               <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/60 border border-[var(--bg-border)] backdrop-blur-md">
                  <BookOpen className="w-4 h-4 text-[#14B8A6]" />
                  <span className="text-[#0F172A] font-black text-[13px] font-en uppercase tracking-tighter">{subjectBooks.length} Notes</span>
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
            placeholder="অধ্যায় বা নোটের নাম দিয়ে সার্চ করুন..."
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
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="h-[44px] px-4 rounded-xl font-black text-[12.5px] transition-all whitespace-nowrap"
              style={activeTab === tab.id
                ? { background:'#0F172A', color:'white', boxShadow:'0 4px 12px rgba(15,23,42,0.15)' }
                : { background:'var(--bg-elevated)', border:'1.5px solid var(--bg-border)', color:'#64748b' }
              }
            >
              {tab.id !== 'All' && <GraduationCap className="w-3.5 h-3.5 inline mr-1.5" />}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Count ── */}
      <div className="flex items-center gap-3 mb-5">
        <div className="h-px flex-1" style={{ background:'var(--bg-border)' }} />
        <span className="font-bold text-[11px] uppercase tracking-widest whitespace-nowrap" style={{ color:'#334155' }}>
          {filteredBooks.length} টি নোট পাওয়া গেছে
        </span>
        <div className="h-px flex-1" style={{ background:'var(--bg-border)' }} />
      </div>

      {/* Ad Unit */}
      <div className="mb-7">
        <GoogleAd slot="2280555349" />
      </div>

      {/* ── Grid wrapped in Booklet ── */}
      <div className="booklet-container mb-12">
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-10 border-b border-[var(--bg-border)] pb-6">
            <div>
              <h2 className="text-[#0F172A] font-black text-[28px] md:text-[38px] leading-none">অধ্যায়ভিত্তিক সংগ্রহ</h2>
              <p className="text-slate-500 text-[14px] md:text-[16px] font-bold mt-2 uppercase tracking-widest">{subject.name} · PDF Library</p>
            </div>
            <div className="bg-white border border-[var(--bg-border)] px-6 py-3 rounded-full text-slate-700 font-black text-[14px] items-center gap-2 shadow-sm hidden md:flex">
               <BookOpen className="w-5 h-5 text-[#14B8A6]" /> রিসোর্স সংখ্যা: {filteredBooks.length}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {filteredBooks.length > 0 ? (
              <motion.div layout className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                {filteredBooks.map((book, i) => (
                  <motion.div layout key={book.id}
                    initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                    transition={{ delay:i*0.04, duration:0.3 }}
                  >
                    <BookCard book={book} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
                className="text-center py-20 rounded-2xl border border-dashed border-[var(--bg-border)] bg-[var(--bg-elevated)]"
              >
                <BookOpen className="w-10 h-10 mx-auto mb-3 text-slate-400" />
                <h2 className="text-slate-700 text-lg font-black font-bn">দুঃখিত, কোনো নোট পাওয়া যায়নি।</h2>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 text-center text-slate-500 text-[12px] font-bold">
            বইয়ের উপরে ক্লিক করে সরাসরি অনলাইন পড়তে পারেন
          </div>
        </div>
      </div>

      {/* Subject Description for AdSense */}
      <div className="mt-12 p-8 md:p-12 rounded-[2rem]" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
        <h2 className="text-[#0F172A] font-bn font-black text-[24px] md:text-[32px] mb-6">
          {subject.name} বিষয়ের <span className="text-[#F97316]">সঠিক প্রস্তুতি ও কৌশল</span>
        </h2>
        <div className="space-y-5 text-slate-600 font-bn text-[16px] md:text-[18px] leading-relaxed">
          <p>
            {subject.name} বিষয়টি SSC এবং HSC উভয় পর্যায়ের শিক্ষার্থীদের জন্য অত্যন্ত গুরুত্বপূর্ণ। সঠিক হ্যান্ডনোট এবং নিয়মিত চর্চা ছাড়া এই বিষয়ে এ-প্লাস পাওয়া কিছুটা কঠিন হতে পারে। শাইফলির এই লাইব্রেরিতে আমরা {subject.name} বিষয়ের প্রতিটি অধ্যায়কে সহজভাবে উপস্থাপন করেছি। 
          </p>
          <p>
            Our here you will find chapter-wise creative questions (CQ) and multiple-choice questions (MCQ) shortcut techniques. Specializing in simplifying calculations and diagrams with visual indicators.
          </p>
          <p>
            Additionally, past board exam questions are solved and embedded directly within the PDFs to provide the ultimate prep tool for SSC & HSC exam candidates in Bangladesh.
          </p>
        </div>
      </div>

      {/* ── CTA ── */}
      {filteredBooks.length > 0 && (
        <div className="mt-12 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden" style={{ background:'var(--bg-surface)', border:'1px solid var(--bg-border)' }}>
          <div className="absolute right-0 top-0 w-48 h-48 rounded-full pointer-events-none" style={{ background:'rgba(20,184,166,0.06)', filter:'blur(50px)' }} />
          <div className="relative z-10">
            <h3 className="text-[#0F172A] text-[20px] font-black font-bn mb-1">আরও নোট দেখতে চান?</h3>
            <p className="text-[13.5px] font-bn text-slate-500">সকল বিষয়ের নোট আমাদের লাইব্রেরিতে পাওয়া যাচ্ছে।</p>
          </div>
          <div className="flex gap-3 shrink-0 relative z-10">
            <Link to="/categories" className="flex items-center gap-2 font-black text-[13.5px] px-5 py-3 rounded-xl no-underline text-white shadow-[0_4px_0_#B33B0E] bg-[#F97316]" style={{ background:'#F97316' }}>
              সব বিষয় <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/subscription" className="flex items-center gap-2 font-black text-[13.5px] px-5 py-3 rounded-xl no-underline text-[#0F172A]" style={{ background:'var(--bg-elevated)', border:'1.5px solid var(--bg-border)' }}>
              VIP মেম্বারশিপ
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
