
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Leaf, 
  Users, 
  ClipboardCheck, 
  Plus, 
  LineChart, 
  BarChart, 
  Target,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Trash2,
  Edit,
  Info,
  ChevronDown
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart as RechartsBarChart,
  Bar,
  Legend
} from 'recharts';
import { useToast } from "@/hooks/use-toast";
import { useSegment } from "@/contexts/SegmentContext";

type ESGIndicator = {
  id: number;
  name: string;
  category: 'environmental' | 'social' | 'governance';
  value: number;
  unit: string;
  target: number;
  description: string;
  history: { date: string; value: number }[];
  trend: 'up' | 'down' | 'stable';
  isGood: boolean; // Whether an increase is good (true) or bad (false)
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ESGIndicators = () => {
  const { toast } = useToast();
  const { segmentName } = useSegment();
  const [activeTab, setActiveTab] = useState('environmental');
  const [isAddIndicatorOpen, setIsAddIndicatorOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // New indicator state
  const [newIndicator, setNewIndicator] = useState<Omit<ESGIndicator, 'id' | 'history' | 'trend'>>({
    name: '',
    category: 'environmental',
    value: 0,
    unit: '%',
    target: 0,
    description: '',
    isGood: true
  });
  
  // Sample ESG indicators
  const [indicators, setIndicators] = useState<ESGIndicator[]>([
    {
      id: 1,
      name: 'Emissões de CO₂',
      category: 'environmental',
      value: 45,
      unit: 'toneladas',
      target: 30,
      description: 'Total de emissões de CO₂ da empresa',
      history: [
        { date: '2024-01', value: 60 },
        { date: '2024-02', value: 55 },
        { date: '2024-03', value: 50 },
        { date: '2024-04', value: 45 }
      ],
      trend: 'down',
      isGood: false
    },
    {
      id: 2,
      name: 'Consumo de Água',
      category: 'environmental',
      value: 12500,
      unit: 'litros',
      target: 10000,
      description: 'Consumo mensal de água',
      history: [
        { date: '2024-01', value: 14000 },
        { date: '2024-02', value: 13500 },
        { date: '2024-03', value: 13000 },
        { date: '2024-04', value: 12500 }
      ],
      trend: 'down',
      isGood: false
    },
    {
      id: 3,
      name: 'Uso de Energia Renovável',
      category: 'environmental',
      value: 35,
      unit: '%',
      target: 50,
      description: 'Percentual de energia renovável utilizada',
      history: [
        { date: '2024-01', value: 20 },
        { date: '2024-02', value: 25 },
        { date: '2024-03', value: 30 },
        { date: '2024-04', value: 35 }
      ],
      trend: 'up',
      isGood: true
    },
    {
      id: 4,
      name: 'Diversidade de Gênero',
      category: 'social',
      value: 42,
      unit: '%',
      target: 50,
      description: 'Percentual de mulheres na empresa',
      history: [
        { date: '2024-01', value: 35 },
        { date: '2024-02', value: 38 },
        { date: '2024-03', value: 40 },
        { date: '2024-04', value: 42 }
      ],
      trend: 'up',
      isGood: true
    },
    {
      id: 5,
      name: 'Investimento em Treinamento',
      category: 'social',
      value: 1200,
      unit: 'R$/funcionário',
      target: 1500,
      description: 'Investimento anual em treinamento por funcionário',
      history: [
        { date: '2024-01', value: 800 },
        { date: '2024-02', value: 900 },
        { date: '2024-03', value: 1000 },
        { date: '2024-04', value: 1200 }
      ],
      trend: 'up',
      isGood: true
    },
    {
      id: 6,
      name: 'Taxa de Rotatividade',
      category: 'social',
      value: 12,
      unit: '%',
      target: 8,
      description: 'Taxa anual de rotatividade de funcionários',
      history: [
        { date: '2024-01', value: 18 },
        { date: '2024-02', value: 16 },
        { date: '2024-03', value: 14 },
        { date: '2024-04', value: 12 }
      ],
      trend: 'down',
      isGood: false
    },
    {
      id: 7,
      name: 'Independência do Conselho',
      category: 'governance',
      value: 60,
      unit: '%',
      target: 75,
      description: 'Percentual de membros independentes no conselho',
      history: [
        { date: '2024-01', value: 50 },
        { date: '2024-02', value: 50 },
        { date: '2024-03', value: 55 },
        { date: '2024-04', value: 60 }
      ],
      trend: 'up',
      isGood: true
    },
    {
      id: 8,
      name: 'Transparência de Relatórios',
      category: 'governance',
      value: 80,
      unit: '%',
      target: 100,
      description: 'Índice de transparência em relatórios corporativos',
      history: [
        { date: '2024-01', value: 65 },
        { date: '2024-02', value: 70 },
        { date: '2024-03', value: 75 },
        { date: '2024-04', value: 80 }
      ],
      trend: 'up',
      isGood: true
    }
  ]);
  
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
  
  // Filter indicators based on active tab and search term
  const filteredIndicators = indicators.filter(indicator => 
    indicator.category === activeTab && 
    (searchTerm === '' || 
     indicator.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Calculate summary statistics
  const totalIndicators = indicators.length;
  const indicatorsByCategory = {
    environmental: indicators.filter(i => i.category === 'environmental').length,
    social: indicators.filter(i => i.category === 'social').length,
    governance: indicators.filter(i => i.category === 'governance').length
  };
  
  const onTargetIndicators = indicators.filter(i => i.value >= i.target).length;
  const onTargetPercentage = totalIndicators > 0 
    ? Math.round((onTargetIndicators / totalIndicators) * 100) 
    : 0;
  
  const positiveIndicators = indicators.filter(i => 
    (i.trend === 'up' && i.isGood) || (i.trend === 'down' && !i.isGood)
  ).length;
  
  const positivePercentage = totalIndicators > 0 
    ? Math.round((positiveIndicators / totalIndicators) * 100) 
    : 0;
  
  // Prepare data for category distribution chart
  const categoryData = [
    { name: 'Ambiental', value: indicatorsByCategory.environmental },
    { name: 'Social', value: indicatorsByCategory.social },
    { name: 'Governança', value: indicatorsByCategory.governance }
  ];
  
  // Prepare data for performance chart
  const performanceData = [
    { name: 'Dentro da Meta', value: onTargetIndicators },
    { name: 'Fora da Meta', value: totalIndicators - onTargetIndicators }
  ];
  
  // Prepare data for trend chart
  const trendData = [
    { 
      name: 'Positivo', 
      value: positiveIndicators 
    },
    { 
      name: 'Negativo', 
      value: totalIndicators - positiveIndicators 
    }
  ];
  
  // Handle adding a new indicator
  const handleAddIndicator = () => {
    if (!newIndicator.name || newIndicator.value === undefined || newIndicator.target === undefined) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }
    
    const id = indicators.length > 0 ? Math.max(...indicators.map(i => i.id)) + 1 : 1;
    
    // Generate some historical data
    const history = [];
    let baseValue = newIndicator.value * 0.8; // Start at 80% of current value
    const isIncreasing = Math.random() > 0.5;
    
    for (let i = 0; i < 4; i++) {
      const month = `2024-0${i + 1}`;
      history.push({ date: month, value: Math.round(baseValue) });
      
      // Adjust value for next month (randomly increasing or decreasing)
      if (isIncreasing) {
        baseValue *= 1.05; // Increase by 5%
      } else {
        baseValue *= 0.95; // Decrease by 5%
      }
    }
    
    // Determine trend
    const trend = history[3].value > history[0].value ? 'up' : 'down';
    
    const indicatorToAdd: ESGIndicator = {
      id,
      ...newIndicator,
      history,
      trend
    };
    
    setIndicators([...indicators, indicatorToAdd]);
    
    // Reset form
    setNewIndicator({
      name: '',
      category: 'environmental',
      value: 0,
      unit: '%',
      target: 0,
      description: '',
      isGood: true
    });
    
    setIsAddIndicatorOpen(false);
    
    toast({
      title: "Indicador adicionado",
      description: `${indicatorToAdd.name} foi adicionado com sucesso.`
    });
  };
  
  // Handle deleting an indicator
  const handleDeleteIndicator = (id: number) => {
    setIndicators(indicators.filter(indicator => indicator.id !== id));
    
    toast({
      title: "Indicador removido",
      description: "O indicador foi removido com sucesso."
    });
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <PageHeader
            title="Indicadores ESG"
            description={`Monitore e gerencie indicadores de sustentabilidade, responsabilidade social e governança no segmento de ${segmentName}`}
            actionButton={
              <Dialog open={isAddIndicatorOpen} onOpenChange={setIsAddIndicatorOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Indicador
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Indicador</DialogTitle>
                    <DialogDescription>
                      Adicione um novo indicador ESG ao seu painel de monitoramento.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-name" className="text-right">
                        Nome
                      </Label>
                      <Input
                        id="indicator-name"
                        value={newIndicator.name}
                        onChange={(e) => setNewIndicator({...newIndicator, name: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-category" className="text-right">
                        Categoria
                      </Label>
                      <Select 
                        value={newIndicator.category} 
                        onValueChange={(value: 'environmental' | 'social' | 'governance') => 
                          setNewIndicator({...newIndicator, category: value})
                        }
                      >
                        <SelectTrigger id="indicator-category" className="col-span-3">
                          <SelectValue placeholder="Selecione a categoria" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="environmental">Ambiental</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="governance">Governança</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-value" className="text-right">
                        Valor Atual
                      </Label>
                      <Input
                        id="indicator-value"
                        type="number"
                        value={newIndicator.value}
                        onChange={(e) => setNewIndicator({...newIndicator, value: Number(e.target.value)})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-unit" className="text-right">
                        Unidade
                      </Label>
                      <Input
                        id="indicator-unit"
                        value={newIndicator.unit}
                        onChange={(e) => setNewIndicator({...newIndicator, unit: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-target" className="text-right">
                        Meta
                      </Label>
                      <Input
                        id="indicator-target"
                        type="number"
                        value={newIndicator.target}
                        onChange={(e) => setNewIndicator({...newIndicator, target: Number(e.target.value)})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-isgood" className="text-right">
                        Interpretação
                      </Label>
                      <Select 
                        value={newIndicator.isGood ? "true" : "false"} 
                        onValueChange={(value) => 
                          setNewIndicator({...newIndicator, isGood: value === "true"})
                        }
                      >
                        <SelectTrigger id="indicator-isgood" className="col-span-3">
                          <SelectValue placeholder="Selecione a interpretação" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Aumento é positivo</SelectItem>
                          <SelectItem value="false">Aumento é negativo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-description" className="text-right">
                        Descrição
                      </Label>
                      <Textarea
                        id="indicator-description"
                        value={newIndicator.description}
                        onChange={(e) => setNewIndicator({...newIndicator, description: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddIndicator}>Adicionar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            }
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Visão Geral</CardTitle>
                <CardDescription>Resumo dos indicadores ESG</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{totalIndicators}</div>
                  <div className="text-sm text-muted-foreground">Indicadores Total</div>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Leaf className="h-4 w-4 mr-2 text-green-500" />
                      <span className="text-sm">Ambiental</span>
                    </div>
                    <span>{indicatorsByCategory.environmental}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-500" />
                      <span className="text-sm">Social</span>
                    </div>
                    <span>{indicatorsByCategory.social}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <ClipboardCheck className="h-4 w-4 mr-2 text-purple-500" />
                      <span className="text-sm">Governança</span>
                    </div>
                    <span>{indicatorsByCategory.governance}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Desempenho</CardTitle>
                <CardDescription>Indicadores dentro da meta</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{onTargetPercentage}%</div>
                  <div className="text-sm text-muted-foreground">Dentro da Meta</div>
                </div>
                <Progress value={onTargetPercentage} className="h-2 mt-4" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-2 bg-muted rounded-md">
                    <div className="text-lg font-medium">{onTargetIndicators}</div>
                    <div className="text-xs text-muted-foreground">Alcançados</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded-md">
                    <div className="text-lg font-medium">{totalIndicators - onTargetIndicators}</div>
                    <div className="text-xs text-muted-foreground">Pendentes</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Tendências</CardTitle>
                <CardDescription>Evolução dos indicadores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold">{positivePercentage}%</div>
                  <div className="text-sm text-muted-foreground">Tendência Positiva</div>
                </div>
                <Progress value={positivePercentage} className="h-2 mt-4" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="text-center p-2 bg-muted rounded-md">
                    <div className="text-lg font-medium flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4 mr-1 text-green-500" /> 
                      {positiveIndicators}
                    </div>
                    <div className="text-xs text-muted-foreground">Melhorando</div>
                  </div>
                  <div className="text-center p-2 bg-muted rounded-md">
                    <div className="text-lg font-medium flex items-center justify-center">
                      <ArrowDownRight className="h-4 w-4 mr-1 text-red-500" /> 
                      {totalIndicators - positiveIndicators}
                    </div>
                    <div className="text-xs text-muted-foreground">Piorando</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Categoria</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                {totalIndicators > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Nenhum indicador cadastrado
                  </div>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Evolução dos Indicadores</CardTitle>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                {totalIndicators > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={[
                        { name: 'Ambiental', meta: indicatorsByCategory.environmental > 0 ? 100 : 0, alcançado: onTargetIndicators > 0 ? (indicators.filter(i => i.category === 'environmental' && i.value >= i.target).length / indicatorsByCategory.environmental) * 100 : 0 },
                        { name: 'Social', meta: indicatorsByCategory.social > 0 ? 100 : 0, alcançado: onTargetIndicators > 0 ? (indicators.filter(i => i.category === 'social' && i.value >= i.target).length / indicatorsByCategory.social) * 100 : 0 },
                        { name: 'Governança', meta: indicatorsByCategory.governance > 0 ? 100 : 0, alcançado: onTargetIndicators > 0 ? (indicators.filter(i => i.category === 'governance' && i.value >= i.target).length / indicatorsByCategory.governance) * 100 : 0 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis label={{ value: '%', position: 'insideLeft' }} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="meta" fill="#8884d8" name="Meta" />
                      <Bar dataKey="alcançado" fill="#82ca9d" name="Alcançado" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="text-center text-muted-foreground">
                    Nenhum indicador cadastrado
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Acompanhamento de Indicadores</CardTitle>
              <CardDescription>Gerencie seus indicadores ESG por categoria</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="environmental" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="mb-4">
                  <TabsTrigger value="environmental" className="flex gap-2 items-center">
                    <Leaf size={16} />
                    <span>Ambiental</span>
                  </TabsTrigger>
                  <TabsTrigger value="social" className="flex gap-2 items-center">
                    <Users size={16} />
                    <span>Social</span>
                  </TabsTrigger>
                  <TabsTrigger value="governance" className="flex gap-2 items-center">
                    <ClipboardCheck size={16} />
                    <span>Governança</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar indicadores..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Indicador</TableHead>
                        <TableHead>Valor Atual</TableHead>
                        <TableHead>Meta</TableHead>
                        <TableHead>Progresso</TableHead>
                        <TableHead>Tendência</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredIndicators.length > 0 ? (
                        filteredIndicators.map((indicator) => {
                          const progress = Math.min(100, Math.round((indicator.value / indicator.target) * 100));
                          
                          // Determine if current trend is good or bad
                          const isTrendGood = 
                            (indicator.trend === 'up' && indicator.isGood) || 
                            (indicator.trend === 'down' && !indicator.isGood);
                          
                          return (
                            <TableRow key={indicator.id}>
                              <TableCell>
                                <div className="font-medium">{indicator.name}</div>
                                <div className="text-sm text-muted-foreground truncate max-w-[200px]">
                                  {indicator.description}
                                </div>
                              </TableCell>
                              <TableCell>
                                {indicator.value} {indicator.unit}
                              </TableCell>
                              <TableCell>
                                {indicator.target} {indicator.unit}
                              </TableCell>
                              <TableCell>
                                <div className="w-full">
                                  <Progress 
                                    value={progress} 
                                    className="h-2" 
                                  />
                                  <div className="text-xs mt-1">
                                    {progress}%
                                  </div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className={`flex items-center ${
                                  isTrendGood ? 'text-green-500' : 'text-red-500'
                                }`}>
                                  {indicator.trend === 'up' ? 
                                    <ArrowUpRight className="mr-1 h-4 w-4" /> : 
                                    <ArrowDownRight className="mr-1 h-4 w-4" />
                                  }
                                  {isTrendGood ? 'Positiva' : 'Negativa'}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-2">
                                  <Button variant="ghost" size="icon">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="icon"
                                    onClick={() => handleDeleteIndicator(indicator.id)}
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            {searchTerm ? (
                              <div>
                                <p className="text-muted-foreground">Nenhum resultado para "{searchTerm}"</p>
                                <Button 
                                  variant="link" 
                                  onClick={() => setSearchTerm('')}
                                  className="mt-2"
                                >
                                  Limpar busca
                                </Button>
                              </div>
                            ) : (
                              <div>
                                <p className="text-muted-foreground">Nenhum indicador encontrado</p>
                                <Button 
                                  variant="link" 
                                  onClick={() => setIsAddIndicatorOpen(true)}
                                  className="mt-2"
                                >
                                  Adicionar novo indicador
                                </Button>
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ESGIndicators;
