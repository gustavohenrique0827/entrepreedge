
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

// Segment independent pages
import Auth from '@/pages/Auth';
import Index from '@/pages/Index';
import NotFound from '@/pages/NotFound';
import Onboarding from '@/pages/Onboarding';

// Common pages
import Dashboard from '@/pages/Dashboard';
import Finances from '@/pages/Finances';
import Goals from '@/pages/Goals';
import Learn from '@/pages/Learn';
import Settings from '@/pages/Settings';
import Profile from '@/pages/Profile';
import Calendar from '@/pages/Calendar';

// Aprendizado (Learning) pages
const TechnicalTraining = React.lazy(() => import('@/pages/learn/TechnicalTraining'));

// Personnel Department pages
const Employees = React.lazy(() => import('@/pages/personnel/Employees'));
const TimeTracking = React.lazy(() => import('@/pages/personnel/TimeTracking'));
const Payslips = React.lazy(() => import('@/pages/personnel/Payslips'));

// Accounting/Fiscal pages
const BookkeepingAndTaxes = React.lazy(() => import('@/pages/accounting/BookkeepingAndTaxes'));

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
    <>
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
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Learning Routes */}
        <Route path="/learn/technical" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <TechnicalTraining />
          </React.Suspense>
        } />
        
        {/* Personnel Department Routes */}
        <Route path="/personnel/employees" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Employees />
          </React.Suspense>
        } />
        <Route path="/personnel/time-tracking" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <TimeTracking />
          </React.Suspense>
        } />
        <Route path="/personnel/payslips" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Payslips />
          </React.Suspense>
        } />
        
        {/* Accounting/Fiscal Routes */}
        <Route path="/accounting/entries" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <BookkeepingAndTaxes />
          </React.Suspense>
        } />
        
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
    </>
  );
}

export default App;
