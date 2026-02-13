import React from 'react';
import { TOP_DESTINATIONS } from '../constants';
import { ArrowRight } from 'lucide-react';

export const TopDestinations: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-blue-600 font-bold tracking-wide uppercase text-sm">Explore the World</span>
            <h2 className="text-3xl font-bold text-gray-900 mt-2">Trending International Deals</h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-1 text-blue-600 font-semibold hover:underline">
            View all destinations <ArrowRight size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TOP_DESTINATIONS.map((dest) => (
            <div key={dest.id} className="group cursor-pointer rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 relative">
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10"></div>
                <img 
                  src={dest.image} 
                  alt={dest.city} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20 text-white">
                  <p className="text-sm font-medium opacity-90">{dest.country}</p>
                  <h3 className="text-2xl font-bold">{dest.city}</h3>
                </div>
                <div className="absolute top-4 right-4 z-20 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                  From ${dest.price}*
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};