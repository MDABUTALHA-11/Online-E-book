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
        <div className="w-9 h-9 relative group">
          <div className="absolute inset-0 bg-[#14B8A6]/20 blur-lg rounded-full group-hover:scale-125 transition-transform" />
          <img 
            src="/favicon.ico" 
            alt="Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(20,184,166,0.3)]"
          />
        </div>
        <span className="text-[#0F172A] font-black text-[22px] italic tracking-tight font-bn leading-none">Shaifly</span>
      </Link>

      {/* ── Search bar ── */}
      <div className="flex-1 relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search notes, books, subjects..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full h-[44px] rounded-xl pl-11 pr-5 text-[14px] font-medium text-slate-800 placeholder:text-slate-500 outline-none transition-all"
          style={{
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--bg-border)',
          }}
          onFocus={e => { e.target.style.border = '1.5px solid #14B8A6'; e.target.style.background = 'var(--bg-elevated)'; }}
          onBlur={e => { e.target.style.border = '1.5px solid var(--bg-border)'; e.target.style.background = 'var(--bg-surface)'; }}
        />
        {/* Teal glow when has value */}
        {q && (
          <div className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ boxShadow: '0 0 0 2px rgba(20, 184, 166, 0.25)' }} />
        )}
      </div>

      {/* ── Right cluster ── */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-10 h-10 rounded-xl flex items-center justify-center transition-all border bg-[var(--bg-surface)] text-slate-500 hover:text-[#0F172A]"
          style={{ border: '1.5px solid var(--bg-border)' }}
          aria-label="Toggle Dark Mode"
        >
          {isDark ? (
            <motion.svg
              initial={{ rotate: -90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              key="sun"
              className="w-5 h-5 text-[#F97316]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707m12.728 6.364A9 9 0 115.636 5.636a9 9 0 0012.728 12.728z" />
            </motion.svg>
          ) : (
            <motion.svg
              initial={{ rotate: 90, scale: 0.8 }}
              animate={{ rotate: 0, scale: 1 }}
              key="moon"
              className="w-5 h-5 text-[#0F172A]"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
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
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${notiOpen ? 'text-[#14B8A6] bg-[var(--bg-elevated)]' : 'text-slate-500 hover:text-[#0F172A] bg-[var(--bg-surface)]'} border-1.5`}
            style={{ border: notiOpen ? '1.5px solid rgba(20, 184, 166, 0.4)' : '1.5px solid var(--bg-border)' }}
          >
            <Bell className={`w-[20px] h-[20px] ${notiOpen ? 'animate-none' : 'animate-swing'}`} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[var(--bg-app)] animate-pulse" />
          </button>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {notiOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-14 w-[320px] z-[200] rounded-2xl overflow-hidden backdrop-blur-3xl shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
              >
                <div className="px-5 py-4 border-b border-[var(--bg-border)] flex justify-between items-center bg-[var(--bg-elevated)]">
                  <h3 className="text-[#0F172A] font-black text-[18px] italic font-bn m-0">নোটিফিকেশন</h3>
                  <span className="bg-[#14B8A6]/10 text-[#14B8A6] text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider font-en">3 New</span>
                </div>
                
                <div className="max-h-[380px] overflow-y-auto no-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-5 py-4 border-b border-[var(--bg-border)] hover:bg-[#0F172A]/5 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[#0F172A] font-black text-[15px] italic font-bn group-hover:text-[#14B8A6]">{n.title}</h4>
                        <span className="text-slate-400 text-[10px] font-bold italic font-bn whitespace-nowrap ml-2">{n.time}</span>
                      </div>
                      <p className="text-slate-600 text-[13px] font-bn leading-snug font-bold italic m-0">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 text-center bg-[var(--bg-elevated)]">
                  <button className="text-[#64748b] hover:text-[#0F172A] text-[12px] font-black uppercase tracking-widest transition-colors font-en italic">
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
            className="flex items-center gap-2 h-10 px-4 rounded-xl font-bold text-[13px] transition-all overflow-hidden"
            style={{ 
              background: user ? 'rgba(20, 184, 166, 0.1)' : 'var(--bg-surface)', 
              border: user ? '1.5px solid rgba(20, 184, 166, 0.3)' : '1.5px solid var(--bg-border)',
              color: user ? '#00B6AB' : '#64748b'
            }}
          >
            {user?.photo ? (
              <img src={user.photo} alt="P" className="w-5 h-5 rounded-md object-cover" />
            ) : (
              <UserCircle2 className="w-[18px] h-[18px]" />
            )}
            <span className="hidden sm:inline font-bn font-black italic">{user ? user.name.split(' ')[0] : 'Account'}</span>
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div
              className="absolute right-0 top-14 w-[290px] z-[200] rounded-2xl overflow-hidden"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)', boxShadow: '0 20px 50px rgba(15,23,42,0.06)' }}
            >
              {/* Header */}
              <div className="relative px-5 py-6" style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--bg-border)' }}>
                <button onClick={() => setProfileOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-[#0F172A] transition-colors">
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-[2rem] bg-[#14B8A6]/10 border-2 border-[#14B8A6]/20 flex items-center justify-center mb-4 overflow-hidden shadow-xl">
                    {user?.photo ? (
                      <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle2 className="w-10 h-10 text-[#14B8A6]" />
                    )}
                  </div>
                  <h3 className="font-black text-[#0F172A] text-[20px] italic font-bn leading-tight">{user ? user.name : 'আপনার প্রোফাইল নেই'}</h3>
                  <p className="text-[#14B8A6] text-[11px] font-black uppercase tracking-[0.2em] mt-1 font-en">{user ? (user.level || 'Student') : 'Guest User'}</p>
                  
                  {user?.bio && (
                    <div className="mt-4 p-3 rounded-xl bg-[var(--bg-app)]/40 border border-[var(--bg-border)]/30 w-full">
                       <p className="text-slate-600 text-[13px] font-bn leading-snug font-bold italic m-0 line-clamp-3">
                          "{user.bio}"
                       </p>
                    </div>
                  )}
                </div>
              </div>

              {/* User Actions */}
              <div className="p-4 flex flex-col gap-2.5">
                {!user ? (
                  <>
                    <Link
                      to="/register"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center justify-center gap-2.5 w-full h-[48px] px-4 rounded-xl font-black text-[16px] text-white no-underline transition-all italic font-bn"
                      style={{ background: '#F97316', boxShadow: '0 8px 20px rgba(249, 115, 22, 0.25)' }}
                    >
                      <UserPlus className="w-5 h-5" />
                      প্রোফাইল তৈরি করুন (ফ্রি)
                    </Link>
                    <Link
                      to="/subscription"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 w-full h-[44px] px-4 rounded-xl font-black text-[14px] text-slate-500 no-underline transition-all hover:text-[#0F172A]"
                      style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}
                    >
                      <LogIn className="w-5 h-5" />
                      লগ ইন করুন
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/subscription"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center justify-center gap-3 w-full h-[48px] px-4 rounded-xl font-black text-[15px] text-white no-underline transition-all italic font-bn"
                      style={{ background: '#F97316', boxShadow: '0 8px 20px rgba(249, 115, 22, 0.25)' }}
                    >
                      <Zap className="w-5 h-5" />
                      VIP মেম্বারশিপ নিন
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                       <Link
                         to="/register"
                         onClick={() => setProfileOpen(false)}
                         className="flex items-center justify-center gap-2 h-11 rounded-xl font-black text-[13px] text-slate-500 bg-[var(--bg-elevated)] border border-[var(--bg-border)] no-underline hover:text-[#0F172A] font-bn italic"
                       >
                         <Settings className="w-4 h-4" /> এডিট
                       </Link>
                       <button
                         onClick={handleLogout}
                         className="flex items-center justify-center gap-2 h-11 rounded-xl font-black text-[13px] text-red-500 bg-red-500/5 border border-red-500/20 hover:bg-red-500/10 font-bn italic"
                       >
                         <LogOut className="w-4 h-4" /> লগ আউট
                       </button>
                    </div>
                  </>
                )}
              </div>

              {/* Benefits */}
              <div className="px-4 pb-4">
                <p className="text-[10.5px] font-black text-slate-400 uppercase tracking-wider mb-2.5">সুবিধাসমূহ</p>
                {['নোট সেভ ও ডাউনলোড করুন', 'কুইজে অংশ নিন ও লিডারবোর্ড দেখুন', 'পার্সোনালাইজড পড়াশোনার প্ল্যান'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-[12px] text-slate-600 font-bn mb-1.5">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 text-[#14B8A6]" style={{ background: 'rgba(20, 184, 166, 0.1)' }}>✓</span>
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
