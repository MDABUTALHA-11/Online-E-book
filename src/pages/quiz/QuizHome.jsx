import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { Trophy, Clock, Zap, Users, Activity, FlaskConical, Sigma, Dna, BookOpen, Sparkles, ArrowRight, Star, Microscope, Calculator, Check, X, ShieldAlert, Award, Calendar, Play } from 'lucide-react';
import { useQuizCount } from '../../hooks/useQuizCount';
import GoogleAd from '../../components/GoogleAd';
import { getSubjectChapters, getSubjectMeta, sscSubjects } from '../../data/unifiedSubjectsData';

// Custom Assets (fallbacks to generic if not loaded)
import QuizBannerImg from '../../assets/quiz_banner.png';
import QuizStudentsImg from '../../assets/quiz_students.png';
import TrophyCtaImg from '../../assets/trophy_cta.png';

export const quizSubjects = [
  {
    id: 'physics',
    titleBn: 'পদার্থবিজ্ঞান',
    desc: 'ভৌত রাশি, গতি, বল, কাজ ও শক্তি, তড়িৎ এবং আধুনিক পদার্থবিজ্ঞান',
    badge: 'এসএসসি',
    badgeColor: '#2563EB',
    icon: Zap,
  },
  {
    id: 'chemistry',
    titleBn: 'রসায়ন',
    desc: 'জৈব, অজৈব ও পরিমাণগত রসায়নবিজ্ঞান',
    badge: 'এসএসসি',
    badgeColor: '#F97316',
    icon: FlaskConical,
  },
  {
    id: 'higher-math',
    titleBn: 'উচ্চতর গণিত',
    desc: 'বীজগণিত, জ্যামিতি, ত্রিকোণমিতি ও সম্ভাবনা',
    badge: 'এসএসসি',
    badgeColor: '#7C3AED',
    icon: Sigma,
  },
  {
    id: 'biology',
    titleBn: 'জীববিজ্ঞান',
    desc: 'কোষ, শারীরতত্ত্ব, টিস্যু ও জেনেটিক্স',
    badge: 'এসএসসি',
    badgeColor: '#22C55E',
    icon: Dna,
  },
  {
    id: 'hsc-physics-1',
    titleBn: 'পদার্থবিজ্ঞান ১ম পত্র',
    desc: 'ভেক্টর, গতিবিদ্যা, কাজ, শক্তি ও মহাকর্ষ',
    badge: 'এইচএসসি',
    badgeColor: '#2563EB',
    icon: Zap,
  },
  {
    id: 'hsc-physics-2',
    titleBn: 'পদার্থবিজ্ঞান ২য় পত্র',
    desc: 'তাপগতিবিদ্যা, স্থির তড়িৎ, চল তড়িৎ ও আধুনিক পদার্থবিজ্ঞান',
    badge: 'এইচএসসি',
    badgeColor: '#7C3AED',
    icon: Zap,
  },
  {
    id: 'hsc-chemistry-1',
    titleBn: 'রসায়ন ১ম পত্র',
    desc: 'ল্যাবরেটরি, গুণগত রসায়ন ও পর্যায় সারণি',
    badge: 'এইচএসসি',
    badgeColor: '#F97316',
    icon: FlaskConical,
  },
  {
    id: 'hsc-higher-math-1',
    titleBn: 'উচ্চতর গণিত ১ম পত্র',
    desc: 'ম্যাট্রিক্স, সরলরেখা, ক্যালকুলাস ও কোণ',
    badge: 'এইচএসসি',
    badgeColor: '#7C3AED',
    icon: Sigma,
  },
  {
    id: 'hsc-biology-1',
    titleBn: 'জীববিজ্ঞান ১ম পত্র',
    desc: 'কোষ, টিস্যু, উদ্ভিদ ফিজিওলজি ও জিনতত্ত্ব',
    badge: 'এইচএসসি',
    badgeColor: '#22C55E',
    icon: Dna,
  },
  {
    id: 'hsc-ict',
    titleBn: 'আইসিটি',
    desc: 'বিশ্বগ্রাম, সংখ্যা পদ্ধতি, এইচটিএমএল ও সি',
    badge: 'এইচএসসি',
    badgeColor: '#06B6D4',
    icon: BookOpen,
  },
  {
    id: 'science',
    titleBn: 'সাধারণ বিজ্ঞান',
    desc: 'পদার্থ, রসায়ন ও জীববিজ্ঞানের মৌলিক আলোচনা',
    badge: 'এসএসসি',
    badgeColor: '#22C55E',
    icon: Microscope,
  },
  {
    id: 'math',
    titleBn: 'সাধারণ গণিত',
    desc: 'বীজগণিত, জ্যামিতি, পরিমিতি ও পরিসংখ্যান',
    badge: 'এসএসসি',
    badgeColor: '#EF4444',
    icon: Calculator,
  },
];

export default function QuizHome() {
  const navigate = useNavigate();
  const { count } = useQuizCount();
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [timerSetting, setTimerSetting] = useState('none');
  const [userCredentials, setUserCredentials] = useState({ name: '', school: '' });
  const [showCredForm, setShowCredForm] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')) || { name: '', school: '' };
    setUserCredentials(user);
  }, []);

  const [dashboardStats, setDashboardStats] = useState({
    completedChapters: 0,
    totalXp: 0,
    highScore: 0,
    avgScore: 0,
    currentStreak: 0,
    recentActivity: []
  });

  useEffect(() => {
    // Load Dashboard Stats from LocalStorage
    const completed = JSON.parse(localStorage.getItem("ssc_physics_completed_chapters")) || [];
    const xp = parseInt(localStorage.getItem("ssc_physics_total_xp")) || 0;
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    
    // Filter physics chapter scores
    const physicsScores = scores.filter(s => s.subject && s.subject.startsWith("physics-ch"));
    const highScore = physicsScores.length > 0 ? Math.max(...physicsScores.map(s => s.score)) : 0;
    const totalScoreSum = physicsScores.reduce((acc, curr) => acc + curr.score, 0);
    const avgScore = physicsScores.length > 0 ? Math.round(totalScoreSum / physicsScores.length) : 0;
    const streak = parseInt(localStorage.getItem("ssc_physics_current_streak")) || 0;
    
    setDashboardStats({
      completedChapters: completed.length,
      totalXp: xp,
      highScore,
      avgScore,
      currentStreak: streak,
      recentActivity: physicsScores.slice(-3).reverse() // Show top 3 recent scores
    });
  }, []);

  const badgeDefinitions = [
    { name: '🏅 পদার্থবিজ্ঞান শিক্ষার্থী', desc: 'প্রথম কুইজে অংশ নিলে আনলক হয়।', cond: (s) => s.totalXp > 0 },
    { name: '🥈 কুইজ মাস্টার', desc: '৩টি অধ্যায় সফলভাবে সম্পন্ন করলে।', cond: (s) => s.completedChapters >= 3 },
    { name: '🥇 পদার্থবিজ্ঞান বিশেষজ্ঞ', desc: '৭টি অধ্যায় সফলভাবে সম্পন্ন করলে।', cond: (s) => s.completedChapters >= 7 },
    { name: '🏆 এসএসসি চ্যাম্পিয়ন', desc: 'সকল ১৪টি অধ্যায় সম্পন্ন করলে।', cond: (s) => s.completedChapters >= 14 },
    { name: '🔥 স্ট্রিক মাস্টার', desc: 'টানা ৫টি প্রশ্নের সঠিক উত্তর দিলে।', cond: (s) => s.currentStreak >= 5 },
    { name: '⭐ পূর্ণ নম্বর বিজয়ী', desc: 'যেকোনো অধ্যায়ে সম্পূর্ণ ৫০ নম্বর পেলে।', cond: (s) => s.highScore === 50 },
    { name: '🎖 দ্রুত শিক্ষার্থী', desc: '৫ মিনিটের মধ্যে একটি কুইজ সম্পন্ন করলে।', cond: (s) => s.totalXp >= 150 },
  ];

  const unlockedBadges = badgeDefinitions.filter(b => b.cond(dashboardStats));

  const statItems = [
    { icon: Users, label: 'শিক্ষার্থী', value: count > 0 ? count.toLocaleString() + '+' : '১০K+' },
    { icon: Trophy, label: 'মোট অর্জন', value: unlockedBadges.length > 0 ? unlockedBadges.length + 'টি ব্যাজ' : '০টি ব্যাজ' },
    { icon: Clock, label: 'সময়সীমা', value: '৩০ মিনিট' },
    { icon: BookOpen, label: 'কুইজ সংখ্যা', value: '৫০টি' },
  ];

  const handleSubjectClick = (subj) => {
    const chapterSelectSlugs = ['physics', 'chemistry', 'biology', 'math', 'higher-math', 'science', 'hsc-physics-1', 'hsc-physics-2'];
    if (chapterSelectSlugs.includes(subj.id)) {
      setSelectedSubjectId(subj.id);
    } else {
      navigate(`/quiz/start?subject=${subj.id}&mode=exam`);
    }
  };

  const handleChapterSelect = (ch) => {
    setSelectedChapter(ch);
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.name) {
      setShowCredForm(true);
    } else {
      setSelectedSubjectId(null);
      setSelectedChapter(null);
      navigate(`/quiz/play?subject=${ch.id}&timer=${timerSetting}`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!userCredentials.name.trim() || !userCredentials.school.trim()) return;
    localStorage.setItem("user", JSON.stringify({ ...userCredentials, mode: 'practice' }));
    setShowCredForm(false);
    if (selectedChapter) {
      const ch = selectedChapter;
      setSelectedSubjectId(null);
      setSelectedChapter(null);
      navigate(`/quiz/play?subject=${ch.id}&timer=${timerSetting}`);
    }
  };

  return (
    <div className="min-h-screen pb-40 text-slate-800 font-bn">
      
      {/* ── Hero Section ──────────────────────────────────────────── */}
      <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-12 flex flex-col md:flex-row items-center" style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}>
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2563EB]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 px-8 md:px-16 py-12 md:py-20 text-center md:text-left flex-1">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-[11px] font-bold tracking-[0.2em] mb-8 shadow-lg"
          >
            <Activity className="w-3.5 h-3.5 animate-pulse text-white" />
            লাইভ কুইজ ও শিখন প্লাটফর্ম
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-black text-[#0F172A] mb-6 italic tracking-tight leading-none">
            এসএসসি <span className="text-[#2563EB]">পদার্থবিজ্ঞান</span> গেম-কুইজ
          </h1>

          <p className="text-lg md:text-xl text-slate-500 italic leading-relaxed max-w-2xl mb-10">
            ডুওলিঙ্গো ও কুইজিসের মতো ইন্টারেক্টিভ লার্নিং! অধ্যায়ভিত্তিক ৫০টি করে কুইজ খেলো, XP অর্জন করো এবং লিডারবোর্ডে জায়গা করে নাও।
          </p>

          {/* Stats strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
            {statItems.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 p-4 rounded-xl" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--bg-border)' }}>
                <s.icon className="w-4 h-4 text-[#2563EB]" />
                <span className="text-[#0F172A] font-black text-[18px] italic">{s.value}</span>
                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right decoration photo */}
        <div className="relative w-full md:w-[45%] h-64 md:h-[500px] overflow-hidden block">
          <img
            src={QuizStudentsImg || "/placeholder.png"}
            className="w-full h-full object-cover object-top transition-all duration-700 transform scale-110"
            alt="শিক্ষার্থী কুইজ"
          />
          <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)]/40 to-transparent" />
        </div>
      </div>

      {/* Ad Unit */}
      <div className="mb-12">
        <GoogleAd slot="2280555349" />
      </div>

      {/* ── Interactive Dashboard ──────────────────────────────────── */}
      <div className="mb-16 p-8 md:p-12 rounded-[2rem] border border-[var(--bg-border)] shadow-xl relative overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-[#7C3AED]/5 rounded-full blur-[80px]" />
        
        <div className="flex flex-col lg:flex-row gap-10 items-start justify-between relative z-10">
          {/* Main Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#7C3AED]">
              <Award className="w-6 h-6 animate-bounce" />
              <span className="text-xs font-black tracking-wider">আমার অগ্রগতি ও প্রোফাইল</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] italic">আমার ড্যাশবোর্ড</h2>
            <p className="text-slate-500 italic">পদার্থবিজ্ঞান শিখুন মজার ছলে, অর্জন করুন নতুন নতুন ব্যাজ!</p>
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-400 text-xs font-bold">মোট এক্সপি (XP)</p>
                <p className="text-2xl font-black text-[#7C3AED]">{dashboardStats.totalXp} XP</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-400 text-xs font-bold">সম্পন্ন অধ্যায়</p>
                <p className="text-2xl font-black text-[#22C55E]">{dashboardStats.completedChapters} / ১৪</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-400 text-xs font-bold">সর্বোচ্চ স্কোর</p>
                <p className="text-2xl font-black text-[#F97316]">{dashboardStats.highScore} / ৫০</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-400 text-xs font-bold">গড় নম্বর</p>
                <p className="text-2xl font-black text-[#2563EB]">{dashboardStats.avgScore} / ৫০</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-400 text-xs font-bold">বর্তমান স্ট্রিক</p>
                <p className="text-2xl font-black text-red-500">🔥 {dashboardStats.currentStreak}</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <p className="text-slate-400 text-xs font-bold">অর্জিত ব্যাজ</p>
                <p className="text-2xl font-black text-[#7C3AED]">{unlockedBadges.length}টি</p>
              </div>
            </div>
          </div>

          {/* Badges Section */}
          <div className="w-full lg:w-[400px] p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-black text-[#0F172A] mb-4">অর্জিত ব্যাজসমূহ</h3>
              {unlockedBadges.length === 0 ? (
                <div className="text-center py-8 text-slate-400 italic">
                  <ShieldAlert className="w-10 h-10 mx-auto mb-2 text-slate-300" />
                  এখনো কোনো ব্যাজ অর্জিত হয়নি। কুইজ খেলা শুরু করো!
                </div>
              ) : (
                <div className="flex flex-wrap gap-2 max-h-[180px] overflow-y-auto pr-1">
                  {unlockedBadges.map((badge, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-bold text-slate-700" title={badge.desc}>
                      {badge.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Next badge progression */}
            {unlockedBadges.length < badgeDefinitions.length && (
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 italic">
                💡 পরবর্তী লক্ষ্য: <span className="font-bold text-[#7C3AED]">{badgeDefinitions.find(b => !b.cond(dashboardStats))?.name}</span> ({badgeDefinitions.find(b => !b.cond(dashboardStats))?.desc})
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── SSC Section ─────────────────────────────── */}
      <div className="space-y-8 mb-16">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-[#2563EB] rounded-full" />
            <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] italic">
              এসএসসি বিষয়সমূহ
            </h2>
          </div>
          <div className="h-[1px] flex-1 bg-[#0F172A]/10 mx-8 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quizSubjects.filter(it => it.badge === 'এসএসসি').map((subj) => (
            <div
              key={subj.id}
              onClick={() => handleSubjectClick(subj)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl bg-white border border-[var(--bg-border)]"
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
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2"
                    style={{ background: subj.badgeColor + '15', border: `1px solid ${subj.badgeColor}30`, color: subj.badgeColor }}>
                    {subj.badge} স্তর
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] italic mb-1 tracking-tight leading-tight">{subj.titleBn}</h3>
                  <p className="text-sm text-slate-500 italic mb-4 leading-relaxed">{subj.desc}</p>
                  
                  <div className="flex items-center gap-3">
                    {['physics', 'chemistry', 'biology', 'math', 'higher-math', 'science'].includes(subj.id) ? (() => {
                      const chCount = getSubjectChapters(subj.id).length;
                      const bnNumbers = {
                        12: '১২টি',
                        14: '১৪টি',
                        17: '১৭টি'
                      };
                      const chLabel = bnNumbers[chCount] || `${chCount}টি`;
                      return (
                        <span className="flex items-center gap-1.5 text-[11px] font-bold italic"
                          style={{ color: subj.badgeColor, background: subj.badgeColor + '10', padding: '6px 12px', borderRadius: '8px', border: `1px solid ${subj.badgeColor}20` }}>
                          <Star className="w-3 h-3" style={{ fill: subj.badgeColor, color: subj.badgeColor }} />
                          {chLabel} অধ্যায় আলাদা কুইজ
                        </span>
                      );
                    })() : (
                      <>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold italic text-slate-500 bg-[var(--bg-elevated)] px-3 py-1.5 rounded-lg border border-[var(--bg-border)]">
                          <Clock className="w-3 h-3" /> ৩০ মিনিট
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold italic px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20">
                          <Star className="w-3 h-3 fill-orange-500" /> লাইভ এক্সাম
                        </span>
                      </>
                    )}
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

      {/* ── HSC Section ─────────────────────────────── */}
      <div className="space-y-8 mb-16">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-10 bg-[#7C3AED] rounded-full" />
            <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] italic">
              এইচএসসি বিষয়সমূহ
            </h2>
          </div>
          <div className="h-[1px] flex-1 bg-[#0F172A]/10 mx-8 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {quizSubjects.filter(it => it.badge === 'এইচএসসি').map((subj) => (
            <div
              key={subj.id}
              onClick={() => handleSubjectClick(subj)}
              className="group relative cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-md hover:shadow-xl bg-white border border-[var(--bg-border)]"
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
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest mb-2"
                    style={{ background: subj.badgeColor + '15', border: `1px solid ${subj.badgeColor}30`, color: subj.badgeColor }}>
                    {subj.badge} স্তর
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] italic mb-1 tracking-tight leading-tight">{subj.titleBn}</h3>
                  <p className="text-sm text-slate-500 italic mb-4 leading-relaxed">{subj.desc}</p>
                  
                  <div className="flex items-center gap-3">
                    {['hsc-physics-1', 'hsc-physics-2'].includes(subj.id) ? (() => {
                      const chCount = getSubjectChapters(subj.id).length;
                      const bnNumbers = {
                        10: '১০টি',
                        11: '১১টি'
                      };
                      const chLabel = bnNumbers[chCount] || `${chCount}টি`;
                      return (
                        <span className="flex items-center gap-1.5 text-[11px] font-bold italic"
                          style={{ color: subj.badgeColor, background: subj.badgeColor + '10', padding: '6px 12px', borderRadius: '8px', border: `1px solid ${subj.badgeColor}20` }}>
                          <Star className="w-3 h-3" style={{ fill: subj.badgeColor, color: subj.badgeColor }} />
                          {chLabel} অধ্যায় আলাদা কুইজ
                        </span>
                      );
                    })() : (
                      <>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold italic text-slate-500 bg-[var(--bg-elevated)] px-3 py-1.5 rounded-lg border border-[var(--bg-border)]">
                          <Clock className="w-3 h-3" /> ৩০ মিনিট
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-bold italic px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-500 border border-orange-500/20">
                          <Star className="w-3 h-3 fill-orange-500" /> লাইভ এক্সাম
                        </span>
                      </>
                    )}
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
            src={TrophyCtaImg || "/placeholder.png"} 
            alt="Trophy" 
            className="w-full h-full object-cover transform translate-x-10 translate-y-4 rotate-6"
            style={{ filter: 'grayscale(1) brightness(1.5)' }}
          />
        </div>

        <div className="text-center md:text-left z-10">
          <div className="flex items-center gap-3 mb-4 justify-center md:justify-start text-[#F97316] animate-pulse">
            <Trophy className="w-6 h-6" />
            <span className="text-xs font-black tracking-[0.2em]">র‍্যাঙ্কিং ও পুরস্কার</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F172A] italic mb-4">লিডারবোর্ডে তোমার <span className="text-[#2563EB]">নাম দেখতে চাও?</span></h2>
          <p className="text-lg md:text-xl text-slate-500 italic max-w-xl">কুইজে অংশ নিয়ে ভালো স্কোর করো এবং নিজেকে সেরা প্রমান করো।</p>
        </div>

        <button
          onClick={() => navigate('/quiz/leaderboard')}
          className="relative z-10 h-16 px-10 rounded-2xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white font-black text-xl italic flex items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-xl border-b-4 border-violet-900"
        >
          লিডারবোর্ড দেখুন
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* ── DYNAMIC SUBJECT CHAPTERS SELECTION MODAL ─────────────────────────────── */}
      <AnimatePresence>
        {selectedSubjectId && (() => {
          const subjectMeta = getSubjectMeta(selectedSubjectId);
          const chapters = getSubjectChapters(selectedSubjectId);
          return (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6"
              style={{ background: 'rgba(10,14,26,0.5)', backdropFilter: 'blur(12px)' }}
            >
              <motion.div 
                initial={{ scale: 0.9, y: 30 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 30 }}
                className="w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col h-[85vh] md:h-[80vh]"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--bg-border)' }}
              >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-[var(--bg-border)] flex items-center justify-between bg-slate-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <Zap className="w-5 h-5 text-blue-500 animate-pulse" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-3xl font-black text-[#0F172A] font-bn">{subjectMeta.nameBn} অধ্যায়সমূহ</h3>
                      <p className="text-slate-500 text-xs italic">এসএসসি {subjectMeta.nameBn} board-style কুইজ</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => { setSelectedSubjectId(null); setSelectedChapter(null); setShowCredForm(false); }}
                    className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Content - Scrollable Grid */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 no-scrollbar bg-slate-100/50">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {chapters.map((ch) => {
                      const completedList = JSON.parse(localStorage.getItem(`ssc_${selectedSubjectId}_completed_chapters`)) || [];
                      const isCompleted = completedList.includes(ch.id);

                      return (
                        <div 
                          key={ch.id} 
                          className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-400 transition-all flex flex-col justify-between group"
                        >
                          <div>
                            <div className="flex justify-between items-start mb-3">
                              <span className="text-[10px] font-black uppercase text-[#2563EB] bg-[#2563EB]/10 px-3 py-1 rounded-full">
                                অধ্যায় {ch.num}
                              </span>
                              {isCompleted && (
                                <span className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-500/15 px-3 py-1 rounded-full">
                                  <Check className="w-3 h-3 font-bold" /> সম্পন্ন
                                </span>
                              )}
                            </div>
                            <h4 className="text-xl font-black text-[#0F172A] group-hover:text-blue-600 transition-colors mb-2 italic">
                              {ch.titleBn}
                            </h4>
                            <p className="text-xs text-slate-500 leading-relaxed italic mb-4">
                              {ch.desc}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                            <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5" /> ৫০টি কুইজ
                            </span>
                            <button 
                              onClick={() => handleChapterSelect(ch)}
                              className="px-5 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-black italic flex items-center gap-1 shadow-sm transition-transform hover:scale-105"
                            >
                              কুইজ খেলুন <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* CHAPTER DETAILS MODAL (Intro & Objectives & Timer Selector) */}
      <AnimatePresence>
        {selectedChapter && (
          <div className="fixed inset-0 z-[210] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="w-full max-w-xl p-8 rounded-[2.5rem] bg-white border border-slate-200 shadow-2xl relative"
            >
              <button 
                onClick={() => { setSelectedChapter(null); setShowCredForm(false); }}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-red-500 hover:text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="mb-6">
                <span className="text-[10px] font-black uppercase text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-full">
                  অধ্যায় {selectedChapter.num}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2 italic">{selectedChapter.titleBn}</h3>
                <p className="text-slate-400 text-xs italic mt-1">{selectedChapter.desc}</p>
              </div>

              {showCredForm ? (
                <form onSubmit={handleFormSubmit} className="space-y-4 mb-6">
                  <div className="p-3 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold rounded-xl mb-4 leading-relaxed">
                    💡 কুইজ স্কোরবোর্ডে ও লিডারবোর্ডে আপনার নাম প্রকাশের জন্য তথ্যগুলো পূরণ করুন।
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-2">আপনার নাম</label>
                    <input 
                      type="text" 
                      placeholder="নাম লিখুন..."
                      required
                      value={userCredentials.name}
                      onChange={e => setUserCredentials({ ...userCredentials, name: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 outline-none text-slate-800 text-sm focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-400 mb-2">আপনার স্কুলের নাম</label>
                    <input 
                      type="text" 
                      placeholder="স্কুলের নাম লিখুন..."
                      required
                      value={userCredentials.school}
                      onChange={e => setUserCredentials({ ...userCredentials, school: e.target.value })}
                      className="w-full h-12 px-4 rounded-xl border border-slate-200 outline-none text-slate-800 text-sm focus:border-blue-500"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-black text-sm flex items-center justify-center gap-1.5"
                  >
                    শুরু করুন <Play className="w-4 h-4 fill-white" />
                  </button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="text-sm font-black text-slate-800 mb-1 flex items-center gap-1"><Info className="w-4 h-4" /> অধ্যায় পরিচিতি:</h4>
                    <p className="text-xs text-slate-500 leading-relaxed italic">{selectedChapter.intro}</p>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-1"><GraduationCap className="w-4 h-4" /> শিক্ষণফল (Objectives):</h4>
                    <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1">
                      {selectedChapter.objectives.map((obj, idx) => (
                        <li key={idx}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-1"><Clock className="w-4 h-4" /> টাইমার সেটিংস:</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'none', l: 'না' },
                        { id: '30', l: '৩০ সে.' },
                        { id: '45', l: '৪৫ সে.' },
                        { id: '60', l: '৬০ সে.' }
                      ].map(t => (
                        <button
                          key={t.id}
                          onClick={() => setTimerSetting(t.id)}
                          className={`py-2 px-3 rounded-lg text-xs font-bold border transition-all ${timerSetting === t.id ? 'bg-[#2563EB] text-white border-[#2563EB]' : 'bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100'}`}
                        >
                          {t.l}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      const user = JSON.parse(localStorage.getItem('user'));
                      if (!user || !user.name) {
                        setShowCredForm(true);
                      } else {
                        setSelectedSubjectId(null);
                        setSelectedChapter(null);
                        navigate(`/quiz/play?subject=${selectedChapter.id}&timer=${timerSetting}`);
                      }
                    }}
                    className="w-full h-14 rounded-2xl bg-[#EF4444] hover:bg-[#DC2626] text-white font-black text-md flex items-center justify-center gap-2 shadow-lg"
                  >
                    <Play className="w-5 h-5 fill-white" /> কুইজ শুরু করুন
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
