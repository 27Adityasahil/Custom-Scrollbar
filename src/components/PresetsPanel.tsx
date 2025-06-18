import React from 'react';
import { ScrollbarSettings } from '../types/scrollbar';
import { presetStyles } from '../utils/scrollbarUtils';
import { Palette, Star } from 'lucide-react';

interface PresetsPanelProps {
  onApplyPreset: (settings: ScrollbarSettings) => void;
}

export const PresetsPanel: React.FC<PresetsPanelProps> = ({ onApplyPreset }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
      <div className="flex items-center gap-2 mb-4 sm:mb-6">
        <Star className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          Preset Styles
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {presetStyles.map((preset) => (
          <div
            key={preset.id}
            className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-3 sm:p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => onApplyPreset(preset.settings)}
          >
            <div className="flex items-start gap-2 sm:gap-3 mb-3">
              <div className="flex-shrink-0">
                <Palette className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                  {preset.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                  {preset.description}
                </p>
              </div>
            </div>

            {/* Scrollbar Preview */}
            <div className="relative h-16 sm:h-20 bg-gray-200 dark:bg-gray-900 rounded border overflow-hidden mb-3">
              <div 
                className="absolute right-1 top-1 bottom-1 rounded"
                style={{ 
                  width: `${Math.min(preset.settings.width, 12)}px`,
                  backgroundColor: preset.settings.trackColor,
                  borderRadius: `${preset.settings.borderRadius}px`
                }}
              >
                <div 
                  className="absolute top-1 left-1/2 transform -translate-x-1/2 rounded"
                  style={{ 
                    width: `${Math.max(Math.min(preset.settings.width, 12) - 4, 2)}px`,
                    height: '24px',
                    backgroundColor: preset.settings.thumbColor,
                    borderRadius: `${preset.settings.borderRadius}px`
                  }}
                />
              </div>
            </div>

            {/* Color Swatches */}
            <div className="flex gap-1.5 sm:gap-2">
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300 dark:border-gray-600 flex-shrink-0"
                style={{ backgroundColor: preset.settings.trackColor }}
                title="Track Color"
              />
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300 dark:border-gray-600 flex-shrink-0"
                style={{ backgroundColor: preset.settings.thumbColor }}
                title="Thumb Color"
              />
              <div 
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-gray-300 dark:border-gray-600 flex-shrink-0"
                style={{ backgroundColor: preset.settings.thumbHoverColor }}
                title="Hover Color"
              />
            </div>

            <div className="absolute inset-0 bg-blue-500 rounded-lg opacity-0 group-hover:opacity-10 transition-opacity" />
          </div>
        ))}
      </div>
    </div>
  );
};