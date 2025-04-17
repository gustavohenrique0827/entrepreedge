
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Check, Clock, Filter, Plus, Search, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';

const HRProcesses = () => {
  const [selectedProcess, setSelectedProcess] = useState('onboarding');
  const { toast } = useToast();

  const handleProcessComplete = (processName: string) => {
    toast({
      title: "Processo Concluído",
      description: `O processo de ${processName} foi marcado como concluído.`,
    });
  };

  return (
    <PageContainer>
      <PageHeader title="Processos de RH" description="Gerencie os processos de recursos humanos da sua empresa" />

      <Tabs defaultValue="onboarding" className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="performance">Avaliação de Desempenho</TabsTrigger>
          <TabsTrigger value="training">Treinamento e Desenvolvimento</TabsTrigger>
          <TabsTrigger value="offboarding">Offboarding</TabsTrigger>
        </TabsList>
        <TabsContent value="onboarding" className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>Processo de Onboarding</CardTitle>
              <CardDescription>Guia para integrar novos funcionários à empresa.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Preparar a documentação do novo funcionário.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Configurar o espaço de trabalho e o acesso aos sistemas.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Apresentar o novo funcionário à equipe.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleProcessComplete('Onboarding')}>Marcar como Concluído</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="performance" className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>Avaliação de Desempenho</CardTitle>
              <CardDescription>Avalie o desempenho dos funcionários e forneça feedback.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Definir metas e expectativas claras.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Realizar avaliações regulares de desempenho.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Fornecer feedback construtivo e oportunidades de melhoria.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleProcessComplete('Avaliação de Desempenho')}>Marcar como Concluído</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="training" className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>Treinamento e Desenvolvimento</CardTitle>
              <CardDescription>Invista no crescimento profissional dos seus funcionários.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Identificar as necessidades de treinamento dos funcionários.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Oferecer programas de treinamento relevantes e eficazes.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Acompanhar o progresso e o impacto do treinamento.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleProcessComplete('Treinamento e Desenvolvimento')}>Marcar como Concluído</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="offboarding" className="space-y-2">
          <Card>
            <CardHeader>
              <CardTitle>Processo de Offboarding</CardTitle>
              <CardDescription>Guia para desligar funcionários da empresa de forma adequada.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Realizar uma entrevista de desligamento.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Recolher os materiais e equipamentos da empresa.</p>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="h-4 w-4 text-green-500" />
                <p>Revogar o acesso aos sistemas e informações da empresa.</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleProcessComplete('Offboarding')}>Marcar como Concluído</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default HRProcesses;
