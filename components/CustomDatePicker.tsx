import React, { useState, useEffect, useRef } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDatePickerProps {
  label: string;
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  disabled?: boolean;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ label, value, onChange, minDate, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Parse initial date
  const dateObj = value ? new Date(value) : new Date();
  
  // View state
  const [viewYear, setViewYear] = useState(dateObj.getFullYear());
  const [viewMonth, setViewMonth] = useState(dateObj.getMonth());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    // Construct date string YYYY-MM-DD (local time)
    const monthStr = String(viewMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${viewYear}-${monthStr}-${dayStr}`;
    onChange(dateStr);
    setIsOpen(false);
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
  };

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(viewMonth, viewYear);
    const firstDay = getFirstDayOfMonth(viewMonth, viewYear);
    const blanks = Array(firstDay).fill(null);
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    
    // Check constraints
    const today = new Date();
    today.setHours(0,0,0,0);
    const minDateObj = minDate ? new Date(minDate) : today;

    return (
      <div className="p-4 w-72">
        <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronLeft size={20} /></button>
            <span className="font-bold text-gray-900">{MONTH_NAMES[viewMonth]} {viewYear}</span>
            <button onClick={nextMonth} className="p-1 hover:bg-gray-100 rounded-full transition-colors"><ChevronRight size={20} /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS.map(d => <div key={d} className="text-center text-xs font-bold text-gray-400">{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
            {blanks.map((_, i) => <div key={`blank-${i}`} />)}
            {days.map(day => {
                const current = new Date(viewYear, viewMonth, day);
                const isSelected = value && current.toISOString().split('T')[0] === value;
                const isDisabled = current < minDateObj;
                
                return (
                    <button
                        key={day}
                        disabled={isDisabled}
                        onClick={(e) => { e.preventDefault(); handleDateClick(day); }}
                        className={`
                            h-9 w-9 rounded-full flex items-center justify-center text-sm font-medium transition-all
                            ${isSelected ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-blue-50 text-gray-700'}
                            ${isDisabled ? 'text-gray-300 cursor-not-allowed hover:bg-transparent' : ''}
                        `}
                    >
                        {day}
                    </button>
                )
            })}
        </div>
      </div>
    );
  };

  // Format display value nicely (e.g. "Oct 12, 2024")
  const displayValue = value ? new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';

  return (
    <div className="relative" ref={wrapperRef}>
        <label className="block text-xs font-bold text-gray-500 uppercase mb-1 ml-1">{label}</label>
        <div 
            onClick={() => !disabled && setIsOpen(!isOpen)}
            className={`relative group cursor-pointer ${disabled ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
            <CalendarIcon className="absolute left-3 top-3.5 text-blue-600 z-10" size={18} />
            <input 
                type="text" 
                readOnly
                value={displayValue}
                className={`w-full pl-10 pr-2 py-3.5 border border-gray-200 rounded-lg focus:outline-none font-bold text-gray-900 text-sm group-hover:border-blue-300 transition-colors cursor-pointer ${disabled ? 'bg-gray-100' : 'bg-gray-50'}`}
            />
            {/* Underline effect */}
            {!disabled && <div className="absolute bottom-0 left-0 h-0.5 bg-blue-600 w-0 group-hover:w-full transition-all duration-300 rounded-b-lg"></div>}
        </div>

        {isOpen && !disabled && (
            <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
                {renderCalendar()}
            </div>
        )}
    </div>
  );
};