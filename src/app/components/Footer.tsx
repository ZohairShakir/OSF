import React from 'react';
import logoImg from "../../assets/d34b86f0961d0d1520ac70a77af0e95fab8002ae.png";
import { Heart } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Footer = () => {
  const navigate = useNavigate();
  
  const handleScroll = (id: string) => {
    // If not on home page, navigate home first
    if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    } else {
        const element = document.getElementById(id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white py-20 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 pb-16">
          <div className="col-span-1 md:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Logo" className="h-10 w-auto brightness-0 invert" />
              <span className="font-bold text-2xl tracking-tight">Our Startup Freelancer</span>
            </div>
            <p className="text-gray-400 max-w-sm text-lg font-light leading-relaxed">
              Empowering the next generation of startups with world-class design and engineering talent.
            </p>
            <div className="flex gap-4">
              {/* Quick contact links */}
              <a
                href="https://wa.me/919424871885"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
              >
                <span className="sr-only">WhatsApp</span>
              </a>
              <a
                href="tel:+919424871885"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
              >
                <span className="sr-only">Call</span>
              </a>
              <a
                href="mailto:info@ourstartupfreelancer.com"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
              >
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-8 text-white">Links</h4>
            <ul className="space-y-4 text-gray-400">
              <li><Link to="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><button onClick={() => handleScroll('services')} className="hover:text-blue-400 transition-colors text-left">Services</button></li>
              <li><button onClick={() => handleScroll('portfolio')} className="hover:text-blue-400 transition-colors text-left">Portfolio</button></li>
              <li><button onClick={() => handleScroll('contact')} className="hover:text-blue-400 transition-colors text-left">Contact</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-8 text-white">Legal</h4>
            <ul className="space-y-4 text-gray-400">
              <li><button onClick={() => handleScroll('contact')} className="hover:text-blue-400 transition-colors text-left">Privacy Policy</button></li>
              <li><button onClick={() => handleScroll('contact')} className="hover:text-blue-400 transition-colors text-left">Terms of Service</button></li>
              <li><button onClick={() => handleScroll('contact')} className="hover:text-blue-400 transition-colors text-left">Cookie Policy</button></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Our Startup Freelancer. All rights reserved.</p>
          <p className="mt-2 md:mt-0 inline-flex items-center gap-1">
            Designed with <Heart className="w-4 h-4 text-red-500 fill-current" /> for Startups
          </p>
        </div>
      </div>
    </footer>
  );
};
