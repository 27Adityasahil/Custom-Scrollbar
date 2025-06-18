import React from 'react';
import { ScrollbarSettings } from '../types/scrollbar';
import { presetStyles } from '../utils/scrollbarUtils';
import { Palette, Star } from 'lucide-react';

interface PresetsPanelProps {
  onApplyPreset: (settings: ScrollbarSettings) => void;
}

export const PresetsPanel: React.FC<PresetsPanelProps> = ({ onApplyPreset }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center gap-2 mb-6">
        <Star className="w-6 h-6 text-yellow-500" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Preset Styles
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {presetStyles.map((preset) => (
          <div
            key={preset.id}
            className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 p-4 hover:shadow-md transition-all cursor-pointer"
            onClick={() => onApplyPreset(preset.settings)}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-shrink-0">
                <Palette className="w-5 h-5 text-gray-500 group-hover:text-blue-500 transition-colors" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {preset.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {preset.description}
                </p>
              </div>
            </div>

            {/* Scrollbar Preview */}
            <div className="relative h-20 bg-gray-200 dark:bg-gray-900 rounded border overflow-hidden">
              <div 
                className="absolute right-1 top-1 bottom-1 rounded"
                style={{ 
                  width: `${preset.settings.width}px`,
                  backgroundColor: preset.settings.trackColor,
                  borderRadius: `${preset.settings.borderRadius}px`
                }}
              >
                <div 
                  className="absolute top-1 left-1/2 transform -translate-x-1/2 rounded"
                  style={{ 
                    width: `${Math.max(preset.settings.width - 4, 2)}px`,
                    height: '30px',
                    backgroundColor: preset.settings.thumbColor,
                    borderRadius: `${preset.settings.borderRadius}px`
                  }}
                />
              </div>
            </div>

            {/* Color Swatches */}
            <div className="flex gap-2 mt-3">
              <div 
                className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: preset.settings.trackColor }}
                title="Track Color"
              />
              <div 
                className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
                style={{ backgroundColor: preset.settings.thumbColor }}
                title="Thumb Color"
              />
              <div 
                className="w-4 h-4 rounded-full border border-gray-300 dark:border-gray-600"
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