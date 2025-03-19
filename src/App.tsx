
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/ProtectedRoute";
import Finances from "./pages/Finances";
import Goals from "./pages/Goals";
import Learn from "./pages/Learn";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Help from "./pages/Help";

const queryClient = new QueryClient();

// Initialize global settings
const initializeSettings = () => {
  // Apply dark mode
  if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  // Apply font size
  const fontSize = localStorage.getItem('fontSize') || 'medium';
  document.documentElement.setAttribute('data-font-size', fontSize);
  
  // Apply language
  const language = localStorage.getItem('language') || 'pt-BR';
  document.documentElement.lang = language.split('-')[0];
  
  // Apply company name to document title
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  document.title = `${companyName} - Sistema`;
  
  // Initialize global currency formatter
  const currency = localStorage.getItem('currency') || 'BRL';
  if (currency === 'BRL') {
    window.currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  } else if (currency === 'USD') {
    window.currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  } else if (currency === 'EUR') {
    window.currencyFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
  }
};

// Initialize settings right away
initializeSettings();

const App = () => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  
  // Re-apply settings when app component mounts
  useEffect(() => {
    initializeSettings();
    
    // Listen for storage changes from other tabs
    const handleStorageChange = () => {
      initializeSettings();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/auth" element={
              isAuthenticated ? <Navigate to="/" replace /> : <Auth />
            } />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <Index />
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/finances" element={
              <ProtectedRoute>
                <Finances />
              </ProtectedRoute>
            } />
            <Route path="/goals" element={
              <ProtectedRoute>
                <Goals />
              </ProtectedRoute>
            } />
            <Route path="/learn" element={
              <ProtectedRoute>
                <Learn />
              </ProtectedRoute>
            } />
            <Route path="/course/:courseId" element={
              <ProtectedRoute>
                <CourseDetail />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/settings" element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } />
            <Route path="/help" element={
              <ProtectedRoute>
                <Help />
              </ProtectedRoute>
            } />
            <Route path="/onboarding" element={
              isAuthenticated ? <Onboarding /> : <Navigate to="/auth" replace />
            } />
            <Route path="/contact" element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
