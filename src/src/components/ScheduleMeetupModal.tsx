import React, { useState } from 'react';
import { X, ShieldCheck, Check } from 'lucide-react';
import { ProjectCar, Appointment } from './types';

interface ScheduleMeetupModalProps {
  car: ProjectCar | null;
  onClose: () => void;
  onSubmitAppointment: (appointment: Appointment) => void;
}

export const ScheduleMeetupModal: React.FC<ScheduleMeetupModalProps> = ({
  car,
  onClose,
  onSubmitAppointment
}) => {
  if (!car) return null;

  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    buyerName: '',
    email: '',
    phone: '',
    date: '',
    timeSlot: '10:00 AM',
    reason: 'Test Drive & Inspection',
    locationType: 'Garage (Supervised)',
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.buyerName || !form.email || !form.date) return;

    onSubmitAppointment({
      id: `apt-${Date.now()}`,
      carTitle: car.title,
      buyerName: form.buyerName,
      email: form.email,
      phone: form.phone,
      date: form.date,
      timeSlot: form.timeSlot,
      reason: form.reason,
      location: form.locationType === 'Garage (Supervised)' 
        ? 'Home Workshop (Parent Supervised)' 
        : 'Public Mall Safe Exchange Zone',
      notes: form.notes
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-auto">
        
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white p-2 rounded-full border border-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/30">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-white font-mono uppercase">Meetup Request Sent!</h3>
            <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
              Thank you <strong className="text-amber-400">{form.buyerName}</strong>. Your request to view <strong className="text-white">{car.title}</strong> on <strong className="text-white">{form.date} @ {form.timeSlot}</strong> has been logged.
            </p>
            
            <div className="bg-slate-950 border border-slate-800 p-3.5 rounded-xl text-xs text-slate-400 text-left space-y-1 font-mono">
              <p className="text-amber-400 font-bold uppercase">Important Safety Protocol:</p>
              <p>• Confirmation text will be sent to {form.phone}.</p>
              <p>• Seller parent/guardian will be present for all viewings.</p>
            </div>

            <button 
              onClick={onClose}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors w-full"
            >
              Return To Garage
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block">MOTORA Scheduling</span>
              <h3 className="text-xl font-black text-white font-mono">{car.title}</h3>
              <p className="text-xs text-slate-400">Select a date & time for in-person vehicle viewing or test drive.</p>
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl flex items-start gap-2 text-xs text-amber-300">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Safety Guarantee:</strong> Minor seller is accompanied by parent/guardian. Meeting spot pre-confirmed upon confirmation.
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">Your Full Name *</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Alex Johnson" 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500"
                  value={form.buyerName}
                  onChange={e => setForm({...form, buyerName: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Email *</label>
                  <input 
                    type="email" 
                    required
                    placeholder="alex@example.com" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500"
                    value={form.email}
                    onChange={e => setForm({...form, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Phone Number *</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="(555) 000-0000" 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500"
                    value={form.phone}
                    onChange={e => setForm({...form, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Preferred Date *</label>
                  <input 
                    type="date" 
                    required
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500"
                    value={form.date}
                    onChange={e => setForm({...form, date: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1 font-medium">Time Slot</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500"
                    value={form.timeSlot}
                    onChange={e => setForm({...form, timeSlot: e.target.value})}
                  >
                    <option value="10:00 AM">10:00 AM (Weekend)</option>
                    <option value="1:00 PM">1:00 PM (Afternoon)</option>
                    <option value="4:30 PM">4:30 PM (After School)</option>
                    <option value="6:00 PM">6:00 PM (Evening)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Location Preference</label>
                <select 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500"
                  value={form.locationType}
                  onChange={e => setForm({...form, locationType: e.target.value})}
                >
                  <option value="Garage (Supervised)">Home Workshop / Garage (Parent Supervised)</option>
                  <option value="Public Safe Zone">Public Mall / Police Station Parking Lot</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">Notes / Special Requests</label>
                <textarea 
                  rows={2} 
                  placeholder="Any questions about the build..." 
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500"
                  value={form.notes}
                  onChange={e => setForm({...form, notes: e.target.value})}
                />
              </div>

              <button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-lg text-xs font-mono uppercase tracking-wider transition-colors shadow-lg shadow-amber-500/20 mt-2"
              >
                Submit Meetup Request
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};