import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import CourseDetail from "./pages/CourseDetail";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import Onboarding from "./pages/Onboarding";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Finances from "./pages/Finances";
import Goals from "./pages/Goals";
import Learn from "./pages/Learn";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Help from "./pages/Help";
import Benchmarking from "./pages/Benchmarking";
import Simulator from "./pages/Simulator";
import Inspiration from "./pages/Inspiration";
import ESGIndicators from "./pages/ESGIndicators";
import Calendar from "./pages/Calendar";
import { SubscriptionProvider } from "./contexts/SubscriptionContext";
import { SegmentProvider } from "./contexts/SegmentContext";
import { SupabaseProvider } from "./contexts/SupabaseContext";

// Import segment-specific modules
import FinancialDashboard from "./modules/financial/FinancialDashboard";
import VendaDashboard from "./modules/vendas/VendaDashboard";
import SaudeDashboard from "./modules/saude/SaudeDashboard";
import EducacaoDashboard from "./modules/educacao/EducacaoDashboard";
import EcommerceDashboard from "./modules/ecommerce/EcommerceDashboard";
import IndustrialDashboard from "./modules/industrial/IndustrialDashboard";
import AgroDashboard from "./modules/agro/AgroDashboard";
import FashionDashboard from "./modules/fashion/FashionDashboard";
import ServicosDashboard from "./modules/servicos/ServicosDashboard";
import TechDashboard from "./modules/tech/TechDashboard";
import LegalDashboard from "./modules/legal/LegalDashboard";
import ManufacturingDashboard from "./modules/manufacturing/ManufacturingDashboard";

const queryClient = new QueryClient();

const initializeSettings = () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
  
  const fontSize = localStorage.getItem('fontSize') || 'medium';
  document.documentElement.setAttribute('data-font-size', fontSize);
  
  const language = localStorage.getItem('language') || 'pt-BR';
  document.documentElement.lang = language.split('-')[0];
  
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  document.title = `${companyName} - Sistema`;
  
  const currency = localStorage.getItem('currency') || 'BRL';
  if (currency === 'BRL') {
    window.currencyFormatter = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  } else if (currency === 'USD') {
    window.currencyFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  } else if (currency === 'EUR') {
    window.currencyFormatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });
  }
  
  const primaryColor = localStorage.getItem('primaryColor') || '#8B5CF6';
  const secondaryColor = localStorage.getItem('secondaryColor') || '#D946EF';
  document.documentElement.style.setProperty('--primary-color', primaryColor);
  document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  
  const hexToHSL = (hex: string) => {
    hex = hex.replace(/^#/, '');
    let r = parseInt(hex.substring(0, 2), 16) / 255;
    let g = parseInt(hex.substring(2, 4), 16) / 255;
    let b = parseInt(hex.substring(4, 6), 16) / 255;
    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
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
  
  const primaryHSL = hexToHSL(primaryColor);
  const secondaryHSL = hexToHSL(secondaryColor);
  
  document.documentElement.style.setProperty('--primary', `${primaryHSL.h} ${primaryHSL.s}% ${primaryHSL.l}%`);
  document.documentElement.style.setProperty('--secondary', `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l}%`);
  
  document.documentElement.style.setProperty('--sidebar-accent', `${primaryColor}15`);
  document.documentElement.style.setProperty('--sidebar-primary', primaryColor);
};

initializeSettings();

const App = () => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  
  useEffect(() => {
    initializeSettings();
    
    const handleStorageChange = () => {
      initializeSettings();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SupabaseProvider>
        <SubscriptionProvider>
          <SegmentProvider>
            <HelmetProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/auth" element={
                      isAuthenticated ? <Navigate to="/" replace /> : <Auth />
                    } />
                    
                    <Route path="/onboarding" element={
                      isAuthenticated ? <Onboarding /> : <Navigate to="/auth" replace />
                    } />
                    
                    {/* Protected routes with layout */}
                    <Route element={
                      <ProtectedRoute>
                        <Layout />
                      </ProtectedRoute>
                    }>
                      <Route path="/" element={<Index />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/finances" element={<Finances />} />
                      <Route path="/goals" element={<Goals />} />
                      <Route path="/learn" element={<Learn />} />
                      <Route path="/course/:courseId" element={<CourseDetail />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/help" element={<Help />} />
                      <Route path="/contact" element={<Contact />} />
                      <Route path="/calendar" element={<Calendar />} />
                      <Route path="/benchmarking" element={<Benchmarking />} />
                      <Route path="/simulator" element={<Simulator />} />
                      <Route path="/inspiration" element={<Inspiration />} />
                      <Route path="/esg" element={<ESGIndicators />} />
                      
                      {/* Segment-specific module routes */}
                      <Route path="/modules/financial/*" element={<FinancialDashboard />} />
                      <Route path="/modules/sales/*" element={<VendaDashboard />} />
                      <Route path="/modules/health/*" element={<SaudeDashboard />} />
                      <Route path="/modules/education/*" element={<EducacaoDashboard />} />
                      <Route path="/modules/ecommerce/*" element={<EcommerceDashboard />} />
                      <Route path="/modules/industrial/*" element={<IndustrialDashboard />} />
                      <Route path="/modules/agro/*" element={<AgroDashboard />} />
                      <Route path="/modules/fashion/*" element={<FashionDashboard />} />
                      <Route path="/modules/services/*" element={<ServicosDashboard />} />
                      <Route path="/modules/tech/*" element={<TechDashboard />} />
                      <Route path="/modules/legal/*" element={<LegalDashboard />} />
                      <Route path="/modules/manufacturing/*" element={<ManufacturingDashboard />} />
                    </Route>
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </HelmetProvider>
          </SegmentProvider>
        </SubscriptionProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
};

export default App;
