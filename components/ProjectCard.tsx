import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps & { onClick: () => void }> = ({ project, onClick }) => {
  const resolveAssetUrl = (path?: string) => {
    if (!path) return null;
    const baseHref = window.location.href.endsWith('/')
      ? window.location.href
      : `${window.location.href}/`;
    const baseUrl = new URL(import.meta.env.BASE_URL, baseHref);
    return new URL(path.replace(/^\/+/, ''), baseUrl).toString();
  };

  const cardImage = resolveAssetUrl(project.cardImage);

  return (
    <section className="grid grid-cols-12 gap-8 items-center w-full max-w-md mx-auto px-6 group/item">
      {/* Visual Block Side (Phone Aspect Ratio) */}
      <div className="col-span-5">
        <button 
          onClick={onClick}
          className="group/btn w-full aspect-[3/5] rounded-[2rem] relative flex flex-col items-center justify-center text-white overflow-hidden transition-transform duration-700 hover:scale-[1.03] active:scale-95"
          style={{ backgroundColor: project.themeColor }}
        >
          {cardImage && (
            <img
              src={cardImage}
              alt={`${project.title} preview`}
              className="absolute inset-0 h-full w-full object-cover opacity-90"
              loading="lazy"
            />
          )}
          
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
