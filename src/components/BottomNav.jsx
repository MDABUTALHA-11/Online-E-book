import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, CalendarDays, User, FileEdit } from 'lucide-react';

const BottomNav = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 py-3 pb-[calc(12px+env(safe-area-inset-bottom))] bg-transparent pointer-events-none">
      <div className="bg-[var(--bg-surface)] rounded-lg shadow-[0_4px_25px_rgba(0,240,255,0.08)] border border-[var(--bg-border)] flex justify-between items-center relative h-15 px-2 pointer-events-auto">
        <NavItem to="/" icon={Home} label="Home" active={isActive('/')} />
        <NavItem to="/categories" icon={Users} label="Subjects" active={isActive('/categories')} />
        
        {/* Protruding Hexagonal/Square Tech Quiz Button */}
        <div className="relative flex flex-col items-center justify-center h-full w-[20%]">
          <Link 
            to="/quiz" 
            className="absolute -top-5 w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg shadow-[var(--neon-violet)]/40 bg-[var(--neon-violet)] border border-[var(--primary)]/30 ring-[4px] ring-[var(--bg-app)] transition-transform active:scale-95 group"
          >
            <FileEdit className="w-5 h-5 group-active:scale-90 transition-transform" />
          </Link>
          <span className={`text-[9px] absolute -bottom-1 font-mono font-bold tracking-wider ${isActive('/quiz') ? 'text-[var(--neon-violet)]' : 'text-[var(--text-muted)]'}`}>Quiz</span>
        </div>

        <NavItem to="/tips" icon={CalendarDays} label="Library" active={isActive('/tips')} />
        <NavItem to="/subscription" icon={User} label="Profile" active={isActive('/subscription')} />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link to={to} className="flex flex-col items-center justify-center h-full gap-0.5 w-[20%] pt-1 text-decoration-none">
    <Icon className={`w-5 h-5 transition-transform ${active ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}`} />
    <span className={`text-[9px] font-mono tracking-wider ${active ? 'text-[var(--primary)] font-bold' : 'text-[var(--text-muted)] font-medium'}`}>{label}</span>
  </Link>
);

export default BottomNav;
