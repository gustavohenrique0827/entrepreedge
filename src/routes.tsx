
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Importações das páginas principais
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Finances from './pages/Finances';
import Goals from './pages/Goals';
import Learn from './pages/Learn';
import CourseDetail from './pages/CourseDetail';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Help from './pages/Help';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import Calendar from './pages/Calendar';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';

// Componente para fallback das páginas de segmento não implementadas
import GenericSegmentPage from './pages/segment/GenericSegmentPage';

// Importações de outras páginas existentes
import Benchmarking from './pages/Benchmarking';
import Simulator from './pages/Simulator';
import Inspiration from './pages/Inspiration';
import ESGIndicators from './pages/ESGIndicators';

// RH e Contabilidade
import EmployeeManagement from './pages/personnel/EmployeeManagement';
import TimeTracking from './pages/personnel/TimeTracking';
import Payslips from './pages/personnel/Payslips';
import Hiring from './pages/personnel/Hiring';
import HRProcesses from './pages/personnel/HRProcesses';
import Overview from './pages/accounting/Overview';
import AccountingDashboard from './pages/accounting/AccountingDashboard';
import Entries from './pages/accounting/Entries';
import Fiscal from './pages/accounting/Fiscal';
import Taxes from './pages/accounting/Taxes';
import Invoices from './pages/accounting/Invoices';
import Reports from './pages/accounting/Reports';
import MEI from './pages/accounting/MEI';
import FinancialStatements from './pages/accounting/FinancialStatements';

// Dev/Admin
import CustomProcesses from './pages/dev-admin/CustomProcesses';
import AccessLevels from './pages/dev-admin/AccessLevels';
import Companies from './pages/dev-admin/Companies';
import Plans from './pages/dev-admin/Plans';
import ReportsAdmin from './pages/dev-admin/Reports';
import Support from './pages/dev-admin/Support';

// Definindo os tipos para os componentes que ainda não foram completamente implementados
// Isso resolve o erro de importação enquanto desenvolvemos as páginas específicas
type SegmentPageComponent = React.FC;

// Manufacturing (Indústria)
const Inventory: SegmentPageComponent = GenericSegmentPage;
const ProductionOrders: SegmentPageComponent = GenericSegmentPage;
const Supplies: SegmentPageComponent = GenericSegmentPage;

// Education (Educação)
const Students: SegmentPageComponent = GenericSegmentPage;
const Courses: SegmentPageComponent = GenericSegmentPage;

// Health (Saúde)
const Patients: SegmentPageComponent = GenericSegmentPage;
const Appointments: SegmentPageComponent = GenericSegmentPage;

// Legal (Jurídico)
const CaseManagement: SegmentPageComponent = GenericSegmentPage;
const LegalDocuments: SegmentPageComponent = GenericSegmentPage;

// E-commerce
const Products: SegmentPageComponent = GenericSegmentPage;
const Checkout: SegmentPageComponent = GenericSegmentPage;

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

  return (
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
      
      {/* Rotas específicas de Segmentos */}
      {/* Manufacturing (Indústria) */}
      <Route path="/segment/inventory" element={
        <ProtectedRoute>
          <Inventory />
        </ProtectedRoute>
      } />
      <Route path="/segment/production-orders" element={
        <ProtectedRoute>
          <ProductionOrders />
        </ProtectedRoute>
      } />
      <Route path="/segment/supplies" element={
        <ProtectedRoute>
          <Supplies />
        </ProtectedRoute>
      } />
      <Route path="/segment/equipment" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/logistics" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/production-reports" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      
      {/* Education (Educação) */}
      <Route path="/segment/students" element={
        <ProtectedRoute>
          <Students />
        </ProtectedRoute>
      } />
      <Route path="/segment/courses" element={
        <ProtectedRoute>
          <Courses />
        </ProtectedRoute>
      } />
      <Route path="/segment/teachers" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/grades" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/certificates" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/school-calendar" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      
      {/* Legal (Jurídico) */}
      <Route path="/segment/cases" element={
        <ProtectedRoute>
          <CaseManagement />
        </ProtectedRoute>
      } />
      <Route path="/segment/legal-documents" element={
        <ProtectedRoute>
          <LegalDocuments />
        </ProtectedRoute>
      } />
      <Route path="/segment/hearings" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/legal-clients" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/legal-calendar" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/lawyer-reports" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      
      {/* Technology (Tecnologia) */}
      <Route path="/segment/projects" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/support-tickets" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/testing" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/knowledge" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/tech-config" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/dev-metrics" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      
      {/* Services (Serviços) */}
      <Route path="/segment/service-orders" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/service-appointments" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/sla" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/customer-support" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/proposals" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/field-team" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      
      {/* Fashion (Moda) */}
      <Route path="/segment/collections" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/fashion-inventory" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/fashion-sales" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/product-images" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/returns" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/fashion-reports" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      
      {/* Health (Saúde) */}
      <Route path="/segment/patients" element={
        <ProtectedRoute>
          <Patients />
        </ProtectedRoute>
      } />
      <Route path="/segment/appointments" element={
        <ProtectedRoute>
          <Appointments />
        </ProtectedRoute>
      } />
      <Route path="/segment/hospital" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/medications" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/health-billing" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/medical-records" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      
      {/* E-commerce */}
      <Route path="/segment/products" element={
        <ProtectedRoute>
          <Products />
        </ProtectedRoute>
      } />
      <Route path="/segment/checkout" element={
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      } />
      <Route path="/segment/online-sales" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/payments" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/ecommerce-logistics" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/marketing" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      
      {/* Agro */}
      <Route path="/segment/crops" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/farm-supplies" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/productivity" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/farm-calendar" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/farm-iot" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/farm-sales" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      
      {/* Generic segment */}
      <Route path="/segment/clients-suppliers" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/invoices" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/financial" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      <Route path="/segment/:pageId" element={
        <ProtectedRoute>
          <GenericSegmentPage />
        </ProtectedRoute>
      } />
      
      {/* Outras rotas pré-existentes */}
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
      
      {/* Rotas de RH */}
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
      
      {/* Rotas Contábeis */}
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
      
      {/* Rotas de Administração */}
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
      <Route path="/dev-admin/plans" element={
        <ProtectedRoute>
          <Plans />
        </ProtectedRoute>
      } />
      <Route path="/dev-admin/reports" element={
        <ProtectedRoute>
          <ReportsAdmin />
        </ProtectedRoute>
      } />
      <Route path="/dev-admin/support" element={
        <ProtectedRoute>
          <Support />
        </ProtectedRoute>
      } />
      
      {/* 404 Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
