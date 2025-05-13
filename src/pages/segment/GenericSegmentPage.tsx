
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageContainer } from '@/components/PageContainer';
import { useSegment } from '@/contexts/SegmentContext';
import { Helmet } from 'react-helmet-async';
import { Package, Settings, FileText, User, Calendar, Star, 
  Briefcase, Truck, ShoppingCart, Users, CreditCard, BarChart, 
  ClipboardCheck, MessageCircle, Building2, Layers } from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const GenericSegmentPage: React.FC = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const { segmentActivities, currentSegment, segmentName } = useSegment();
  const navigate = useNavigate();
  const [currentActivity, setCurrentActivity] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();

  useEffect(() => {
    // Find matching activity
    const activity = segmentActivities.find(act => {
      const path = act.path.split('/').pop();
      return path === pageId;
    });

    if (activity) {
      setCurrentActivity(activity);
      setIsLoading(false);
    } else {
      // If no matching activity is found, redirect to dashboard
      toast({
        title: "Página não encontrada",
        description: "A página solicitada não foi encontrada para este segmento.",
        variant: "destructive"
      });
      navigate('/dashboard', { replace: true });
    }
  }, [pageId, segmentActivities, navigate, toast]);

  // Helper function to get icon for the page
  const getPageIcon = (iconName: string) => {
    switch (iconName) {
      case 'package': return <Package className="h-10 w-10" />;
      case 'shopping-cart': return <ShoppingCart className="h-10 w-10" />;
      case 'list-ordered': return <FileText className="h-10 w-10" />;
      case 'users': return <Users className="h-10 w-10" />;
      case 'user-plus': return <User className="h-10 w-10" />;
      case 'calendar': 
      case 'calendar-check': return <Calendar className="h-10 w-10" />;
      case 'star': 
      case 'award': return <Star className="h-10 w-10" />;
      case 'wrench': 
      case 'settings': return <Settings className="h-10 w-10" />;
      case 'truck': return <Truck className="h-10 w-10" />;
      case 'briefcase': return <Briefcase className="h-10 w-10" />;
      case 'credit-card': return <CreditCard className="h-10 w-10" />;
      case 'chart-bar': return <BarChart className="h-10 w-10" />;
      case 'clipboard-list': 
      case 'clipboard-check': return <ClipboardCheck className="h-10 w-10" />;
      case 'message-square': return <MessageCircle className="h-10 w-10" />;
      case 'building': 
      case 'building2': return <Building2 className="h-10 w-10" />;
      case 'layout-grid':
      case 'grid-2x2': return <Layers className="h-10 w-10" />;
      default: return <FileText className="h-10 w-10" />;
    }
  };

  // Render specific content based on segment and pageId
  const renderSegmentSpecificContent = () => {
    if (!currentActivity) return null;
    
    // Industrial segment pages
    if (currentSegment === 'manufacturing') {
      switch(pageId) {
        case 'inventory':
          return (
            <div className="space-y-6">
              <Tabs defaultValue="stock">
                <TabsList className="mb-4">
                  <TabsTrigger value="stock">Estoque atual</TabsTrigger>
                  <TabsTrigger value="movements">Movimentações</TabsTrigger>
                  <TabsTrigger value="categories">Categorias</TabsTrigger>
                </TabsList>
                
                <TabsContent value="stock" className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Itens em estoque</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Exportar</Button>
                      <Button size="sm">+ Novo Item</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-background">
                    <div className="grid grid-cols-5 gap-4 font-medium text-sm border-b pb-2 mb-2">
                      <div>Código</div>
                      <div>Descrição</div>
                      <div>Quantidade</div>
                      <div>Localização</div>
                      <div>Ações</div>
                    </div>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="grid grid-cols-5 gap-4 text-sm py-2 border-b">
                        <div>MP-{1000 + item}</div>
                        <div>Matéria prima tipo {item}</div>
                        <div>{Math.floor(Math.random() * 100) + 10} unids</div>
                        <div>Prateleira {String.fromCharCode(64 + item)}</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Editar</Button>
                          <Button size="sm" variant="ghost">Movimentar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="movements" className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Movimentações recentes</h3>
                    <div>
                      <Button size="sm">Nova movimentação</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-background">
                    <div className="grid grid-cols-5 gap-4 font-medium text-sm border-b pb-2 mb-2">
                      <div>Data</div>
                      <div>Item</div>
                      <div>Tipo</div>
                      <div>Quantidade</div>
                      <div>Responsável</div>
                    </div>
                    {[1, 2, 3, 4, 5].map((item) => {
                      const isEntry = item % 2 === 0;
                      return (
                        <div key={item} className="grid grid-cols-5 gap-4 text-sm py-2 border-b">
                          <div>{new Date().toLocaleDateString()}</div>
                          <div>MP-{1000 + Math.floor(Math.random() * 5)}</div>
                          <div className={isEntry ? "text-green-600" : "text-amber-600"}>
                            {isEntry ? "Entrada" : "Saída"}
                          </div>
                          <div>{Math.floor(Math.random() * 10) + 5} unids</div>
                          <div>Operador {item}</div>
                        </div>
                      );
                    })}
                  </div>
                </TabsContent>
                
                <TabsContent value="categories" className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Categorias de produtos</h3>
                    <div>
                      <Button size="sm">Nova categoria</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Matéria-prima", "Produtos acabados", "Embalagens", "Equipamentos", "Manutenção", "Outros"].map((category) => (
                      <Card key={category}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{category}</CardTitle>
                          <CardDescription>12 itens cadastrados</CardDescription>
                        </CardHeader>
                        <CardFooter>
                          <Button variant="ghost" size="sm">Gerenciar</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          );
        
        case 'production-orders':
          return (
            <div className="space-y-6">
              <Tabs defaultValue="active">
                <TabsList className="mb-4">
                  <TabsTrigger value="active">Ordens ativas</TabsTrigger>
                  <TabsTrigger value="planning">Planejamento</TabsTrigger>
                  <TabsTrigger value="history">Histórico</TabsTrigger>
                </TabsList>
                
                <TabsContent value="active" className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Ordens de produção ativas</h3>
                    <div>
                      <Button size="sm">Nova ordem</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[1, 2, 3].map((order) => (
                      <Card key={order}>
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle>Ordem #OP-{2023000 + order}</CardTitle>
                            <Button variant="outline" size="sm">Atualizar status</Button>
                          </div>
                          <div className="flex justify-between text-sm">
                            <CardDescription>Produto: Modelo XYZ-{order * 100}</CardDescription>
                            <span className="bg-amber-100 text-amber-800 px-2 rounded text-xs font-medium py-1">
                              {order === 1 ? "Em produção" : order === 2 ? "Aguardando materiais" : "Planejada"}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <div className="text-muted-foreground">Quantidade</div>
                              <div className="font-medium">{order * 120} unidades</div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Início</div>
                              <div className="font-medium">
                                {new Date(2023, 5 + order, 10 + order).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Conclusão</div>
                              <div className="font-medium">
                                {new Date(2023, 5 + order, 20 + order).toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <div className="text-muted-foreground">Responsável</div>
                              <div className="font-medium">Supervisor {order}</div>
                            </div>
                          </div>
                          <div className="mt-4 pt-2 border-t">
                            <div className="text-muted-foreground text-sm mb-1">Progresso</div>
                            <div className="w-full bg-muted rounded-full h-2.5">
                              <div className="bg-primary h-2.5 rounded-full" style={{
                                width: order === 1 ? '45%' : order === 2 ? '20%' : '5%'
                              }}></div>
                            </div>
                            <div className="text-xs text-right mt-1">
                              {order === 1 ? '45%' : order === 2 ? '20%' : '5%'}
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="w-full flex justify-between gap-2">
                            <Button variant="outline" size="sm">Ver detalhes</Button>
                            <Button variant="outline" size="sm">Apontar produção</Button>
                            <Button variant="ghost" size="sm">Anexos</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="planning" className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Planejamento de produção</h3>
                    <div>
                      <Button size="sm">Novo planejamento</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-background">
                    <h4 className="font-medium mb-2">Capacidade produtiva</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Linha 1</CardTitle>
                          <CardDescription>85% de ocupação</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-amber-500 h-2.5 rounded-full" style={{width: '85%'}}></div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Linha 2</CardTitle>
                          <CardDescription>60% de ocupação</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-green-500 h-2.5 rounded-full" style={{width: '60%'}}></div>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">Linha 3</CardTitle>
                          <CardDescription>95% de ocupação</CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div className="bg-red-500 h-2.5 rounded-full" style={{width: '95%'}}></div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <h4 className="font-medium mb-2">Próximas produções</h4>
                    <div className="border rounded-md">
                      <div className="grid grid-cols-5 gap-4 font-medium text-sm border-b p-3">
                        <div>Produto</div>
                        <div>Linha</div>
                        <div>Início</div>
                        <div>Qtde</div>
                        <div>Status</div>
                      </div>
                      {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="grid grid-cols-5 gap-4 text-sm p-3 border-b">
                          <div>Produto {item * 100}</div>
                          <div>Linha {(item % 3) + 1}</div>
                          <div>{new Date(2023, 6, 10 + item).toLocaleDateString()}</div>
                          <div>{item * 50} unidades</div>
                          <div>
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                              Planejado
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history">
                  <div className="border rounded-md p-4 bg-background">
                    <div className="flex justify-between mb-4">
                      <h3 className="font-medium">Histórico de produção</h3>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">Filtrar</Button>
                        <Button variant="outline" size="sm">Exportar</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md">
                      <div className="grid grid-cols-6 gap-4 font-medium text-sm border-b p-3">
                        <div>Ordem</div>
                        <div>Produto</div>
                        <div>Quantidade</div>
                        <div>Conclusão</div>
                        <div>Eficiência</div>
                        <div>Status</div>
                      </div>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="grid grid-cols-6 gap-4 text-sm p-3 border-b">
                          <div>OP-{202200 + item}</div>
                          <div>Produto {item * 100}</div>
                          <div>{item * 100} unidades</div>
                          <div>{new Date(2023, 4, item * 5).toLocaleDateString()}</div>
                          <div>{90 + (item % 10)}%</div>
                          <div>
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                              Concluído
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          );
          
        // Additional manufacturing segment pages could be added here
        
        default:
          return (
            <div className="p-6 text-center bg-muted/20 rounded-lg">
              <p>Funcionalidade específica para {currentActivity.title} no segmento de {segmentName} será implementada em breve.</p>
              <Button className="mt-4">Solicitar implementação</Button>
            </div>
          );
      }
    }
    
    // Education segment pages
    else if (currentSegment === 'education') {
      switch(pageId) {
        case 'students':
          return (
            <div className="space-y-6">
              <Tabs defaultValue="list">
                <TabsList className="mb-4">
                  <TabsTrigger value="list">Lista de Alunos</TabsTrigger>
                  <TabsTrigger value="enrollment">Matrículas</TabsTrigger>
                  <TabsTrigger value="reports">Relatórios</TabsTrigger>
                </TabsList>
                
                <TabsContent value="list" className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Alunos matriculados</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Filtrar</Button>
                      <Button size="sm">+ Novo Aluno</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-background">
                    <div className="grid grid-cols-6 gap-4 font-medium text-sm border-b pb-2 mb-2">
                      <div>Matrícula</div>
                      <div>Nome</div>
                      <div>Turma</div>
                      <div>Situação</div>
                      <div>Contato</div>
                      <div>Ações</div>
                    </div>
                    {[1, 2, 3, 4, 5].map((item) => (
                      <div key={item} className="grid grid-cols-6 gap-4 text-sm py-2 border-b">
                        <div>2023{item.toString().padStart(4, '0')}</div>
                        <div>Estudante {item}</div>
                        <div>{['1º A', '2º B', '3º A', '4º C', '5º B'][item-1]}</div>
                        <div>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${
                            item % 3 === 0 ? 'bg-amber-100 text-amber-800' : 
                            'bg-green-100 text-green-800'
                          }`}>
                            {item % 3 === 0 ? 'Pendência' : 'Regular'}
                          </span>
                        </div>
                        <div>(11) 9{Math.floor(Math.random() * 9000) + 1000}-{Math.floor(Math.random() * 9000) + 1000}</div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="ghost">Visualizar</Button>
                          <Button size="sm" variant="ghost">Editar</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                <TabsContent value="enrollment" className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Processo de matrícula</h3>
                    <div>
                      <Button size="sm">Nova matrícula</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Novas matrículas</CardTitle>
                        <CardDescription>Período letivo 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">127</div>
                        <p className="text-sm text-muted-foreground">+12% em relação ao período anterior</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">Ver detalhes</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Renovações</CardTitle>
                        <CardDescription>Período letivo 2023</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">342</div>
                        <p className="text-sm text-muted-foreground">95% de taxa de renovação</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">Ver detalhes</Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Matrículas pendentes</CardTitle>
                        <CardDescription>Documentação incompleta</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">18</div>
                        <p className="text-sm text-muted-foreground">Necessitam de acompanhamento</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" size="sm">Ver pendências</Button>
                      </CardFooter>
                    </Card>
                  </div>
                  
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle>Matrículas recentes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((item) => (
                          <div key={item} className="flex justify-between border-b pb-2">
                            <div>
                              <div className="font-medium">Estudante {item + 10}</div>
                              <div className="text-sm text-muted-foreground">
                                Matrícula: {new Date().toLocaleDateString()}
                              </div>
                            </div>
                            <div>
                              <Button size="sm" variant="outline">Detalhes</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="reports">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Matrículas por série</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] flex items-end gap-2">
                          {[65, 72, 58, 45, 50].map((value, i) => (
                            <div 
                              key={i} 
                              className="bg-primary/80 rounded-t w-full"
                              style={{ height: `${value}%` }}
                            >
                              <div className="text-center text-xs font-medium pt-2">
                                {value}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <div>1º Ano</div>
                          <div>2º Ano</div>
                          <div>3º Ano</div>
                          <div>4º Ano</div>
                          <div>5º Ano</div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle>Distribuição por gênero</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-center space-x-8 h-[200px] items-center">
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/20 mb-2">
                              <div className="text-lg font-bold">48%</div>
                            </div>
                            <div>Feminino</div>
                          </div>
                          <div className="text-center">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary mb-2 text-white">
                              <div className="text-lg font-bold">52%</div>
                            </div>
                            <div>Masculino</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="md:col-span-2">
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Relatório de retenção</CardTitle>
                          <CardDescription>Taxa de retenção de alunos por período</CardDescription>
                        </div>
                        <Button variant="outline" size="sm">Exportar</Button>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[200px] flex items-end gap-2">
                          {[92, 89, 94, 91, 95].map((value, i) => (
                            <div key={i} className="relative flex flex-col items-center">
                              <div 
                                className={`bg-primary/80 rounded-t w-12`}
                                style={{ height: `${value * 2}px` }}
                              ></div>
                              <div className="mt-2 text-sm font-medium">
                                {value}%
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {2019 + i}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          );

        // Additional education segment pages could be added here
        
        default:
          return (
            <div className="p-6 text-center bg-muted/20 rounded-lg">
              <p>Funcionalidade específica para {currentActivity.title} no segmento de {segmentName} será implementada em breve.</p>
              <Button className="mt-4">Solicitar implementação</Button>
            </div>
          );
      }
    }
    
    // Health segment pages
    else if (currentSegment === 'health') {
      switch(pageId) {
        case 'patients':
          return (
            <div className="space-y-6">
              <Tabs defaultValue="registry">
                <TabsList className="mb-4">
                  <TabsTrigger value="registry">Cadastro</TabsTrigger>
                  <TabsTrigger value="history">Histórico</TabsTrigger>
                  <TabsTrigger value="insurance">Convênios</TabsTrigger>
                </TabsList>
                
                <TabsContent value="registry" className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Pacientes cadastrados</h3>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Importar</Button>
                      <Button size="sm">+ Novo Paciente</Button>
                    </div>
                  </div>
                  
                  <div className="bg-muted/10 p-4 rounded-lg border">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <Button variant="outline" size="sm">Todos</Button>
                      <Button variant="secondary" size="sm">Atendimento hoje</Button>
                      <Button variant="outline" size="sm">Agendados</Button>
                      <Button variant="outline" size="sm">Conveniados</Button>
                      <Button variant="outline" size="sm">Particulares</Button>
                    </div>
                    
                    <div className="border rounded-md bg-background">
                      <div className="grid grid-cols-6 gap-4 font-medium text-sm border-b p-3">
                        <div>Prontuário</div>
                        <div>Nome</div>
                        <div>Data Nasc.</div>
                        <div>Convênio</div>
                        <div>Última visita</div>
                        <div>Ações</div>
                      </div>
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="grid grid-cols-6 gap-4 text-sm p-3 border-b">
                          <div>P-{10000 + item}</div>
                          <div>Paciente {item}</div>
                          <div>{new Date(1980 + item, item, item * 3).toLocaleDateString()}</div>
                          <div>{item % 2 === 0 ? 'Plano Saúde Plus' : 'Particular'}</div>
                          <div>{new Date(2023, 4, item * 2).toLocaleDateString()}</div>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost">
                              <FileText className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <Calendar className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost">
                              <User className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="history" className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Histórico de atendimentos</h3>
                    <div>
                      <Button variant="outline" size="sm">Exportar</Button>
                    </div>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6" />
                        </div>
                        <div>
                          <CardTitle>Paciente 1</CardTitle>
                          <CardDescription>P-10001 • 43 anos • Plano Saúde Plus</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {[1, 2, 3].map((visit) => (
                          <div key={visit} className="border-l-2 border-primary pl-4 pb-4">
                            <div className="flex justify-between">
                              <div className="font-medium">
                                Consulta em {new Date(2023, 5 - visit, 10).toLocaleDateString()}
                              </div>
                              <Button size="sm" variant="ghost">Expandir</Button>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              Dr. Roberto Silva • Clínico Geral
                            </div>
                            <div className="mt-2 text-sm">
                              {visit === 1 ? 
                                "Paciente relatou sintomas de gripe. Medicação prescrita e recomendado repouso." : 
                                "Consulta de acompanhamento. Sintomas em resolução."}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="insurance" className="space-y-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium">Convênios cadastrados</h3>
                    <div>
                      <Button size="sm">Novo convênio</Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {["Plano Saúde Plus", "MediVida", "Saúde Total", "UniMed", "Vida Plena"].map((plan, i) => (
                      <Card key={plan}>
                        <CardHeader>
                          <CardTitle className="text-base">{plan}</CardTitle>
                          <CardDescription>
                            {i * 12 + 25} pacientes vinculados
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="text-sm">
                          <div className="flex justify-between mt-2 pb-2 border-b">
                            <div className="text-muted-foreground">Status</div>
                            <div className="font-medium">Ativo</div>
                          </div>
                          <div className="flex justify-between mt-2 pb-2 border-b">
                            <div className="text-muted-foreground">Forma de faturamento</div>
                            <div className="font-medium">TISS</div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <div className="text-muted-foreground">Prazo de pagamento</div>
                            <div className="font-medium">30 dias</div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <div className="w-full flex justify-between">
                            <Button variant="outline" size="sm">Editar</Button>
                            <Button variant="outline" size="sm">Ver pacientes</Button>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          );

        // Additional health segment pages could be added here
        
        default:
          return (
            <div className="p-6 text-center bg-muted/20 rounded-lg">
              <p>Funcionalidade específica para {currentActivity.title} no segmento de {segmentName} será implementada em breve.</p>
              <Button className="mt-4">Solicitar implementação</Button>
            </div>
          );
      }
    }
    
    // For other segments or activities, display the default content
    return (
      <div className="p-6 text-center bg-muted/20 rounded-lg">
        <p>Funcionalidade específica para {currentActivity.title} no segmento de {segmentName} será implementada em breve.</p>
        <Button className="mt-4">Solicitar implementação</Button>
      </div>
    );
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
            <Skeleton className="h-40" />
          </div>
          
          <Skeleton className="h-60" />
        </div>
      </PageContainer>
    );
  }

  if (!currentActivity) {
    return (
      <PageContainer>
        <div className="flex justify-center items-center h-[60vh]">
          <div className="text-center">
            <h2 className="text-xl font-medium mb-2">Página não encontrada</h2>
            <p className="text-muted-foreground">A atividade solicitada não está disponível neste segmento.</p>
            <Button className="mt-4" onClick={() => navigate('/dashboard')}>
              Voltar para o Dashboard
            </Button>
          </div>
        </div>
      </PageContainer>
    );
  }

  return (
    <>
      <Helmet>
        <title>{currentActivity.title} | {segmentName}</title>
      </Helmet>
      <PageContainer>
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary rounded-lg p-3">
              {getPageIcon(currentActivity.icon)}
            </div>
            <div>
              <h1 className="text-2xl font-bold">{currentActivity.title}</h1>
              <p className="text-muted-foreground">
                {currentActivity.description || `Gerenciamento de ${currentActivity.title.toLowerCase()} para o segmento de ${segmentName}`}
              </p>
            </div>
          </div>
          
          {/* Render segment-specific content */}
          {renderSegmentSpecificContent()}
          
        </div>
      </PageContainer>
    </>
  );
};

export default GenericSegmentPage;
