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
          <div className="absolute inset-0 bg-[#22C55E]/20 blur-lg rounded-full group-hover:scale-125 transition-transform" />
          <img 
            src="/favicon.ico" 
            alt="Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(34,197,94,0.3)]"
          />
        </div>
        <span className="text-white font-black text-[22px] italic tracking-tight font-bn leading-none">Shaifly</span>
      </Link>

      {/* ── Search bar ── */}
      <div className="flex-1 relative max-w-2xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#334155] pointer-events-none" />
        <input
          type="text"
          placeholder="Search notes, books, subjects..."
          value={q}
          onChange={e => setQ(e.target.value)}
          className="w-full h-[44px] rounded-xl pl-11 pr-5 text-[14px] font-medium text-white placeholder:text-[#334155] outline-none transition-all"
          style={{
            background: 'var(--bg-surface)',
            border: '1.5px solid var(--bg-border)',
          }}
          onFocus={e => { e.target.style.border = '1.5px solid #22C55E40'; e.target.style.background = 'var(--bg-elevated)'; }}
          onBlur={e => { e.target.style.border = '1.5px solid var(--bg-border)'; e.target.style.background = 'var(--bg-surface)'; }}
        />
        {/* Green glow when has value */}
        {q && (
          <div className="absolute inset-0 rounded-xl pointer-events-none"
            style={{ boxShadow: '0 0 0 2px rgba(34,197,94,0.25)' }} />
        )}
      </div>

      {/* ── Right cluster ── */}
      <div className="flex items-center gap-2 shrink-0">

        {/* Notification Bell */}
        <div className="relative" ref={notiRef}>
          <button
            onClick={() => setNotiOpen(!notiOpen)}
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${notiOpen ? 'text-[#22C55E] bg-[var(--bg-elevated)]' : 'text-[#64748b] hover:text-white bg-[var(--bg-surface)]'} border-1.5`}
            style={{ border: notiOpen ? '1.5px solid rgba(34,197,94,0.4)' : '1.5px solid var(--bg-border)' }}
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
                className="absolute right-0 top-14 w-[320px] z-[200] rounded-2xl overflow-hidden backdrop-blur-3xl shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
              >
                <div className="px-5 py-4 border-b border-[var(--bg-border)] flex justify-between items-center bg-[var(--bg-elevated)]">
                  <h3 className="text-white font-black text-[18px] italic font-bn m-0">নোটিফিকেশন</h3>
                  <span className="bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider font-en">3 New</span>
                </div>
                
                <div className="max-h-[380px] overflow-y-auto no-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-5 py-4 border-b border-[var(--bg-border)] hover:bg-white/5 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-[#22C55E] font-black text-[15px] italic font-bn group-hover:underline">{n.title}</h4>
                        <span className="text-[#334155] text-[10px] font-bold italic font-bn whitespace-nowrap ml-2">{n.time}</span>
                      </div>
                      <p className="text-slate-400 text-[13px] font-bn leading-snug font-bold italic m-0">
                        {n.desc}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="p-3 text-center bg-[var(--bg-elevated)]">
                  <button className="text-[#64748b] hover:text-white text-[12px] font-black uppercase tracking-widest transition-colors font-en italic">
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
              background: user ? 'rgba(34,197,94,0.1)' : 'var(--bg-surface)', 
              border: user ? '1.5px solid rgba(34,197,94,0.3)' : '1.5px solid var(--bg-border)',
              color: user ? '#22C55E' : '#64748b'
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
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
            >
              {/* Header */}
              {/* Header */}
              <div className="relative px-5 py-6" style={{ background: 'var(--bg-elevated)', borderBottom: '1px solid var(--bg-border)' }}>
                <button onClick={() => setProfileOpen(false)} className="absolute top-4 right-4 text-[#334155] hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-[2rem] bg-[#22C55E]/10 border-2 border-[#22C55E]/20 flex items-center justify-center mb-4 overflow-hidden shadow-xl">
                    {user?.photo ? (
                      <img src={user.photo} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <UserCircle2 className="w-10 h-10 text-[#22C55E]" />
                    )}
                  </div>
                  <h3 className="font-black text-white text-[20px] italic font-bn leading-tight">{user ? user.name : 'আপনার প্রোফাইল নেই'}</h3>
                  <p className="text-[#22C55E] text-[11px] font-black uppercase tracking-[0.2em] mt-1 font-en">{user ? (user.level || 'Student') : 'Guest User'}</p>
                  
                  {user?.bio && (
                    <div className="mt-4 p-3 rounded-xl bg-[var(--bg-app)]/40 border border-[var(--bg-border)]/30 w-full">
                       <p className="text-slate-400 text-[13px] font-bn leading-snug font-bold italic m-0 line-clamp-3">
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
                      className="flex items-center gap-2.5 w-full h-[48px] px-4 rounded-xl font-black text-[16px] text-white no-underline transition-all italic font-bn"
                      style={{ background: '#22C55E', boxShadow: '0 8px 20px rgba(34,197,94,0.3)' }}
                    >
                      <UserPlus className="w-5 h-5" />
                      প্রোফাইল তৈরি করুন (ফ্রি)
                    </Link>
                    <Link
                      to="/subscription"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 w-full h-[44px] px-4 rounded-xl font-black text-[14px] text-[#64748b] no-underline transition-all hover:text-white"
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
                      className="flex items-center gap-3 w-full h-[48px] px-4 rounded-xl font-black text-[15px] text-white no-underline transition-all italic font-bn"
                      style={{ background: '#22C55E', boxShadow: '0 8px 20px rgba(34,197,94,0.3)' }}
                    >
                      <Zap className="w-5 h-5" />
                      VIP মেম্বারশিপ নিন
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                       <Link
                         to="/register"
                         onClick={() => setProfileOpen(false)}
                         className="flex items-center justify-center gap-2 h-11 rounded-xl font-black text-[13px] text-slate-400 bg-[var(--bg-elevated)] border border-[var(--bg-border)] no-underline hover:text-white font-bn italic"
                       >
                         <Settings className="w-4 h-4" /> এডিট
                       </Link>
                       <button
                         onClick={handleLogout}
                         className="flex items-center justify-center gap-2 h-11 rounded-xl font-black text-[13px] text-red-400 bg-red-400/5 border border-red-400/20 hover:bg-red-400/10 font-bn italic"
                       >
                         <LogOut className="w-4 h-4" /> লগ আউট
                       </button>
                    </div>
                  </>
                )}
              </div>

              {/* Benefits */}
              <div className="px-4 pb-4">
                <p className="text-[10.5px] font-black text-[#334155] uppercase tracking-wider mb-2.5">সুবিধাসমূহ</p>
                {['নোট সেভ ও ডাউনলোড করুন', 'কুইজে অংশ নিন ও লিডারবোর্ড দেখুন', 'পার্সোনালাইজড পড়াশোনার প্ল্যান'].map(b => (
                  <div key={b} className="flex items-center gap-2 text-[12px] text-[#64748b] font-bn mb-1.5">
                    <span className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black shrink-0 text-[#22C55E]" style={{ background: 'rgba(34,197,94,0.1)' }}>✓</span>
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
