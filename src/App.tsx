
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
import EmployeeManagement from "./pages/personnel/EmployeeManagement";
import TimeTracking from "./pages/personnel/TimeTracking";
import Payslips from "./pages/personnel/Payslips";
import Hiring from "./pages/personnel/Hiring";
import HRProcesses from "./pages/personnel/HRProcesses";
import Overview from "./pages/accounting/Overview";
import AccountingDashboard from "./pages/accounting/AccountingDashboard";
import Entries from "./pages/accounting/Entries";
import Fiscal from "./pages/accounting/Fiscal";
import Taxes from "./pages/accounting/Taxes";
import Invoices from "./pages/accounting/Invoices";
import Reports from "./pages/accounting/Reports";
import MEI from "./pages/accounting/MEI";
import FinancialStatements from "./pages/accounting/FinancialStatements";
import CustomProcesses from "./pages/dev-admin/CustomProcesses";
import AccessLevels from "./pages/dev-admin/AccessLevels";
import Companies from "./pages/dev-admin/Companies";
import PlansManagement from "./pages/dev-admin/Plans";
import ReportsManagement from "./pages/dev-admin/Reports";
import SupportManagement from "./pages/dev-admin/Support";
import GenericSegmentPage from "./pages/segment/GenericSegmentPage";
import OnlineSales from "./pages/segment/ecommerce/OnlineSales";
import Products from "./pages/segment/ecommerce/Products";
import Checkout from "./pages/segment/ecommerce/Checkout";

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
      <SubscriptionProvider>
        <SegmentProvider>
          <SupabaseProvider>
            <HelmetProvider>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/auth" element={
                      isAuthenticated ? <Navigate to="/" replace /> : <Auth />
                    } />
                    
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
                    <Route path="/calendar" element={
                      <ProtectedRoute>
                        <Calendar />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/benchmarking" element={
                      <ProtectedRoute>
                        <Benchmarking />
                      </ProtectedRoute>
                    } />
                    <Route path="/simulator" element={
                      <ProtectedRoute>
                        <Simulator />
                      </ProtectedRoute>
                    } />
                    <Route path="/inspiration" element={
                      <ProtectedRoute>
                        <Inspiration />
                      </ProtectedRoute>
                    } />
                    <Route path="/esg" element={
                      <ProtectedRoute>
                        <ESGIndicators />
                      </ProtectedRoute>
                    } />
                    
                    {/* Segment-Specific Routes */}
                    <Route path="/segment" element={
                      <ProtectedRoute>
                        <GenericSegmentPage />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/segment/:pageId" element={
                      <ProtectedRoute>
                        <GenericSegmentPage />
                      </ProtectedRoute>
                    } />
                    
                    {/* Implementações específicas - E-commerce */}
                    <Route path="/segment/ecommerce/online-sales" element={
                      <ProtectedRoute>
                        <OnlineSales />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/segment/ecommerce/products" element={
                      <ProtectedRoute>
                        <Products />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/segment/ecommerce/checkout" element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } />
                    
                    {/* Rotas de Departamento Pessoal */}
                    <Route path="/personnel" element={
                      <ProtectedRoute>
                        <EmployeeManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/personnel/employees" element={
                      <ProtectedRoute>
                        <EmployeeManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/personnel/time-tracking" element={
                      <ProtectedRoute>
                        <TimeTracking />
                      </ProtectedRoute>
                    } />
                    <Route path="/personnel/payslips" element={
                      <ProtectedRoute>
                        <Payslips />
                      </ProtectedRoute>
                    } />
                    <Route path="/personnel/hiring" element={
                      <ProtectedRoute>
                        <Hiring />
                      </ProtectedRoute>
                    } />
                    <Route path="/personnel/processes" element={
                      <ProtectedRoute>
                        <HRProcesses />
                      </ProtectedRoute>
                    } />
                    
                    {/* Rotas de Contábil/Fiscal */}
                    <Route path="/accounting" element={
                      <ProtectedRoute>
                        <AccountingDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/accounting/overview" element={
                      <ProtectedRoute>
                        <Overview />
                      </ProtectedRoute>
                    } />
                    <Route path="/accounting/dashboard" element={
                      <ProtectedRoute>
                        <AccountingDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/accounting/entries" element={
                      <ProtectedRoute>
                        <Entries />
                      </ProtectedRoute>
                    } />
                    <Route path="/accounting/fiscal" element={
                      <ProtectedRoute>
                        <Fiscal />
                      </ProtectedRoute>
                    } />
                    <Route path="/accounting/taxes" element={
                      <ProtectedRoute>
                        <Taxes />
                      </ProtectedRoute>
                    } />
                    <Route path="/accounting/invoices" element={
                      <ProtectedRoute>
                        <Invoices />
                      </ProtectedRoute>
                    } />
                    <Route path="/accounting/reports" element={
                      <ProtectedRoute>
                        <Reports />
                      </ProtectedRoute>
                    } />
                    <Route path="/accounting/mei" element={
                      <ProtectedRoute>
                        <MEI />
                      </ProtectedRoute>
                    } />
                    <Route path="/accounting/financial-statements" element={
                      <ProtectedRoute>
                        <FinancialStatements />
                      </ProtectedRoute>
                    } />
                    
                    {/* Rotas de Dev Admin */}
                    <Route path="/dev-admin/custom-processes" element={
                      <ProtectedRoute>
                        <CustomProcesses />
                      </ProtectedRoute>
                    } />
                    <Route path="/dev-admin/access-levels" element={
                      <ProtectedRoute>
                        <AccessLevels />
                      </ProtectedRoute>
                    } />
                    <Route path="/dev-admin/companies" element={
                      <ProtectedRoute>
                        <Companies />
                      </ProtectedRoute>
                    } />
                    <Route path="/dev-admin/reports" element={
                      <ProtectedRoute>
                        <ReportsManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/dev-admin/plans" element={
                      <ProtectedRoute>
                        <PlansManagement />
                      </ProtectedRoute>
                    } />
                    <Route path="/dev-admin/support" element={
                      <ProtectedRoute>
                        <SupportManagement />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </BrowserRouter>
              </TooltipProvider>
            </HelmetProvider>
          </SupabaseProvider>
        </SegmentProvider>
      </SubscriptionProvider>
    </QueryClientProvider>
  );
};

export default App;
