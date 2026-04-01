import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Trophy, Clock, Zap, Users, Activity, FlaskConical, Sigma, Dna, Play, BookOpen } from 'lucide-react';
import { useQuizCount } from '../../hooks/useQuizCount';

/* ── subjects: simplified to white/black/green combo ── */
const quizSubjects = [
  {
    id: 'physics',
    titleEn: 'Physics',
    titleBn: 'পদার্থবিজ্ঞান',
    desc: 'বলবিদ্যা, আলো, তাপ ও তরঙ্গ',
    icon: Zap,
    accent: '#22C55E',
  },
  {
    id: 'chemistry',
    titleEn: 'Chemistry',
    titleBn: 'রসায়নবিজ্ঞান',
    desc: 'জৈব, অজৈব ও পরিমাণগত রসায়ন',
    icon: FlaskConical,
    accent: '#22C55E',
  },
  {
    id: 'higher-math',
    titleEn: 'Higher Math',
    titleBn: 'উচ্চতর গণিত',
    desc: 'ক্যালকুলাস, ত্রিকোণমিতি, ম্যাট্রিক্স',
    icon: Sigma,
    accent: '#22C55E',
  },
  {
    id: 'biology',
    titleEn: 'Biology',
    titleBn: 'জীববিজ্ঞান',
    desc: 'কোষ, শারীরতত্ত্ব ও জেনেটিক্স',
    icon: Dna,
    accent: '#22C55E',
  },
];

const statItems = [
  { icon: Users,  label: 'Students', value: null },
  { icon: Trophy, label: 'Top Scorers', value: '500+' },
  { icon: Clock,  label: 'Per Question', value: '60s' },
  { icon: BookOpen, label: 'Subjects', value: '4' },
];

export default function QuizHome() {
  const navigate = useNavigate();
  const { count } = useQuizCount();

  const handleStart = (subjectId) => {
    navigate(`/quiz/start?subject=${subjectId}&mode=exam`);
  };

  return (
    <div className="min-h-screen pb-16" style={{ color:'#f1f5f9' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <div className="relative bg-slate-900 rounded-2xl overflow-hidden mb-8 px-6 md:px-8 py-10 md:py-12 text-center">
        {/* Green glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 md:w-96 h-48 bg-[#22C55E]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] font-black uppercase tracking-widest text-[11px] mb-5">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            Live Exam Mode
          </div>

          <h1 className="text-white text-[32px] md:text-[52px] font-bn font-black leading-tight mb-4">
            SSC Super <span className="text-[#22C55E]">Group</span> Quiz
          </h1>
          <p className="text-slate-400 font-bn text-[15px] md:text-[18px] max-w-xl mx-auto leading-relaxed">
            বিষয় বেছে নাও এবং চ্যালেঞ্জ শুরু করো। লাইভ টাইমার এবং লিডারবোর্ড সহ পরীক্ষার পরিবেশ।
          </p>
        </div>

        {/* Stats strip */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-3 mt-8 max-w-2xl mx-auto">
          {statItems.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1 bg-white/5 border border-white/10 rounded-xl py-3 px-2">
              <s.icon className="w-4 h-4 text-[#22C55E]" />
              <span className="text-white font-black text-[15px]">
                {s.label === 'Students' ? (count > 0 ? count.toLocaleString() : '—') : s.value}
              </span>
              <span className="text-slate-500 text-[10px] uppercase tracking-wide font-bold">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Subject grid (2×2) ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-5"
      >
        {quizSubjects.map((subj, i) => {
          const Icon = subj.icon;
          return (
            <motion.div
              key={subj.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl transition-all duration-300 flex flex-col overflow-hidden group"
              style={{ background:'#0d1b2a', border:'1px solid #1e3a5f' }}
              onMouseEnter={e=>{e.currentTarget.style.border='1px solid rgba(34,197,94,0.35)';e.currentTarget.style.boxShadow='0 12px 40px rgba(34,197,94,0.08)';}}
              onMouseLeave={e=>{e.currentTarget.style.border='1px solid #1e3a5f';e.currentTarget.style.boxShadow='none';}}
            >
              <div className="h-1.5 bg-[#22C55E]" />
              <div className="p-7 flex flex-col flex-1">
                <div className="flex items-start gap-5 mb-6">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform" style={{ background:'rgba(34,197,94,0.08)', border:'1px solid rgba(34,197,94,0.2)' }}>
                    <Icon className="w-7 h-7 text-[#22C55E]" />
                  </div>
                  <div>
                    <h3 className="text-[18px] font-black text-white leading-tight">{subj.titleEn}</h3>
                    <p className="text-[22px] font-bn font-black text-white">{subj.titleBn}</p>
                    <p className="text-[13px] font-bn mt-0.5" style={{ color:'#64748b' }}>{subj.desc}</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-7">
                  <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5" style={{ background:'#112236', border:'1px solid #1e3a5f' }}>
                    <Clock className="w-3.5 h-3.5" style={{ color:'#64748b' }} />
                    <span className="text-[12px] font-black" style={{ color:'#64748b' }}>30 মিনিট</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5" style={{ background:'#112236', border:'1px solid #1e3a5f' }}>
                    <Activity className="w-3.5 h-3.5 text-[#22C55E]" />
                    <span className="text-[12px] font-black" style={{ color:'#64748b' }}>৩০ প্রশ্ন</span>
                  </div>
                </div>
                <button
                  onClick={() => handleStart(subj.id)}
                  className="mt-auto w-full flex items-center justify-center gap-2.5 h-[52px] rounded-xl text-white font-black text-[15px] transition-all duration-300 group/btn"
                  style={{ background:'#22C55E', boxShadow:'0 4px 16px rgba(34,197,94,0.25)' }}
                  onMouseEnter={e=>e.currentTarget.style.background='#16a34a'}
                  onMouseLeave={e=>e.currentTarget.style.background='#22C55E'}
                >
                  <Play className="w-5 h-5 group-hover/btn:scale-110 transition-transform" fill="currentColor" />
                  কুইজ শুরু করুন
                </button>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Bottom CTA ──────────────────────────────────────── */}
      <div className="mt-10 rounded-2xl bg-[#22C55E] px-6 md:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left">
        <div>
          <p className="text-white font-black text-[18px] font-bn mb-1">🏆 লিডারবোর্ডে তোমার নাম দেখতে চাও?</p>
          <p className="text-white/80 font-bn text-[13.5px]">প্রোফাইল তৈরি করো এবং কুইজে অংশ নিয়ে শীর্ষে থাকো!</p>
        </div>
        <button
          onClick={() => navigate('/quiz/leaderboard')}
          className="flex items-center gap-2 bg-white text-[#16a34a] font-black text-[14px] px-6 py-3 rounded-xl transition-all hover:bg-slate-50 shrink-0"
        >
          <Trophy className="w-4 h-4" />
          লিডারবোর্ড দেখুন
        </button>
      </div>
    </div>
  );
}
