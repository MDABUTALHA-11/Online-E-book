import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, ChevronRight, LayoutGrid } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  // Unified Dark Hero detection for Home, Categories, Subject, and Quiz pages
  const hasDarkHero = ['/', '/categories'].includes(location.pathname) || location.pathname.startsWith('/subject') || location.pathname.startsWith('/quiz');
  const isLightAtTop = !hasDarkHero;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
        setIsOpen(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'CATEGORIES', path: '/categories' },
    { name: 'ABOUT', path: '/about' },
    { name: 'VIP PLANS', path: '/subscription' },
    { name: 'QUIZ', path: '/quiz' },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    if (path === '/categories' && location.pathname.startsWith('/subject')) return true;
    return location.pathname.startsWith(path);
  };

  const getNavTextColor = (active = false) => {
    if (scrolled) {
      return active ? 'text-primary' : 'text-slate-500 hover:text-text-main';
    }
    if (isLightAtTop) {
      return active ? 'text-primary' : 'text-slate-800 hover:text-primary';
    }
    return active ? 'text-primary' : 'text-slate-100 hover:text-white';
  };

  const getLogoColor = () => {
    if (scrolled) return 'bg-primary';
    if (isLightAtTop) return 'bg-slate-900';
    return 'bg-primary';
  };

  const getBrandTextColor = () => {
    if (scrolled) return 'text-text-main';
    if (isLightAtTop) return 'text-slate-900';
    return 'text-white';
  };

  const getGlassStyle = () => {
    if (scrolled) {
      return 'glass py-3 px-8 rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] border border-white/40 backdrop-blur-3xl';
    }
    if (isLightAtTop) {
      return 'bg-white/40 backdrop-blur-md py-4 px-8 rounded-[2rem] border border-slate-100 shadow-sm md:px-8';
    }
    return 'bg-transparent py-4 px-6 md:px-0';
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${!visible ? '-translate-y-full px-0' : 'translate-y-0 px-0 md:px-8 py-4'}`}>
      <div className={`container mx-auto transition-all duration-700 ${scrolled ? 'max-w-7xl' : 'max-w-full md:max-w-7xl'}`}>
        <div className={`flex justify-between items-center transition-all duration-500 overflow-hidden ${getGlassStyle()}`}>
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 ${getLogoColor()} shadow-xl group-hover:rotate-6`}>
              <BookOpen className="text-white w-6 h-6" />
            </div>
            <span className={`text-2xl font-black en-font tracking-tight transition-colors duration-500 ${getBrandTextColor()}`}>
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
              className={`w-12 h-12 flex items-center justify-center rounded-2xl transition-all border ${
                (scrolled || isLightAtTop) ? 'bg-white border-slate-100 text-text-main shadow-sm' : 'bg-white/10 border-white/20 text-white'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Full-Screen Mobile Menu Overlay */}
        <div className={`md:hidden fixed inset-0 top-0 left-0 w-full h-screen bg-slate-950/98 backdrop-blur-3xl z-[90] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-start justify-center overflow-y-auto pb-10 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
        }`}>
          <div className="flex flex-col items-center gap-8 w-full max-w-sm px-10 min-h-max pt-20">
            <Link to="/" className="no-underline" onClick={() => setIsOpen(false)}>
                <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary/40">
                   <BookOpen className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-black text-white text-center">Shaifly<span className="text-primary italic">.</span></h2>
                <p className="text-center text-slate-500 text-[10px] tracking-[0.3em] uppercase mt-2">Academic Library</p>
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
      </div>
    </nav>
  );
};

export default Navbar;
