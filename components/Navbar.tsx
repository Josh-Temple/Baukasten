import React from 'react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-auto min-w-[300px] px-2 py-2 bg-slate-900/90 backdrop-blur-2xl rounded-full shadow-2xl flex items-center justify-between z-50 border border-white/10">
      <button className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg">
        <span className="material-icons text-xl">grid_view</span>
      </button>
      
      <div className="flex items-center gap-2 px-4">
        <button className="w-10 h-10 text-white/50 rounded-full flex items-center justify-center hover:text-white hover:bg-white/10 transition-all">
          <span className="material-icons text-xl">search</span>
        </button>
        <button className="w-10 h-10 text-white/50 rounded-full flex items-center justify-center hover:text-white hover:bg-white/10 transition-all">
          <span className="material-icons text-xl">insights</span>
        </button>
        <button className="w-10 h-10 text-white/50 rounded-full flex items-center justify-center hover:text-white hover:bg-white/10 transition-all">
          <span className="material-icons text-xl">person</span>
        </button>
      </div>

      <div className="h-4 w-px bg-white/10 mx-1"></div>
      
      <button className="w-12 h-12 text-white/50 rounded-full flex items-center justify-center hover:text-white transition-all">
        <span className="material-icons text-xl">notifications</span>
      </button>
    </nav>
  );
};