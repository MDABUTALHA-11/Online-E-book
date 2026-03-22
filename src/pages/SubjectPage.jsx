import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';
import { useViewCount } from '../hooks/useViewCount';
import usePageSEO from '../hooks/usePageSEO';
import { Search, ArrowLeft, BookOpen, Filter, Sparkles, GraduationCap, Eye, Download, Info } from 'lucide-react';

const SubjectPage = () => {
  const { subjectId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('All');

  const subject = categories.find(c => c.slug === subjectId);
  const subjectBooks = useMemo(() => books.filter(b => b.subject === subjectId), [subjectId]);

  usePageSEO({
    title: subject ? `${subject.name} লাইব্রেরি` : 'বিষয় খুঁজে পাওয়া যায়নি',
    description: `নবম থেকে দ্বাদশ শ্রেণির শিক্ষার্থীদের জন্য ${subject?.name || ''} বিষয়ের সকল অধ্যায়ের বিস্তারিত নোটসমূহ এখানে পাওয়া যাবে।`,
    keywords: `${subject?.name || ''} নোট, ${subject?.name || ''} গাইড`
  });

  const { count: viewCount, incrementView } = useViewCount(subjectId, 'subject_views');

  React.useEffect(() => {
    if (subjectId) {
      incrementView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [subjectId]);

  const filteredBooks = useMemo(() => {
    return subjectBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      if (activeTab === 'All') return matchesSearch;
      if (activeTab === 'SSC') return matchesSearch && book.level === 'SSC';
      if (activeTab === 'HSC 1') return matchesSearch && book.level === 'HSC' && book.part === 1;
      if (activeTab === 'HSC 2') return matchesSearch && book.level === 'HSC' && book.part === 2;
      return matchesSearch;
    });
  }, [subjectBooks, searchTerm, activeTab]);

  if (!subject) {
    return (
      <div className="pt-40 min-h-screen px-6 text-center bg-slate-50/50">
        <div className="w-24 h-24 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl animate-float">
           <Info className="w-12 h-12" />
        </div>
        <h2 className="text-5xl font-bn font-black italic text-slate-800 mb-8">বিষয়টি খুঁজে পাওয়া যায়নি!</h2>
        <Link to="/categories" className="btn btn-primary h-20 px-12 text-xl rounded-3xl">ক্যাটাগরি দেখুন</Link>
      </div>
    );
  }

  const tabs = [
    { id: 'All', label: 'সকল নোট' },
    { id: 'SSC', label: 'SSC' },
    { id: 'HSC 1', label: 'HSC ১ম পত্র' },
    { id: 'HSC 2', label: 'HSC ২য় পত্র' },
  ];

  return (
    <div className="min-h-screen pb-40 bg-slate-50/50">
      {/* Hero Section - Starts at top to support transparent navbar */}
      <section className="relative bg-slate-950 px-6 pt-32 md:pt-48 pb-24 md:pb-40 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] mb-20">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -mr-80 -mt-80 animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] -ml-40 -mb-40 animate-pulse-soft delay-1000" />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <Link to="/categories" className="inline-flex items-center gap-3 text-white/40 hover:text-primary transition-all mb-12 font-black en-font text-[10px] tracking-[0.2em] uppercase no-underline group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Categories
          </Link>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24"
          >
            <div className="w-32 h-32 md:w-56 md:h-56 bg-white/5 backdrop-blur-3xl rounded-[3rem] flex items-center justify-center border border-white/10 shadow-2xl animate-float ring-1 ring-white/10 flex-shrink-0">
               <BookOpen className="w-16 h-16 md:w-28 md:h-28 text-primary drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]" />
            </div>
            <div className="text-center lg:text-left">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8">
                <span className="px-6 py-2 bg-primary/10 text-primary rounded-full text-[10px] font-black tracking-widest uppercase border border-primary/20 shadow-lg en-font">Library System</span>
                <div className="flex items-center gap-2 px-6 py-2 bg-white/5 text-slate-400 rounded-full text-[10px] font-black tracking-widest uppercase border border-white/10 shadow-sm en-font">
                   <Eye className="w-5 h-5 text-primary" /> {viewCount.toLocaleString()} Views
                </div>
              </div>
              <h1 className="text-white text-6xl md:text-[8rem] font-bn font-black mb-10 italic leading-none tracking-tighter">
                {subject.name} <span className="text-primary italic">লাইব্রেরি</span>
              </h1>
              <p className="text-2xl md:text-3xl text-slate-400 max-w-3xl leading-relaxed italic font-bn">
                নবম থেকে দ্বাদশ শ্রেণির শিক্ষার্থীদের জন্য {subject.name} বিষয়ের সকল অধ্যায়ের বিস্তারিত নোটসমূহ এখানে পাওয়া যাবে। প্রস্তুতি নিন সেরা ভাবে।
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6">
        {/* Smart Filtering & Search Overlay */}
        <div className="flex flex-col lg:flex-row gap-8 mb-20 items-center justify-between sticky top-28 z-40 bg-white/70 backdrop-blur-3xl p-8 rounded-[3rem] border border-white/40 shadow-2xl shadow-slate-200/50 -mt-32 relative">
          <div className="relative w-full lg:w-[500px] group">
            <input 
              type="text" 
              placeholder="অধ্যায় বা নোটের নাম দিয়ে সার্চ করুন..." 
              className="w-full h-20 pl-20 pr-10 rounded-3xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none shadow-inner transition-all font-bn italic text-xl"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-slate-400 w-8 h-8 transition-colors group-focus-within:text-primary" />
          </div>

          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-3xl overflow-x-auto no-scrollbar w-full lg:w-auto">
            {tabs.map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-10 py-5 rounded-[1.25rem] font-black en-font text-xs tracking-[0.1em] uppercase transition-all whitespace-nowrap flex items-center gap-3 ${activeTab === tab.id ? 'bg-white text-primary shadow-xl ring-1 ring-slate-200 scale-105' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'}`}
              >
                {tab.id !== 'All' && <GraduationCap className="w-5 h-5" />}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-12 flex items-center gap-6">
           <div className="h-px flex-1 bg-slate-200" />
           <span className="text-slate-400 font-bn text-sm italic font-bold tracking-widest uppercase">Showing {filteredBooks.length} High-End Notes</span>
           <div className="h-px flex-1 bg-slate-200" />
        </div>

        {/* Book Grid */}
        <AnimatePresence mode="popLayout">
          {filteredBooks.length > 0 ? (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
            >
              {filteredBooks.map((book) => (
                <motion.div 
                  layout
                  key={book.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                >
                  <BookCard book={book} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-40 bg-white rounded-[5rem] border-2 border-dashed border-slate-200 shadow-inner"
            >
              <div className="w-32 h-32 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl">
                <BookOpen className="w-16 h-16 text-slate-300" />
              </div>
              <h2 className="text-4xl font-bn font-black text-slate-400 italic mb-6">দুঃখিত, কোনো নোট পাওয়া যায়নি।</h2>
              <p className="text-xl text-slate-300 font-bn italic">অন্য কোনো কি-ওয়ার্ড দিয়ে চেষ্টা করুন।</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Call to Action Wrapper */}
        <div className="mt-60 p-12 md:p-32 bg-slate-950 rounded-[6rem] text-center text-white relative overflow-hidden shadow-premium border border-white/5">
           <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
           <div className="max-w-4xl mx-auto relative z-10">
              <div className="inline-block p-6 bg-white/5 rounded-[2.5rem] mb-16 ring-1 ring-white/10 animate-float shadow-2xl">
                <Sparkles className="w-16 h-16 text-primary" />
              </div>
              <h2 className="text-5xl md:text-[6.5rem] font-bn font-black mb-12 italic leading-none tracking-tighter">আপনার পাঠদান <span className="text-primary italic">সহজ</span> করুন!</h2>
              <p className="text-2xl md:text-3xl text-slate-400 italic font-bn leading-relaxed mb-24 max-w-3xl mx-auto">
                আমরা প্রতিদিন নতুন নতুন অধ্যায় এবং হ্যান্ডনোট আপডেট করছি। সেরা সব শিক্ষকের গোছানো লেকচার নোট এখন আপনার হাতের মুঠোয়।
              </p>
              <div className="flex flex-wrap justify-center gap-8">
                 <Link to="/subscription" className="btn btn-primary h-24 px-16 text-2xl rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(16,185,129,0.5)] hover:scale-110 transition-transform">VIP মেম্বারশিপ নিন</Link>
                 <a href="#" className="btn glass-dark h-24 px-16 text-2xl rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all font-bn italic flex items-center gap-4">
                    YouTube Channel <ArrowLeft className="w-8 h-8 rotate-180" />
                 </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
