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
      <div className="bg-white rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-slate-100 flex justify-between items-center relative h-16 px-2 pointer-events-auto">
        <NavItem to="/" icon={Home} label="Home" active={isActive('/')} />
        <NavItem to="/categories" icon={Users} label="Subjects" active={isActive('/categories')} />
        
        {/* Protruding Quiz Button */}
        <div className="relative flex flex-col items-center justify-center h-full w-[20%]">
          <Link 
            to="/quiz" 
            className="absolute -top-6 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl shadow-[#F97316]/40 bg-[#F97316] ring-[6px] ring-[#F8FAFC] transition-transform active:scale-95 group"
          >
            <FileEdit className="w-6 h-6 group-active:scale-90 transition-transform" />
          </Link>
          <span className={`text-[10px] absolute -bottom-1 font-bold ${isActive('/quiz') ? 'text-[#F97316]' : 'text-[#64748B] font-medium'}`}>Quiz</span>
        </div>

        <NavItem to="/tips" icon={CalendarDays} label="Library" active={isActive('/tips')} />
        <NavItem to="/subscription" icon={User} label="Profile" active={isActive('/subscription')} />
      </div>
    </div>
  );
};

const NavItem = ({ to, icon: Icon, label, active }) => (
  <Link to={to} className="flex flex-col items-center justify-center h-full gap-1 w-[20%] pt-1 text-decoration-none">
    <Icon className={`w-6 h-6 transition-transform ${active ? 'text-[#14B8A6]' : 'text-[#64748B]'}`} />
    <span className={`text-[10px] ${active ? 'text-[#14B8A6] font-bold' : 'text-[#64748B] font-medium'}`}>{label}</span>
  </Link>
);

export default BottomNav;
