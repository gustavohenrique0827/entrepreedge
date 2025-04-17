import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Plus, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';

const Hiring = () => {
  const [activeTab, setActiveTab] = useState('openPositions');
  const { toast } = useToast();

  const handleSaveDraft = () => {
    toast({
      title: "Rascunho Salvo",
      description: "O rascunho da vaga foi salvo com sucesso.",
    });
  };

  const handlePublishJob = () => {
    toast({
      title: "Vaga Publicada",
      description: "A vaga foi publicada e está visível para candidatos.",
    });
  };

  return (
    <PageContainer>
      <PageHeader title="Recrutamento" description="Gerenciar processos de recrutamento e seleção" />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
        <TabsList>
          <TabsTrigger value="openPositions">Vagas Abertas</TabsTrigger>
          <TabsTrigger value="candidates">Candidatos</TabsTrigger>
          <TabsTrigger value="newPosition">Nova Vaga</TabsTrigger>
        </TabsList>
        <TabsContent value="openPositions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Vagas Abertas</CardTitle>
              <CardDescription>Lista de vagas atualmente em aberto.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Nenhuma vaga aberta no momento.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="candidates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Candidatos</CardTitle>
              <CardDescription>Gerenciar candidatos e suas aplicações.</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Nenhum candidato aplicado.</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="newPosition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Criar Nova Vaga</CardTitle>
              <CardDescription>Preencha os detalhes para criar uma nova vaga.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="positionTitle">Título da Vaga</Label>
                <Input type="text" id="positionTitle" placeholder="Ex: Engenheiro de Software" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Departamento</Label>
                <Input type="text" id="department" placeholder="Ex: Engenharia" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Localização</Label>
                <Input type="text" id="location" placeholder="Ex: Remoto" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descrição da Vaga</Label>
                <Textarea id="description" placeholder="Detalhe as responsabilidades e requisitos da vaga." />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remote" />
                <Label htmlFor="remote">Vaga Remota</Label>
              </div>
              <div>
                <Label htmlFor="upload">Anexar Descrição Detalhada (Opcional)</Label>
                <Input type="file" id="upload" className="hidden" />
                <Button variant="secondary" asChild>
                  <label htmlFor="upload" className="flex items-center">
                    <Upload className="mr-2 h-4 w-4" />
                    <span>Upload</span>
                  </label>
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={handleSaveDraft}>Salvar Rascunho</Button>
              <Button onClick={handlePublishJob}>Publicar Vaga</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default Hiring;
