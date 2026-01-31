import React from 'react';

interface SettingsViewProps {
  onBack: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#F0F2F5] text-slate-900 font-sans pb-32 animate-fade-in">
      <nav className="sticky top-0 z-40 bg-[#F0F2F5]/90 backdrop-blur-2xl px-6 py-6 flex items-center justify-between border-b border-slate-200">
        <button onClick={onBack} className="w-12 h-12 -ml-2 rounded-2xl flex items-center justify-center text-slate-400 bg-white border border-slate-100 shadow-sm transition-all active:scale-90">
          <span className="material-icons">chevron_left</span>
        </button>
        <span className="text-base font-black text-slate-800 tracking-tight uppercase">Configuration</span>
        <div className="w-12"></div>
      </nav>

      <main className="max-w-md mx-auto px-6 pt-12">
        <header className="mb-16">
            <p className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-slate-400 mb-2">Engine Settings</p>
            <h2 className="text-3xl font-black tracking-tighter uppercase">Environment</h2>
        </header>

        <section className="space-y-4">
            {/* Visual Settings Group */}
            <div className="p-8 bg-white rounded-[2rem] border border-slate-200 shadow-sm space-y-10">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest mb-1">High Contrast</h3>
                        <p className="text-[0.65rem] text-slate-400 font-bold uppercase">Enhanced edge detection</p>
                    </div>
                    <div className="w-12 h-6 bg-slate-100 rounded-full relative p-1">
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-widest mb-1">Motion Blur</h3>
                        <p className="text-[0.65rem] text-slate-400 font-bold uppercase">Simulate kinetic energy</p>
                    </div>
                    <div className="w-12 h-6 bg-[#1A1A1A] rounded-full relative p-1 flex justify-end">
                        <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 pt-4 border-t border-slate-50">
                    <h3 className="text-xs font-black uppercase tracking-widest text-slate-400">Archive Grid Scale</h3>
                    <div className="w-full h-1 bg-slate-100 rounded-full relative">
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#BD5B5B] rounded-full shadow-toy"></div>
                    </div>
                    <div className="flex justify-between text-[0.55rem] font-black text-slate-300 uppercase tracking-widest">
                        <span>Minimal</span>
                        <span>Dense</span>
                    </div>
                </div>
            </div>

            {/* System Info Group */}
            <div className="p-8 bg-slate-100/50 rounded-[2rem] border border-slate-200 space-y-6">
                 <h3 className="text-[0.6rem] font-black uppercase tracking-[0.4em] text-slate-300">Diagnostic</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <p className="text-[0.5rem] font-black text-slate-300 uppercase mb-1">Version</p>
                        <p className="text-xs font-black">2.4.0-STABLE</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-slate-200">
                        <p className="text-[0.5rem] font-black text-slate-300 uppercase mb-1">Engine</p>
                        <p className="text-xs font-black">VITE+R19</p>
                    </div>
                 </div>
            </div>

            <button className="w-full py-6 rounded-2xl bg-white border border-slate-200 text-[0.65rem] font-black uppercase tracking-[0.3em] text-[#BD5B5B] hover:bg-red-50 transition-colors active:scale-95 mt-8">
                Reset Module Cache
            </button>
        </section>
      </main>
    </div>
  );
};