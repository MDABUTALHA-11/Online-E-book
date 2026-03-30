import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Rocket, 
  BookOpen, 
  Users, 
  ArrowRight, 
  ChevronRight, 
  Star, 
  Library, 
  Search, 
  TrendingUp,
  Download,
  Eye,
  Heart,
  FileText,
  FlaskConical,
  Calculator,
  Dna,
  Gamepad2,
  Zap,
  Play,
  Trophy,
  Clock,
  Activity
} from 'lucide-react';
import { categories, books } from '../data/books';
import BookCard from '../components/BookCard';
import Hero from '../components/Hero';
import usePageSEO from '../hooks/usePageSEO';
import { useQuizCount } from '../hooks/useQuizCount';

const quizSubjects = [];

const Home = () => {
  const navigate = useNavigate();
  const { count } = useQuizCount();
  const [searchValue, setSearchValue] = React.useState('');

  usePageSEO({
    title: 'হোম - বাংলাদেশের ১ নম্বর ওপেন একাডেমিক লাইব্রেরি',
    description: 'নবম-দ্বাদশ শ্রেণির শিক্ষার্থীদের জন্য সেরা একাডেমিক নোট এবং গাইড লাইব্রেরি। শাইফলি অনলাইন লাইব্রেরি।',
    keywords: 'SSC, HSC, Science Handnote, Shaifly Library, BD Education'
  });

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/categories?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  const trendingBooks = useMemo(() => books.filter(b => b.trending).slice(0, 4), []);

  const stats = [
    { label: 'Books Published', value: '1.2K+', icon: BookOpen, color: 'text-primary' },
    { label: 'Active Students', value: '5K+', icon: Users, color: 'text-secondary' },
    { label: 'Total Downloads', value: '15K+', icon: Download, color: 'text-accent' },
    { label: 'Positive Reviews', value: '4.9/5', icon: Heart, color: 'text-rose-500' }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Stats Section */}
      <section className="relative z-10 -mt-10 md:-mt-20 px-6 max-w-7xl mx-auto mb-20 md:mb-32">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] shadow-premium text-center group hover:-translate-y-3 transition-all duration-500 border border-white/50"
            >
              <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-6 bg-slate-50 transition-colors group-hover:bg-primary shadow-inner`}>
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color} group-hover:text-white transition-colors`} />
               </div>
              <h4 className="text-2xl md:text-4xl font-black mb-1 md:mb-2 text-slate-800 en-font">{stat.value}</h4>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px] md:text-[10px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Quiz Direct Access Widget - Single Call to Action */}
      <section className="mb-20 md:mb-32 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] p-8 md:p-16 lg:p-20 rounded-[3rem] md:rounded-[4rem] shadow-[0_40px_100px_-20px_rgba(16,185,129,0.2)] border border-white/10 flex flex-col lg:flex-row items-center justify-between gap-12 group relative overflow-hidden">
            
            {/* Background Animations */}
            <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] group-hover:bg-primary/30 transition-all duration-1000 pointer-events-none" />
            <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] group-hover:bg-blue-500/20 transition-all duration-1000 pointer-events-none" />

            {/* Left Content */}
            <div className="text-center lg:text-left max-w-2xl relative z-20 flex-1">
               <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mb-8 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                 <Rocket className="w-4 h-4 animate-bounce" /> Skill Test
               </div>
               <h2 className="text-5xl md:text-[5.5rem] font-bn font-black text-white italic mb-6 leading-[1.1] tracking-tighter drop-shadow-2xl">
                 SSC <span className="text-primary drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">Super Group</span> Quiz
               </h2>
               <p className="text-slate-300 font-bn text-xl md:text-2xl italic leading-relaxed drop-shadow-md">
                  আপনার প্রস্তুতি যাচাই করার সবচেয়ে আধুনিক এবং স্মার্ট উপায়। হাজারো শিক্ষার্থীর সাথে প্রতিযোগিতা করুন এবং লিডারবোর্ডে নিজের স্থান নিশ্চিত করুন!
               </p>
            </div>

            {/* Right Side Mode Cards (Buttons) */}
            <div className="flex flex-col gap-6 w-full lg:w-auto relative z-20 shrink-0">
               {/* Exam Mode Card ONLY */}
               <button 
                 onClick={() => navigate('/quiz')} 
                 className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left justify-between p-6 md:p-10 bg-gradient-to-r from-primary/10 to-transparent hover:from-primary/20 hover:to-emerald-900/40 border border-primary/30 hover:border-primary rounded-[2rem] md:rounded-[2.5rem] group/btn transition-all shadow-[0_10px_30px_rgba(16,185,129,0.1)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.3)] w-full lg:w-[450px] transform hover:-translate-y-2"
               >
                 <div className="mb-4 sm:mb-0">
                    <h3 className="text-3xl md:text-5xl text-emerald-300 font-bn italic font-black mb-2 group-hover/btn:text-emerald-200 transition-colors">Start Live Exam</h3>
                    <p className="text-emerald-100/70 font-en text-xs md:text-sm uppercase tracking-[0.15em] font-bold">50 Questions • Global Leaderboard</p>
                 </div>
                 <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-primary/40 group-hover/btn:scale-110 group-hover:btn:rotate-12 transition-transform">
                    <Rocket className="w-8 h-8 text-white" />
                 </div>
               </button>
            </div>

          </div>
        </div>
      </section>

      {/* Quick Access Notes & PDF (2x2 Grid universally) */}
      <section className="relative z-10 px-6 max-w-7xl mx-auto mb-20 md:mb-32">
        <div className="text-center mb-10 md:mb-16">
            <h2 className="text-4xl md:text-6xl font-bn font-black italic text-slate-800">Notes & PDF</h2>
            <p className="text-slate-500 font-bn italic text-lg md:text-xl max-w-xl mx-auto mt-4">সরাসরি আপনার প্রয়োজনীয় বিষয়ের নোটগুলো পেয়ে যান এক ক্লিকে।</p>
        </div>
        
        {/* Strictly 2x2 grid everywhere (Mobile & Desktop) as requested */}
        <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 max-w-5xl mx-auto">
           {[
             { name: 'Physics Notes', icon: FileText, color: 'text-blue-500', bg: 'bg-blue-500/10', link: '/subject/physics' },
             { name: 'Chemistry PDFs', icon: FlaskConical, color: 'text-emerald-500', bg: 'bg-emerald-500/10', link: '/subject/chemistry' },
             { name: 'Higher Math', icon: Calculator, color: 'text-purple-500', bg: 'bg-purple-500/10', link: '/subject/higher-math' },
             { name: 'Biology Guide', icon: Dna, color: 'text-rose-500', bg: 'bg-rose-500/10', link: '/subject/biology' }
           ].map((note, i) => (
             <Link key={i} to={note.link} className="no-underline block h-full">
               <motion.div 
                 whileHover={{ y: -5 }}
                 className="bg-white p-4 md:p-10 h-full rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all border border-slate-100 flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left group"
               >
                 <div className={`w-14 h-14 md:w-20 md:h-20 ${note.bg} rounded-[1.25rem] md:rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                   <note.icon className={`w-6 h-6 md:w-10 md:h-10 ${note.color}`} />
                 </div>
                 <div className="flex-1 flex flex-col justify-center">
                   <h3 className="text-lg md:text-3xl font-bn font-black text-slate-800 italic mb-1 md:mb-2">{note.name}</h3>
                   <p className="text-slate-500 text-[11px] md:text-base font-bn italic leading-snug">সম্পূর্ণ পিডিএফ গাইড পড়ুন সম্পূর্ণ ফ্রিতে।</p>
                 </div>
               </motion.div>
             </Link>
           ))}
        </div>
      </section>

      {/* Trending Notes Section */}
      <section className="pt-20 md:pt-32 pb-20 md:pb-40 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10 mb-12 md:mb-20">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-rose-500/10 text-rose-500 rounded-full text-xs font-black en-font tracking-widest uppercase mb-6 shadow-sm border border-rose-500/20">
                <TrendingUp className="w-4 h-4" /> Trending Now
              </div>
              <h2 className="text-4xl md:text-7xl font-bn font-black mb-4 italic leading-tight text-slate-800 tracking-tight">
                শিক্ষার্থীদের <span className="text-primary italic">পছন্দের</span> হ্যান্ডনোটসমূহ
              </h2>
              <p className="text-xl text-slate-500 font-bn italic">এই সপ্তাহের সবচেয়ে বেশি পঠিত এবং ডাউনলোডকৃত নোটগুলো একনজরে দেখে নিন।</p>
            </div>
            <Link to="/categories" className="btn btn-outline h-16 rounded-2xl px-10 flex items-center gap-3 hover:scale-105 transition-all text-lg font-bn">
              সবগুলো দেখুন <ArrowRight className="w-6 h-6" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-10 max-w-4xl mx-auto">
            {trendingBooks.map((book, index) => (
              <motion.div 
                key={book.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <BookCard book={book} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[150px] -ml-48" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-[150px] -mr-48" />
      </section>

      {/* Categories Preview */}
      <section className="bg-slate-950 py-20 md:py-40 rounded-[3rem] md:rounded-[5rem] overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
           <div className="text-center mb-16 md:mb-24 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 text-primary rounded-full text-xs font-black en-font tracking-[0.2em] mb-10 border border-white/10 shadow-2xl uppercase">
                 <Rocket className="w-5 h-5 text-primary animate-pulse" /> Launch Your Success
              </div>
              <h2 className="text-white text-4xl md:text-8xl font-bn font-black mb-6 md:mb-8 italic leading-tight tracking-tighter">
                আপনার <span className="text-primary italic">পছন্দের ক্ষেত্রটি</span> বেছে নিন
              </h2>
              <p className="text-slate-400 text-lg md:text-xl font-bn italic leading-relaxed">
                আপনার কাঙ্ক্ষিত নোটগুলো খুব সহজেই খুঁজে পেতে আমরা সেগুলোকে বিভিন্ন ক্যাটাগরিতে ভাগ করেছি। 
                নিচের ক্যাটাগরিগুলো থেকে বেছে নিন আপনার প্রয়োজনীয় বিষয়টি।
              </p>
           </div>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {categories.slice(0, 4).map((c, i) => (
                <Link key={c.id} to={`/subject/${c.slug}`} className="group no-underline">
                   <motion.div
                     whileHover={{ y: -10 }}
                     className="glass-dark p-6 md:p-12 rounded-[2rem] md:rounded-[3.5rem] border border-white/5 hover:border-primary/20 transition-all duration-500 text-center"
                   >
                      <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-[1.25rem] md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 text-primary shadow-2xl ring-1 ring-white/10 group-hover:rotate-6 transition-transform">
                         <Search className="w-6 h-6 md:w-10 md:h-10" />
                      </div>
                      <h4 className="text-xl md:text-2xl font-bn font-black text-white italic group-hover:text-primary transition-colors">{c.name}</h4>
                      <p className="text-slate-500 text-[10px] md:text-xs font-bold mt-2 en-font uppercase tracking-widest">{c.count}</p>
                   </motion.div>
                </Link>
              ))}
           </div>

           <div className="mt-16 md:mt-20 text-center">
              <Link to="/categories" className="btn btn-primary h-16 md:h-20 px-8 md:px-16 rounded-[2rem] md:rounded-[2.5rem] text-lg md:text-xl font-black shadow-2xl shadow-primary/30">
                 সকল ক্যাটাগরি দেখুন <ArrowRight className="w-6 h-6 md:w-8 md:h-8 ml-3 md:ml-4" />
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
