import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Linkedin, Mail, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-24 mt-20 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-16 border-b border-white/5 mb-16">
          <div className="lg:col-span-2">
             <Link to="/" className="text-4xl font-black en-font mb-6 block tracking-tighter no-underline text-white">Shaifly<span className="text-primary italic">.</span></Link>
             <p className="text-slate-400 max-w-sm font-bn italic text-lg leading-relaxed mb-8">
                শাইফলি অনলাইন লাইব্রেরি - বাংলাদেশের ছাত্রছাত্রীদের জন্য এক বিশ্বস্ত একাডেমিক নোট শেয়ারিং প্ল্যাটফর্ম। আমাদের লক্ষ্য শিক্ষা ব্যবস্থাকে আরও সহজ ও প্রযুক্তি নির্ভর করা।
             </p>
             <div className="flex gap-4">
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-white no-underline border border-white/10 group">
                  <Facebook className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-white no-underline border border-white/10 group">
                  <Youtube className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-white no-underline border border-white/10 group">
                  <Linkedin className="group-hover:scale-110 transition-transform" />
                </a>
                <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-primary transition-all text-white no-underline border border-white/10 group">
                  <Mail className="group-hover:scale-110 transition-transform" />
                </a>
             </div>
          </div>

          <div>
             <h4 className="text-xl font-black en-font mb-8 uppercase tracking-widest text-primary">Quick Links</h4>
             <ul className="space-y-4 font-bn italic text-slate-400 p-0 list-none">
                <li><Link to="/" className="hover:text-primary transition-colors no-underline text-inherit">Home</Link></li>
                <li><Link to="/categories" className="hover:text-primary transition-colors no-underline text-inherit">Categories</Link></li>
                <li><Link to="/about" className="hover:text-primary transition-colors no-underline text-inherit">About Us</Link></li>
                <li><Link to="/subscription" className="hover:text-primary transition-colors no-underline text-inherit">VIP Subscription</Link></li>
             </ul>
          </div>

          <div>
             <h4 className="text-xl font-black en-font mb-8 uppercase tracking-widest text-primary">Support</h4>
             <ul className="space-y-4 font-bn italic text-slate-400 p-0 list-none">
                <li><a href="#" className="hover:text-primary transition-colors no-underline text-inherit">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors no-underline text-inherit">Terms & Conditions</a></li>
                <li><a href="#" className="hover:text-primary transition-colors no-underline text-inherit">Contact Support</a></li>
                <li><a href="#" className="hover:text-primary transition-colors no-underline text-inherit">Cookie Policy</a></li>
             </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm font-bn italic">
          <p className="mb-0">© 2026 Shaifly Library. All Rights Reserved.</p>
          <p className="flex items-center gap-2 mb-0">Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> for Bangladeshi Students</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
