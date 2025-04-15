
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lightbulb, Search, Tag, ThumbsUp, MessageSquare, BarChart, LineChart, Target, ArrowRight, Bookmark, Share2, ExternalLink, Filter } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

type InspirationItem = {
  id: number;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  image?: string;
  company?: string;
  category: string;
  liked?: boolean;
  saved?: boolean;
  url?: string;
};

const Inspiration = () => {
  const { toast } = useToast();
  const { currentSegment, segmentName } = useSegment();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState('marketing');

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

  const [inspirationalContent, setInspirationalContent] = useState<Record<string, InspirationItem[]>>({
    marketing: [
      {
        id: 1,
        title: "Campanha de Marketing com Realidade Aumentada",
        description: "Uma marca de móveis implementou uma campanha inovadora que permitia aos clientes visualizar produtos em suas casas usando realidade aumentada antes de comprar.",
        tags: ["inovação", "marketing digital", "realidade aumentada", "experiência do cliente"],
        likes: 120,
        comments: 30,
        image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YXVnbWVudGVkJTIwcmVhbGl0eXxlbnwwfHwwfHx8MA%3D%3D",
        company: "MoveisAR",
        category: "marketing",
        url: "#"
      },
      {
        id: 2,
        title: "Estratégia de Conteúdo Orientada por Dados",
        description: "Uma empresa de software B2B aumentou sua taxa de conversão em 45% usando análise de dados para identificar as perguntas exatas que seus clientes estavam fazendo online.",
        tags: ["conteúdo", "SEO", "dados", "conversão"],
        likes: 95,
        comments: 15,
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZGF0YSUyMGFuYWx5c2lzfGVufDB8fDB8fHww",
        company: "DataContent",
        category: "marketing",
        url: "#"
      },
      {
        id: 3,
        title: "Programa de Fidelidade Gamificado",
        description: "Uma rede de cafeterias implementou um programa de fidelidade gamificado que aumentou as visitas em 30% ao criar desafios semanais e recompensas personalizadas.",
        tags: ["gamificação", "fidelidade", "experiência do cliente", "app"],
        likes: 152,
        comments: 42,
        image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHRlYW0lMjBnYW1lfGVufDB8fDB8fHww",
        company: "CaféPoints",
        category: "marketing",
        url: "#"
      },
      {
        id: 4,
        title: "Marketing de Micro-Influenciadores",
        description: "Uma marca de cosméticos naturais cresceu 200% em um ano ao trabalhar exclusivamente com micro-influenciadores especializados em sustentabilidade.",
        tags: ["influenciadores", "orgânico", "crescimento", "nicho"],
        likes: 87,
        comments: 19,
        image: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGluZmx1ZW5jZXJ8ZW58MHx8MHx8fDA%3D",
        company: "NaturalGlow",
        category: "marketing",
        url: "#"
      },
    ],
    productDevelopment: [
      {
        id: 5,
        title: "Design Thinking para Reinventar Experiências",
        description: "Uma empresa de transporte transformou seu aplicativo usando design thinking, observando os usuários em tempo real para identificar problemas ocultos de usabilidade.",
        tags: ["design thinking", "UX", "inovação", "pesquisa de usuários"],
        likes: 150,
        comments: 45,
        image: "https://images.unsplash.com/photo-1570454075279-3c43a1f74212?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGVzaWduJTIwdGhpbmtpbmd8ZW58MHx8MHx8fDA%3D",
        company: "MobilityUX",
        category: "productDevelopment",
        url: "#"
      },
      {
        id: 6,
        title: "MVP Bem-Sucedido em Apenas 6 Semanas",
        description: "Uma startup fintech conseguiu validar seu produto em tempo recorde utilizando uma abordagem extremamente focada de produto mínimo viável com apenas as funcionalidades essenciais.",
        tags: ["MVP", "lean startup", "validação", "fintech"],
        likes: 110,
        comments: 22,
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlYW0lMjBwbGFubmluZ3xlbnwwfHwwfHx8MA%3D%3D",
        company: "QuickLaunch",
        category: "productDevelopment",
        url: "#"
      },
      {
        id: 7,
        title: "Produto Co-Criado com a Comunidade",
        description: "Uma empresa de software open-source transformou seu produto ao estabelecer um conselho de clientes que participava ativamente das decisões de desenvolvimento.",
        tags: ["co-criação", "comunidade", "feedback", "desenvolvimento ágil"],
        likes: 135,
        comments: 38,
        image: "https://images.unsplash.com/photo-1559223607-a43c990c692c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29tbXVuaXR5JTIwc29mdHdhcmV8ZW58MHx8MHx8fDA%3D",
        company: "CommunityBuild",
        category: "productDevelopment",
        url: "#"
      },
      {
        id: 8,
        title: "Metodologia Ágil Personalizada",
        description: "Uma empresa de hardware adaptou princípios ágeis para ciclos de desenvolvimento físicos, reduzindo o tempo de lançamento em 40% sem comprometer a qualidade.",
        tags: ["agile", "hardware", "inovação", "processos"],
        likes: 98,
        comments: 26,
        image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YWdpbGV8ZW58MHx8MHx8fDA%3D",
        company: "FlexHardware",
        category: "productDevelopment",
        url: "#"
      },
    ],
    leadership: [
      {
        id: 9,
        title: "Liderança Distribuída em Equipes Remotas",
        description: "Uma empresa global implementou um modelo de liderança distribuída que aumentou a produtividade em 28% e a satisfação dos funcionários em 40%.",
        tags: ["liderança", "trabalho remoto", "cultura", "autonomia"],
        likes: 180,
        comments: 60,
        image: "https://images.unsplash.com/photo-1552581234-26160f608093?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVtb3RlJTIwd29ya3xlbnwwfHwwfHx8MA%3D%3D",
        company: "RemoteFirst",
        category: "leadership",
        url: "#"
      },
      {
        id: 10,
        title: "Cultura de Inovação através da Psicologia",
        description: "Uma empresa média de tecnologia transformou sua cultura ao aplicar princípios de psicologia positiva, implementando tempo protegido para projetos inovadores.",
        tags: ["cultura", "inovação", "psicologia", "criatividade"],
        likes: 130,
        comments: 35,
        image: "https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5ub3ZhdGlvbiUyMGN1bHR1cmV8ZW58MHx8MHx8fDA%3D",
        company: "CreativeTech",
        category: "leadership",
        url: "#"
      },
      {
        id: 11,
        title: "Mentorias Inversas para Líderes",
        description: "Uma corporação tradicional implementou um programa de mentoria inversa onde líderes seniores são mentorados por jovens talentos em tecnologias emergentes.",
        tags: ["mentoria", "aprendizado", "tecnologia", "gerações"],
        likes: 145,
        comments: 42,
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1lbnRvcnxlbnwwfHwwfHx8MA%3D%3D",
        company: "FutureLeaders",
        category: "leadership",
        url: "#"
      },
      {
        id: 12,
        title: "OKRs Transparentes em Toda Empresa",
        description: "Uma empresa média mudou completamente seus resultados ao implementar um sistema de OKRs totalmente transparente, alinhando equipes e aumentando o engajamento.",
        tags: ["OKRs", "transparência", "metas", "alinhamento"],
        likes: 115,
        comments: 28,
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29hbHN8ZW58MHx8MHx8fDA%3D",
        company: "AlignedGoals",
        category: "leadership",
        url: "#"
      },
    ],
    finance: [
      {
        id: 13,
        title: "Microtransações para Áreas em Crescimento",
        description: "Uma pequena empresa implementou um sistema onde 1% das receitas são automaticamente direcionadas para experimentação em novas áreas de negócio.",
        tags: ["investimento", "inovação", "crescimento", "experimentação"],
        likes: 105,
        comments: 23,
        image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z3Jvd3RofGVufDB8fDB8fHww",
        company: "GrowthFunds",
        category: "finance",
        url: "#"
      },
      {
        id: 14,
        title: "Gestão Financeira Colaborativa",
        description: "Uma startup implementou um sistema inovador onde todos os colaboradores têm acesso a dashboards financeiros e participam das decisões de investimento.",
        tags: ["transparência", "gestão financeira", "colaboração", "decisões"],
        likes: 92,
        comments: 18,
        image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmluYW5jaWFsJTIwbWFuYWdlbWVudHxlbnwwfHwwfHx8MA%3D%3D",
        company: "OpenFinance",
        category: "finance",
        url: "#"
      },
      {
        id: 15,
        title: "Monetização Criativa de Ativos",
        description: "Uma pequena empresa de serviços transformou seu conhecimento interno em produtos digitais, criando uma nova fonte de receita que agora representa 30% do faturamento.",
        tags: ["monetização", "produtos digitais", "receita recorrente", "propriedade intelectual"],
        likes: 122,
        comments: 32,
        image: "https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZGlnaXRhbCUyMHByb2R1Y3R8ZW58MHx8MHx8fDA%3D",
        company: "KnowledgeAssets",
        category: "finance",
        url: "#"
      },
      {
        id: 16,
        title: "Precificação Baseada em Valor",
        description: "Uma consultoria mudou completamente seu modelo de negócios ao implementar precificação baseada em resultados, aumentando o ticket médio em 300%.",
        tags: ["precificação", "valor", "resultados", "modelo de negócios"],
        likes: 88,
        comments: 20,
        image: "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmFsdWV8ZW58MHx8MHx8fDA%3D",
        company: "ValuePricing",
        category: "finance",
        url: "#"
      },
    ],
  });

  // Handle liking an item
  const handleLike = (id: number, category: string) => {
    setInspirationalContent(prev => {
      const newContent = { ...prev };
      newContent[category] = newContent[category].map(item => 
        item.id === id 
          ? { 
              ...item, 
              likes: item.liked ? item.likes - 1 : item.likes + 1,
              liked: !item.liked 
            }
          : item
      );
      return newContent;
    });
    
    toast({
      title: "Conteúdo curtido",
      description: "Sua interação foi registrada com sucesso."
    });
  };
  
  // Handle saving an item
  const handleSave = (id: number, category: string) => {
    setInspirationalContent(prev => {
      const newContent = { ...prev };
      newContent[category] = newContent[category].map(item => 
        item.id === id 
          ? { 
              ...item, 
              saved: !item.saved 
            }
          : item
      );
      return newContent;
    });
    
    toast({
      title: "Conteúdo salvo",
      description: "Este item foi adicionado aos seus favoritos."
    });
  };

  // Filter content based on search term
  const filteredContent = inspirationalContent[currentCategory]?.filter(item =>
    searchTerm === '' ||
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar ideias por título, descrição ou tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full"
              />
            </div>
            <Button variant="outline" className="sm:w-auto w-full">
              <Filter className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>

          <Tabs defaultValue="marketing" value={currentCategory} onValueChange={setCurrentCategory} className="mt-4">
            <TabsList className="mb-6">
              <TabsTrigger value="marketing">
                Marketing e Vendas
              </TabsTrigger>
              <TabsTrigger value="productDevelopment">
                Desenvolvimento de Produtos
              </TabsTrigger>
              <TabsTrigger value="leadership">
                Liderança e Gestão
              </TabsTrigger>
              <TabsTrigger value="finance">
                Finanças e Investimentos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value={currentCategory}>
              {filteredContent?.length === 0 ? (
                <div className="text-center py-12">
                  <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">Nenhuma ideia encontrada</h3>
                  <p className="text-muted-foreground mt-2">
                    Não encontramos resultados para sua busca. Tente termos diferentes.
                  </p>
                  {searchTerm && (
                    <Button 
                      variant="link" 
                      onClick={() => setSearchTerm('')}
                      className="mt-2"
                    >
                      Limpar busca
                    </Button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContent?.map((item) => (
                    <Card key={item.id} className="overflow-hidden flex flex-col h-full">
                      {item.image && (
                        <div className="h-48 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </div>
                      )}
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                        {item.company && (
                          <CardDescription>{item.company}</CardDescription>
                        )}
                      </CardHeader>
                      <CardContent className="pb-2 flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {item.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                      <CardFooter className="pt-2 border-t flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleLike(item.id, currentCategory)}
                            className={item.liked ? "text-primary" : ""}
                          >
                            <ThumbsUp className="mr-1 h-4 w-4" />
                            {item.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {item.comments}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleSave(item.id, currentCategory)}
                            className={item.saved ? "text-primary" : ""}
                          >
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                        <div>
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="mt-8 text-center">
            <h3 className="text-lg font-medium mb-2">Descubra mais inspirações</h3>
            <p className="text-muted-foreground mb-4">Explore nossa biblioteca completa de estudos de caso e ideias inovadoras.</p>
            <Button>Ver Biblioteca Completa</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
