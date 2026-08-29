import React from 'react';

const statuses = [
  ['Daily use', 'used repeatedly in the creator’s own practice'],
  ['In validation', 'currently being tested with real users'],
  ['Stable', 'usable and not under active expansion'],
  ['Consolidating', 'existing material is being simplified or connected'],
  ['Infrastructure', 'supports research, writing, or other tools'],
];

export const InfoView: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="min-h-screen bg-[#F0F2F5] text-slate-900 pb-24 overflow-x-hidden">
    <nav className="sticky top-0 z-40 bg-[#F0F2F5]/90 backdrop-blur-2xl px-6 py-5 flex items-center justify-between border-b border-slate-200"><button onClick={onBack} aria-label="Back to projects" className="w-12 h-12 rounded-2xl flex items-center justify-center bg-white border border-slate-200 text-slate-500 shadow-sm active:scale-90 focus-visible:outline focus-visible:outline-2"><span className="material-icons" aria-hidden="true">chevron_left</span></button><span className="text-base font-black uppercase">About</span><div className="w-12" /></nav>
    <main className="max-w-2xl mx-auto px-8 pt-16 lg:pt-20">
      <div className="w-36 h-36 rounded-full shadow-toy relative mx-auto mb-20 overflow-hidden bg-white" aria-hidden="true"><div className="absolute top-0 left-0 w-20 h-20 bg-[#BD5B5B]"/><div className="absolute bottom-0 right-0 w-20 h-20 bg-[#5B7A96] rounded-full translate-x-1/4 translate-y-1/4"/><div className="absolute top-1/2 left-1/2 w-10 h-10 bg-[#DCA258] rotate-45 -translate-x-1/2 -translate-y-1/2"/></div>
      <div className="space-y-20 lg:space-y-24">
        <section><h1 className="text-3xl lg:text-4xl font-black tracking-tighter mb-6">Why Baukasten exists</h1><p className="text-base lg:text-lg font-bold leading-relaxed text-slate-600">Baukasten is a collection of small learning and thinking tools built around recurring problems. The projects are shaped by repeated personal use, then tested or refined when they may help other people.</p></section>
        <section><h2 className="text-xl font-black mb-6">How projects are selected</h2><ul className="space-y-3">{['Solves a recurring problem', 'Has evidence of real use', 'Supports a clear user task', 'Has an honest current status', 'Adds a distinct idea to the collection'].map(item => <li key={item} className="flex gap-3 text-sm lg:text-base font-bold text-slate-600"><span className="text-[#BD5B5B]">■</span>{item}</li>)}</ul></section>
        <section><h2 className="text-xl font-black mb-6">Status meanings</h2><dl className="space-y-5 sm:grid sm:grid-cols-2 sm:gap-x-10 sm:gap-y-7 sm:space-y-0">{statuses.map(([term, meaning]) => <div key={term}><dt className="text-xs font-black uppercase tracking-widest text-slate-800">{term}</dt><dd className="mt-1 text-sm leading-relaxed text-slate-600">{meaning}</dd></div>)}</dl></section>
        <section><h2 className="text-xl font-black mb-6">Current approach</h2><p className="text-base lg:text-lg font-bold leading-relaxed text-slate-600">Use before expansion. Validate before major features. Keep specialist tools specialist when their narrow focus is their strength.</p></section>
      </div>
      <footer className="mt-24 pt-10 border-t border-slate-200 text-center text-[0.6rem] font-black uppercase tracking-[0.35em] text-slate-400">Baukasten · {new Date().getFullYear()}</footer>
    </main>
  </div>
);
