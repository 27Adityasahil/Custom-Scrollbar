import React from 'react';
import { Palette } from 'lucide-react';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
  className?: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ 
  label, 
  value, 
  onChange, 
  className = '' 
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <div className="relative">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="sr-only"
          id={`color-${label.replace(/\s+/g, '-').toLowerCase()}`}
        />
        <label
          htmlFor={`color-${label.replace(/\s+/g, '-').toLowerCase()}`}
          className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:border-blue-400 transition-colors group"
        >
          <div
            className="w-6 h-6 sm:w-8 sm:h-8 rounded-md border-2 border-gray-300 dark:border-gray-600 group-hover:border-blue-400 transition-colors shadow-sm flex-shrink-0"
            style={{ backgroundColor: value }}
          />
          <div className="flex-1 min-w-0">
            <div className="text-xs sm:text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {value.toUpperCase()}
            </div>
          </div>
          <Palette className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-blue-500 transition-colors flex-shrink-0" />
        </label>
      </div>
    </div>
  );
};