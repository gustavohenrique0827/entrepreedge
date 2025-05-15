
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
  setPersistentColors: () => void;
};

const defaultContext: ThemeContextType = {
  primaryColor: '#ff5722', // Fenix default orange
  secondaryColor: '#9c27b0', // Fenix default purple
  darkMode: false,
  fontSize: 'medium',
  applyThemeColors: () => {},
  updateThemeColors: () => {},
  toggleDarkMode: () => {},
  setFontSize: () => {},
  setPersistentColors: () => {},
};

const ThemeContext = createContext<ThemeContextType>(defaultContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [primaryColor, setPrimaryColor] = useState(localStorage.getItem('fenix_primaryColor') || '#ff5722');
  const [secondaryColor, setSecondaryColor] = useState(localStorage.getItem('fenix_secondaryColor') || '#9c27b0');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('fenix_darkMode') === 'true');
  const [fontSize, setFontSizeState] = useState(localStorage.getItem('fenix_fontSize') || 'medium');
  const [isInitialized, setIsInitialized] = useState(false);

  // Convert hex to HSL for Tailwind variables
  const hexToHSL = (hex: string) => {
    try {
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
    } catch (error) {
      console.error("Erro ao converter hex para HSL:", error);
      return { h: 0, s: 0, l: 0 };
    }
  };
  
  const setPersistentColors = () => {
    localStorage.setItem('fenix_primaryColor', primaryColor);
    localStorage.setItem('fenix_secondaryColor', secondaryColor);
    
    // Apply CSS custom properties that persist across page loads
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Apply as Tailwind CSS variables
    const primaryHSL = hexToHSL(primaryColor);
    const secondaryHSL = hexToHSL(secondaryColor);
      
    document.documentElement.style.setProperty('--primary', `${primaryHSL.h} ${primaryHSL.s}% ${primaryHSL.l}%`);
    document.documentElement.style.setProperty('--secondary', `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l}%`);
    document.documentElement.style.setProperty('--sidebar-accent', `${primaryColor}15`);
    document.documentElement.style.setProperty('--sidebar-primary', primaryColor);
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
      setPersistentColors();
      
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

  // Add global color styles at page load
  useEffect(() => {
    // Only run once to avoid conflicts with other effects
    if (!isInitialized) {
      const style = document.createElement('style');
      style.id = 'fenix-dynamic-styles';
      style.innerHTML = `
        :root {
          --primary-color: ${primaryColor};
          --secondary-color: ${secondaryColor};
        }
        .bg-primary { background-color: var(--primary-color) !important; }
        .text-primary { color: var(--primary-color) !important; }
        .border-primary { border-color: var(--primary-color) !important; }
        .bg-secondary { background-color: var(--secondary-color) !important; }
        .text-secondary { color: var(--secondary-color) !important; }
        .border-secondary { border-color: var(--secondary-color) !important; }
        
        .hover\\:bg-primary:hover { background-color: var(--primary-color) !important; }
        .hover\\:text-primary:hover { color: var(--primary-color) !important; }
        .hover\\:border-primary:hover { border-color: var(--primary-color) !important; }
        
        button.bg-primary:hover { background-color: color-mix(in srgb, var(--primary-color) 90%, #000) !important; }
      `;
      document.head.appendChild(style);
      setIsInitialized(true);
    }
  }, [isInitialized, primaryColor, secondaryColor]);
  

  // Make theme colors globally accessible
  useEffect(() => {
    window.fenixColors = {
      primaryColor,
      secondaryColor,
      applyColors: applyThemeColors,
      setThemeColors: updateThemeColors,
      setPersistentColors: setPersistentColors
    };
    
    // Apply the colors whenever they change
    applyThemeColors();
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
      const handleStorageChange = (event: StorageEvent) => {
        if (event.key === 'fenix_primaryColor') {
          const storedPrimaryColor = localStorage.getItem('fenix_primaryColor');
          if (storedPrimaryColor && storedPrimaryColor !== primaryColor) {
            setPrimaryColor(storedPrimaryColor);
          }
        }
        
        if (event.key === 'fenix_secondaryColor') {
          const storedSecondaryColor = localStorage.getItem('fenix_secondaryColor');
          if (storedSecondaryColor && storedSecondaryColor !== secondaryColor) {
            setSecondaryColor(storedSecondaryColor);
          }
        }
        
        if (event.key === 'fenix_darkMode') {
          const storedDarkMode = localStorage.getItem('fenix_darkMode') === 'true';
          if (storedDarkMode !== darkMode) {
            setDarkMode(storedDarkMode);
          }
        }
        
        if (event.key === 'fenix_fontSize') {
          const storedFontSize = localStorage.getItem('fenix_fontSize');
          if (storedFontSize && storedFontSize !== fontSize) {
            setFontSizeState(storedFontSize);
          }
        }
      };

      window.addEventListener('storage', handleStorageChange);
      
      // Critical: add these event listeners to ensure colors get reapplied
      window.addEventListener('load', applyThemeColors);
      document.addEventListener('DOMContentLoaded', applyThemeColors);
      
      // Cleanup
      return () => {
        window.removeEventListener('storage', handleStorageChange);
        window.removeEventListener('load', applyThemeColors);
        document.removeEventListener('DOMContentLoaded', applyThemeColors);
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
        setFontSize,
        setPersistentColors
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
