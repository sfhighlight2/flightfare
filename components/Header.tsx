import React from 'react';
import { PhoneCall, Menu } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="FlightFareTech - Global Travel Maker"
            className="h-10 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }}
          />
          {/* Fallback if image not yet uploaded by user */}
          <div className="hidden flex flex-col leading-none">
            <span className="text-xl font-black text-red-600 tracking-tighter">FLIGHTFARE<span className="text-blue-700">TECH</span></span>
            <span className="text-[0.6rem] text-gray-500 tracking-[0.2em] font-medium uppercase">Global Travel Maker</span>
          </div>
        </div>

        {/* Desktop Nav / CTA */}
        <div className="hidden md:flex items-center gap-6">
          <span className="text-sm font-medium text-gray-600">Exclusive Unpublished Rates</span>
          <a href="tel:+18005754609" className="flex items-center gap-2 bg-blue-900 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-800 transition-colors">
            <PhoneCall size={18} />
            <span>(800) 575-4609</span>
          </a>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden text-gray-700">
          <Menu size={28} />
        </div>
      </div>
    </header>
  );
};