import React, { useState, useMemo } from 'react';
import { Car, Wrench, Instagram, Youtube, FileText, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ProjectCar, Appointment, CarStatus, BuildLogEntry } from './types';
import { INITIAL_CARS, INITIAL_APPOINTMENTS } from './mockData';
import { Navbar } from './Navbar';
import { Hero } from './Hero';
import { CarCard } from './CarCard';
import { CarDetailsModal } from './CarDetailsModal';
import { ScheduleMeetupModal } from './ScheduleMeetupModal';
import { AdminDashboard } from './AdminDashboard';

export default function App() {
  const [cars, setCars] = useState<ProjectCar[]>(INITIAL_CARS);
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [selectedCar, setSelectedCar] = useState<ProjectCar | null>(null);
  const [schedulingCar, setSchedulingCar] = useState<ProjectCar | null>(null);
  const [showAdminMode, setShowAdminMode] = useState<boolean>(false);

  // Filter cars based on tab selection
  const filteredCars = useMemo(() => {
    if (filterStatus === 'All') return cars;
    return cars.filter(c => c.status === filterStatus);
  }, [cars, filterStatus]);

  // Handlers for state updates
  const handleAddCar = (newCar: ProjectCar) => {
    setCars([newCar, ...cars]);
  };

  const handleAddAppointment = (newAppointment: Appointment) => {
    setAppointments([newAppointment, ...appointments]);
  };

  const handleAddLogEntry = (carId: string, logEntry: BuildLogEntry) => {
    const updatedCars = cars.map(car => {
      if (car.id === carId) {
        return {
          ...car,
          buildLog: [...car.buildLog, logEntry]
        };
      }
      return car;
    });

    setCars(updatedCars);
    if (selectedCar && selectedCar.id === carId) {
      setSelectedCar(updatedCars.find(c => c.id === carId) || null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top Navigation */}
      <Navbar showAdminMode={showAdminMode} setShowAdminMode={setShowAdminMode} />

      {/* Hero Banner */}
      <Hero 
        soldCount={cars.filter(c => c.status === 'Sold').length}
        availableCount={cars.filter(c => c.status === 'For Sale').length}
        repairsCount={cars.reduce((acc, car) => acc + car.buildLog.length, 0)}
      />

      {/* Mechanic Admin Dashboard (Toggled) */}
      {showAdminMode && (
        <AdminDashboard onAddCar={handleAddCar} appointments={appointments} />
      )}

      {/* Main Inventory Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-black text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Car className="w-6 h-6 text-amber-500" /> Workshop Inventory
            </h2>
            <p className="text-xs text-slate-400">Filter project flips by current restoration status</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1 text-xs font-mono">
            {['All', 'For Sale', 'In Progress', 'Sold'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3.5 py-1.5 rounded-md font-bold transition-all ${
                  filterStatus === status 
                    ? 'bg-amber-500 text-slate-950 shadow-sm' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Inventory Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map((car) => (
            <CarCard 
              key={car.id} 
              car={car} 
              onViewDetails={setSelectedCar} 
              onSchedule={setSchedulingCar} 
            />
          ))}
        </div>
      </main>

      {/* Builder Bio Section */}
      <section id="builder-bio" className="bg-slate-900 border-t border-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 p-6 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-2xl font-mono shadow-lg shadow-amber-500/20">
                  15yo
                </div>
                <div>
                  <h3 className="text-xl font-black text-white font-mono">Leo "Wrench" Carter</h3>
                  <p className="text-xs text-amber-400 font-semibold">Mechanic & Motora Project Builder</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                <p>
                  "I started working on small engines at 12. At Motora, my goal is to restore enthusiast project cars, perform full preventative maintenance, and give buyers 100% build history transparency."
                </p>
                <div className="bg-slate-900 border border-slate-800 p-3 rounded-lg space-y-1 text-slate-400">
                  <p className="text-white font-bold font-mono uppercase text-[11px] flex items-center gap-1.5">
                    <Wrench className="w-3.5 h-3.5 text-amber-400" /> Workshop Diagnostic Tools:
                  </p>
                  <p>• OBD2 Scanner & Compression Testers</p>
                  <p>• Hydraulic Press & Torque Wrenches</p>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-6 font-mono text-xs">
                <a href="#" onClick={e => e.preventDefault()} className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-300 hover:text-amber-400">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" onClick={e => e.preventDefault()} className="bg-slate-900 border border-slate-800 p-2.5 rounded-xl text-slate-300 hover:text-amber-400">
                  <Youtube className="w-4 h-4" />
                </a>
                <span className="text-slate-400">@MotoraGarage</span>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">Why Motora?</span>
                <h2 className="text-2xl sm:text-3xl font-black text-white font-mono uppercase mt-1">
                  Built With Integrity & Itemized Proof
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-white font-mono">Date-Stamped Receipts</h4>
                  <p className="text-slate-400">All replaced gaskets, fluids, or suspension components come with parts store receipt copies.</p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-white font-mono">Supervised Meetups</h4>
                  <p className="text-slate-400">Every inspection takes place at our home shop or local police exchange zone with my parent present.</p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
                  <CheckCircle2 className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-white font-mono">Verified Titles</h4>
                  <p className="text-slate-400">No lien or title transfer issues. Titles are pre-verified clean by parents before listing.</p>
                </div>

                <div className="bg-slate-950/60 border border-slate-800/80 p-4 rounded-xl space-y-2">
                  <Wrench className="w-5 h-5 text-amber-400" />
                  <h4 className="font-bold text-white font-mono">Compression Tested</h4>
                  <p className="text-slate-400">Engines undergo full compression checks and OBD diagnostics prior to listing for sale.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8 text-xs text-slate-500 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Wrench className="w-4 h-4 text-amber-500" />
            <span className="text-slate-300 font-bold">MOTORA GARAGE</span>
            <span>© 2026</span>
          </div>
          <p>Designed for young automotive mechanics. All transactions parent-supervised.</p>
        </div>
      </footer>

      {/* Modals */}
      <CarDetailsModal 
        car={selectedCar} 
        onClose={() => setSelectedCar(null)} 
        onSchedule={(car) => { setSelectedCar(null); setSchedulingCar(car); }}
        showAdminMode={showAdminMode}
        onAddLogEntry={handleAddLogEntry}
      />

      <ScheduleMeetupModal 
        car={schedulingCar} 
        onClose={() => setSchedulingCar(null)} 
        onSubmitAppointment={handleAddAppointment}
      />

    </div>
  );
}