export type UserRole = 'user' | 'vendor' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  plan: 'free' | 'premium' | 'corporate';
  avatar_url?: string;
  created_at: string;
}

export interface Vendor {
  id: string;
  user_id: string;
  business_name: string;
  category: VendorCategory;
  description: string;
  location: string;
  city: string;
  price_range: 'budget' | 'mid' | 'premium';
  rating: number;
  review_count: number;
  is_verified: boolean;
  is_featured: boolean;
  photos: string[];
  services: string[];
  pricing_details?: string;
  phone?: string;
  email?: string;
  website?: string;
  created_at: string;
}

export type VendorCategory =
  | 'catering'
  | 'venue'
  | 'photography'
  | 'videography'
  | 'decoration'
  | 'dj'
  | 'live-band'
  | 'florist'
  | 'mc'
  | 'hair-makeup'
  | 'equipment-hire'
  | 'other';

export interface Event {
  id: string;
  user_id: string;
  title: string;
  event_type: EventType;
  date: string;
  time?: string;
  guest_count: number;
  budget?: number;
  venue_preference: 'indoor' | 'outdoor' | 'own' | 'find';
  theme?: string;
  special_requirements?: string;
  status: 'planning' | 'confirmed' | 'completed' | 'cancelled';
  checklist?: ChecklistItem[];
  timeline?: TimelinePhase[];
  budget_allocation?: BudgetAllocation;
  created_at: string;
}

export type EventType =
  | 'wedding'
  | 'birthday'
  | 'corporate'
  | 'graduation'
  | 'baby-shower'
  | 'funeral'
  | 'church'
  | 'other';

export interface ChecklistItem {
  id: string;
  category: string;
  task: string;
  due_date?: string;
  completed: boolean;
  notes?: string;
}

export interface TimelinePhase {
  phase: string;
  tasks: string[];
}

export interface BudgetAllocation {
  catering: number;
  venue: number;
  photography: number;
  decoration: number;
  entertainment: number;
  other: number;
}

export interface Booking {
  id: string;
  event_id: string;
  user_id: string;
  vendor_id: string;
  status: 'pending' | 'quote-received' | 'accepted' | 'declined' | 'confirmed' | 'completed';
  message?: string;
  quote_amount?: number;
  payment_status: 'unpaid' | 'pending-verification' | 'paid';
  created_at: string;
  vendor?: Vendor;
}

export interface Review {
  id: string;
  vendor_id: string;
  user_id: string;
  event_id?: string;
  rating: number;
  comment: string;
  ai_summary?: string;
  created_at: string;
  user?: { full_name: string; avatar_url?: string };
}

export interface Payment {
  id: string;
  user_id: string;
  amount: number;
  method: 'ecocash' | 'innbucks' | 'bank' | 'cash';
  type: 'subscription' | 'booking' | 'ticket';
  status: 'pending' | 'approved' | 'rejected' | 'refunded';
  proof_url?: string;
  reference?: string;
  notes?: string;
  created_at: string;
  verified_at?: string;
}
