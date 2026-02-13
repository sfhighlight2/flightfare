export type CabinClass = 'Economy' | 'Premium Economy' | 'Business' | 'First';
export type TripType = 'roundtrip' | 'oneway';

export interface Passengers {
  adults: number;
  children: number;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departDate: string;
  returnDate: string;
  passengers: Passengers;
  cabinClass: CabinClass;
  tripType: TripType;
}

export interface UserLead {
  name: string;
  phone: string;
  email?: string;
}

export enum AppStep {
  SEARCH = 'SEARCH',
  ANALYZING = 'ANALYZING',
  LEAD_CAPTURE = 'LEAD_CAPTURE',
  SUCCESS = 'SUCCESS'
}

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
  image: string;
}

export interface Destination {
  id: number;
  city: string;
  country: string;
  price: number;
  image: string;
}

export interface FlightDeal {
  id: number;
  route: string;
  price: number;
  type: string;
  expires: string;
}

export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
}