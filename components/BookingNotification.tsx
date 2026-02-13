import React, { useEffect, useState } from 'react';
import { BOOKING_NOTIFICATIONS } from '../constants';
import { CheckCircle, X } from 'lucide-react';

export const BookingNotification: React.FC = () => {
  const [notification, setNotification] = useState<typeof BOOKING_NOTIFICATIONS[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initial delay before first notification
    const timeout = setTimeout(() => {
        showRandomNotification();
    }, 5000);

    // Periodic notifications
    const interval = setInterval(() => {
        showRandomNotification();
    }, 15000 + Math.random() * 10000); // Random interval between 15-25s

    return () => {
        clearTimeout(timeout);
        clearInterval(interval);
    };
  }, []);

  const showRandomNotification = () => {
    const randomIdx = Math.floor(Math.random() * BOOKING_NOTIFICATIONS.length);
    setNotification(BOOKING_NOTIFICATIONS[randomIdx]);
    setIsVisible(true);
    
    // Hide after 6 seconds
    setTimeout(() => {
        setIsVisible(false);
    }, 6000);
  };

  if (!notification || !isVisible) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm w-full animate-fade-in-up">
        <div className="bg-white rounded-lg shadow-xl border-l-4 border-green-500 p-4 relative flex items-start gap-3">
            <button 
                onClick={() => setIsVisible(false)}
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
                <X size={14} />
            </button>
            
            <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                <CheckCircle size={20} className="text-green-600" />
            </div>
            
            <div>
                <p className="text-sm font-bold text-gray-900">Just Booked!</p>
                <p className="text-sm text-gray-600 mt-1">
                    <span className="font-semibold">{notification.name}</span> from {notification.from} saved <span className="text-green-600 font-bold">${notification.saved}</span> on a flight to {notification.to}.
                </p>
                <p className="text-xs text-gray-400 mt-2">Verified 2 minutes ago</p>
            </div>
        </div>
    </div>
  );
};