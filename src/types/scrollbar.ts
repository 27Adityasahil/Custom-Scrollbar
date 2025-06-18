export interface ScrollbarSettings {
  width: number;
  trackColor: string;
  thumbColor: string;
  thumbHoverColor: string;
  thumbActiveColor: string;
  borderRadius: number;
  orientation: 'vertical' | 'horizontal' | 'both';
}

export interface ScrollbarPreset {
  id: string;
  name: string;
  description: string;
  settings: ScrollbarSettings;
}

export interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}