import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoImg from "../../assets/d34b86f0961d0d1520ac70a77af0e95fab8002ae.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(
    Boolean(typeof window !== "undefined" && localStorage.getItem("auth_token"))
  );
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const syncAuth = () => {
      setIsAuthed(Boolean(localStorage.getItem("auth_token")));
    };
    window.addEventListener("storage", syncAuth);
    return () => window.removeEventListener("storage", syncAuth);
  }, []);

  const handleScroll = (id: string) => {
    if (!isHomePage) {
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    setIsAuthed(false);
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <img 
              src={logoImg} 
              alt="Our Startup Freelancer Logo" 
              className="h-12 w-auto object-contain group-hover:scale-105 transition-transform duration-300" 
            />
            <span className="font-bold text-xl tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">
              Our Startup <br></br><span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Freelancer</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center bg-gray-100/50 rounded-full px-2 py-1.5 backdrop-blur-md border border-gray-200/50 mr-6">
              <Link to="/" className="px-5 py-2 text-sm font-medium text-gray-900 bg-white rounded-full shadow-sm transition-all">Home</Link>
              <button onClick={() => handleScroll('services')} className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white/50 rounded-full transition-all cursor-pointer">Services</button>
              <button onClick={() => handleScroll('portfolio')} className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white/50 rounded-full transition-all cursor-pointer">Portfolio</button>
              <button onClick={() => handleScroll('contact')} className="px-5 py-2 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-white/50 rounded-full transition-all cursor-pointer">Contact</button>
            </div>
            
            <div className="flex items-center gap-3">
              {isAuthed ? (
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-900 hover:text-blue-600 px-3 py-2"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-sm font-medium text-gray-900 hover:text-blue-600 px-3 py-2">Login</Link>
                  <Link to="/signup" className="bg-gray-900 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95">
                    Sign Up
                  </Link>
                </>
              )}
              <Link to="/book-call" className="bg-blue-600 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 hover:shadow-blue-300 active:scale-95">
                Book a Free Call
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-2">
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-4 py-3 text-base font-medium text-gray-900 bg-gray-50 rounded-xl">Home</Link>
              <button onClick={() => handleScroll('services')} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-colors">Services</button>
              <button onClick={() => handleScroll('portfolio')} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-colors">Portfolio</button>
              <button onClick={() => handleScroll('contact')} className="block w-full text-left px-4 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-blue-600 rounded-xl transition-colors">Contact</button>
              <div className="pt-6 grid gap-3">
                {isAuthed ? (
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-3.5 text-gray-900 font-bold bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full text-center py-3.5 text-gray-900 font-bold bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">Login</Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="w-full text-center py-3.5 bg-gray-900 text-white font-bold rounded-xl shadow-lg">Sign Up</Link>
                  </>
                )}
                <Link to="/book-call" onClick={() => setIsOpen(false)} className="w-full text-center py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-200">Book a Free Call</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
