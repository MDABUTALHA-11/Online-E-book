import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Trophy, Clock, Zap, Users, Activity, FlaskConical, Sigma, Dna, BookOpen, Sparkles, ArrowRight, Star, Microscope, Calculator } from 'lucide-react';
import { useQuizCount } from '../../hooks/useQuizCount';
import GoogleAd from '../../components/GoogleAd';

// Custom Assets
import QuizBannerImg from '../../assets/quiz_banner.png';
import TrophyCtaImg from '../../assets/trophy_cta.png';

export const quizSubjects = [
  {
    id: 'physics',
    titleEn: 'Physics',
    titleBn: 'পদার্থবিজ্ঞান',
    desc: 'বলবিদ্যা, আলো, তাপ ও তরঙ্গ',
    badge: 'SSC',
    badgeColor: '#22C55E',
    icon: Zap,
  },
  {
    id: 'chemistry',
    titleEn: 'Chemistry',
    titleBn: 'রসায়নবিজ্ঞান',
    desc: 'জৈব, অজৈব ও পরিমাণগত রসায়ন',
    badge: 'SSC',
    badgeColor: '#f59e0b',
    icon: FlaskConical,
  },
  {
    id: 'higher-math',
    titleEn: 'Higher Math',
    titleBn: 'উচ্চতর গণিত',
    desc: 'ক্যালকুলাস, ত্রিকোণমিতি, ম্যাট্রিক্স',
    badge: 'SSC',
    badgeColor: '#8b5cf6',
    icon: Sigma,
  },
  {
    id: 'biology',
    titleEn: 'Biology',
    titleBn: 'জীববিজ্ঞান',
    desc: 'কোষ, শারীরতত্ত্ব ও জেনেটিক্স',
    badge: 'SSC',
    badgeColor: '#22C55E',
    icon: Dna,
  },
  {
    id: 'hsc-physics-1',
    titleEn: 'HSC Physics 1.0',
    titleBn: 'পদার্থবিজ্ঞান ১ম পত্র',
    desc: 'ভেক্টর, গতিবিদ্যা, কাজ ও শক্তি',
    badge: 'HSC',
    badgeColor: '#22C55E',
    icon: Zap,
  },
  {
    id: 'hsc-chemistry-1',
    titleEn: 'HSC Chemistry 1.0',
    titleBn: 'রসায়ন ১ম পত্র',
    desc: 'ল্যাবরেটরি, গুণগত রসায়ন ও পর্যায় সারণি',
    badge: 'HSC',
    badgeColor: '#f59e0b',
    icon: FlaskConical,
  },
  {
    id: 'hsc-higher-math-1',
    titleEn: 'HSC Higher Math 1.0',
    titleBn: 'উচ্চতর গণিত ১ম পত্র',
    desc: 'ম্যাট্রিক্স, সরলরেখা, ক্যালকুলাস ও কোণ',
    badge: 'HSC',
    badgeColor: '#8b5cf6',
    icon: Sigma,
  },
  {
    id: 'hsc-biology-1',
    titleEn: 'HSC Biology 1.0',
    titleBn: 'জীববিজ্ঞান ১ম পত্র',
    desc: 'কোষ, টিস্যু, উদ্ভিদ ফিজিওলজি ও জিনতত্ত্ব',
    badge: 'HSC',
    badgeColor: '#22C55E',
    icon: Dna,
  },
  {
    id: 'hsc-ict',
    titleEn: 'HSC ICT 1.0',
    titleBn: 'আইসিটি',
    desc: 'বিশ্বগ্রাম, সংখ্যা পদ্ধতি ও নেটওয়ার্কিং',
    badge: 'HSC',
    badgeColor: '#10b981',
    icon: BookOpen,
  },
  {
    id: 'science',
    titleEn: 'General Science',
    titleBn: 'সাধারণ বিজ্ঞান',
    desc: 'পদার্থ, রসায়ন, জীববিজ্ঞানের মৌলিক ধারণা',
    badge: 'SSC',
    badgeColor: '#10b981',
    icon: Microscope,
  },
  {
    id: 'math',
    titleEn: 'General Math',
    titleBn: 'সাধারণ গণিত',
    desc: 'বীজগণিত, জ্যামিতি, পরিসংখ্যান ও পাটিগণিত',
    badge: 'SSC',
    badgeColor: '#ec4899',
    icon: Calculator,
  },
];

export default function QuizHome() {
  const navigate = useNavigate();
  const { count } = useQuizCount();

  const statItems = [
    { icon: Users, label: 'Students', value: count > 0 ? count.toLocaleString() : '10K+' },
    { icon: Trophy, label: 'Achievements', value: '500+' },
    { icon: Clock, label: 'Duration', value: '30m' },
    { icon: BookOpen, label: 'Questions', value: '30' },
  ];

  const handleStart = (subjectId) => {
    navigate(`/quiz/start?subject=${subjectId}&mode=exam`);
  };

  return (
    <div className="min-h-screen pb-40 text-[#f1f5f9]">

      {/* ── Hero Section ──────────────────────────────────────────── */}
      <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-12 flex flex-col md:flex-row items-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
        {/* Animated Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#22C55E]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 px-8 md:px-16 py-12 md:py-20 text-center md:text-left flex-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] text-[10px] font-black uppercase tracking-[0.2em] mb-8"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            LIVE EXAM SYSTEM
          </motion.div>

          <h1 className="text-4xl md:text-7xl sf-headline text-white mb-6 italic tracking-tighter leading-none">
            SSC & HSC <span className="text-[#22C55E]">Group</span> Quiz
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 font-bn italic leading-relaxed max-w-2xl mb-10">
            বিষয় বেছে নাও এবং চ্যালেঞ্জ শুরু করো। লাইভ টাইমার এবং লিডারবোর্ড সহ পরীক্ষার আসল পরিবেশ।
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
            {statItems.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                <s.icon className="w-4 h-4 text-[#22C55E]" />
                <span className="text-white font-black text-[18px] sf-headline italic">{s.value}</span>
                <span className="text-slate-600 text-[9px] uppercase font-black tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right decoration photo */}
        <div className="relative w-full md:w-[45%] h-64 md:h-[450px] overflow-hidden block">
          <img
            src={QuizBannerImg}
            className="w-full h-full object-cover grayscale opacity-20 hover:grayscale-0 hover:opacity-100 transition-all duration-700 transform scale-110 group-hover:scale-100"
            alt="Quiz Banner"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)]/70 to-transparent" />
        </div>
      </div>

      {/* Ad Unit */}
      <div className="mb-12">
        <GoogleAd slot="2280555349" />
      </div>

      {/* ── HSC Section ─────────────────────────────── */}
      <div className="space-y-8 mb-16">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-emerald-500 rounded-full" />
            <h2 className="text-3xl md:text-5xl sf-headline text-white italic">
              HSC <span className="text-emerald-500">Group</span>
            </h2>
          </div>
          <div className="h-[1px] flex-1 bg-white/5 mx-8 hidden md:block"></div>
          <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
            First Paper 1.0
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quizSubjects.filter(it => it.badge === 'HSC').map((subj) => (
            <div
              key={subj.id}
              onClick={() => handleStart(subj.id)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = subj.badgeColor + '66'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bg-border)'}
            >
              <div className="h-[3px] w-full" style={{ background: subj.badgeColor }} />
              <div className="p-7 md:p-8 flex items-start gap-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: subj.badgeColor + '15', border: `1px solid ${subj.badgeColor}30` }}
                >
                  <subj.icon className="w-7 h-7" style={{ color: subj.badgeColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2"
                    style={{ background: subj.badgeColor + '15', border: `1px solid ${subj.badgeColor}30`, color: subj.badgeColor }}>
                    {subj.badge} Level
                  </div>
                  <h3 className="text-2xl md:text-3xl sf-headline text-white italic mb-1 tracking-tight leading-tight">{subj.titleBn}</h3>
                  <p className="text-[14px] font-bn text-slate-500 italic mb-4 leading-relaxed">{subj.desc}</p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-black italic text-slate-500 bg-[var(--bg-elevated)] px-3 py-1.5 rounded-lg border border-[var(--bg-border)]">
                      <Clock className="w-3 h-3" /> 30m
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-black italic px-3 py-1.5 rounded-lg"
                      style={{ background: subj.badgeColor + '15', color: subj.badgeColor }}>
                      <Star className="w-3 h-3" style={{ fill: subj.badgeColor }} /> Live Exam
                    </span>
                  </div>
                </div>
                <div className="self-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5" style={{ color: subj.badgeColor }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── SSC Section ─────────────────────────────── */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-[#22C55E] rounded-full" />
            <h2 className="text-3xl md:text-5xl sf-headline text-white italic">
              SSC <span className="text-[#22C55E]">Group</span>
            </h2>
          </div>
          <div className="h-[1px] flex-1 bg-white/5 mx-8 hidden md:block"></div>
          <Link to="/categories" className="text-[#22C55E] text-xs font-black italic flex items-center gap-1 hover:underline">
            ALL SSC QUIZZES <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quizSubjects.filter(it => it.badge === 'SSC').map((subj) => (
            <div
              key={subj.id}
              onClick={() => handleStart(subj.id)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = subj.badgeColor + '66'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--bg-border)'}
            >
              <div className="h-[3px] w-full" style={{ background: subj.badgeColor }} />
              <div className="p-7 md:p-8 flex items-start gap-5">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: subj.badgeColor + '15', border: `1px solid ${subj.badgeColor}30` }}
                >
                  <subj.icon className="w-7 h-7" style={{ color: subj.badgeColor }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2"
                    style={{ background: subj.badgeColor + '15', border: `1px solid ${subj.badgeColor}30`, color: subj.badgeColor }}>
                    {subj.badge} Level
                  </div>
                  <h3 className="text-2xl md:text-3xl sf-headline text-white italic mb-1 tracking-tight leading-tight">{subj.titleBn}</h3>
                  <p className="text-[14px] font-bn text-slate-500 italic mb-4 leading-relaxed">{subj.desc}</p>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5 text-[11px] font-black italic text-slate-500 bg-[var(--bg-elevated)] px-3 py-1.5 rounded-lg border border-[var(--bg-border)]">
                      <Clock className="w-3 h-3" /> 30m
                    </span>
                    <span className="flex items-center gap-1.5 text-[11px] font-black italic px-3 py-1.5 rounded-lg"
                      style={{ background: subj.badgeColor + '15', color: subj.badgeColor }}>
                      <Star className="w-3 h-3" style={{ fill: subj.badgeColor }} /> Live Exam
                    </span>
                  </div>
                </div>
                <div className="self-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0">
                  <ArrowRight className="w-5 h-5" style={{ color: subj.badgeColor }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Footer Leaderboard CTA ──────────────────────────────────────── */}
      <div className="mt-20 p-8 md:p-16 rounded-[2rem] md:rounded-[3rem] relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-10" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
        <div className="absolute right-0 top-0 w-80 h-full opacity-20 overflow-hidden">
          <img 
            src={TrophyCtaImg} 
            alt="Trophy" 
            className="w-full h-full object-cover transform translate-x-10 translate-y-4 rotate-6"
            style={{ filter: 'grayscale(1) brightness(1.5)' }}
          />
        </div>

        <div className="text-center md:text-left z-10">
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start text-[#22C55E] animate-pulse">
            <Trophy className="w-6 h-6" />
            <span className="sf-label text-xs tracking-[0.3em]">RANKINGS & REWARDS</span>
          </div>
          <h2 className="text-3xl md:text-5xl sf-headline text-white italic mb-4">লিডারবোর্ডে তোমার <span className="text-[#22C55E]">নাম দেখতে চাও?</span></h2>
          <p className="text-lg md:text-xl font-bn text-slate-500 italic max-w-xl">প্রোফাইল তৈরি করো এবং কুইজে অংশ নিয়ে নিজেকে প্রমান করো।</p>
        </div>

        <button
          onClick={() => navigate('/quiz/leaderboard')}
          className="relative z-10 h-16 px-10 rounded-2xl bg-[#22C55E] hover:bg-[#16a34a] text-white sf-headline text-xl italic flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-lg border-b-4 border-[#15803d]"
        >
          লিডারবোর্ড দেখুন
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}

