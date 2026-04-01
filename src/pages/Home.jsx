import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, PlaySquare, FlaskConical, BookOpen, Calculator,
  Leaf, GraduationCap, Star, TrendingUp, Download, Eye
} from 'lucide-react';
import usePageSEO from '../hooks/usePageSEO';
import { useViewCount } from '../hooks/useViewCount';

/* ─── hero photos (Unsplash) ─── */
const heroPhotos = [
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1571260898664-425eee4c7efc?q=80&w=1400&auto=format&fit=crop',
];

/* ─── note data ─── */
const trendingNotes = [
  { id:5, subject:'Premium Bundle', subjectBn:'প্রিমিয়াম', desc:'সকল বিষয়ের প্রিমিয়াম হ্যান্ডনোট একটি প্যাকেজে', path:'/subject/ssc', category: 'SSC' },
  { id:6, subject:'Biology',        subjectBn:'জীববিজ্ঞান',  desc:'চিত্রসহ কোর্স ম্যাটেরিয়াল ও বিস্তারিত ব্যাখ্যা', path:'/subject/science', category: 'Science' },
  { id:7, subject:'Higher Math',    subjectBn:'উচ্চতর গণিত', desc:'শর্ট সিলেবাস কমপ্লিট সল্যুশন ও প্র্যাকটিস সেট', path:'/subject/science', category: 'HSC' },
  { id:8, subject:'English',        subjectBn:'ইংরেজি',       desc:'গ্র্যামার শর্টকাট ও রাইটিং স্পেশাল ট্রিকস', path:'/subject/ssc', category: 'SSC' },
];

const popularNotes = [
  { id:1, subject:'Physics',   subjectBn:'পদার্থবিজ্ঞান', desc:'চিরায়ত বলবিদ্যা, নিউটনিয়ান বলবিদ্যা সহ সব অধ্যায়ের পূর্ণ নোট', path:'/subject/science', category: 'Science' },
  { id:2, subject:'Higher Math', subjectBn:'উচ্চতর গণিত', desc:'ত্রিকোণমিতি, ক্যালকুলাস ও ম্যাট্রিক্সের সম্পূর্ণ সমাধান', path:'/subject/science', category: 'HSC' },
  { id:3, subject:'Chemistry', subjectBn:'রসায়নবিজ্ঞান', desc:'জৈব রসায়ন, অজৈব ও পরিমাণগত রসায়নের সম্পূর্ণ গাইড', path:'/subject/science', category: 'Science' },
  { id:4, subject:'Biology',   subjectBn:'জীববিজ্ঞান', desc:'উদ্ভিদ শারীরতত্ত্ব, মানবদেহ ও জেনেটিক্সের বিস্তারিত নোট', path:'/subject/science', category: 'SSC' },
];

const subjectCards = [
  { label:'Higher Math Handnote',  color:'#0d1b2a', border:'#22C55E30', icon:Calculator, path:'/subject/science' },
  { label:'Physics Handnote',       color:'#0d1b2a', border:'#22C55E30', icon:FlaskConical, path:'/subject/science' },
  { label:'Chemistry Handnote',     color:'#0d1b2a', border:'#22C55E30', icon:Leaf,       path:'/subject/science' },
  { label:'Biology Handnote',       color:'#0d1b2a', border:'#22C55E30', icon:BookOpen,   path:'/subject/science' },
];

const filters = ['SSC','HSC','Science','Arts','Commerce'];

/* ─── NoteCard ─── */
function NoteCard({ note, outline = false }) {
  return (
    <Link
      to={note.path}
      className="flex flex-col gap-2.5 p-3 sm:p-5 rounded-2xl no-underline group transition-all duration-300"
      style={{
        background: '#0d1b2a',
        border: '1px solid #1e3a5f',
      }}
      onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(34,197,94,0.35)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(34,197,94,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.border = '1px solid #1e3a5f'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* green accent top line */}
      <div className="flex items-center gap-2">
        <div className="w-1 h-8 sm:w-1.5 sm:h-10 rounded-full bg-[#22C55E]" />
        <div>
          <h3 className="text-white font-black text-[15px] sm:text-[22px] group-hover:text-[#22C55E] transition-colors leading-none italic font-bn">{note.subject}</h3>
          <p className="text-[#22C55E] text-[10px] sm:text-[13px] font-bold mt-0.5 sm:mt-1 font-bn">{note.subjectBn}</p>
        </div>
      </div>
      <p className="text-[#94a3b8] text-[11px] sm:text-[15px] font-bn leading-snug italic font-bold line-clamp-2">{note.desc}</p>
      <button
        className={`w-full h-[34px] sm:h-[40px] rounded-xl font-black text-[10px] sm:text-[12.5px] flex items-center justify-center gap-1.5 transition-all duration-200 mt-auto
          ${outline
            ? 'text-[#64748b] hover:text-[#22C55E] hover:border-[#22C55E]'
            : 'text-white hover:-translate-y-0.5'
          }`}
        style={outline
          ? { background: '#112236', border: '1.5px solid #1e3a5f' }
          : { background: '#22C55E', boxShadow: '0 4px 16px rgba(34,197,94,0.25)' }
        }
      >
        {outline ? <><ChevronRight className="w-3 h-3" /> View Details</> : <><Download className="w-3 h-3" /> Download</>}
      </button>
    </Link>
  );
}

/* ─── SectionHeader ─── */
function SectionHeader({ title, icon: Icon }) {
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-7 h-7 text-[#22C55E]" />}
        <h2 className="text-white font-bn font-black text-[28px] md:text-[34px] italic tracking-tighter leading-none">{title}</h2>
      </div>
      <Link to="/categories" className="flex items-center gap-1.5 text-[#22C55E] text-[14px] font-black no-underline hover:underline italic">
        সব দেখুন <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Science');
  const { count: totalViews } = useViewCount('total_site_views', 'stats');

  usePageSEO({
    title: 'Shaifly — SSC & HSC একাডেমিক লাইব্রেরি',
    description: 'বাংলাদেশের SSC ও HSC শিক্ষার্থীদের জন্য সেরা একাডেমিক হ্যান্ডনোট, গাইড ও কুইজ।',
    keywords: 'SSC, HSC, Science, Handnote, Bangladesh Education, Shaifly',
  });

  return (
    <div style={{ color: '#f1f5f9' }}>

      {/* ══ HERO BANNER ══════════════════════════════ */}
      <div
        className="relative rounded-2xl overflow-hidden mb-7 flex items-center"
        style={{ background: '#0d1b2a', minHeight: '280px', border: '1px solid #1e3a5f' }}
      >
        {/* Right photo */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] z-0">
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1400&auto=format&fit=crop"
            alt="SSC HSC students Bangladesh"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient from left (#0d1b2a → transparent) */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, #0d1b2a 30%, rgba(13,27,42,0.6) 65%, transparent)' }}
          />
        </div>

        {/* Green glow blob top-right */}
        <div
          className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'rgba(34,197,94,0.08)', filter: 'blur(60px)' }}
        />

        {/* Content */}
        <div className="relative z-10 px-8 md:px-12 py-10 max-w-lg">
          {/* Badge */}
          <div
            className="flex items-center gap-4 mb-5"
          >
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              SSC · HSC · Bangladesh
            </div>
            
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)', color: '#3b82f6' }}
            >
              <Eye className="w-3.5 h-3.5" />
              {totalViews > 0 ? `${totalViews.toLocaleString()} Reads` : 'Loading...'}
            </div>
          </div>

          <h1 className="text-white font-bn font-black leading-[0.95] mb-6 italic tracking-tighter" style={{ fontSize: 'clamp(34px,6vw,68px)' }}>
            তোমার পরীক্ষার <span style={{ color: '#22C55E' }}>সেরা প্রস্তুতি</span><br />এখন এক জায়গায়!
          </h1>
          <p className="font-bn text-[18px] md:text-[20px] leading-relaxed mb-7 font-bold text-slate-400 italic">
            পদার্থ, রসায়ন, গণিত, জীববিজ্ঞান — সব বিষয়ের হ্যান্ডনোট সংগ্রহ করো এখনই।
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate('/categories')}
              className="flex items-center gap-2 font-black font-bn text-[15px] h-[48px] px-7 rounded-xl text-white transition-all hover:-translate-y-0.5"
              style={{ background: '#22C55E', boxShadow: '0 6px 20px rgba(34,197,94,0.35)' }}
              onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
              onMouseLeave={e => e.currentTarget.style.background = '#22C55E'}
            >
              <BookOpen className="w-4 h-4" /> নোট খুঁজুন
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="flex items-center gap-2 font-black text-[14px] h-[48px] px-6 rounded-xl transition-all"
              style={{ background: '#112236', border: '1.5px solid #1e3a5f', color: '#22C55E' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#22C55E'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1e3a5f'}
            >
              <Star className="w-4 h-4" /> কুইজ দাও
            </button>
          </div>
        </div>
      </div>

      {/* ══ FILTER BAR + QUIZ ════════════════════════ */}
      <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
        <div
          className="flex items-center gap-1.5 p-1.5 rounded-2xl flex-wrap"
          style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-5 py-2.5 rounded-xl font-black text-[13px] transition-all duration-300 uppercase tracking-wider font-en"
              style={activeFilter === f
                ? { background: '#22C55E', color: 'white', boxShadow: '0 4px 12px rgba(34,197,94,0.3)' }
                : { color: '#475569', background: 'transparent' }
              }
            >
              {f}
            </button>
          ))}
        </div>

        <button
          onClick={() => navigate('/quiz')}
          className="flex items-center gap-2 font-black text-[14px] h-[44px] px-6 rounded-2xl text-white transition-all hover:-translate-y-0.5 shrink-0 mt-3 md:mt-0 w-full md:w-auto justify-center"
          style={{ background: '#22C55E', boxShadow: '0 4px 16px rgba(34,197,94,0.28)' }}
          onMouseEnter={e => e.currentTarget.style.background = '#16a34a'}
          onMouseLeave={e => e.currentTarget.style.background = '#22C55E'}
        >
          <PlaySquare className="w-4 h-4 fill-white text-white" />
          Start Quiz
        </button>
      </div>

      {/* ══ SUBJECT SHORTCUTS ════════════════════════ */}
      <div className="mb-9">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-white font-black text-[20px] md:text-[22px] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#22C55E]" /> বিষয়ভিত্তিক নোট
          </h2>
          <Link to="/categories" className="text-[#22C55E] text-[12px] font-black no-underline hover:underline flex items-center gap-1">
            সব দেখুন <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {subjectCards.map(sc => (
            <Link
              key={sc.label}
              to={sc.path}
              className="flex flex-col gap-3 p-4 rounded-2xl no-underline group transition-all duration-300 hover:-translate-y-1"
              style={{ background: sc.color, border: `1px solid ${sc.border}` }}
              onMouseEnter={e => e.currentTarget.style.border = '1px solid rgba(34,197,94,0.4)'}
              onMouseLeave={e => e.currentTarget.style.border = `1px solid ${sc.border}`}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}
              >
                <sc.icon className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-white font-black text-[13px] leading-snug">{sc.label}</p>
                <p className="text-[#22C55E] text-[10px] font-black mt-1 uppercase tracking-widest opacity-70">Shaifly Official</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══ POPULAR NOTES ══ */}
      <div className="mb-9">
        <SectionHeader title={`${activeFilter} Popular Notes`} icon={TrendingUp} />
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {popularNotes.filter(n => n.category === activeFilter || activeFilter === 'Science').slice(0, 4).map(n => (
            <NoteCard key={n.id} note={n} />
          ))}
          {popularNotes.filter(n => n.category === activeFilter || activeFilter === 'Science').length === 0 && (
            <div className="col-span-full py-12 text-center text-slate-500 font-bn text-xl italic bg-[#0d1b2a] rounded-2xl border border-dashed border-[#1e3a5f]">
              এই ক্যাটাগরিতে বর্তমানে কোনো নোট নেই। শীঘ্রই আসছে...
            </div>
          )}
        </div>
      </div>

      {/* ══ TRENDING ══ */}
      <div className="mb-9">
        <SectionHeader title="Trending This Week" icon={Star} />
        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
          {trendingNotes.map(n => <NoteCard key={n.id} note={n} outline />)}
        </div>
      </div>

      {/* ══ PROFILE CTA BANNER ══════════════════════ */}
      <div
        className="rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #22C55E, #16a34a)', boxShadow: '0 10px 40px rgba(34,197,94,0.25)' }}
      >
        <div className="absolute right-0 top-0 w-48 h-full opacity-10">
          <GraduationCap className="w-full h-full text-white" />
        </div>
        <div className="relative z-10">
          <p className="text-white font-black text-[18px] md:text-[22px] font-bn mb-1">
            🎓 তোমার প্রোফাইল তৈরি করো — বিনামূল্যে!
          </p>
          <p className="text-white/80 text-[13.5px] font-bn">
            নোট সেভ করো, কুইজে অংশ নাও এবং Shaifly-র লিডারবোর্ডে তোমার নাম রাখো।
          </p>
        </div>
        <Link
          to="/subscription"
          className="bg-white font-black text-[14px] px-7 py-3.5 rounded-xl no-underline transition-all hover:bg-slate-50 shrink-0 relative z-10"
          style={{ color: '#16a34a' }}
        >
          এখনই যোগ দিন →
        </Link>
      </div>
    </div>
  );
}
