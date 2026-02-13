import React, { useState, useEffect } from 'react';
import { FLIGHT_DEALS } from '../constants';
import { Flame, Clock } from 'lucide-react';
import { FlightDeal } from '../types';

interface ExtendedFlightDeal extends FlightDeal {
    marketPrice: number;
}

export const FlightDeals: React.FC = () => {
  // Initialize state with a copy to avoid mutating constants, and add market prices
  const [deals, setDeals] = useState<ExtendedFlightDeal[]>(() => 
    FLIGHT_DEALS.map(d => ({
        ...d,
        marketPrice: Math.floor(d.price * (1.4 + Math.random() * 0.4)) // 40-80% markup
    }))
  );

  useEffect(() => {
    // Set up an interval to randomly update deals to simulate live inventory changes
    const intervalId = setInterval(() => {
      setDeals((prevDeals) => {
        // Clone the array
        const newDeals = prevDeals.map(d => ({ ...d }));
        
        // Pick 1-2 random deals to update per interval
        const numUpdates = Math.floor(Math.random() * 2) + 1;
        
        for (let i = 0; i < numUpdates; i++) {
            const randomIndex = Math.floor(Math.random() * newDeals.length);
            const dealToUpdate = newDeals[randomIndex];

            // 60% chance to drop price (excitement), 40% chance to update time (urgency)
            if (Math.random() > 0.4) {
                // Fluctuate price slightly, mostly down
                const change = Math.floor(Math.random() * 7) - 4; // -4 to +2
                dealToUpdate.price = Math.max(199, dealToUpdate.price + change);
                // Keep market price somewhat consistent relative to price, or fixed
                dealToUpdate.marketPrice = Math.max(dealToUpdate.marketPrice, Math.floor(dealToUpdate.price * 1.5));
            } else {
                // Change expiration to "less than Xm left"
                const mins = Math.floor(Math.random() * 59) + 1;
                dealToUpdate.expires = `${mins}m left`;
            }
        }

        return newDeals;
      });
    }, 2000); // Update every 2 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Duplicate deals to create seamless loop
  const displayDeals = [...deals, ...deals];

  return (
    <div className="bg-blue-900 py-3 overflow-hidden relative border-b border-blue-800">
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-blue-900 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-blue-900 to-transparent z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center gap-2 text-white font-bold whitespace-nowrap bg-red-600 px-3 py-1 rounded shadow-sm z-20 animate-pulse">
          <Flame size={16} className="text-white fill-white" />
          <span className="text-xs md:text-sm tracking-wide">LIVE DEALS</span>
        </div>
        
        <div className="flex-1 overflow-hidden relative h-7">
           <div className="animate-ticker absolute top-0 left-0 whitespace-nowrap flex gap-8 items-center">
              {displayDeals.map((deal, idx) => (
                <div key={`${deal.id}-${idx}`} className="flex items-center gap-2 text-blue-100 group cursor-pointer hover:text-white transition-colors">
                  <span className="font-medium text-sm">{deal.route}</span>
                  <div className="flex flex-col leading-none items-end">
                     <span className="text-[10px] line-through text-blue-400 decoration-red-500">${deal.marketPrice}</span>
                     <span className="text-yellow-400 font-bold text-base tabular-nums leading-none">${deal.price}</span>
                  </div>
                  <span className="text-[10px] bg-blue-800/50 px-1.5 py-0.5 rounded text-blue-300 flex items-center gap-1 border border-blue-700/50 min-w-[55px] justify-center tabular-nums">
                    <Clock size={10} /> {deal.expires}
                  </span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};