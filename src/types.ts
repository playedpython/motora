export type CarStatus = 'For Sale' | 'In Progress' | 'Sold';

export interface BuildLogEntry {
  id: string;
  title: string;
  date: string;
  category: 'Engine & Tuning' | 'Suspension & Brakes' | 'Interior & Detailing' | 'Maintenance' | 'Safety & Chassis';
  description: string;
  beforeImg?: string;
  afterImg?: string;
  cost?: number;
}

export interface VehicleSpecs {
  engine: string;
  transmission: string;
  drivetrain: string;
  power: string;
  color: string;
  vin: string;
}

export interface ProjectCar {
  id: string;
  year: number;
  make: string;
  model: string;
  title: string;
  price: number;
  mileage: number;
  status: CarStatus;
  heroImage: string;
  summary: string;
  specs: VehicleSpecs;
  buildLog: BuildLogEntry[];
}

export interface Appointment {
  id: string;
  carTitle: string;
  buyerName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  reason: string;
  location: string;
  notes?: string;
}
