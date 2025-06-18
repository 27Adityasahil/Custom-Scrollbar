import React, { useEffect, useRef } from 'react';
import { ScrollbarSettings } from '../types/scrollbar';
import { Code, Scroll } from 'lucide-react';

interface PreviewPanelProps {
  settings: ScrollbarSettings;
}

export const PreviewPanel: React.FC<PreviewPanelProps> = ({ settings }) => {
  const verticalRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateScrollbarStyle = () => {
      const { width, trackColor, thumbColor, thumbHoverColor, thumbActiveColor, borderRadius } = settings;
      
      return `
        .custom-scrollbar::-webkit-scrollbar {
          width: ${width}px;
          height: ${width}px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: ${trackColor};
          border-radius: ${borderRadius}px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${thumbColor};
          border-radius: ${borderRadius}px;
          transition: background-color 0.2s ease;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${thumbHoverColor};
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: ${thumbActiveColor};
        }
      `;
    };

    const styleElement = document.getElementById('custom-scrollbar-style');
    if (styleElement) {
      styleElement.textContent = generateScrollbarStyle();
    } else {
      const newStyle = document.createElement('style');
      newStyle.id = 'custom-scrollbar-style';
      newStyle.textContent = generateScrollbarStyle();
      document.head.appendChild(newStyle);
    }

    return () => {
      const style = document.getElementById('custom-scrollbar-style');
      if (style) {
        style.remove();
      }
    };
  }, [settings]);

  const sampleContent = Array.from({ length: 50 }, (_, i) => (
    <div key={i} className="p-3 sm:p-4 mb-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
      <div className="flex items-center gap-2 sm:gap-3 mb-2">
        <Code className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100">
          Content Block {i + 1}
        </h3>
      </div>
      <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
        This is sample content to demonstrate the scrollbar styling. 
        Each block contains enough text to create a scrollable area where you can see your custom scrollbar in action. 
        The scrollbar will appear when the content overflows the container height.
      </p>
    </div>
  ));

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-6">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Scroll className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            Live Preview
          </h2>
        </div>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 px-4 sm:px-0">
          Scroll within the panels below to see your custom scrollbar in action
        </p>
      </div>

      {(settings.orientation === 'vertical' || settings.orientation === 'both') && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <h3 className="text-base sm:text-lg font-semibold">Vertical Scrollbar Preview</h3>
            <p className="text-xs sm:text-sm text-blue-100">Scroll vertically to see your custom scrollbar</p>
          </div>
          <div
            ref={verticalRef}
            className="custom-scrollbar h-64 sm:h-80 overflow-y-auto p-3 sm:p-4 bg-gray-50 dark:bg-gray-900"
          >
            {sampleContent}
          </div>
        </div>
      )}

      {(settings.orientation === 'horizontal' || settings.orientation === 'both') && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="p-3 sm:p-4 bg-gradient-to-r from-green-500 to-teal-600 text-white">
            <h3 className="text-base sm:text-lg font-semibold">Horizontal Scrollbar Preview</h3>
            <p className="text-xs sm:text-sm text-green-100">Scroll horizontally to see your custom scrollbar</p>
          </div>
          <div
            ref={horizontalRef}
            className="custom-scrollbar h-32 sm:h-40 overflow-x-auto p-3 sm:p-4 bg-gray-50 dark:bg-gray-900"
          >
            <div className="flex gap-3 sm:gap-4" style={{ width: '200%' }}>
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 w-48 sm:w-64 p-3 sm:p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 rounded-lg border border-gray-200 dark:border-gray-600"
                >
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    Card {i + 1}
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                    Horizontal scrolling content to demonstrate the custom scrollbar styling.
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};