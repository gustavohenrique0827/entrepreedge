
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BarChart, BookOpen, Star, ArrowUpRight, Award, BookMarked, Heart, Share2, MessageSquare } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';
import { useToast } from '@/hooks/use-toast';

const Inspiration = () => {
  const { currentSegment, segmentName } = useSegment();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState(currentSegment === 'generic' ? 'all' : currentSegment);
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart size={18} />
    },
    {
      name: 'Inspiração',
      href: '/inspiration',
      icon: <BookOpen size={18} />
    },
  ];

  // Sample success stories data
  const successStories = [
    {
      id: 1,
      title: 'Transformação digital completa em 6 meses',
      company: 'Agro Tech Solutions',
      segment: 'agro',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=500&h=350&fit=crop',
      logo: 'https://via.placeholder.com/150',
      excerpt: 'Como uma empresa agrícola tradicional transformou seus processos com tecnologia e aumentou em 45% sua produtividade.',
      featured: true,
      tags: ['transformação digital', 'produtividade', 'automação'],
      metrics: {
        growthPercent: 45,
        timeline: '6 meses',
        roi: '320%'
      },
      author: {
        name: 'João Silva',
        role: 'CEO',
        avatar: 'https://i.pravatar.cc/150?img=1'
      }
    },
    {
      id: 2,
      title: 'Expansão para 5 novos mercados com estratégia omnichannel',
      company: 'MegaStore e-Commerce',
      segment: 'ecommerce',
      image: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=500&h=350&fit=crop',
      logo: 'https://via.placeholder.com/150',
      excerpt: 'Estratégia de expansão para novos mercados utilizando integração de canais e análise de dados de clientes.',
      featured: true,
      tags: ['expansão', 'omnichannel', 'análise de dados'],
      metrics: {
        growthPercent: 78,
        timeline: '12 meses',
        roi: '215%'
      },
      author: {
        name: 'Maria Oliveira',
        role: 'COO',
        avatar: 'https://i.pravatar.cc/150?img=5'
      }
    },
    {
      id: 3,
      title: 'Redução de custos operacionais em 30% com IA',
      company: 'Clínica Saúde Total',
      segment: 'health',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&h=350&fit=crop',
      logo: 'https://via.placeholder.com/150',
      excerpt: 'Implementação de soluções de inteligência artificial para otimização de agenda e redução de custos administrativos.',
      featured: false,
      tags: ['IA', 'redução de custos', 'saúde'],
      metrics: {
        growthPercent: 30,
        timeline: '8 meses',
        roi: '180%'
      },
      author: {
        name: 'Dr. Carlos Santos',
        role: 'Diretor Médico',
        avatar: 'https://i.pravatar.cc/150?img=3'
      }
    },
    {
      id: 4,
      title: 'Aumento de 65% nas conversões com marketing personalizado',
      company: 'Fashion Forward',
      segment: 'fashion',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=350&fit=crop',
      logo: 'https://via.placeholder.com/150',
      excerpt: 'Estratégia de marketing personalizado baseada em comportamento do cliente e tendências sazonais.',
      featured: false,
      tags: ['marketing', 'personalização', 'conversão'],
      metrics: {
        growthPercent: 65,
        timeline: '4 meses',
        roi: '250%'
      },
      author: {
        name: 'Ana Cardoso',
        role: 'CMO',
        avatar: 'https://i.pravatar.cc/150?img=9'
      }
    },
    {
      id: 5,
      title: 'Implementação de ESG completa com resultados positivos',
      company: 'ServiTech Solutions',
      segment: 'services',
      image: 'https://images.unsplash.com/photo-1491156855053-9cdff72c7f85?w=500&h=350&fit=crop',
      logo: 'https://via.placeholder.com/150',
      excerpt: 'Como a implementação de práticas ESG melhorou a reputação da empresa e gerou economia de recursos.',
      featured: true,
      tags: ['ESG', 'sustentabilidade', 'reputação'],
      metrics: {
        growthPercent: 28,
        timeline: '18 meses',
        roi: '150%'
      },
      author: {
        name: 'Roberto Mendes',
        role: 'Diretor de Sustentabilidade',
        avatar: 'https://i.pravatar.cc/150?img=8'
      }
    }
  ];

  // Filter stories based on active tab
  const filteredStories = activeTab === 'all' 
    ? successStories 
    : successStories.filter(story => story.segment === activeTab);

  // Featured stories for the top carousel
  const featuredStories = successStories.filter(story => story.featured);

  const handleSaveStory = (id: number) => {
    toast({
      title: "Case salvo",
      description: "O case de sucesso foi salvo em sua biblioteca",
    });
  };

  const handleShareStory = (id: number) => {
    toast({
      title: "Link copiado",
      description: "O link para o case de sucesso foi copiado para a área de transferência",
    });
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <PageHeader
            title="Inspiração e Cases de Sucesso"
            description={`Histórias de sucesso e inspiração para empresas do segmento de ${segmentName}`}
            icon={<BookMarked size={24} />}
          />

          <div className="pb-6">
            <Card className="bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Star className="mr-2 h-5 w-5 text-yellow-500" /> 
                  Cases em Destaque
                </CardTitle>
                <CardDescription>
                  Histórias inspiradoras selecionadas para o seu segmento de atuação
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuredStories.map((story) => (
                    <Card key={story.id} className="flex flex-col h-full overflow-hidden">
                      <div className="relative h-40">
                        <img 
                          src={story.image} 
                          alt={story.title} 
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
                          <Badge className="absolute top-2 right-2 bg-primary">Destaque</Badge>
                          <h3 className="text-white text-lg font-semibold text-center">{story.title}</h3>
                        </div>
                      </div>
                      <CardContent className="py-4 flex-grow">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Avatar className="h-6 w-6 mr-2">
                              <AvatarImage src={story.author.avatar} />
                              <AvatarFallback>{story.author.name[0]}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm">{story.author.name}</span>
                          </div>
                          <Badge variant="outline">{story.segment === 'agro' ? 'Agronegócio' : 
                                                   story.segment === 'ecommerce' ? 'E-Commerce' : 
                                                   story.segment === 'health' ? 'Saúde' :
                                                   story.segment === 'fashion' ? 'Moda' :
                                                   story.segment === 'services' ? 'Serviços' : 'Outro'}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{story.excerpt}</p>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {story.tags.map((tag, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">{tag}</Badge>
                          ))}
                        </div>
                        <div className="grid grid-cols-3 gap-2 mt-4">
                          <div className="text-center p-2 bg-muted rounded-md">
                            <div className="text-lg font-semibold text-green-600">+{story.metrics.growthPercent}%</div>
                            <div className="text-xs text-muted-foreground">Crescimento</div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded-md">
                            <div className="text-lg font-semibold">{story.metrics.timeline}</div>
                            <div className="text-xs text-muted-foreground">Período</div>
                          </div>
                          <div className="text-center p-2 bg-muted rounded-md">
                            <div className="text-lg font-semibold text-primary">{story.metrics.roi}</div>
                            <div className="text-xs text-muted-foreground">ROI</div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <Button variant="outline" className="w-full">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Ler Case Completo
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue={activeTab} className="mt-6" onValueChange={setActiveTab}>
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="agro">Agronegócio</TabsTrigger>
                <TabsTrigger value="ecommerce">E-Commerce</TabsTrigger>
                <TabsTrigger value="health">Saúde</TabsTrigger>
                <TabsTrigger value="fashion">Moda</TabsTrigger>
                <TabsTrigger value="services">Serviços</TabsTrigger>
              </TabsList>
              
              <Button variant="outline" size="sm">
                <BookMarked className="mr-2 h-4 w-4" />
                Minha Biblioteca
              </Button>
            </div>

            <TabsContent value={activeTab} className="mt-0 space-y-4">
              {filteredStories.map((story) => (
                <Card key={story.id} className="overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="relative h-48 md:h-auto">
                      <img 
                        src={story.image} 
                        alt={story.title} 
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-2 p-6">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <Badge className="mb-2" variant="secondary">
                            {story.segment === 'agro' ? 'Agronegócio' : 
                             story.segment === 'ecommerce' ? 'E-Commerce' : 
                             story.segment === 'health' ? 'Saúde' :
                             story.segment === 'fashion' ? 'Moda' :
                             story.segment === 'services' ? 'Serviços' : 'Outro'}
                          </Badge>
                          <h3 className="text-xl font-semibold">{story.title}</h3>
                        </div>
                        {story.featured && (
                          <Award className="text-yellow-500" size={20} />
                        )}
                      </div>
                      <p className="text-muted-foreground mb-4">{story.excerpt}</p>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="text-center p-2 bg-muted rounded-md">
                          <div className="text-lg font-semibold text-green-600">+{story.metrics.growthPercent}%</div>
                          <div className="text-xs text-muted-foreground">Crescimento</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded-md">
                          <div className="text-lg font-semibold">{story.metrics.timeline}</div>
                          <div className="text-xs text-muted-foreground">Período</div>
                        </div>
                        <div className="text-center p-2 bg-muted rounded-md">
                          <div className="text-lg font-semibold text-primary">{story.metrics.roi}</div>
                          <div className="text-xs text-muted-foreground">ROI</div>
                        </div>
                      </div>
                      
                      <Separator className="my-4" />
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarImage src={story.author.avatar} />
                            <AvatarFallback>{story.author.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">{story.author.name}</div>
                            <div className="text-xs text-muted-foreground">{story.author.role}, {story.company}</div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="icon" onClick={() => handleSaveStory(story.id)}>
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleShareStory(story.id)}>
                            <Share2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MessageSquare className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" className="ml-2">
                            <BookOpen className="mr-2 h-4 w-4" />
                            Ler Completo
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Inspiration;
