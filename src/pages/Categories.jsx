import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categories } from '../data/books';
import CategoryCard from '../components/CategoryCard';
import { BookOpen, Sparkles, Filter, Search, ArrowLeft, Lightbulb } from 'lucide-react';
import usePageSEO from '../hooks/usePageSEO';

const Categories = () => {
  const [searchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('All');
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');

  usePageSEO({
    title: 'সকল ক্যাটাগরি - শাইফলি অনলাইন লাইব্রেরি',
    description: 'আপনার প্রয়োজনীয় সকল একাডেমিক হ্যান্ডনোট এবং গাইড বই এখন আলাদা আলাদা ভাবে সাজানো রয়েছে।',
    keywords: 'SSC, HSC, Science, Math, Physics, Chemistry'
  });

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) setSearchTerm(query);
  }, [searchParams]);

  const tabs = ['All', 'SSC', 'HSC', 'Admission'];

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-40">
      {/* Premium Dark Hero for Categories */}
      <section className="relative bg-slate-950 px-6 pt-32 md:pt-48 pb-24 md:pb-40 overflow-hidden shadow-2xl mb-24">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -mr-64 -mt-64 animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-[100px] -ml-40 -mb-40 animate-pulse-soft delay-1000" />
        
        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 text-primary rounded-full text-[10px] font-black en-font mb-10 border border-white/10 tracking-[0.2em] uppercase shadow-2xl">
               <Sparkles className="w-5 h-5 animate-pulse" /> Global Academic Hub
            </div>
            
            <h1 className="text-white text-6xl md:text-[8rem] font-bn font-black mb-10 italic leading-none tracking-tighter">
               আপনার <span className="text-primary italic">পছন্দের</span> বিষয়গুলো
            </h1>
            
            <p className="text-2xl text-slate-400 font-bn italic leading-relaxed max-w-3xl mx-auto">
              আপনার প্রয়োজনীয় সকল হ্যান্ডনোট এখন একটি কেন্দ্রীয় ড্যাশবোর্ডে। সঠিক বিভাগটি বেছে নিন।
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-7xl px-6">
        <section className="pb-20">
          {/* Premium Filter & Search Bar - Elevated */}
          <div className="flex flex-col lg:flex-row gap-8 items-center justify-center bg-white p-8 rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] border border-slate-100 -mt-32 relative z-20 mb-24">
            <div className="relative w-full lg:w-[450px] group">
              <input 
                type="text" 
                placeholder="বিষয় খুঁজুন..." 
                className="w-full h-16 pl-16 pr-8 rounded-2xl bg-slate-50 border-2 border-transparent focus:border-primary focus:bg-white focus:outline-none shadow-inner transition-all font-bn italic text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 w-7 h-7 group-focus-within:text-primary transition-colors" />
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-2xl overflow-x-auto no-scrollbar w-full lg:w-auto">
              {tabs.map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-10 py-4 rounded-xl font-black en-font text-xs tracking-[0.1em] uppercase transition-all whitespace-nowrap ${activeTab === tab ? 'bg-white text-primary shadow-lg ring-1 ring-slate-200 scale-105' : 'text-slate-500 hover:text-slate-800 hover:bg-white/50'}`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
            >
              {filteredCategories.map((category, index) => (
                <motion.div
                  layout
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                   <CategoryCard category={category} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Special Instruction Section */}
          <div className="mt-40 p-12 md:p-32 bg-slate-950 rounded-[5rem] text-center text-white relative overflow-hidden shadow-premium border border-white/5 group">
            <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -mr-80 -mt-80 animate-pulse-soft" />
            
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-3xl rounded-3xl flex items-center justify-center mx-auto mb-12 border border-white/20 shadow-2xl animate-float">
                 <Lightbulb className="w-12 h-12 text-primary" />
              </div>
              <h2 className="text-5xl md:text-8xl font-bn font-black mb-10 italic leading-tight tracking-tighter">আরও নতুন <span className="text-primary italic">ক্যাটাগরি</span> আসছে!</h2>
              <p className="text-2xl text-slate-400 font-bn italic max-w-2xl mx-auto leading-relaxed mb-20">
                আমরা প্রতিদিন আপনাদের পড়াশোনা সহজ করতে নতুন নতুন বিষয়ের হ্যান্ডনোট এবং গাইড যোগ করছি। শীঘ্রই আসবে আরও অনেক কিছু।
              </p>
              
              <div className="flex flex-wrap justify-center gap-8">
                 <Link to="/" className="btn btn-primary h-20 px-16 text-xl rounded-3xl hover:scale-110 transition-transform flex items-center gap-4 shadow-2xl">
                    একটু দেখা যাক <ArrowLeft className="w-8 h-8 rotate-180" />
                 </Link>
                 <a href="#" className="btn glass-dark h-20 px-16 text-xl rounded-3xl border border-white/10 hover:bg-white/10 transition-all font-bn italic flex items-center gap-4">
                    মতামত দিন
                 </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Categories;
