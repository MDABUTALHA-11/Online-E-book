import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, PlaySquare, FlaskConical, BookOpen, Calculator,
  Leaf, GraduationCap, Star, TrendingUp, Download, Eye, PenTool,
  Quote, Heart, Award, Video, Clock
} from 'lucide-react';
import usePageSEO from '../hooks/usePageSEO';
import { useViewCount } from '../hooks/useViewCount';
import GoogleAd from '../components/GoogleAd';

// Custom Assets
import BannerImg from '../assets/banner.png';
import CollaborationImg from '../assets/collaboration.png';
import ScienceBg from '../assets/science_bg.png';

/* ─── hero photos (Local Assets) ─── */
const heroPhotos = [BannerImg, CollaborationImg, ScienceBg];

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
  { label:'Higher Math Handnote',  color:'var(--bg-surface)', border:'#22C55E30', icon:Calculator, path:'/subject/science' },
  { label:'Physics Handnote',       color:'var(--bg-surface)', border:'#22C55E30', icon:FlaskConical, path:'/subject/science' },
  { label:'Chemistry Handnote',     color:'var(--bg-surface)', border:'#22C55E30', icon:Leaf,       path:'/subject/science' },
  { label:'Biology Handnote',       color:'var(--bg-surface)', border:'#22C55E30', icon:BookOpen,   path:'/subject/science' },
];

const filters = ['SSC','HSC','Science','Arts','Commerce'];

/* ─── NoteCard ─── */
function NoteCard({ note, outline = false }) {
  return (
    <Link
      to={note.path}
      className="flex flex-col gap-2.5 p-3 sm:p-5 rounded-2xl no-underline group transition-all duration-300"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--bg-border)',
      }}
      onMouseEnter={e => { e.currentTarget.style.border = '1px solid rgba(34,197,94,0.35)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(34,197,94,0.08)'; }}
      onMouseLeave={e => { e.currentTarget.style.border = '1px solid var(--bg-border)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1 h-8 sm:w-1.5 sm:h-10 rounded-full bg-[#22C55E] group-hover:h-12 transition-all duration-300" />
        <div>
          <h3 className="text-white font-black text-[15px] sm:text-[22px] group-hover:text-[#22C55E] transition-colors leading-none italic font-bn">{note.subject}</h3>
          <p className="text-[#22C55E] text-[10px] sm:text-[13px] font-bold mt-0.5 sm:mt-1 font-bn opacity-80">{note.subjectBn}</p>
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
          ? { background: 'var(--bg-elevated)', border: '1.5px solid var(--bg-border)' }
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
    <div className="flex justify-between items-end mb-8">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 rounded-2xl bg-[#22C55E10] border border-[#22C55E20] flex items-center justify-center">
            <Icon className="w-7 h-7 text-[#22C55E]" />
          </div>
        )}
        <div>
          <h2 className="text-white font-bn font-black text-[28px] md:text-[36px] italic tracking-tighter leading-none">{title}</h2>
          <div className="w-12 h-1 bg-[#22C55E] mt-2 rounded-full opacity-50" />
        </div>
      </div>
      <Link to="/categories" className="flex items-center gap-1.5 text-[#22C55E] text-[14px] font-black no-underline hover:underline italic bg-[#22C55E10] px-4 py-2 rounded-xl border border-[#22C55E15] transition-all hover:bg-[#22C55E20]">
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
        style={{ background: 'var(--bg-surface)', minHeight: '280px', border: '1px solid var(--bg-border)' }}
      >
        {/* Right photo */}
        <div className="absolute right-0 top-0 bottom-0 w-[55%] z-0">
          <img
            src={BannerImg}
            alt="Shaifly Academic Library"
            className="w-full h-full object-cover object-center"
          />
          {/* Gradient overlay for text legibility */}
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, var(--bg-surface) 35%, rgba(8,20,12,0.4) 70%, transparent)' }}
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
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}
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
              style={{ background: 'var(--bg-elevated)', border: '1.5px solid var(--bg-border)', color: '#22C55E' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#22C55E'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bg-border)'}
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
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {subjectCards.map((sc, index) => (
            <Link
              key={sc.label}
              to={sc.path}
              className="flex flex-col gap-3 p-4 rounded-2xl no-underline group transition-all duration-300 hover:-translate-y-2 animate-float"
              style={{ 
                background: sc.color, 
                border: `1px solid ${sc.border}`,
                animationDelay: `${index * 0.2}s` 
              }}
              onMouseEnter={e => {
                e.currentTarget.style.border = '1px solid rgba(34,197,94,0.4)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(34,197,94,0.15)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.border = `1px solid ${sc.border}`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}
              >
                <sc.icon className="w-6 h-6 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-white font-black text-[14px] leading-snug group-hover:text-[#22C55E] transition-colors">{sc.label}</p>
                <p className="text-[#22C55E] text-[9px] font-black mt-1 uppercase tracking-widest opacity-60">Verified Library</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══ APPOINTMENT CTA ══ */}
      <div 
        className="mb-12 p-8 md:p-12 rounded-[2.5rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 group cursor-pointer shadow-xl transition-all hover:scale-[1.01]"
        style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
        onClick={() => navigate('/appointment')}
      >
        <div className="absolute right-0 top-0 w-64 h-full bg-[#22C55E]/5 blur-3xl pointer-events-none" />
        <div className="flex-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[10px] font-black uppercase tracking-widest mb-6 font-en">
            <Video className="w-3.5 h-3.5" /> 1-on-1 Live Support
          </div>
          <h2 className="text-white font-bn font-black text-[32px] md:text-[44px] italic mb-4 leading-tight">
            পরীক্ষার আগের রাতে কোনো পড়া <span className="text-[#22C55E]">বুঝতে সমস্যা?</span>
          </h2>
          <p className="text-slate-400 font-bn text-[18px] md:text-[20px] leading-relaxed italic max-w-2xl">
            আমাদের বিশেষজ্ঞ শিক্ষকদের কাছ থেকে সরাসরি জুম ভিডিও কলের মাধ্যমে আপনার যেকোনো জটিল টপিক বুঝে নিন।
          </p>
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#22C55E]" />
              <span className="text-white font-black font-bn italic text-[17px]">৩০ মিনিট সেশন</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#22C55E] font-black font-bn italic text-[17px]">ফি মাত্র ৳৯৯</span>
            </div>
          </div>
        </div>
        <div className="shrink-0 relative z-10">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-[#22C55E] shadow-lg shadow-[#22C55E]/20 flex items-center justify-center text-white transition-transform group-hover:scale-110 group-hover:rotate-6">
            <ArrowRight className="w-8 h-8 md:w-10 md:h-10" />
          </div>
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
            <div className="col-span-full py-12 text-center text-slate-500 font-bn text-xl italic bg-[var(--bg-surface)] rounded-2xl border border-dashed border-[var(--bg-border)]">
              এই ক্যাটাগরিতে বর্তমানে কোনো নোট নেই। শীঘ্রই আসছে...
            </div>
          )}
        </div>
      </div>

      {/* ══ TRENDING ══ */}
      <div className="mb-9">
        <SectionHeader title="Trending This Week" icon={Star} />
        <div 
          className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 p-4 rounded-3xl relative overflow-hidden"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
        >
          {/* Background Illustration */}
          <img 
            src={ScienceBg} 
            alt="Science Background" 
            className="absolute -right-20 -bottom-20 w-80 h-80 opacity-5 pointer-events-none transform rotate-12"
          />
          
          {trendingNotes.map(n => <NoteCard key={n.id} note={n} outline />)}
        </div>
      </div>

      {/* ══ WHY SHAIFLY SECTION (ADSENSE FRIENDLY TEXT) ══ */}
      <div className="mb-12 p-8 md:p-12 rounded-[2.5rem]" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
        <div className="max-w-4xl">
          <h2 className="text-white font-bn font-black text-[32px] md:text-[44px] italic mb-6 leading-tight">
            বাংলাদেশের শিক্ষার্থীদের জন্য <span className="text-[#22C55E]">সেরা ডিজিটাল লাইব্রেরি</span> কেন শাইফলি?
          </h2>
          <div className="space-y-6 text-slate-400 font-bn text-[17px] md:text-[19px] leading-relaxed italic">
            <p>
              শাইফলি (Shaifly) শুধুমাত্র একটি ওয়েবসাইট নয়, এটি একটি পূর্ণাঙ্গ একাডেমিক সমাধান। বাংলাদেশের বর্তমান প্রতিযোগিতামূলক শিক্ষা ব্যবস্থায় SSC এবং HSC শিক্ষার্থীদের জন্য মানসম্মত নোট এবং গাইড খুঁজে পাওয়া অনেক সময় ব্যয়বহুল এবং কষ্টসাধ্য হয়ে পড়ে। আমরা সেই সমস্যার সমাধান নিয়ে এসেছি। আমাদের লাইব্রেরিতে আপনি পাবেন অভিজ্ঞ শিক্ষকদের দ্বারা তৈরি পদার্থবিজ্ঞান, রসায়ন, উচ্চতর গণিত এবং জীববিজ্ঞানের হ্যান্ডনোট।
            </p>
            <p>
              আমাদের প্রতিটি কন্টেন্ট এমনভাবে সাজানো হয়েছে যেন শিক্ষার্থীরা জটিল বিষয়গুলো সহজেই বুঝতে পারে। বিশেষ করে বিজ্ঞানের কঠিন সব গাণিতিক সমস্যা এবং থিওরিগুলো আমরা সহজ ভাষায় ব্যাখ্যা করার চেষ্টা করেছি। আপনি যদি একজন SSC পরীক্ষার্থী হন কিংবা HSC-তে নিজের ভিত্তি মজবুত করতে চান, তবে শাইফলির রিসোর্সগুলো আপনার জন্য অপরিহার্য। 
            </p>
            <p>
              এছাড়া আমাদের লিডারবোর্ড ভিত্তিক কুইজ সিস্টেম শিক্ষার্থীদের নিজেদের অবস্থান যাচাই করতে সাহায্য করে। আমরা বিশ্বাস করি, শিক্ষার আলো সবার জন্য উন্মুক্ত হওয়া উচিত। তাই আমাদের অধিকাংশ রিসোর্স একদম বিনামূল্যে পাওয়া যাচ্ছে। শাইফলির সাথে আপনার একাডেমিক যাত্রা হোক আনন্দদায়ক এবং সফল।
            </p>
          </div>
        </div>
      </div>

      {/* Ad Unit */}
      <div className="mb-9">
        <GoogleAd slot="2280555349" />
      </div>

      {/* ══ FAQ SECTION ══ */}
      <div className="mb-16">
        <SectionHeader title="Academic FAQs" icon={PenTool} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
            <h3 className="text-white font-black font-bn text-xl mb-3 italic">১. শাইফলির নোটগুলো কি বোর্ডের নতুন সিলেবাস অনুযায়ী?</h3>
            <p className="text-slate-500 font-bn italic">হ্যাঁ, আমাদের সকল হ্যান্ডনোট এবং কুইজ বর্তমান শিক্ষা বোর্ড কর্তৃক প্রণীত সর্বশেষ সিলেবাস অনুসরণ করে তৈরি করা হয়েছে। প্রতি বছর আমরা নোটগুলো আপডেট করি।</p>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
            <h3 className="text-white font-black font-bn text-xl mb-3 italic">২. আমি কি নোটগুলো মোবাইল থেকে পড়তে পারব?</h3>
            <p className="text-slate-500 font-bn italic">অবশ্যই! শাইফলি সম্পূর্ণ মোবাইল ফ্রেন্ডলি। আপনি যেকোনো স্মার্টফোন থেকে যেকোনো সময় আমাদের নোটগুলো পড়তে এবং প্রয়োজনে ডাউনলোড করতে পারবেন।</p>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
            <h3 className="text-white font-black font-bn text-xl mb-3 italic">৩. কুইজে অংশ নেওয়ার জন্য কি কোনো ফি দিতে হবে?</h3>
            <p className="text-slate-500 font-bn italic">না, শাইফলির সাধারণ কুইজ সেকশন সবার জন্য উন্মুক্ত। নিজের প্রোফাইল তৈরি করে আপনি লিডারবোর্ডে অংশ নিতে পারবেন একদম বিনামূল্যে।</p>
          </div>
          <div className="p-6 rounded-2xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
            <h3 className="text-white font-black font-bn text-xl mb-3 italic">৪. শাইফলির ভিআইপি মেম্বারশিপের সুবিধা কী?</h3>
            <p className="text-slate-500 font-bn italic">ভিআইপি মেম্বাররা সকল বিষয়ের এক্সক্লুসিভ প্রিমিয়াম হ্যান্ডনোট, ভিডিও গাইড এবং পরীক্ষার আগে বিশেষ সাজেশন পেয়ে থাকেন।</p>
          </div>
        </div>
      </div>

      {/* ══ TESTIMONIALS SECTION ══ */}
      <div className="mb-16">
        <SectionHeader title="Success Stories" icon={Award} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Sabbir Ahmed', school: 'Dhaka College', text: 'শাইফলির নোটগুলো আমার ফিজিক্সের ভীতি দূর করে দিয়েছে। বিশেষ করে চিত্রগুলো খুব সুন্দর।' },
            { name: 'Nusrat Jahan', school: 'Viqarunnisa Noon', text: 'কুইজ সেকশনটা আমার সবচেয়ে প্রিয়! লিডারবোর্ডে নাম দেখতে পাওয়ার আনন্দই আলাদা।' },
            { name: 'Rakibul Islam', school: 'Chittagong College', text: 'বিনামূল্যে এত ভালো হ্যান্ডনোট পাবো কখনো ভাবিনি। ধন্যবাদ টিম শাইফলি!' }
          ].map((t, i) => (
            <div key={i} className="p-8 rounded-[2rem] relative overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
              <Quote className="absolute -right-2 -bottom-2 w-20 h-20 text-[#22C55E]/5 rotate-12" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[#22C55E] text-[#22C55E]" />)}
              </div>
              <p className="text-slate-400 font-bn text-[16px] leading-relaxed italic mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E] font-black text-xs uppercase">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-white font-black font-bn text-[15px] leading-none">{t.name}</h4>
                  <p className="text-[#22C55E] text-[10px] font-bold mt-1 uppercase tracking-tighter opacity-70">{t.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PROFILE CTA BANNER ══════════════════════ */}
      <div
        className="rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #22C55E, #16a34a)', boxShadow: '0 10px 40px rgba(34,197,94,0.25)' }}
      >
        <div className="absolute right-0 top-0 w-64 h-full opacity-20 overflow-hidden">
          <img 
            src={CollaborationImg} 
            alt="Collaboration" 
            className="w-full h-full object-cover transform scale-125 translate-x-10 translate-y-4"
            style={{ filter: 'grayscale(1) brightness(2)' }}
          />
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
