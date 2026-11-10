export interface Service {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  department: Department;
}

interface TimeSlot {
  date: Date;
  time: {
    hour: number;
    half?: boolean;
  };
}

interface AvailableTimeSlots {
  date: Date;
  slots: {
    hour: number;
    half?: boolean;
    isAvailable?: boolean;
  }[];
}

interface Doctor {
  id: number;
  name: string;
  title: string;
  languages: string;
  specialties: string;
  image: string;
  isAvailable: boolean;
}

export interface SymptomDescription {
  symptoms: string[];
  description: string;
  images: string[];
}

export interface Inquiry extends SymptomDescription {
  department?: Department;
}

export interface Feedback {
  title: string;
  description: string;
  images: string[];
  category: string;
}

export interface Booking {
  id: number;
  status: string;
  patientName: string;
  schedule: TimeSlot;
  doctor: Doctor;
  department: Department;
}

export interface Invoice {
  id: number;
  booking: Booking;
}

export interface DepartmentGroup {
  id: number;
  name: string;
  description: string;
}

export interface Department {
  id: number;
  name: string;
  shortDescription: string;
  description: string;
  groupId: number;
}

interface Article {
  id: number;
  title: string;
  description: string;
  category: string;
  timeAgo: string;
  image: string;
  content: string;
}

export interface HealthTip {
  text: string;
  source: string;
  reviewedAt: string;
}

export interface Clinic {
  id: number;
  name: string;
  address: string;
  area: string;
  hours: string;
  verified: boolean;
  verifiedAt?: string;
  phone?: string;
  website?: string;
}

export interface ClinicSuggestion {
  specialty: string;
  clinics: Clinic[];
}

export interface ClinicSearchForm {
  description: string;
  area: string;
}

export interface MedicationDose {
  id: number;
  name: string;
  dose: string;
  note: string;
}

export interface MedicationSession {
  id: "morning" | "afternoon" | "evening";
  label: string;
  time: string;
  doses: MedicationDose[];
}

export interface PrescriptionItem {
  id: number;
  name: string;
  dose: string;
  timesPerDay: number;
  days: number;
}
