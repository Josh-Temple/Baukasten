import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ProjectCard } from './components/ProjectCard';
import { ProjectDetail } from './components/ProjectDetail';
import { InfoView } from './components/InfoView';
import { PROJECTS } from './constants';

type ViewState = 'gallery' | 'project' | 'info';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('gallery');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    const cats = new Set(PROJECTS.map(p => p.category).filter(Boolean));
    return ['All', ...Array.from(cats)];
  }, []);

  const selectedProject = useMemo(() => 
    PROJECTS.find(p => p.id === selectedProjectId), 
    [selectedProjectId]
  );

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleBack = () => {
    setView('gallery');
    setSelectedProjectId(null);
  };

  if (view === 'project' && selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={handleBack} />;
  }

  if (view === 'info') {
    return <InfoView onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans pb-32 transition-colors duration-500 overflow-x-hidden selection:bg-black selection:text-white">
      <Header 
        onInfoClick={() => setView('info')} 
      />
      
      {/* Precision Navigation / Tray */}
      <nav className="w-full max-w-md mx-auto px-6 mb-12 flex gap-2 overflow-x-auto hide-scrollbar sticky top-0 z-20 py-6 bg-[#F0F2F5]/80 backdrop-blur-md">
        <div className="flex gap-1.5 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat || 'All')}
              className={`px-6 py-2.5 rounded-xl text-[0.65rem] font-black transition-all duration-300 whitespace-nowrap tracking-[0.2em] uppercase ${
                activeCategory === cat 
                  ? 'bg-[#1A1A1A] text-white shadow-toy' 
                  : 'text-slate-400 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* Structured Archive Grid - Spacing adjusted for better density */}
      <main className="w-full space-y-16">
        {filteredProjects.length > 0 ? (
          filteredProjects.map(project => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => {
                setSelectedProjectId(project.id);
                setView('project');
              }}
            />
          ))
        ) : (
          <div className="w-full max-w-md mx-auto px-6 text-center py-48 opacity-10 grayscale">
            <span className="material-icons text-8xl mb-4">inventory_2</span>
            <p className="text-xs font-black tracking-[0.5em] uppercase">No Modules Found</p>
          </div>
        )}
      </main>

      {/* Minimal Footer */}
      <footer className="mt-24 mb-20 text-center">
        <div className="inline-flex items-center gap-4 opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default">
          <div className="w-2 h-2 rounded-full bg-primary"></div>
          <span className="text-[0.6rem] font-black uppercase tracking-[0.6em] text-slate-400">End of Module</span>
          <div className="w-2 h-2 rounded-full bg-primary"></div>
        </div>
      </footer>
    </div>
  );
};

export default App;