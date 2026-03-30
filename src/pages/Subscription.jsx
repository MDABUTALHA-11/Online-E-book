import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, ShieldCheck, Mail, ArrowRight, UserPlus, Heart } from 'lucide-react';

const Subscription = () => {
  const plans = [
    {
      name: 'Free Plan',
      price: '৳০',
      period: 'সারাজীবন',
      desc: 'শিক্ষার্থীদের জন্য মৌলিক সুবিধা',
      features: ['অফুরন্ত হ্যান্ডনোট পড়ার সুযোগ', 'সাপ্তাহিক নতুন আপডেট', 'বিগত বছরের প্রশ্ন ব্যাংক', 'মোবাইল ফ্রেন্ডলি অ্যাপ', 'সীমিত ডাউনলোড সুবিধা'],
      color: 'bg-white text-slate-800 border-slate-100',
      btnStyle: 'btn-outline border-slate-200 text-slate-800 hover:bg-slate-50'
    },
    {
      name: 'VIP Member',
      price: '৳৯৯',
      period: 'প্রতি মাস',
      desc: 'এক্সক্লুসিভ নোট এবং সুবিধা',
      features: ['সেরা শিক্ষকদের প্রিমিয়াম নোট', 'সরাসরি আনলিমিটেড ডাউনলোড', 'অ্যাড-ফ্রি প্রিমিয়াম অভিজ্ঞতা', 'ভিআইপি স্টুডেন্ট সাপোর্ট', 'এক্সক্লুসিভ সাজেশন শিট', 'প্রিন্ট করার সুবিধা'],
      featured: true,
      color: 'bg-primary text-white shadow-2xl shadow-primary/30',
      btnStyle: 'bg-white text-primary hover:bg-slate-100'
    },
    {
      name: 'Success Plus',
      price: '৳৪৯',
      period: 'প্রতি মাস',
      desc: 'ভালো প্রস্তুতির অতিরিক্ত সুবিধা',
      features: ['অধ্যায়ভিত্তিক স্পেশাল টিপস', 'আর্টিফিশিয়াল ইন্টেলিজেন্স সাপোর্ট', 'গুরুত্বপূর্ণ এক্সাম কিট', 'মান্থলি মডেল টেস্ট', 'বিজ্ঞাপন মুক্ত পড়াশোনা'],
      color: 'bg-white text-slate-800 border-slate-100',
      btnStyle: 'btn-primary'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pb-40">
      {/* Premium Hero Section */}
      <section className="relative bg-slate-950 pt-32 md:pt-48 pb-20 md:pb-32 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] -mr-80 -mt-80 animate-pulse-soft" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px] -ml-40 -mb-40 animate-pulse-soft delay-1000" />
        
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 text-primary rounded-full text-[10px] font-black en-font mb-10 border border-white/10 tracking-[0.2em] uppercase shadow-2xl">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" /> Unlock Your Potential
              </div>
              <h1 className="text-white text-5xl md:text-7xl lg:text-[6.5rem] font-bn font-black mb-10 italic leading-[0.9] tracking-tighter">
                আপনার মেধা, <br />
                <span className="text-primary italic">আমাদের সেরা নোট</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 font-bn italic leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12">
                শাইফলির VIP মেম্বারশিপ নিয়ে আপনার রেজাল্টকে নিয়ে যান এক অনন্য উচ্চতায়। হ্যান্ডনোট থেকে শুরু করে এক্সক্লুসিভ সাজেশন—সব এক জায়গায়।
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                 <a href="#plans" className="btn btn-primary h-14 md:h-20 px-10 md:px-16 text-lg md:text-2xl rounded-2xl shadow-[0_20px_50px_-15px_rgba(16,185,129,0.5)] hover:scale-105 transition-transform flex items-center gap-4">
                    পরিকল্পনা দেখুন <ArrowRight className="w-7 h-7" />
                 </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 flex justify-center"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-1000" />
                <img 
                  src="/images/vip_plan.png" 
                  alt="VIP Subscription Illustration" 
                  className="relative w-full max-w-md md:max-w-lg object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,0.5)] animate-float"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="pt-32 container mx-auto max-w-7xl px-6">
        <div className="text-center mb-24">
           <h2 className="text-4xl md:text-6xl font-bn font-black text-slate-800 mb-6 italic leading-tight">আপনার জন্য সঠিক <span className="text-primary italic">পরিকল্পনা</span> বেছে নিন</h2>
           <p className="text-xl text-slate-500 font-bn italic">কোনো লুকানো চার্জ নেই, যেকোনো সময় বাতিল করা যাবে।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-1 rounded-[3.5rem] ${plan.featured ? 'bg-gradient-to-br from-primary via-primary/80 to-primary/40 shadow-2xl scale-105' : 'bg-white shadow-xl shadow-slate-200/50'}`}
            >
              <div className={`p-10 md:p-12 h-full rounded-[3.25rem] flex flex-col ${plan.featured ? 'text-white' : 'bg-white text-slate-800 border border-slate-50'}`}>
                {plan.featured && (
                   <div className="bg-white/20 self-start px-5 py-1.5 rounded-full text-[10px] font-black en-font tracking-[0.2em] uppercase mb-8 border border-white/20">
                      Most Popular Plan
                   </div>
                )}
                
                <h3 className={`text-2xl md:text-3xl font-bn font-black mb-4 italic ${plan.featured ? 'text-white' : 'text-slate-800'}`}>
                   {plan.name}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-8">
                  <span className="text-5xl md:text-6xl font-bn font-black italic">{plan.price}</span>
                  <span className={`text-base font-bold italic opacity-60 ${plan.featured ? 'text-white' : 'text-slate-500'}`}>/ {plan.period}</span>
                </div>
                
                <p className={`text-lg mb-10 italic leading-relaxed ${plan.featured ? 'text-white/80' : 'text-slate-500'}`}>
                  {plan.desc}
                </p>
                
                <div className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-4 group">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110 ${plan.featured ? 'bg-white/20 text-white' : 'bg-primary/10 text-primary'}`}>
                        <Check className="w-3.5 h-3.5" />
                      </div>
                      <span className="text-base md:text-lg font-bn font-bold italic opacity-90">{f}</span>
                    </div>
                  ))}
                </div>

                <button className={`btn btn-lg h-16 md:h-20 rounded-2xl text-xl font-bn font-black transition-all hover:scale-105 shadow-xl ${plan.btnStyle}`}>
                  শুরু করুন <ArrowRight className="w-6 h-6 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Features Banner */}
        <div className="mt-32 p-12 md:p-24 bg-slate-100 rounded-[5rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center shadow-inner">
           {[
             { icon: Zap, title: 'ফাস্ট এক্সেস', desc: 'সুপার ফাস্ট লোডিং স্পিড' },
             { icon: ShieldCheck, title: 'সম্পূর্ণ নিরাপদ', desc: 'শতভাগ ভেরিফাইড পেমেন্ট' },
             { icon: Heart, title: 'ছাত্রবান্ধব', desc: 'সহজ ও কার্যকর পদ্ধতি' },
             { icon: UserPlus, title: 'সহজ জয়েনিং', desc: 'এক ক্লিকেই মেম্বারশিপ' }
           ].map((item, idx) => (
             <div key={idx} className="group">
                <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 text-primary shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                  <item.icon className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-bn font-black mb-2 italic text-slate-800">{item.title}</h4>
                <p className="text-slate-400 font-bn italic">{item.desc}</p>
             </div>
           ))}
        </div>

        {/* Newsletter / CTA */}
        <div className="mt-32 p-12 md:p-32 bg-slate-950 rounded-[6rem] flex flex-col items-center text-center text-white relative overflow-hidden shadow-2xl border border-white/5">
           <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px] -mr-40 -mt-40" />
           <div className="max-w-4xl relative z-10">
              <Mail className="w-16 h-16 text-primary mb-10" />
              <h2 className="text-4xl md:text-7xl font-bn font-black mb-8 italic leading-none tracking-tighter">নতুন কিছু মিস করবেন না!</h2>
              <p className="text-xl md:text-2xl text-slate-400 font-bn italic mb-12 leading-relaxed">
                 আমাদের নিউজলেটারে সাবস্ক্রাইব করুন এবং প্রতি সপ্তাহে নতুন সব নোট ও টিপস সরাসরি আপনার ইনবক্সে পান।
              </p>
              <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl mx-auto">
                 <input 
                   type="email" 
                   placeholder="আপনার ইমেইল ঠিকানা দিন..." 
                   className="flex-1 h-16 md:h-20 px-10 rounded-2xl bg-white/5 border-2 border-white/10 focus:border-primary focus:bg-white/10 focus:outline-none text-xl transition-all"
                 />
                 <button className="btn btn-primary h-16 md:h-20 px-12 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">সাবস্ক্রাইব</button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;
