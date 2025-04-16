
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, Users, Share2, ExternalLink, Bookmark, ThumbsUp } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const SUCCESS_STORIES = [
  {
    id: 1,
    title: "Transformação Digital de uma Pequena Padaria",
    description: "Como uma pequena padaria familiar aumentou suas vendas em 300% implementando um sistema de pedidos online e estratégias de marketing digital.",
    industry: "Alimentação",
    metrics: {
      revenue_increase: "300%",
      customer_growth: "250%",
      timeline: "6 meses"
    },
    challenges: [
      "Resistência inicial a novas tecnologias",
      "Orçamento limitado",
      "Equipe sem experiência digital"
    ],
    strategies: [
      "Implementação gradual de ferramentas digitais",
      "Parcerias com apps de entrega",
      "Marketing em redes sociais focado no público local"
    ],
    results: "A padaria aumentou seu faturamento em 300% e expandiu para dois novos bairros em apenas um ano, contratando 12 novos funcionários.",
    image: "https://images.unsplash.com/photo-1517433367423-c7e5b0f35086?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Startup de Tecnologia Conquista Mercado Internacional",
    description: "Uma startup brasileira de software expandiu para 5 países em menos de 2 anos com estratégia de localização eficiente.",
    industry: "Tecnologia",
    metrics: {
      revenue_increase: "400%",
      customer_growth: "500%",
      timeline: "2 anos"
    },
    challenges: [
      "Adaptação a diferentes culturas e regulações",
      "Competição com players globais",
      "Limitações de idioma na equipe inicial"
    ],
    strategies: [
      "Contratação estratégica de talentos locais",
      "Adaptação do produto para necessidades regionais",
      "Modelo de precificação específico para cada mercado"
    ],
    results: "A empresa hoje tem presença em 5 países, equipe de 120 pessoas e está se preparando para uma rodada de investimento Série B.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Indústria Tradicional Revoluciona Processos",
    description: "Fabricante de móveis com 50 anos revolucionou sua produção com Industry 4.0, reduzindo custos em 40% e tempo de produção pela metade.",
    industry: "Indústria",
    metrics: {
      cost_reduction: "40%",
      production_time: "-50%",
      timeline: "18 meses"
    },
    challenges: [
      "Cultura organizacional resistente a mudanças",
      "Alto investimento inicial necessário",
      "Necessidade de requalificação da força de trabalho"
    ],
    strategies: [
      "Implementação gradual de automação",
      "Programa interno de treinamento digital",
      "Parceria com universidades para inovação"
    ],
    results: "A empresa agora é líder de mercado em seu segmento e exporta para 12 países, com crescimento anual de 25%.",
    image: "https://images.unsplash.com/photo-1504131598085-4cbc8c2169b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const MARKET_TRENDS = [
  {
    id: 1,
    title: "Crescimento do Comércio Social",
    description: "Integração de compras diretamente em plataformas sociais, criando experiências de compra mais imersivas e sociais.",
    stats: {
      growth_rate: "25%",
      adoption_rate: "40%"
    },
    prediction: "O comércio social deve representar 25% de todas as vendas online até 2026.",
    impact: "Alto impacto para varejos, marcas e criadores de conteúdo.",
    opportunities: [
      "Parcerias com influenciadores",
      "Tecnologias de compra in-app",
      "Experiências de compra ao vivo"
    ],
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Sustentabilidade como Diferencial Competitivo",
    description: "Empresas adotando práticas sustentáveis estão vendo vantagens competitivas significativas e maior lealdade dos consumidores.",
    stats: {
      consumer_preference: "73%",
      premium_willing_to_pay: "18%"
    },
    prediction: "Mais de 80% das grandes empresas terão metas de sustentabilidade mensuráveis até 2025.",
    impact: "Médio-alto impacto em todos os setores, principalmente manufatura e varejo.",
    opportunities: [
      "Economia circular",
      "Transparência na cadeia de suprimentos",
      "Produtos com apelo ecológico"
    ],
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Ascensão das Marketplaces Verticais",
    description: "Marketplaces especializadas em nichos específicos estão ganhando espaço contra os grandes generalistas como Amazon.",
    stats: {
      growth_rate: "34%",
      market_share_growth: "12%"
    },
    prediction: "Marketplaces verticais devem capturar 30% do crescimento do e-commerce nos próximos 3 anos.",
    impact: "Alto impacto para varejistas, fabricantes e distribuidores especializados.",
    opportunities: [
      "Experiência do usuário personalizada para o nicho",
      "Serviços especializados agregados",
      "Comunidades em torno de interesses específicos"
    ],
    image: "https://images.unsplash.com/photo-1556741533-6e6a62bd8b49?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const COLLABORATION_TIPS = [
  {
    id: 1,
    title: "Design Thinking Remoto",
    description: "Como aplicar metodologias de Design Thinking em equipes distribuídas geograficamente.",
    benefits: [
      "Maior engajamento de equipes remotas",
      "Aproveitamento da diversidade geográfica",
      "Soluções mais inovadoras"
    ],
    steps: [
      "Preparação e ferramentas específicas",
      "Adaptação das dinâmicas para o ambiente virtual",
      "Documentação e acompanhamento contínuo"
    ],
    tools: ["Miro", "Figma", "MURAL", "Zoom"],
    image: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Metodologias Ágeis Híbridas",
    description: "Combinação de diferentes frameworks ágeis adaptados para diferentes tipos de projetos e equipes.",
    benefits: [
      "Maior flexibilidade e adaptabilidade",
      "Melhor adequação às necessidades específicas",
      "Aumento de produtividade"
    ],
    steps: [
      "Avaliação das necessidades do projeto e equipe",
      "Seleção e adaptação das metodologias",
      "Implementação gradual e feedback contínuo"
    ],
    tools: ["Jira", "Trello", "Asana", "Monday"],
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Comunidades de Prática Internas",
    description: "Implementação de grupos de compartilhamento de conhecimento entre departamentos.",
    benefits: [
      "Quebra de silos organizacionais",
      "Aceleração da curva de aprendizado",
      "Maior retenção de talentos"
    ],
    steps: [
      "Identificação de temas e líderes",
      "Estruturação dos encontros e dinâmicas",
      "Mensuração de impacto e ajustes"
    ],
    tools: ["Slack", "MS Teams", "Notion", "Confluence"],
    image: "https://images.unsplash.com/photo-1582213782179-e0d4d3cce33a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];

const Inspiration = () => {
  const [selectedStory, setSelectedStory] = useState<typeof SUCCESS_STORIES[0] | null>(null);
  const [selectedTrend, setSelectedTrend] = useState<typeof MARKET_TRENDS[0] | null>(null);
  const [selectedTip, setSelectedTip] = useState<typeof COLLABORATION_TIPS[0] | null>(null);
  const { toast } = useToast();
  
  const handleShare = (item: any, type: string) => {
    // Simulate sharing functionality
    toast({
      title: "Conteúdo compartilhado",
      description: `O item "${item.title}" foi compartilhado com sucesso.`,
    });
  };
  
  const handleSave = (item: any, type: string) => {
    // Simulate saving functionality
    toast({
      title: "Conteúdo salvo",
      description: `O item "${item.title}" foi salvo nos seus favoritos.`,
    });
  };
  
  const handleLike = (item: any, type: string) => {
    // Simulate like functionality
    toast({
      title: "Conteúdo curtido",
      description: `Você curtiu "${item.title}".`,
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Inspiração</h1>
            <p className="text-sm text-muted-foreground">
              Histórias de sucesso, tendências e ideias para impulsionar seu negócio
            </p>
          </div>
          
          <Tabs defaultValue="success" className="mb-6">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="success" className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                Histórias de Sucesso
              </TabsTrigger>
              <TabsTrigger value="trends" className="flex items-center gap-1">
                <TrendingUp className="h-4 w-4" />
                Tendências de Mercado
              </TabsTrigger>
              <TabsTrigger value="collaboration" className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                Dicas de Colaboração
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="success">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SUCCESS_STORIES.map(story => (
                  <Card key={story.id} className="overflow-hidden">
                    <div 
                      className="h-48 w-full bg-center bg-cover" 
                      style={{ backgroundImage: `url(${story.image})` }}
                    ></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs font-medium text-primary bg-primary/10 py-1 px-2 rounded-full inline-block mb-1">
                            {story.industry}
                          </div>
                          <CardTitle className="text-base">{story.title}</CardTitle>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {story.description}
                      </p>
                      <div className="grid grid-cols-3 gap-2 mb-3">
                        {Object.entries(story.metrics).map(([key, value]) => (
                          <div key={key} className="p-2 border rounded-md text-center">
                            <p className="text-xs text-muted-foreground">{key.replace('_', ' ')}</p>
                            <p className="font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleShare(story, 'story')}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleSave(story, 'story')}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleLike(story, 'story')}>
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" onClick={() => setSelectedStory(story)}>
                        Ver mais detalhes
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="trends">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MARKET_TRENDS.map(trend => (
                  <Card key={trend.id} className="overflow-hidden">
                    <div 
                      className="h-48 w-full bg-center bg-cover" 
                      style={{ backgroundImage: `url(${trend.image})` }}
                    ></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{trend.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {trend.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        {Object.entries(trend.stats).map(([key, value]) => (
                          <div key={key} className="p-2 border rounded-md text-center">
                            <p className="text-xs text-muted-foreground">{key.replace('_', ' ')}</p>
                            <p className="font-medium">{value}</p>
                          </div>
                        ))}
                      </div>
                      <Alert className="mt-2 bg-muted/20">
                        <TrendingUp className="h-4 w-4" />
                        <AlertDescription className="text-xs">
                          {trend.prediction}
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleShare(trend, 'trend')}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleSave(trend, 'trend')}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleLike(trend, 'trend')}>
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" onClick={() => setSelectedTrend(trend)}>
                        Ver mais detalhes
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="collaboration">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {COLLABORATION_TIPS.map(tip => (
                  <Card key={tip.id} className="overflow-hidden">
                    <div 
                      className="h-48 w-full bg-center bg-cover" 
                      style={{ backgroundImage: `url(${tip.image})` }}
                    ></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">{tip.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                        {tip.description}
                      </p>
                      <div className="mb-3">
                        <p className="text-xs font-medium mb-1">Benefícios:</p>
                        <ul className="text-xs text-muted-foreground list-disc pl-4 space-y-1">
                          {tip.benefits.slice(0, 2).map((benefit, idx) => (
                            <li key={idx}>{benefit}</li>
                          ))}
                          {tip.benefits.length > 2 && <li>...</li>}
                        </ul>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {tip.tools.map((tool, idx) => (
                          <span key={idx} className="text-xs bg-muted px-2 py-1 rounded-full">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleShare(tip, 'tip')}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleSave(tip, 'tip')}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleLike(tip, 'tip')}>
                          <ThumbsUp className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button variant="outline" onClick={() => setSelectedTip(tip)}>
                        Ver mais detalhes
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                Inspiração Personalizada
              </CardTitle>
              <CardDescription>
                Descubra insights e ideias personalizadas para seu negócio
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Recomendado para você</h3>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-primary bg-primary/10 py-1 px-2 rounded-full inline-block">
                        Tendência
                      </div>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium">Economia de Tokens: Nova Fronteira no Digital</h4>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Como empresas estão tokenizando ativos e criando novos modelos de negócio baseados em blockchain.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Ler mais</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Popular no seu setor</h3>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-primary bg-primary/10 py-1 px-2 rounded-full inline-block">
                        Caso de Sucesso
                      </div>
                      <ThumbsUp className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium">De Local a Global: História da TechBrasil</h4>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Como uma pequena empresa de software do interior do Brasil conquistou clientes em 15 países.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Ler mais</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">Novidades</h3>
                  <div className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-xs font-medium text-primary bg-primary/10 py-1 px-2 rounded-full inline-block">
                        Metodologia
                      </div>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <h4 className="font-medium">Framework de Inovação Distribuída</h4>
                    <p className="text-xs text-muted-foreground mt-1 mb-2">
                      Nova metodologia que permite times globais colaborarem em inovação de forma assíncrona e eficiente.
                    </p>
                    <Button size="sm" variant="outline" className="w-full">Ler mais</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Success Story Dialog */}
          <Dialog open={selectedStory !== null} onOpenChange={(open) => !open && setSelectedStory(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              {selectedStory && (
                <>
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xs font-medium text-primary bg-primary/10 py-1 px-2 rounded-full inline-block mb-1">
                          {selectedStory.industry}
                        </div>
                        <DialogTitle className="text-xl">{selectedStory.title}</DialogTitle>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleShare(selectedStory, 'story')}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleSave(selectedStory, 'story')}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <DialogDescription className="mt-2">
                      {selectedStory.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div>
                    <img 
                      src={selectedStory.image} 
                      alt={selectedStory.title} 
                      className="w-full h-64 object-cover rounded-md mb-4" 
                    />
                    
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {Object.entries(selectedStory.metrics).map(([key, value]) => (
                        <div key={key} className="p-3 border rounded-lg text-center">
                          <p className="text-xs text-muted-foreground">{key.replace('_', ' ')}</p>
                          <p className="text-lg font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-base font-medium mb-2">Desafios</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedStory.challenges.map((challenge, idx) => (
                            <li key={idx} className="text-sm">{challenge}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2">Estratégias</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedStory.strategies.map((strategy, idx) => (
                            <li key={idx} className="text-sm">{strategy}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2">Resultados</h3>
                        <p className="text-sm">{selectedStory.results}</p>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          Principais Aprendizados
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-sm">A digitalização, mesmo com recursos limitados, pode trazer resultados expressivos.</li>
                          <li className="text-sm">Implementação gradual facilita a adaptação da equipe e clientes.</li>
                          <li className="text-sm">A combinação de canais online e experiência local cria diferencial competitivo.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
          
          {/* Market Trend Dialog */}
          <Dialog open={selectedTrend !== null} onOpenChange={(open) => !open && setSelectedTrend(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              {selectedTrend && (
                <>
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-xl">{selectedTrend.title}</DialogTitle>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleShare(selectedTrend, 'trend')}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleSave(selectedTrend, 'trend')}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <DialogDescription className="mt-2">
                      {selectedTrend.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div>
                    <img 
                      src={selectedTrend.image} 
                      alt={selectedTrend.title} 
                      className="w-full h-64 object-cover rounded-md mb-4" 
                    />
                    
                    <div className="grid grid-cols-2 gap-3 mb-5">
                      {Object.entries(selectedTrend.stats).map(([key, value]) => (
                        <div key={key} className="p-3 border rounded-lg text-center">
                          <p className="text-xs text-muted-foreground">{key.replace('_', ' ')}</p>
                          <p className="text-lg font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-5">
                      <Alert className="bg-muted/20">
                        <TrendingUp className="h-4 w-4" />
                        <AlertDescription>
                          <span className="font-medium">Previsão: </span>
                          {selectedTrend.prediction}
                        </AlertDescription>
                      </Alert>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2">Impacto Potencial</h3>
                        <p className="text-sm">{selectedTrend.impact}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2">Oportunidades</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedTrend.opportunities.map((opportunity, idx) => (
                            <li key={idx} className="text-sm">{opportunity}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          Como se Preparar
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-sm">Monitore os principais players e startups nesse espaço.</li>
                          <li className="text-sm">Avalie a relevância da tendência para seu modelo de negócio específico.</li>
                          <li className="text-sm">Considere projetos piloto de baixo investimento para testar o conceito.</li>
                          <li className="text-sm">Busque parcerias estratégicas com empresas tecnologia que já estejam implementando soluções nessa área.</li>
                        </ul>
                      </div>
                      
                      <div className="border p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Recursos Adicionais</h3>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <ul className="space-y-2">
                          <li className="text-sm text-primary underline">Relatório Completo sobre a Tendência</li>
                          <li className="text-sm text-primary underline">Webinar com Especialistas do Setor</li>
                          <li className="text-sm text-primary underline">Casos de Implementação Bem-sucedida</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
          
          {/* Collaboration Tip Dialog */}
          <Dialog open={selectedTip !== null} onOpenChange={(open) => !open && setSelectedTip(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              {selectedTip && (
                <>
                  <DialogHeader>
                    <div className="flex items-center justify-between">
                      <DialogTitle className="text-xl">{selectedTip.title}</DialogTitle>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleShare(selectedTip, 'tip')}>
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleSave(selectedTip, 'tip')}>
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <DialogDescription className="mt-2">
                      {selectedTip.description}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div>
                    <img 
                      src={selectedTip.image} 
                      alt={selectedTip.title} 
                      className="w-full h-64 object-cover rounded-md mb-4" 
                    />
                    
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-base font-medium mb-2">Benefícios</h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedTip.benefits.map((benefit, idx) => (
                            <li key={idx} className="text-sm">{benefit}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2">Passos para Implementação</h3>
                        <ol className="list-decimal pl-5 space-y-2">
                          {selectedTip.steps.map((step, idx) => (
                            <li key={idx} className="text-sm">{step}</li>
                          ))}
                        </ol>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-medium mb-2">Ferramentas Recomendadas</h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedTip.tools.map((tool, idx) => (
                            <div key={idx} className="bg-muted px-3 py-1.5 rounded-full text-sm">
                              {tool}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-muted/20 p-4 rounded-lg">
                        <h3 className="text-sm font-medium mb-2 flex items-center gap-1">
                          <Lightbulb className="h-4 w-4 text-amber-500" />
                          Dicas Práticas
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                          <li className="text-sm">Comece com um projeto piloto pequeno e controlado.</li>
                          <li className="text-sm">Garanta patrocínio de lideranças para facilitar a adoção.</li>
                          <li className="text-sm">Documente boas práticas e lições aprendidas desde o início.</li>
                          <li className="text-sm">Estabeleça métricas claras para avaliar o sucesso da iniciativa.</li>
                        </ul>
                      </div>
                      
                      <div className="border p-3 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-sm font-medium">Exemplos Práticos</h3>
                          <ExternalLink className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <ul className="space-y-2">
                          <li className="text-sm text-primary underline">Caso de Estudo: Implementação em Empresa de Tecnologia</li>
                          <li className="text-sm text-primary underline">Template de Planejamento para Download</li>
                          <li className="text-sm text-primary underline">Vídeo: Workshop Prático Passo a Passo</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
