import React, { useState } from 'react';

interface InfoViewProps {
  onBack: () => void;
}

export const InfoView: React.FC<InfoViewProps> = ({ onBack }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState<'EN' | 'JA'>('EN');
  const [isTactile, setIsTactile] = useState(true);

  return (
    <div className={`min-h-screen transition-colors duration-700 ${isDarkMode ? 'bg-[#1A1A1A] text-white' : 'bg-[#F0F2F5] text-slate-900'} font-sans pb-32 animate-fade-in overflow-x-hidden`}>
      <nav className={`sticky top-0 z-40 backdrop-blur-2xl px-6 py-6 flex items-center justify-between border-b ${isDarkMode ? 'bg-[#1A1A1A]/90 border-white/10' : 'bg-[#F0F2F5]/90 border-slate-200'}`}>
        <button onClick={onBack} className={`w-12 h-12 -ml-2 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-sm border ${isDarkMode ? 'bg-white/5 border-white/10 text-white/40' : 'bg-white border-slate-100 text-slate-400'}`}>
          <span className="material-icons">chevron_left</span>
        </button>
        <span className={`text-base font-black tracking-tight uppercase ${isDarkMode ? 'text-white' : 'text-slate-800'}`}>Manifesto</span>
        <div className="w-12"></div>
      </nav>

      <main className="max-w-md mx-auto px-8 pt-20">
        {/* Geometric Hero */}
        <section className="relative mb-24 flex justify-center">
            <div className={`w-48 h-48 rounded-full shadow-toy relative flex items-center justify-center overflow-hidden ${isDarkMode ? 'bg-white/5' : 'bg-white'}`}>
                <div className="absolute top-0 left-0 w-24 h-24 bg-[#BD5B5B]"></div>
                <div className="absolute bottom-0 right-0 w-24 h-24 bg-[#5B7A96] rounded-full translate-x-1/4 translate-y-1/4"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-[#DCA258] rotate-45"></div>
                <span className="material-icons text-4xl text-white z-10 mix-blend-overlay">architecture</span>
            </div>
        </section>

        <section className="mb-24">
            <h2 className="text-4xl font-black tracking-tighter leading-none mb-8 uppercase">
                The Logic of Play
            </h2>
            <div className="space-y-8">
                <p className={`text-lg font-bold leading-snug ${isDarkMode ? 'text-white/80' : 'text-slate-600'}`}>
                    BAUKASTEN is a design philosophy rooted in the intersection of mathematical precision and child-like curiosity.
                </p>
                <div className="h-px w-16 bg-[#BD5B5B]"></div>
                <p className={`${isDarkMode ? 'text-white/50' : 'text-slate-500'} leading-relaxed`}>
                    Inspired by the timeless toys of Naef and the functionalist spirit of the Bauhaus, this archive represents a collection of digital tools engineered to be both rigid in logic and fluid in interaction.
                </p>
            </div>
        </section>

        <section className="space-y-12 mb-32">
            {[
                { label: 'Geometry', desc: 'Starting from fundamental shapes to build complex systems.' },
                { label: 'Tactility', desc: 'Crafting digital experiences that feel physical and reactive.' },
                { label: 'Utility', desc: 'Purpose over decoration. Function as the ultimate form.' }
            ].map((item, i) => (
                <div key={i} className="flex gap-6 group">
                    <span className={`text-2xl font-black transition-colors ${isDarkMode ? 'text-white/10 group-hover:text-white' : 'text-slate-200 group-hover:text-slate-900'}`}>0{i+1}</span>
                    <div>
                        <h3 className="text-xs font-black uppercase tracking-[0.3em] mb-2">{item.label}</h3>
                        <p className={`text-sm font-medium leading-relaxed ${isDarkMode ? 'text-white/40' : 'text-slate-400'}`}>{item.desc}</p>
                    </div>
                </div>
            ))}
        </section>

        {/* System Settings Section Integrated at the Bottom */}
        <section className={`pt-16 border-t ${isDarkMode ? 'border-white/10' : 'border-slate-200'} space-y-10`}>
            <header>
                <h3 className={`text-[0.6rem] font-black uppercase tracking-[0.4em] mb-8 ${isDarkMode ? 'text-white/30' : 'text-slate-300'}`}>Environment Settings</h3>
            </header>

            <div className="space-y-4">
                {/* Language Switch */}
                <div className={`p-6 rounded-2xl flex items-center justify-between border transition-all ${isDarkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div>
                        <p className="text-[0.5rem] font-black uppercase tracking-widest text-primary mb-1">System Language</p>
                        <p className="text-sm font-black uppercase tracking-tight">Expression Mode</p>
                    </div>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        <button 
                            onClick={() => setLanguage('EN')}
                            className={`px-3 py-1.5 rounded-lg text-[0.6rem] font-black transition-all ${language === 'EN' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                        >EN</button>
                        <button 
                            onClick={() => setLanguage('JA')}
                            className={`px-3 py-1.5 rounded-lg text-[0.6rem] font-black transition-all ${language === 'JA' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}
                        >JA</button>
                    </div>
                </div>

                {/* Dark Mode Toggle */}
                <button 
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`w-full p-6 rounded-2xl flex items-center justify-between border transition-all text-left ${isDarkMode ? 'bg-white/5 border-white/20' : 'bg-white border-slate-100 shadow-sm'}`}
                >
                    <div>
                        <p className={`text-[0.5rem] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-white/40' : 'text-slate-300'}`}>Surface Render</p>
                        <p className="text-sm font-black uppercase tracking-tight">{isDarkMode ? 'Obsidian' : 'Alabaster'}</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full relative p-1 flex transition-colors ${isDarkMode ? 'bg-primary justify-end' : 'bg-slate-200 justify-start'}`}>
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                </button>

                {/* Tactile Feedback Toggle */}
                <button 
                    onClick={() => setIsTactile(!isTactile)}
                    className={`w-full p-6 rounded-2xl flex items-center justify-between border transition-all text-left ${isDarkMode ? 'bg-white/5 border-white/20' : 'bg-white border-slate-100 shadow-sm'}`}
                >
                    <div>
                        <p className={`text-[0.5rem] font-black uppercase tracking-widest mb-1 ${isDarkMode ? 'text-white/40' : 'text-slate-300'}`}>Interaction</p>
                        <p className="text-sm font-black uppercase tracking-tight">Tactile Feedback</p>
                    </div>
                    <span className={`material-icons text-xl ${isTactile ? 'text-primary' : 'text-slate-300'}`}>
                        {isTactile ? 'vibration' : 'do_not_disturb_on'}
                    </span>
                </button>
            </div>
        </section>

        <footer className={`mt-32 pt-16 border-t text-center ${isDarkMode ? 'border-white/10' : 'border-slate-200'}`}>
            <p className={`text-[0.6rem] font-black uppercase tracking-[0.5em] ${isDarkMode ? 'text-white/20' : 'text-slate-300'}`}>
                Curated by Developer • 2024
            </p>
        </footer>
      </main>
    </div>
  );
};