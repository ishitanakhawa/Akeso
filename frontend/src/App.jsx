import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { BrainCircuit, LogOut, Menu, X } from 'lucide-react';

import Dashboard from './pages/Dashboard';
import CheckIn from './pages/CheckIn';
import Reports from './pages/Reports';
import PsychiatristConnect from './pages/PsychiatristConnect';
import DoctorDashboard from './pages/DoctorDashboard';
import Auth from './pages/Auth';
import Landing from './pages/Landing'; 
import Onboarding from './pages/Onboarding'; 
import Profile from './pages/Profile'; 
import Plans from './pages/Plans'; // [NEW] Added Plans

function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (location.pathname === '/login' || location.pathname === '/onboarding') return null;

  const isLanding = location.pathname === '/';

  const links = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/check-in', label: 'Daily Check-in' },
    { path: '/reports', label: 'Reports' },
    { path: '/psychiatrist', label: 'Provider Connect' },
    { path: '/plans', label: 'Plans' },
    { path: '/settings', label: 'Profile' }
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? `backdrop-blur-md shadow-sm border-b py-3 ${isLanding ? 'bg-[#1E293B]/85 border-[#334155]' : 'bg-white/85 border-[#E4E4E4]'}` 
          : 'bg-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#98C3ED] rounded-[16px] flex items-center justify-center text-white shadow-sm">
              <BrainCircuit size={22} />
            </div>
            <h2 className={`text-2xl font-extrabold tracking-tight ${isLanding ? 'text-white' : 'text-[#747986]'}`}>Akeso</h2>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {!isLanding && links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link 
                  key={link.path} 
                  to={link.path}
                  className={`px-4 py-2.5 rounded-[14px] transition-all duration-300 font-bold ${
                    isActive 
                      ? 'bg-[#98C3ED] text-white shadow-sm' 
                      : `${isLanding ? 'text-[#94A3B8] hover:text-white hover:bg-[#334155]' : 'text-[#B4B7BF] hover:bg-white hover:text-[#747986]'}`
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            
            {!isLanding && <div className={`w-[1.5px] h-6 mx-2 ${isLanding ? 'bg-[#475569]' : 'bg-[#E4E4E4]'}`}></div>}
            
            {isLanding ? (
               <Link to="/login" className="btn-primary py-2.5 px-6 ml-4 text-[#1E293B] shadow-sm font-bold bg-[#98C3ED]">
                 Sign In
               </Link>
            ) : (
              <Link 
                to="/login"
                className={`px-4 py-2.5 rounded-[14px] transition-all duration-300 font-bold flex items-center gap-2 ${isLanding ? 'text-[#94A3B8] hover:text-red-400 hover:bg-red-500/10' : 'text-[#B4B7BF] hover:bg-red-50 hover:text-red-400'}`}
              >
                <LogOut size={18} />
              </Link>
            )}
            
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`lg:hidden p-2 rounded-xl transition-colors ${isLanding ? 'text-white hover:bg-[#334155]' : 'text-[#747986] hover:bg-white'}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`fixed top-[72px] left-0 w-full z-40 p-4 flex flex-col gap-2 lg:hidden transition-all duration-300 border-b shadow-lg backdrop-blur-md ${isLanding ? 'bg-[#1E293B]/95 border-[#334155]' : 'bg-white/95 border-[#E4E4E4]'} ${mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
        {!isLanding && links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path} 
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`px-4 py-3.5 rounded-[14px] transition-all font-bold ${
                isActive 
                  ? 'bg-[#98C3ED] text-white' 
                  : (isLanding ? 'text-[#CBD5E1] hover:bg-[#334155]' : 'text-[#747986] hover:bg-[#E4E4E4]/50')
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <Link 
          to="/login"
          onClick={() => setMobileMenuOpen(false)}
          className={`px-4 py-3.5 rounded-[14px] transition-all font-bold mt-2 ${isLanding ? 'bg-[#98C3ED] text-[#1E293B] text-center' : 'text-red-400 hover:bg-red-50'}`}
        >
          {isLanding ? 'Get Started' : 'Log Out'}
        </Link>
      </div>
    </>
  );
}

function App() {
  const location = useLocation();
  const bgClass = location.pathname === '/' ? 'bg-[#1E293B]' : 'bg-healthcare-gradient'; 

  return (
    <div className={`min-h-screen font-sans ${bgClass} transition-colors duration-500`}>
      <Navbar />
      
      <main className="pt-32 pb-16 px-4 sm:px-8 max-w-7xl auto mx-auto w-full min-h-screen flex flex-col">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/check-in" element={<CheckIn />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/psychiatrist" element={<PsychiatristConnect />} />
          <Route path="/psychiatrist/:id" element={<DoctorDashboard />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/settings" element={<Profile />} />
        </Routes>
      </main>
    </div>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
