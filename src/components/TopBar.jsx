import React, { useState, useRef, useEffect } from 'react';
import { Search, Bell, UserCircle2, LogIn, UserPlus, X, Zap } from 'lucide-react';
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

  useEffect(() => {
    const handle = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setProfileOpen(false);
      if (notiRef.current && !notiRef.current.contains(e.target)) setNotiOpen(false);
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, []);

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
            background: '#0d1b2a',
            border: '1.5px solid #1e3a5f',
          }}
          onFocus={e => { e.target.style.border = '1.5px solid #22C55E40'; e.target.style.background = '#112236'; }}
          onBlur={e => { e.target.style.border = '1.5px solid #1e3a5f'; e.target.style.background = '#0d1b2a'; }}
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
            className={`relative w-10 h-10 rounded-xl flex items-center justify-center transition-all ${notiOpen ? 'text-[#22C55E] bg-[#112236]' : 'text-[#64748b] hover:text-white bg-[#0d1b2a]'} border-1.5`}
            style={{ border: notiOpen ? '1.5px solid rgba(34,197,94,0.4)' : '1.5px solid #1e3a5f' }}
          >
            <Bell className={`w-[20px] h-[20px] ${notiOpen ? 'animate-none' : 'animate-swing'}`} />
            <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#060d14] animate-pulse" />
          </button>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {notiOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-14 w-[320px] z-[200] rounded-2xl overflow-hidden backdrop-blur-3xl shadow-[0_24px_60px_rgba(0,0,0,0.6)]"
                style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}
              >
                <div className="px-5 py-4 border-b border-[#1e3a5f] flex justify-between items-center bg-[#112236]">
                  <h3 className="text-white font-black text-[18px] italic font-bn m-0">নোটিফিকেশন</h3>
                  <span className="bg-[#22C55E]/20 text-[#22C55E] text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider font-en">3 New</span>
                </div>
                
                <div className="max-h-[380px] overflow-y-auto no-scrollbar">
                  {notifications.map((n) => (
                    <div key={n.id} className="px-5 py-4 border-b border-[#1e3a5f] hover:bg-white/5 transition-colors cursor-pointer group">
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
                
                <div className="p-3 text-center bg-[#112236]">
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
            className="flex items-center gap-2 h-10 px-4 rounded-xl font-bold text-[13px] text-[#64748b] hover:text-white transition-colors"
            style={{ background: '#0d1b2a', border: '1.5px solid #1e3a5f' }}
          >
            <UserCircle2 className="w-[18px] h-[18px]" />
            <span className="hidden sm:inline">Account</span>
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div
              className="absolute right-0 top-14 w-[290px] z-[200] rounded-2xl overflow-hidden"
              style={{ background: '#0d1b2a', border: '1px solid #1e3a5f', boxShadow: '0 24px 60px rgba(0,0,0,0.5)' }}
            >
              {/* Header */}
              <div className="relative px-5 py-5" style={{ background: '#112236', borderBottom: '1px solid #1e3a5f' }}>
                <button onClick={() => setProfileOpen(false)} className="absolute top-3 right-3 text-[#334155] hover:text-white transition-colors">
                  <X className="w-4 h-4" />
                </button>
                <div className="w-11 h-11 rounded-xl bg-[#22C55E]/15 border border-[#22C55E]/20 flex items-center justify-center mb-3">
                  <UserCircle2 className="w-6 h-6 text-[#22C55E]" />
                </div>
                <p className="font-black text-white text-[18px] italic">আপনার প্রোফাইল তৈরি করুন</p>
                <p className="text-[#64748b] text-[14px] mt-1 font-bn leading-snug font-bold italic">
                  নোট সেভ করুন, কুইজে অংশ নিন এবং লিডারবোর্ডে থাকুন।
                </p>
              </div>

              {/* Actions */}
              <div className="p-4 flex flex-col gap-2.5">
                <Link
                  to="/register"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 w-full h-[48px] px-4 rounded-xl font-black text-[16px] text-white no-underline transition-all italic font-bn"
                  style={{ background: '#22C55E', boxShadow: '0 8px 20px rgba(34,197,94,0.3)' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
                  onMouseLeave={e => e.currentTarget.style.background = '#22C55E'}
                >
                  <UserPlus className="w-5 h-5" />
                  প্রোফাইল তৈরি করুন (ফ্রি)
                </Link>
                <Link
                  to="/subscription"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-2.5 w-full h-[44px] px-4 rounded-xl font-bold text-[13.5px] text-[#64748b] no-underline transition-all hover:text-white"
                  style={{ background: '#112236', border: '1px solid #1e3a5f' }}
                >
                  <LogIn className="w-4 h-4" />
                  লগ ইন করুন
                </Link>
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
