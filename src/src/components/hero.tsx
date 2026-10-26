import React from 'react';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface HeroProps {
  soldCount: number;
  availableCount: number;
  repairsCount: number;
}

export const Hero: React.FC<HeroProps> = ({ soldCount, availableCount, repairsCount }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 py-12 border-b border-slate-800/60">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 bg-slate-800/90 border border-cyan-500/30 rounded-full px-3.5 py-1 text-xs text-cyan-400 font-mono font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Building & Restoring Enthusiast Cars at Age 15</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-mono leading-tight">
              MOTORA <span className="text-slate-500">//</span> GARAGE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-cyan-400">
                100% Repair Transparency
              </span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base max-w-2xl leading-relaxed">
              Every project car at Motora is meticulously diagnosed, overhauled, and documented. View itemized parts lists, before/after photos, and test results—then schedule an in-person viewing.
            </p>

            {/* Minor Seller & Parent Safety Banner */}
            <div className="flex items-start gap-3 bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 max-w-2xl text-xs text-amber-200">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-amber-400 block mb-0.5 font-mono uppercase">Parent Accompanied & Verified Title Transfer</span>
                All vehicle viewings, test drives, and legal contract signatures are conducted directly alongside my parent/guardian for complete safety and compliance.
              </div>
            </div>
          </div>

          {/* Garage Stats */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-3 font-mono">
            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
              <span className="text-3xl font-black text-amber-400 block">{soldCount}</span>
              <span className="text-[11px] text-slate-400 font-medium uppercase">Projects Sold</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
              <span className="text-3xl font-black text-cyan-400 block">{availableCount}</span>
              <span className="text-[11px] text-slate-400 font-medium uppercase">Ready For Sale</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
              <span className="text-3xl font-black text-amber-400 block">{repairsCount}</span>
              <span className="text-[11px] text-slate-400 font-medium uppercase">Repairs Logged</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-center">
              <span className="text-3xl font-black text-white block">100%</span>
              <span className="text-[11px] text-slate-400 font-medium uppercase">Receipt Integrity</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};