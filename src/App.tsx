
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { SegmentProvider } from '@/contexts/SegmentContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { SubscriptionProvider } from '@/contexts/SubscriptionContext';
import { Toaster } from '@/components/ui/toaster';
import { HelmetProvider } from 'react-helmet-async';

// Segment independent pages
import Auth from '@/pages/Auth';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import SegmentTestPage from '@/pages/SegmentTestPage';
import Onboarding from '@/pages/Onboarding';

// Common pages
import Dashboard from '@/pages/Dashboard';
import Finances from '@/pages/Finances';
import Goals from '@/pages/Goals';
import Learn from '@/pages/Learn';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import Calendar from '@/pages/Calendar';

// Lazy loaded segment specific pages
const EcommerceProducts = React.lazy(() => import('@/pages/segments/ecommerce/Products'));
const EcommerceSales = React.lazy(() => import('@/pages/segments/ecommerce/Sales'));
const EcommerceCustomers = React.lazy(() => import('@/pages/segments/ecommerce/Customers'));

const TechProjects = React.lazy(() => import('@/pages/segments/tech/Projects'));
const TechSupport = React.lazy(() => import('@/pages/segments/tech/Support'));
const TechTeam = React.lazy(() => import('@/pages/segments/tech/Team'));

const ManufacturingProduction = React.lazy(() => import('@/pages/segments/manufacturing/Production'));
const ManufacturingInventory = React.lazy(() => import('@/pages/segments/manufacturing/Inventory'));
const ManufacturingLogistics = React.lazy(() => import('@/pages/segments/manufacturing/Logistics'));

const LegalCases = React.lazy(() => import('@/pages/segments/legal/Cases'));
const LegalClients = React.lazy(() => import('@/pages/segments/legal/Clients'));
const LegalDocuments = React.lazy(() => import('@/pages/segments/legal/Documents'));

function App() {
  const segment = localStorage.getItem('segment') || 'generic';
  
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="light">
        <SegmentProvider>
          <AuthProvider>
            <SubscriptionProvider>
              <Routes>
                {/* Common Routes */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/finances" element={<Finances />} />
                <Route path="/goals" element={<Goals />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/segment-test" element={<SegmentTestPage />} />
                <Route path="/onboarding" element={<Onboarding />} />
                
                {/* Segment-specific Routes */}
                {/* E-commerce */}
                <Route path="/products" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'ecommerce' ? <EcommerceProducts /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                <Route path="/sales" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'ecommerce' ? <EcommerceSales /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                <Route path="/customers" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'ecommerce' ? <EcommerceCustomers /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                
                {/* Tech */}
                <Route path="/projects" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'tech' ? <TechProjects /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                <Route path="/support" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'tech' ? <TechSupport /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                <Route path="/team" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'tech' ? <TechTeam /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                
                {/* Manufacturing */}
                <Route path="/production" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'manufacturing' ? <ManufacturingProduction /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                <Route path="/inventory" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'manufacturing' ? <ManufacturingInventory /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                <Route path="/logistics" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'manufacturing' ? <ManufacturingLogistics /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                
                {/* Legal */}
                <Route path="/cases" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'legal' ? <LegalCases /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                <Route path="/clients" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'legal' ? <LegalClients /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                <Route path="/documents" element={
                  <React.Suspense fallback={<div>Loading...</div>}>
                    {segment === 'legal' ? <LegalDocuments /> : <Navigate to="/dashboard" />}
                  </React.Suspense>
                } />
                
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Toaster />
            </SubscriptionProvider>
          </AuthProvider>
        </SegmentProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
