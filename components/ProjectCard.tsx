import React from 'react';
import { Project } from '../types';
import { projectHref } from '../navigation.js';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const image = project.cardImage ? `./${project.cardImage.replace(/^\//, '')}` : undefined;

  return (
    <article className="group">
      <a
        href={projectHref(project.id)}
        aria-labelledby={`project-${project.id}-title`}
        className="flex items-start sm:items-center gap-4 sm:gap-6 py-4 sm:py-5 border-b border-slate-300 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-slate-900"
      >
        <div
          className="shrink-0 w-[38%] max-w-40 aspect-[3/5] rounded-2xl relative flex items-center justify-center text-white overflow-hidden transition-transform duration-300 motion-reduce:transition-none motion-reduce:transform-none group-hover:-translate-y-1"
          style={{ backgroundColor: project.themeColor }}
        >
          {image ? (
            <img
              src={image}
              alt={`${project.title} interface preview`}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
          ) : (
            <span className="material-icons text-5xl opacity-80" aria-hidden="true">{project.iconName}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3
            id={`project-${project.id}-title`}
            className="text-lg sm:text-xl xl:text-2xl font-black tracking-tight leading-snug text-slate-900 break-words"
          >
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed font-medium text-slate-700">{project.oneLiner}</p>
          <p className="mt-3 text-xs font-semibold text-slate-600">{project.status}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-slate-900 underline underline-offset-4 decoration-slate-400 group-hover:decoration-slate-900">
            View project <span className="material-icons text-base" aria-hidden="true">arrow_forward</span>
          </span>
        </div>
      </a>
    </article>
  );
};
