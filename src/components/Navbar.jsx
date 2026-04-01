import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, ChevronRight, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Unified Dark Hero detection for Home, Categories, Subject, and Quiz pages
  const hasDarkHero = ['/', '/categories'].includes(location.pathname) || location.pathname.startsWith('/subject') || location.pathname.startsWith('/quiz');
  const isLightAtTop = !hasDarkHero;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'CATEGORIES', path: '/categories' },
    { name: 'ABOUT', path: '/about' },
    { name: 'VIP PLANS', path: '/subscription' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/categories' && location.pathname.startsWith('/subject')) return true;
    return location.pathname.startsWith(path);
  };

  const getNavTextColor = (active = false) => {
    if (scrolled) {
      return active ? 'text-primary' : 'text-slate-300 hover:text-white';
    }
    if (isLightAtTop) {
      return active ? 'text-primary drop-shadow-md' : 'text-slate-700 hover:text-slate-900 font-bold';
    }
    return active ? 'text-primary drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]' : 'text-slate-300 hover:text-white';
  };

  const getGlassStyle = () => {
    if (scrolled) {
      return 'bg-slate-950/90 backdrop-blur-xl py-3 px-6 md:px-8 rounded-full shadow-[0_20px_40px_-10px_rgba(16,185,129,0.3)] border border-primary/20 ring-1 ring-white/10';
    }
    if (isLightAtTop) {
      return 'bg-white/40 backdrop-blur-md py-5 px-6 md:px-8 border border-white/50 shadow-sm rounded-3xl';
    }
    return 'bg-transparent py-5 px-2 md:px-4 rounded-3xl';
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 pointer-events-none ${scrolled ? 'pt-4 px-4' : 'pt-0 px-4 md:px-8'}`}>
        <div className={`mx-auto pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'w-full md:w-auto md:min-w-[800px]' : 'w-full max-w-7xl'}`}>
          <div className={`flex justify-between items-center transition-all duration-500 ${getGlassStyle()}`}>
            {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline group shrink-0">
            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-500 bg-primary/20 backdrop-blur-md border border-primary/30 shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:rotate-12 group-hover:scale-110 overflow-hidden`}>
              <img src="/favicon.ico" alt="Logo" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
            </div>
            <span className={`text-2xl md:text-3xl font-brand tracking-tight transition-colors duration-500 ${scrolled ? 'text-white' : (isLightAtTop ? 'text-slate-900' : 'text-white')} drop-shadow-md`}>
              Shaifly<span className="text-primary">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[11px] font-black en-font tracking-[0.2em] no-underline transition-all relative py-2 group ${getNavTextColor(isActive(link.path))}`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-[3px] bg-primary rounded-full transition-all duration-500 origin-center ${isActive(link.path) ? 'scale-x-50 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-50 group-hover:opacity-100'}`} />
              </Link>
            ))}
            
            <Link to="/tips" className={`btn btn-sm px-8 h-12 rounded-2xl en-font transition-all ${
              (scrolled || isLightAtTop) 
                ? 'btn-primary shadow-lg shadow-primary/20 hover:scale-105' 
                : 'bg-white text-slate-900 hover:bg-slate-100'
            }`}>
              TIPS <LayoutGrid className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-4 md:hidden">
             <button 
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-all border ${
                (scrolled || isLightAtTop) ? 'bg-slate-100 border-slate-200 text-slate-900 shadow-inner' : 'bg-white/10 border-white/20 text-white backdrop-blur-md'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Overlay - Moved outside generic nav container for pristine coordinate space */}
      <div className={`md:hidden fixed inset-0 w-full h-screen bg-slate-950/98 backdrop-blur-3xl z-[110] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-start justify-center overflow-y-auto pb-10 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
      }`}>
          <div className="flex flex-col items-center gap-8 w-full max-w-sm px-10 min-h-max pt-20">
            <Link to="/" className="no-underline group" onClick={() => setIsOpen(false)}>
                <div className="w-20 h-20 bg-primary/10 backdrop-blur-2xl rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/40 group-hover:rotate-6 transition-transform overflow-hidden border border-primary/20">
                   <img src="/favicon.ico" alt="Logo" className="w-12 h-12 object-contain" />
                </div>
                <h2 className="text-5xl font-brand text-white text-center tracking-tight">Shaifly<span className="text-primary">.</span></h2>
                <p className="text-center text-slate-500 text-[10px] tracking-[0.4em] uppercase mt-4">Academic Library</p>
            </Link>
            
            <div className="w-full flex flex-col gap-4">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-5xl font-bn font-black no-underline flex items-center justify-between group py-4 border-b border-white/5 transition-all w-full ${
                    isActive(link.path) ? 'text-primary' : 'text-white/60 hover:text-white'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <span className="relative">
                    {link.name}
                    {isActive(link.path) && <span className="absolute -left-8 top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(16,185,129,1)]" />}
                  </span>
                  <ChevronRight className="w-10 h-10 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
                </Link>
              ))}
            </div>
            
            <Link to="/tips" className="btn btn-primary w-full py-6 text-2xl rounded-3xl mt-6 shadow-2xl shadow-primary/30" onClick={() => setIsOpen(false)}>
               টিপস এন্ড ট্রিকস <ChevronRight className="ml-2 w-7 h-7" />
            </Link>
          </div>
          
          <button 
            className="absolute top-12 right-12 text-white/40 hover:text-white transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-12 h-12" />
          </button>
        </div>
    </>
  );
};

export default Navbar;
