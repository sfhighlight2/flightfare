import { Testimonial, Destination, FlightDeal, Airport } from './types';
import { ShieldCheck, Star, Users, Clock } from 'lucide-react';

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "New York to London",
    text: "I was skeptical about the 50% off claim, but the agent found me a business class seat for the price of economy. Unbelievable service.",
    rating: 5,
    image: "https://picsum.photos/100/100?random=1"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "SFO to Tokyo",
    text: "Saved $1,200 on my family trip to Japan. The phone call was quick, professional, and they handled everything.",
    rating: 5,
    image: "https://picsum.photos/100/100?random=2"
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    location: "Miami to Madrid",
    text: "Best travel hack I've found. Don't book online yourself, let these guys find the unpublished rates.",
    rating: 5,
    image: "https://picsum.photos/100/100?random=3"
  }
];

export const TRUST_BADGES = [
  { icon: ShieldCheck, text: "ATOL Protected" },
  { icon: Star, text: "4.9/5 TrustScore" },
  { icon: Users, text: "10k+ Happy Flyers" },
  { icon: Clock, text: "24/7 Support" }
];

export const TOP_DESTINATIONS: Destination[] = [
  {
    id: 1,
    city: "London",
    country: "United Kingdom",
    price: 349,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 2,
    city: "Tokyo",
    country: "Japan",
    price: 689,
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1788&q=80"
  },
  {
    id: 3,
    city: "Paris",
    country: "France",
    price: 399,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1746&q=80"
  },
  {
    id: 4,
    city: "Dubai",
    country: "UAE",
    price: 549,
    // Updated image URL to a reliable one
    image: "https://images.unsplash.com/photo-1546412414-e1885259563a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80"
  },
  {
    id: 5,
    city: "Rome",
    country: "Italy",
    price: 429,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1696&q=80"
  },
  {
    id: 6,
    city: "Bali",
    country: "Indonesia",
    price: 719,
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1676&q=80"
  }
];

export const FLIGHT_DEALS: FlightDeal[] = [
  { id: 1, route: "NYC to London", price: 349, type: "Roundtrip", expires: "2h left" },
  { id: 2, route: "LAX to Tokyo", price: 689, type: "Roundtrip", expires: "45m left" },
  { id: 3, route: "MIA to Paris", price: 459, type: "Roundtrip", expires: "5h left" },
  { id: 4, route: "CHI to Dubai", price: 699, type: "Business Class", expires: "1h left" },
  { id: 5, route: "SFO to Singapore", price: 799, type: "Roundtrip", expires: "3h left" },
  { id: 6, route: "BOS to Rome", price: 429, type: "Roundtrip", expires: "1h left" }
];

export const AIRPORTS: Airport[] = [
  { code: 'JFK', city: 'New York', name: 'John F. Kennedy Intl', country: 'USA' },
  { code: 'LHR', city: 'London', name: 'Heathrow', country: 'UK' },
  { code: 'DXB', city: 'Dubai', name: 'Dubai Intl', country: 'UAE' },
  { code: 'HND', city: 'Tokyo', name: 'Haneda', country: 'Japan' },
  { code: 'CDG', city: 'Paris', name: 'Charles de Gaulle', country: 'France' },
  { code: 'SIN', city: 'Singapore', name: 'Changi', country: 'Singapore' },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles Intl', country: 'USA' },
  { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt', country: 'Germany' },
  { code: 'AMS', city: 'Amsterdam', name: 'Schiphol', country: 'Netherlands' },
  { code: 'ICN', city: 'Seoul', name: 'Incheon', country: 'South Korea' },
  { code: 'BKK', city: 'Bangkok', name: 'Suvarnabhumi', country: 'Thailand' },
  { code: 'SFO', city: 'San Francisco', name: 'San Francisco Intl', country: 'USA' },
  { code: 'IST', city: 'Istanbul', name: 'Istanbul', country: 'Turkey' },
  { code: 'MAD', city: 'Madrid', name: 'Barajas', country: 'Spain' },
  { code: 'FCO', city: 'Rome', name: 'Fiumicino', country: 'Italy' },
  { code: 'SYD', city: 'Sydney', name: 'Kingsford Smith', country: 'Australia' },
  { code: 'YYZ', city: 'Toronto', name: 'Pearson', country: 'Canada' },
  { code: 'BCN', city: 'Barcelona', name: 'El Prat', country: 'Spain' },
  { code: 'MUC', city: 'Munich', name: 'Munich', country: 'Germany' },
  { code: 'ZRH', city: 'Zurich', name: 'Zurich', country: 'Switzerland' },
  { code: 'LGA', city: 'New York', name: 'LaGuardia', country: 'USA' },
  { code: 'EWR', city: 'New York', name: 'Newark Liberty', country: 'USA' },
  { code: 'ORD', city: 'Chicago', name: 'O\'Hare', country: 'USA' },
  { code: 'MIA', city: 'Miami', name: 'Miami Intl', country: 'USA' },
  { code: 'ATL', city: 'Atlanta', name: 'Hartsfield-Jackson', country: 'USA' },
  { code: 'DFW', city: 'Dallas', name: 'Dallas/Fort Worth', country: 'USA' },
  { code: 'DEN', city: 'Denver', name: 'Denver Intl', country: 'USA' },
];

export const BOOKING_NOTIFICATIONS = [
  { name: "James D.", from: "Chicago", to: "London", saved: 420 },
  { name: "Amanda K.", from: "Los Angeles", to: "Bali", saved: 550 },
  { name: "Robert S.", from: "New York", to: "Paris", saved: 380 },
  { name: "Emily W.", from: "Miami", to: "Rome", saved: 310 },
  { name: "David L.", from: "San Francisco", to: "Tokyo", saved: 600 }
];

export const LOGO_URL = "https://i.imgur.com/B9b2fS3.jpeg";