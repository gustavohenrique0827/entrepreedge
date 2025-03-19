
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Home, BarChart2, Target, BookOpen, Mail, Phone, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const Help = () => {
  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Finanças',
      href: '/finances',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Metas',
      href: '/goals',
      icon: <Target size={18} />
    },
    {
      name: 'Aprendizado',
      href: '/learn',
      icon: <BookOpen size={18} />
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Central de Ajuda</h1>
            <p className="text-sm text-muted-foreground">
              Encontre respostas para suas dúvidas mais frequentes
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Perguntas Frequentes</CardTitle>
                <CardDescription>
                  Respostas para as dúvidas mais comuns dos nossos usuários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Como posso alterar minha assinatura?</AccordionTrigger>
                    <AccordionContent>
                      Para alterar sua assinatura, acesse o menu "Configurações" e selecione a aba "Assinatura". 
                      Lá você pode visualizar e alterar seu plano atual para um que melhor atenda às suas necessidades.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Como faço para adicionar novos usuários?</AccordionTrigger>
                    <AccordionContent>
                      O número de usuários que você pode adicionar depende do seu plano de assinatura. 
                      Para adicionar um novo usuário, acesse "Configurações" > "Usuários" e clique em "Adicionar Usuário".
                      Preencha as informações necessárias e o novo usuário receberá um email com instruções de acesso.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Como exportar relatórios financeiros?</AccordionTrigger>
                    <AccordionContent>
                      Navegue até a seção "Finanças", escolha o relatório desejado, e clique no botão "Exportar" 
                      no canto superior direito. Você pode escolher entre formatos como PDF, Excel ou CSV.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Como criar metas para minha empresa?</AccordionTrigger>
                    <AccordionContent>
                      Acesse a seção "Metas" no menu lateral e clique em "Nova Meta". Preencha os detalhes 
                      como nome, descrição, valor alvo e prazo. Você pode monitorar o progresso das suas metas 
                      através do dashboard ou da própria seção de metas.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>O que fazer se esqueci minha senha?</AccordionTrigger>
                    <AccordionContent>
                      Na tela de login, clique em "Esqueci minha senha". Digite seu email cadastrado e 
                      enviaremos um link para redefinir sua senha. O link é válido por 24 horas.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Entre em Contato</CardTitle>
                <CardDescription>Precisa de ajuda adicional? Estamos aqui para você.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <span>suporte@entrepreeedge.com.br</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <span>0800 123 4567</span>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-muted-foreground mb-3">
                    Nosso suporte está disponível de segunda a sexta, das 9h às 18h.
                  </p>
                  <Button variant="outline" className="w-full">
                    Abrir Ticket de Suporte
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recursos de Aprendizado</CardTitle>
              <CardDescription>
                Explore nossa base de conhecimento e tutoriais para aproveitar ao máximo o EntrepreEdge
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Tutoriais em vídeo</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Aprenda passo a passo através dos nossos tutoriais em vídeo.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full flex gap-2 items-center">
                    <ExternalLink size={16} />
                    <span>Acessar</span>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Documentação</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Guias detalhados sobre todas as funcionalidades do sistema.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full flex gap-2 items-center">
                    <ExternalLink size={16} />
                    <span>Acessar</span>
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Webinars</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Participe dos nossos webinars semanais com especialistas.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full flex gap-2 items-center">
                    <ExternalLink size={16} />
                    <span>Acessar</span>
                  </Button>
                </CardFooter>
              </Card>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Help;
