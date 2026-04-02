import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, LayoutGrid, BookOpen, GraduationCap,
  FlaskConical, Palette, Briefcase, Star,
  Lightbulb, TrendingUp, Zap,
} from 'lucide-react';

const navSections = [
  {
    label: null,
    items: [
      { name: 'Home',     path: '/',            icon: Home },
      { name: 'Subjects', path: '/categories',  icon: LayoutGrid },
    ],
  },
  {
    label: 'STUDY',
    items: [
      { name: 'জীববিজ্ঞান',   path: '/subject/biology',     icon: GraduationCap },
      { name: 'পদার্থবিজ্ঞান', path: '/subject/physics',     icon: FlaskConical },
      { name: 'রসায়ন',        path: '/subject/chemistry',   icon: BookOpen },
      { name: 'উচ্চতর গণিত',  path: '/subject/higher-math', icon: Briefcase },
      { name: 'সাধারণ বিজ্ঞান', path: '/subject/science',   icon: Palette },
    ],
  },
  {
    label: 'EXTRAS',
    items: [
      { name: 'Quiz',     path: '/quiz',  icon: Star },
      { name: 'Library',  path: '/tips',  icon: Lightbulb },
    ],
  },
];

const trendingItems = ['Physics 1st Paper', 'Biology 2nd Paper', 'Higher Math'];

export default function Sidebar() {
  const { pathname } = useLocation();
  const isActive = (p) => p === '/' ? pathname === '/' : pathname.startsWith(p);

  return (
    <div
      className="flex flex-col h-full py-8 px-5 overflow-y-auto no-scrollbar"
      style={{ background: '#060d14' }}
    >
      {/* ── Logo ── */}
      <Link to="/" className="flex items-center gap-3 mb-10 shrink-0 no-underline group">
        <div className="relative w-14 h-14 shrink-0 group-hover:rotate-6 transition-transform duration-500">
          <div className="absolute inset-0 bg-[#22C55E]/20 blur-2xl rounded-full scale-125 animate-pulse" />
          <img 
            src="/favicon.ico" 
            alt="Shaifly Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_15px_rgba(34,197,94,0.4)]"
          />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[30px] font-black text-white tracking-tighter italic font-bn">Shaifly</span>
          <span className="text-[10px] font-black text-[#22C55E] uppercase tracking-[0.4em] font-en mt-1 opacity-80">Library</span>
        </div>
      </Link>

      {/* ── Navigation ── */}
      <nav className="flex flex-col gap-5 flex-1">
        {navSections.map((section, si) => (
          <div key={si} className="flex flex-col gap-0.5">
            {section.label && (
              <p className="text-[11px] font-black text-[#1e3a5f] uppercase tracking-[0.25em] px-5 mb-2 opacity-60 font-en">{section.label}</p>
            )}
            {section.items.map(item => {
              const active = isActive(item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="no-underline"
                >
                  <div
                    className={`flex items-center gap-4 px-5 py-4 rounded-2xl font-black text-[18px] transition-all duration-300 italic font-bn
                      ${active
                        ? 'bg-[#22C55E] text-white shadow-[0_8px_24px_rgba(34,197,94,0.35)] scale-[1.03] z-10 border border-white/20'
                        : 'text-[#64748b] hover:text-white hover:bg-[#0d1b2a] hover:translate-x-1'
                      }`}
                  >
                    <item.icon className={`w-[22px] h-[22px] shrink-0 ${active ? 'text-white' : 'text-[#334155]'}`} />
                    <span>{item.name}</span>
                    {active && <div className="ml-auto w-2 h-2 rounded-full bg-white animate-pulse" />}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}

        {/* ── Trending ── */}
        <div className="mt-2">
          <p className="text-[10px] font-black text-[#1e3a5f] uppercase tracking-[0.18em] px-4 mb-3">TRENDING</p>
          <div className="flex flex-col gap-2">
            {trendingItems.map(t => (
              <Link
                key={t}
                to="/categories"
                className="flex items-center gap-3 text-[#334155] hover:text-[#22C55E] text-[15px] font-black italic transition-all no-underline px-5 py-2.5 rounded-xl hover:bg-[#0d1b2a] group font-bn"
              >
                <TrendingUp className="w-4 h-4 shrink-0 group-hover:text-[#22C55E] transition-colors" />
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom branding ── */}
        <div className="mt-auto pt-4 border-t border-[#1e3a5f] mx-1">
          <p className="text-[11px] text-[#334155] font-bn text-center leading-relaxed px-2">
            বাংলাদেশের SSC ও HSC শিক্ষার্থীদের জন্য তৈরি ❤️
          </p>
        </div>
      </nav>
    </div>
  );
}
