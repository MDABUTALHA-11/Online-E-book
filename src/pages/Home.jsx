import React, { useState } from 'react';
import { triggerConfetti } from '../lib/confetti';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, PlaySquare, FlaskConical, BookOpen, Calculator,
  Leaf, GraduationCap, Star, TrendingUp, Download, Eye, PenTool,
  Quote, Heart, Award, Video, Clock, ArrowRight, User, CheckCircle2, Zap, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import usePageSEO from '../hooks/usePageSEO';
import { useViewCount } from '../hooks/useViewCount';
import GoogleAd from '../components/GoogleAd';
import { bangla2ndQuestions } from '../data/bangla2ndQuestions';

// Custom Assets
import BannerImg from '../assets/banner.png';
import CollaborationImg from '../assets/collaboration.png';
import ScienceBg from '../assets/science_bg.png';
import SmartStudentImg from '../assets/smart_student.png';
import StudentsGroupImg from '../assets/students_group.png';
import VideoMockupImg from '../assets/video_mockup.png';

/* ─── hero photos (Local Assets) ─── */
const heroPhotos = [BannerImg, CollaborationImg, ScienceBg];

/* ─── note data ─── */
const trendingNotes = [
  { id:5, subject:'Premium Bundle', subjectBn:'প্রিমিয়াম বান্ডেল', desc:'সকল বিষয়ের প্রিমিয়াম হ্যান্ডনোট একটি প্যাকেজে', path:'/subject/science',     category: 'SSC',     accentColor: '#00F0FF', image: '/Book-Image/trend_bundle_realworld.png' },
  { id:6, subject:'Biology',        subjectBn:'জীববিজ্ঞান',         desc:'চিত্রসহ курс ম্যাটেরিয়াল ও বিস্তারিত ব্যাখ্যা',           path:'/subject/biology',     category: 'Science',  accentColor: '#00FF88', image: '/Book-Image/trend_biology_realworld.png' },
  { id:7, subject:'Higher Math',    subjectBn:'উচ্চতর গণিত',        desc:'শর্ট সিলেবাস কমপ্লিট সল্যুশন ও প্র্যাকটিস সেট',             path:'/subject/higher-math', category: 'HSC',      accentColor: '#8B5CF6', image: '/Book-Image/trend_math_realworld.png' },
  { id:8, subject:'English',        subjectBn:'ইংরেজি',              desc:'গ্র্যামার শর্টকাট ও রাইটিং স্পেশাল ট্রিকস',                  path:'/subject/science',     category: 'SSC',      accentColor: '#FF3D71', image: '/Book-Image/trend_english_realworld.png' },
];

const popularNotes = [
  { id:1, subject:'Physics',     subjectBn:'পদার্থবিজ্ঞান', desc:'চিরায়ত বলবিদ্যা, নিউটনিয়ান বলবিদ্যা সহ সব অধ্যায়ের নোট', path:'/subject/physics',     category: 'Science', accentColor: '#F97316', image: '/Book-Image/pop_physics_realworld.png' },
  { id:2, subject:'Higher Math', subjectBn:'উচ্চতর গণিত',  desc:'ত্রিকোণমিতি, ক্যালকুলাস ও ম্যাট্রিক্সের সম্পূর্ণ সমাধান',     path:'/subject/higher-math', category: 'HSC',     accentColor: '#8B5CF6', image: '/Book-Image/pop_math_realworld.png' },
  { id:3, subject:'Chemistry',   subjectBn:'রসায়নবিজ্ঞান',  desc:'জৈব রসায়ন, অজৈব ও পরিমাণগত রসায়নের সম্পূর্ণ গাইড',           path:'/subject/chemistry',   category: 'Science', accentColor: '#8B5CF6', image: '/Book-Image/pop_chemistry_realworld.png' },
  { id:4, subject:'Biology',     subjectBn:'জীববিজ্ঞান',   desc:'উদ্ভিদ শারীরতত্ত্ব, মানবদেহ ও জেনেটিক্সের বিস্তারিত নোট',    path:'/subject/biology',     category: 'SSC',     accentColor: '#00FF88', image: '/Book-Image/pop_biology_realworld.png' },
];

const subjectCards = [
  { label:'Higher Math Handnote', labelBn:'উচ্চতর গণিত', desc:'ত্রিকোণমিতি, ক্যালকুলাস ও ম্যাট্রিক্সের সম্পূর্ণ সমাধান', border:'#8B5CF6', icon:Calculator, path:'/subject/higher-math', image: '/Book-Image/higher_math_brush_cover.png' },
  { label:'Physics Handnote',     labelBn:'পদার্থবিজ্ঞান',   desc:'নিউটনিয়ান বলবিদ্যা ও আধুনিক পদার্থবিজ্ঞানের পূর্ণ নোট', border:'#00F0FF', icon:FlaskConical, path:'/subject/physics',     image: '/Book-Image/physics_brush_cover.png' },
  { label:'Chemistry Handnote',   labelBn:'রসায়নবিজ্ঞান',   desc:'জৈব, অজৈব ও পরিমাণগত রসায়নের সম্পূর্ণ গাইড',           border:'#8B5CF6', icon:Leaf,         path:'/subject/chemistry',  image: '/Book-Image/chemistry_brush_cover.png' },
  { label:'Biology Handnote',     labelBn:'জীববিজ্ঞান',      desc:'উদ্ভিদ শারীরতত্ত্ব, মানবদেহ ও জেনেটিক্সের বিস্তারিত নোট', border:'#00FF88', icon:BookOpen,     path:'/subject/biology',    image: '/Book-Image/biology_brush_cover.png' },
];

const filters = ['SSC','HSC','Science','Arts','Commerce'];

/* ─── NoteCard ─── */
function NoteCard({ note, outline = false, index = 0 }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.div
      variants={{
        hidden:  { opacity: 0, y: 28, scale: 0.97 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.4,0,0.2,1], delay: index * 0.1 } },
      }}
      whileHover={{ y: -8, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        boxShadow: hovered
          ? '0 0 25px rgba(0, 240, 255, 0.18), 0 0 0 2px rgba(0, 240, 255, 0.35)'
          : '0 2px 12px rgba(0, 0, 0, 0.15)',
        borderColor: hovered ? 'var(--primary)' : undefined,
        transition: 'box-shadow 0.4s cubic-bezier(0.4,0,0.2,1), border-color 0.4s cubic-bezier(0.4,0,0.2,1)',
        borderRadius: '8px',
        overflow: 'hidden',
      }}
    >
    <Link
      to={note.path}
      className="vintage-card group no-underline relative flex flex-col"
      style={{ margin: 0, boxShadow: 'none', borderRadius: 0, border: 'none' }}
    >
      {/* HUD borders */}
      <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-[var(--primary)] opacity-30 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-[var(--primary)] opacity-30 group-hover:opacity-100 transition-opacity" />

      <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-md border border-[var(--bg-border)] bg-[var(--bg-elevated)]">
        {note.image ? (
          <img 
            src={note.image} 
            alt={note.subject} 
            className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110" 
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-[var(--text-dim)] opacity-20">
             <BookOpen className="w-16 h-16" />
          </div>
        )}
        <div className="pdf-label font-mono">PREVIEW</div>
        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-wider text-white shadow-lg font-mono ${
          note.category === 'SSC' ? 'bg-gradient-ssc' : 'bg-gradient-hsc'
        }`}>
          {note.category}
        </div>
        {/* Quick Preview reveal on hover */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.22, ease: [0,0,0.2,1] }}
              className="absolute inset-0 flex items-center justify-center"
              style={{ background: 'rgba(10,14,26,0.7)', backdropFilter: 'blur(4px)' }}
            >
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[#0A0E1A] font-bold text-[11px] uppercase tracking-wider font-mono bg-[var(--primary)] border border-[var(--primary)]">
                <Eye className="w-3.5 h-3.5" /> Quick Preview
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full text-center flex flex-col h-full px-2 pb-2">
        <div className="flex items-center justify-center gap-1 mb-2">
          <CheckCircle2 className="w-3 h-3 text-[var(--primary)]" />
          <span className="text-[var(--primary)] text-[9px] font-bold uppercase tracking-wider font-mono">Verified Content</span>
        </div>
        <h3 className="text-[var(--text-primary)] font-bold text-[15px] sm:text-[18px] font-bn leading-tight mb-1 group-hover:text-[var(--primary)] transition-colors">{note.subject}</h3>
        <p className="text-[var(--text-muted)] text-[10px] sm:text-[12px] font-semibold bg-[var(--bg-elevated)] px-3 py-0.5 rounded-sm mb-4 truncate font-bn">{note.desc}</p>
        <div className="mt-auto">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full flex items-center justify-center gap-1.5 h-9 rounded-lg text-[#0A0E1A] text-[11px] sm:text-[12px] font-bold transition-all"
            style={{ background: 'var(--accent)', boxShadow: '0 4px 10px rgba(0, 255, 136, 0.15)' }}
          >
             {outline ? <><ChevronRight className="w-3.5 h-3.5" /> Details</> : <><BookOpen className="w-3.5 h-3.5" /> নোট দেখুন</>}
          </motion.button>
        </div>
      </div>
    </Link>
    </motion.div>
  );
}

/* ─── SectionHeader ─── */
function SectionHeader({ title, icon: Icon, colorClass = "text-white" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className="flex justify-between items-center mb-10 border-b border-[var(--bg-border)] pb-4"
    >
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-12 h-12 rounded-lg bg-[var(--primary)]/10 border border-[var(--primary)]/30 flex items-center justify-center shadow-md">
            <Icon className={`w-6 h-6 text-[var(--primary)]`} />
          </div>
        )}
        <div>
          <h2 className="font-headings font-black text-[22px] md:text-[30px] leading-none text-[var(--text-primary)]">{title}</h2>
          <p className="text-[var(--text-dim)] text-[9px] font-bold uppercase tracking-[0.2em] mt-1 font-mono">Verified Academic Content</p>
        </div>
      </div>
      <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
        <Link to="/categories" className="bg-[var(--bg-surface)] px-4 py-2 rounded-lg border border-[var(--bg-border)] text-[var(--text-primary)] font-bold text-[13px] flex items-center gap-2 hover:bg-[var(--bg-elevated)] transition-all no-underline shadow-sm font-mono">
          ALL <ChevronRight className="w-4 h-4 text-[var(--primary)]" />
        </Link>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Science');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    setMousePos({
      x: (clientX / innerWidth) - 0.5,
      y: (clientY / innerHeight) - 0.5
    });
  };

  // Temporary Quiz Logic
  const [quizPhase, setQuizPhase] = useState('idle'); // idle, registering, playing, result
  const [regData, setRegData] = useState({ name: '', school: '' });
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [quizTimeLeft, setQuizTimeLeft] = useState(30 * 60);
  const [liveTimeLeft, setLiveTimeLeft] = useState('');
  const quizTimerRef = React.useRef(null);

  // Live Countdown (2 days window)
  React.useEffect(() => {
    const targetDate = new Date('2026-04-23T16:32:00').getTime();
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      if (distance < 0) {
        setLiveTimeLeft('Ended');
        clearInterval(timer);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        setLiveTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Quiz Timer
  React.useEffect(() => {
    if (quizPhase === 'playing') {
      quizTimerRef.current = setInterval(() => {
        setQuizTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(quizTimerRef.current);
            setQuizPhase('result');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(quizTimerRef.current);
    }
    return () => clearInterval(quizTimerRef.current);
  }, [quizPhase]);

  const formatQuizTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStartQuiz = () => {
    if (regData.name && regData.school) {
      setQuizPhase('playing');
    } else {
      alert('অনুগ্রহ করে নাম এবং স্কুলের নাম লিখুন।');
    }
  };

  const calculateScore = () => {
    let score = 0;
    bangla2ndQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) score++;
    });
    return score;
  };

  usePageSEO({
    title: 'Shaifly - Handnote SSC & Note SSC academic Library',
    description: 'বাংলাদেশের SSC ও HSC শিক্ষার্থীদের জন্য সেরা একাডেমিক হ্যান্ডনোট, গাইড ও কুইজ। Specializing in Handnote SSC and Note SSC online reading.',
    keywords: 'handnote ssc, note ssc, ssc science notes, hsc library, shaifly, ssc guide pdf',
  });

  return (
    <div style={{ color: 'var(--text-primary)' }}>

      {/* ══ MOTIVATIONAL BANGLA TEXT (above video hero) ══════════ */}
      <div className="relative mb-0 overflow-hidden rounded-t-lg border border-[var(--bg-border)]" style={{ background: 'linear-gradient(135deg, var(--bg-surface) 0%, var(--bg-elevated) 100%)' }}>
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(0,240,255,0.03) 0%, transparent 60%), radial-gradient(circle at 80% 50%, rgba(139,92,246,0.03) 0%, transparent 60%)' }} />
        <div className="relative z-10 text-center py-8 px-4 md:px-12">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-sm mb-4 border border-[var(--primary)]/20" style={{ background: 'rgba(0,240,255,0.05)' }}>
            <span className="w-1.5 h-1.5 rounded-sm bg-[var(--primary)] animate-pulse" />
            <span className="text-[var(--primary)] text-[9px] font-bold uppercase tracking-[0.25em] font-mono">MOTIVATION</span>
          </div>
          <blockquote className="font-bn font-black leading-tight mb-3" style={{ fontSize: 'clamp(20px,4vw,40px)', background: 'linear-gradient(135deg, #ffffff 0%, var(--primary) 50%, var(--neon-violet) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
Dream big, work hard — success awaits you!
          </blockquote>
          <blockquote className="font-bn font-black leading-tight mb-4" style={{ fontSize: 'clamp(18px,4vw,34px)', color: 'var(--text-muted)' }}>
            "স্বপ্ন দেখো, পরিশ্রম করো — সাফল্য তোমারই অপেক্ষা করছে!"
          </blockquote>
        </div>
      </div>

      {/* ══ HERO BANNER — Video Background ══════════════════════ */}
      <div
        className="relative overflow-hidden mb-0 flex items-end border border-[var(--bg-border)] border-top-none"
        style={{ minHeight: '480px', borderRadius: '0 0 8px 8px' }}
      >
        {/* ── Video Background ── */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          style={{ filter: 'brightness(0.55) saturate(1.2)' }}
        >
          <source src="/Video/Sun_illuminates_moon_reflects_Earth_202605230116.mp4" type="video/mp4" />
        </video>

        {/* ── Cinematic gradient overlay ── */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(to top, rgba(10,14,26,0.95) 0%, rgba(10,14,26,0.6) 40%, rgba(10,14,26,0.15) 70%, transparent 100%)' }}
        />
        {/* Side vignette for text area */}
        <div
          className="absolute inset-0 z-[1]"
          style={{ background: 'linear-gradient(to right, rgba(10,14,26,0.8) 0%, rgba(10,14,26,0.3) 55%, transparent 100%)' }}
        />

        {/* ── Green glow accent ── */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none z-[1]"
          style={{ background: 'rgba(0,240,255,0.04)', filter: 'blur(80px)' }} />

        {/* ── Hero Content ── */}
        <div className="relative z-10 px-8 md:px-14 py-12 max-w-2xl w-full">
          {/* Badge */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest font-mono"
              style={{ background: 'rgba(0,240,255,0.08)', border: '1px solid rgba(0,240,255,0.2)', color: 'var(--primary)' }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              SSC · HSC · Bangladesh
            </div>
          </div>

          <h1 className="text-white font-bn font-black leading-[1.05] mb-5 tracking-wide drop-shadow-lg" style={{ fontSize: 'clamp(32px,5vw,60px)', textShadow: '0 2px 20px rgba(0,0,0,0.8)' }}>
            তোমার পরীক্ষার <span className="text-[var(--primary)]">সেরা প্রস্তুতি</span><br />এখন এক জায়গায়!
          </h1>
          <p className="font-bn text-[16px] md:text-[18px] leading-relaxed mb-7 font-bold text-slate-300" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
            পদার্থ, রসায়ন, গণিত, জীববিজ্ঞান — সব বিষয়ের হ্যান্ডনোট সংগ্রহ করো এখনই।
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => navigate('/categories')}
              className="flex items-center gap-2 font-bold font-bn text-[14px] h-[44px] px-6 rounded-lg text-[#0A0E1A] transition-all hover:scale-102"
              style={{ background: 'var(--primary)', boxShadow: '0 4px 12px rgba(0,240,255,0.3)' }}
            >
              <BookOpen className="w-4 h-4" /> নোট খুঁজুন
            </button>
            <button
              onClick={() => navigate('/quiz')}
              className="flex items-center gap-2 font-bold text-[13px] h-[44px] px-5 rounded-lg transition-all hover:scale-102"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--primary)', color: 'var(--primary)', backdropFilter: 'blur(10px)' }}
            >
              <Star className="w-4 h-4" /> কুইজ দাও
            </button>
          </div>
        </div>
      </div>

      {/* ══ LIVE TEMPORARY QUIZ SECTION ══════════════════════ */}
      {liveTimeLeft !== 'Ended' && (
        <div className="relative mt-8 mb-12 group">
          <div 
            className="relative rounded-lg p-8 md:p-12 overflow-hidden border border-[var(--neon-pink)]/20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,61,113,0.04) 0%, var(--bg-surface) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 10px 30px rgba(255,61,113,0.08)',
            }}
          >
            {/* Background Effects */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF3D71]/5 blur-[80px] rounded-lg pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#8B5CF6]/5 blur-[80px] rounded-lg pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
              {/* Left Side: Info & Countdown */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm mb-6 border border-[#FF3D71]/30 bg-[#FF3D71]/10 font-mono">
                  <span className="w-2 h-2 rounded-sm bg-[#FF3D71] animate-ping" />
                  <span className="text-[#FF3D71] text-[9px] font-bold uppercase tracking-[0.2em]">Live Special Event</span>
                </div>
                
                <h2 className="text-white font-bn font-black text-[30px] md:text-[38px] leading-tight mb-4">
                  SSC বাংলা ২য় পত্র <br />
                  <span className="text-[#FF3D71] tracking-tighter">স্পেশাল লাইভ কুইজ!</span>
                </h2>
                
                <p className="text-[var(--text-muted)] font-bn text-[15px] md:text-[17px] max-w-lg mx-auto md:mx-0 mb-8 font-semibold">
                  আগামীকালকের পরীক্ষার চূড়ান্ত প্রস্তুতির জন্য ৩০টি গুরুত্বপূর্ণ প্রশ্নের পরীক্ষা দাও এখনই।
                </p>

                <div className="flex flex-col gap-4 items-center md:items-start">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--bg-border)]">
                    <Clock className="w-5 h-5 text-[#FF3D71]" />
                    <div>
                      <div className="text-[var(--text-dim)] text-[9px] font-bold uppercase tracking-wider leading-none mb-1 font-mono">Time Remaining to Participate</div>
                      <div className="text-[var(--text-primary)] font-bold text-lg font-mono">{liveTimeLeft}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Interactive Quiz Area */}
              <div className="w-full md:w-[420px] min-h-[300px] flex flex-col">
                <AnimatePresence mode="wait">
                  {quizPhase === 'idle' && (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-[var(--bg-elevated)] p-8 rounded-lg border border-[var(--bg-border)] backdrop-blur-xl h-full flex flex-col items-center justify-center text-center"
                    >
                      <Zap className="w-12 h-12 text-[#FF3D71] mb-6 animate-pulse" />
                      <h3 className="text-[var(--text-primary)] font-bold font-bn text-xl mb-4">আপনি কি প্রস্তুত?</h3>
                      <p className="text-[var(--text-muted)] font-bn text-[14px] mb-8 font-semibold">৩০ মিনিটে ৩০টি প্রশ্নের সঠিক উত্তর দিতে হবে।</p>
                      <button 
                        onClick={() => setQuizPhase('registering')}
                        className="w-full py-3.5 rounded-lg bg-[#FF3D71] text-white font-bold font-bn text-md shadow-lg shadow-[#FF3D71]/20 transition-all hover:scale-[1.02]"
                      >
                        কুইজ শুরু করুন
                      </button>
                    </motion.div>
                  )}

                  {quizPhase === 'registering' && (
                    <motion.div 
                      key="registering"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="bg-[var(--bg-elevated)] p-8 rounded-lg border border-[var(--bg-border)] backdrop-blur-xl h-full"
                    >
                      <h3 className="text-[var(--text-primary)] font-bold font-bn text-lg mb-6 border-l-4 border-[#FF3D71] pl-3">আপনার তথ্য দিন</h3>
                      <div className="space-y-4 mb-8">
                        <div>
                          <label className="block text-[var(--text-dim)] font-bn text-[10px] mb-2 font-bold uppercase tracking-wider font-mono">আপনার নাম</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF3D71]" />
                            <input 
                              type="text" 
                              placeholder="সম্পূর্ণ নাম লিখুন"
                              className="w-full bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-lg py-3 pl-12 pr-4 text-[var(--text-primary)] font-bn focus:outline-none focus:border-[#FF3D71]/50 transition-all font-semibold placeholder:opacity-30"
                              value={regData.name}
                              onChange={(e) => setRegData({...regData, name: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-[var(--text-dim)] font-bn text-[10px] mb-2 font-bold uppercase tracking-wider font-mono">স্কুল/মাদ্রাসার নাম</label>
                          <div className="relative">
                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--primary)]" />
                            <input 
                              type="text" 
                              placeholder="প্রতিষ্ঠানের নাম লিখুন"
                              className="w-full bg-[var(--bg-surface)] border border-[var(--bg-border)] rounded-lg py-3 pl-12 pr-4 text-[var(--text-primary)] font-bn focus:outline-none focus:border-[var(--primary)]/50 transition-all font-semibold placeholder:opacity-30"
                              value={regData.school}
                              onChange={(e) => setRegData({...regData, school: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={handleStartQuiz}
                        className="w-full py-3.5 rounded-lg bg-gradient-to-r from-[#FF3D71] to-[#6A5AE0] text-white font-bold font-bn text-md shadow-xl transition-all hover:scale-[1.01]"
                      >
                         পরীক্ষা শুরু করুন <ArrowRight className="inline w-5 h-5 ml-2" />
                      </button>
                    </motion.div>
                  )}

                  {quizPhase === 'playing' && (
                    <motion.div 
                      key="playing"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[var(--bg-elevated)] p-6 rounded-lg border border-[var(--bg-border)] backdrop-blur-xl h-full flex flex-col"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <div className="bg-[#FF3D71]/10 border border-[#FF3D71]/20 px-3 py-1 rounded-sm text-[#FF3D71] font-bold text-xs font-mono flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {formatQuizTime(quizTimeLeft)}
                        </div>
                        <div className="text-[var(--text-dim)] font-bold text-xs uppercase tracking-wider font-mono">
                          Q {currentQIdx + 1} / {bangla2ndQuestions.length}
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-[var(--text-primary)] font-bn font-bold text-[16px] md:text-[18px] mb-6 leading-relaxed">
                          {bangla2ndQuestions[currentQIdx].question}
                        </h4>
                        <div className="grid grid-cols-1 gap-2.5">
                          {bangla2ndQuestions[currentQIdx].options.map((option, idx) => {
                            const isSelected = userAnswers[currentQIdx] === option;
                            const letter = ["ক", "খ", "গ", "ঘ"][idx];
                            return (
                              <button 
                                key={idx}
                                onClick={() => setUserAnswers({...userAnswers, [currentQIdx]: option})}
                                className={`w-full flex items-center gap-3 p-3 rounded-lg text-left font-bn transition-all border ${
                                  isSelected 
                                    ? 'bg-[#FF3D71]/10 border-[#FF3D71]/50 text-white' 
                                    : 'bg-[var(--bg-surface)] border-[var(--bg-border)] text-[var(--text-muted)] hover:bg-[var(--bg-surface)]/80'
                                }`}
                              >
                                <span className={`w-6 h-6 rounded-sm flex items-center justify-center font-bold text-xs ${isSelected ? 'bg-[#FF3D71] text-white' : 'bg-[var(--bg-elevated)] text-[var(--text-dim)]'}`}>
                                  {letter}
                                </span>
                                <span className="font-semibold text-[14px]">{option}</span>
                                {isSelected && <CheckCircle2 className="w-4 h-4 ml-auto text-[#FF3D71]" />}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex gap-3 mt-8">
                        <button 
                          disabled={currentQIdx === 0}
                          onClick={() => setCurrentQIdx(prev => prev - 1)}
                          className="flex-1 py-2.5 rounded-lg border border-[var(--bg-border)] text-[var(--text-dim)] font-bold font-bn disabled:opacity-20 font-mono"
                        >
                          PREV
                        </button>
                        {currentQIdx < bangla2ndQuestions.length - 1 ? (
                          <button 
                            onClick={() => setCurrentQIdx(prev => prev + 1)}
                            className="flex-1 py-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--bg-border)] text-[var(--text-primary)] font-bold font-bn font-mono"
                          >
                            NEXT
                          </button>
                        ) : (
                          <button 
                            onClick={() => setQuizPhase('result')}
                            className="flex-1 py-2.5 rounded-lg bg-[var(--accent)] text-[#0A0E1A] font-bold font-bn shadow-md shadow-[var(--accent)]/20"
                          >
                            জমা দিন
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {quizPhase === 'result' && (
                    <motion.div 
                      key="result"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-[var(--bg-elevated)] p-10 rounded-lg border border-[var(--bg-border)] backdrop-blur-xl h-full flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-20 h-20 rounded-lg bg-[var(--primary)]/10 flex items-center justify-center mb-6 border border-[var(--primary)]/30">
                        <Award className="w-10 h-10 text-[var(--primary)]" />
                      </div>
                      <h3 className="text-[var(--text-primary)] font-bold font-bn text-2xl mb-2">অভিনন্দন, {regData.name.split(' ')[0]}!</h3>
                      <p className="text-[var(--text-dim)] font-bn mb-1 uppercase text-[9px] tracking-wider font-mono font-bold">Your Performance</p>
                      <div className="text-[48px] font-bold font-mono text-[var(--accent)] leading-none mb-4">
                        {calculateScore()} <span className="text-[var(--text-dim)] text-xl font-bold">/ {bangla2ndQuestions.length}</span>
                      </div>
                      <p className="text-[var(--text-muted)] font-bn text-[14px] mb-8 font-semibold">
                        {regData.school}-এর এই স্কোরটি তোমার পরীক্ষার আত্মবিশ্বাস বাড়িয়ে দেবে।
                      </p>
                      <button 
                        onClick={() => setQuizPhase('idle')}
                        className="w-full py-3.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--bg-border)] text-[var(--text-primary)] font-bold font-bn hover:bg-[var(--bg-surface)]/80 transition-all font-mono"
                      >
                        RETRY
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ SMART LEARNING HUB SHOWCASE ══════════════════════ */}
      <div className="relative mt-20 mb-16 md:mb-20 px-4 md:px-0 z-10 group">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[var(--primary)]/5 blur-[100px] rounded-lg pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[var(--neon-violet)]/5 blur-[100px] rounded-lg pointer-events-none" />

        <div 
          className="relative rounded-lg p-8 md:p-16 flex flex-col md:flex-row items-center border border-[var(--primary)]/15 overflow-visible"
          style={{
            background: 'linear-gradient(145deg, rgba(10,14,26,0.92) 0%, rgba(17,24,39,0.96) 100%)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
          }}
        >
          {/* Animated Mesh Pattern */}
          <div className="absolute inset-0 rounded-lg opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(var(--primary) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Left Content */}
          <div className="relative z-10 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm mb-6 border border-[var(--primary)]/30 bg-[var(--primary)]/10 font-mono">
              <span className="w-2 h-2 rounded-sm bg-[var(--primary)] animate-pulse" />
              <span className="text-[var(--primary)] text-[9px] font-bold uppercase tracking-[0.2em]">Smart Learning Hub</span>
            </div>
            
            <h2 className="text-white font-headings font-black text-[32px] md:text-[46px] leading-tight mb-6">
              নিজেকে করো <br />
              <span className="text-[var(--primary)] tracking-wide">ভবিষ্যতের জন্য তৈরি!</span>
            </h2>
            
            <p className="text-slate-400 font-bn text-[16px] md:text-[18px] max-w-lg mx-auto md:mx-0 mb-8 font-semibold">
               can study with custom tech assets, handnotes, and interactive mock tests curated carefully.
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 transition-transform hover:scale-105">
                <div className="w-9 h-9 rounded-lg bg-[var(--primary)]/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[var(--primary)]" />
                </div>
                <div>
                  <div className="text-white font-bold text-md font-mono">১০K+</div>
                  <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wider mt-1 font-mono">Users</div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 transition-transform hover:scale-105">
                <div className="w-9 h-9 rounded-lg bg-[var(--accent)]/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div>
                  <div className="text-white font-bold text-md font-mono">৪.৯/৫</div>
                  <div className="text-slate-500 text-[9px] uppercase font-bold tracking-wider mt-1 font-mono">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Student Image */}
          <div className="relative w-full md:w-[40%] flex justify-center mt-12 md:mt-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 md:w-80 md:h-80 bg-[var(--primary)]/10 rounded-full blur-[60px] animate-pulse" />
            <div className="relative">
              <img
                src={SmartStudentImg}
                alt="Smart Student"
                className="w-auto h-[300px] md:h-[420px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float"
              />
              
              {/* Floating tech widgets */}
              <div className="absolute top-[15%] -right-8 p-2.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xl animate-float-slow">
                 <div className="flex items-center gap-2 font-mono">
                    <div className="w-1.5 h-1.5 rounded-sm bg-[var(--neon-pink)]" />
                    <span className="text-white font-bold text-[9px]">LIVE QUIZ</span>
                 </div>
              </div>
               <div className="absolute bottom-[20%] -left-8 p-2.5 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
                 <div className="flex items-center gap-2 font-bn">
                    <TrendingUp className="w-3.5 h-3.5 text-[var(--accent)]" />
                    <span className="text-[var(--accent)] font-bold text-[11px]">বেস্ট রেজাল্ট</span>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ FILTER BAR + QUIZ ════════════════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className="flex items-center justify-between gap-3 mb-8 flex-wrap"
      >
        <div
          className="flex items-center gap-1.5 p-1.5 rounded-lg flex-wrap"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
        >
          {filters.map((f) => {
            const isSelected = activeFilter === f;
            return (
              <motion.button
                key={f}
                onClick={() => setActiveFilter(f)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg font-bold text-[12px] transition-all duration-300 uppercase tracking-wider font-mono flex items-center gap-1.5 border border-transparent"
                style={isSelected
                  ? { background: 'rgba(0, 240, 255, 0.1)', borderColor: 'var(--primary)', color: 'var(--primary)' }
                  : { color: 'var(--text-muted)' }
                }
              >
                {isSelected && <span className="tech-dot" />}
                {f}
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={(e) => { triggerConfetti(e); setTimeout(() => navigate('/quiz'), 300); }}
          className="flex items-center gap-2 font-bold text-[13px] h-[40px] px-5 rounded-lg text-[#0A0E1A] shrink-0 mt-3 md:mt-0 w-full md:w-auto justify-center transition-all font-mono"
          style={{ background: 'var(--accent)', boxShadow: '0 4px 12px rgba(0, 255, 136, 0.25)' }}
        >
          <PlaySquare className="w-4 h-4 fill-[#0A0E1A] text-[#0A0E1A]" />
          START QUIZ
        </motion.button>
      </motion.div>

      {/* ══ বিষয়ভিত্তিক নোট ════════════ */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="mb-12"
      >
        <div className="flex justify-between items-center mb-6 border-b border-[var(--bg-border)] pb-3">
          <h2 className="text-[var(--primary)] font-headings font-black text-[20px] md:text-[24px] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[var(--primary)]" /> <span>বিষয়ভিত্তিক নোট</span>
          </h2>
          <motion.div whileHover={{ x: 3 }} transition={{ duration: 0.2 }}>
            <Link to="/categories" className="text-[var(--primary)] text-[12px] font-bold font-mono no-underline hover:underline flex items-center gap-1">
              VIEW ALL <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {subjectCards.map((sc, index) => (
            <motion.div
              key={sc.label}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: index * 0.09 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
            >
              <Link
                to={sc.path}
                className="no-underline group block"
              >
                <div
                  className="flex flex-col rounded-lg overflow-hidden border border-[var(--bg-border)]"
                  style={{
                    width: '100%',
                    background: 'var(--bg-surface)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                    transition: 'box-shadow 0.4s cubic-bezier(0.4,0,0.2,1)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = sc.border; e.currentTarget.style.boxShadow = `0 0 20px ${sc.border}30`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)'; }}
                >
                  <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                    <img src={sc.image} alt={sc.label} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-110" style={{ display: 'block' }} />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(10,14,26,0.85) 100%)' }} />
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-sm" style={{ background: 'rgba(10,14,26,0.65)', border: `1px solid ${sc.border}`, backdropFilter: 'blur(8px)' }}>
                      <sc.icon className="w-3.5 h-3.5" style={{ color: sc.border }} />
                      <span className="text-white font-bold text-[10px] font-bn">{sc.labelBn}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 p-4">
                    <h3 className="text-[var(--text-primary)] font-bn font-bold text-[14px] sm:text-[16px] leading-snug group-hover:text-[var(--primary)] transition-colors">{sc.labelBn} হ্যান্ডনোট</h3>
                    <p className="text-[var(--text-muted)] font-bn text-[11px] sm:text-[12px] leading-relaxed font-semibold truncate">{sc.desc}</p>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary)] shrink-0" />
                      <span className="text-[var(--text-dim)] text-[9px] font-bold uppercase tracking-wider font-mono">Verified Content</span>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-1 flex items-center justify-center gap-1.5 h-8.5 rounded-lg text-[#0A0E1A] text-[11px] sm:text-[12px] font-bold"
                      style={{ background: 'var(--primary)' }}
                    >
                      <BookOpen className="w-3.5 h-3.5" /> নোট দেখুন
                    </motion.button>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ══ APPOINTMENT CTA ══ */}
      <div 
        className="mb-12 p-8 md:p-12 rounded-lg relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10 group cursor-pointer border border-[var(--bg-border)]"
        style={{ background: 'var(--bg-surface)' }}
        onClick={() => navigate('/appointment')}
      >
        <div className="absolute right-0 top-0 w-64 h-full bg-[var(--primary)]/5 blur-3xl pointer-events-none" />
        <div className="flex-1 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--bg-elevated)] border border-[var(--bg-border)] text-[var(--primary)] text-[9px] font-bold uppercase tracking-wider font-mono">
            <Video className="w-3.5 h-3.5 animate-pulse" /> 1-on-1 Live Support
          </div>
          <h2 className="text-[var(--text-primary)] font-bn font-black text-[26px] md:text-[36px] mt-4 mb-4 leading-tight">
            পরীক্ষার আগের রাতে কোনো পড়া <span className="text-[var(--primary)]">বুঝতে সমস্যা?</span>
          </h2>
          <p className="text-[var(--text-muted)] font-bn text-[16px] md:text-[18px] leading-relaxed font-semibold">
            আমাদের বিশেষজ্ঞ শিক্ষকদের কাছ থেকে সরাসরি জুম ভিডিও কলের মাধ্যমে আপনার যেকোনো জটিল টপিক বুঝে নিন।
          </p>
          <div className="flex items-center gap-6 mt-8">
            <div className="flex items-center gap-2 font-mono">
              <Clock className="w-4.5 h-4.5 text-[var(--primary)]" />
              <span className="text-[var(--text-primary)] font-bold text-[14px]">30 MIN SESSION</span>
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span className="text-[var(--primary)] font-bold text-[14px]">COST: ৳99</span>
            </div>
          </div>
        </div>
        <div className="shrink-0 relative z-10">
          <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg bg-[var(--primary)] shadow-lg shadow-[var(--primary)]/20 flex items-center justify-center text-[#0A0E1A] transition-transform group-hover:scale-105 group-hover:rotate-6">
            <ArrowRight className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* ══ POPULAR NOTES ══ */}
      <div className="mb-16">
        <SectionHeader title="Science Popular Notes" icon={TrendingUp} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {popularNotes.slice(0, 4).map((n, idx) => (
            <Link key={n.id} to={n.path} className="no-underline group">
              <div
                className="flex flex-col rounded-lg overflow-hidden border border-[var(--bg-border)] transition-all duration-300"
                style={{
                  background: 'var(--bg-surface)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = n.accentColor; e.currentTarget.style.boxShadow = `0 0 20px ${n.accentColor}30`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)'; }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={n.image}
                    alt={n.subject}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 45%, rgba(10,14,26,0.92) 100%)' }} />
                  <div
                    className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-wider text-white font-mono"
                    style={{ background: n.category === 'SSC' ? 'linear-gradient(135deg,#FF3D71,#FF2E93)' : 'linear-gradient(135deg,#8B5CF6,#6366f1)' }}
                  >
                    {n.category}
                  </div>
                  <span className="absolute bottom-2.5 left-3 text-white font-bn font-bold text-[12px]">{n.subjectBn}</span>
                </div>

                <div className="flex flex-col gap-2 p-4">
                  <h3 className="text-[var(--text-primary)] font-bn font-bold text-[14px] sm:text-[15px] leading-snug group-hover:text-[var(--primary)] transition-colors">
                    {n.subjectBn} হ্যান্ডনোট
                  </h3>
                  <p className="text-[var(--text-muted)] font-bn text-[10px] sm:text-[11px] leading-relaxed font-semibold truncate">
                    {n.desc}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 font-mono text-[9px] font-bold" style={{ color: n.accentColor }}>
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>VERIFIED CONTENT</span>
                  </div>
                  <button
                    className="w-full mt-2 h-8.5 rounded-lg text-[#0A0E1A] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all"
                    style={{ background: 'var(--primary)' }}
                  >
                    <BookOpen className="w-3.5 h-3.5" /> নোট দেখুন
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══ TRENDING THIS WEEK ══ */}
      <div className="mb-16">
        <SectionHeader title="Trending This Week" icon={Star} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trendingNotes.map((n, idx) => (
            <Link key={n.id} to={n.path} className="no-underline group">
              <div
                className="flex flex-col rounded-lg overflow-hidden border border-[var(--bg-border)] transition-all duration-300"
                style={{
                  background: 'var(--bg-surface)',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = n.accentColor; e.currentTarget.style.boxShadow = `0 0 20px ${n.accentColor}30`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--bg-border)'; e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.15)'; }}
              >
                <div className="relative w-full overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={n.image}
                    alt={n.subject}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    style={{ display: 'block' }}
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 45%, rgba(10,14,26,0.92) 100%)' }} />
                  <div
                    className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-sm text-[8px] font-bold uppercase tracking-wider text-white flex items-center gap-1 font-mono"
                    style={{ background: 'linear-gradient(135deg,#00F0FF,#8B5CF6)' }}
                  >
                    🔥 {n.category}
                  </div>
                  <span className="absolute bottom-2.5 left-3 text-white font-bn font-bold text-[12px]">{n.subjectBn}</span>
                </div>

                <div className="flex flex-col gap-2 p-4">
                  <h3 className="text-[var(--text-primary)] font-bn font-bold text-[14px] sm:text-[15px] leading-snug group-hover:text-[var(--primary)] transition-colors">
                    {n.subjectBn}
                  </h3>
                  <p className="text-[var(--text-muted)] font-bn text-[10px] sm:text-[11px] leading-relaxed font-semibold truncate">
                    {n.desc}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 font-mono text-[9px] font-bold text-[var(--primary)]">
                    <CheckCircle2 className="w-3 h-3 shrink-0" />
                    <span>VERIFIED CONTENT</span>
                  </div>
                  <button
                    className="w-full mt-2 h-8.5 rounded-lg text-[#0A0E1A] text-[11px] font-bold flex items-center justify-center gap-1.5 transition-all font-mono"
                    style={{ background: 'var(--primary)' }}
                  >
                    DETAILS
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ══ WHY SHAIFLY SECTION ══ */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 p-8 md:p-12 rounded-lg border border-[var(--bg-border)]" 
        style={{ background: 'var(--bg-surface)' }}
      >
        <div className="max-w-4xl">
          <h2 className="text-[var(--text-primary)] font-bn font-black text-[28px] md:text-[38px] mb-6 leading-tight">
            বাংলাদেশের শিক্ষার্থীদের জন্য <span className="text-[var(--primary)]">সেরা ডিজিটাল লাইব্রেরি</span> কেন শাইফলি?
          </h2>
          <div className="space-y-6 text-[var(--text-muted)] font-bn text-[16px] md:text-[18px] leading-relaxed font-semibold">
            <p>
              শাইফলি (Shaifly) শুধুমাত্র একটি ওয়েবসাইট নয়, এটি একটি পূর্ণাঙ্গ একাডেমিক সমাধান। বাংলাদেশের বর্তমান প্রতিযোগিতামূলক শিক্ষা ব্যবস্থায় SSC এবং HSC শিক্ষার্থীদের জন্য মানসম্মত নোট এবং গাইড খুঁজে পাওয়া অনেক সময় ব্যয়বহুল এবং কষ্টসাধ্য হয়ে পড়ে। আমরা সেই সমস্যার সমাধান নিয়ে এসেছি। আমাদের লাইব্রেরিতে আপনি পাবেন অভিজ্ঞ শিক্ষকদের দ্বারা তৈরি পদার্থবিজ্ঞান, রসায়ন, উচ্চতর গণিত এবং জীববিজ্ঞানের হ্যান্ডনোট।
            </p>
            <p>
              আমাদের প্রতিটি কন্টেন্ট এমনভাবে সাজানো হয়েছে যেন শিক্ষার্থীরা জটিল বিষয়গুলো সহজেই বুঝতে পারে। বিশেষ করে বিজ্ঞানের কঠিন সব গাণিতিক সমস্যা এবং থিওরিগুলো আমরা সহজ ভাষায় ব্যাখ্যা করার চেষ্টা করেছি। আপনি যদি একজন SSC পরীক্ষার্থী হন কিংবা HSC-তে নিজের ভিত্তি মজবুত করতে চান, তবে শাইফলির রিসোর্সগুলো আপনার জন্য অপরিহার্য। 
            </p>
            <p>
              এছাড়া আমাদের কুইজ সিস্টেম শিক্ষার্থীদের নিজেদের অবস্থান যাচাই করতে সাহায্য করে। আমরা বিশ্বাস করি, শিক্ষার আলো সবার জন্য উন্মুক্ত হওয়া উচিত। তাই আমাদের অধিকাংশ রিসোর্স একদম বিনামূল্যে পাওয়া যাচ্ছে। শাইফলির সাথে আপনার একাডেমিক যাত্রা হোক আনন্দদায়ক এবং সফল।
            </p>
          </div>
        </div>
      </motion.div>

      {/* Ad Unit */}
      <div className="mb-9">
        <GoogleAd slot="2280555349" />
      </div>

      {/* ══ FAQ SECTION ══ */}
      <div className="mb-16">
        <SectionHeader title="Academic FAQs" icon={PenTool} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-[var(--bg-border)]" style={{ background: 'var(--bg-surface)' }}>
            <h3 className="text-[var(--text-primary)] font-bold font-bn text-lg mb-3">১. শাইফলির নোটগুলো কি বোর্ডের নতুন সিলেবাস অনুযায়ী?</h3>
            <p className="text-[var(--text-muted)] font-bn font-semibold text-[14px]">হ্যাঁ, আমাদের সকল হ্যান্ডনোট এবং কুইজ বর্তমান শিক্ষা বোর্ড কর্তৃক প্রণীত সর্বশেষ সিলেবাস অনুসরণ করে তৈরি করা হয়েছে। প্রতি বছর আমরা নোটগুলো আপডেট করি।</p>
          </div>
          <div className="p-6 rounded-lg border border-[var(--bg-border)]" style={{ background: 'var(--bg-surface)' }}>
            <h3 className="text-[var(--text-primary)] font-bold font-bn text-lg mb-3">২. আমি কি নোটগুলো মোবাইল থেকে পড়তে পারব?</h3>
            <p className="text-[var(--text-muted)] font-bn font-semibold text-[14px]">অবশ্যই! শাইফলি সম্পূর্ণ মোবাইল ফ্রেন্ডলি। আপনি যেকোনো স্মার্টফোন থেকে যেকোনো সময় আমাদের নোটগুলো পড়তে পারবেন।</p>
          </div>
          <div className="p-6 rounded-lg border border-[var(--bg-border)]" style={{ background: 'var(--bg-surface)' }}>
            <h3 className="text-[var(--text-primary)] font-bold font-bn text-lg mb-3">৩. কুইজে অংশ নেওয়ার জন্য কি কোনো ফি দিতে হবে?</h3>
            <p className="text-[var(--text-muted)] font-bn font-semibold text-[14px]">না, শাইফলির সাধারণ কুইজ সেকশন সবার জন্য উন্মুক্ত। নিজের প্রোফাইল তৈরি করে আপনি লিডারবোর্ডে অংশ নিতে পারবেন একদম বিনামূল্যে।</p>
          </div>
          <div className="p-6 rounded-lg border border-[var(--bg-border)]" style={{ background: 'var(--bg-surface)' }}>
            <h3 className="text-[var(--text-primary)] font-bold font-bn text-lg mb-3">৪. শাইফলির ভিআইপি মেম্বারশিপের সুবিধা কী?</h3>
            <p className="text-[var(--text-muted)] font-bn font-semibold text-[14px]">ভিআইপি মেম্বাররা সকল বিষয়ের এক্সক্লুসিভ প্রিমিয়াম হ্যান্ডনোট, ভিডিও গাইড এবং পরীক্ষার আগে বিশেষ সাজেশন পেয়ে থাকেন।</p>
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
            <div key={i} className="p-8 rounded-lg relative overflow-hidden border border-[var(--bg-border)]" style={{ background: 'var(--bg-surface)' }}>
              <Quote className="absolute -right-2 -bottom-2 w-20 h-20 text-[var(--primary)]/5 rotate-12" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} className="w-3.5 h-3.5 fill-[var(--primary)] text-[var(--primary)]" />)}
              </div>
              <p className="text-[var(--text-muted)] font-bn text-[15px] leading-relaxed mb-6 font-semibold">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-sm bg-[var(--primary)]/10 border border-[var(--primary)]/20 flex items-center justify-center text-[var(--primary)] font-bold text-xs font-mono">
                  {t.name[0]}
                </div>
                <div>
                  <h4 className="text-[var(--text-primary)] font-bold font-bn text-[14px] leading-none">{t.name}</h4>
                  <p className="text-[var(--primary)] text-[10px] font-bold mt-1 uppercase tracking-wider font-mono opacity-70">{t.school}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══ PROFILE CTA BANNER ══════════════════════ */}
      <div
        className="rounded-lg px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden bg-gradient-hsc"
        style={{ boxShadow: '0 4px 20px rgba(0,240,255,0.2)' }}
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
          <p className="text-white font-bold text-[18px] md:text-[22px] font-bn mb-1">
            🎓 তোমার প্রোফাইল তৈরি করো — বিনামূল্যে!
          </p>
          <p className="text-white/80 text-[13.5px] font-bn font-semibold">
            কুইজে অংশ নাও এবং Shaifly-র লিডারবোর্ডে তোমার নাম রাখো।
          </p>
        </div>
        <Link
          to="/subscription"
          className="bg-white font-bold text-[14px] px-6 py-3 rounded-lg no-underline transition-all hover:bg-slate-50 shrink-0 relative z-10 text-[var(--neon-violet)]"
        >
          এখনই যোগ দিন →
        </Link>
      </div>

      {/* ══ STUDENT COMMUNITY SECTION ══════════════════════ */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mt-20 mb-16 relative group"
      >
        <div 
          className="relative rounded-lg p-8 md:p-16 flex flex-col md:flex-row items-center overflow-hidden border border-[var(--bg-border)]"
          style={{ background: 'var(--bg-surface)' }}
        >
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-[var(--primary)]/5 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-[var(--neon-violet)]/5 blur-[100px] rounded-full pointer-events-none" />

          {/* Left Content */}
          <div className="relative z-10 flex-1 text-center md:text-left">
            <h2 className="text-[var(--text-primary)] font-headings font-black text-[30px] md:text-[42px] leading-tight mb-6">
              যুক্ত হও হাজারো <br />
              <span className="text-[var(--primary)]">সফল শিক্ষার্থীদের দলে!</span>
            </h2>
            <p className="text-[var(--text-muted)] font-bn text-[17px] md:text-[20px] max-w-lg mx-auto md:mx-0 mb-10 leading-relaxed font-bold">
              বাংলাদেশের বিভিন্ন প্রান্তের SSC ও HSC শিক্ষার্থীরা শাইফলির রিসোর্স ব্যবহার করে তাদের সাফল্যের পথ সুগম করছে। আজই তোমার একাডেমিক যাত্রা শুরু করো।
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-8">
              <div className="flex flex-col">
                <span className="text-[var(--text-primary)] font-bold text-3xl leading-none font-mono">৫০K+</span>
                <span className="text-[var(--text-dim)] text-[9px] uppercase tracking-wider mt-1 font-mono font-bold">Active Students</span>
              </div>
              <div className="w-px h-10 bg-[var(--bg-border)] hidden md:block" />
              <div className="flex flex-col">
                <span className="text-[var(--text-primary)] font-bold text-3xl leading-none font-mono">১০০+</span>
                <span className="text-[var(--text-dim)] text-[9px] uppercase tracking-wider mt-1 font-mono font-bold">Colleges & Schools</span>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative w-full md:w-[45%] flex justify-center mt-12 md:mt-0">
             <img 
               src={StudentsGroupImg} 
               alt="Successful Students" 
               className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-102 transition-transform duration-700"
             />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
