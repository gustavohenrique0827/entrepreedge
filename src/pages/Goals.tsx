
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import GoalTracker from '@/components/GoalTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target } from 'lucide-react';

const Goals = () => {
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Metas</h1>
            <p className="text-sm text-muted-foreground">
              Acompanhamento das metas da sua empresa
            </p>
          </div>
          
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-1">
                <Target size={16} /> 
                Metas
              </CardTitle>
              <CardDescription className="text-xs">Define e acompanhe suas metas de negócio</CardDescription>
            </CardHeader>
            <CardContent>
              <GoalTracker />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Goals;
