import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home, LayoutGrid, BookOpen, GraduationCap,
  FlaskConical, Palette, Briefcase, Star,
  Lightbulb, TrendingUp, Zap, ShieldCheck, Image
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
      { name: 'এক নজরে অধ্যায়', path: '/at-a-glance', icon: Image },
      { name: 'Expert Help', path: '/appointment',icon: Zap },
      { name: 'Library',  path: '/tips',  icon: Lightbulb },
    ],
  },
  {
    label: 'ADMIN',
    items: [
      { name: 'Payments', path: '/admin/payments', icon: ShieldCheck },
    ],
  },
];

const trendingItems = ['Physics 1st Paper', 'Biology 2nd Paper', 'Higher Math'];

export default function Sidebar() {
  const { pathname } = useLocation();
  const isActive = (p) => p === '/' ? pathname === '/' : pathname.startsWith(p);

  return (
    <div
      className="flex flex-col h-full py-8 px-5 overflow-y-auto no-scrollbar border-r border-[var(--bg-border)] animate-data-stream"
      style={{ background: 'var(--bg-surface)' }}
    >
      {/* ── Logo ── */}
      <Link to="/" className="flex items-center gap-3 mb-10 shrink-0 no-underline group">
        <div className="relative w-12 h-12 shrink-0 group-hover:rotate-12 transition-transform duration-500">
          <div className="absolute inset-0 bg-[var(--primary)]/10 blur-xl rounded-lg scale-125 animate-pulse" />
          <img 
            src="/favicon.ico" 
            alt="Shaifly Logo" 
            className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_8px_rgba(0,240,255,0.4)]"
          />
        </div>
        <div className="flex flex-col leading-none">
          <span className="text-[26px] font-black text-[var(--text-primary)] tracking-wider font-headings">Shaifly</span>
          <span className="text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.4em] font-mono mt-1 opacity-90">Library</span>
        </div>
      </Link>

      {/* ── Navigation ── */}
      <nav className="flex flex-col gap-5 flex-1">
        {navSections.map((section, si) => (
          <div key={si} className="flex flex-col gap-0.5">
            {section.label && (
              <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-[0.25em] px-4 mb-2 font-mono">{section.label}</p>
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
                    className={`flex items-center gap-4 px-4 py-3.5 rounded-lg font-bold text-[16px] transition-all duration-300 font-bn
                      ${active
                        ? 'bg-[var(--primary)]/10 text-[var(--primary)] border border-[var(--primary)]/30 shadow-[0_0_15px_rgba(0,240,255,0.15)] scale-[1.02] z-10'
                        : 'text-[var(--text-muted)] hover:text-[var(--primary)] hover:bg-[var(--bg-elevated)] hover:translate-x-1'
                      }`}
                  >
                    <item.icon className={`w-[20px] h-[20px] shrink-0 ${active ? 'text-[var(--primary)]' : 'text-[var(--text-dim)]'}`} />
                    <span>{item.name}</span>
                    {active && <div className="ml-auto w-1.5 h-1.5 rounded-sm bg-[var(--primary)] shadow-[0_0_8px_rgba(0,240,255,0.8)] animate-pulse" />}
                  </div>
                </Link>
              );
            })}
          </div>
        ))}

        {/* ── Trending ── */}
        <div className="mt-2">
          <p className="text-[9px] font-bold text-[var(--text-dim)] uppercase tracking-[0.18em] px-4 mb-3 font-mono">TRENDING</p>
          <div className="flex flex-col gap-2">
            {trendingItems.map(t => (
              <Link
                key={t}
                to="/categories"
                className="flex items-center gap-3 text-[var(--text-muted)] hover:text-[var(--primary)] text-[14px] font-bold transition-all no-underline px-4 py-2 rounded-lg hover:bg-[var(--bg-elevated)] group font-bn"
              >
                <TrendingUp className="w-3.5 h-3.5 shrink-0 text-[var(--text-dim)] group-hover:text-[var(--primary)] transition-colors" />
                {t}
              </Link>
            ))}
          </div>
        </div>

        {/* ── Bottom branding ── */}
        <div className="mt-auto pt-4 border-t border-[var(--bg-border)] mx-1">
          <div className="circuit-line mb-3" />
          <p className="text-[10px] text-[var(--text-muted)] font-bn text-center leading-relaxed px-2 font-semibold">
            বাংলাদেশের SSC ও HSC শিক্ষার্থীদের জন্য তৈরি ❤️
          </p>
        </div>
      </nav>
    </div>
  );
}
