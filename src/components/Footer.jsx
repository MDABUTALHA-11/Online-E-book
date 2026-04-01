import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Linkedin, Mail, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer id="shaifly-footer" className="w-full bg-[#020617] mt-16 md:mt-32 pt-16 md:pt-24 pb-28 md:pb-16" style={{ borderTop: '2px solid #1e3a5f' }}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        
        {/* Main Header / Branding Section */}
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-16 mb-16 md:mb-20 items-center md:items-start text-center md:text-left">
          
          {/* Logo & Bio Column */}
          <div className="flex-[1.8] min-w-[320px] md:pr-10">
            <h1 className="text-white text-[56px] md:text-[84px] font-bn font-black tracking-tighter m-0 p-0 leading-[0.8] block mb-8 italic">
              Shaifly<span className="text-[#22C55E]">.</span>
            </h1>
            <p className="text-slate-400 font-bn text-[18px] md:text-[22px] leading-[1.6] max-w-lg mx-auto md:mx-0 font-bold italic">
              শাইফলি অনলাইন লাইব্রেরি - বাংলাদেশের ছাত্রছাত্রীদের জন্য এক বিশ্বস্ত একাডেমিক নোট শেয়ারিং প্ল্যাটফর্ম। আমাদের লক্ষ্য শিক্ষা ব্যবস্থাকে আরও সহজ ও প্রযুক্তি নির্ভর করা।
            </p>
            
            {/* Social Icons matching image style - Square-Round dark boxes */}
            <div className="flex gap-4 mt-8 md:mt-12 justify-center md:justify-start">
              {[Facebook, Youtube, Linkedin, Mail].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-[48px] h-[48px] md:w-[54px] md:h-[54px] rounded-2xl bg-[#111827] border border-white/5 flex items-center justify-center text-slate-400 hover:bg-[#22C55E] hover:text-white transition-all transform hover:-translate-y-2 shadow-xl"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* QUICK LINKS Column */}
          <div className="flex-1 min-w-[200px] w-full">
            <h4 className="text-[#22C55E] font-en text-[18px] md:text-[22px] tracking-widest uppercase mb-6 md:mb-10 border-b-[3px] md:border-b-[4px] border-[#22C55E] pb-2 md:pb-3 inline-block font-black">
              QUICK LINKS
            </h4>
            <div className="flex flex-col gap-5 md:gap-8 items-center md:items-start">
              {[
                { label: 'Home', to: '/' },
                { label: 'Categories', to: '/categories' },
                { label: 'About Us', to: '/about' },
                { label: 'VIP Subscription', to: '/subscription' }
              ].map(link => (
                <Link 
                  key={link.label} 
                  to={link.to} 
                  className="text-slate-400 hover:text-[#22C55E] font-bn font-black text-[18px] md:text-[24px] no-underline transition-all block tracking-tight italic hover:translate-x-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* SUPPORT Column */}
          <div className="flex-1 min-w-[240px] w-full">
            <h4 className="text-[#22C55E] font-en text-[18px] md:text-[22px] tracking-widest uppercase mb-6 md:mb-10 border-b-[3px] md:border-b-[4px] border-[#22C55E] pb-2 md:pb-3 inline-block font-black">
              SUPPORT
            </h4>
            <div className="flex flex-col gap-5 md:gap-8 items-center md:items-start">
              {[
                { label: 'Privacy Policy', href: '#' },
                { label: 'Terms & Conditions', href: '#' },
                { label: 'Contact Support', href: '#' },
                { label: 'Cookie Policy', href: '#' }
              ].map(link => (
                <a 
                  key={link.label} 
                  href={link.href} 
                  className="text-slate-400 hover:text-[#22C55E] font-bn font-black text-[18px] md:text-[24px] no-underline transition-all block tracking-tight italic hover:translate-x-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Separator Divider */}
        <div className="w-full h-px bg-white/5 mb-8 md:mb-12" />

        {/* Bottom Metadata Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-[#475569] font-bn text-[14px] md:text-[18px] italic font-black text-center md:text-left">
          <p className="m-0 tracking-tight">© 2026 Shaifly Library. All Rights Reserved.</p>
          <div className="flex items-center justify-center gap-2">
            Built with <Heart className="w-5 h-5 text-red-500 fill-red-500 animate-pulse" /> for Bangladeshi Students
          </div>
        </div>

      </div>
    </footer>
  );
}
