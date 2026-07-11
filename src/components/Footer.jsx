import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Youtube, Linkedin, Mail, Heart, BookOpen, Zap, Trophy, ArrowUpRight, GraduationCap, Star, Award } from 'lucide-react';
import GoogleAd from './GoogleAd';
import { shouldShowAds } from '../lib/adUtils';

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
  { label: 'Sitemap',            href: '/categories' },
];

const stats = [
  { icon: BookOpen,      value: '500+',   label: 'Study Notes'  },
  { icon: GraduationCap, value: '10K+',   label: 'Students'     },
  { icon: Trophy,        value: '4',      label: 'Subjects'     },
  { icon: Star,          value: '100%',   label: 'Free Access'  },
];

export default function Footer() {
  const location = useLocation();
  const showAds = shouldShowAds(location.pathname);

  return (
    <footer className="relative w-full overflow-hidden" style={{ background: 'var(--bg-app)' }}>

      {/* ── Ambient Glow Orbs ── */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'rgba(0,240,255,0.02)', filter: 'blur(100px)' }} />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full pointer-events-none"
        style={{ background: 'rgba(139,92,246,0.02)', filter: 'blur(100px)' }} />

      {/* ── Top Divider ── */}
      <div className="h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--bg-border) 20%, var(--primary) 50%, var(--bg-border) 80%, transparent)' }} />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-10">
        {/* Global Footer Ad */}
        {showAds && (
          <div className="mb-16">
            <GoogleAd slot="2280555349" />
          </div>
        )}

        {/* ── Stats Strip ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-16">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex items-center gap-4 px-5 py-4 rounded-lg group transition-all hover:-translate-y-0.5 border border-[var(--bg-border)]"
              style={{ background: 'var(--bg-surface)' }}
            >
              <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors group-hover:bg-[rgba(0,240,255,0.15)] border border-[var(--bg-border)]"
                style={{ background: 'rgba(0,240,255,0.05)' }}>
                <Icon className="w-5 h-5 text-[var(--primary)]" />
              </div>
              <div>
                <p className="text-[var(--text-primary)] font-black text-[20px] leading-none tracking-tight font-headings">{value}</p>
                <p className="text-[var(--text-muted)] text-[9px] font-bold uppercase tracking-widest mt-1 font-mono">{label}</p>
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
              <div className="relative w-10 h-10 shrink-0">
                <div className="absolute inset-0 bg-[var(--primary)]/20 blur-lg rounded-sm scale-125" />
                <img src="/favicon.ico" alt="Shaifly" className="w-full h-full object-contain relative z-10" />
              </div>
              <div>
                <span className="text-[24px] font-black text-[var(--text-primary)] tracking-wider font-headings leading-none block">
                  Shaifly<span className="text-[var(--primary)]">.</span>
                </span>
                <span className="text-[9px] font-black text-[var(--primary)] uppercase tracking-[0.4em] font-mono opacity-70">Library</span>
              </div>
            </Link>

            <p className="text-[var(--text-muted)] font-bn text-[14px] leading-[1.8] max-w-sm mb-8 font-semibold">
              বাংলাদেশের SSC ও HSC শিক্ষার্থীদের জন্য সেরা academic নোট শেয়ারিং প্ল্যাটফর্ম।
              আমাদের লক্ষ্য শিক্ষাকে সহজ, স্মার্ট ও প্রযুক্তি-নির্ভর করা।
            </p>

            {/* CTA Card */}
            <div className="rounded-lg p-5 mb-8 relative overflow-hidden border border-[var(--primary)]/20"
              style={{ background: 'linear-gradient(135deg, rgba(0,240,255,0.06) 0%, rgba(0,240,255,0.01) 100%)' }}>
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: 'rgba(0,240,255,0.04)', filter: 'blur(30px)' }} />
              <p className="text-[11px] font-bold text-[var(--primary)] uppercase tracking-wider mb-1 font-mono">READY TO COMMENCE?</p>
              <p className="text-[var(--text-primary)] font-bold font-bn text-[16px] mb-4 leading-snug">
                আজই নোট ডাউনলোড করুন — সম্পূর্ণ বিনামূল্যে!
              </p>
              <Link to="/categories"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-[12px] text-[#0A0E1A] no-underline transition-all hover:scale-105"
                style={{ background: 'var(--accent)', boxShadow: '0 4px 12px rgba(0,255,136,0.3)' }}>
                <Zap className="w-4 h-4" /> নোট খুঁজুন <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Social Icons */}
            <div className="flex gap-2.5">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 hover:scale-110 border border-[var(--bg-border)]"
                  style={{ background: 'var(--bg-surface)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.borderColor = 'var(--bg-border)'; }}>
                  <Icon className="w-4 h-4 text-[var(--text-muted)] hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-7">
              <div className="w-1 h-3 rounded-full bg-[var(--primary)]" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--primary)] font-mono">Quick Links</h4>
            </div>
            <ul className="flex flex-col gap-1">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link to={to}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg font-bn font-semibold text-[14px] text-[var(--text-muted)] no-underline transition-all group hover:pl-5"
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.color = 'var(--primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                    <span className="w-1 h-1 rounded-sm bg-[var(--bg-border)] group-hover:bg-[var(--primary)] transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <div className="flex items-center gap-2 mb-7">
              <div className="w-1 h-3 rounded-full bg-[var(--primary)]" />
              <h4 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--primary)] font-mono">Support</h4>
            </div>
            <ul className="flex flex-col gap-1">
              {supportLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href}
                    className="flex items-center gap-2 py-2 px-3 rounded-lg font-bn font-semibold text-[14px] text-[var(--text-muted)] no-underline transition-all group hover:pl-5"
                    onMouseEnter={e => { e.currentTarget.style.background = 'var(--bg-surface)'; e.currentTarget.style.color = 'var(--primary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text-muted)'; }}>
                    <span className="w-1 h-1 rounded-sm bg-[var(--bg-border)] group-hover:bg-[var(--primary)] transition-colors shrink-0" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Contact Card */}
            <div className="mt-8 p-4 rounded-lg border border-[var(--bg-border)]" style={{ background: 'var(--bg-surface)' }}>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-dim)] mb-2 font-mono">CONTACT</p>
              <a href="mailto:support@shaifly.com"
                className="text-[13px] font-bold text-[var(--text-primary)] font-body hover:text-[var(--primary)] transition-colors no-underline flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--primary)]" />
                support@shaifly.com
              </a>
            </div>
          </div>
        </div>

        {/* ── Trust Seal & Newsletter ── */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 p-8 rounded-lg border border-[var(--bg-border)]" style={{ background: 'var(--bg-surface)' }}>
          <div className="flex flex-col justify-center">
            <h4 className="text-[var(--text-primary)] font-bold font-bn text-lg mb-4">নতুন নোট ও সাজেশন পেতে আমাদের সাথে থাকুন</h4>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="আপনার ইমেইল দিন..." 
                className="flex-1 h-[44px] px-4 rounded-lg text-[13px] font-bn font-semibold outline-none text-[var(--text-primary)] bg-[var(--bg-elevated)] border border-[var(--bg-border)]"
              />
              <button 
                className="h-[44px] px-6 rounded-lg font-bold text-[11px] text-[#0A0E1A] uppercase tracking-wider transition-all hover:scale-105 font-mono"
                style={{ background: 'var(--accent)', boxShadow: '0 4px 10px rgba(0, 255, 136, 0.2)' }}
              >
                Join Now
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center md:justify-end gap-6">
            <div className="text-right hidden md:block">
              <p className="text-[var(--text-primary)] font-bold font-bn text-md leading-none mb-1">যাচাইকৃত শিক্ষা প্ল্যাটফর্ম</p>
              <p className="text-[var(--text-dim)] text-[9px] font-bold uppercase tracking-wider font-mono">Verified Academic Library</p>
            </div>
            <div className="w-14 h-14 rounded-lg border border-[var(--primary)]/30 flex items-center justify-center rotate-6 relative" style={{ background: 'rgba(0, 240, 255, 0.05)' }}>
               <div className="absolute inset-0 border border-white/5 rounded-lg" />
               <Award className="w-6 h-6 text-[var(--primary)]" />
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="mt-14 pt-6 relative">
          <div className="circuit-line mb-6" />
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[11px] font-bold text-[var(--text-muted)] tracking-wide font-mono">
              © 2026 <span className="text-[var(--text-primary)]">Shaifly Library</span>. All Rights Reserved.
            </p>

            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[var(--text-muted)] font-mono">
              Built with
              <Heart className="w-3.5 h-3.5 text-[var(--neon-pink)] fill-[var(--neon-pink)] animate-pulse" />
              for&nbsp;
              <span className="text-[var(--accent)]">Bangladeshi Students</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] font-bold text-[var(--text-muted)] font-mono">
              <Link to="/privacy" className="hover:text-[var(--primary)] transition-colors no-underline">Privacy</Link>
              <span className="w-1 h-1 rounded-full bg-[var(--bg-border)]" />
              <Link to="/terms" className="hover:text-[var(--primary)] transition-colors no-underline">Terms</Link>
              <span className="w-1 h-1 rounded-full bg-[var(--bg-border)]" />
              <Link to="/cookies" className="hover:text-[var(--primary)] transition-colors no-underline">Cookies</Link>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
