import React from 'react';
import { Project } from '../types';

const assetUrl = (path: string) => `./${path.replace(/^\//, '')}`;

export const ProjectDetail: React.FC<{ project: Project; onBack: () => void }> = ({ project, onBack }) => {
  const primaryLink = project.demoLink || project.repoLink;
  const primaryLabel = project.primaryActionLabel || (project.demoLink ? 'Open app' : 'View source');
  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 pb-32 overflow-x-hidden">
      <nav className="sticky top-0 z-40 bg-[#F0F2F5]/90 backdrop-blur-2xl px-6 py-5 flex items-center justify-between border-b border-slate-200">
        <button onClick={onBack} aria-label="Back to projects" className="w-12 h-12 rounded-2xl flex items-center justify-center text-slate-500 bg-white border border-slate-200 shadow-sm active:scale-90 focus-visible:outline focus-visible:outline-2"><span className="material-icons" aria-hidden="true">chevron_left</span></button>
        <span className="text-sm font-black uppercase tracking-tight text-slate-800 text-center px-3">{project.title}</span><div className="w-12" />
      </nav>
      <main className="max-w-xl mx-auto px-6">
        <header className="py-16 text-center">
          <span className="inline-flex px-4 py-1.5 rounded-xl bg-white border border-slate-200 text-[0.6rem] font-black text-slate-600 tracking-[0.2em] uppercase mb-7">{project.status}</span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900 mb-7 leading-[0.9] break-words">{project.title}</h1>
          <p className="text-lg text-slate-600 leading-snug font-bold max-w-md mx-auto">{project.oneLiner}</p>
          {primaryLink && <a href={primaryLink} target="_blank" rel="noopener noreferrer" className="mt-10 mx-auto w-full max-w-xs bg-[#1A1A1A] text-white font-black py-5 px-8 rounded-2xl shadow-toy-deep hover:-translate-y-1 transition-all flex items-center justify-center gap-3 active:translate-y-0"><span className="tracking-widest uppercase text-xs">{primaryLabel}</span><span className="material-icons text-lg" aria-hidden="true">arrow_outward</span></a>}
          {project.trustNote && <p className="mt-5 text-xs text-slate-500 font-bold">{project.trustNote}</p>}
        </header>

        <article className="space-y-16 border-t border-slate-200 pt-16">
          {[["Who it is for", project.audience], ["The problem", project.fullProblem], ["How it helps", project.fullApproach]].map(([title, copy]) => copy && <section key={title}><h2 className="text-[0.65rem] font-black text-slate-500 uppercase tracking-[0.3em] mb-5">{title}</h2><p className="text-lg text-slate-700 leading-relaxed font-bold">{copy}</p></section>)}
          {project.howItWorks?.length ? <section><h2 className="text-[0.65rem] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">How it works</h2><div className="space-y-4">{project.howItWorks.map((step, index) => <div key={step.title} className="bg-white border border-slate-200 rounded-2xl p-6"><p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">0{index + 1} · {step.title}</p><p className="text-sm font-bold text-slate-600 leading-relaxed">{step.desc}</p></div>)}</div></section> : null}
          {project.screenshots?.length ? <section><h2 className="text-[0.65rem] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Screenshots</h2><div className="flex overflow-x-auto snap-x gap-6 pb-5">{project.screenshots.map(screen => <figure key={screen.src} className="min-w-[78%] snap-center"><img src={assetUrl(screen.src)} alt={`${project.title}: ${screen.caption}`} className="w-full rounded-[2rem] border-4 border-white shadow-float" loading="lazy"/><figcaption className="mt-3 text-xs font-bold text-slate-500 text-center">{screen.caption}</figcaption></figure>)}</div></section> : null}
          {(project.techStack?.length || project.repoLink) && <section className="bg-white rounded-[2rem] p-8 border border-slate-200"><h2 className="text-[0.65rem] font-black text-slate-500 uppercase tracking-[0.3em] mb-6">Technical details</h2>{project.techStack?.length ? <div className="flex flex-wrap gap-2">{project.techStack.map(tech => <span key={tech} className="px-3 py-2 bg-[#F0F2F5] rounded-xl text-xs font-bold text-slate-600">{tech}</span>)}</div> : null}{project.repoLink && project.repoLink !== primaryLink ? <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex font-black text-sm underline underline-offset-4">View source</a> : null}</section>}
        </article>
      </main>
    </div>
  );
};
