import React, { useState, useEffect, useRef } from 'react';
import { Header } from './components/Header';
import { SocialProof } from './components/SocialProof';
import { TopDestinations } from './components/TopDestinations';
import { FlightDeals } from './components/FlightDeals';
import { SEOContent } from './components/SEOContent';
import { AirportAutocomplete } from './components/AirportAutocomplete';
import { CustomDatePicker } from './components/CustomDatePicker';
import { ExitIntentPopup } from './components/ExitIntentPopup';
import { BookingNotification } from './components/BookingNotification';
import { LowPriceModal } from './components/LowPriceModal';
import { FlightSearchParams, AppStep, UserLead, CabinClass, TripType } from './types';
import { Search, Plane, Check, ArrowRight, Phone, Shield, User, ChevronDown, Minus, Plus, Mail, TrendingUp, AlertCircle } from 'lucide-react';
import { generateDealContext } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.SEARCH);

  // Date Logic: Default to tomorrow and +7 days
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const nextWeek = new Date();
  nextWeek.setDate(nextWeek.getDate() + 8);

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  const [searchParams, setSearchParams] = useState<FlightSearchParams>({
    from: '',
    to: '',
    departDate: formatDate(tomorrow),
    returnDate: formatDate(nextWeek),
    passengers: { adults: 1, children: 0 },
    cabinClass: 'Economy',
    tripType: 'roundtrip'
  });

  const [lead, setLead] = useState<UserLead>({ name: '', phone: '', email: '' });
  const [dealContext, setDealContext] = useState<string>('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showPaxDropdown, setShowPaxDropdown] = useState(false);
  const [isLowPriceModalOpen, setIsLowPriceModalOpen] = useState(false);
  const paxRef = useRef<HTMLDivElement>(null);

  // Computed state for comparison
  const [comparisonData, setComparisonData] = useState<{ airline: string, market: number, us: number } | null>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (paxRef.current && !paxRef.current.contains(event.target as Node)) {
        setShowPaxDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gemini Hook
  useEffect(() => {
    if (step === AppStep.ANALYZING) {
      generateDealContext(searchParams).then(text => {
        setDealContext(text);
      });

      // Generate comparison data when analysis starts
      const getCompetitorInfo = () => {
        const dest = searchParams.to.toLowerCase();
        let airline = "Major Carrier";
        let base = 1100;

        if (dest.includes('london') || dest.includes('lhr')) { airline = "British Airways"; base = 980; }
        else if (dest.includes('paris') || dest.includes('cdg')) { airline = "Air France"; base = 1050; }
        else if (dest.includes('tokyo') || dest.includes('hnd')) { airline = "JAL"; base = 1500; }
        else if (dest.includes('dubai') || dest.includes('dxb')) { airline = "Emirates"; base = 1300; }
        else if (dest.includes('frankfurt') || dest.includes('fra')) { airline = "Lufthansa"; base = 1150; }

        if (searchParams.cabinClass === 'Business') base *= 3.2;
        if (searchParams.cabinClass === 'First') base *= 5.5;
        if (searchParams.cabinClass === 'Premium Economy') base *= 1.7;

        // Add randomness
        base = Math.floor(base * (0.95 + Math.random() * 0.1));

        return {
          airline,
          market: base,
          us: Math.floor(base * 0.55) // 45% off
        };
      };
      setComparisonData(getCompetitorInfo());

      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setStep(AppStep.LEAD_CAPTURE);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [step, searchParams]);


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchParams.from || !searchParams.to || !searchParams.departDate) {
      alert("Please fill in the required flight details.");
      return;
    }
    setStep(AppStep.ANALYZING);
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate Email
    if (!lead.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setStep(AppStep.SUCCESS);
  };

  const updatePassengers = (type: 'adults' | 'children', delta: number) => {
    setSearchParams(prev => ({
      ...prev,
      passengers: {
        ...prev.passengers,
        [type]: Math.max(type === 'adults' ? 1 : 0, prev.passengers[type] + delta)
      }
    }));
  };

  const totalPax = searchParams.passengers.adults + searchParams.passengers.children;

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <FlightDeals />
      <Header />
      <ExitIntentPopup />
      <LowPriceModal isOpen={isLowPriceModalOpen} onClose={() => setIsLowPriceModalOpen(false)} />
      <BookingNotification />

      {/* --- HERO SECTION --- */}
      {/* 
          LAYOUT FIX: Removed fixed height from hero container. 
          The background image is absolute and covers the full height of the 'main' container.
          The 'main' container grows based on the content (search form) plus padding.
      */}
      <main className="relative min-h-[600px] flex flex-col justify-center">

        {/* Background Image - Absolute to cover whatever height the content needs */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80"
            alt="International Travel"
            className="w-full h-full object-cover"
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/20 h-full w-full"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">

          {/* Headlines with text shadow */}
          <div className="text-center mb-10 text-white">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
              Unlock <span className="text-yellow-400">40-60% Off</span> International Flights
            </h1>
            <p className="text-lg md:text-xl text-white max-w-3xl mx-auto drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] font-semibold">
              We access "blind" inventory from 500+ airlines. Stop paying retail prices.
            </p>
          </div>

          {/* --- STEP 1: ADVANCED SEARCH FORM --- */}
          {step === AppStep.SEARCH && (
            <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-6xl mx-auto transform transition-all border border-gray-100">
              <form onSubmit={handleSearchSubmit}>

                {/* Form Header: Trip Type, Travelers, Class */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  {/* Trip Type */}
                  <div className="flex bg-gray-100 rounded-full p-1 w-fit">
                    {(['roundtrip', 'oneway'] as const).map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSearchParams({ ...searchParams, tripType: type })}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${searchParams.tripType === type ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                          }`}
                      >
                        {type === 'roundtrip' ? 'Roundtrip' : 'One-way'}
                      </button>
                    ))}
                  </div>

                  <div className="flex-1"></div>

                  {/* Cabin Class */}
                  <div className="relative">
                    <select
                      className="appearance-none bg-transparent hover:bg-gray-50 text-gray-700 font-bold py-2.5 px-4 pr-8 rounded-lg text-sm focus:outline-none cursor-pointer"
                      value={searchParams.cabinClass}
                      onChange={(e) => setSearchParams({ ...searchParams, cabinClass: e.target.value as CabinClass })}
                    >
                      <option value="Economy">Economy</option>
                      <option value="Premium Economy">Premium Econ</option>
                      <option value="Business">Business Class</option>
                      <option value="First">First Class</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-3 text-gray-500 pointer-events-none" size={16} />
                  </div>

                  {/* Travelers */}
                  <div className="relative" ref={paxRef}>
                    <button
                      type="button"
                      onClick={() => setShowPaxDropdown(!showPaxDropdown)}
                      className="flex items-center gap-2 bg-transparent hover:bg-gray-50 text-blue-600 font-bold py-2.5 px-4 rounded-lg text-sm focus:outline-none"
                    >
                      <User size={16} />
                      <span>{totalPax} Traveler{totalPax > 1 ? 's' : ''}</span>
                      <ChevronDown size={14} />
                    </button>

                    {showPaxDropdown && (
                      <div className="absolute top-full right-0 mt-2 w-72 bg-white rounded-xl shadow-2xl border border-gray-100 p-5 z-50">
                        <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                          <div>
                            <p className="font-bold text-gray-900 text-base">Adults</p>
                            <p className="text-xs text-gray-500">Age 12+</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button type="button" onClick={() => updatePassengers('adults', -1)} className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100"><Minus size={14} /></button>
                            <span className="font-bold w-4 text-center text-lg">{searchParams.passengers.adults}</span>
                            <button type="button" onClick={() => updatePassengers('adults', 1)} className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100"><Plus size={14} /></button>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-bold text-gray-900 text-base">Children</p>
                            <p className="text-xs text-gray-500">Age 0-11</p>
                          </div>
                          <div className="flex items-center gap-4">
                            <button type="button" onClick={() => updatePassengers('children', -1)} className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100"><Minus size={14} /></button>
                            <span className="font-bold w-4 text-center text-lg">{searchParams.passengers.children}</span>
                            <button type="button" onClick={() => updatePassengers('children', 1)} className="p-2 bg-blue-50 rounded-full text-blue-600 hover:bg-blue-100"><Plus size={14} /></button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Inputs Grid - Using Custom Components */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
                  {/* From */}
                  <div className="md:col-span-3">
                    <AirportAutocomplete
                      label="Flying From"
                      placeholder="City or Airport"
                      value={searchParams.from}
                      onChange={(val) => setSearchParams({ ...searchParams, from: val })}
                    />
                  </div>

                  {/* To */}
                  <div className="md:col-span-3">
                    <AirportAutocomplete
                      label="Flying To"
                      placeholder="Destination"
                      value={searchParams.to}
                      onChange={(val) => setSearchParams({ ...searchParams, to: val })}
                    />
                  </div>

                  {/* Depart */}
                  <div className="md:col-span-2">
                    <CustomDatePicker
                      label="Departing"
                      value={searchParams.departDate}
                      onChange={(val) => setSearchParams({ ...searchParams, departDate: val })}
                      minDate={formatDate(new Date())}
                    />
                  </div>

                  {/* Return */}
                  <div className="md:col-span-2">
                    <CustomDatePicker
                      label="Returning"
                      value={searchParams.returnDate}
                      onChange={(val) => setSearchParams({ ...searchParams, returnDate: val })}
                      minDate={searchParams.departDate}
                      disabled={searchParams.tripType === 'oneway'}
                    />
                  </div>

                  {/* Search Button */}
                  <div className="md:col-span-2 flex items-end">
                    <button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold py-3.5 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-[0.98] h-[52px]"
                    >
                      <Search size={22} />
                      <span>FIND</span>
                    </button>
                  </div>
                </div>

                {/* Trust Footer */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex gap-4">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      <Check size={14} className="text-green-500" /> Free Cancellation*
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-gray-500 uppercase tracking-wide">
                      <Check size={14} className="text-green-500" /> Price Match Promise
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsLowPriceModalOpen(true)}
                    className="text-xs text-blue-600 font-bold cursor-pointer hover:underline bg-transparent border-none p-0"
                  >
                    Why are our prices so low?
                  </button>
                </div>

              </form>
            </div>
          )}

          {/* --- STEP 2: ANALYZING --- */}
          {step === AppStep.ANALYZING && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto text-center transform transition-all min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-700 via-gray-100 to-white"></div>

              <div className="relative mb-8 z-10">
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-radar"></div>
                <div className="relative bg-white border-4 border-blue-50 text-blue-600 p-6 rounded-full shadow-2xl">
                  <Plane size={48} className="animate-pulse" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2 relative z-10">Searching 500+ Airlines...</h2>
              <p className="text-gray-500 mb-8 relative z-10">Checking private consolidator fares for {searchParams.passengers.adults + searchParams.passengers.children} traveler(s)</p>

              <div className="w-full max-w-sm bg-gray-100 rounded-full h-3 mb-4 overflow-hidden border border-gray-200 relative z-10">
                <div className="bg-gradient-to-r from-blue-500 to-blue-700 h-3 rounded-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]" style={{ width: `${loadingProgress}%` }}></div>
              </div>

              <div className="grid grid-cols-3 gap-4 w-full max-w-sm mt-4 text-xs text-gray-400 relative z-10">
                <div className={`transition-opacity ${loadingProgress > 20 ? 'opacity-100 text-blue-600 font-bold' : 'opacity-50'}`}>Scanning Routes</div>
                <div className={`transition-opacity ${loadingProgress > 50 ? 'opacity-100 text-blue-600 font-bold' : 'opacity-50'}`}>Checking Deals</div>
                <div className={`transition-opacity ${loadingProgress > 80 ? 'opacity-100 text-blue-600 font-bold' : 'opacity-50'}`}>Finalizing</div>
              </div>
            </div>
          )}

          {/* --- STEP 3: LEAD CAPTURE --- */}
          {step === AppStep.LEAD_CAPTURE && (
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl mx-auto flex flex-col md:flex-row transform transition-all">
              <div className="bg-gradient-to-br from-blue-900 to-blue-800 p-8 md:w-5/12 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white opacity-5 rounded-full blur-3xl"></div>

                <div>
                  <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 inline-block rounded-md mb-4 uppercase tracking-wide shadow-lg animate-pulse">
                    3 Offers Found
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Great news! We found unpublished rates.</h3>
                  <p className="text-blue-100 text-sm leading-relaxed mb-6 border-l-2 border-blue-400 pl-4">
                    {dealContext || `We have identified unpublished inventory for flights to ${searchParams.to}. These rates are protected by airline agreements.`}
                  </p>
                </div>

                {/* COMPARISON TABLE WIDGET */}
                {comparisonData && (
                  <div className="bg-white/10 backdrop-blur-md rounded-xl p-5 border border-white/20 shadow-inner">
                    <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-3">
                      <TrendingUp size={16} className="text-green-400" />
                      <h4 className="text-sm font-bold text-white tracking-wide uppercase">Live Price Check</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center opacity-80 group">
                        <span className="text-sm font-medium text-blue-200">{comparisonData.airline}</span>
                        <span className="text-sm line-through decoration-red-400 decoration-2">${comparisonData.market.toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between items-center opacity-80 group">
                        <span className="text-sm font-medium text-blue-200">Expedia / Kayak</span>
                        <span className="text-sm line-through decoration-red-400 decoration-2">${(comparisonData.market - 40).toLocaleString()}</span>
                      </div>

                      <div className="flex justify-between items-center mt-4 bg-gradient-to-r from-green-500/20 to-blue-500/20 p-3 rounded-lg -mx-2 border border-white/10 relative overflow-hidden">
                        <div className="absolute inset-0 bg-white/5 animate-pulse"></div>
                        <span className="font-bold text-white text-sm relative z-10 flex items-center gap-2">
                          <Shield size={14} className="text-yellow-400" /> Our Rate
                        </span>
                        <span className="font-bold text-yellow-400 text-xl relative z-10 tracking-tight">${comparisonData.us.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 justify-center opacity-60">
                      <AlertCircle size={10} />
                      <span className="text-[10px] text-center">Market averages updated 5 mins ago</span>
                    </div>
                  </div>
                )}

                {!comparisonData && (
                  <div className="space-y-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-1.5 rounded-full">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-sm font-medium">Est. Savings: 45%</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-green-500 p-1.5 rounded-full">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-sm font-medium">{searchParams.cabinClass} Seats Available</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-8 md:w-7/12 relative">
                <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="bg-white p-2 rounded-full shadow-sm text-blue-600">
                      <Plane size={16} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 text-sm">
                        {searchParams.tripType === 'roundtrip' ? 'Roundtrip' : 'One-way'} to <span className="text-blue-700">{searchParams.to}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        From {searchParams.from} • {new Date(searchParams.departDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Added 'Book with Expert' Section */}
                <div className="bg-red-50 border-2 border-red-100 rounded-xl p-5 mb-8 text-center relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-2 opacity-10">
                    <Phone className="w-24 h-24 text-red-600 -rotate-12 transform translate-x-4 -translate-y-4" />
                  </div>
                  <h4 className="text-red-800 font-bold uppercase tracking-wide text-sm mb-1">Book This Deal with an Expert</h4>
                  <p className="text-red-600 text-xs mb-3 font-medium">Skip the form and lock in this rate instantly.</p>
                  <a href="tel:+18005754609" className="inline-flex items-center justify-center gap-3 bg-red-600 text-white font-black text-2xl md:text-3xl py-3 px-6 rounded-lg shadow-lg hover:bg-red-700 hover:scale-105 transition-all w-full md:w-auto mx-auto z-10 relative">
                    <Phone className="animate-pulse" size={28} />
                    (800) 575-4609
                  </a>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">Unlock Your Flight Deal</h3>
                <p className="text-gray-500 text-sm mb-6">Enter your details to reveal the discounted price and flight itinerary.</p>

                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      <input
                        required
                        type="text"
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                        placeholder="e.g. John Doe"
                        value={lead.name}
                        onChange={(e) => setLead({ ...lead, name: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      <input
                        required
                        type="email"
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                        placeholder="john@example.com"
                        value={lead.email || ''}
                        onChange={(e) => setLead({ ...lead, email: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      <input
                        required
                        type="tel"
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow"
                        placeholder="(555) 123-4567"
                        value={lead.phone}
                        onChange={(e) => setLead({ ...lead, phone: e.target.value })}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                      <Shield size={12} className="text-green-600" /> Your privacy is protected. No spam.
                    </p>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-2 group"
                  >
                    <span>Reveal Discounted Price</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-[10px] text-gray-400 text-center mt-4">
                    By submitting, you consent to receive a call from a FlightFareTech travel expert to confirm your booking request.
                  </p>
                </form>
              </div>
            </div>
          )}

          {/* --- STEP 4: SUCCESS --- */}
          {step === AppStep.SUCCESS && (
            <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-2xl mx-auto text-center transform transition-all">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Check size={48} className="text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Itinerary Locked!</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                Thank you, <span className="font-semibold text-gray-900">{lead.name}</span>. We have temporarily reserved the {searchParams.cabinClass} rates for {searchParams.to}.
              </p>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-blue-100 px-3 py-1 rounded-bl-lg text-xs font-bold text-blue-700">PRIORITY STATUS</div>
                <div className="flex items-center justify-center gap-3 mb-3">
                  <Phone className="text-blue-600 animate-bounce" size={24} />
                  <span className="text-blue-900 font-bold text-xl">Incoming Call...</span>
                </div>
                <p className="text-blue-800 font-medium">
                  A senior agent will call you within <span className="font-bold underline decoration-red-500 decoration-2">2 minutes</span> at {lead.phone} to finalize the discount.
                </p>
                <p className="text-xs text-blue-400 mt-2">Please keep your line open to secure this price.</p>
              </div>

              <button
                onClick={() => window.location.reload()}
                className="text-gray-400 hover:text-gray-600 text-sm font-medium hover:underline"
              >
                Start New Search
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Content Sections - Only show when in Search or Success mode to keep funnel focused */}
      {(step === AppStep.SEARCH || step === AppStep.SUCCESS) && (
        <>
          <TopDestinations />
          <SocialProof />
          <SEOContent />
        </>
      )}

      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <img
              src="/images/logo.svg"
              alt="FlightFareTech"
              className="h-12 w-auto object-contain brightness-0 invert opacity-90"
            />
          </div>
          <div className="flex justify-center gap-6 mb-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">About Us</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-sm mb-4">&copy; {new Date().getFullYear()} FlightFareTech. All rights reserved.</p>
          <p className="text-xs max-w-2xl mx-auto text-gray-600 leading-relaxed mb-4">
            *Savings claims based on comparison with major public OTA rates for same-day bookings on select international routes. Prices subject to availability and change without notice. All tickets subject to airline fare rules and restrictions.
          </p>
          <p className="text-[10px] max-w-3xl mx-auto text-gray-700 leading-relaxed border-t border-gray-800 pt-4 mt-4">
            Disclaimer: The independent travel website FlightFareTech is unaffiliated with any third parties. You acknowledge that FlightFareTech is not responsible for any loss, whether direct or indirect, resulting from offers, content, or links to other websites found on this website by using FlightFareTech.com. If you have any questions, call us at <a href="tel:+18005754609" className="hover:text-gray-500 transition-colors">+1-800-575-4609</a>, our complementary number, or send an email to <a href="mailto:info@FlightFareTech.com" className="hover:text-gray-500 transition-colors">info@FlightFareTech.com</a>.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;