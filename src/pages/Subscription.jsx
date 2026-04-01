import React from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, ShieldCheck, Mail, ArrowRight, UserPlus, Heart } from 'lucide-react';
import usePageSEO from '../hooks/usePageSEO';

const Subscription = () => {
  usePageSEO({
    title: 'সাবস্ক্রিপশন — Shaifly Library',
    description: 'শাইফলির VIP মেম্বারশিপ নিয়ে আপনার রেজাল্টকে নিয়ে যান এক অনন্য উচ্চতায়।',
    keywords: 'VIP, Subscription, Premium Notes, Shaifly, Exam Prep',
  });

  const plans = [
    {
      name: 'Free Plan',
      price: '৳০',
      period: 'সারাজীবন',
      desc: 'শিক্ষার্থীদের জন্য মৌলিক সুবিধা',
      features: ['অফুরন্ত হ্যান্ডনোট পড়ার সুযোগ', 'সাপ্তাহিক নতুন আপডেট', 'বিগত বছরের প্রশ্ন ব্যাংক', 'মোবাইল ফ্রেন্ডলি অ্যাপ', 'সীমিত ডাউনলোড সুবিধা'],
      color: 'bg-[#0d1b2a] text-white border border-[#1e3a5f]',
      btnStyle: 'bg-[#112236] text-[#22C55E] border border-[#1e3a5f] hover:bg-[#1e3a5f]',
      textColor: 'text-white',
      mutedColor: 'text-[#64748b]',
      iconColor: 'text-[#22C55E] bg-[rgba(34,197,94,0.1)]'
    },
    {
      name: 'VIP Member',
      price: '৳৯৯',
      period: 'প্রতি মাস',
      desc: 'এক্সক্লুসিভ নোট এবং সুবিধা',
      features: ['সেরা শিক্ষকদের প্রিমিয়াম নোট', 'সরাসরি আনলিমিটেড ডাউনলোড', 'অ্যাড-ফ্রি প্রিমিয়াম অভিজ্ঞতা', 'ভিআইপি স্টুডেন্ট সাপোর্ট', 'এক্সক্লুসিভ সাজেশন শিট', 'প্রিন্ট করার সুবিধা'],
      featured: true,
      color: 'bg-[#22C55E] text-white shadow-2xl shadow-[#22C55E]/30',
      btnStyle: 'bg-white text-[#22C55E] hover:bg-slate-100',
      textColor: 'text-white',
      mutedColor: 'text-white/80',
      iconColor: 'text-[#22C55E] bg-white'
    },
    {
      name: 'Success Plus',
      price: '৳৪৯',
      period: 'প্রতি মাস',
      desc: 'ভালো প্রস্তুতির অতিরিক্ত সুবিধা',
      features: ['অধ্যায়ভিত্তিক স্পেশাল টিপস', 'আর্টিফিশিয়াল ইন্টেলিজেন্স সাপোর্ট', 'গুরুত্বপূর্ণ এক্সাম কিট', 'মান্থলি মডেল টেস্ট', 'বিজ্ঞাপন মুক্ত পড়াশোনা'],
      color: 'bg-[#0d1b2a] text-white border border-[#1e3a5f]',
      btnStyle: 'bg-[#22C55E] text-white hover:bg-[#16a34a]',
      textColor: 'text-white',
      mutedColor: 'text-[#64748b]',
      iconColor: 'text-[#22C55E] bg-[rgba(34,197,94,0.1)]'
    }
  ];

  return (
    <div className="min-h-screen pb-40 text-[#f1f5f9]">
      {/* Premium Hero Section */}
      <section className="relative pt-12 md:pt-20 pb-20 md:pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[150px] -mr-80 -mt-80 animate-pulse-soft pointer-events-none" style={{ background: 'rgba(34,197,94,0.1)' }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full blur-[120px] -ml-40 -mb-40 animate-pulse-soft delay-1000 pointer-events-none" style={{ background: 'rgba(14,165,233,0.1)' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:w-1/2 text-center lg:text-left"
            >
              <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full text-[10px] font-black en-font mb-10 tracking-[0.2em] uppercase shadow-sm" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)', color: '#22C55E' }}>
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 animate-pulse" /> Unlock Your Potential
              </div>
              <h1 className="text-white text-5xl md:text-7xl lg:text-[6.5rem] font-bn font-black mb-10 italic leading-[0.9] tracking-tighter">
                আপনার মেধা, <br />
                <span className="italic" style={{ color: '#22C55E' }}>আমাদের সেরা নোট</span>
              </h1>
              <p className="text-xl md:text-2xl font-bn italic leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12" style={{ color: '#64748b' }}>
                শাইফলির VIP মেম্বারশিপ নিয়ে আপনার রেজাল্টকে নিয়ে যান এক অনন্য উচ্চতায়। হ্যান্ডনোট থেকে শুরু করে এক্সক্লুসিভ সাজেশন—সব এক জায়গায়।
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                 <a href="#plans" className="h-14 md:h-16 px-10 rounded-2xl text-[16px] md:text-xl font-bn font-black text-white hover:scale-105 transition-transform flex items-center justify-center gap-3" style={{ background: '#22C55E', boxShadow: '0 6px 25px rgba(34,197,94,0.4)' }}>
                    পরিকল্পনা দেখুন <ArrowRight className="w-5 h-5" />
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
                <div className="absolute inset-0 blur-[100px] rounded-full transition-all duration-1000" style={{ background: 'rgba(34,197,94,0.2)' }} />
                <img 
                  src="https://images.unsplash.com/photo-1546410531-bea5aad675ce?q=80&w=1400&auto=format&fit=crop" 
                  alt="VIP Subscription" 
                  className="relative w-full max-w-md md:max-w-lg object-cover h-[400px] md:h-[500px] rounded-[3rem] border border-[#1e3a5f]"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="plans" className="pt-20 md:pt-32 container mx-auto px-6">
        <div className="text-center mb-16 md:mb-24">
           <h2 className="text-4xl md:text-6xl font-bn font-black text-white mb-6 italic leading-tight">আপনার জন্য সঠিক <span className="italic" style={{ color: '#22C55E' }}>পরিকল্পনা</span> বেছে নিন</h2>
           <p className="text-[16px] md:text-xl font-bn italic" style={{ color: '#64748b' }}>কোনো লুকানো চার্জ নেই, যেকোনো সময় বাতিল করা যাবে।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-center">
          {plans.map((plan, i) => (
            <motion.div 
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-[1.5px] rounded-[2rem] md:rounded-[3rem] transition-all hover:-translate-y-2 ${plan.featured ? 'scale-105 z-10' : ''}`}
              style={{ background: plan.featured ? 'linear-gradient(135deg, #22C55E, #16a34a)' : '#1e3a5f' }}
            >
              <div className={`p-8 md:p-10 h-full rounded-[2rem] md:rounded-[3rem] flex flex-col ${plan.color}`}>
                {plan.featured && (
                   <div className="self-start px-4 py-1.5 rounded-full text-[10px] font-black en-font tracking-[0.2em] uppercase mb-6" style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
                      Most Popular
                   </div>
                )}
                
                <h3 className={`text-2xl md:text-3xl font-bn font-black mb-3 italic ${plan.textColor}`}>
                   {plan.name}
                </h3>
                
                <div className="flex items-baseline gap-2 mb-6">
                  <span className={`text-4xl md:text-5xl font-bn font-black italic ${plan.textColor}`}>{plan.price}</span>
                  <span className={`text-[14px] font-bold italic ${plan.mutedColor}`}>/ {plan.period}</span>
                </div>
                
                <p className={`text-[15px] mb-8 italic leading-relaxed ${plan.mutedColor}`}>
                  {plan.desc}
                </p>
                
                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f) => (
                    <div key={f} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${plan.iconColor}`}>
                        <Check className="w-3 h-3" />
                      </div>
                      <span className={`text-[15px] font-bn font-bold italic ${plan.textColor}`}>{f}</span>
                    </div>
                  ))}
                </div>

                <button className={`h-14 md:h-16 rounded-2xl text-[16px] md:text-lg font-bn font-black transition-all flex items-center justify-center w-full ${plan.btnStyle}`}>
                  শুরু করুন <ArrowRight className="w-5 h-5 ml-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global Features Banner */}
        <div className="mt-24 md:mt-32 p-10 md:p-20 rounded-[3rem] md:rounded-[4rem] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-center shadow-2xl relative overflow-hidden" style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}>
           <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(34,197,94,0.03)' }} />
           {[
             { icon: Zap, title: 'ফাস্ট এক্সেস', desc: 'সুপার ফাস্ট লোডিং স্পিড' },
             { icon: ShieldCheck, title: 'সম্পূর্ণ নিরাপদ', desc: 'শতভাগ ভেরিফাইড পেমেন্ট' },
             { icon: Heart, title: 'ছাত্রবান্ধব', desc: 'সহজ ও কার্যকর পদ্ধতি' },
             { icon: UserPlus, title: 'সহজ জয়েনিং', desc: 'এক ক্লিকেই মেম্বারশিপ' }
           ].map((item, idx) => (
             <div key={idx} className="group relative z-10 w-full sm:w-auto mx-auto border-b border-[#1e3a5f] pb-8 md:pb-0 md:border-b-0 md:border-r last:border-0 border-opacity-50 pr-0 md:pr-10 last:pr-0">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 transition-all duration-500 group-hover:scale-110 shadow-lg" style={{ background: 'rgba(34,197,94,0.1)', color: '#22C55E' }}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h4 className="text-xl md:text-2xl font-bn font-black mb-2 italic text-white">{item.title}</h4>
                <p className="text-[14px] md:text-[15px] font-bn italic" style={{ color: '#64748b' }}>{item.desc}</p>
             </div>
           ))}
        </div>

        {/* Newsletter / CTA */}
        <div className="mt-20 md:mt-32 p-10 md:p-24 rounded-[3rem] md:rounded-[4rem] flex flex-col items-center text-center text-white relative overflow-hidden shadow-2xl" style={{ background: 'linear-gradient(135deg, #0d1b2a, #060d14)', border: '1px solid #1e3a5f' }}>
           <div className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ background: 'rgba(34,197,94,0.1)', transform: 'translate(40%, -40%)' }} />
           <div className="max-w-4xl relative z-10">
              <Mail className="w-12 h-12 mb-8 mx-auto" style={{ color: '#22C55E' }} />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bn font-black mb-6 italic leading-tight">নতুন কিছু মিস করবেন না!</h2>
              <p className="text-[16px] md:text-xl font-bn italic mb-10 leading-relaxed" style={{ color: '#64748b' }}>
                 আমাদের নিউজলেটারে সাবস্ক্রাইব করুন এবং প্রতি সপ্তাহে নতুন সব নোট ও টিপস সরাসরি আপনার ইনবক্সে পান।
              </p>
              <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl mx-auto">
                 <input 
                   type="email" 
                   placeholder="আপনার ইমেইল ঠিকানা দিন..." 
                   className="flex-1 h-14 md:h-16 px-6 md:px-8 rounded-2xl text-[15px] md:text-[16px] transition-all"
                   style={{ background: '#112236', border: '1.5px solid #1e3a5f', color: '#f1f5f9', outline: 'none' }}
                   onFocus={e => e.target.style.borderColor = 'rgba(34,197,94,0.4)'}
                   onBlur={e => e.target.style.borderColor = '#1e3a5f'}
                 />
                 <button className="h-14 md:h-16 px-8 md:px-12 text-[15px] md:text-[16px] font-bold rounded-2xl transition-transform hover:-translate-y-1" style={{ background: '#22C55E', color: 'white', boxShadow: '0 6px 20px rgba(34,197,94,0.3)' }}>সাবস্ক্রাইব</button>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
};

export default Subscription;
