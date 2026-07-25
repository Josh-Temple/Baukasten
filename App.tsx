import React, { useMemo, useState } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { InfoView } from './components/InfoView';
import { PORTFOLIO_GROUPS, PROJECTS } from './constants';

type ViewState = 'gallery' | 'project' | 'info';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('gallery');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const selectedProject = useMemo(() => PROJECTS.find(project => project.id === selectedProjectId), [selectedProjectId]);
  const goHome = () => { setView('gallery'); setSelectedProjectId(null); window.scrollTo(0, 0); };

  if (view === 'project' && selectedProject) return <ProjectDetail project={selectedProject} onBack={goHome} />;
  if (view === 'info') return <InfoView onBack={goHome} />;

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans pb-24 overflow-x-hidden selection:bg-black selection:text-white">
      <Header onInfoClick={() => setView('info')} />
      <main className="w-full max-w-md mx-auto px-6">
        <p className="max-w-sm text-sm sm:text-base font-bold leading-relaxed text-slate-600 mb-20">
          Small learning and thinking tools, built through repeated personal use and real-world validation. Some are tools I use regularly; others are being tested, consolidated, or developed as longer-term learning systems.
        </p>
        <div className="space-y-24">
          {PORTFOLIO_GROUPS.map(group => (
            <section key={group.id} aria-labelledby={`group-${group.id}`}>
              <header className="mb-10 border-l-4 border-[#BD5B5B] pl-5">
                <h2 id={`group-${group.id}`} className="text-xl font-black tracking-tight text-slate-900">{group.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{group.description}</p>
              </header>
              <div className="space-y-14">
                {PROJECTS.filter(project => project.group === group.id).map(project => (
                  <ProjectCard key={project.id} project={project} onClick={() => { setSelectedProjectId(project.id); setView('project'); window.scrollTo(0, 0); }} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <footer className="mt-24 text-center text-[0.6rem] font-black uppercase tracking-[0.45em] text-slate-400">End of collection</footer>
    </div>
  );
};

export default App;
