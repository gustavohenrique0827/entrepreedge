
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type ThemeContextType = {
  primaryColor: string;
  secondaryColor: string;
  darkMode: boolean;
  fontSize: string;
  applyThemeColors: () => void;
  updateThemeColors: (primary: string, secondary: string) => void;
  toggleDarkMode: (enabled: boolean) => void;
  setFontSize: (size: string) => void;
};

const defaultContext: ThemeContextType = {
  primaryColor: '#8B5CF6',
  secondaryColor: '#D946EF',
  darkMode: false,
  fontSize: 'medium',
  applyThemeColors: () => {},
  updateThemeColors: () => {},
  toggleDarkMode: () => {},
  setFontSize: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('primaryColor') || '#8B5CF6');
  const [secondaryColor, setSecondaryColor] = useState(localStorage.getItem('secondaryColor') || '#D946EF');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const [fontSize, setFontSizeState] = useState(localStorage.getItem('fontSize') || 'medium');

  // Convert hex to HSL for Tailwind variables
  const hexToHSL = (hex: string) => {
    // Remove the # from the beginning
    hex = hex.replace(/^#/, '');

    // Parse the hex values
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;

    // Find max and min values to calculate the lightness
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    // Calculate hue and saturation
    if (max !== min) {
      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
      else if (max === g) h = (b - r) / d + 2;
      else if (max === b) h = (r - g) / d + 4;
      h *= 60;
    }

    return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
  };

  const applyThemeColors = () => {
    // Apply to CSS variables
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Apply dark mode
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Apply font size
    document.documentElement.setAttribute('data-font-size', fontSize);
    
    // Remove any previous font size classes to avoid conflicts
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    
    if (fontSize === 'small') {
      document.documentElement.classList.add('text-sm');
    } else if (fontSize === 'medium') {
      document.documentElement.classList.add('text-base');
    } else if (fontSize === 'large') {
      document.documentElement.classList.add('text-lg');
    }
    
    // Apply theme colors to Tailwind CSS variables
    const primaryHSL = hexToHSL(primaryColor);
    const secondaryHSL = hexToHSL(secondaryColor);
    
    document.documentElement.style.setProperty('--primary', `${primaryHSL.h} ${primaryHSL.s}% ${primaryHSL.l}%`);
    document.documentElement.style.setProperty('--secondary', `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l}%`);
    
    // Apply sidebar accent color
    document.documentElement.style.setProperty('--sidebar-accent', `${primaryColor}15`); // 15% opacity for accent bg
    document.documentElement.style.setProperty('--sidebar-primary', primaryColor);
  };

  const updateThemeColors = (primary: string, secondary: string) => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
    localStorage.setItem('primaryColor', primary);
    localStorage.setItem('secondaryColor', secondary);
  };

  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    localStorage.setItem('darkMode', enabled.toString());
  };

  const setFontSize = (size: string) => {
    setFontSizeState(size);
    localStorage.setItem('fontSize', size);
  };

  // Apply theme settings whenever they change
  useEffect(() => {
    applyThemeColors();
  }, [primaryColor, secondaryColor, darkMode, fontSize]);

  // Apply theme settings on initial load
  useEffect(() => {
    applyThemeColors();
    
    // Listen for storage events to sync settings across tabs
    const handleStorageChange = () => {
      const storedPrimaryColor = localStorage.getItem('primaryColor');
      const storedSecondaryColor = localStorage.getItem('secondaryColor');
      const storedDarkMode = localStorage.getItem('darkMode') === 'true';
      const storedFontSize = localStorage.getItem('fontSize');
      
      if (storedPrimaryColor && storedPrimaryColor !== primaryColor) {
        setPrimaryColor(storedPrimaryColor);
      }
      
      if (storedSecondaryColor && storedSecondaryColor !== secondaryColor) {
        setSecondaryColor(storedSecondaryColor);
      }
      
      if (storedDarkMode !== darkMode) {
        setDarkMode(storedDarkMode);
      }
      
      if (storedFontSize && storedFontSize !== fontSize) {
        setFontSizeState(storedFontSize);
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <ThemeContext.Provider 
      value={{ 
        primaryColor, 
        secondaryColor, 
        darkMode, 
        fontSize, 
        applyThemeColors, 
        updateThemeColors, 
        toggleDarkMode, 
        setFontSize 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
