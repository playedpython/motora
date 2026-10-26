import React from 'react';
import { Wrench, ChevronRight, Eye, Calendar, CheckCircle2 } from 'lucide-react';
import { ProjectCar } from './types';

interface CarCardProps {
  car: ProjectCar;
  onViewDetails: (car: ProjectCar) => void;
  onSchedule: (car: ProjectCar) => void;
}

export const CarCard: React.FC<CarCardProps> = ({ car, onViewDetails, onSchedule }) => {
  const statusColors = {
    'For Sale': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    'In Progress': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Sold': 'bg-slate-800 text-slate-400 border-slate-700'
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col group">
      {/* Photo & Badge */}
      <div className="relative h-48 overflow-hidden bg-slate-950">
        <img 
          src={car.heroImage} 
          alt={car.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
        
        <div className="absolute top-3 left-3">
          <span className={`text-xs px-2.5 py-1 rounded-md font-bold uppercase font-mono border backdrop-blur-md ${statusColors[car.status]}`}>
            {car.status}
          </span>
        </div>

        <div className="absolute bottom-3 right-3 bg-slate-950/90 border border-slate-800 text-amber-400 px-3 py-1 rounded-lg font-black text-lg font-mono">
          ${car.price.toLocaleString()}
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-bold text-lg text-white font-mono group-hover:text-amber-400 transition-colors line-clamp-1">
            {car.title}
          </h3>
          
          <div className="flex items-center gap-3 text-xs text-slate-400 my-2 font-mono">
            <span>{car.year}</span>
            <span>•</span>
            <span>{car.mileage ? `${car.mileage.toLocaleString()} mi` : 'Project'}</span>
            <span>•</span>
            <span>{car.specs.drivetrain}</span>
          </div>

          <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed">
            {car.summary}
          </p>
        </div>

        {/* Build Log Badge */}
        <div className="border-t border-slate-800/80 pt-3 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            {car.buildLog.length} Repairs Documented
          </span>

          <span className="text-amber-400 font-semibold group-hover:underline flex items-center gap-1">
            View Log <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
          <button
            onClick={() => onViewDetails(car)}
            className="bg-slate-800 hover:bg-slate-700 text-white font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" /> Full Specs
          </button>

          {car.status !== 'Sold' ? (
            <button
              onClick={() => onSchedule(car)}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1.5 transition-colors uppercase tracking-wider"
            >
              <Calendar className="w-3.5 h-3.5" /> Schedule
            </button>
          ) : (
            <button 
              disabled
              className="bg-slate-800/50 text-slate-500 font-semibold py-2 px-3 rounded-lg text-xs flex items-center justify-center gap-1 cursor-not-allowed"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-600" /> Sold
            </button>
          )}
        </div>
      </div>
    </div>
  );
};