import React from 'react';
import { X, ShieldCheck, TrendingDown, Lock } from 'lucide-react';

interface LowPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LowPriceModal: React.FC<LowPriceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg relative overflow-hidden transform transition-all scale-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
             <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <TrendingDown size={28} />
             </div>
             <h3 className="text-2xl font-bold text-gray-900">Why are we so cheap?</h3>
          </div>

          <div className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              FlightFareTech isn't a traditional travel agency. We are a <span className="font-bold text-gray-900">wholesale consolidator</span>.
            </p>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-4">
               <Lock className="text-blue-500 shrink-0 mt-1" size={20} />
               <div>
                 <h4 className="font-bold text-gray-900 text-sm">Unpublished "Blind" Inventory</h4>
                 <p className="text-xs text-gray-500 mt-1">Airlines have empty seats they can't sell publicly without angering full-price customers. We sell these seats privately.</p>
               </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex gap-4">
               <ShieldCheck className="text-green-500 shrink-0 mt-1" size={20} />
               <div>
                 <h4 className="font-bold text-gray-900 text-sm">Contracted Bulk Rates</h4>
                 <p className="text-xs text-gray-500 mt-1">We pre-negotiate volume deals on major international routes (LHR, CDG, DXB, HND) that online search engines can't access.</p>
               </div>
            </div>

            <p className="text-xs text-gray-400 text-center pt-2">
              *These rates are available via phone booking only to maintain airline compliance.
            </p>
          </div>

          <button 
            onClick={onClose}
            className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 transition-colors"
          >
            Got it, let's find a flight
          </button>
        </div>
      </div>
    </div>
  );
};