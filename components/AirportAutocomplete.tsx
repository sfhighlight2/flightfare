import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Plane } from 'lucide-react';
import { AIRPORTS } from '../constants';
import { Airport } from '../types';

interface AirportAutocompleteProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

export const AirportAutocomplete: React.FC<AirportAutocompleteProps> = ({ label, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync query with value prop if controlled externally
  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAirports = query === '' 
    ? [] 
    : AIRPORTS.filter(airport => {
        const q = query.toLowerCase();
        return (
          airport.city.toLowerCase().includes(q) ||
          airport.code.toLowerCase().includes(q) ||
          airport.name.toLowerCase().includes(q) ||
          airport.country.toLowerCase().includes(q)
        );
      }).slice(0, 5); // Limit results

  const handleSelect = (airport: Airport) => {
    onChange(`${airport.city} (${airport.code})`);
    setQuery(`${airport.city} (${airport.code})`);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">{label}</label>
      <div className="relative group">
        <MapPin className="absolute left-3 top-3.5 text-blue-600 z-10" size={20} />
        <input 
          type="text" 
          required
          placeholder={placeholder}
          className="w-full pl-10 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none font-bold text-gray-900 group-hover:border-blue-300 transition-colors cursor-pointer"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onChange(e.target.value); // Allow free text typing
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {/* Underline effect */}
        <div className="absolute bottom-0 left-0 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300 rounded-b-lg"></div>
      </div>

      {/* Dropdown */}
      {isOpen && filteredAirports.length > 0 && (
        <div className="absolute top-full left-0 w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-2xl z-50 overflow-hidden max-h-64 overflow-y-auto">
           {filteredAirports.map((airport) => (
             <div 
                key={airport.code}
                onClick={() => handleSelect(airport)}
                className="p-3 hover:bg-blue-50 cursor-pointer flex items-center justify-between border-b border-gray-50 last:border-0 transition-colors"
             >
                <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-full">
                        <Plane size={14} className="text-gray-500 transform -rotate-45" />
                    </div>
                    <div>
                        <div className="font-bold text-gray-900 text-sm">{airport.city}, {airport.country}</div>
                        <div className="text-xs text-gray-500">{airport.name}</div>
                    </div>
                </div>
                <span className="font-mono font-bold text-gray-400 bg-gray-100 px-2 py-1 rounded text-xs">{airport.code}</span>
             </div>
           ))}
        </div>
      )}
    </div>
  );
};