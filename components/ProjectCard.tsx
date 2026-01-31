import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps & { onClick: () => void }> = ({ project, onClick }) => {
  const renderGeometricToy = () => {
    const baseClass = "absolute transition-all duration-1000 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/btn:scale-110";
    
    switch (project.variant) {
      case 'blue':
        // アングーラ（L字）を想起させる数学的配置
        return (
          <div className="relative w-16 h-24">
            <div className={`${baseClass} inset-0 bg-white/20 rounded-xl group-hover/btn:rotate-180`}></div>
            <div className={`${baseClass} top-0 left-0 w-full h-8 bg-white/40 rounded-sm`}></div>
            <div className={`${baseClass} bottom-0 left-0 w-8 h-8 bg-white/60 rounded-full scale-75 group-hover/btn:scale-100`}></div>
          </div>
        );
      case 'yellow':
        // 円柱とプレートのスタッキング
        return (
          <div className="relative w-16 h-24">
            <div className={`${baseClass} top-2 left-1/2 -translate-x-1/2 w-12 h-12 bg-white/40 rounded-full shadow-inner`}></div>
            <div className={`${baseClass} bottom-2 left-0 w-full h-12 bg-white/20 rounded-lg group-hover/btn:-translate-y-4`}></div>
            <div className={`${baseClass} bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-white/50 rounded-sm rotate-45`}></div>
          </div>
        );
      case 'red':
        // ネフスピールのようなインターロック形状の抽象化
        return (
          <div className="relative w-16 h-24 flex items-center justify-center">
            <div className={`${baseClass} w-14 h-14 bg-white/10 rotate-45 flex items-center justify-center group-hover/btn:rotate-[225deg]`}>
                <div className="w-8 h-8 bg-white/30 rounded-full"></div>
            </div>
            <div className={`${baseClass} bottom-0 w-10 h-2 bg-white/40 rounded-full`}></div>
            <div className={`${baseClass} top-0 w-2 h-10 bg-white/40 rounded-full`}></div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="grid grid-cols-12 gap-8 items-center w-full max-w-md mx-auto px-6 group/item">
      {/* Visual Block Side (Phone Aspect Ratio) */}
      <div className="col-span-5">
        <button 
          onClick={onClick}
          className="group/btn w-full aspect-[3/5] rounded-[2rem] shadow-toy-deep relative flex flex-col items-center justify-center text-white overflow-hidden transition-all duration-700 hover:scale-[1.05] hover:shadow-float hover:-translate-y-2 active:scale-95 active:translate-y-0"
          style={{ backgroundColor: project.themeColor }}
        >
          {/* Geometric Toy Element */}
          <div className="z-10 mb-2">
            {renderGeometricToy()}
          </div>
          
          <div className="mt-4 flex flex-col items-center z-10">
            <span className="material-icons text-2xl mb-1 opacity-80">
              {project.iconName}
            </span>
            <span className="text-[0.5rem] font-black tracking-[0.5em] uppercase opacity-50 leading-none">
              {project.label}
            </span>
          </div>

          {/* Matte & Edge Finish */}
          <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none"></div>
          <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem]"></div>
        </button>
      </div>

      {/* Info Side */}
      <div className="col-span-7 flex flex-col items-start pl-2">
        <div className="mb-4">
           <div className="flex items-center gap-2 mb-2">
             <span className="h-[2px] w-4 bg-slate-300"></span>
             <span className="text-[0.6rem] font-black text-slate-400 uppercase tracking-[0.25em]">
              {project.category}
            </span>
           </div>
          <h2 className="text-3xl font-black leading-[0.85] text-[#1A1A1A] tracking-tighter mb-1">
            {project.title}
          </h2>
        </div>
        
        <p className="text-[0.8rem] text-slate-500 leading-snug font-bold mb-6 line-clamp-3">
          {project.oneLiner || project.problem}
        </p>
        
        <div className="flex items-center gap-2.5">
           <span className="px-2.5 py-1 rounded-lg border border-slate-200 text-[0.55rem] font-black text-slate-400 tracking-wider uppercase bg-white">
            {project.status}
          </span>
          <span className="text-[0.55rem] font-black text-slate-300 uppercase tracking-widest">
            {project.year}
          </span>
        </div>
      </div>
    </section>
  );
};