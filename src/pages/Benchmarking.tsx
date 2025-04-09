
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, BarChartIcon, ArrowUpRight, ArrowDownRight, Users, Target, Building, Globe, TrendingUp } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';

const Benchmarking = () => {
  const { currentSegment, segmentName } = useSegment();
  const [timeRange, setTimeRange] = useState('month');
  const [category, setCategory] = useState('performance');
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart size={18} />
    },
    {
      name: 'Benchmarking',
      href: '/benchmarking',
      icon: <BarChartIcon size={18} />
    },
    {
      name: 'Simulador',
      href: '/simulator',
      icon: <Target size={18} />
    }
  ];

  // Benchmarking data specific to segment
  const benchmarkData = {
    performance: [
      { metric: 'ROI', value: 18.5, average: 15.2, isAbove: true },
      { metric: 'Crescimento', value: 12.3, average: 8.7, isAbove: true },
      { metric: 'Retenção de Clientes', value: 85, average: 78, isAbove: true },
      { metric: 'Conversão', value: 3.2, average: 4.1, isAbove: false },
      { metric: 'Produtividade', value: 92, average: 87, isAbove: true },
    ],
    operational: [
      { metric: 'Tempo de Resposta', value: 1.8, average: 2.3, isAbove: true },
      { metric: 'Rotatividade', value: 12, average: 15, isAbove: true },
      { metric: 'Utilização de Recursos', value: 78, average: 82, isAbove: false },
      { metric: 'Redução de Custos', value: 8.5, average: 6.2, isAbove: true },
      { metric: 'Tempo de Produção', value: 14, average: 18, isAbove: true },
    ],
    innovation: [
      { metric: 'Novos Produtos', value: 5, average: 3, isAbove: true },
      { metric: 'P&D', value: 12, average: 15, isAbove: false },
      { metric: 'Tempo de Lançamento', value: 60, average: 75, isAbove: true },
      { metric: 'Taxa de Adoção', value: 42, average: 38, isAbove: true },
      { metric: 'Patentes', value: 2, average: 4, isAbove: false },
    ],
  };

  const marketLeaders = [
    { name: "Empresa Líder 1", market: "Regional", strength: "Inovação", growth: 22 },
    { name: "Empresa Líder 2", market: "Nacional", strength: "Marketing", growth: 18 },
    { name: "Empresa Líder 3", market: "Global", strength: "Qualidade", growth: 15 },
    { name: "Empresa Líder 4", market: "Nacional", strength: "Preço", growth: 13 },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <PageHeader
            title="Benchmarking por Segmento"
            description={`Compare o desempenho da sua empresa com outras do segmento: ${segmentName}`}
            icon={<BarChartIcon size={24} />}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Users className="mr-2 h-5 w-5 text-muted-foreground" />
                  Comparativo com o Mercado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">74<span className="text-sm font-normal text-muted-foreground">/100</span></div>
                <p className="text-xs text-muted-foreground">Sua pontuação em relação ao mercado</p>
                <Progress value={74} className="h-2 mt-2" />
                <div className="mt-4 flex justify-between text-xs">
                  <span>Abaixo da média</span>
                  <span>Média do setor</span>
                  <span>Acima da média</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Building className="mr-2 h-5 w-5 text-muted-foreground" />
                  Posição no Setor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">Top 27%</div>
                <p className="text-xs text-muted-foreground">Sua empresa está entre as melhores</p>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-xl font-semibold">32</div>
                    <div className="text-xs text-muted-foreground">Total empresas</div>
                  </div>
                  <div className="bg-primary/10 p-2 rounded-md">
                    <div className="text-xl font-semibold">9°</div>
                    <div className="text-xs text-muted-foreground">Sua posição</div>
                  </div>
                  <div className="bg-muted p-2 rounded-md">
                    <div className="text-xl font-semibold">18%</div>
                    <div className="text-xs text-muted-foreground">Crescimento</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Globe className="mr-2 h-5 w-5 text-muted-foreground" />
                  Tendências do Mercado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Crescimento do Setor</span>
                    <span className="text-sm font-medium flex items-center">
                      12.4% <ArrowUpRight size={14} className="ml-1 text-green-500" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Investimentos</span>
                    <span className="text-sm font-medium flex items-center">
                      8.7% <ArrowUpRight size={14} className="ml-1 text-green-500" />
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Margem Média</span>
                    <span className="text-sm font-medium flex items-center">
                      3.2% <ArrowDownRight size={14} className="ml-1 text-red-500" />
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="space-y-2">
              <Label>Intervalo de Tempo</Label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Último Mês</SelectItem>
                  <SelectItem value="quarter">Último Trimestre</SelectItem>
                  <SelectItem value="year">Último Ano</SelectItem>
                  <SelectItem value="all">Todo Histórico</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Download PDF
              </Button>
              <Button variant="outline" size="sm">
                Compartilhar
              </Button>
              <Button size="sm">
                <TrendingUp className="mr-2 h-4 w-4" />
                Comparar com Concorrentes
              </Button>
            </div>
          </div>

          <Tabs defaultValue="performance" className="mt-6">
            <TabsList>
              <TabsTrigger value="performance" onClick={() => setCategory('performance')}>Desempenho</TabsTrigger>
              <TabsTrigger value="operational" onClick={() => setCategory('operational')}>Operacional</TabsTrigger>
              <TabsTrigger value="innovation" onClick={() => setCategory('innovation')}>Inovação</TabsTrigger>
              <TabsTrigger value="leaders">Líderes de Mercado</TabsTrigger>
            </TabsList>
            
            <TabsContent value="performance" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Desempenho</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {benchmarkData.performance.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span>{item.metric}</span>
                        <div className="flex items-center">
                          <span className={item.isAbove ? "text-green-600" : "text-red-600"}>
                            {item.value}%
                            {item.isAbove ? 
                              <ArrowUpRight size={14} className="inline ml-1" /> : 
                              <ArrowDownRight size={14} className="inline ml-1" />}
                          </span>
                          <span className="text-muted-foreground text-xs ml-2">
                            vs {item.average}% (média)
                          </span>
                        </div>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="operational" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas Operacionais</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {benchmarkData.operational.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span>{item.metric}</span>
                        <div className="flex items-center">
                          <span className={item.isAbove ? "text-green-600" : "text-red-600"}>
                            {item.value}%
                            {item.isAbove ? 
                              <ArrowUpRight size={14} className="inline ml-1" /> : 
                              <ArrowDownRight size={14} className="inline ml-1" />}
                          </span>
                          <span className="text-muted-foreground text-xs ml-2">
                            vs {item.average}% (média)
                          </span>
                        </div>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="innovation" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Métricas de Inovação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {benchmarkData.innovation.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-1">
                        <span>{item.metric}</span>
                        <div className="flex items-center">
                          <span className={item.isAbove ? "text-green-600" : "text-red-600"}>
                            {item.value}%
                            {item.isAbove ? 
                              <ArrowUpRight size={14} className="inline ml-1" /> : 
                              <ArrowDownRight size={14} className="inline ml-1" />}
                          </span>
                          <span className="text-muted-foreground text-xs ml-2">
                            vs {item.average}% (média)
                          </span>
                        </div>
                      </div>
                      <Progress value={item.value} className="h-2" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="leaders" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Líderes do Mercado - {segmentName}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Empresa</th>
                          <th className="text-left p-2">Mercado</th>
                          <th className="text-left p-2">Ponto Forte</th>
                          <th className="text-left p-2">Crescimento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marketLeaders.map((leader, i) => (
                          <tr key={i} className="border-b">
                            <td className="p-2 font-medium">{leader.name}</td>
                            <td className="p-2">{leader.market}</td>
                            <td className="p-2">{leader.strength}</td>
                            <td className="p-2">
                              <div className="flex items-center">
                                {leader.growth}% 
                                <ArrowUpRight size={14} className="ml-1 text-green-500" />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full">
                      Ver Análise Detalhada
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Benchmarking;
