import React from 'react';
import { Info } from 'lucide-react';
import { ABOUT_HASH } from '../navigation.js';

export const Header: React.FC = () => (
  <header className="mb-10 sm:mb-12 w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 pt-10 sm:pt-14 lg:pt-16 flex justify-between items-start gap-3">
    <div className="min-w-0">
      <h1 className="text-2xl min-[360px]:text-3xl sm:text-4xl lg:text-5xl font-[900] tracking-[-0.05em] text-[#1A1A1A] leading-tight break-words mb-2 sm:mb-3">BAUKASTEN</h1>
      <div className="flex gap-1" aria-hidden="true"><div className="h-1.5 w-6 bg-[#BD5B5B]"/><div className="h-1.5 w-1.5 bg-[#5B7A96]"/><div className="h-1.5 w-1.5 bg-[#DCA258]"/></div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-600">Tools for practice and connected reading.</p>
    </div>
    <a href={ABOUT_HASH} aria-label="About Baukasten" className="shrink-0 min-h-11 px-3 rounded-xl bg-white flex items-center justify-center gap-2 text-slate-800 hover:text-[#BD5B5B] transition-colors border border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
      <Info className="w-[18px] h-[18px] shrink-0" aria-hidden="true" /><span className="text-xs font-bold uppercase tracking-wide">About</span>
    </a>
  </header>
);
