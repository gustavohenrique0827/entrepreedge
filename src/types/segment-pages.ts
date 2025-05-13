
import { FC } from 'react';

/**
 * Este arquivo define tipos para as páginas de segmento que serão implementadas futuramente.
 * Isso permite que as importações no arquivo de rotas funcionem sem erros de compilação.
 */

// Tipo básico para componentes de página de segmento
export type SegmentPageProps = {
  // Props comuns para todas as páginas de segmento podem ser adicionadas aqui
};

// Manufacturing (Indústria)
export type InventoryPageType = FC<SegmentPageProps>;
export type ProductionOrdersPageType = FC<SegmentPageProps>;
export type SuppliesPageType = FC<SegmentPageProps>;

// Education (Educação)
export type StudentsPageType = FC<SegmentPageProps>;
export type CoursesPageType = FC<SegmentPageProps>;

// Health (Saúde)
export type PatientsPageType = FC<SegmentPageProps>;
export type AppointmentsPageType = FC<SegmentPageProps>;

// Legal (Jurídico)
export type CaseManagementPageType = FC<SegmentPageProps>;
export type LegalDocumentsPageType = FC<SegmentPageProps>;

// E-commerce
export type ProductsPageType = FC<SegmentPageProps>;
export type CheckoutPageType = FC<SegmentPageProps>;
