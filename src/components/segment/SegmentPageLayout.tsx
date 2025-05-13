
import React from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Sidebar';
import { useSegment } from '@/contexts/SegmentContext';
import { PageContainer } from '../PageContainer';
import { useToast } from "@/hooks/use-toast";

interface SegmentPageLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export const SegmentPageLayout: React.FC<SegmentPageLayoutProps> = ({
  children,
  title,
  description
}) => {
  const { segmentName } = useSegment();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <div className="bg-background">
          <PageContainer>
            <div className="py-4">
              <h1 className="text-2xl font-bold text-primary">{title}</h1>
              {description && <p className="text-muted-foreground mt-1">{description}</p>}
              <div className="mt-2 text-sm text-muted-foreground">
                Segmento: <span className="font-medium text-primary">{segmentName}</span>
              </div>
            </div>
            <div className="pb-8">
              {children}
            </div>
          </PageContainer>
        </div>
      </div>
    </div>
  );
};
