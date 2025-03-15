
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import LearnSection from '@/components/LearnSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen } from 'lucide-react';

const Learn = () => {
  const businessType = localStorage.getItem('businessType') || '';
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Aprendizado</h1>
            <p className="text-sm text-muted-foreground">
              Cursos e materiais para o seu desenvolvimento
            </p>
          </div>
          
          <Card className="glass">
            <CardHeader className="pb-2">
              <CardTitle className="text-base flex items-center gap-1">
                <BookOpen size={16} /> 
                Cursos Recomendados
              </CardTitle>
              <CardDescription className="text-xs">
                {businessType ? `Baseados no seu segmento: ${businessType}` : 'Conteúdo personalizado para o seu negócio'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LearnSection />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Learn;
