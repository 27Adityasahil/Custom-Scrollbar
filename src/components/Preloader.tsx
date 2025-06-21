import React, { useEffect, useState } from 'react';
import { Wrench } from 'lucide-react';

interface PreloaderProps {
  onLoadComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [colorIndex, setColorIndex] = useState(0);

  const colors = [
    '#3b82f6', 
    '#10b981',
    '#f59e0b',
    '#ef4444',
    '#8b5cf6',
    '#06b6d4',
    '#f97316',
    '#84cc16',
    '#ec4899',
    '#6366f1',
  ];

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 50; // Updating every 50ms
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadComplete, 500); // some delay before hiding
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    // Color change interval
    const colorTimer = setInterval(() => {
      setColorIndex(prev => (prev + 1) % colors.length);
    }, 300);

    return () => {
      clearInterval(timer);
      clearInterval(colorTimer);
    };
  }, [onLoadComplete, colors.length]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 z-50 flex items-center justify-center transition-opacity duration-500">
      <div className="text-center space-y-8">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-2xl animate-pulse">
            <Wrench className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Scrollbar Customizer
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Loading your creative workspace...
          </p>
        </div>

        {/* Animated Scrollbar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Loading Progress
              </span>
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                {Math.round(progress)}%
              </span>
            </div>
            
            {/* Custom Scrollbar Track */}
            <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
              {/* Animated Scrollbar Thumb */}
              <div
                className="absolute top-1 bottom-1 rounded-full transition-all duration-300 shadow-lg"
                style={{
                  left: '4px',
                  width: `${Math.max(progress * 0.9, 8)}%`,
                  backgroundColor: colors[colorIndex],
                  boxShadow: `0 0 20px ${colors[colorIndex]}40`,
                }}
              >
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 rounded-full animate-pulse" />
              </div>
              
              {/* Moving highlight */}
              <div
                className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 rounded-full animate-pulse"
                style={{
                  left: `${progress * 0.8}%`,
                  animation: 'shimmer 2s infinite',
                }}
              />
            </div>
          </div>

          {/* Color indicators */}
          <div className="flex justify-center gap-2 mt-4">
            {colors.map((color, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === colorIndex ? 'scale-125 shadow-lg' : 'scale-100'
                }`}
                style={{
                  backgroundColor: color,
                  boxShadow: index === colorIndex ? `0 0 10px ${color}60` : 'none',
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading text with dots animation */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-gray-600 dark:text-gray-400">Preparing your tools</span>
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};