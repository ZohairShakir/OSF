import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      // Fallback: navigate home then scroll
      navigate("/");
      setTimeout(() => {
        const retry = document.getElementById(id);
        if (retry) retry.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 overflow-hidden bg-slate-50">
      {/* Aesthetic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[5%] w-[800px] h-[800px] rounded-full bg-gradient-to-br from-blue-100/60 to-purple-100/60 blur-[100px] opacity-70" />
        <div className="absolute top-[30%] -left-[10%] w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-100/60 to-pink-100/60 blur-[100px] opacity-70" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/60 border border-white/50 shadow-sm backdrop-blur-md mb-8 hover:scale-105 transition-transform cursor-default">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold text-gray-600 tracking-wide uppercase text-[10px]">Available for new projects</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 tracking-tight mb-8 leading-[1.05]">
            Scale Your Startup with <br className="hidden md:block" />
            <span className="relative inline-block">
              <span className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-purple-100 blur-lg opacity-50 rounded-full transform -skew-x-6"></span>
              <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                Elite Freelance Talent
              </span>
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-gray-500 mb-12 leading-relaxed font-light">
            We transform visionary ideas into digital reality with elegant design, robust development, and creative storytelling that resonates.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full sm:w-auto px-10 py-5 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-full font-bold text-lg transition-all shadow-[0_10px_40px_-10px_rgba(139,92,246,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(139,92,246,0.6)] hover:-translate-y-1 flex items-center justify-center gap-2 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Your Project
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            </button>
            <button
              onClick={() => scrollToSection('portfolio')}
              className="w-full sm:w-auto px-10 py-5 bg-white text-gray-900 border border-gray-200 hover:border-gray-300 rounded-full font-bold text-lg hover:bg-gray-50 transition-all flex items-center justify-center shadow-sm hover:shadow-md"
            >
              View Portfolio
            </button>
          </div>

          <div className="mt-24 pt-10 border-t border-gray-200/60">
            <p className="text-sm font-semibold text-gray-400 uppercase tracking-widest mb-8">Trusted by industry leaders</p>
            <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-bold text-2xl text-gray-400 hover:text-blue-600 transition-colors cursor-default"><Star className="fill-current" /> TechStart</div>
              <div className="flex items-center gap-2 font-bold text-2xl text-gray-400 hover:text-purple-600 transition-colors cursor-default"><div className="w-6 h-6 bg-current rounded-full" /> Globex</div>
              <div className="flex items-center gap-2 font-bold text-2xl text-gray-400 hover:text-indigo-600 transition-colors cursor-default"><div className="w-6 h-6 border-[3px] border-current rotate-45 rounded-sm" /> Nexus</div>
              <div className="hidden sm:flex items-center gap-2 font-bold text-2xl text-gray-400 hover:text-pink-600 transition-colors cursor-default"><div className="w-6 h-6 bg-current rounded-sm" /> Vertex</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
