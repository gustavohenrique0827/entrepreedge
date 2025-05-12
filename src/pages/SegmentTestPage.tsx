
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import SegmentTester from '@/components/segment/SegmentTester';
import AutoSegmentConfig from '@/components/segment/AutoSegmentConfig';

const SegmentTestPage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Teste de Segmentos" 
        description="Teste os diferentes segmentos de negócio configurados no sistema"
      />

      <div className="grid grid-cols-1 gap-6">
        <SegmentTester />
        <AutoSegmentConfig />
      </div>
    </PageContainer>
  );
};

export default SegmentTestPage;
