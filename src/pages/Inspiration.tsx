
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Lightbulb, Search, Tag, ThumbsUp, MessageSquare, BarChart, LineChart, Target, ArrowRight } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';

const Inspiration = () => {
  const { currentSegment, segmentName } = useSegment();

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart size={18} />
    },
    {
      name: 'Benchmarking',
      href: '/benchmarking',
      icon: <LineChart size={18} />
    },
    {
      name: 'Simulador',
      href: '/simulator',
      icon: <Target size={18} />
    }
  ];

  const inspirationalContent = {
    marketing: [
      {
        title: "Campanha de Marketing Inovadora",
        description: "Uma campanha que utilizou realidade aumentada para engajar clientes.",
        tags: ["inovação", "marketing digital", "realidade aumentada"],
        likes: 120,
        comments: 30,
      },
      {
        title: "Estratégia de Conteúdo Criativa",
        description: "Como criar conteúdo que realmente ressoa com seu público-alvo.",
        tags: ["conteúdo", "SEO", "engajamento"],
        likes: 95,
        comments: 15,
      },
    ],
    productDevelopment: [
      {
        title: "Design Thinking em Ação",
        description: "Um caso de sucesso de como o design thinking transformou um produto.",
        tags: ["design thinking", "inovação de produto", "UX"],
        likes: 150,
        comments: 45,
      },
      {
        title: "Metodologias Ágeis para Produtos",
        description: "Aprenda a usar metodologias ágeis para acelerar o desenvolvimento de produtos.",
        tags: ["metodologias ágeis", "scrum", "lean"],
        likes: 110,
        comments: 22,
      },
    ],
    leadership: [
      {
        title: "Liderança Inspiradora",
        description: "Histórias de líderes que inspiraram suas equipes a alcançar grandes feitos.",
        tags: ["liderança", "motivação", "gestão de equipes"],
        likes: 180,
        comments: 60,
      },
      {
        title: "Construindo uma Cultura de Inovação",
        description: "Dicas para criar um ambiente de trabalho que fomente a inovação.",
        tags: ["cultura organizacional", "inovação", "RH"],
        likes: 130,
        comments: 35,
      },
    ],
  };

  const [activeTab, setActiveTab] = useState("marketing");
  const content = inspirationalContent[activeTab];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />

        <div className="container px-4 py-6">
          <PageHeader
            title="Inspirações e Ideias Inovadoras"
            description={`Descubra ideias para impulsionar sua empresa no segmento de ${segmentName}`}
            icon={<Lightbulb size={24} />}
          />

          <Tabs defaultValue="marketing" className="mt-4">
            <TabsList>
              <TabsTrigger value="marketing" onClick={() => setActiveTab("marketing")}>
                Marketing e Vendas
              </TabsTrigger>
              <TabsTrigger value="productDevelopment" onClick={() => setActiveTab("productDevelopment")}>
                Desenvolvimento de Produtos
              </TabsTrigger>
              <TabsTrigger value="leadership" onClick={() => setActiveTab("leadership")}>
                Liderança e Gestão
              </TabsTrigger>
            </TabsList>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content?.map((item, index) => (
                <TabsContent value={activeTab} key={index}>
                  <Card>
                    <CardHeader>
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2">
                        {item.tags.map((tag, i) => (
                          <Tag key={i} className="h-4 w-4 text-muted-foreground" />
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <Button variant="ghost" size="sm">
                          <ThumbsUp className="mr-2 h-4 w-4" />
                          {item.likes}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <MessageSquare className="mr-2 h-4 w-4" />
                          {item.comments}
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        Ver Mais
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
