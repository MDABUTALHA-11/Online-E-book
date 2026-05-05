import React, { useState } from 'react';
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

/* ─── hero photos (Local Assets) ─── */
const heroPhotos = [BannerImg, CollaborationImg, ScienceBg];

/* ─── note data ─── */
const trendingNotes = [
  { id:5, subject:'Premium Bundle', subjectBn:'প্রিমিয়াম', desc:'সকল বিষয়ের প্রিমিয়াম হ্যান্ডনোট একটি প্যাকেজে', path:'/subject/science', category: 'SSC' },
  { id:6, subject:'Biology',        subjectBn:'জীববিজ্ঞান',  desc:'চিত্রসহ কোর্স ম্যাটেরিয়াল ও বিস্তারিত ব্যাখ্যা', path:'/subject/biology', category: 'Science' },
  { id:7, subject:'Higher Math',    subjectBn:'উচ্চতর গণিত', desc:'শর্ট সিলেবাস কমপ্লিট সল্যুশন ও প্র্যাকটিস সেট', path:'/subject/higher-math', category: 'HSC' },
  { id:8, subject:'English',        subjectBn:'ইংরেজি',       desc:'গ্র্যামার শর্টকাট ও রাইটিং স্পেশাল ট্রিকস', path:'/subject/science', category: 'SSC' },
];

const popularNotes = [
  { id:1, subject:'Physics',   subjectBn:'পদার্থবিজ্ঞান', desc:'চিরায়ত বলবিদ্যা, নিউটনিয়ান বলবিদ্যা সহ সব অধ্যায়ের পূর্ণ নোট', path:'/subject/physics', category: 'Science' },
  { id:2, subject:'Higher Math', subjectBn:'উচ্চতর গণিত', desc:'ত্রিকোণমিতি, ক্যালকুলাস ও ম্যাট্রিক্সের সম্পূর্ণ সমাধান', path:'/subject/higher-math', category: 'HSC' },
  { id:3, subject:'Chemistry', subjectBn:'রসায়নবিজ্ঞান', desc:'জৈব রসায়ন, অজৈব ও পরিমাণগত রসায়নের সম্পূর্ণ গাইড', path:'/subject/chemistry', category: 'Science' },
  { id:4, subject:'Biology',   subjectBn:'জীববিজ্ঞান', desc:'উদ্ভিদ শারীরতত্ত্ব, মানবদেহ ও জেনেটিক্সের বিস্তারিত নোট', path:'/subject/biology', category: 'SSC' },
];

const subjectCards = [
  { label:'Higher Math Handnote',  color:'var(--bg-surface)', border:'#22C55E30', icon:Calculator, path:'/subject/higher-math' },
  { label:'Physics Handnote',       color:'var(--bg-surface)', border:'#22C55E30', icon:FlaskConical, path:'/subject/physics' },
  { label:'Chemistry Handnote',     color:'var(--bg-surface)', border:'#22C55E30', icon:Leaf,       path:'/subject/chemistry' },
  { label:'Biology Handnote',       color:'var(--bg-surface)', border:'#22C55E30', icon:BookOpen,   path:'/subject/biology' },
];

const filters = ['SSC','HSC','Science','Arts','Commerce'];

/* ─── NoteCard ─── */
function NoteCard({ note, outline = false }) {
  return (
    <Link
      to={note.path}
      className="vintage-card group no-underline relative flex flex-col"
    >
      <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-xl border border-[#dac09a] bg-[#f3ede5]">
        <div className="absolute inset-0 flex items-center justify-center text-[#c9a87c] opacity-20 group-hover:scale-110 transition-transform duration-500">
           <BookOpen className="w-16 h-16" />
        </div>
        <div className="pdf-label">PREVIEW</div>
        <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-tighter text-white shadow-lg ${
          note.category === 'SSC' ? 'bg-gradient-ssc' : 'bg-gradient-hsc'
        }`}>
          {note.category}
        </div>
      </div>
      <div className="w-full text-center flex flex-col h-full">
        <h3 className="text-[#3e2e1c] font-black text-[15px] sm:text-[18px] font-bn leading-tight mb-1 italic group-hover:text-[#2d5a42] transition-colors">{note.subject}</h3>
        <p className="text-[#6e5b41] text-[10px] sm:text-[12px] font-bold bg-[#f3ede5] px-3 py-0.5 rounded-full mb-4 italic truncate">{note.desc}</p>
        <div className="mt-auto">
          <button className="w-full flex items-center justify-center gap-1.5 h-9 rounded-full bg-[#2d5a42] text-white text-[10px] sm:text-[12px] font-black transition-all hover:bg-[#1f422d] shadow-[0_4px_0_#1b3927] active:translate-y-[1px] active:shadow-[0_2px_0_#1b3927]">
             {outline ? <><ChevronRight className="w-3.5 h-3.5" /> Details</> : <><BookOpen className="w-3.5 h-3.5" /> নোট দেখুন</>}
          </button>
        </div>
      </div>
    </Link>
  );
}

/* ─── SectionHeader ─── */
function SectionHeader({ title, icon: Icon, colorClass = "text-white" }) {
  return (
    <div className="flex justify-between items-center mb-10 border-b-2 border-dashed border-[#c9a87c] pb-4">
      <div className="flex items-center gap-4">
        {Icon && (
          <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-lg">
            <Icon className={`w-8 h-8 ${colorClass}`} />
          </div>
        )}
        <div>
          <h2 className={`font-bn font-black text-[32px] md:text-[42px] italic tracking-tighter leading-none ${colorClass}`}>{title}</h2>
          <p className="text-[#c9a87c] text-[10px] md:text-[12px] font-bold uppercase tracking-[0.2em] mt-1 italic">Verified Academic Content</p>
        </div>
      </div>
      <Link to="/categories" className="bg-[#f3e1c7] px-5 py-2.5 rounded-full border border-[#b49464] text-[#2d2416] font-black text-[14px] flex items-center gap-2 hover:bg-[#e7cfaa] transition-all no-underline shadow-sm">
        সব দেখুন <ChevronRight className="w-4 h-4" />
      </Link>
    </div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Science');

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
    <div style={{ color: '#f1f5f9' }}>

      {/* ══ HERO BANNER ══════════════════════════════ */}
      <div
        className="relative rounded-2xl overflow-hidden mb-0 flex items-center"
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
          <div className="flex items-center gap-4 mb-5">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest"
              style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              SSC · HSC · Bangladesh
            </div>
          </div>

          <h1 className="text-white font-bn font-black leading-[0.95] mb-6 italic tracking-tighter" style={{ fontSize: 'clamp(34px,6vw,68px)' }}>
            তোমার পরীক্ষার <span className="text-combo-cyan">সেরা প্রস্তুতি</span><br />এখন এক জায়গায়!
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

      {/* ══ LIVE TEMPORARY QUIZ SECTION ══════════════════════ */}
      {liveTimeLeft !== 'Ended' && (
        <div className="relative mt-8 mb-12 group">
          <div 
            className="relative rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-[#FF3D71]/20"
            style={{
              background: 'linear-gradient(135deg, rgba(255,61,113,0.05) 0%, rgba(20,20,30,0.95) 100%)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 50px rgba(255,61,113,0.1)',
            }}
          >
            {/* Background Effects */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF3D71]/10 blur-[80px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#6A5AE0]/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
              {/* Left Side: Info & Countdown */}
              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border border-[#FF3D71]/30 bg-[#FF3D71]/10">
                  <span className="w-2 h-2 rounded-full bg-[#FF3D71] animate-ping" />
                  <span className="text-[#FF3D71] text-[10px] font-black uppercase tracking-[0.2em] font-en">Live Special Event</span>
                </div>
                
                <h2 className="text-white font-bn font-black italic text-[32px] md:text-[42px] leading-tight mb-4">
                  SSC বাংলা ২য় পত্র <br />
                  <span className="text-[#FF3D71] tracking-tighter">স্পেশাল লাইভ কুইজ!</span>
                </h2>
                
                <p className="text-slate-400 font-bn text-[16px] md:text-[18px] max-w-lg mx-auto md:mx-0 italic mb-8">
                  আগামীকালকের পরীক্ষার চূড়ান্ত প্রস্তুতির জন্য ৩০টি গুরুত্বপূর্ণ প্রশ্নের পরীক্ষা দাও এখনই।
                </p>

                <div className="flex flex-col gap-4 items-center md:items-start">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                    <Clock className="w-5 h-5 text-[#FF3D71]" />
                    <div>
                      <div className="text-[#94a3b8] text-[10px] font-bold uppercase tracking-widest leading-none mb-1">Time Remaining to Participate</div>
                      <div className="text-white font-black text-xl font-en">{liveTimeLeft}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Interactive Quiz Area */}
              <div className="w-full md:w-[450px] min-h-[300px] flex flex-col">
                <AnimatePresence mode="wait">
                  {quizPhase === 'idle' && (
                    <motion.div 
                      key="idle"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl h-full flex flex-col items-center justify-center text-center"
                    >
                      <Zap className="w-16 h-16 text-[#FF3D71] mb-6 animate-pulse" />
                      <h3 className="text-white font-black font-bn text-2xl mb-4 italic">আপনি কি প্রস্তুত?</h3>
                      <p className="text-slate-400 font-bn text-[15px] mb-8">৩০ মিনিটে ৩০টি প্রশ্নের সঠিক উত্তর দিতে হবে।</p>
                      <button 
                        onClick={() => setQuizPhase('registering')}
                        className="w-full py-4 rounded-xl bg-[#FF3D71] text-white font-black font-bn text-lg shadow-lg shadow-[#FF3D71]/20 transition-all hover:scale-[1.02]"
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
                      className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl h-full"
                    >
                      <h3 className="text-white font-black font-bn text-xl mb-6 italic border-l-4 border-[#FF3D71] pl-3">আপনার তথ্য দিন</h3>
                      <div className="space-y-4 mb-8">
                        <div>
                          <label className="block text-slate-500 font-bn text-[12px] mb-2 font-bold uppercase tracking-widest pl-1">আপনার নাম</label>
                          <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#FF3D71]" />
                            <input 
                              type="text" 
                              placeholder="সম্পূর্ণ নাম লিখুন"
                              className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-bn focus:outline-none focus:border-[#FF3D71]/50 transition-all font-bold placeholder:opacity-30"
                              value={regData.name}
                              onChange={(e) => setRegData({...regData, name: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-slate-500 font-bn text-[12px] mb-2 font-bold uppercase tracking-widest pl-1">স্কুল/মাদ্রাসার নাম</label>
                          <div className="relative">
                            <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-combo-blue" />
                            <input 
                              type="text" 
                              placeholder="প্রতিষ্ঠানের নাম লিখুন"
                              className="w-full bg-[#0F172A] border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-bn focus:outline-none focus:border-combo-blue/50 transition-all font-bold placeholder:opacity-30"
                              value={regData.school}
                              onChange={(e) => setRegData({...regData, school: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>
                      <button 
                        onClick={handleStartQuiz}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-[#FF3D71] to-[#6A5AE0] text-white font-black font-bn text-lg shadow-xl transition-all hover:-translate-y-0.5 active:scale-95"
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
                      className="bg-white/5 p-6 rounded-3xl border border-white/10 backdrop-blur-xl h-full flex flex-col"
                    >
                      <div className="flex justify-between items-center mb-6">
                        <div className="bg-[#FF3D71]/10 border border-[#FF3D71]/20 px-3 py-1 rounded-lg text-[#FF3D71] font-black text-xs font-en flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          {formatQuizTime(quizTimeLeft)}
                        </div>
                        <div className="text-white/60 font-black text-xs uppercase tracking-widest font-en">
                          Q {currentQIdx + 1} / {bangla2ndQuestions.length}
                        </div>
                      </div>

                      {/* Question Content */}
                      <div className="flex-1 flex flex-col">
                        <h4 className="text-white font-bn font-black text-[18px] md:text-[20px] mb-6 leading-relaxed italic">
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
                                className={`w-full flex items-center gap-3 p-3.5 rounded-xl text-left font-bn transition-all border ${
                                  isSelected 
                                    ? 'bg-[#FF3D71]/10 border-[#FF3D71]/50 text-white' 
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                                }`}
                              >
                                <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${isSelected ? 'bg-[#FF3D71] text-white' : 'bg-white/5 text-slate-500'}`}>
                                  {letter}
                                </span>
                                <span className="font-bold text-[15px]">{option}</span>
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
                          className="flex-1 py-3 rounded-xl border border-white/10 text-slate-500 font-black font-bn disabled:opacity-20"
                        >
                          পূর্ববর্তী
                        </button>
                        {currentQIdx < bangla2ndQuestions.length - 1 ? (
                          <button 
                            onClick={() => setCurrentQIdx(prev => prev + 1)}
                            className="flex-1 py-3 rounded-xl bg-white/10 text-white font-black font-bn hover:bg-white/20"
                          >
                            পরবর্তী
                          </button>
                        ) : (
                          <button 
                            onClick={() => setQuizPhase('result')}
                            className="flex-1 py-3 rounded-xl bg-[#22C55E] text-white font-black font-bn shadow-lg shadow-[#22C55E]/20"
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
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-white/5 p-10 rounded-3xl border border-white/10 backdrop-blur-xl h-full flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-24 h-24 rounded-full bg-[#22C55E]/20 flex items-center justify-center mb-6 border-4 border-[#22C55E]/30">
                        <Award className="w-12 h-12 text-[#22C55E]" />
                      </div>
                      <h3 className="text-white font-black font-bn text-3xl mb-2 italic">অভিনন্দন, {regData.name.split(' ')[0]}!</h3>
                      <p className="text-slate-400 font-bn mb-1 opacity-60 uppercase text-[10px] tracking-[0.2em] font-bold">Your Performance</p>
                      <div className="text-[54px] font-black font-en text-[#22C55E] leading-none mb-4 italic">
                        {calculateScore()} <span className="text-white/20 text-2xl font-black italic">/ {bangla2ndQuestions.length}</span>
                      </div>
                      <p className="text-slate-400 font-bn text-[15px] mb-8 italic">
                        {regData.school}-এর এই স্কোয়ারটি তোমার পরীক্ষার আত্মবিশ্বাস বাড়িয়ে দেবে।
                      </p>
                      <button 
                        onClick={() => setQuizPhase('idle')}
                        className="w-full py-4 rounded-xl bg-white/5 border border-white/10 text-white font-black font-bn hover:bg-white/10 transition-all"
                      >
                        আবার চেষ্টা করুন
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* ══ SMART LEARNING HUB SHOWCASE (Refined & Accurate) ══════════════════════ */}
      <div className="relative mt-20 mb-16 md:mb-20 px-4 md:px-0 z-10 group">
        
        {/* Subtle background glow highlights */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#22C55E]/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#00DFD8]/10 blur-[100px] rounded-full pointer-events-none" />

        <div 
          className="relative rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center border border-[#22C55E]/15 overflow-visible"
          style={{
            background: 'linear-gradient(145deg, rgba(13,33,20,0.9) 0%, rgba(8,20,12,0.95) 100%)',
            backdropFilter: 'blur(30px)',
            boxShadow: '0 40px 100px -20px rgba(0,0,0,0.8)',
          }}
        >
          {/* Animated Mesh Pattern */}
          <div className="absolute inset-0 rounded-[3rem] opacity-[0.05] pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#22C55E 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

          {/* Left Content */}
          <div className="relative z-10 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 border border-[#22C55E]/30 bg-[#22C55E]/10">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
              <span className="text-[#22C55E] text-[10px] font-black uppercase tracking-[0.2em] font-en">Smart Learning Hub</span>
            </div>
            
            <h2 className="text-white font-bn font-black italic text-[36px] md:text-[54px] leading-tight mb-6">
              নিজেকে করো <br />
              <span className="text-combo-red tracking-tighter">ভবিষ্যতের জন্য তৈরি!</span>
            </h2>
            
            <p className="text-slate-400 font-bn text-[18px] md:text-[21px] max-w-lg mx-auto md:mx-0 italic mb-8 opacity-80">
              আধুনিক সব রিসোর্স ও ইন্টারেক্টিভ কুইজ নিয়ে শাইফলি তোমার একাডেমিক যাত্রায় পাশে আছে সবসময়।
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 transition-transform hover:scale-105">
                <div className="w-10 h-10 rounded-xl bg-[#22C55E]/20 flex items-center justify-center">
                  <Award className="w-5 h-5 text-[#22C55E]" />
                </div>
                <div>
                  <div className="text-white font-black text-lg leading-none">১০k+</div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Users</div>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4 transition-transform hover:scale-105">
                <div className="w-10 h-10 rounded-xl bg-[#00DFD8]/20 flex items-center justify-center">
                  <Star className="w-5 h-5 text-[#00DFD8]" />
                </div>
                <div>
                  <div className="text-white font-black text-lg leading-none">৪.৯/৫</div>
                  <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mt-1">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - The New Smart Student Image */}
          <div className="relative w-full md:w-[40%] flex justify-center mt-12 md:mt-0">
            {/* Background Halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 bg-[#22C55E]/10 rounded-full blur-[60px] animate-pulse" />
            
            {/* The Image itself with pop-out effect */}
            <div className="relative">
              <img
                src={SmartStudentImg}
                alt="Smart Student"
                className="w-auto h-[320px] md:h-[500px] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-float"
                style={{
                  filter: 'drop-shadow(0 10px 30px rgba(34,197,94,0.3))',
                }}
              />
              
              {/* Floating micro-interactions */}
              <div className="absolute top-[15%] -right-10 md:-right-20 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl animate-float-slow">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <span className="text-white font-black text-[10px] font-en">LIVE QUIZ</span>
                 </div>
              </div>
              
              <div className="absolute bottom-[25%] -left-10 md:-left-20 p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl animate-float" style={{ animationDelay: '1s' }}>
                 <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-[#00DFD8]" />
                    <span className="text-[#00DFD8] font-black text-[12px] font-bn">বেস্ট রেজাল্ট</span>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══ FILTER BAR + QUIZ ════════════════════════ */}
      <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
        <div
          className="flex items-center gap-1.5 p-1.5 rounded-2xl flex-wrap"
          style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
        >
          {filters.map((f) => {
            const filterStyles = {
              'SSC': 'bg-gradient-ssc',
              'HSC': 'bg-gradient-hsc',
              'Science': 'bg-gradient-science',
              'Arts': 'bg-gradient-arts',
              'Commerce': 'bg-gradient-commerce',
            };
            return (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2.5 rounded-xl font-black text-[13px] transition-all duration-300 uppercase tracking-wider font-en ${activeFilter === f ? filterStyles[f] : ''}`}
              style={activeFilter === f
                ? { color: 'white', boxShadow: '0 4px 15px rgba(255,0,128,0.2)' }
                : { color: '#475569', background: 'transparent' }
              }
            >
              {f}
            </button>
          )})}
        </div>

        <button
          onClick={() => navigate('/quiz')}
          className="flex items-center gap-2 font-black text-[14px] h-[44px] px-6 rounded-2xl text-white transition-all hover:-translate-y-0.5 shrink-0 mt-3 md:mt-0 w-full md:w-auto justify-center bg-gradient-ssc"
          style={{ boxShadow: '0 4px 16px rgba(255,0,128,0.3)' }}
        >
          <PlaySquare className="w-4 h-4 fill-white text-white" />
          Start Quiz
        </button>
      </div>

      <div className="mb-9">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-combo-violet font-black text-[20px] md:text-[22px] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-combo-violet" /> <span>বিষয়ভিত্তিক নোট</span>
          </h2>
          <Link to="/categories" className="text-combo-violet text-[12px] font-black no-underline hover:underline flex items-center gap-1">
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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-combo-green text-[10px] font-black uppercase tracking-widest mb-6 font-en">
            <Video className="w-3.5 h-3.5" /> 1-on-1 Live Support
          </div>
          <h2 className="text-white font-bn font-black text-[32px] md:text-[44px] italic mb-4 leading-tight">
            পরীক্ষার আগের রাতে কোনো পড়া <span className="text-combo-green">বুঝতে সমস্যা?</span>
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
      <div className="booklet-container mb-16">
        <div className="relative z-10">
          <SectionHeader title={`${activeFilter} Popular Notes`} icon={TrendingUp} colorClass="text-[#22C55E]" />
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {popularNotes.filter(n => n.category === activeFilter || activeFilter === 'Science').slice(0, 4).map(n => (
              <NoteCard key={n.id} note={n} />
            ))}
            {popularNotes.filter(n => n.category === activeFilter || activeFilter === 'Science').length === 0 && (
              <div className="col-span-full py-16 text-center text-[#6f5b44] font-bn text-xl italic bg-[rgba(0,0,0,0.02)] rounded-[2rem] border-2 border-dashed border-[#c9a87c]">
                এই ক্যাটাগরিতে বর্তমানে কোনো নোট নেই। শীঘ্রই আসছে...
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ══ TRENDING ══ */}
      <div className="booklet-container mb-16">
        <div className="relative z-10">
          <SectionHeader title="Trending This Week" icon={Star} colorClass="text-combo-orange" />
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {trendingNotes.map(n => <NoteCard key={n.id} note={n} outline />)}
          </div>
          
          {/* Subtle decoration */}
          <div className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10 pointer-events-none transform rotate-12">
             <Star className="w-full h-full text-combo-orange fill-combo-orange" />
          </div>
        </div>
      </div>

      {/* ══ WHY SHAIFLY SECTION (ADSENSE FRIENDLY TEXT) ══ */}
      <div className="mb-12 p-8 md:p-12 rounded-[2.5rem]" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
        <div className="max-w-4xl">
          <h2 className="text-white font-bn font-black text-[32px] md:text-[44px] italic mb-6 leading-tight">
            বাংলাদেশের শিক্ষার্থীদের জন্য <span className="text-combo-blue">সেরা ডিজিটাল লাইব্রেরি</span> কেন শাইফলি?
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
            <p className="text-slate-500 font-bn italic">অবশ্যই! শাইফলি সম্পূর্ণ মোবাইল ফ্রেন্ডলি। আপনি যেকোনো স্মার্টফোন থেকে যেকোনো সময় আমাদের নোটগুলো পড়তে পারবেন।</p>
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
        className="rounded-2xl px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5 relative overflow-hidden bg-gradient-hsc"
        style={{ boxShadow: '0 10px 40px rgba(0,198,255,0.25)' }}
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
            কুইজে অংশ নাও এবং Shaifly-র লিডারবোর্ডে তোমার নাম রাখো।
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

      {/* ══ STUDENT COMMUNITY SECTION (Pre-Footer) ══════════════════════ */}
      <div className="mt-20 mb-16 relative group">
        <div 
          className="relative rounded-[3rem] p-8 md:p-16 flex flex-col md:flex-row items-center overflow-hidden border border-white/10"
          style={{ background: 'var(--bg-surface)' }}
        >
          {/* Decorative background glow */}
          <div className="absolute -left-20 -top-20 w-80 h-80 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

          {/* Left Content */}
          <div className="relative z-10 flex-1 text-center md:text-left">
            <h2 className="text-white font-bn font-black text-[36px] md:text-[52px] leading-tight mb-6 italic tracking-tight">
              যুক্ত হও হাজারো <br />
              <span className="text-combo-violet">সফল শিক্ষার্থীদের দলে!</span>
            </h2>
            <p className="text-slate-400 font-bn text-[18px] md:text-[22px] max-w-lg mx-auto md:mx-0 italic mb-10 leading-relaxed font-bold">
              বাংলাদেশের বিভিন্ন প্রান্তের SSC ও HSC শিক্ষার্থীরা শাইফলির রিসোর্স ব্যবহার করে তাদের সাফল্যের পথ সুগম করছে। আজই তোমার একাডেমিক যাত্রা শুরু করো।
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-8">
              <div className="flex flex-col">
                <span className="text-white font-black text-3xl leading-none italic font-en">৫০k+</span>
                <span className="text-slate-500 text-[11px] uppercase tracking-widest mt-1">Active Students</span>
              </div>
              <div className="w-px h-10 bg-white/10 hidden md:block" />
              <div className="flex flex-col">
                <span className="text-white font-black text-3xl leading-none italic font-en">১০০+</span>
                <span className="text-slate-500 text-[11px] uppercase tracking-widest mt-1">Colleges & Schools</span>
              </div>
            </div>
          </div>

          {/* Right Content - Student Group Image */}
          <div className="relative w-full md:w-[45%] flex justify-center mt-12 md:mt-0">
             <img 
               src={StudentsGroupImg} 
               alt="Successful Students" 
               className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform hover:scale-105 transition-transform duration-700"
             />
          </div>
        </div>
      </div>
    </div>
  );
}
