import React, { useState, useEffect } from 'react';
import { useScrollbarCustomizer } from './hooks/useScrollbarCustomizer';
import { Preloader } from './components/Preloader';
import { ThemeToggle } from './components/ThemeToggle';
import { PreviewPanel } from './components/PreviewPanel';
import { ControlsPanel } from './components/ControlsPanel';
import { PresetsPanel } from './components/PresetsPanel';
import { ExportPanel } from './components/ExportPanel';
import { Wrench, Sparkles } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  const {
    settings,
    isDark,
    updateSetting,
    resetSettings,
    applyPreset,
    toggleTheme,
    generateCSS
  } = useScrollbarCustomizer();

  const handleLoadComplete = () => {
    setIsLoading(false);
    setTimeout(() => setShowContent(true), 300);
  };

  // Simulate additional loading time for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        handleLoadComplete();
      }
    }, 4000); // Minimum 4 seconds loading

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading) {
    return <Preloader onLoadComplete={handleLoadComplete} />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 transition-all duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      {/* Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
            <div className="p-2 sm:p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg animate-fade-in">
              <Wrench className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent text-center sm:text-left animate-fade-in-up">
              Scrollbar Customizer
            </h1>
            <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Create beautiful, custom scrollbars with live preview. 
            Design, customize, and export professional scrollbar styles for your web projects.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Left Column - Preview */}
          <div className="space-y-6 sm:space-y-8 order-2 xl:order-1 animate-fade-in-left" style={{ animationDelay: '0.4s' }}>
            <PreviewPanel settings={settings} />
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6 sm:space-y-8 order-1 xl:order-2 animate-fade-in-right" style={{ animationDelay: '0.6s' }}>
            <ControlsPanel
              settings={settings}
              onUpdateSetting={updateSetting}
              onReset={resetSettings}
            />
            <PresetsPanel onApplyPreset={applyPreset} />
          </div>
        </div>

        {/* Export Section */}
        <div className="max-w-6xl mx-auto mb-8 sm:mb-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <ExportPanel css={generateCSS()} />
        </div>

        {/* Footer */}
        <div className="text-center pb-6 sm:pb-8 animate-fade-in" style={{ animationDelay: '1s' }}>
          <div className="inline-block bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow-lg border border-gray-200 dark:border-gray-700 mx-4 sm:mx-0">
            <p className="text-gray-600 dark:text-gray-400 mb-2 text-sm sm:text-base">
              Made with ❤️ for developers who care about the details
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-500">
              <span>Cross-browser compatible</span>
              <span className="hidden sm:inline">•</span>
              <span>Accessibility focused</span>
              <span className="hidden sm:inline">•</span>
              <span>Production ready</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in-left {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes fade-in-right {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default App;