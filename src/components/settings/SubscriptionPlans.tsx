
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SubscriptionPlanCards from './SubscriptionPlanCards';
import SubscriptionPlanComparison from './SubscriptionPlanComparison';

const SubscriptionPlans = () => {
  const [viewType, setViewType] = useState<'cards' | 'table'>('cards');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Planos de Assinatura</span>
          <Tabs value={viewType} onValueChange={(v) => setViewType(v as 'cards' | 'table')} className="w-auto">
            <TabsList>
              <TabsTrigger value="cards">Cartões</TabsTrigger>
              <TabsTrigger value="table">Tabela</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {viewType === 'cards' ? (
          <SubscriptionPlanCards />
        ) : (
          <SubscriptionPlanComparison />
        )}
      </CardContent>
    </Card>
  );
};

export default SubscriptionPlans;
