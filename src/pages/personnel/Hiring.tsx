
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Upload, Share2, Linkedin, Facebook, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Hiring = () => {
  const [activeTab, setActiveTab] = useState('openPositions');
  const { toast } = useToast();
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [socialPlatforms, setSocialPlatforms] = useState({
    linkedin: true,
    facebook: true,
    instagram: true,
    google: true
  });
  const [shareMessage, setShareMessage] = useState(
    'Estamos felizes em anunciar que [Nome do Colaborador] se juntou à nossa equipe como [Cargo]! Dê as boas-vindas ao nosso novo talento. #NovoColaborador #Contratação'
  );

  // Definir os itens de navegação para o Navbar
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M9 4H5C4.44772 4 4 4.44772 4 5V9C4 9.55228 4.44772 10 5 10H9C9.55228 10 10 9.55228 10 9V5C10 4.44772 9.55228 4 9 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 4H15C14.4477 4 14 4.44772 14 5V9C14 9.55228 14.4477 10 15 10H19C19.5523 10 20 9.55228 20 9V5C20 4.44772 19.5523 4 19 4Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 14H5C4.44772 14 4 14.4477 4 15V19C4 19.5523 4.44772 20 5 20H9C9.55228 20 10 19.5523 10 19V15C10 14.4477 9.55228 14 9 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 14H15C14.4477 14 14 14.4477 14 15V19C14 19.5523 14.4477 20 15 20H19C19.5523 20 20 19.5523 20 19V15C20 14.4477 19.5523 14 19 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Finanças', href: '/finances', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Metas', href: '/goals', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { name: 'Aprendizados', href: '/learn', icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2"><path d="M12 6.25278V19.2528M12 6.25278C10.8321 5.47686 9.24649 5 7.5 5C5.75351 5 4.16789 5.47686 3 6.25278V19.2528C4.16789 18.4769 5.75351 18 7.5 18C9.24649 18 10.8321 18.4769 12 19.2528M12 6.25278C13.1679 5.47686 14.7535 5 16.5 5C18.2465 5 19.8321 5.47686 21 6.25278V19.2528C19.8321 18.4769 18.2465 18 16.5 18C14.7535 18 13.1679 18.4769 12 19.2528" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> }
  ];

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

  const handleShare = () => {
    let platforms = [];
    if (socialPlatforms.linkedin) platforms.push("LinkedIn");
    if (socialPlatforms.facebook) platforms.push("Facebook");
    if (socialPlatforms.instagram) platforms.push("Instagram");
    if (socialPlatforms.google) platforms.push("Google Meu Negócio");

    toast({
      title: "Postagem Compartilhada",
      description: `Sua postagem foi compartilhada com sucesso nas plataformas: ${platforms.join(", ")}`,
    });
    setShowShareDialog(false);
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        <PageContainer>
          <PageHeader title="Recrutamento" description="Gerenciar processos de recrutamento e seleção" />

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
            <TabsList className="w-full sm:w-auto">
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
                  <div className="grid gap-2">
                    <Label htmlFor="upload">Anexar Descrição Detalhada (Opcional)</Label>
                    <div className="flex items-center gap-2">
                      <Input type="file" id="upload" className="hidden" />
                      <Button variant="secondary" asChild className="w-full sm:w-auto">
                        <label htmlFor="upload" className="flex items-center justify-center cursor-pointer">
                          <Upload className="mr-2 h-4 w-4" />
                          <span>Upload</span>
                        </label>
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" className="w-full sm:w-auto">
                            <Share2 className="mr-2 h-4 w-4" />
                            Compartilhar ao Publicar
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>Configurar Compartilhamento</DialogTitle>
                            <DialogDescription>
                              Selecione as plataformas onde deseja publicar esta vaga automaticamente.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="linkedin" 
                                  checked={socialPlatforms.linkedin}
                                  onCheckedChange={(checked) => 
                                    setSocialPlatforms({...socialPlatforms, linkedin: checked === true})
                                  }
                                />
                                <Label htmlFor="linkedin" className="flex items-center">
                                  <Linkedin className="mr-2 h-4 w-4" />
                                  LinkedIn
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="facebook" 
                                  checked={socialPlatforms.facebook}
                                  onCheckedChange={(checked) => 
                                    setSocialPlatforms({...socialPlatforms, facebook: checked === true})
                                  }
                                />
                                <Label htmlFor="facebook" className="flex items-center">
                                  <Facebook className="mr-2 h-4 w-4" />
                                  Facebook
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="instagram" 
                                  checked={socialPlatforms.instagram}
                                  onCheckedChange={(checked) => 
                                    setSocialPlatforms({...socialPlatforms, instagram: checked === true})
                                  }
                                />
                                <Label htmlFor="instagram" className="flex items-center">
                                  <Instagram className="mr-2 h-4 w-4" />
                                  Instagram
                                </Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Checkbox 
                                  id="google" 
                                  checked={socialPlatforms.google}
                                  onCheckedChange={(checked) => 
                                    setSocialPlatforms({...socialPlatforms, google: checked === true})
                                  }
                                />
                                <Label htmlFor="google" className="flex items-center">
                                  <svg width="16" height="16" viewBox="0 0 24 24" className="mr-2">
                                    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1.086-10.432L7.58 9.23a.351.351 0 0 0-.497.027l-1.157 1.356a.35.35 0 0 0-.078.225l-.004 2.488a.35.35 0 0 0 .526.303l2.379-1.511a.35.35 0 0 0 .164-.298v-1.957a.35.35 0 0 0-.2-.315zm2.171 0a.35.35 0 0 0-.2.315v1.957a.35.35 0 0 0 .165.298l2.379 1.511a.35.35 0 0 0 .525-.303l-.004-2.488a.35.35 0 0 0-.077-.225l-1.157-1.356a.35.35 0 0 0-.497-.027l-3.334 2.338a.35.35 0 0 0 0 .574l1.086.76a.35.35 0 0 0 .4 0l.714-.5z" fill="currentColor"/>
                                  </svg>
                                  Google Meu Negócio
                                </Label>
                              </div>
                            </div>
                            <Separator />
                            <div className="space-y-2">
                              <Label htmlFor="shareMessage">Mensagem de Publicação</Label>
                              <Textarea 
                                id="shareMessage" 
                                placeholder="Escreva a mensagem que será publicada nas redes sociais"
                                value={shareMessage}
                                onChange={(e) => setShareMessage(e.target.value)}
                              />
                              <p className="text-sm text-muted-foreground">
                                Use [Nome do Colaborador] e [Cargo] como espaços reservados que serão substituídos automaticamente.
                              </p>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="button" variant="outline" onClick={() => setShowShareDialog(false)}>
                              Cancelar
                            </Button>
                            <Button type="button" onClick={handleShare}>
                              Salvar Configurações
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2 items-center justify-end">
                  <Button variant="outline" onClick={handleSaveDraft} className="w-full sm:w-auto">
                    Salvar Rascunho
                  </Button>
                  <Button onClick={handlePublishJob} className="w-full sm:w-auto">
                    Publicar Vaga
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </PageContainer>
      </div>
    </div>
  );
};

export default Hiring;
