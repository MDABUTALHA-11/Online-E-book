import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';
import { useViewCount } from '../hooks/useViewCount';
import usePageSEO from '../hooks/usePageSEO';
import { Search, ArrowLeft, BookOpen, GraduationCap, Eye, Info, ChevronRight } from 'lucide-react';

const SubjectPage = () => {
  const { subjectId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const subject = categories.find(c => c.slug === subjectId);
  const subjectBooks = useMemo(() => books.filter(b => b.subject === subjectId), [subjectId]);

  usePageSEO({
    title: subject ? `${subject.name} — Shaifly Library` : 'বিষয় পাওয়া যায়নি',
    description: `SSC ও HSC শিক্ষার্থীদের জন্য ${subject?.name || ''} বিষয়ের সকল হ্যান্ডনোট।`,
    keywords: `${subject?.name || ''} নোট, SSC, HSC, Shaifly`,
  });

  const { count: viewCount, incrementView } = useViewCount(subjectId, 'subject_views');

  React.useEffect(() => {
    if (subjectId) { incrementView(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
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
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background:'#0d1b2a', border:'1px solid #1e3a5f' }}>
        <Info className="w-8 h-8 text-[#334155]" />
      </div>
      <h2 className="text-white text-xl font-black font-bn">বিষয়টি খুঁজে পাওয়া যায়নি!</h2>
      <Link to="/categories" className="font-black text-[14px] px-6 py-3 rounded-xl no-underline text-white transition-all" style={{ background:'#22C55E' }}>ক্যাটাগরি দেখুন</Link>
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

      {/* ── Hero ── */}
      <div className="relative rounded-2xl overflow-hidden mb-7 px-8 py-10 flex flex-col md:flex-row items-center gap-7" style={{ background:'#0d1b2a', border:'1px solid #1e3a5f' }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none" style={{ background:'rgba(34,197,94,0.06)', filter:'blur(60px)' }} />

        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center shrink-0" style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)' }}>
          <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-[#22C55E]" />
        </div>

        <div className="relative z-10 text-center md:text-left">
          <Link to="/categories" className="inline-flex items-center gap-2 text-[14px] font-black uppercase tracking-widest no-underline transition-colors mb-4 group font-en italic" style={{ color:'#64748b' }}
            onMouseEnter={e=>e.currentTarget.style.color='#22C55E'} onMouseLeave={e=>e.currentTarget.style.color='#64748b'}>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> সকল বিষয়
          </Link>
          <h1 className="text-white text-[42px] md:text-[72px] font-bn font-black leading-[0.9] mb-4 italic tracking-tighter">
            {subject.name} <span style={{ color:'#22C55E' }}>লাইব্রেরি</span>
          </h1>
          <p className="text-[18px] md:text-[22px] font-bn leading-relaxed max-w-xl font-bold italic text-slate-400">
            SSC ও HSC পরীক্ষার্থীদের জন্য {subject.name} বিষয়ের সকল হ্যান্ডনোট ও গাইড।
          </p>
          <div className="flex items-center gap-3 mt-4 flex-wrap justify-center md:justify-start">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-black text-[#22C55E]" style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.15)' }}>
              <Eye className="w-3.5 h-3.5" /> {viewCount.toLocaleString()} Views
            </div>
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[12px] font-black text-[#22C55E]" style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.15)' }}>
              <BookOpen className="w-3.5 h-3.5" /> {subjectBooks.length} Notes
            </div>
          </div>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-7 p-4 rounded-2xl" style={{ background:'#0d1b2a', border:'1px solid #1e3a5f' }}>
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color:'#334155' }} />
          <input
            type="text"
            placeholder="অধ্যায় বা নোটের নাম দিয়ে সার্চ করুন..."
            className="w-full h-[44px] pl-11 pr-4 rounded-xl text-[13.5px] font-bn placeholder:text-[#334155] outline-none transition-all"
            style={{ background:'#112236', border:'1.5px solid #1e3a5f', color:'#f1f5f9' }}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.4)'}
            onBlur={e => e.target.style.borderColor = '#1e3a5f'}
          />
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="h-[44px] px-4 rounded-xl font-black text-[12.5px] transition-all whitespace-nowrap"
              style={activeTab === tab.id
                ? { background:'#22C55E', color:'white', boxShadow:'0 4px 12px rgba(34,197,94,0.25)' }
                : { background:'#112236', border:'1.5px solid #1e3a5f', color:'#64748b' }
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
        <div className="h-px flex-1" style={{ background:'#1e3a5f' }} />
        <span className="font-bold text-[11px] uppercase tracking-widest whitespace-nowrap" style={{ color:'#334155' }}>
          {filteredBooks.length} টি নোট পাওয়া গেছে
        </span>
        <div className="h-px flex-1" style={{ background:'#1e3a5f' }} />
      </div>

      {/* ── Grid ── */}
      <AnimatePresence mode="popLayout">
        {filteredBooks.length > 0 ? (
          <motion.div layout className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
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
            className="text-center py-20 rounded-2xl" style={{ background:'#0d1b2a', border:'1px dashed #1e3a5f' }}
          >
            <BookOpen className="w-10 h-10 mx-auto mb-3" style={{ color:'#1e3a5f' }} />
            <h2 className="text-[#334155] text-lg font-black font-bn">দুঃখিত, কোনো নোট পাওয়া যায়নি।</h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CTA ── */}
      {filteredBooks.length > 0 && (
        <div className="mt-12 rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden" style={{ background:'#0d1b2a', border:'1px solid #1e3a5f' }}>
          <div className="absolute right-0 top-0 w-48 h-48 rounded-full pointer-events-none" style={{ background:'rgba(34,197,94,0.06)', filter:'blur(50px)' }} />
          <div className="relative z-10">
            <h3 className="text-white text-[20px] font-black font-bn mb-1">আরও নোট দেখতে চান?</h3>
            <p className="text-[13.5px] font-bn" style={{ color:'#64748b' }}>সকল বিষয়ের নোট আমাদের লাইব্রেরিতে পাওয়া যাচ্ছে।</p>
          </div>
          <div className="flex gap-3 shrink-0 relative z-10">
            <Link to="/categories" className="flex items-center gap-2 font-black text-[13.5px] px-5 py-3 rounded-xl no-underline text-white" style={{ background:'#22C55E' }}>
              সব বিষয় <ChevronRight className="w-4 h-4" />
            </Link>
            <Link to="/subscription" className="flex items-center gap-2 font-black text-[13.5px] px-5 py-3 rounded-xl no-underline" style={{ background:'#112236', border:'1.5px solid #1e3a5f', color:'#64748b' }}>
              VIP মেম্বারশিপ
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectPage;
