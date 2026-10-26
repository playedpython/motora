import { ProjectCar, Appointment } from './types';

export font INITIAL_CARS: ProjectCar[] = [
  {
    id: 'car-1',
    year: 1998,
    make: 'Honda',
    model: 'Civic DX Hatchback (EK)',
    title: '1998 Honda Civic Hatchback - B16A VTEC Swap',
    price: 6800,
    mileage: 142000,
    status: 'For Sale',
    heroImage: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1000&q=80',
    summary: 'Clean body EK Civic. Swapped stock engine for a healthy DOHC B16A VTEC, brand new Skunk2 coilovers, full brake overhaul, and custom wire tuck in garage.',
    specs: {
      engine: '1.6L B16A DOHC VTEC 4-Cylinder',
      transmission: 'S4C 5-Speed Manual w/ LSD',
      drivetrain: 'FWD',
      power: '160 hp @ 7600 RPM',
      color: 'Championship White',
      vin: '1HGEC6... (Verified Clean Title)'
    },
    buildLog: [
      {
        id: 'log-1',
        title: 'Engine Swap & Wire Harness Prep',
        date: '2026-01-15',
        category: 'Engine & Tuning',
        description: 'Pulled original tired D16Y7. Cleaned engine bay, prepped custom wire harness, and dropped in low-mileage B16A VTEC engine with fresh seals.',
        beforeImg: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
        afterImg: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&w=600&q=80',
        cost: 2200
      },
      {
        id: 'log-2',
        title: 'Brake System Overhaul & Suspension',
        date: '2026-02-02',
        category: 'Suspension & Brakes',
        description: 'Replaced rusted rotors and stuck calipers with Integra GS-R bigger brake upgrade. Installed Skunk2 Pro-ST adjustable coilovers.',
        beforeImg: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
        afterImg: 'https://images.unsplash.com/photo-1600706432523-988185b0e012?auto=format&fit=crop&w=600&q=80',
        cost: 850
      }
    ]
  },
  {
    id: 'car-2',
    year: 2002,
    make: 'Mazda',
    model: 'MX-5 Miata (NB)',
    title: '2002 Mazda MX-5 Miata - Track Prep Project',
    price: 8200,
    mileage: 118000,
    status: 'In Progress',
    heroImage: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=1000&q=80',
    summary: 'Lightweight NB Miata with zero frame rust. Currently completing head gasket repair, water pump replacement, and double-diagonal roll bar installation.',
    specs: {
      engine: '1.8L BP-4W DOHC 4-Cylinder',
      transmission: '5-Speed Manual',
      drivetrain: 'RWD w/ Torsen LSD',
      power: '142 hp',
      color: 'Classic Red',
      vin: 'JM1NB3... (Clean Title)'
    },
    buildLog: [
      {
        id: 'log-4',
        title: 'Head Gasket Repair & Valve Job',
        date: '2026-02-10',
        category: 'Engine & Tuning',
        description: 'Pulled cylinder head, sent to local machine shop for deck resurfacing. Replaced gasket with ARP head studs & fresh OEM seals.',
        cost: 620
      }
    ]
  },
  {
    id: 'car-3',
    year: 2004,
    make: 'BMW',
    model: '330i ZHP (E46)',
    title: '2004 BMW 330i ZHP Performance Sedan',
    price: 11500,
    mileage: 156000,
    status: 'Sold',
    heroImage: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=1000&q=80',
    summary: 'Desirable ZHP performance package! Fully refreshed cooling system, VANOS rebuilt, and complete suspension overhaul with Koni shocks.',
    specs: {
      engine: '3.0L M54B30 Inline-6',
      transmission: '6-Speed Manual',
      drivetrain: 'RWD',
      power: '235 hp',
      color: 'Imola Red II',
      vin: 'WBAEV5... (Sold)'
    },
    buildLog: [
      {
        id: 'log-6',
        title: 'Cooling System Overhaul',
        date: '2025-11-12',
        category: 'Maintenance',
        description: 'Replaced radiator, expansion tank, water pump with metal impeller, thermostat, and silicone hoses.',
        cost: 580
      }
    ]
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    carTitle: '1998 Honda Civic Hatchback - B16A VTEC Swap',
    buyerName: 'Dave Miller',
    email: 'dave@example.com',
    phone: '(555) 234-5678',
    date: '2026-11-02',
    timeSlot: '2:00 PM',
    reason: 'Test Drive & Mechanical Inspection',
    location: 'Garage / Workshop (Parent Supervised)'
  }
];
