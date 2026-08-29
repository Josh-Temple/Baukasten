import React from 'react';
import { Project } from '../types';

export const ProjectCard: React.FC<{ project: Project; onClick: () => void }> = ({ project, onClick }) => {
  const image = project.cardImage ? `./${project.cardImage.replace(/^\//, '')}` : undefined;
  return (
    <article className="grid grid-cols-12 gap-6 items-center group">
      <button onClick={onClick} aria-label={`View ${project.title} details`} className="col-span-5 w-full aspect-[3/5] md:aspect-[4/5] rounded-[2rem] relative flex items-center justify-center text-white overflow-hidden transition-transform duration-300 hover:-translate-y-1 active:scale-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4" style={{ backgroundColor: project.themeColor }}>
        {image ? <img src={image} alt={`${project.title} interface`} className="absolute inset-0 h-full w-full object-cover" loading="lazy" /> : <span className="material-icons text-5xl opacity-80" aria-hidden="true">{project.iconName}</span>}
      </button>
      <div className="col-span-7 min-w-0">
        <p className="text-[0.55rem] font-black uppercase tracking-[0.18em] text-slate-500 mb-2">{project.group.replaceAll('-', ' ')}</p>
        <h3 className="text-xl lg:text-2xl font-black tracking-tight leading-tight text-slate-900 mb-3 break-words">{project.title}</h3>
        <p className="text-[0.8rem] lg:text-sm text-slate-600 leading-snug font-bold mb-5">{project.oneLiner}</p>
        <span className="inline-block px-2.5 py-1 rounded-lg border border-slate-300 text-[0.55rem] font-black text-slate-600 tracking-wider uppercase bg-white">{project.status}</span>
      </div>
    </article>
  );
};
