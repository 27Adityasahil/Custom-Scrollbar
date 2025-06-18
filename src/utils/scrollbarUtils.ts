import { ScrollbarPreset } from '../types/scrollbar';

export const presetStyles: ScrollbarPreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'Clean and minimal',
    settings: {
      width: 12,
      trackColor: '#f1f1f1',
      thumbColor: '#888888',
      thumbHoverColor: '#555555',
      thumbActiveColor: '#333333',
      borderRadius: 6,
      orientation: 'both'
    }
  },
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    description: 'Professional blue theme',
    settings: {
      width: 10,
      trackColor: '#e3f2fd',
      thumbColor: '#2196f3',
      thumbHoverColor: '#1976d2',
      thumbActiveColor: '#0d47a1',
      borderRadius: 5,
      orientation: 'both'
    }
  },
  {
    id: 'dark-mode',
    name: 'Dark Mode',
    description: 'Perfect for dark themes',
    settings: {
      width: 14,
      trackColor: '#2d2d2d',
      thumbColor: '#505050',
      thumbHoverColor: '#6d6d6d',
      thumbActiveColor: '#8a8a8a',
      borderRadius: 7,
      orientation: 'both'
    }
  },
  {
    id: 'vibrant-gradient',
    name: 'Vibrant',
    description: 'Colorful and eye-catching',
    settings: {
      width: 16,
      trackColor: '#fce4ec',
      thumbColor: '#e91e63',
      thumbHoverColor: '#c2185b',
      thumbActiveColor: '#ad1457',
      borderRadius: 8,
      orientation: 'both'
    }
  },
  {
    id: 'minimal-thin',
    name: 'Minimal Thin',
    description: 'Ultra-thin and subtle',
    settings: {
      width: 6,
      trackColor: '#f8f9fa',
      thumbColor: '#dee2e6',
      thumbHoverColor: '#adb5bd',
      thumbActiveColor: '#868e96',
      borderRadius: 3,
      orientation: 'both'
    }
  },
  {
    id: 'terminal-green',
    name: 'Terminal',
    description: 'Retro terminal style',
    settings: {
      width: 12,
      trackColor: '#0d1117',
      thumbColor: '#00ff41',
      thumbHoverColor: '#00cc33',
      thumbActiveColor: '#009926',
      borderRadius: 0,
      orientation: 'both'
    }
  }
];

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy text: ', err);
    return false;
  }
};

export const downloadCSS = (css: string, filename: string = 'scrollbar-styles.css') => {
  const blob = new Blob([css], { type: 'text/css' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};