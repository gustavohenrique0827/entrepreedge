
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import FinanceTracker from '@/components/FinanceTracker';
import GoalTracker from '@/components/GoalTracker';
import LearnSection from '@/components/LearnSection';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, BarChart2, Target, BookOpen, CheckCircle, BookOpenCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

const Index = () => {
  // Get company data from localStorage
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  const businessType = localStorage.getItem('businessType') || '';
  const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
  
  // Apply theme colors on component mount
  useEffect(() => {
    const primaryColor = localStorage.getItem('primaryColor') || '#8B5CF6';
    const secondaryColor = localStorage.getItem('secondaryColor') || '#D946EF';
    
    // Apply theme colors
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
    
    // Convert to HSL for Tailwind variables
    const hexToHSL = (hex) => {
      // Remove the # from the beginning
      hex = hex.replace(/^#/, '');

      // Parse the hex values
      let r = parseInt(hex.substring(0, 2), 16) / 255;
      let g = parseInt(hex.substring(2, 4), 16) / 255;
      let b = parseInt(hex.substring(4, 6), 16) / 255;

      // Find max and min values to calculate the lightness
      let max = Math.max(r, g, b);
      let min = Math.min(r, g, b);
      let h = 0, s = 0, l = (max + min) / 2;

      // Calculate hue and saturation
      if (max !== min) {
        let d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
        else if (max === g) h = (b - r) / d + 2;
        else if (max === b) h = (r - g) / d + 4;
        h *= 60;
      }

      return { h: Math.round(h), s: Math.round(s * 100), l: Math.round(l * 100) };
    };
    
    const primaryHSL = hexToHSL(primaryColor);
    const secondaryHSL = hexToHSL(secondaryColor);
    
    document.documentElement.style.setProperty('--primary', `${primaryHSL.h} ${primaryHSL.s}% ${primaryHSL.l}%`);
    document.documentElement.style.setProperty('--secondary', `${secondaryHSL.h} ${secondaryHSL.s}% ${secondaryHSL.l}%`);
    
    // Apply sidebar accent color
    document.documentElement.style.setProperty('--sidebar-accent', `${primaryColor}15`); // 15% opacity for accent bg
    document.documentElement.style.setProperty('--sidebar-primary', primaryColor);
    
    // Update document title
    document.title = `${companyName} - Painel Principal`;
  }, []);
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Bem-vindo(a), {companyName}</h1>
            <p className="text-sm text-muted-foreground">
              {businessType && `${businessType} • `}
              Resumo das suas atividades
            </p>
          </div>
          
          {!onboardingCompleted ? (
            <Alert className="mb-6 border-amber-500/20 bg-amber-500/5">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <AlertTitle className="text-sm font-medium">Complete seu cadastro</AlertTitle>
              <AlertDescription className="text-xs">
                Para aproveitar todas as funcionalidades, complete seu cadastro.
                <Link to="/onboarding">
                  <Button variant="link" className="h-auto p-0 ml-2 text-xs text-amber-500">
                    Completar agora
                  </Button>
                </Link>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert className="mb-6 border-primary/20 bg-primary/5">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertTitle className="text-sm font-medium">Resumo do seu negócio</AlertTitle>
              <AlertDescription className="text-xs">
                Veja abaixo um panorama geral das suas informações mais importantes.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Link to="/dashboard" className="block">
              <Card className="glass h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
                    <BarChart2 className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Dashboard</h3>
                  <p className="text-sm text-muted-foreground mb-auto">Visualize seus indicadores financeiros e metas de negócio.</p>
                  <Button variant="link" className="p-0 h-auto justify-start mt-4 text-primary text-sm">Ver dashboard</Button>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/goals" className="block">
              <Card className="glass h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Metas</h3>
                  <p className="text-sm text-muted-foreground mb-auto">Acompanhe suas metas e objetivos estratégicos.</p>
                  <Button variant="link" className="p-0 h-auto justify-start mt-4 text-primary text-sm">Ver metas</Button>
                </CardContent>
              </Card>
            </Link>
            
            <Link to="/learn" className="block">
              <Card className="glass h-full hover:shadow-md transition-all">
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="rounded-full bg-primary/10 w-10 h-10 flex items-center justify-center mb-4">
                    <BookOpen className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-1">Aprendizado</h3>
                  <p className="text-sm text-muted-foreground mb-auto">Acesse cursos personalizados para o seu negócio.</p>
                  <Button variant="link" className="p-0 h-auto justify-start mt-4 text-primary text-sm">Ver cursos</Button>
                </CardContent>
              </Card>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <CheckCircle size={16} /> 
                  Suas atividades recentes
                </CardTitle>
                <CardDescription className="text-xs">Ações realizadas nos últimos dias</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="bg-background/50 p-3 rounded-md">
                    <p className="text-sm font-medium">Meta de vendas atualizada</p>
                    <p className="text-xs text-muted-foreground">Ontem às 14:30</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-md">
                    <p className="text-sm font-medium">Curso "Gestão financeira" iniciado</p>
                    <p className="text-xs text-muted-foreground">Há 2 dias</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-md">
                    <p className="text-sm font-medium">Perfil de negócio atualizado</p>
                    <p className="text-xs text-muted-foreground">Há 3 dias</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <BookOpenCheck size={16} /> 
                  Aprendizado recomendado
                </CardTitle>
                <CardDescription className="text-xs">
                  Baseado no seu segmento: {businessType || "Seu negócio"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="bg-background/50 p-3 rounded-md">
                    <p className="text-sm font-medium">Fundamentos de gestão financeira</p>
                    <p className="text-xs text-muted-foreground">8 módulos • 2h 30min</p>
                  </div>
                  <div className="bg-background/50 p-3 rounded-md">
                    <p className="text-sm font-medium">Marketing digital para empreendedores</p>
                    <p className="text-xs text-muted-foreground">6 módulos • 1h 45min</p>
                  </div>
                  <Link to="/learn" className="block text-center">
                    <Button variant="outline" size="sm" className="w-full mt-2">
                      Ver todos os cursos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
