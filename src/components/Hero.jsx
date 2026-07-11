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
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 pt-32 pb-20 border-b border-[var(--bg-border)] animate-scan-line">
      {/* Circuit Board / Grid Background overlay in CSS */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay muted loop playsInline 
          className="w-full h-full object-cover opacity-15 grayscale contrast-125 mix-blend-screen"
          onError={(e) => { e.target.style.display = 'none'; }}
        >
          <source src="/Video/grok-video-e5127828-4598-4ebd-97c3-72763c67b0cb.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-app)]/20 via-[var(--bg-app)]/85 to-[var(--bg-app)]" />
      </div>

      {/* Futuristic Geometric Accents */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-[450px] md:h-[450px] bg-[var(--primary)]/10 rounded-lg blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-[350px] md:h-[350px] bg-[var(--neon-violet)]/10 rounded-lg blur-[90px] pointer-events-none" />

      <div className="container relative z-10 mx-auto max-w-7xl">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-1.5 rounded-sm glass-dark text-white/90 text-xs font-bold font-mono tracking-[0.2em] mb-10 border border-[var(--primary)]/20 shadow-xl uppercase"
          >
            <Sparkles className="w-4 h-4 text-[var(--primary)] animate-pulse" />
            <span>Premium Online Academic Library</span>
          </motion.div>

          <h1 className="text-white text-[32px] sm:text-[45px] md:text-[60px] font-black leading-tight mb-10 select-none font-bn tracking-wide">
            বাংলাদেশের সবচেয়ে <br /> 
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.4 }}
                className="inline-block text-[var(--primary)] drop-shadow-[0_0_20px_var(--primary-glow)] font-bn font-black border-r-2 border-[var(--primary)] pr-2"
              >
                {phrases[index]}
              </motion.span>
            </AnimatePresence> <br /> 
             লাইব্রেরি
          </h1>

          <p className="text-[var(--text-muted)] text-lg md:text-xl mb-12 max-w-3xl mx-auto leading-relaxed font-bn font-semibold">
            এখন আপনার পরীক্ষার প্রস্তুতি হবে আরও গোছানো। শাইফলির সাথে পান হাজারো হ্যান্ডনোট, 
            গাইড এবং এক্সক্লুসিভ স্টাডি ম্যাটেরিয়ালস — সম্পূর্ণ ফ্রিতে।
          </p>

          {/* Premium Search Integration */}
          <div className="relative max-w-xl mx-auto mb-12 group">
            <input 
               type="text" 
               placeholder="বিষয়ের নাম বা নোটের নাম লিখুন..." 
               className="w-full h-14 pl-12 pr-28 rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)] border border-[var(--bg-border)] focus:border-[var(--primary)] transition-all font-bn text-base shadow-lg"
               value={searchValue}
               onChange={(e) => setSearchValue(e.target.value)}
               onKeyDown={handleSearch}
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--primary)] w-5 h-5 group-focus-within:scale-110 transition-transform" />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5 px-2.5 py-1 bg-[var(--bg-elevated)] border border-[var(--bg-border)] rounded-sm text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-wider font-mono">
                Enter
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <Link to="/subscription" className="w-full sm:w-auto h-13 px-8 group rounded-lg bg-[var(--primary)] text-[#0A0E1A] font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(0,240,255,0.25)] font-bn">
              <span className="text-base font-bold">VIP এক্সেস নিন</span>
              <Rocket className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
            <Link to="/categories" className="w-full sm:w-auto h-13 px-8 rounded-lg bg-transparent border border-[var(--primary)]/30 text-[var(--primary)] hover:bg-[var(--primary)]/10 font-bold flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all font-bn">
              <span className="text-base font-bold">সকল বিভাগ দেখুন</span>
              <BookOpen className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[var(--primary)] cursor-pointer hidden md:block"
      >
        <div className="w-6 h-10 rounded-sm border border-[var(--primary)]/30 flex justify-center p-1.5">
          <motion.div className="w-1 h-2 bg-[var(--primary)] rounded-sm" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
