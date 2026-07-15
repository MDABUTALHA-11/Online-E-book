import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';
import usePageSEO from '../hooks/usePageSEO';
import GoogleAd from '../components/GoogleAd';
import { Search, ArrowLeft, BookOpen, GraduationCap, Info, ChevronRight, Quote, Zap, Trophy, Award, Clock, Star, Play, X, Shield, Table, Calculator, Eye, Heart } from 'lucide-react';
import { getSubjectMeta, getSubjectChapters } from '../data/unifiedSubjectsData';

import PhysicsImg from '../assets/scientists/physics.png';
import ChemistryImg from '../assets/scientists/chemistry.png';
import MathImg from '../assets/scientists/math.png';
import BiologyImg from '../assets/scientists/biology.png';
import HigherMathImg from '../assets/scientists/highermath.png';
import NewtonImg from '../assets/scientists/newton.png';

export default function SubjectPage() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('notes'); // 'notes', 'quiz', 'features'
  const [selectedChapter, setSelectedChapter] = useState(null); // Chapter details modal
  const [timerSetting, setTimerSetting] = useState('none');
  const [userCredentials, setUserCredentials] = useState({ name: '', school: '' });
  const [showCredForm, setShowCredForm] = useState(false);

  // Load subject-specific details
  const subjectMeta = getSubjectMeta(subjectId);
  const chapters = getSubjectChapters(subjectId);

  // Load completed chapters list from LocalStorage
  const [completedChapters, setCompletedChapters] = useState([]);
  const [subjectXp, setSubjectXp] = useState(0);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem("ssc_physics_completed_chapters")) || [];
    setCompletedChapters(list);
    const xp = parseInt(localStorage.getItem("ssc_physics_total_xp")) || 0;
    setSubjectXp(xp);
    const user = JSON.parse(localStorage.getItem('user')) || { name: '', school: '' };
    setUserCredentials(user);
  }, [subjectId]);

  const scientistData = useMemo(() => ({
    physics: { name: 'আলবার্ট আইনস্টাইন', quote: 'কল্পনা জ্ঞানের চেয়েও বেশি গুরুত্বপূর্ণ।', image: PhysicsImg },
    chemistry: { name: 'নিলস বোর', quote: 'বাস্তবতা হলো সেটিই যা কোনো কিছু বাস্তব বলে গণ্য করার পর থাকে।', image: ChemistryImg },
    math: { name: 'শ্রীনিবাস রামানুজন', quote: 'আমার কাছে কোনো সমীকরণের অর্থ নেই যতক্ষণ না সেটি ঈশ্বরের চিন্তা প্রকাশ করে।', image: MathImg },
    biology: { name: 'চার্লস ডারউইন', quote: 'যারা পরিবর্তনের সাথে খাপ খাওয়াতে পারে তারাই টিকে থাকে।', image: BiologyImg },
    'higher-math': { name: 'লিওনার্দো ইউলার', quote: 'গণিত হলো প্রকৃতির ভাষা এবং মহাবিশ্বের রহস্য উন্মোচনের চাবিকাঠি।', image: HigherMathImg },
    science: { name: 'আইজ্যাক নিউটন', quote: 'আমি যদি অন্যদের চেয়ে বেশি দূরে দেখে থাকি, তবে তা মহাপুরুষদের কাঁধে দাঁড়িয়ে থাকার কারণে।', image: NewtonImg }
  }), []);

  const subject = categories.find(c => c.slug === subjectId);
  const scientist = (subjectId && scientistData[subjectId]) ? scientistData[subjectId] : scientistData.science;
  const subjectBooks = useMemo(() => books.filter(b => b.subject === subjectId), [subjectId]);

  usePageSEO({
    title: subject ? `${subject.name} - Shaifly Library` : 'Handnote - Shaifly',
    description: subject ? `SSC ও HSC শিক্ষার্থীদের জন্য ${subject.name} বিষয়ের সকল হ্যান্ডনোট।` : 'একাডেমিক হ্যান্ডনোট লাইব্রেরি',
    keywords: `${subject?.name || ''} Handnote, note ssc, handnote ssc`,
  });

  useEffect(() => {
    if (subjectId) { window.scrollTo({ top: 0, behavior: 'smooth' }); }
  }, [subjectId]);

  const filteredBooks = useMemo(() => {
    return subjectBooks.filter(book => {
      const ok = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      return ok;
    });
  }, [subjectBooks, searchTerm]);

  if (!subject) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center flex-col gap-5 font-bn">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-white border border-slate-200 shadow-sm">
          <Info className="w-8 h-8 text-[#334155]" />
        </div>
        <h2 className="text-[#0F172A] text-xl font-black">বিষয়টি খুঁজে পাওয়া যায়নি!</h2>
        <Link to="/categories" className="font-black text-[14px] px-6 py-3 rounded-xl no-underline text-white transition-all bg-[#0F172A]">ক্যাটাগরি দেখুন</Link>
      </div>
    );
  }

  // Handle Quiz Start Button Click inside Drawer
  const handleStartQuiz = (ch) => {
    setSelectedChapter(ch);
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.name) {
      setShowCredForm(true);
    } else {
      navigate(`/quiz/play?subject=${ch.id}&timer=${timerSetting}`);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!userCredentials.name.trim() || !userCredentials.school.trim()) return;
    localStorage.setItem("user", JSON.stringify({ ...userCredentials, mode: 'practice' }));
    setShowCredForm(false);
    if (selectedChapter) {
      navigate(`/quiz/play?subject=${selectedChapter.id}&timer=${timerSetting}`);
    }
  };

  // Render Subject-Specific Interactive Features Panel
  const renderSubjectSpecificFeatures = () => {
    if (subjectId === 'physics') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-slate-800">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-[#2563EB] mb-4 flex items-center gap-1.5"><Calculator className="w-5 h-5" /> গুরুত্বপূর্ণ সূত্র তালিকা (Formula Sheet)</h3>
            <div className="space-y-3 font-mono text-sm">
              <div className="p-3 bg-slate-50 rounded-xl"><p className="text-slate-400 text-xs">গতির সমীকরণ:</p><p className="font-bold text-[#0F172A]">v = u + at, s = ut + 0.5at², v² = u² + 2as</p></div>
              <div className="p-3 bg-slate-50 rounded-xl"><p className="text-slate-400 text-xs">নিউটনের বলসূত্র:</p><p className="font-bold text-[#0F172A]">F = ma, p = mv</p></div>
              <div className="p-3 bg-slate-50 rounded-xl"><p className="text-slate-400 text-xs">কাজ ও শক্তি:</p><p className="font-bold text-[#0F172A]">W = F.s, Ek = 0.5mv², Ep = mgh</p></div>
              <div className="p-3 bg-slate-50 rounded-xl"><p className="text-slate-400 text-xs">তরঙ্গ ও শব্দ:</p><p className="font-bold text-[#0F172A]">v = fλ, T = 1/f</p></div>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-black text-[#7C3AED] mb-4 flex items-center gap-1.5"><RefreshCw className="w-5 h-5" /> একক রূপান্তর সাহায্যকারী (Unit Converter)</h3>
              <p className="text-slate-500 text-xs italic mb-4">এসএসসি পদার্থবিজ্ঞানে প্রায়শই একক পরিবর্তন করতে হয়:</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg"><span>১ কিমি/ঘণ্টা (km/h)</span><span className="font-bold text-blue-600">÷ ৩.৬ = মি/সে (m/s)</span></div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg"><span>১ হর্সপাওয়ার (HP)</span><span className="font-bold text-blue-600">৭৪৬ ওয়াট (W)</span></div>
                <div className="flex justify-between p-2 bg-slate-50 rounded-lg"><span>১ কিলোওয়াট ঘণ্টা (kWh)</span><span className="font-bold text-blue-600">৩.৬ × ১০⁶ জুল (J)</span></div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (subjectId === 'chemistry') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in text-slate-800">
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm col-span-1 md:col-span-2">
            <h3 className="text-xl font-black text-[#F97316] mb-4 flex items-center gap-1.5"><Table className="w-5 h-5" /> পর্যায় সারণি কুইক ভিউ (Periodic Table Helper)</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 font-mono text-center">
              {[
                { s: 'H', n: 'Hydrogen', g: '1' },
                { s: 'He', n: 'Helium', g: '18' },
                { s: 'Li', n: 'Lithium', g: '1' },
                { s: 'Be', n: 'Beryllium', g: '2' },
                { s: 'B', n: 'Boron', g: '13' },
                { s: 'C', n: 'Carbon', g: '14' },
                { s: 'N', n: 'Nitrogen', g: '15' },
                { s: 'O', n: 'Oxygen', g: '16' },
                { s: 'F', n: 'Fluorine', g: '17' },
                { s: 'Ne', n: 'Neon', g: '18' },
                { s: 'Na', n: 'Sodium', g: '1' },
                { s: 'Mg', n: 'Magnesium', g: '2' },
                { s: 'Al', n: 'Aluminium', g: '13' },
                { s: 'Si', n: 'Silicon', g: '14' },
                { s: 'P', n: 'Phosphorus', g: '15' },
                { s: 'S', n: 'Sulfur', g: '16' }
              ].map(el => (
                <div key={el.s} className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 flex flex-col items-center shadow-sm">
                  <span className="text-lg font-black text-slate-800">{el.s}</span>
                  <span className="text-[9px] text-slate-400 uppercase font-black tracking-tighter">{el.n}</span>
                  <span className="text-[8px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-bold mt-1">গ্রুপ {el.g}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (subjectId === 'biology') {
      return (
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm animate-fade-in text-slate-800">
          <h3 className="text-xl font-black text-[#22C55E] mb-4 flex items-center gap-1.5"><Eye className="w-5 h-5" /> গুরুত্বপূর্ণ বায়োলজিক্যাল চিত্র সংকলন (Biological Visual Facts)</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-bn text-sm">
            <div className="p-4 rounded-xl bg-green-50 border border-green-100"><span className="font-bold text-[#22C55E] block mb-1">নিউরন (Neuron):</span>কোষদেহ, ডেনড্রাইট, অ্যাক্সন এবং সিন্যাপস নিয়ে গঠিত মানবদেহের স্নায়ুতন্ত্রের একক।</div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100"><span className="font-bold text-[#22C55E] block mb-1">নেফ্রন (Nephron):</span>বৃক্কের ফিল্টারিং একক, যেখানে গ্লোমেরুলাস ও রেনাল টিউবিউল ছাঁকন প্রক্রিয়ায় কাজ করে।</div>
            <div className="p-4 rounded-xl bg-green-50 border border-green-100"><span className="font-bold text-[#22C55E] block mb-1">হৃদপিণ্ড (Heart):</span>চারটি প্রকোষ্ঠবিশিষ্ট মানবদেহের রক্তসঞ্চালনকারী পাম্পের মতো কাজ করা প্রধান অঙ্গাণু।</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center py-16 text-slate-400 font-bn italic">
          <GraduationCap className="w-12 h-12 mx-auto mb-3 opacity-50" />
          এই বিষয়ের ইন্টারেক্টিভ সহায়িকা শীঘ্রই যুক্ত করা হচ্ছে।
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen pb-40 font-bn text-slate-800">
      
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 mb-6 px-2 text-[12px] font-black uppercase tracking-widest text-slate-500 font-en italic">
        <Link to="/" className="hover:text-[#0F172A] no-underline transition-colors">Home</Link>
        <ChevronRight className="w-3 h-3" />
        <Link to="/categories" className="hover:text-[#0F172A] no-underline transition-colors">Categories</Link>
        <ChevronRight className="w-3 h-3 text-[#0F172A]" />
        <span className="text-[#0F172A]">{subject.name}</span>
      </div>

      {/* ── Hero Banner with Scientist ── */}
      <div className="relative rounded-[2.5rem] overflow-hidden mb-10 min-h-[320px] md:min-h-[420px] flex flex-col md:flex-row items-center border border-[var(--bg-border)]" style={{ background:'var(--bg-surface)' }}>
        
        {/* Background Scientist Image */}
        {scientist && (
          <div className="absolute right-0 top-0 bottom-0 w-full md:w-[55%] z-0 h-full pointer-events-none select-none">
             <img 
               src={scientist.image} 
               alt={scientist.name} 
               className="w-full h-full object-cover object-center opacity-60 md:opacity-80 mix-blend-luminosity md:mix-blend-normal transform scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-surface)] via-[var(--bg-surface)]/80 md:via-[var(--bg-surface)]/30 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="relative z-10 p-8 md:p-16 max-w-2xl w-full">
           <Link to="/categories" className="inline-flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.2em] no-underline transition-colors mb-8 group font-en italic text-slate-500 hover:text-[#0F172A]">
             <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Library
           </Link>
           
           <h1 className="text-[#0F172A] text-[42px] md:text-[72px] font-black leading-[0.85] mb-8 italic tracking-tighter">
             {subject.name} <span className="text-[#2563EB]">লার্নিং জোন</span>
           </h1>

           {/* Quote Section */}
           {scientist && (
             <div className="mt-8 border-l-4 border-[#2563EB] pl-6 py-2 bg-[var(--bg-elevated)] rounded-r-2xl pr-8">
                <Quote className="w-8 h-8 text-[#2563EB] opacity-20 mb-2 rotate-180" />
                <p className="text-[20px] md:text-[28px] leading-relaxed font-bold italic text-[#0F172A] mb-2 tracking-tight">
                  "{scientist.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-[#2563EB]/40" />
                  <span className="text-[#2563EB] font-black text-[12px] uppercase tracking-[0.3em] opacity-80">
                     {scientist.name}
                  </span>
                </div>
             </div>
           )}

            <div className="flex items-center gap-4 mt-12">
               <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/60 border border-[var(--bg-border)] backdrop-blur-md">
                  <BookOpen className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-[#0F172A] font-black text-[13px] uppercase tracking-tighter">{subjectBooks.length}টি হ্যান্ডনোট</span>
               </div>
               <div className="flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/60 border border-[var(--bg-border)] backdrop-blur-md">
                  <Zap className="w-4 h-4 text-[#2563EB]" />
                  <span className="text-[#0F172A] font-black text-[13px] uppercase tracking-tighter">{chapters.length}টি অধ্যায় কুইজ</span>
               </div>
            </div>
        </div>
      </div>

      {/* Tabs Selector for Learning / Quizzing / Features */}
      <div className="flex border-b border-slate-200 mb-8 gap-4 px-2">
        <button 
          onClick={() => setActiveTab('notes')}
          className={`pb-4 px-4 font-black text-lg transition-all border-b-4 ${activeTab === 'notes' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          📚 হ্যান্ডনোট লাইব্রেরি ({subjectBooks.length})
        </button>
        <button 
          onClick={() => setActiveTab('quiz')}
          className={`pb-4 px-4 font-black text-lg transition-all border-b-4 ${activeTab === 'quiz' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          🎮 কুইজ ও অনুশীলন জোন ({chapters.length})
        </button>
        <button 
          onClick={() => setActiveTab('features')}
          className={`pb-4 px-4 font-black text-lg transition-all border-b-4 ${activeTab === 'features' ? 'border-[#2563EB] text-[#2563EB]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          💡 বিষয়ভিত্তিক সহায়িকা
        </button>
      </div>

      {/* Dynamic Tab Content rendering */}
      <div className="space-y-8">
        
        {activeTab === 'notes' && (
          <div className="space-y-8 animate-fade-in">
            {/* Search + Filter */}
            <div className="flex flex-col sm:flex-row gap-3 mb-7 p-4 rounded-2xl" style={{ background:'var(--bg-surface)', border:'1px solid var(--bg-border)' }}>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" style={{ color:'#334155' }} />
                <input
                  type="text"
                  placeholder="অধ্যায় বা নোটের নাম দিয়ে সার্চ করুন..."
                  className="w-full h-[44px] pl-11 pr-4 rounded-xl text-[13.5px] placeholder:text-[#334155] outline-none transition-all"
                  style={{ background:'var(--bg-elevated)', border:'1.5px solid var(--bg-border)', color:'#0F172A' }}
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  onFocus={e => e.target.style.borderColor = '#2563EB'}
                  onBlur={e => e.target.style.borderColor = 'var(--bg-border)'}
                />
              </div>
            </div>

            {/* Grid booklet */}
            <div className="booklet-container mb-12">
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-10 border-b border-[var(--bg-border)] pb-6">
                  <div>
                    <h2 className="text-[#0F172A] font-black text-[28px] md:text-[38px] leading-none">হ্যান্ডনোট সংগ্রহ</h2>
                    <p className="text-slate-500 text-sm font-bold mt-2 uppercase tracking-widest">{subject.name} · PDF Library</p>
                  </div>
                </div>

                <AnimatePresence mode="popLayout">
                  {filteredBooks.length > 0 ? (
                    <motion.div layout className="grid grid-cols-2 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      {filteredBooks.map((book, i) => (
                        <motion.div layout key={book.id}
                          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                          transition={{ delay:i*0.04, duration:0.3 }}
                        >
                          <BookCard book={book} />
                        </motion.div>
                      ))}
                    </motion.div>
                  ) : (
                    <div className="text-center py-20 rounded-2xl border border-dashed border-[var(--bg-border)] bg-[var(--bg-elevated)]">
                      <BookOpen className="w-10 h-10 mx-auto mb-3 text-slate-400" />
                      <h2 className="text-slate-700 text-lg font-black">দুঃখিত, কোনো নোট পাওয়া যায়নি।</h2>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header info */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-black text-slate-900">অধ্যায়ভিত্তিক গেম-কুইজ জোন</h3>
                <p className="text-slate-500 text-xs italic">NCTB সিলেবাস অনুযায়ী সকল অধ্যায়ের জন্য আলাদা কুইজ</p>
              </div>
              {/* Progress pill */}
              <div className="flex items-center gap-1.5 px-4 py-2 bg-green-500/10 text-green-600 rounded-xl text-xs font-black border border-green-500/20">
                <Trophy className="w-4 h-4" />
                <span>সম্পন্ন: {chapters.filter(c => completedChapters.includes(c.id)).length} / {chapters.length} অধ্যায়</span>
              </div>
            </div>

            {/* Chapters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {chapters.map((ch) => {
                const isCompleted = completedChapters.includes(ch.id);
                return (
                  <div 
                    key={ch.id} 
                    className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-500 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-[10px] font-black uppercase text-blue-500 bg-blue-500/10 px-2.5 py-1 rounded-full">
                          অধ্যায় {ch.num}
                        </span>
                        {isCompleted && (
                          <span className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-500/15 px-2.5 py-1 rounded-full">
                            ✓ সম্পন্ন
                          </span>
                        )}
                      </div>
                      <h4 className="text-lg font-black text-[#0F172A] group-hover:text-blue-600 transition-colors mb-2 italic">
                        {ch.titleBn}
                      </h4>
                      <p className="text-xs text-slate-500 leading-relaxed italic mb-4">
                        {ch.desc}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                        <BookOpen className="w-3.5 h-3.5" /> ৫০টি কুইজ
                      </span>
                      <button 
                        onClick={() => setSelectedChapter(ch)}
                        className="px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-black italic flex items-center gap-1 shadow-sm transition-transform hover:scale-105"
                      >
                        কুইজ খেলুন <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="animate-fade-in">
            {renderSubjectSpecificFeatures()}
          </div>
        )}

      </div>

      {/* Ad Unit */}
      <div className="my-12">
        <GoogleAd slot="2280555349" />
      </div>

      {/* CHAPTER DETAILS MODAL (Intro & Objectives & Timer Selector) */}
      <AnimatePresence>
        {selectedChapter && (
          <div className="fixed inset-0 z-[200] bg-black/50 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              className="w-full max-w-xl p-8 rounded-[2rem] bg-white border border-slate-200 shadow-2xl relative"
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

              {/* Credential Form if required */}
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
                  {/* Chapter Intro */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <h4 className="text-sm font-black text-slate-800 mb-1 flex items-center gap-1"><Info className="w-4 h-4" /> অধ্যায় পরিচিতি:</h4>
                    <p className="text-xs text-slate-500 leading-relaxed italic">{selectedChapter.intro}</p>
                  </div>

                  {/* Learning Objectives */}
                  <div>
                    <h4 className="text-sm font-black text-slate-800 mb-2 flex items-center gap-1"><GraduationCap className="w-4 h-4" /> শিক্ষণফল (Objectives):</h4>
                    <ul className="list-disc pl-5 text-xs text-slate-500 space-y-1">
                      {selectedChapter.objectives.map((obj, index) => (
                        <li key={index}>{obj}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Timer selection */}
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

                  {/* Play Button */}
                  <button 
                    onClick={() => handleStartQuiz(selectedChapter)}
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
