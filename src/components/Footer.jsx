import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Linkedin, Mail, Heart, BookOpen, Zap, Trophy, ArrowUpRight, GraduationCap, Star } from 'lucide-react';
import GoogleAd from './GoogleAd';

const socialLinks = [
  { icon: Facebook,  href: 'https://facebook.com/shaifly', label: 'Facebook'  },
  { icon: Youtube,   href: 'https://youtube.com/shaifly',  label: 'YouTube'   },
  { icon: Linkedin,  href: 'https://linkedin.com/company/shaifly', label: 'LinkedIn'  },
  { icon: Mail,      href: 'mailto:support@shaifly.com', label: 'Email'     },
];

const quickLinks = [
  { label: 'Home',            to: '/'            },
  { label: 'Categories',      to: '/categories'  },
  { label: 'Quiz System',     to: '/quiz'        },
  { label: 'Tips & Library',  to: '/tips'        },
  { label: 'About Us',        to: '/about'       },
  { label: 'VIP Membership',  to: '/subscription'},
];

const supportLinks = [
  { label: 'Privacy Policy',     href: '/privacy' },
  { label: 'Terms & Conditions', href: '/terms'   },
  { label: 'Contact Support',    href: 'mailto:support@shaifly.com' },
  { label: 'Cookie Policy',      href: '/cookies' },
];

const stats = [
  { icon: BookOpen,      value: '500+',   label: 'Study Notes'  },
  { icon: GraduationCap, value: '10K+',   label: 'Students'     },
  { icon: Trophy,        value: '4',      label: 'Subjects'     },
  { icon: Star,          value: '100%',   label: 'Free Access'  },
];

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden" style={{ background: '#060d14' }}>

      {/* ── Ambient Glow Orbs ── */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(34,197,94,0.04)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full pointer-events-none"
        style={{ background: 'rgba(14,165,233,0.03)', filter: 'blur(100px)' }} />

      {/* ── Top Divider ── */}
      <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, #1e3a5f 30%, #22C55E 50%, #1e3a5f 70%, transparent)' }} />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10">
        {/* Global Footer Ad */}
        <div className="mb-16">
          <GoogleAd slot="2280555349" />
        </div>

        {/* ── Stats Strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-4 px-5 py-4 rounded-2xl group transition-all hover:-translate-y-0.5"
              style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors group-hover:bg-[rgba(34,197,94,0.15)]"
                style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.15)' }}>
                <Icon className="w-5 h-5 text-[#22C55E]" />
              </div>
              <div>
                <p className="text-white font-black text-[20px] leading-none italic tracking-tight">{value}</p>
                <p className="text-[#334155] text-[11px] font-black uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Main Content Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr_1fr] gap-12 lg:gap-16">

          {/* Brand Column */}
          <div className="flex flex-col">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 mb-6 no-underline group w-fit">
              <div className="relative w-12 h-12 shrink-0">
                <div className="absolute inset-0 bg-[#22C55E]/20 blur-xl rounded-full scale-125" />
                <img src="/favicon.ico" alt="Shaifly" className="w-full h-full object-contain relative z-10" />
              </div>
              <div>
                <span className="text-[28px] font-black text-white tracking-tighter italic font-bn leading-none block">
                  Shaifly<span className="text-[#22C55E]">.</span>
                </span>
                <span className="text-[9px] font-black text-[#22C55E] uppercase tracking-[0.4em] opacity-70">Library</span>
              </div>
            </Link>

            <p className="text-[#475569] font-bn text-[15px] leading-[1.8] max-w-sm mb-8">
              বাংলাদেশের SSC ও HSC শিক্ষার্থীদের জন্য সেরা একাডেমিক নোট শেয়ারিং প্ল্যাটফর্ম।
              আমাদের লক্ষ্য শিক্ষাকে সহজ, স্মার্ট ও প্রযুক্তি-নির্ভর করা।
            </p>

            {/* CTA Card */}
            <div className="rounded-2xl p-5 mb-8 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08) 0%, rgba(34,197,94,0.02) 100%)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: 'rgba(34,197,94,0.06)', filter: 'blur(30px)' }} />
              <p className="text-[13px] font-black text-[#22C55E] uppercase tracking-widest mb-1">শুরু করতে প্রস্তুত?</p>
              <p className="text-white font-black font-bn text-[17px] italic mb-4 leading-snug">
                আজই নোট ডাউনলোড করুন — সম্পূর্ণ বিনামূল্যে!
              </p>
              <Link to="/categories"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-[13px] text-white no-underline transition-all hover:scale-105"
                style={{ background: '#22C55E', boxShadow: '0 4px 16px rgba(34,197,94,0.3)' }}>
                <Zap className="w-4 h-4" /> নোট খুঁজুন <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-110 group"
                  style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#22C55E'; e.currentTarget.style.borderColor = '#22C55E'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#0d1b2a'; e.currentTarget.style.borderColor = '#1e3a5f'; }}>
                  <Icon className="w-4 h-4 text-[#475569] group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-7">
              <div className="w-1 h-4 rounded-full bg-[#22C55E]" />
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-[#22C55E]">Quick Links</h4>
            </div>
            <ul className="flex flex-col gap-1">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}
                    className="flex items-center gap-2 py-2.5 px-3 rounded-xl font-bn font-bold text-[15px] text-[#475569] no-underline transition-all group hover:pl-5"
                    style={{ letterSpacing: '0.01em' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#0d1b2a'; e.currentTarget.style.color = '#f1f5f9'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}>
                    <span className="w-1 h-1 rounded-full bg-[#1e3a5f] group-hover:bg-[#22C55E] transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <div className="flex items-center gap-2 mb-7">
              <div className="w-1 h-4 rounded-full bg-[#0ea5e9]" />
              <h4 className="text-[11px] font-black uppercase tracking-[0.25em] text-[#0ea5e9]">Support</h4>
            </div>
            <ul className="flex flex-col gap-1">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    className="flex items-center gap-2 py-2.5 px-3 rounded-xl font-bn font-bold text-[15px] text-[#475569] no-underline transition-all group hover:pl-5"
                    onMouseEnter={e => { e.currentTarget.style.background = '#0d1b2a'; e.currentTarget.style.color = '#f1f5f9'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#475569'; }}>
                    <span className="w-1 h-1 rounded-full bg-[#1e3a5f] group-hover:bg-[#0ea5e9] transition-colors shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Card */}
            <div className="mt-8 p-4 rounded-2xl" style={{ background: '#0d1b2a', border: '1px solid #1e3a5f' }}>
              <p className="text-[11px] font-black uppercase tracking-widest text-[#334155] mb-2">যোগাযোগ করুন</p>
              <a href="mailto:support@shaifly.com"
                className="text-[14px] font-black text-white font-en hover:text-[#22C55E] transition-colors no-underline flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#22C55E]" />
                support@shaifly.com
              </a>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-14 pt-6 relative">
          {/* Gradient separator */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, #1e3a5f 20%, #1e3a5f 80%, transparent)' }} />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[12px] font-black text-[#334155] tracking-wide font-en">
              © 2026 <span className="text-[#475569]">Shaifly Library</span>. All Rights Reserved.
            </p>

            <div className="flex items-center gap-2 text-[12px] font-black text-[#334155] font-en">
              Built with
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 animate-pulse" />
              for&nbsp;
              <span className="text-[#22C55E]">Bangladeshi Students</span>
            </div>

            <div className="flex items-center gap-4 text-[12px] font-black text-[#334155] font-en">
              <Link to="/privacy" className="hover:text-[#475569] transition-colors no-underline">Privacy</Link>
              <span className="w-1 h-1 rounded-full bg-[#1e3a5f]" />
              <Link to="/terms" className="hover:text-[#475569] transition-colors no-underline">Terms</Link>
              <span className="w-1 h-1 rounded-full bg-[#1e3a5f]" />
              <Link to="/cookies" className="hover:text-[#475569] transition-colors no-underline">Cookies</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
