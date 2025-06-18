import React from 'react';
import { ScrollbarSettings } from '../types/scrollbar';
import { ColorPicker } from './ColorPicker';
import { RangeSlider } from './RangeSlider';
import { RotateCcw, Settings } from 'lucide-react';

interface ControlsPanelProps {
  settings: ScrollbarSettings;
  onUpdateSetting: <K extends keyof ScrollbarSettings>(
    key: K,
    value: ScrollbarSettings[K]
  ) => void;
  onReset: () => void;
}

// export const ControlsPanel: React.FC<ControlsPanelProps> = ({
//   }
//   settings,
//   onUpdateSetting,
//   onReset
// }) => {
export const ControlsPanel: React.FC<ControlsPanelProps> = ({
    settings,
    onUpdateSetting,
    onReset
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Customization Controls
          </h2>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="space-y-8">
        {/* Dimensions Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            Dimensions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <RangeSlider
              label="Scrollbar Width"
              value={settings.width}
              min={4}
              max={24}
              unit="px"
              onChange={(value) => onUpdateSetting('width', value)}
            />
            <RangeSlider
              label="Border Radius"
              value={settings.borderRadius}
              min={0}
              max={20}
              unit="px"
              onChange={(value) => onUpdateSetting('borderRadius', value)}
            />
          </div>
        </div>

        {/* Colors Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            Colors
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ColorPicker
              label="Track Color"
              value={settings.trackColor}
              onChange={(color) => onUpdateSetting('trackColor', color)}
            />
            <ColorPicker
              label="Thumb Color"
              value={settings.thumbColor}
              onChange={(color) => onUpdateSetting('thumbColor', color)}
            />
            <ColorPicker
              label="Thumb Hover Color"
              value={settings.thumbHoverColor}
              onChange={(color) => onUpdateSetting('thumbHoverColor', color)}
            />
            <ColorPicker
              label="Thumb Active Color"
              value={settings.thumbActiveColor}
              onChange={(color) => onUpdateSetting('thumbActiveColor', color)}
            />
          </div>
        </div>

        {/* Orientation Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
            Orientation
          </h3>
          <div className="flex gap-4">
            {(['vertical', 'horizontal', 'both'] as const).map((orientation) => (
              <button
                key={orientation}
                onClick={() => onUpdateSetting('orientation', orientation)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  settings.orientation === orientation
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Accessibility Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-2">
            💡 Accessibility Tips
          </h3>
          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
            <li>• Ensure sufficient contrast between track and thumb colors</li>
            <li>• Keep scrollbar width at least 12px for touch devices</li>
            <li>• Provide clear visual feedback for hover and active states</li>
            <li>• Test your scrollbar with keyboard navigation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};