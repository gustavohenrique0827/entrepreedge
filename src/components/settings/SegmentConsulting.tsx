
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSegment } from '@/contexts/SegmentContext';
import { BookOpen, Calendar, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const SegmentConsulting = () => {
  const { currentSegment, segmentName } = useSegment();
  
  // Dados de artigos específicos por segmento
  const segmentArticles: Record<string, Array<{title: string; excerpt: string; url: string}>> = {
    // Artigos gerais (para qualquer segmento)
    generic: [
      {
        title: "Como aumentar a produtividade da sua empresa",
        excerpt: "Dicas práticas para melhorar os processos e aumentar a eficiência operacional.",
        url: "#"
      },
      {
        title: "Estratégias de marketing digital para 2025",
        excerpt: "As últimas tendências em marketing digital para impulsionar seu negócio.",
        url: "#"
      }
    ],
    // Artigos para agronegócio
    agro: [
      {
        title: "Sustentabilidade no agronegócio: práticas ESG",
        excerpt: "Como implementar práticas sustentáveis e atrair investimentos com foco em ESG.",
        url: "#"
      },
      {
        title: "Tecnologias para monitoramento de safras",
        excerpt: "Ferramentas e soluções para otimizar a produtividade no campo.",
        url: "#"
      }
    ],
    // Artigos para e-commerce
    ecommerce: [
      {
        title: "Estratégias para reduzir o abandono de carrinho",
        excerpt: "Métodos comprovados para aumentar a conversão em sua loja virtual.",
        url: "#"
      },
      {
        title: "Logística para e-commerce: otimizando entregas",
        excerpt: "Como melhorar a experiência do cliente com uma logística eficiente.",
        url: "#"
      }
    ],
    // Adicione mais segmentos conforme necessário
  };
  
  // Serviços de consultoria
  const consultingServices = [
    {
      title: "Consultoria Especializada",
      description: `Atendimento personalizado para empresas do segmento de ${segmentName.toLowerCase()}.`,
      action: "Agendar",
      icon: <Calendar className="h-5 w-5" />
    },
    {
      title: "Mentoria com Especialistas",
      description: "Sessões individuais com profissionais experientes do mercado.",
      action: "Solicitar",
      icon: <MessageSquare className="h-5 w-5" />
    },
    {
      title: "Cursos Exclusivos",
      description: `Treinamentos específicos para o segmento de ${segmentName.toLowerCase()}.`,
      action: "Ver Cursos",
      icon: <BookOpen className="h-5 w-5" />
    }
  ];
  
  // Obter artigos para o segmento atual ou usar os genéricos
  const articles = segmentArticles[currentSegment] || segmentArticles.generic;
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Consultoria para {segmentName}</CardTitle>
        <CardDescription>
          Conteúdos exclusivos, serviços e dicas para o seu segmento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="articles" className="w-full">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="articles">Artigos e Dicas</TabsTrigger>
            <TabsTrigger value="services">Serviços</TabsTrigger>
          </TabsList>
          
          <TabsContent value="articles">
            <div className="space-y-4">
              {articles.map((article, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg flex items-center">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-3">
                    {article.excerpt}
                  </p>
                  <a 
                    href={article.url}
                    className="text-primary hover:underline inline-flex items-center text-sm"
                  >
                    Ler artigo completo
                    <ExternalLink className="h-3 w-3 ml-1.5" />
                  </a>
                </div>
              ))}
              
              <div className="text-center mt-6">
                <Button variant="outline">
                  Ver todos os artigos para {segmentName}
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {consultingServices.map((service, index) => (
                <div key={index} className="border rounded-lg p-4 flex flex-col items-center text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                    {service.icon}
                  </div>
                  <h3 className="font-medium">{service.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4 flex-1">
                    {service.description}
                  </p>
                  <Button variant="outline" size="sm">
                    {service.action}
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SegmentConsulting;
