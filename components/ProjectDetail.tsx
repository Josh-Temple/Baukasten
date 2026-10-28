import React from 'react';
import { Project } from '../types';
import { HOME_HASH } from '../navigation.js';

const assetUrl = (path: string) => `./${path.replace(/^\//, '')}`;

export const ProjectDetail: React.FC<{ project: Project }> = ({ project }) => {
  const primaryLink = project.demoLink || project.repoLink;
  const primaryLabel = project.primaryActionLabel || (project.demoLink ? 'Open app' : 'View source');
  const multipleScreenshots = (project.screenshots?.length ?? 0) > 1;

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 pb-20">
      <nav className="sticky top-0 z-40 bg-[#F0F2F5]/90 backdrop-blur-2xl px-5 sm:px-6 py-3 flex items-center justify-between border-b border-slate-300">
        <a
          href={HOME_HASH}
          aria-label="Back to projects"
          className="w-11 h-11 rounded-xl flex items-center justify-center text-slate-700 bg-white border border-slate-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <span className="material-icons" aria-hidden="true">chevron_left</span>
        </a>
        <span className="text-sm font-bold tracking-tight text-slate-800 text-center px-3 break-words">{project.title}</span>
        <div className="w-11 shrink-0" aria-hidden="true" />
      </nav>
      <main tabIndex={-1} className="focus:outline-none max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <header className="py-12 sm:py-16 text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-5">{project.status}</p>
          <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight break-words">{project.title}</h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-xl mx-auto">{project.oneLiner}</p>
          {primaryLink && (
            <a
              href={primaryLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 mx-auto w-full max-w-xs min-h-12 bg-[#1A1A1A] text-white font-bold px-6 py-4 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            >
              <span className="tracking-wide text-sm">{primaryLabel}</span>
              <span className="material-icons text-lg" aria-hidden="true">arrow_outward</span>
            </a>
          )}
          {project.trustNote && <p className="mt-4 text-sm text-slate-600">{project.trustNote}</p>}
        </header>

        <article className="space-y-12 sm:space-y-14 border-t border-slate-300 pt-12 sm:pt-14">
          {[
            ['Who it is for', project.audience],
            ['The problem', project.fullProblem],
            ['How it helps', project.fullApproach],
          ].map(([title, copy]) => copy && (
            <section key={title} className="max-w-2xl mx-auto">
              <h2 className="text-sm font-black text-slate-900 mb-3">{title}</h2>
              <p className="text-base sm:text-lg text-slate-700 leading-relaxed">{copy}</p>
            </section>
          ))}

          {project.howItWorks?.length ? (
            <section className="max-w-4xl mx-auto">
              <h2 className="text-xl font-black tracking-tight text-slate-900 mb-6">How it works</h2>
              <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {project.howItWorks.map((step, index) => (
                  <li key={step.title} className="border-t border-slate-300 pt-4">
                    <p className="text-xs font-semibold text-slate-600 mb-2">Step {index + 1}</p>
                    <h3 className="text-base font-black text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-700">{step.desc}</p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {project.screenshots?.length ? (
            <section>
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-6">
                <h2 className="text-xl font-black tracking-tight text-slate-900">Screenshots</h2>
                {multipleScreenshots && <p className="text-xs text-slate-600 sm:hidden">Swipe to see more</p>}
              </div>
              <div
                className={
                  multipleScreenshots
                    ? 'flex overflow-x-auto snap-x gap-4 pb-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0'
                    : 'max-w-xl mx-auto'
                }
              >
                {project.screenshots.map(screen => (
                  <figure
                    key={screen.src}
                    className={multipleScreenshots ? 'min-w-[78%] snap-center sm:min-w-0' : ''}
                  >
                    <img
                      src={assetUrl(screen.src)}
                      alt={`${project.title}: ${screen.caption}`}
                      className="block w-full rounded-2xl border border-slate-300"
                      loading="lazy"
                    />
                    <figcaption className="mt-3 text-sm text-slate-600 text-center">{screen.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {(project.techStack?.length || project.repoLink) && (
            <section className="max-w-2xl mx-auto border-t border-slate-300 pt-8">
              <h2 className="text-sm font-black text-slate-900 mb-4">Technical details</h2>
              {project.techStack?.length ? (
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {project.techStack.map(tech => <li key={tech} className="text-sm text-slate-700">{tech}</li>)}
                </ul>
              ) : null}
              {project.repoLink && project.repoLink !== primaryLink ? (
                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex min-h-11 items-center font-bold text-sm underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                  View source
                </a>
              ) : null}
            </section>
          )}
        </article>
      </main>
    </div>
  );
};
