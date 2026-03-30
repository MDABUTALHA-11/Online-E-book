import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, CheckCircle, Target, ArrowRight, Brain, BookOpen, GraduationCap, Rocket, Zap, Coffee, Moon, Star, PenTool, BarChart2, Headphones, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Tips = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'SSC', 'HSC', 'Study Hacks', 'Health'];

  const tips = [
    {
      title: 'রুটিন মাফিক পড়ালেখা করুন',
      desc: 'প্রতিদিন নির্দিষ্ট সময়ে পড়ার অভ্যাস গড়ে তুলুন। রুটিন থাকলে পড়ার প্রতি মনোযোগ বাড়ে এবং সময়ের সঠিক ব্যবহার নিশ্চিত হয়। সকালে ঘুম থেকে উঠে প্রথম ২ ঘণ্টা কঠিন বিষয় পড়ুন।',
      icon: Clock,
      category: 'Study Hacks',
      tag: 'Time Management',
      color: 'from-blue-500/10 to-blue-500/5',
      iconBg: 'bg-blue-500',
    },
    {
      title: 'নিজস্ব শর্টনোট তৈরি করুন',
      desc: 'পড়ার পাশাপাশি নিজের ভাষায় একটি নোট রাখুন। গুরুত্বপূর্ণ তথ্যগুলো নিজের কথায় লিখে রাখলে মনে রাখতে সুবিধা হয় এবং পরীক্ষার আগে রিভিশন দিতে সময় বাঁচে।',
      icon: PenTool,
      category: 'Study Hacks',
      tag: 'Note Taking',
      color: 'from-emerald-500/10 to-emerald-500/5',
      iconBg: 'bg-emerald-500',
    },
    {
      title: 'বিগত বছরের প্রশ্ন সমাধান করুন',
      desc: 'বিগত ১০ বছরের প্রশ্নগুলো সমাধান করলে পরীক্ষার প্যাটার্ন সম্পর্কে স্পষ্ট ধারণা পাওয়া যায়। এটি আত্মবিশ্বাস বৃদ্ধি করে এবং কমন প্রশ্ন চেনার দক্ষতা তৈরি হয়।',
      icon: Target,
      category: 'SSC',
      tag: 'Practice',
      color: 'from-rose-500/10 to-rose-500/5',
      iconBg: 'bg-rose-500',
    },
    {
      title: 'পর্যাপ্ত ঘুম ও বিশ্রাম নিন',
      desc: 'মস্তিষ্ককে সজীব রাখতে প্রতিদিন ৭-৮ ঘণ্টা ঘুম প্রয়োজন। একটানা দীর্ঘসময় না পড়ে প্রতি ৪৫ মিনিটে ১০ মিনিট বিরতি নিন। এতে মনের একাগ্রতা বজায় থাকে।',
      icon: Moon,
      category: 'Health',
      tag: 'Well-being',
      color: 'from-purple-500/10 to-purple-500/5',
      iconBg: 'bg-purple-500',
    },
    {
      title: 'Pomodoro পদ্ধতিতে পড়ুন',
      desc: '২৫ মিনিট গভীর মনোযোগ দিয়ে পড়ুন, তারপর ৫ মিনিট বিরতি নিন। ৪টি চক্র পার হলে ১৫-৩০ মিনিটের বড় বিরতি নিন। এই পদ্ধতিতে মনোযোগ বহুগুণে বৃদ্ধি পায়।',
      icon: Zap,
      category: 'Study Hacks',
      tag: 'Productivity',
      color: 'from-yellow-500/10 to-yellow-500/5',
      iconBg: 'bg-yellow-500',
    },
    {
      title: 'গ্রুপ স্টাডি করুন',
      desc: 'বন্ধুদের সাথে গ্রুপ স্টাডি করুন। একে অপরকে পড়িয়ে দেওয়া হলো বোঝার সেরা উপায়। কঠিন অধ্যায়গুলো আলোচনা করলে সহজেই বোঝা যায় এবং নতুন দৃষ্টিভঙ্গি পাওয়া যায়।',
      icon: Heart,
      category: 'HSC',
      tag: 'Collaboration',
      color: 'from-pink-500/10 to-pink-500/5',
      iconBg: 'bg-pink-500',
    },
    {
      title: 'দুর্বল বিষয়কে প্রাধান্য দিন',
      desc: 'যে বিষয়ে দুর্বল সেটিকে বেশি সময় দিন। শক্তিশালী বিষয় পড়া সহজ মনে হলেও দুর্বল বিষয়ে উন্নতি না করলে ফলাফলে পিছিয়ে পড়বেন।',
      icon: BarChart2,
      category: 'SSC',
      tag: 'Strategy',
      color: 'from-indigo-500/10 to-indigo-500/5',
      iconBg: 'bg-indigo-500',
    },
    {
      title: 'স্বাস্থ্যকর সকালের রুটিন মানুন',
      desc: 'সকালে ঘুম থেকে উঠে হালকা ব্যায়াম করুন, প্রচুর পানি পান করুন এবং পুষ্টিকর খাবার খান। সুস্বাস্থ্য মেধার বিকাশে সবচেয়ে বড় ভূমিকা রাখে।',
      icon: Coffee,
      category: 'Health',
      tag: 'Morning Routine',
      color: 'from-orange-500/10 to-orange-500/5',
      iconBg: 'bg-orange-500',
    },
    {
      title: 'লক্ষ্য নির্ধারণ করুন',
      desc: 'প্রতিদিন, প্রতি সপ্তাহ ও প্রতি মাসের জন্য আলাদা আলাদা লক্ষ্য নির্ধারণ করুন। ছোট ছোট লক্ষ্য অর্জন অনুপ্রেরণা বাড়ায়। একটি ডায়েরিতে লিখে রাখুন এবং নিয়মিত পর্যালোচনা করুন।',
      icon: Star,
      category: 'HSC',
      tag: 'Goal Setting',
      color: 'from-teal-500/10 to-teal-500/5',
      iconBg: 'bg-teal-500',
    },
    {
      title: 'Focus Music ব্যবহার করুন',
      desc: 'পড়ার সময় Lo-fi বা প্রকৃতির শব্দ (বৃষ্টি, পাখির গান) চালু রাখলে মনোযোগ বাড়ে। তবে গান শুনলে বাংলা বা ইংরেজি গান এড়িয়ে চলুন, কারণ এগুলো মনোযোগ বিচ্ছিন্ন করে।',
      icon: Headphones,
      category: 'Study Hacks',
      tag: 'Focus',
      color: 'from-cyan-500/10 to-cyan-500/5',
      iconBg: 'bg-cyan-500',
    },
  ];

  const filtered = activeCategory === 'All' ? tips : tips.filter(t => t.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-40">
      {/* Hero Section with Image */}
      <section className="relative bg-slate-950 pt-32 md:pt-40 pb-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -mr-80 -mt-80 animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] -ml-40 animate-pulse-soft delay-1000" />

        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Text Side */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="pb-20 md:pb-32 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 text-primary rounded-full text-[10px] font-black en-font mb-10 border border-white/10 tracking-[0.2em] uppercase shadow-2xl">
                <Lightbulb className="w-4 h-4 animate-pulse" /> Academic Tips & Tricks
              </div>
              <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bn font-black mb-8 italic leading-none tracking-tighter">
                পড়ার সেরা <span className="text-primary italic">কৌশল</span>সমূহ
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 font-bn italic leading-relaxed mb-12 max-w-2xl mx-auto lg:mx-0">
                পরীক্ষায় ভালো ফলাফলের জন্য বিশেষজ্ঞ শিক্ষকদের পরামর্শমতো সেরা পড়ার পদ্ধতিগুলো জেনে নিন।
              </p>
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-6 py-2.5 rounded-full text-xs font-black en-font tracking-[0.15em] uppercase transition-all border ${
                      activeCategory === cat
                        ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30 scale-105'
                        : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </motion.div>

            {/* Image Side */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="hidden lg:flex items-end justify-center"
            >
              <img
                src="/images/tips_bg.png"
                alt="Student Study Tips"
                className="w-full max-w-lg object-contain drop-shadow-[0_40px_80px_rgba(16,185,129,0.3)] rounded-t-[4rem]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Tips Grid */}
      <div className="container mx-auto max-w-7xl px-6 -mt-10 relative z-20">
        {/* Count Info */}
        <div className="flex items-center gap-4 mb-12 mt-16">
          <div className="h-px flex-1 bg-slate-200" />
          <span className="text-slate-400 font-black en-font text-xs tracking-[0.2em] uppercase whitespace-nowrap">
            Showing {filtered.length} Expert Tips
          </span>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((tip, index) => (
            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07, duration: 0.4 }}
              className={`group relative bg-gradient-to-br ${tip.color} border border-slate-100 rounded-[3rem] p-8 md:p-10 hover:shadow-2xl hover:shadow-slate-200/60 hover:-translate-y-2 transition-all duration-500 overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/30 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex gap-6 items-start">
                <div className={`flex-shrink-0 w-14 h-14 md:w-16 md:h-16 ${tip.iconBg} rounded-2xl flex items-center justify-center text-white shadow-xl shadow-black/10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  <tip.icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[9px] font-black en-font tracking-[0.25em] uppercase text-slate-400 mb-3 bg-white/60 px-4 py-1 rounded-full border border-slate-100">
                    {tip.tag}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bn font-black mb-3 text-slate-800 italic group-hover:text-primary transition-colors leading-tight">
                    {tip.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-500 leading-relaxed font-bn italic">
                    {tip.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 md:mt-32 grid grid-cols-1 lg:grid-cols-2 gap-0 bg-slate-950 rounded-[3rem] lg:rounded-[5rem] overflow-hidden shadow-2xl border border-white/5">
          <div className="p-12 md:p-20 flex flex-col justify-center relative">
            <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 border border-primary/20">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl md:text-5xl font-bn font-black text-white italic mb-6 leading-tight">
                পড়াশোনায় আরো <span className="text-primary">এগিয়ে যান</span> শাইফলির সাথে।
              </h2>
              <p className="text-slate-400 font-bn italic text-lg leading-relaxed mb-10">
                প্রিমিয়াম নোট, বিশেষজ্ঞ শিক্ষকের গাইড এবং এক্সক্লুসিভ সাজেশন পেতে আজই ভিআইপি মেম্বার হন।
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/subscription" className="btn btn-primary h-14 px-10 rounded-2xl text-base font-bn font-black shadow-2xl shadow-primary/30 hover:scale-105 transition-transform flex items-center gap-3">
                  VIP মেম্বার হন <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/categories" className="btn h-14 px-10 rounded-2xl border border-white/10 text-white hover:bg-white/10 transition-all text-base font-bn italic">
                  নোটস দেখুন
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative overflow-hidden">
            <img
              src="/images/tips_bg.png"
              alt="Study"
              className="w-full h-full object-cover object-center opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
