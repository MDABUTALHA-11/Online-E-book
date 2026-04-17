import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Rocket, Map, Library, Sparkles, BookOpen } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const phrases = ["সেরা হ্যান্ডনোট", "সহজ ব্যাখ্যা", "সৃজনশীল সমাধান", "একাডেমিক টিপস"];

const Hero = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = React.useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % phrases.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/categories?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--bg-app)] px-6 pt-32 pb-20">
      {/* Dynamic Background Effects */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay muted loop playsInline 
          className="w-full h-full object-cover opacity-20 grayscale contrast-125 mix-blend-screen"
          onError={(e) => { e.target.style.display = 'none'; }}
        >
          <source src="/Video/grok-video-e5127828-4598-4ebd-97c3-72763c67b0cb.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-app)]/20 via-[var(--bg-app)]/80 to-[var(--bg-app)]" />
      </div>

      {/* Floating Blobs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-[500px] md:h-[500px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] animate-pulse-soft pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-[400px] md:h-[400px] bg-secondary/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse-soft delay-1000 pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-6 py-2 rounded-full glass-dark text-white/90 text-xs font-black en-font tracking-[0.2em] mb-10 border border-white/10 shadow-2xl uppercase"
          >
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span>Premium Online Academic Library</span>
          </motion.div>

          <h1 className="text-white title-xl mb-12 select-none">
            বাংলাদেশের সবচেয়ে <br /> 
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 40, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, y: -40, rotateX: 90 }}
                transition={{ duration: 0.6, type: 'spring' }}
                className="inline-block text-primary drop-shadow-[0_0_40px_rgba(16,185,129,0.3)] italic"
              >
                {phrases[index]}
              </motion.span>
            </AnimatePresence> <br /> 
             লাইব্রেরি
          </h1>

          <p className="text-slate-400 text-xl md:text-2xl mb-16 max-w-3xl mx-auto leading-relaxed font-bn italic">
            এখন আপনার পরীক্ষার প্রস্তুতি হবে আরও গোছানো। শাইফলির সাথে পান হাজারো হ্যান্ডনোট, 
            গাইড এবং এক্সক্লুসিভ স্টাডি ম্যাটেরিয়ালস — সম্পূর্ণ ফ্রিতে।
          </p>

          {/* Premium Search Integration */}
          <div className="relative max-w-2xl mx-auto mb-16 group">
            <input 
               type="text" 
               placeholder="বিষয়ের নাম বা নোটের নাম লিখুন..." 
               className="w-full h-16 md:h-20 pl-14 md:pl-20 pr-4 md:pr-10 rounded-[2rem] md:rounded-[2.5rem] glass-dark text-white border-2 border-white/10 focus:border-primary focus:bg-white/5 transition-all font-bn text-lg md:text-xl shadow-2xl group-hover:bg-white/5"
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               onKeyDown={handleSearch}
            />
            <Search className="absolute left-5 md:left-8 top-1/2 -translate-y-1/2 text-primary w-6 h-6 md:w-8 md:h-8 group-focus-within:scale-110 transition-transform" />
            <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-bold text-white/40 uppercase tracking-widest">
                Press Enter
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/subscription" className="btn btn-primary btn-lg w-full sm:w-auto h-16 md:h-20 px-8 md:px-12 group rounded-3xl">
              <span className="text-lg md:text-xl">VIP এক্সেস নিন</span>
              <Rocket className="w-6 h-6 md:w-7 md:h-7 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
            <Link to="/categories" className="btn btn-white btn-lg w-full sm:w-auto h-16 md:h-20 px-8 md:px-12 rounded-3xl border-none">
              <span className="text-lg md:text-xl">সকল বিভাগ দেখুন</span>
              <BookOpen className="w-6 h-6 md:w-7 md:h-7" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 15, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 cursor-pointer hidden md:block"
      >
        <div className="w-8 h-12 rounded-full border-2 border-white/20 flex justify-center p-2">
          <motion.div className="w-1.5 h-3 bg-primary rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
