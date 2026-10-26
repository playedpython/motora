import React, { useState } from 'react';
import { X, Wrench, Printer, Info, Plus } from 'lucide-react';
import { ProjectCar } from './types';

interface CarDetailsModalProps {
  car: ProjectCar | null;
  onClose: () => void;
  onSchedule: (car: ProjectCar) => void;
  showAdminMode: boolean;
  onAddLogEntry: (carId: string, logData: any) => void;
}

export const CarDetailsModal: React.FC<CarDetailsModalProps> = ({
  car,
  onClose,
  onSchedule,
  showAdminMode,
  onAddLogEntry
}) => {
  if (!car) return null;

  const [showAddLogForm, setShowAddLogForm] = useState(false);
  const [newLog, setNewLog] = useState({
    title: '',
    category: 'Maintenance',
    description: '',
    cost: ''
  });

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLog.title || !newLog.description) return;

    onAddLogEntry(car.id, {
      id: `log-${Date.now()}`,
      title: newLog.title,
      date: new Date().toISOString().split('T')[0],
      category: newLog.category,
      description: newLog.description,
      cost: parseFloat(newLog.cost) || 0
    });

    setNewLog({ title: '', category: 'Maintenance', description: '', cost: '' });
    setShowAddLogForm(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-slate-950/80 hover:bg-slate-800 text-slate-400 hover:text-white p-2 rounded-full border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-slate-800 pb-6">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block mb-1">
                MOTORA Build Sheet & Service Dossier
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white font-mono">{car.title}</h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                VIN: {car.specs.vin} | Mileage: {car.mileage ? car.mileage.toLocaleString() : 'N/A'} mi
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => window.print()}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-2 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
              >
                <Printer className="w-4 h-4 text-amber-400" /> Print Service Report
              </button>

              {car.status !== 'Sold' && (
                <button 
                  onClick={() => onSchedule(car)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors"
                >
                  Schedule Inspection
                </button>
              )}
            </div>
          </div>

          {/* Vehicle Specs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
                <Info className="w-4 h-4 text-amber-400" /> Mechanical Specifications
              </h3>
              
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800/80 text-xs font-mono">
                <div>
                  <span className="text-slate-500 block">Engine</span>
                  <span className="text-slate-200 font-semibold">{car.specs.engine}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Transmission</span>
                  <span className="text-slate-200 font-semibold">{car.specs.transmission}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Drivetrain</span>
                  <span className="text-slate-200 font-semibold">{car.specs.drivetrain}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Color</span>
                  <span className="text-slate-200 font-semibold">{car.specs.color}</span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {car.summary}
              </p>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-800 bg-slate-950 h-48 md:h-auto">
              <img src={car.heroImage} alt={car.title} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Build Log Entries */}
          <div className="space-y-6 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-white uppercase font-mono flex items-center gap-2">
                  <Wrench className="w-5 h-5 text-amber-400" /> Repair & Restoration Timeline
                </h3>
                <p className="text-xs text-slate-400">Complete itemized history of parts replaced and mechanical work</p>
              </div>

              {showAdminMode && (
                <button
                  onClick={() => setShowAddLogForm(!showAddLogForm)}
                  className="bg-amber-500/20 text-amber-300 border border-amber-500/30 hover:bg-amber-500/30 px-3 py-1.5 rounded text-xs font-mono font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Log Repair Entry
                </button>
              )}
            </div>

            {/* Admin Form inside Modal */}
            {showAddLogForm && (
              <form onSubmit={handleLogSubmit} className="bg-slate-950 border border-amber-500/40 p-4 rounded-xl space-y-3 text-xs">
                <h4 className="font-bold text-amber-400 uppercase font-mono">Add Repair Entry</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Repair Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. New Alternator & Belt" 
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white outline-none focus:border-amber-500"
                      value={newLog.title}
                      onChange={e => setNewLog({...newLog, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">Category</label>
                    <select 
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white outline-none focus:border-amber-500"
                      value={newLog.category}
                      onChange={e => setNewLog({...newLog, category: e.target.value as any})}
                    >
                      <option value="Engine & Tuning">Engine & Tuning</option>
                      <option value="Suspension & Brakes">Suspension & Brakes</option>
                      <option value="Maintenance">Maintenance</option>
                      <option value="Interior & Detailing">Interior & Detailing</option>
                      <option value="Safety & Chassis">Safety & Chassis</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-mono">Parts Cost ($)</label>
                    <input 
                      type="number" 
                      placeholder="150" 
                      className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white outline-none focus:border-amber-500"
                      value={newLog.cost}
                      onChange={e => setNewLog({...newLog, cost: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Detailed Explanation</label>
                  <textarea 
                    rows={2} 
                    placeholder="Replaced worn seals, torqued to factory specifications..." 
                    className="w-full bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 text-white outline-none focus:border-amber-500"
                    value={newLog.description}
                    onChange={e => setNewLog({...newLog, description: e.target.value})}
                    required
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded font-mono uppercase text-xs"
                >
                  Save Entry
                </button>
              </form>
            )}

            {/* List Entries */}
            <div className="space-y-4">
              {car.buildLog.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-4">No repair entries logged yet.</p>
              ) : (
                car.buildLog.map((log) => (
                  <div key={log.id} className="bg-slate-950 border border-slate-800/80 p-4 rounded-xl space-y-3">
                    <div className="flex flex-wrap justify-between items-start gap-2">
                      <div>
                        <span className="text-[10px] bg-slate-800 text-amber-400 px-2 py-0.5 rounded font-mono font-bold mr-2">
                          {log.category}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">{log.date}</span>
                        <h4 className="font-bold text-white text-sm mt-1">{log.title}</h4>
                      </div>

                      {log.cost && (
                        <span className="text-xs bg-slate-900 text-slate-300 border border-slate-800 px-2.5 py-1 rounded font-mono">
                          Parts Cost: ${log.cost}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {log.description}
                    </p>

                    {(log.beforeImg || log.afterImg) && (
                      <div className="grid grid-cols-2 gap-3 pt-2">
                        {log.beforeImg && (
                          <div className="space-y-1">
                            <span className="text-[10px] text-slate-500 font-mono uppercase block">Before Work</span>
                            <img src={log.beforeImg} alt="Before repair" className="h-28 w-full object-cover rounded-lg border border-slate-800" />
                          </div>
                        )}
                        {log.afterImg && (
                          <div className="space-y-1">
                            <span className="text-[10px] text-amber-400 font-mono uppercase block">Completed Work</span>
                            <img src={log.afterImg} alt="After repair" className="h-28 w-full object-cover rounded-lg border border-slate-800" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};