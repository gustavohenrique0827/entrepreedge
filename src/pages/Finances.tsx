
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import FinanceTracker from '@/components/FinanceTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2 } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';

const Finances = () => {
  const { hasAccess } = useSubscription();

  // Financial module is available in all plans
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Finanças</h1>
            <p className="text-sm text-muted-foreground">
              Acompanhamento financeiro da sua empresa
            </p>
          </div>
          
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-1">
                <BarChart2 size={16} /> 
                Finanças
              </CardTitle>
              <CardDescription className="text-xs">Histórico financeiro e projeções</CardDescription>
            </CardHeader>
            <CardContent>
              <FinanceTracker />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Finances;
