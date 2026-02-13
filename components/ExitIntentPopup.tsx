import React, { useEffect, useState } from 'react';
import { X, Tag } from 'lucide-react';

export const ExitIntentPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Check if mouse left the viewport at the top
      if (e.clientY < 0 && !hasShown) {
        setIsVisible(true);
        setHasShown(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShown]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden transform transition-all scale-100">
        {/* Decorative header */}
        <div className="bg-red-600 p-6 text-center text-white relative">
            <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-4 right-4 p-1 hover:bg-white/20 rounded-full transition-colors"
            >
                <X size={20} />
            </button>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Tag size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-extrabold">Wait! Don't Overpay.</h3>
            <p className="text-red-100 text-sm">We have one last secret deal for you.</p>
        </div>
        
        <div className="p-8 text-center">
            <p className="text-gray-600 mb-6">
                Our agents have <strong>3 unpublished promo codes</strong> remaining for today. Call now to claim an extra <span className="text-red-600 font-bold">5% OFF</span> our wholesale rates.
            </p>
            
            <a href="tel:+18005754609" className="block w-full bg-blue-900 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-800 transition-all transform hover:scale-[1.02] mb-4">
                Call (800) 575-4609 Now
            </a>
            
            <button 
                onClick={() => setIsVisible(false)}
                className="text-gray-400 text-sm hover:text-gray-600 font-medium"
            >
                No thanks, I prefer paying full price
            </button>
        </div>
      </div>
    </div>
  );
};