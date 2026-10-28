import React from 'react';
import { HOME_HASH } from '../navigation.js';

const statuses = [
  ['Daily use', 'used repeatedly in the creator’s own practice'],
  ['In validation', 'currently being tested with real users'],
  ['Stable', 'usable and not under active expansion'],
  ['Consolidating', 'existing material is being simplified or connected'],
  ['Infrastructure', 'supports research, writing, or other tools'],
];

export const InfoView: React.FC = () => (
  <div className="min-h-screen bg-[#F0F2F5] text-slate-900 pb-20">
    <nav className="sticky top-0 z-40 bg-[#F0F2F5]/90 backdrop-blur-2xl px-5 sm:px-6 py-3 flex items-center justify-between border-b border-slate-300">
      <a
        href={HOME_HASH}
        aria-label="Back to projects"
        className="w-11 h-11 rounded-xl flex items-center justify-center bg-white border border-slate-300 text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <span className="material-icons" aria-hidden="true">chevron_left</span>
      </a>
      <span className="text-sm font-bold uppercase tracking-wide">About</span>
      <div className="w-11" aria-hidden="true" />
    </nav>
    <main tabIndex={-1} className="focus:outline-none max-w-2xl mx-auto px-5 sm:px-6 pt-12 sm:pt-16">
      <div className="w-24 h-24 rounded-full relative mb-10 overflow-hidden bg-white" aria-hidden="true">
        <div className="absolute top-0 left-0 w-14 h-14 bg-[#BD5B5B]" />
        <div className="absolute bottom-0 right-0 w-14 h-14 bg-[#5B7A96] rounded-full translate-x-1/4 translate-y-1/4" />
        <div className="absolute top-1/2 left-1/2 w-8 h-8 bg-[#DCA258] rotate-45 -translate-x-1/2 -translate-y-1/2" />
      </div>
      <div className="space-y-12 sm:space-y-14">
        <section>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-5">Why Baukasten exists</h1>
          <p className="text-base sm:text-lg leading-relaxed text-slate-700">Baukasten is a collection of small learning and thinking tools built around recurring problems. The projects are shaped by repeated personal use, then tested or refined when they may help other people.</p>
        </section>
        <section className="border-t border-slate-300 pt-8">
          <h2 className="text-xl font-black mb-5">How projects are selected</h2>
          <ul className="space-y-3">
            {[
              'Solves a recurring problem',
              'Has evidence of real use',
              'Supports a clear user task',
              'Has an honest current status',
              'Adds a distinct idea to the collection',
            ].map(item => (
              <li key={item} className="flex items-start gap-3 text-base leading-relaxed text-slate-700">
                <span className="shrink-0 w-2 h-2 mt-2 rounded-full bg-[#BD5B5B]" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>
        <section className="border-t border-slate-300 pt-8">
          <h2 className="text-xl font-black mb-5">Status meanings</h2>
          <dl className="grid gap-5 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-7">
            {statuses.map(([term, meaning]) => (
              <div key={term}>
                <dt className="text-sm font-bold text-slate-900">{term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-700">{meaning}</dd>
              </div>
            ))}
          </dl>
        </section>
        <section className="border-t border-slate-300 pt-8">
          <h2 className="text-xl font-black mb-5">Current approach</h2>
          <p className="text-base sm:text-lg leading-relaxed text-slate-700">Use before expansion. Validate before major features. Keep specialist tools specialist when their narrow focus is their strength.</p>
        </section>
      </div>
      <footer className="mt-16 pt-8 border-t border-slate-300 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
        Baukasten · {new Date().getFullYear()}
      </footer>
    </main>
  </div>
);
