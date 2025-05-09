
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Wallet, Stethoscope, GraduationCap, Store, Factory } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';
import { useSupabase } from '@/contexts/SupabaseContext';
import { useToast } from '@/hooks/use-toast';

interface SegmentOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

export function SegmentSelector() {
  const navigate = useNavigate();
  const { setCurrentSegment } = useSegment();
  const { switchSegment, isConfigured } = useSupabase();
  const { toast } = useToast();

  const segmentOptions: SegmentOption[] = [
    {
      id: 'sales',
      name: 'Vendas',
      description: 'Gestão de produtos, estoque e transações',
      icon: <ShoppingBag className="h-8 w-8" />,
      color: 'bg-orange-100 text-orange-700'
    },
    {
      id: 'financial',
      name: 'Financeiro',
      description: 'Controle de contas, transações e categorias',
      icon: <Wallet className="h-8 w-8" />,
      color: 'bg-blue-100 text-blue-700'
    },
    {
      id: 'health',
      name: 'Saúde',
      description: 'Gestão de pacientes, consultas e exames',
      icon: <Stethoscope className="h-8 w-8" />,
      color: 'bg-teal-100 text-teal-700'
    },
    {
      id: 'education',
      name: 'Educação',
      description: 'Cursos, alunos e certificações',
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'bg-purple-100 text-purple-700'
    },
    {
      id: 'ecommerce',
      name: 'E-commerce',
      description: 'Loja virtual, pedidos e pagamentos',
      icon: <Store className="h-8 w-8" />,
      color: 'bg-amber-100 text-amber-700'
    },
    {
      id: 'industrial',
      name: 'Industrial',
      description: 'Máquinas, produção e manutenção',
      icon: <Factory className="h-8 w-8" />,
      color: 'bg-slate-100 text-slate-700'
    }
  ];

  const handleSelectSegment = async (segmentId: string) => {
    // Check if segment is configured
    if (!isConfigured(segmentId)) {
      toast({
        title: "Configuração necessária",
        description: "Este segmento não está configurado. Vá até as configurações para adicioná-lo.",
        variant: "destructive"
      });
      
      // Navigate to settings page
      navigate('/settings');
      return;
    }
    
    // Set the segment
    setCurrentSegment(segmentId as any);
    
    // Switch to the Supabase connection for this segment
    const success = await switchSegment(segmentId);
    
    if (success) {
      // Redirect to the dashboard for this segment
      navigate('/dashboard');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Escolha um Segmento</h1>
        <p className="text-muted-foreground">
          Selecione o segmento do sistema para acessar as funcionalidades específicas
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {segmentOptions.map((segment) => {
          const isReady = isConfigured(segment.id);
          
          return (
            <Card 
              key={segment.id} 
              className={`cursor-pointer hover:shadow-md transition-all ${isReady ? '' : 'opacity-70'}`}
              onClick={() => handleSelectSegment(segment.id)}
            >
              <CardHeader className="pb-2">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${segment.color} mb-2`}>
                  {segment.icon}
                </div>
                <CardTitle>{segment.name}</CardTitle>
                <CardDescription>{segment.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  className="w-full" 
                  variant={isReady ? "default" : "outline"}
                >
                  {isReady ? "Acessar" : "Configurar"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      <div className="mt-8 text-center text-sm text-muted-foreground">
        <p>
          Cada segmento possui seu próprio banco de dados Supabase e funcionalidades específicas.
          <br />Você pode configurar cada segmento nas configurações do sistema.
        </p>
      </div>
    </div>
  );
}
