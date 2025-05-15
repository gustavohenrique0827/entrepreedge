
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
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('fenix_primaryColor') || '#8B5CF6');
  const [secondaryColor, setSecondaryColor] = useState(localStorage.getItem('fenix_secondaryColor') || '#D946EF');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('fenix_darkMode') === 'true');
  const [fontSize, setFontSizeState] = useState(localStorage.getItem('fenix_fontSize') || 'medium');

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
    try {
      // Apply to CSS variables
      document.documentElement.style.setProperty('--primary-color', primaryColor);
      document.documentElement.style.setProperty('--secondary-color', secondaryColor);
      
      // Apply dark mode
      if (darkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Apply font size safely
      document.documentElement.setAttribute('data-font-size', fontSize);
      
      // Safely remove any previous font size classes
      if (document.documentElement.classList.contains('text-sm')) {
        document.documentElement.classList.remove('text-sm');
      }
      if (document.documentElement.classList.contains('text-base')) {
        document.documentElement.classList.remove('text-base');
      }
      if (document.documentElement.classList.contains('text-lg')) {
        document.documentElement.classList.remove('text-lg');
      }
      
      // Add the appropriate font size class
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
      document.documentElement.style.setProperty('--sidebar-accent', `${primaryColor}15`);
      document.documentElement.style.setProperty('--sidebar-primary', primaryColor);
    } catch (error) {
      console.error("Erro ao aplicar cores do tema:", error);
    }
  };

  const updateThemeColors = (primary: string, secondary: string) => {
    setPrimaryColor(primary);
    setSecondaryColor(secondary);
    localStorage.setItem('fenix_primaryColor', primary);
    localStorage.setItem('fenix_secondaryColor', secondary);
  };

  const toggleDarkMode = (enabled: boolean) => {
    setDarkMode(enabled);
    localStorage.setItem('fenix_darkMode', enabled.toString());
  };

  const setFontSize = (size: string) => {
    setFontSizeState(size);
    localStorage.setItem('fenix_fontSize', size);
  };

  // Make theme colors globally accessible
  useEffect(() => {
    window.fenixColors = {
      primaryColor,
      secondaryColor,
      applyColors: applyThemeColors
    };
  }, [primaryColor, secondaryColor]);

  // Apply theme settings whenever they change
  useEffect(() => {
    try {
      applyThemeColors();
    } catch (error) {
      console.error("Erro ao aplicar mudanças no tema:", error);
    }
  }, [primaryColor, secondaryColor, darkMode, fontSize]);

  // Apply theme settings on initial load and setup event listeners
  useEffect(() => {
    try {
      applyThemeColors();

      // Listen for storage events to sync settings across tabs
      const handleStorageChange = () => {
        const storedPrimaryColor = localStorage.getItem('fenix_primaryColor');
        const storedSecondaryColor = localStorage.getItem('fenix_secondaryColor');
        const storedDarkMode = localStorage.getItem('fenix_darkMode') === 'true';
        const storedFontSize = localStorage.getItem('fenix_fontSize');
        
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
      
      // Additional event listener for page reload/refresh
      window.addEventListener('load', applyThemeColors);

      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('load', applyThemeColors);
      };
    } catch (error) {
      console.error("Erro na inicialização do tema:", error);
    }
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
