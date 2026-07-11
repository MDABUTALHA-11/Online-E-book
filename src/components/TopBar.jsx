import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, UserCircle2, LogIn, UserPlus, X, Zap, LogOut, ChevronRight, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopBar() {
  const [q, setQ] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [notiOpen, setNotiOpen] = useState(false);
  const dropRef = useRef(null);
  const notiRef = useRef(null);

  const [isDark, setIsDark] = useState(() => {
    return document.documentElement.classList.contains('dark') || 
      localStorage.getItem('theme') === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const toggleDarkMode = () => setIsDark(!isDark);

  const notifications = [
    { id: 1, title: 'নতুন নোট যোগ করা হয়েছে!', desc: 'জীববিজ্ঞান ২য় পত্রের সকল হ্যান্ডনোট এখন লাইব্রেরিতে পাওয়া যাচ্ছে।', time: '২ মিনিট আগে', type: 'new' },
    { id: 2, title: 'কুইজ রেজাল্ট পাবলিশ!', desc: 'গতকালের পদার্থবিজ্ঞান কুইজের লিডারবোর্ড আপডেট করা হয়েছে। চেক করুন।', time: '১ ঘণ্টা আগে', type: 'quiz' },
    { id: 3, title: 'VIP মেম্বারশিপ অফার!', desc: '৫০% ডিসকাউন্টে আজই ভিআইপি মেম্বার হয়ে আনলিমিটেড নোট ডাউনলোড করুন।', time: '৫ ঘণ্টা আগে', type: 'promo' },
  ];

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const savedUser = JSON.parse(localStorage.getItem('user'));
      setUser(savedUser);
    };
    fetchUser();
    window.addEventListener('storage', fetchUser);
    return () => window.removeEventListener('storage', fetchUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setProfileOpen(false);
  };

  return (
    <div className="flex items-center gap-4 h-[68px]">

      {/* ── Shaifly brand (mobile only seen in topbar) ── */}
      <Link to="/" className="flex items-center gap-2.5 shrink-0 md:hidden no-underline">
        <div className="w-8 h-8 relative group">
          <div className="absolute inset-0 bg-[var(--primary)]/20 blur-lg rounded-sm group-hover:scale-125 transition-transform" />
          <img 
            src="/favicon.ico" 
            alt="Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
          />
        </div>
        <span className="text-[var(--text-primary)] font-black text-[20px] tracking-wider font-headings leading-none">Shaifly</span>
      </Link>

      {/* ── Search bar ── */}
      <div className="flex-1 relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] pointer-events-none" />
        <input
          type="text"
          placeholder="Search notes, books, subjects..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full h-[40px] rounded-lg pl-11 pr-5 text-[14px] font-medium text-[var(--text-primary)] placeholder:text-[var(--text-dim)] outline-none transition-all font-body"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--bg-border)',
          }}
          onFocus={e => { e.target.style.borderColor = 'var(--primary)'; e.target.style.boxShadow = '0 0 10px var(--primary-glow)'; }}
          onBlur={e => { e.target.style.borderColor = 'var(--bg-border)'; e.target.style.boxShadow = 'none'; }}
        />
        {/* Neon glow when has value */}
        {q && (
          <div className="absolute inset-0 rounded-lg pointer-events-none"
            style={{ boxShadow: '0 0 8px var(--primary-glow)' }} />
        )}
      </div>

      {/* ── Right cluster ── */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-9 h-9 rounded-lg flex items-center justify-center transition-all border bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--primary)]"
          style={{ border: '1px solid var(--bg-border)' }}
          aria-label="Toggle Dark Mode"
        >
          {isDark ? (
            <motion.svg
              initial={{ rotate: -90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              key="sun"
              className="w-4 h-4 text-[var(--primary)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 6.364A9 9 0 115.636 5.636a9 9 0 0012.728 12.728z" />
            </motion.svg>
          ) : (
            <motion.svg
              initial={{ rotate: 90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              key="moon"
              className="w-4 h-4 text-[var(--neon-violet)]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </motion.svg>
          )}
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={notiRef}>
          <button
            onClick={() => setNotiOpen(!notiOpen)}
            className={`relative w-9 h-9 rounded-lg flex items-center justify-center transition-all ${notiOpen ? 'text-[var(--primary)] bg-[var(--bg-elevated)]' : 'text-[var(--text-muted)] hover:text-[var(--primary)] bg-[var(--bg-surface)]'}`}
            style={{ border: notiOpen ? '1px solid var(--primary)' : '1px solid var(--bg-border)' }}
          >
            <Bell className={`w-[18px] h-[18px]`} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--neon-pink)] rounded-sm shadow-[0_0_6px_var(--neon-pink)] animate-pulse" />
          </button>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {notiOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-12 w-[300px] z-[200] rounded-lg overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.3)] border border-[var(--bg-border)]"
                style={{ background: 'var(--bg-surface)' }}
              >
                <div className="px-4 py-3 border-b border-[var(--bg-border)] flex justify-between items-center bg-[var(--bg-elevated)]">
                  <h3 className="text-[var(--text-primary)] font-bold text-[15px] font-bn m-0">নোটিফিকেশন</h3>
                  <span className="bg-[var(--primary)]/10 text-[var(--primary)] text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider font-mono">3 New</span>
                </div>
                
                <div className="max-h-[300px] overflow-y-auto no-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-4 py-3 border-b border-[var(--bg-border)] hover:bg-[var(--bg-elevated)] transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[var(--text-primary)] font-bold text-[13px] font-bn group-hover:text-[var(--primary)]">{n.title}</h4>
                        <span className="text-[var(--text-dim)] text-[9px] font-bold font-bn whitespace-nowrap ml-2">{n.time}</span>
                      </div>
                      <p className="text-[var(--text-muted)] text-[12px] font-bn leading-snug font-semibold m-0">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="p-2 text-center bg-[var(--bg-elevated)] border-t border-[var(--bg-border)]">
                  <button className="text-[var(--text-muted)] hover:text-[var(--primary)] text-[11px] font-bold uppercase tracking-wider transition-colors font-mono">
                    View All Notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Account */}
        <div className="relative" ref={dropRef}>
          <button
            onClick={() => setProfileOpen(v => !v)}
            className="flex items-center gap-2 h-9 px-3 rounded-lg font-bold text-[12px] transition-all overflow-hidden"
            style={{ 
              background: user ? 'rgba(0, 240, 255, 0.1)' : 'var(--bg-surface)', 
              border: user ? '1px solid rgba(0, 240, 255, 0.3)' : '1px solid var(--bg-border)',
              color: user ? 'var(--primary)' : 'var(--text-muted)'
            }}
          >
            {user?.photo ? (
              <img src={user.photo} alt="P" className="w-5 h-5 rounded-sm object-cover" />
            ) : (
              <UserCircle2 className="w-[16px] h-[16px]" />
            )}
            <span className="hidden sm:inline font-bn font-semibold">{user ? user.name.split(' ')[0] : 'Account'}</span>
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div
              className="absolute right-0 top-12 w-[280px] z-[200] rounded-lg overflow-hidden border border-[var(--bg-border)] shadow-[0_4px_25px_rgba(0,0,0,0.3)]"
              style={{ background: 'var(--bg-surface)' }}
            >
              {/* Header */}
              <div className="relative px-4 py-5 bg-[var(--bg-elevated)] border-b border-[var(--bg-border)]">
                <button onClick={() => setProfileOpen(false)} className="absolute top-4 right-4 text-[var(--text-dim)] hover:text-[var(--text-primary)] transition-colors">
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center mb-3 overflow-hidden shadow-lg">
                    {user?.photo ? (
                      <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle2 className="w-8 h-8 text-[var(--primary)]" />
                    )}
                  </div>
                  <h3 className="font-bold text-[var(--text-primary)] text-[18px] font-bn leading-tight">{user ? user.name : 'আপনার প্রোফাইল নেই'}</h3>
                  <p className="text-[var(--primary)] text-[10px] font-bold uppercase tracking-widest mt-1 font-mono">{user ? (user.level || 'Student') : 'Guest User'}</p>
                  
                  {user?.bio && (
                    <div className="mt-3 p-2.5 rounded-lg bg-[var(--bg-app)] border border-[var(--bg-border)]/55 w-full">
                       <p className="text-[var(--text-muted)] text-[12px] font-bn leading-snug font-semibold m-0 line-clamp-2">
                          "{user.bio}"
                       </p>
                    </div>
                  )}
                </div>
              </div>

              {/* User Actions */}
              <div className="p-3 flex flex-col gap-2">
                {!user ? (
                  <>
                    <Link
                      to="/register"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full h-[40px] px-4 rounded-lg font-bold text-[14px] text-[#0A0E1A] no-underline transition-all font-bn"
                      style={{ background: 'var(--accent)', boxShadow: '0 4px 10px rgba(0, 255, 136, 0.2)' }}
                    >
                      <UserPlus className="w-4.5 h-4.5" />
                      প্রোফাইল তৈরি করুন (ফ্রি)
                    </Link>
                    <Link
                      to="/subscription"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center justify-center gap-2 w-full h-[38px] px-4 rounded-lg font-bold text-[13px] text-[var(--text-primary)] no-underline transition-all hover:bg-[var(--bg-elevated)]"
                      style={{ background: 'transparent', border: '1px solid var(--bg-border)' }}
                    >
                      <LogIn className="w-4.5 h-4.5" />
                      লগ ইন করুন
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/subscription"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center justify-center gap-2.5 w-full h-[40px] px-4 rounded-lg font-bold text-[13px] text-[#0A0E1A] no-underline transition-all font-bn"
                      style={{ background: 'var(--accent)', boxShadow: '0 4px 10px rgba(0, 255, 136, 0.2)' }}
                    >
                      <Zap className="w-4.5 h-4.5" />
                      VIP মেম্বারশিপ নিন
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                       <Link
                         to="/register"
                         onClick={() => setProfileOpen(false)}
                         className="flex items-center justify-center gap-2 h-9 rounded-lg font-bold text-[12px] text-[var(--text-muted)] bg-[var(--bg-elevated)] border border-[var(--bg-border)] no-underline hover:text-[var(--text-primary)] font-bn"
                       >
                         <Settings className="w-3.5 h-3.5" /> এডিট
                       </Link>
                       <button
                         onClick={handleLogout}
                         className="flex items-center justify-center gap-2 h-9 rounded-lg font-bold text-[12px] text-[var(--neon-pink)] bg-[var(--neon-pink)]/5 border border-[var(--neon-pink)]/20 hover:bg-[var(--neon-pink)]/10 font-bn"
                       >
                         <LogOut className="w-3.5 h-3.5" /> লগ আউট
                       </button>
                    </div>
                  </>
                )}
              </div>

              {/* Benefits */}
              <div className="px-4 pb-4 border-t border-[var(--bg-border)] pt-3 bg-[var(--bg-elevated)]/30">
                <p className="text-[9px] font-bold text-[var(--text-dim)] uppercase tracking-wider mb-2 font-mono">সুবিধাসমূহ</p>
                {['নোট সেভ ও ডাউনলোড করুন', 'কুইজে অংশ নিন ও লিডারবোর্ড দেখুন', 'পার্সোনালাইজড পড়াশোনার প্ল্যান'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-[11px] text-[var(--text-muted)] font-bn mb-1 font-semibold">
                    <span className="w-3.5 h-3.5 rounded-sm flex items-center justify-center text-[9px] font-bold shrink-0 text-[var(--primary)] bg-[var(--primary)]/10 border border-[var(--primary)]/20">✓</span>
                    {b}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
