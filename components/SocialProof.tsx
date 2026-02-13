import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { TESTIMONIALS, TRUST_BADGES } from '../constants';

export const SocialProof: React.FC = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 border-b border-gray-200 pb-12">
          {TRUST_BADGES.map((badge, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="p-3 bg-blue-100 text-blue-700 rounded-full mb-3">
                <badge.icon size={24} />
              </div>
              <span className="font-semibold text-gray-800">{badge.text}</span>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Smart Travelers</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We access wholesale inventory that isn't available on public booking sites. 
            See why thousands of travelers trust us for their international flights.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative">
              <div className="absolute -top-4 left-6 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <CheckCircle size={12} /> Verified Booking
              </div>
              <div className="flex items-center mb-4 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 italic mb-6">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};