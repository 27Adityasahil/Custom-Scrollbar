import React from 'react';
import { useScrollbarCustomizer } from './hooks/useScrollbarCustomizer';
import { ThemeToggle } from './components/ThemeToggle';
import { PreviewPanel } from './components/PreviewPanel';
import { ControlsPanel } from './components/ControlsPanel';
import { PresetsPanel } from './components/PresetsPanel';
import { ExportPanel } from './components/ExportPanel';
import { Wrench, Sparkles } from 'lucide-react';

function App() {
  const {
    settings,
    isDark,
    updateSetting,
    resetSettings,
    applyPreset,
    toggleTheme,
    generateCSS
  } = useScrollbarCustomizer();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-gray-900 dark:to-indigo-950 transition-colors duration-300">
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg">
              <Wrench className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Scrollbar Customizer
            </h1>
            <Sparkles className="w-8 h-8 text-yellow-500 animate-pulse" />
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Create beautiful, custom scrollbars with live preview. 
            Design, customize, and export professional scrollbar styles for your web projects.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Left Column - Preview */}
          <div className="space-y-8">
            <PreviewPanel settings={settings} />
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-8">
            <ControlsPanel
              settings={settings}
              onUpdateSetting={updateSetting}
              onReset={resetSettings}
            />
            <PresetsPanel onApplyPreset={applyPreset} />
          </div>
        </div>

        {/* Export Section */}
        <div className="max-w-4xl mx-auto">
          <ExportPanel css={generateCSS()} />
        </div>

        {/* Footer */}
        <div className="text-center mt-16 pb-8">
          <div className="inline-block bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Made with ❤️ for developers who care about the details
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-500 dark:text-gray-500">
              <span>Cross-browser compatible</span>
              <span>•</span>
              <span>Accessibility focused</span>
              <span>•</span>
              <span>Production ready</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;