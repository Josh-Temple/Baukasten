import React from 'react';
import { ChevronLeft } from 'lucide-react';
import { HOME_HASH } from '../navigation.js';
import { PROJECT_STATUSES } from '../constants';

export const InfoView: React.FC = () => (
  <div className="min-h-screen bg-[#F0F2F5] text-slate-900 pb-20">
    <nav className="sticky top-0 z-40 bg-[#F0F2F5]/90 backdrop-blur-2xl px-5 sm:px-6 py-3 flex items-center justify-between border-b border-slate-300">
      <a
        href={HOME_HASH}
        aria-label="Back to projects"
        className="w-11 h-11 rounded-xl flex items-center justify-center bg-white border border-slate-300 text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <ChevronLeft className="w-6 h-6" aria-hidden="true" />
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
          <p className="text-base sm:text-lg leading-relaxed text-slate-700">Baukasten brings together tools for focused practice and connected reading: mental maths, text recall, English conversation, history, philosophy, and research. Each project page explains the task, suggests a first exercise, and describes how to use the tool.</p>
        </section>
        <section className="border-t border-slate-300 pt-8">
          <h2 className="text-xl font-black mb-5">How projects are selected</h2>
          <ul className="space-y-3">
            {[
              'A specific learning or reading task',
              'A distinct workflow that can be useful on its own',
              'A clear account of current features and conditions for use',
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
          <p className="text-base leading-relaxed text-slate-700 mb-6">The collection is grouped by task. Status labels describe the creator’s use or development focus; they do not measure learning outcomes.</p>
          <dl className="grid gap-5 sm:grid-cols-2 sm:gap-x-10 sm:gap-y-7">
            {Object.entries(PROJECT_STATUSES).map(([term, meaning]) => (
              <div key={term}>
                <dt className="text-sm font-bold text-slate-900">{term}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-slate-700">{meaning}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
      <footer className="mt-16 pt-8 border-t border-slate-300 text-center text-xs font-semibold uppercase tracking-wider text-slate-600">
        Baukasten · {new Date().getFullYear()}
      </footer>
    </main>
  </div>
);
