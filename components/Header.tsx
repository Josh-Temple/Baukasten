import React from 'react';

export const Header: React.FC<{ onInfoClick: () => void }> = ({ onInfoClick }) => (
  <header className="mb-12 w-full max-w-md mx-auto px-6 pt-14 flex justify-between items-start">
    <div className="min-w-0 pr-4">
      <h1 className="text-4xl font-[900] tracking-[-0.05em] text-[#1A1A1A] leading-none mb-3">BAUKASTEN</h1>
      <div className="flex gap-1" aria-hidden="true"><div className="h-1.5 w-6 bg-[#BD5B5B]"/><div className="h-1.5 w-1.5 bg-[#5B7A96]"/><div className="h-1.5 w-1.5 bg-[#DCA258]"/></div>
      <p className="mt-4 text-[0.65rem] font-black uppercase tracking-[0.2em] text-slate-500">Learning tools built through use.</p>
    </div>
    <button onClick={onInfoClick} aria-label="Open About" className="shrink-0 h-11 px-3 rounded-xl bg-white shadow-toy flex items-center justify-center gap-2 text-slate-800 hover:text-[#BD5B5B] transition-all active:scale-90 border border-slate-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
      <span className="material-icons text-lg" aria-hidden="true">info</span><span className="text-[0.6rem] font-black uppercase tracking-widest">About</span>
    </button>
  </header>
);
