
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { SegmentSelector } from '@/components/SegmentSelector';
import { ShoppingBag, Wallet, Stethoscope, GraduationCap, Store, Factory, Leaf, Scissors, Briefcase, Code, Scale, HardDrive } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const Index = () => {
  // Get company data from localStorage
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  const businessType = localStorage.getItem('businessType') || '';
  const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
  const { applyThemeColors } = useTheme();
  const { currentSegment, allSegments } = useSupabase();
  const { segmentName } = useSegment();
  const [showLoginTable, setShowLoginTable] = useState(false);
  
  // Apply theme colors on component mount
  useEffect(() => {
    applyThemeColors();
    
    // Update document title
    document.title = `${companyName} - Painel Principal`;
  }, []);
  
  // Check if any segments are configured
  const hasConfiguredSegments = allSegments && allSegments.length > 0;
  
  // If no segment is configured or selected, show the segment selector
  if (!currentSegment && hasConfiguredSegments) {
    return (
      <div className="min-h-screen bg-background p-6">
        <SegmentSelector />
      </div>
    );
  }
  
  // Test login credentials for each segment
  const testLogins = [
    { segment: 'generic', email: 'teste@empresa.com', senha: 'senha123', empresa: 'Empresa Genérica LTDA' },
    { segment: 'sales', email: 'vendas@empresa.com', senha: 'senha123', empresa: 'Empresa de Vendas LTDA' },
    { segment: 'financial', email: 'financeiro@empresa.com', senha: 'senha123', empresa: 'Empresa Financeira LTDA' },
    { segment: 'health', email: 'saude@empresa.com', senha: 'senha123', empresa: 'Clínica Médica LTDA' },
    { segment: 'education', email: 'educacao@empresa.com', senha: 'senha123', empresa: 'Escola ABC LTDA' },
    { segment: 'ecommerce', email: 'ecommerce@empresa.com', senha: 'senha123', empresa: 'Loja Virtual LTDA' },
    { segment: 'industrial', email: 'industrial@empresa.com', senha: 'senha123', empresa: 'Indústria XYZ LTDA' },
    { segment: 'agro', email: 'agro@empresa.com', senha: 'senha123', empresa: 'Agropecuária ABC LTDA' },
    { segment: 'fashion', email: 'moda@empresa.com', senha: 'senha123', empresa: 'Moda Fashion LTDA' },
    { segment: 'services', email: 'servicos@empresa.com', senha: 'senha123', empresa: 'Serviços Gerais LTDA' },
    { segment: 'tech', email: 'tech@empresa.com', senha: 'senha123', empresa: 'Tecnologia LTDA' },
    { segment: 'legal', email: 'juridico@empresa.com', senha: 'senha123', empresa: 'Escritório de Advocacia' },
    { segment: 'manufacturing', email: 'fabrica@empresa.com', senha: 'senha123', empresa: 'Manufatura Industrial LTDA' },
  ];
  
  // If no segments are configured, suggest configuring one
  if (!hasConfiguredSegments) {
    return (
      <div className="min-h-screen bg-background px-4 py-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-1">Sistema Multi-Segmentos</h1>
            <p className="text-sm text-muted-foreground">
              Cada segmento possui seu próprio banco de dados e funcionalidades específicas.
            </p>
          </div>
          
          <Alert className="mb-6 border-amber-500/20 bg-amber-500/5">
            <AlertTitle className="text-sm font-medium">Configuração necessária</AlertTitle>
            <AlertDescription className="text-xs">
              Para aproveitar todas as funcionalidades, configure pelo menos um segmento de negócio.
              <Link to="/settings">
                <Button variant="link" className="h-auto p-0 ml-2 text-xs text-amber-500">
                  Configurar agora
                </Button>
              </Link>
            </AlertDescription>
          </Alert>
          
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Opções de Segmento</CardTitle>
              <CardDescription>
                Escolha o segmento que melhor se adequa ao seu negócio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <Card className="p-4 flex flex-col items-center text-center">
                  <ShoppingBag className="h-8 w-8 text-orange-500 mb-2" />
                  <h3 className="font-medium">Vendas</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <Wallet className="h-8 w-8 text-blue-500 mb-2" />
                  <h3 className="font-medium">Financeiro</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <Stethoscope className="h-8 w-8 text-teal-500 mb-2" />
                  <h3 className="font-medium">Saúde</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <GraduationCap className="h-8 w-8 text-purple-500 mb-2" />
                  <h3 className="font-medium">Educação</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <Store className="h-8 w-8 text-amber-500 mb-2" />
                  <h3 className="font-medium">E-commerce</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <Factory className="h-8 w-8 text-slate-500 mb-2" />
                  <h3 className="font-medium">Industrial</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <Leaf className="h-8 w-8 text-green-500 mb-2" />
                  <h3 className="font-medium">Agronegócio</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <Scissors className="h-8 w-8 text-pink-500 mb-2" />
                  <h3 className="font-medium">Moda</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <Briefcase className="h-8 w-8 text-indigo-500 mb-2" />
                  <h3 className="font-medium">Serviços</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <Code className="h-8 w-8 text-blue-600 mb-2" />
                  <h3 className="font-medium">Tecnologia</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <Scale className="h-8 w-8 text-slate-800 mb-2" />
                  <h3 className="font-medium">Jurídico</h3>
                </Card>
                <Card className="p-4 flex flex-col items-center text-center">
                  <HardDrive className="h-8 w-8 text-gray-500 mb-2" />
                  <h3 className="font-medium">Manufatura</h3>
                </Card>
              </div>
              
              <div className="mt-6">
                <Link to="/auth">
                  <Button className="w-full">Cadastrar Empresa</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Acessos para Teste</CardTitle>
              <CardDescription>
                Utilize as credenciais abaixo para testar cada segmento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="outline" 
                onClick={() => setShowLoginTable(!showLoginTable)}
                className="mb-4"
              >
                {showLoginTable ? "Ocultar Credenciais" : "Mostrar Credenciais"}
              </Button>
              
              {showLoginTable && (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Segmento</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Senha</TableHead>
                        <TableHead>Empresa</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {testLogins.map((login) => (
                        <TableRow key={login.segment}>
                          <TableCell className="font-medium">{login.segment}</TableCell>
                          <TableCell>{login.email}</TableCell>
                          <TableCell>{login.senha}</TableCell>
                          <TableCell>{login.empresa}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
              
              <div className="mt-4 text-sm text-muted-foreground">
                Para uma experiência completa, cadastre-se com suas próprias informações ou use as credenciais acima.
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Bem-vindo(a) ao {segmentName}</h1>
        <p className="text-sm text-muted-foreground">
          {businessType && `${businessType} • `}
          Dashboard segmentado para {segmentName}
        </p>
      </div>
      
      {!onboardingCompleted ? (
        <Alert className="mb-6 border-amber-500/20 bg-amber-500/5">
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
          <AlertTitle className="text-sm font-medium">Segmento ativo: {segmentName}</AlertTitle>
          <AlertDescription className="text-xs">
            Você está vendo os dados e funcionalidades específicas para o segmento {segmentName}.
            <Link to="/settings">
              <Button variant="link" className="h-auto p-0 ml-2 text-xs">
                Alterar segmento
              </Button>
            </Link>
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Link to="/dashboard" className="block">
          <Card className="h-full hover:shadow-md transition-all">
            <CardContent className="p-4 flex flex-col h-full">
              <h3 className="font-semibold mb-1">Dashboard</h3>
              <p className="text-sm text-muted-foreground mb-auto">Visualize indicadores do segmento {segmentName}.</p>
              <Button variant="link" className="p-0 h-auto justify-start mt-4 text-primary text-sm">Ver dashboard</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to={`/modules/${currentSegment}`} className="block">
          <Card className="h-full hover:shadow-md transition-all">
            <CardContent className="p-4 flex flex-col h-full">
              <h3 className="font-semibold mb-1">Módulos de {segmentName}</h3>
              <p className="text-sm text-muted-foreground mb-auto">Acesse as funcionalidades específicas deste segmento.</p>
              <Button variant="link" className="p-0 h-auto justify-start mt-4 text-primary text-sm">Ver módulos</Button>
            </CardContent>
          </Card>
        </Link>
        
        <Link to="/settings" className="block">
          <Card className="h-full hover:shadow-md transition-all">
            <CardContent className="p-4 flex flex-col h-full">
              <h3 className="font-semibold mb-1">Configurações</h3>
              <p className="text-sm text-muted-foreground mb-auto">Gerencie seu perfil e configurações do sistema.</p>
              <Button variant="link" className="p-0 h-auto justify-start mt-4 text-primary text-sm">Configurar</Button>
            </CardContent>
          </Card>
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Acessos para Teste</CardTitle>
          <CardDescription>
            Utilize as credenciais abaixo para testar cada segmento
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            onClick={() => setShowLoginTable(!showLoginTable)}
            className="mb-4"
          >
            {showLoginTable ? "Ocultar Credenciais" : "Mostrar Credenciais"}
          </Button>
          
          {showLoginTable && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Segmento</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Senha</TableHead>
                    <TableHead>Empresa</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {testLogins.map((login) => (
                    <TableRow key={login.segment}>
                      <TableCell className="font-medium">{login.segment}</TableCell>
                      <TableCell>{login.email}</TableCell>
                      <TableCell>{login.senha}</TableCell>
                      <TableCell>{login.empresa}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          <div className="mt-4 text-sm text-muted-foreground">
            Para testar diferentes segmentos, faça logout e entre com as credenciais correspondentes.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
