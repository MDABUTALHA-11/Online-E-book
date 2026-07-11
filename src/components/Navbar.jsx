import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight, LayoutGrid } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

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
    { name: 'QUIZ BOARD', path: '/quiz/leaderboard' },
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
      return active ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--primary)]';
    }
    if (isLightAtTop) {
      return active ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]';
    }
    return active ? 'text-[var(--primary)] font-bold drop-shadow-[0_0_8px_var(--primary-glow)]' : 'text-[var(--text-dim)] hover:text-[var(--primary)]';
  };

  const getGlassStyle = () => {
    if (scrolled) {
      return 'bg-[var(--bg-surface)]/90 backdrop-blur-xl py-3 px-6 md:px-8 rounded-lg shadow-[0_4px_25px_rgba(0,240,255,0.08)] border border-[var(--primary)]/15';
    }
    if (isLightAtTop) {
      return 'bg-[var(--bg-surface)]/40 backdrop-blur-md py-4 px-6 md:px-8 border border-[var(--bg-border)] shadow-sm rounded-lg';
    }
    return 'bg-transparent py-4 px-2 md:px-4 rounded-lg';
  };

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0, 0, 0.2, 1] }}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 pointer-events-none ${scrolled ? 'pt-4 px-4' : 'pt-0 px-4 md:px-8'}`}
      >
        <div className={`mx-auto pointer-events-auto transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? 'w-full md:w-auto md:min-w-[800px]' : 'w-full max-w-7xl'}`}>
          <div className={`flex justify-between items-center transition-all duration-500 ${getGlassStyle()} ${scrolled ? 'nav-scrolled' : ''}`}>
            {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline group shrink-0">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className={`w-9 h-9 rounded-lg flex items-center justify-center bg-[var(--primary)]/10 backdrop-blur-md border border-[var(--primary)]/30 shadow-[0_0_12px_var(--primary-glow)] overflow-hidden`}
            >
              <img src="/favicon.ico" alt="Logo" className="w-5 h-5 object-contain" />
            </motion.div>
            <span className="text-xl md:text-2xl font-headings tracking-wider text-[var(--text-primary)]">
              Shaifly<span className="text-[var(--primary)]">.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.2, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              >
                <Link
                  to={link.path}
                  className={`text-[11px] font-bold font-mono tracking-[0.15em] no-underline transition-all relative py-2 group ${getNavTextColor(isActive(link.path))}`}
                >
                  {link.name}
                  <motion.span
                    className={`absolute bottom-0 left-0 h-[2px] bg-[var(--primary)] rounded-sm`}
                    initial={false}
                    animate={{ scaleX: isActive(link.path) ? 0.6 : 0, opacity: isActive(link.path) ? 1 : 0 }}
                    style={{ width: '100%', originX: 0 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  />
                </Link>
              </motion.div>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
            >
              <Link to="/tips" className="flex items-center gap-1.5 px-6 h-9 rounded-lg font-mono text-[11px] font-bold text-[#0A0E1A] shadow-md shadow-[var(--primary)]/20 transition-all hover:scale-105 active:scale-95" style={{ background: 'var(--primary)' }}>
                TIPS <LayoutGrid className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          </div>

          {/* Mobile Buttons */}
          <div className="flex items-center gap-4 md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all border ${
                (scrolled || isLightAtTop) ? 'bg-[var(--bg-elevated)] border-[var(--bg-border)] text-[var(--text-primary)] shadow-sm' : 'bg-white/10 border-white/20 text-white backdrop-blur-md'
              }`}
              onClick={() => setIsOpen(!isOpen)}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isOpen ? (
                  <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
        </div>
      </motion.nav>

      {/* Full-Screen Mobile Menu Overlay with Framer Motion */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden fixed inset-0 w-full h-screen bg-[var(--bg-app)]/98 backdrop-blur-3xl z-[110] flex items-start justify-center overflow-y-auto pb-10"
          >
            <div className="flex flex-col items-center gap-8 w-full max-w-sm px-10 min-h-max pt-20">
              <Link to="/" className="no-underline group" onClick={() => setIsOpen(false)}>
                <motion.div
                  whileHover={{ rotate: 6 }}
                  className="w-16 h-16 bg-[var(--primary)]/10 backdrop-blur-2xl rounded-lg flex items-center justify-center mx-auto mb-4 shadow-xl shadow-[var(--primary)]/20 overflow-hidden border border-[var(--primary)]/20"
                >
                  <img src="/favicon.ico" alt="Logo" className="w-10 h-10 object-contain" />
                </motion.div>
                <h2 className="text-3xl font-headings text-white text-center tracking-wider">Shaifly<span className="text-[var(--primary)]">.</span></h2>
                <p className="text-center text-[var(--text-muted)] text-[9px] tracking-[0.4em] uppercase mt-2 font-mono">Academic Library</p>
              </Link>
              
              <div className="w-full flex flex-col gap-2">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <Link
                      to={link.path}
                      className={`text-2xl font-bn font-bold no-underline flex items-center justify-between group py-3.5 border-b border-white/5 transition-all w-full ${
                        isActive(link.path) ? 'text-[var(--primary)]' : 'text-white/60 hover:text-white'
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="relative">
                        {link.name}
                        {isActive(link.path) && <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-2 h-2 bg-[var(--primary)] rounded-sm shadow-[0_0_10px_var(--primary)] animate-pulse" />}
                      </span>
                      <ChevronRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0 text-[var(--primary)]" />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.4 }}
                className="w-full"
              >
                <Link to="/tips" className="flex items-center justify-center gap-2 w-full py-4 text-[16px] rounded-lg mt-6 shadow-xl shadow-[var(--primary)]/20 font-bn font-bold text-[#0A0E1A]" style={{ background: 'var(--primary)' }} onClick={() => setIsOpen(false)}>
                  টিপস এন্ড ট্রিকস <ChevronRight className="w-5 h-5" />
                </Link>
              </motion.div>
            </div>
            
            <motion.button
              whileTap={{ scale: 0.9, rotate: 90 }}
              className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-8 h-8" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
