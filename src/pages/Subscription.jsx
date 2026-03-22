import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, ShieldCheck, Mail, ArrowRight, UserPlus, Heart } from 'lucide-react';

const Subscription = () => {
  const plans = [
    {
      name: 'Free Plan',
      price: '৳০',
      desc: 'শিক্ষার্থীদের জন্য মৌলিক সুবিধা',
      features: ['অফুরন্ত হ্যান্ডনোট পড়ার সুযোগ', 'সাপ্তাহিক নতুন আপডেট', 'বিগত বছরের প্রশ্ন ব্যাংক', 'মোবাইল ফ্রেন্ডলি অ্যাপ'],
      color: 'bg-slate-100/50 text-slate-800'
    },
    {
      name: 'VIP Member',
      price: '৳৯৯',
      desc: 'এক্সক্লুসিভ নোট এবং সুবিধা',
      features: ['সেরা শিক্ষকদের প্রিমিয়াম নোট', 'সরাসরি প্রিন্ট বা ডাউনলোড', 'অ্যাড-ফ্রি অভিজ্ঞতা', 'ভিআইপি স্টুডেন্ট সাপোর্ট'],
      featured: true,
      color: 'bg-primary text-white shadow-2xl shadow-primary/30 scale-110'
    },
    {
      name: 'Student Plus',
      price: '৳৪৯',
      desc: 'ভালো প্রস্তুতির অতিরিক্ত সুবিধা',
      features: ['অধ্যায়ভিত্তিক সাজেশন্স', 'আর্টিফিশিয়াল ইন্টেলিজেন্স সাপোর্ট', 'গুরুত্বপূর্ণ এক্সাম টিপস', 'মান্থলি এক্সাম কিট'],
      color: 'bg-slate-100/50 text-slate-800'
    }
  ];

  return (
    <div className="pt-24 min-h-screen">
      <section className="section-padding">
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 px-8 py-2 bg-yellow-400/10 text-yellow-600 rounded-full text-sm font-black mb-8 animate-pulse italic border-2 border-yellow-400/10"
            >
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-500" /> এক্সক্লুসিভ মেম্বারশিপ
            </motion.div>
            <h1 className="text-4xl md:text-7xl font-bn font-black mb-8 leading-tight italic">আপনার পড়াশোনাকে আরও এক ধাপ <span className="gradient-text">এগিয়ে নিন</span></h1>
            <p className="text-xl text-slate-500 max-w-2xl mx-auto italic mb-12">
              শাইফলির মেম্বারশিপ নিয়ে আপনার পড়াশোনাকে আরও সহজ এবং দ্রুততর করুন। পছন্দের সাবস্ক্রিপশন বেছে নিন।
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16 items-center px-6 lg:px-20">
            {plans.map((plan, i) => (
              <motion.div 
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-12 rounded-[4rem] text-center relative overflow-hidden flex flex-col h-full border-2 ${plan.featured ? 'border-primary' : 'border-slate-50'}`}
              >
                <div className={`flex flex-col flex-grow ${plan.color} ${plan.color.includes('bg-primary') ? 'p-12' : 'p-0'}`}>
                  {plan.featured && (
                    <div className="absolute top-10 right-10 bg-white/20 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-lg">POPULAR</div>
                  )}
                  <h3 className={`text-2xl font-bn font-black mb-4 italic ${plan.featured ? 'text-white' : 'text-slate-800'}`}>{plan.name}</h3>
                  <div className="flex justify-center items-end gap-2 mb-8">
                    <span className={`text-5xl font-black italic ${plan.featured ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                    <span className={`text-sm opacity-60 font-bold ${plan.featured ? 'text-white' : 'text-slate-500'}`}>/ মাসে</span>
                  </div>
                  <p className={`text-lg mb-12 leading-relaxed italic ${plan.featured ? 'text-white/80' : 'text-slate-500'}`}>{plan.desc}</p>
                  
                  <div className="space-y-6 mb-16 text-left max-w-xs mx-auto">
                    {plan.features.map((f) => (
                      <div key={f} className="flex items-center gap-4 group">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 shadow-sm ${plan.featured ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                          <Check className="w-4 h-4" />
                        </div>
                        <span className={`text-lg font-bold italic ${plan.featured ? 'text-white/90' : 'text-slate-600'}`}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button className={`mt-auto btn btn-lg w-full py-5 text-xl font-bn font-black rounded-[2rem] transition-all hover:scale-105 shadow-xl ${plan.featured ? 'bg-white text-primary hover:bg-slate-100 shadow-white/10' : 'btn-primary shadow-primary/20'}`}>
                    সবগুলো দেখুন <ArrowRight className="w-6 h-6 ml-2" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-40 p-12 md:p-32 bg-slate-100 rounded-[5rem] flex flex-col lg:flex-row items-center justify-between gap-16 relative overflow-hidden shadow-2xl">
             <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-3 px-8 py-2 bg-primary/10 text-primary rounded-full text-sm font-black mb-8 italic shadow-sm shadow-primary/10">
                  <Mail className="w-5 h-5" /> সংবাদপত্র সাবস্ক্রিপশন
                </div>
                <h2 className="text-4xl md:text-6xl font-bn font-black mb-8 leading-tight italic">নতুন কোনো নোট মিস করবেন <span className="text-primary italic">না কখনোই!</span></h2>
                <div className="relative group max-w-md">
                   <input type="email" placeholder="আপনার ইমেইল ঠিকানা দিন..." className="w-full h-20 pl-16 pr-6 rounded-[2rem] border-4 border-slate-200 focus:border-primary focus:outline-none text-xl transition-all shadow-xl shadow-black/5" />
                   <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-7 h-7" />
                </div>
                <button className="mt-8 btn btn-primary btn-lg rounded-[2rem] px-12 h-20 text-xl font-bold shadow-2xl shadow-primary/20 hover:scale-105 transition-transform">সাবস্ক্রাইব করুন</button>
             </div>
             <div className="lg:w-1/2 text-center">
                <div className="grid grid-cols-2 gap-8">
                   <div className="glass p-10 rounded-[3rem] text-primary hover:scale-110 transition-transform shadow-2xl">
                      <Zap className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="text-2xl font-black font-bn mb-2 italic">Fast access</h4>
                      <p className="text-slate-400 text-xs">সুপার ফাস্ট ডাউনলোড</p>
                   </div>
                   <div className="glass p-10 rounded-[3rem] text-secondary hover:scale-110 transition-transform shadow-2xl">
                      <ShieldCheck className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="text-2xl font-black font-bn mb-2 italic">Secure</h4>
                      <p className="text-slate-400 text-xs">১০০% ভেরিফাইড নোট</p>
                   </div>
                   <div className="glass p-10 rounded-[3rem] text-accent hover:scale-110 transition-transform shadow-2xl">
                      <Heart className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="text-2xl font-black font-bn mb-2 italic">Loved by users</h4>
                      <p className="text-slate-400 text-xs">ছাত্রদের পরম বিশ্বাস</p>
                   </div>
                   <div className="glass p-10 rounded-[3rem] text-slate-800 hover:scale-110 transition-transform shadow-2xl">
                      <UserPlus className="w-12 h-12 mx-auto mb-4" />
                      <h4 className="text-2xl font-black font-bn mb-2 italic">Easy join</h4>
                      <p className="text-slate-400 text-xs">সহজ রেজিস্ট্রেশন</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;
