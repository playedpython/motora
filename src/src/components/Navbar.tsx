import React from 'react';
import { Wrench, Lock, Unlock, User } from 'lucide-react';

interface NavbarProps {
  showAdminMode: boolean;
  setShowAdminMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ showAdminMode, setShowAdminMode }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-cyan-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Branding & Logo */}
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 p-2.5 rounded-xl font-black shadow-lg shadow-amber-500/20 flex items-center justify-center">
            <Wrench className="w-6 h-6 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-2xl tracking-wider text-white uppercase font-mono">MOTORA</span>
              <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] px-2 py-0.5 rounded-full font-mono font-bold tracking-widest uppercase">
                Youth Builder
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Automotive Restorations & Transparent Build Logs</p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setShowAdminMode(!showAdminMode)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
              showAdminMode 
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20' 
                : 'bg-slate-800/80 hover:bg-slate-800 text-slate-300 border-slate-700'
            }`}
          >
            {showAdminMode ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4 text-amber-500" />}
            <span>{showAdminMode ? 'Mechanic Dashboard: ON' : 'Mechanic Mode'}</span>
          </button>

          <a
            href="#builder-bio"
            className="hidden md:flex items-center gap-2 text-xs font-mono font-bold text-slate-300 hover:text-amber-400 transition-colors px-3 py-2"
          >
            <User className="w-4 h-4 text-cyan-400" />
            Meet Mechanic
          </a>
        </div>

      </div>
    </header>
  );
};
