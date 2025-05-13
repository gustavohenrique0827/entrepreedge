
import React, { ReactNode } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import { useSegment } from '@/contexts/SegmentContext';

interface SegmentPageLayoutProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function SegmentPageLayout({ 
  title, 
  description, 
  children,
  action
}: SegmentPageLayoutProps) {
  const { segmentName } = useSegment();
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <div className="flex-1 overflow-auto ml-[240px] pt-16 md:pt-0">
        <PageContainer>
          <PageHeader 
            title={title} 
            description={description || `Gestão de ${title} para o segmento de ${segmentName}`}
            action={action}
          />
          <div className="mt-6">
            {children}
          </div>
        </PageContainer>
      </div>
    </div>
  );
}
