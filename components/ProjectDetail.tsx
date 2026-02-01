import React, { useState } from 'react';
import { Project } from '../types';

interface ProjectDetailProps {
  project: Project;
  onBack: () => void;
}

export const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onBack }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = project.screenshots || [
    { caption: 'App Overview' },
    { caption: 'Core Experience' },
    { caption: 'Interface Logic' }
  ];

  const assetBase = import.meta.env.BASE_URL;

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.currentTarget;
    if (scrollWidth <= clientWidth) return;
    const index = Math.round((scrollLeft / (scrollWidth - clientWidth)) * (slides.length - 1));
    setActiveSlide(index || 0);
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans pb-40 animate-fade-in overflow-x-hidden">
      
      {/* Precision Navigation */}
      <nav className="sticky top-0 z-40 bg-[#F0F2F5]/90 backdrop-blur-2xl px-6 py-6 flex items-center justify-between border-b border-slate-200">
         <button onClick={onBack} className="w-12 h-12 -ml-2 rounded-2xl flex items-center justify-center text-slate-400 hover:text-slate-900 bg-white border border-slate-100 shadow-sm transition-all active:scale-90">
          <span className="material-icons">chevron_left</span>
        </button>
        <div className="flex flex-col items-center">
           <span className="text-[0.55rem] font-black uppercase tracking-[0.4em] text-slate-300 leading-none mb-1.5">
            {project.category}
          </span>
          <span className="text-base font-black text-slate-800 tracking-tight leading-none uppercase">{project.title}</span>
        </div>
        <div className="w-12 h-12 rounded-2xl bg-white/30 border border-white flex items-center justify-center text-slate-300">
            <span className="material-icons text-sm">more_vert</span>
        </div>
      </nav>

      <main className="max-w-xl mx-auto px-6">
        
        {/* 1. Hero: Balanced Typography */}
        <header className="py-16 text-center">
            <div className="inline-flex items-center px-4 py-1.5 rounded-xl bg-white border border-slate-200 text-[0.6rem] font-black text-slate-400 tracking-[0.2em] uppercase mb-8 shadow-sm">
                {project.status} • {project.year}
            </div>
            
            <h1 className="text-6xl font-black tracking-tighter text-slate-900 mb-8 leading-[0.85] uppercase">
                {project.title}
            </h1>
            
            <p className="text-lg text-slate-500 leading-snug font-bold mb-12 px-4">
                {project.oneLiner}
            </p>

            <div className="flex flex-col gap-6 items-center">
                <a 
                  href={project.demoLink}
                  className="w-full max-w-xs bg-[#1A1A1A] text-white font-black py-5 px-8 rounded-2xl shadow-toy-deep hover:bg-black hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:translate-y-0 active:shadow-none"
                >
                    <span className="tracking-widest uppercase text-xs">Launch Demo</span>
                    <span className="material-icons text-lg">arrow_outward</span>
                </a>
                {project.trustNote && (
                  <p className="text-[0.55rem] text-slate-300 font-black uppercase tracking-[0.3em] flex items-center gap-2">
                    <span className="material-icons text-[10px]">lock</span>
                    {project.trustNote}
                  </p>
                )}
            </div>
        </header>

        {/* 2. Vertical Preview (Mobile Aspect Ratio 9:19) */}
        <section className="mb-24 -mx-6">
             <div 
                className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar px-10 gap-8 pb-10"
                onScroll={handleScroll}
            >
                {slides.map((slide, i) => (
                    <div key={i} className="min-w-[75%] snap-center">
                        <div className="bg-white rounded-[3.5rem] border-[8px] border-white overflow-hidden aspect-[9/19] flex items-center justify-center shadow-float group/slide relative">
                             {slide.src ? (
                                <img
                                  src={`${assetBase}${slide.src.replace(/^\//, '')}`}
                                  alt={slide.caption}
                                  className="h-full w-full object-cover"
                                  loading="lazy"
                                />
                              ) : (
                                <>
                                  {/* Abstract placeholder for high-end mobile interface */}
                                  <div className="w-full h-full bg-slate-50 flex flex-col p-10 transition-all duration-1000 group-hover/slide:bg-white">
                                    <div className="w-full h-1 bg-slate-100 rounded-full mb-8"></div>
                                    <div className="space-y-4 opacity-10 group-hover/slide:opacity-25 transition-opacity duration-1000">
                                      <div className="h-40 w-full bg-slate-300 rounded-3xl"></div>
                                      <div className="h-6 w-3/4 bg-slate-300 rounded-full"></div>
                                      <div className="h-6 w-1/2 bg-slate-300 rounded-full"></div>
                                      <div className="mt-20 flex flex-col items-center">
                                        <span className="material-icons text-8xl mb-4">app_shortcut</span>
                                        <p className="text-[0.6rem] font-black uppercase tracking-widest">{slide.caption}</p>
                                      </div>
                                    </div>
                                  </div>
                                </>
                              )}
                             {/* Gloss Overlay */}
                             <div className="absolute inset-0 bg-gradient-to-tr from-black/5 via-transparent to-white/20 pointer-events-none"></div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Visual Progress Bar */}
            <div className="flex justify-center gap-1.5">
                {slides.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-700 ${activeSlide === i ? 'w-12 bg-slate-900' : 'w-3 bg-slate-300'}`} />
                ))}
            </div>
        </section>

        {/* 3. Logic & Architecture */}
        <article className="space-y-24 mb-32 pt-16 border-t border-slate-200">
            <section className="grid gap-6">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
                        <span className="material-icons text-sm">psychology</span>
                    </div>
                    <h3 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.4em]">The Vision</h3>
                </div>
                <p className="text-2xl text-slate-800 leading-tight font-black tracking-tight">
                    {project.fullProblem}
                </p>
            </section>
            
            <section className="grid gap-6">
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#1A1A1A] rounded-lg flex items-center justify-center text-white">
                        <span className="material-icons text-sm">architecture</span>
                    </div>
                    <h3 className="text-[0.65rem] font-black text-slate-400 uppercase tracking-[0.4em]">The Engine</h3>
                </div>
                <p className="text-lg text-slate-500 leading-relaxed font-bold">
                    {project.fullApproach}
                </p>
            </section>
        </article>

        {/* 4. Technical Tray */}
        <footer className="bg-white rounded-[2.5rem] p-10 mb-24 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h4 className="text-[0.6rem] font-black uppercase text-slate-300 tracking-[0.3em]">Module Stack</h4>
                <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                </div>
            </div>
            <div className="flex flex-wrap gap-2.5 mb-12">
                {project.techStack?.map(tech => (
                    <span key={tech} className="px-4 py-2 bg-[#F0F2F5] rounded-xl text-xs font-black text-slate-500 tracking-tight">
                        {tech}
                    </span>
                ))}
            </div>
            {project.repoLink && (
              <a href={project.repoLink} className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100 hover:border-slate-900 transition-all group overflow-hidden relative">
                  <div className="flex items-center gap-4 z-10">
                      <span className="material-icons text-slate-300 group-hover:text-slate-900 transition-colors">code</span>
                      <span className="text-sm font-black text-slate-800 uppercase tracking-widest">Review Source</span>
                  </div>
                  <span className="material-icons text-slate-200 group-hover:text-slate-900 group-hover:translate-x-1 transition-all z-10">east</span>
                  <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
              </a>
            )}
        </footer>

      </main>
    </div>
  );
};
