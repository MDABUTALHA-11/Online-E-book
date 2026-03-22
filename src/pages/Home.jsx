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
  Heart
} from 'lucide-react';
import { categories, books } from '../data/books';
import BookCard from '../components/BookCard';
import Hero from '../components/Hero';
import usePageSEO from '../hooks/usePageSEO';

const Home = () => {
  const navigate = useNavigate();
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
      <section className="relative z-10 -mt-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-[3rem] shadow-premium text-center group hover:-translate-y-3 transition-all duration-500 border border-white/50"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-slate-50 transition-colors group-hover:bg-primary shadow-inner`}>
                <stat.icon className={`w-8 h-8 ${stat.color} group-hover:text-white transition-colors`} />
               </div>
              <h4 className="text-4xl font-black mb-2 text-slate-800 en-font">{stat.value}</h4>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trending Notes Section */}
      <section className="section-padding pt-32 pb-40 relative">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
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
      <section className="bg-slate-950 py-40 rounded-[5rem] overflow-hidden relative shadow-2xl">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
           <div className="text-center mb-24 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 text-primary rounded-full text-xs font-black en-font tracking-[0.2em] mb-10 border border-white/10 shadow-2xl uppercase">
                 <Rocket className="w-5 h-5 text-primary animate-pulse" /> Launch Your Success
              </div>
              <h2 className="text-white text-4xl md:text-8xl font-bn font-black mb-8 italic leading-tight tracking-tighter">
                আপনার <span className="text-primary italic">পছন্দের ক্ষেত্রটি</span> বেছে নিন
              </h2>
              <p className="text-slate-400 text-xl font-bn italic leading-relaxed">
                আপনার কাঙ্ক্ষিত নোটগুলো খুব সহজেই খুঁজে পেতে আমরা সেগুলোকে বিভিন্ন ক্যাটাগরিতে ভাগ করেছি। 
                নিচের ক্যাটাগরিগুলো থেকে বেছে নিন আপনার প্রয়োজনীয় বিষয়টি।
              </p>
           </div>

           <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {categories.slice(0, 4).map((c, i) => (
                <Link key={c.id} to={`/subject/${c.slug}`} className="group no-underline">
                   <motion.div
                     whileHover={{ y: -10 }}
                     className="glass-dark p-12 rounded-[3.5rem] border border-white/5 hover:border-primary/20 transition-all duration-500 text-center"
                   >
                      <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 text-primary shadow-2xl ring-1 ring-white/10 group-hover:rotate-6 transition-transform">
                         <Search className="w-10 h-10" />
                      </div>
                      <h4 className="text-2xl font-bn font-black text-white italic group-hover:text-primary transition-colors">{c.name}</h4>
                      <p className="text-slate-500 text-xs font-bold mt-2 en-font uppercase tracking-widest">{c.count}</p>
                   </motion.div>
                </Link>
              ))}
           </div>

           <div className="mt-20 text-center">
              <Link to="/categories" className="btn btn-primary h-20 px-16 rounded-[2.5rem] text-xl font-black shadow-2xl shadow-primary/30">
                 সকল ক্যাটাগরি দেখুন <ArrowRight className="w-8 h-8 ml-4" />
              </Link>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
