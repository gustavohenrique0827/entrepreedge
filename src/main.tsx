
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { ThemeProvider } from './contexts/ThemeContext';
import { SupabaseProvider } from './contexts/SupabaseContext';
import { Toaster } from '@/components/ui/toaster';

// Initialize the system with Fênix branding
const initializeSystem = () => {
  // Set default settings if not already set
  if (!localStorage.getItem('darkMode')) {
    localStorage.setItem('darkMode', 'false');
  }

  if (!localStorage.getItem('companyName')) {
    localStorage.setItem('companyName', 'Fênix');
  }

  if (!localStorage.getItem('primaryColor')) {
    localStorage.setItem('primaryColor', '#8250f0');
    document.documentElement.style.setProperty('--primary-color', '#8250f0');
    document.documentElement.style.setProperty('--sidebar-primary', '#8250f0');
    document.documentElement.style.setProperty('--sidebar-accent', '#8250f015');
  }
  
  // Apply dark mode if needed
  if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Set the document title
  document.title = 'Fênix - Plataforma de Gestão';
};

// Run initialization
initializeSystem();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <SupabaseProvider>
        <App />
        <Toaster />
      </SupabaseProvider>
    </ThemeProvider>
  </React.StrictMode>
);
