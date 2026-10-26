import React, { useState } from 'react';
import { Wrench, Plus, Calendar } from 'lucide-react';
import { ProjectCar, Appointment, CarStatus } from './types';

interface AdminDashboardProps {
  onAddCar: (car: ProjectCar) => void;
  appointments: Appointment[];
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onAddCar, appointments }) => {
  const [newCar, setNewCar] = useState({
    year: 2000,
    make: '',
    model: '',
    title: '',
    price: '',
    mileage: '',
    status: 'In Progress' as CarStatus,
    heroImage: '',
    summary: '',
    engine: '',
    transmission: '',
    drivetrain: 'FWD',
    color: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCar.title || !newCar.price) return;

    onAddCar({
      id: `car-${Date.now()}`,
      year: Number(newCar.year) || 2000,
      make: newCar.make || 'Custom',
      model: newCar.model || 'Project',
      title: newCar.title,
      price: Number(newCar.price) || 0,
      mileage: Number(newCar.mileage) || 0,
      status: newCar.status,
      heroImage: newCar.heroImage || 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1000&q=80',
      summary: newCar.summary || 'Fresh mechanic project car under restoration.',
      specs: {
        engine: newCar.engine || 'Stock Motor',
        transmission: newCar.transmission || 'Manual',
        drivetrain: newCar.drivetrain || 'FWD',
        power: 'Factory Standard',
        color: newCar.color || 'Custom Finish',
        vin: 'MOTORA-VERIFIED'
      },
      buildLog: []
    });

    setNewCar({
      year: 2000,
      make: '',
      model: '',
      title: '',
      price: '',
      mileage: '',
      status: 'In Progress',
      heroImage: '',
      summary: '',
      engine: '',
      transmission: '',
      drivetrain: 'FWD',
      color: ''
    });
  };

  return (
    <section className="bg-amber-950/20 border-b border-amber-500/30 py-8 px-4 sm:px-6 lg:px-8 transition-all">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 text-slate-950 p-1.5 rounded font-bold">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-black text-amber-400 font-mono uppercase">Mechanic Control Center</h2>
              <p className="text-xs text-slate-400">Manage project inventory and buyer appointment requests</p>
            </div>
          </div>
          <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded font-mono font-bold">
            Admin Mode
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Add New Car Form */}
          <div className="lg:col-span-7 bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <Plus className="w-4 h-4 text-amber-400" /> Add New Project Vehicle
            </h3>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Year</label>
                  <input 
                    type="number" 
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white focus:border-amber-500 outline-none"
                    value={newCar.year}
                    onChange={e => setNewCar({...newCar, year: Number(e.target.value)})}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Make</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Nissan"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white focus:border-amber-500 outline-none"
                    value={newCar.make}
                    onChange={e => setNewCar({...newCar, make: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Model</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 240SX"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white focus:border-amber-500 outline-none"
                    value={newCar.model}
                    onChange={e => setNewCar({...newCar, model: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Listing Title *</label>
                  <input 
                    type="text" 
                    placeholder="1993 Nissan 240SX Hatch"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white focus:border-amber-500 outline-none"
                    value={newCar.title}
                    onChange={e => setNewCar({...newCar, title: e.target.value})}
                    required
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Asking Price ($) *</label>
                  <input 
                    type="number" 
                    placeholder="7500"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white focus:border-amber-500 outline-none"
                    value={newCar.price}
                    onChange={e => setNewCar({...newCar, price: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1">Mileage</label>
                  <input 
                    type="number" 
                    placeholder="135000"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white focus:border-amber-500 outline-none"
                    value={newCar.mileage}
                    onChange={e => setNewCar({...newCar, mileage: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Status</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white focus:border-amber-500 outline-none"
                    value={newCar.status}
                    onChange={e => setNewCar({...newCar, status: e.target.value as CarStatus})}
                  >
                    <option value="For Sale">For Sale</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Sold">Sold</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Engine Specs</label>
                  <input 
                    type="text" 
                    placeholder="SR20DET Swap"
                    className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white focus:border-amber-500 outline-none"
                    value={newCar.engine}
                    onChange={e => setNewCar({...newCar, engine: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Hero Image URL</label>
                <input 
                  type="url" 
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white focus:border-amber-500 outline-none"
                  value={newCar.heroImage}
                  onChange={e => setNewCar({...newCar, heroImage: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Summary / Repair Overview</label>
                <textarea 
                  rows={2}
                  placeholder="Brief description of mechanical work completed..."
                  className="w-full bg-slate-950 border border-slate-800 rounded px-2.5 py-2 text-white focus:border-amber-500 outline-none"
                  value={newCar.summary}
                  onChange={e => setNewCar({...newCar, summary: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 rounded font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Publish Project to Motora
              </button>
            </form>
          </div>

          {/* Incoming Appointments List */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-4">
            <h3 className="text-sm font-bold text-white uppercase font-mono flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-400" /> Scheduled Meetups ({appointments.length})
            </h3>

            <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
              {appointments.length === 0 ? (
                <p className="text-xs text-slate-500 italic text-center py-6">No appointments requested yet.</p>
              ) : (
                appointments.map(apt => (
                  <div key={apt.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-2">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-amber-400">{apt.carTitle}</span>
                      <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] font-mono">
                        {apt.date} @ {apt.timeSlot}
                      </span>
                    </div>
                    
                    <div className="text-slate-300 space-y-0.5 font-mono text-[11px]">
                      <p><strong className="text-slate-400">Buyer:</strong> {apt.buyerName}</p>
                      <p><strong className="text-slate-400">Contact:</strong> {apt.phone} | {apt.email}</p>
                      <p><strong className="text-slate-400">Location:</strong> {apt.location}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};