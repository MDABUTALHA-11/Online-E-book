import React from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, Clock, CheckCircle, Target, ArrowRight, Brain, BookOpen, GraduationCap, Rocket } from 'lucide-react';

const Tips = () => {
  const categories = [
    { title: 'SSC Preparation', icon: Brain, color: 'text-primary' },
    { title: 'HSC Strategy', icon: GraduationCap, color: 'text-secondary' },
    { title: 'Study Hack', icon: Rocket, color: 'text-accent' },
    { title: 'Exam Guide', icon: Lightbulb, color: 'text-yellow-500' }
  ];

  const tips = [
    { 
      title: 'রুটিন মাফিক পড়ালেখা করা', 
      desc: 'প্রতিদিন নির্দিষ্ট সময়ে পড়ার অভ্যাস গড়ে তুলুন। রুটিন থাকলে পড়ার প্রতি মনোযোগ বাড়ে এবং সময়ের সঠিক ব্যবহার নিশ্চিত হয়।',
      icon: Clock,
      category: 'Time Management'
    },
    { 
      title: 'নিজস্ব নোট তৈরি করা', 
      desc: 'পড়ার পাশাপাশি নিজস্ব একটি নোট খাতা রাখুন। গুরুত্বপূর্ণ তথ্যগুলো নিজের ভাষায় লিখে রাখলে তা মনে রাখতে সুবিধা হয়।',
      icon: BookOpen,
      category: 'Flashcards'
    },
    { 
      title: 'বিগত বছরের প্রশ্ন সমাধান', 
      desc: 'বিগত বছরের প্রশ্নগুলো সমাধান করলে পরীক্ষার প্রশ্ন সম্পর্কে একটি পরিষ্কার ধারণা পাওয়া যায় এবং আত্মবিশ্বাস বৃদ্ধি পায়।',
      icon: Target,
      category: 'Practice'
    },
    { 
      title: 'পর্যাপ্ত বিশ্রাম এবং ঘুম', 
      desc: 'মস্তিষ্ককে সজীব রাখতে নিয়মিত পর্যাপ্ত বিশ্রাম এবং ঘুমের প্রয়োজন। একটানা দীর্ঘসময় না পড়ে মাঝে মাঝে বিরতি নিন।',
      icon: CheckCircle,
      category: 'Health'
    }
  ];

  return (
    <div className="pt-24 min-h-screen">
      <section className="section-padding bg-white">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-primary rounded-[3rem] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/30 mb-24"
          >
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mt-32" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-black/10 rounded-full blur-3xl -mr-32 -mb-32" />
            <h1 className="text-4xl md:text-7xl font-bn font-black mb-6 leading-tight">একাডেমিক টিপস এন্ড <span className="opacity-60 italic">ট্রিকস</span></h1>
            <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto italic mb-10 leading-relaxed">
              পরীক্ষায় ভালো ফলাফল করার সেরা কিছু উপায় এবং পড়াশোনার কার্যকরী পদ্ধতিসমূহ।
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((c) => (
                <div key={c.title} className="bg-white/10 px-6 py-2 rounded-full border border-white/20 text-sm font-bold flex items-center gap-2 hover:bg-white/20 transition-all cursor-pointer">
                  <c.icon className="w-4 h-4" /> {c.title}
                </div>
              ))}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {tips.map((tip, index) => (
              <motion.div 
                key={tip.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex gap-8 p-10 rounded-[3rem] border-2 border-slate-50 hover:border-primary/20 hover:bg-primary/5 transition-all shadow-xl hover:shadow-2xl"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary shadow-lg shadow-black/5 group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-6">
                  <tip.icon className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-black text-primary/60 uppercase tracking-widest mb-3 block">{tip.category}</span>
                  <h3 className="text-2xl md:text-3xl font-bn font-black mb-4 text-slate-800 italic group-hover:text-primary transition-colors">{tip.title}</h3>
                  <p className="text-lg text-slate-500 leading-relaxed mb-6 italic">{tip.desc}</p>
                  <button className="flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all">
                    বিস্তারিত পড়ুন <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-32 p-12 md:p-24 bg-slate-950 rounded-[4rem] text-center text-white relative overflow-hidden shadow-2xl">
             <div className="max-w-4xl mx-auto">
                <Brain className="w-20 h-20 text-primary mx-auto mb-10 animate-pulse" />
                <h2 className="text-4xl md:text-6xl font-bn font-black mb-8 italic">পড়াশোনায় মনোযোগ ফিরুক <span className="text-primary italic">শাইফলির সাথে।</span></h2>
                <div className="w-24 h-1.5 bg-primary mx-auto rounded-full mb-12 shadow-md shadow-primary/20" />
                <p className="text-xl text-slate-400 mb-12 italic leading-relaxed">
                  আমরা শুধু হ্যান্ডনোট দিই না, বরং শিক্ষার্থীদের পড়ার পদ্ধতি উন্নত করতেও সাহায্য করি। আপনার পড়াশোনার সঙ্গী হতে পেরে আমরা গর্বিত।
                </p>
                <button className="btn btn-primary btn-lg rounded-2xl px-12 shadow-xl shadow-primary/20 hover:scale-105 transition-transform font-bold text-xl">আরও টিপস দেখুন</button>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tips;
