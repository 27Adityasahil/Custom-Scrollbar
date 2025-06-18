import { useState, useCallback, useEffect } from 'react';
import { ScrollbarSettings } from '../types/scrollbar';

const defaultSettings: ScrollbarSettings = {
  width: 12,
  trackColor: '#f1f1f1',
  thumbColor: '#888888',
  thumbHoverColor: '#555555',
  thumbActiveColor: '#333333',
  borderRadius: 6,
  orientation: 'both'
};

export const useScrollbarCustomizer = () => {
  const [settings, setSettings] = useState<ScrollbarSettings>(defaultSettings);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      return saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const updateSetting = useCallback(<K extends keyof ScrollbarSettings>(
    key: K,
    value: ScrollbarSettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(defaultSettings);
  }, []);

  const applyPreset = useCallback((presetSettings: ScrollbarSettings) => {
    setSettings(presetSettings);
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(prev => !prev);
  }, []);

  const generateCSS = useCallback(() => {
    const { width, trackColor, thumbColor, thumbHoverColor, thumbActiveColor, borderRadius } = settings;
    
    return `/* Custom Scrollbar Styles */
::-webkit-scrollbar {
  width: ${width}px;
  height: ${width}px;
}

::-webkit-scrollbar-track {
  background: ${trackColor};
  border-radius: ${borderRadius}px;
}

::-webkit-scrollbar-thumb {
  background: ${thumbColor};
  border-radius: ${borderRadius}px;
  transition: background-color 0.2s ease;
}

::-webkit-scrollbar-thumb:hover {
  background: ${thumbHoverColor};
}

::-webkit-scrollbar-thumb:active {
  background: ${thumbActiveColor};
}

/* Firefox */
* {
  scrollbar-width: ${width < 8 ? 'thin' : width > 16 ? 'thick' : 'auto'};
  scrollbar-color: ${thumbColor} ${trackColor};
}`;
  }, [settings]);

    return {
    settings,
    isDark,
    updateSetting,
    resetSettings,
    applyPreset,
    toggleTheme,
    generateCSS
  };
};