import React from 'react';
import { Shield, CreditCard, Headphones, Globe } from 'lucide-react';

export const SEOContent: React.FC = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Book International Flights With Us?</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-blue-50 p-3 rounded-lg h-fit">
                  <Shield className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Unpublished Wholesale Rates</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    We have direct access to "blind" booking inventory that major airlines need to fill. 
                    These seats are sold at 40-60% off because they cannot be advertised publicly.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="bg-blue-50 p-3 rounded-lg h-fit">
                  <Globe className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Complex Itinerary Experts</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    Multi-city trip? Round-the-world ticket? Our human agents build smarter routes 
                    that algorithms often miss, saving you both time and money.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-blue-50 p-3 rounded-lg h-fit">
                  <Headphones className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Real Human Support 24/7</h3>
                  <p className="text-gray-600 text-sm mt-1">
                    No chatbots. No endless hold times. When you book with FlightFareTech, 
                    you get a direct line to your personal travel concierge.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="text-xl font-bold text-gray-900 mb-4">How It Works</h3>
            <ol className="relative border-l border-gray-200 ml-3 space-y-8">
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="text-blue-600 font-bold">1</span>
                </span>
                <h4 className="font-semibold text-gray-900 mb-1">Search Your Route</h4>
                <p className="text-sm text-gray-500">Enter your destination, dates, and cabin preference in our secure search form.</p>
              </li>
              <li className="mb-10 ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="text-blue-600 font-bold">2</span>
                </span>
                <h4 className="font-semibold text-gray-900 mb-1">Instant Analysis</h4>
                <p className="text-sm text-gray-500">Our system scans 500+ airlines for hidden wholesale availability matching your criteria.</p>
              </li>
              <li className="ml-6">
                <span className="absolute flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full -left-4 ring-4 ring-white">
                  <span className="text-blue-600 font-bold">3</span>
                </span>
                <h4 className="font-semibold text-gray-900 mb-1">Unlock Savings</h4>
                <p className="text-sm text-gray-500">Connect with an agent to finalize your booking at a rate strictly lower than online prices.</p>
              </li>
            </ol>
            <div className="mt-8 pt-6 border-t border-gray-200 flex items-center gap-4">
               <CreditCard className="text-gray-400" size={24} />
               <span className="text-xs text-gray-500">We accept all major credit cards. Secure SSL encryption guaranteed.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};