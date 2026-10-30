import React, { useEffect, useRef, useState } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { InfoView } from './components/InfoView';
import { HOME_HASH, resolveRoute } from './navigation.js';
import { PORTFOLIO_GROUPS, PROJECTS } from './constants';
import { localizeGroup, localizeProject } from './localization.js';
import { useLanguage } from './language';

const App: React.FC = () => {
  const { language, copy } = useLanguage();
  const [route, setRoute] = useState(() => resolveRoute(window.location.hash, PROJECTS));
  const lastRenderedHash = useRef(window.location.hash);
  const selectedProject = route.view === 'project'
    ? PROJECTS.find(project => project.id === route.projectId)
    : undefined;

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(resolveRoute(window.location.hash, PROJECTS));
      window.scrollTo(0, 0);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.title = selectedProject
      ? `${selectedProject.title} — Baukasten`
      : route.view === 'info' ? `${copy.about} — Baukasten`
      : route.view === 'not-found' ? `${copy.notFound} — Baukasten`
      : copy.pageTitle;

    // Move keyboard/screen-reader focus into the new view after in-page navigation.
    // Do not steal focus on first load or direct-link refresh.
    if (lastRenderedHash.current !== window.location.hash) {
      document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true });
      lastRenderedHash.current = window.location.hash;
    }
  }, [route.view, route.projectId, selectedProject, language, copy]);

  if (route.view === 'project' && selectedProject) {
    return <ProjectDetail project={localizeProject(selectedProject, language)} />;
  }
  if (route.view === 'info') return <InfoView />;
  if (route.view === 'not-found') {
    return (
      <div className="min-h-screen bg-[#F0F2F5] text-slate-900 px-6">
        <main tabIndex={-1} className="max-w-2xl mx-auto pt-24 focus:outline-none">
          <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-4">{copy.notFound}</p>
          <h1 className="text-3xl font-black tracking-tight mb-5">{copy.notFoundTitle}</h1>
          <p className="text-base leading-relaxed text-slate-600 mb-8">{copy.notFoundBody}</p>
          <a href={HOME_HASH} className="inline-flex min-h-11 items-center rounded-xl bg-[#1A1A1A] px-6 text-white font-bold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
            {copy.back}
          </a>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans pb-20 overflow-x-hidden selection:bg-black selection:text-white">
      <Header />
      <main tabIndex={-1} className="w-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 focus:outline-none">
        <p className="max-w-2xl text-base font-medium leading-relaxed text-slate-700 mb-14 sm:mb-16 lg:mb-20">
          {copy.intro}
        </p>
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          {PORTFOLIO_GROUPS.map(group => (
            <section key={group.id} aria-labelledby={`group-${group.id}`}>
              <header className="mb-7 sm:mb-9 max-w-2xl border-b border-slate-300 pb-5 sm:pb-6">
                <h2 id={`group-${group.id}`} className="text-2xl font-black tracking-tight text-slate-900">{localizeGroup(group, language).title}</h2>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">{localizeGroup(group, language).description}</p>
              </header>
              <div className="space-y-7 sm:space-y-9 lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-10 lg:space-y-0">
                {PROJECTS.filter(project => project.group === group.id).map(project => (
                  <ProjectCard key={project.id} project={localizeProject(project, language)} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <footer className="mt-20 px-5 text-center text-sm text-slate-600">
        <a href="#/about" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">{copy.aboutLink}</a>
      </footer>
    </div>
  );
};

export default App;
