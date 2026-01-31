import React, { useState } from 'react';

interface HeaderProps {
  onInfoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onInfoClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="mb-12 w-full max-w-md mx-auto px-6 pt-16 flex justify-between items-start relative">
      <div className="flex flex-col">
        <h1 className="text-4xl font-[900] tracking-[-0.05em] text-[#1A1A1A] leading-none mb-3 font-sans">
          BAUKASTEN
        </h1>
        <div className="flex gap-1">
          <div className="h-1.5 w-6 bg-[#BD5B5B]"></div>
          <div className="h-1.5 w-1.5 bg-[#5B7A96]"></div>
          <div className="h-1.5 w-1.5 bg-[#DCA258]"></div>
        </div>
        <p className="mt-4 text-[0.65rem] font-black uppercase tracking-[0.3em] text-slate-400">
          Engineered Play & Logic
        </p>
      </div>

      <div className="flex items-center justify-end relative mt-1">
        {/* Actions revealed via the plus button */}
        <div 
          className={`absolute right-12 flex gap-2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-right ${
            isMenuOpen 
              ? 'opacity-100 translate-x-0 scale-100' 
              : 'opacity-0 translate-x-8 scale-90 pointer-events-none'
          }`}
        >
          <button 
            onClick={() => {
              onInfoClick?.();
              setIsMenuOpen(false);
            }}
            title="Manifesto & Settings"
            className="px-5 h-10 rounded-full bg-white shadow-toy flex items-center justify-center gap-2 text-slate-800 hover:text-primary transition-all active:scale-90 border border-slate-100"
          >
             <span className="material-icons text-lg">info</span>
             <span className="text-[0.6rem] font-black uppercase tracking-widest">Manifesto</span>
          </button>
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-10 h-10 rounded-full bg-white shadow-toy flex items-center justify-center text-slate-800 transition-all duration-300 z-10 border border-slate-100 ${
            isMenuOpen ? 'rotate-45 bg-slate-50 shadow-none' : ''
          }`}
        >
           <span className="material-icons text-xl">add</span>
        </button>
      </div>
    </header>
  );
};