
import React from 'react';

interface LogoProps {
  className?: string;
  showTagline?: boolean;
  size?: 'sm' | 'md' | 'lg';
  forceShort?: boolean; // New prop to force "OSF" in specific UI states (collapsed sidebars)
}

const Logo: React.FC<LogoProps> = ({ className = '', showTagline = true, size = 'md', forceShort = false }) => {
  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-[10px] md:text-xs', tagline: 'text-[5px]' },
    md: { icon: 'w-10 h-10', text: 'text-sm md:text-base', tagline: 'text-[7px]' },
    lg: { icon: 'w-14 h-14', text: 'text-xl md:text-2xl', tagline: 'text-[10px]' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center gap-3 group select-none ${className}`}>
      {/* BRAND MARK (SVG Icon) - Stabilized to prevent distortion */}
      <div className="relative flex-shrink-0">
        <div className={`relative ${currentSize.icon} bg-slate-950 rounded-[22%] flex items-center justify-center transition-all duration-300 border border-white/5 shadow-[0_0_20px_rgba(99,102,241,0.2)] overflow-hidden`}>
          {/* Inner Surface */}
          <div className="absolute inset-[1px] rounded-[20%] bg-slate-950 z-10 flex items-center justify-center">
            <svg viewBox="0 0 40 40" className="w-1/2 h-1/2 fill-indigo-500 group-hover:fill-white transition-colors duration-500">
               {/* Fixed non-distorting mark */}
               <path d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5ZM20 30C14.4772 30 10 25.5228 10 20C10 14.4772 14.4772 10 20 10C25.5228 10 30 14.4772 30 20C30 25.5228 25.5228 30 20 30Z" opacity="0.3" />
               <circle cx="20" cy="20" r="12" fill="none" stroke="currentColor" strokeWidth="4" />
               <rect x="18" y="14" width="4" height="12" rx="1" fill="currentColor" />
            </svg>
          </div>
          {/* Static Gradient Edge */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"></div>
        </div>
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -inset-1 bg-indigo-500/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
      </div>

      {/* BRAND TEXT - Updated to display Full Name */}
      <div className="flex flex-col whitespace-nowrap">
        <h1 className={`${currentSize.text} font-black text-white tracking-[0.1em] uppercase leading-none`}>
          {forceShort ? (
            <>OSF<span className="text-indigo-500">.</span></>
          ) : (
            <>OUR STARTUP <span className="text-indigo-500">FREELANCER</span></>
          )}
        </h1>
        {showTagline && !forceShort && (
          <span className={`${currentSize.tagline} font-black text-slate-500 uppercase tracking-[0.4em] mt-1 transition-colors group-hover:text-indigo-400/80`}>
            Build • Launch • Scale
          </span>
        )}
      </div>
    </div>
  );
};

export default Logo;
