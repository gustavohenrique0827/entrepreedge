
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, BarChart, ComposedChart, Area, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Leaf, BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon, TrendingUp, Info, Plus, FileEdit, AlertTriangle, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useSegment } from '@/contexts/SegmentContext';

// Define a type for our ESG indicator
interface ESGIndicator {
  id: string;
  name: string;
  category: 'environmental' | 'social' | 'governance';
  value: number;
  target: number;
  unit: string;
  lastYear?: number;
  trend?: 'up' | 'down' | 'stable';
  description?: string;
  months?: { month: string; value: number }[];
}

const ESGIndicators = () => {
  const { toast } = useToast();
  const { getVisualPreferences } = useSegment();
  const { primaryColor, secondaryColor } = getVisualPreferences();
  
  const [activeTab, setActiveTab] = useState('environmental');
  const [selectedChartType, setSelectedChartType] = useState<'area' | 'bar' | 'line' | 'pie'>('bar');
  const [selectedIndicators, setSelectedIndicators] = useState<string[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newIndicator, setNewIndicator] = useState<Partial<ESGIndicator>>({
    category: 'environmental',
    value: 0,
    target: 0,
    unit: '%',
  });

  // Simulate loading data from storage
  const loadSavedIndicators = (): ESGIndicator[] => {
    try {
      const savedData = localStorage.getItem('esgIndicators');
      if (savedData) {
        return JSON.parse(savedData);
      }
    } catch (e) {
      console.error("Error loading ESG data", e);
    }
    
    // Default data if nothing is saved
    return [
      {
        id: 'carbon-footprint',
        name: 'Pegada de Carbono',
        category: 'environmental',
        value: 65,
        target: 50,
        unit: 'tCO2e',
        lastYear: 80,
        trend: 'down',
        description: 'Medida da emissão total de gases de efeito estufa',
        months: [
          { month: 'Jan', value: 80 },
          { month: 'Fev', value: 78 },
          { month: 'Mar', value: 75 },
          { month: 'Abr', value: 72 },
          { month: 'Mai', value: 70 },
          { month: 'Jun', value: 68 },
          { month: 'Jul', value: 65 },
        ]
      },
      {
        id: 'water-usage',
        name: 'Consumo de Água',
        category: 'environmental',
        value: 35000,
        target: 30000,
        unit: 'm³',
        lastYear: 40000,
        trend: 'down',
        description: 'Volume total de água consumida nas operações',
        months: [
          { month: 'Jan', value: 40000 },
          { month: 'Fev', value: 38000 },
          { month: 'Mar', value: 37000 },
          { month: 'Abr', value: 36000 },
          { month: 'Mai', value: 35500 },
          { month: 'Jun', value: 35200 },
          { month: 'Jul', value: 35000 },
        ]
      },
      {
        id: 'renewable-energy',
        name: 'Energia Renovável',
        category: 'environmental',
        value: 45,
        target: 60,
        unit: '%',
        lastYear: 35,
        trend: 'up',
        description: 'Percentual de energia proveniente de fontes renováveis',
        months: [
          { month: 'Jan', value: 35 },
          { month: 'Fev', value: 37 },
          { month: 'Mar', value: 38 },
          { month: 'Abr', value: 40 },
          { month: 'Mai', value: 42 },
          { month: 'Jun', value: 44 },
          { month: 'Jul', value: 45 },
        ]
      },
      {
        id: 'gender-diversity',
        name: 'Diversidade de Gênero',
        category: 'social',
        value: 38,
        target: 50,
        unit: '%',
        lastYear: 32,
        trend: 'up',
        description: 'Percentual de mulheres em cargos de liderança',
        months: [
          { month: 'Jan', value: 32 },
          { month: 'Fev', value: 33 },
          { month: 'Mar', value: 34 },
          { month: 'Abr', value: 35 },
          { month: 'Mai', value: 36 },
          { month: 'Jun', value: 37 },
          { month: 'Jul', value: 38 },
        ]
      },
      {
        id: 'employee-training',
        name: 'Treinamento de Funcionários',
        category: 'social',
        value: 25,
        target: 40,
        unit: 'h/funcionário',
        lastYear: 20,
        trend: 'up',
        description: 'Média de horas de treinamento por funcionário',
        months: [
          { month: 'Jan', value: 20 },
          { month: 'Fev', value: 21 },
          { month: 'Mar', value: 22 },
          { month: 'Abr', value: 23 },
          { month: 'Mai', value: 24 },
          { month: 'Jun', value: 24.5 },
          { month: 'Jul', value: 25 },
        ]
      },
      {
        id: 'community-investment',
        name: 'Investimento Comunitário',
        category: 'social',
        value: 150000,
        target: 200000,
        unit: 'BRL',
        lastYear: 120000,
        trend: 'up',
        description: 'Valor investido em projetos comunitários',
        months: [
          { month: 'Jan', value: 120000 },
          { month: 'Fev', value: 125000 },
          { month: 'Mar', value: 130000 },
          { month: 'Abr', value: 135000 },
          { month: 'Mai', value: 140000 },
          { month: 'Jun', value: 145000 },
          { month: 'Jul', value: 150000 },
        ]
      },
      {
        id: 'board-independence',
        name: 'Independência do Conselho',
        category: 'governance',
        value: 60,
        target: 75,
        unit: '%',
        lastYear: 50,
        trend: 'up',
        description: 'Percentual de membros independentes no conselho',
        months: [
          { month: 'Jan', value: 50 },
          { month: 'Fev', value: 50 },
          { month: 'Mar', value: 55 },
          { month: 'Abr', value: 55 },
          { month: 'Mai', value: 60 },
          { month: 'Jun', value: 60 },
          { month: 'Jul', value: 60 },
        ]
      },
      {
        id: 'ethics-training',
        name: 'Treinamento em Ética',
        category: 'governance',
        value: 85,
        target: 100,
        unit: '%',
        lastYear: 70,
        trend: 'up',
        description: 'Percentual de funcionários treinados em ética e compliance',
        months: [
          { month: 'Jan', value: 70 },
          { month: 'Fev', value: 72 },
          { month: 'Mar', value: 75 },
          { month: 'Abr', value: 78 },
          { month: 'Mai', value: 80 },
          { month: 'Jun', value: 82 },
          { month: 'Jul', value: 85 },
        ]
      },
      {
        id: 'data-breaches',
        name: 'Violações de Dados',
        category: 'governance',
        value: 1,
        target: 0,
        unit: 'incidentes',
        lastYear: 3,
        trend: 'down',
        description: 'Número de incidentes de violação de dados reportados',
        months: [
          { month: 'Jan', value: 3 },
          { month: 'Fev', value: 2 },
          { month: 'Mar', value: 2 },
          { month: 'Abr', value: 1 },
          { month: 'Mai', value: 1 },
          { month: 'Jun', value: 1 },
          { month: 'Jul', value: 1 },
        ]
      }
    ];
  };

  const [indicators, setIndicators] = useState<ESGIndicator[]>(loadSavedIndicators());

  // On mount and when indicators change, save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('esgIndicators', JSON.stringify(indicators));
    } catch (e) {
      console.error("Error saving indicators", e);
    }
  }, [indicators]);

  // When active tab changes, preselect the first indicator in that category
  useEffect(() => {
    const categoryIndicators = indicators.filter(i => i.category === activeTab);
    if (categoryIndicators.length > 0 && selectedIndicators.length === 0) {
      setSelectedIndicators([categoryIndicators[0].id]);
    }
  }, [activeTab, indicators]);
  
  // Filter indicators by the active tab
  const filteredIndicators = indicators.filter(
    indicator => indicator.category === activeTab
  );
  
  // Get chart data for the selected indicators
  const getChartData = () => {
    const selectedIndicatorsData = indicators.filter(
      indicator => selectedIndicators.includes(indicator.id)
    );
    
    if (selectedChartType === 'pie') {
      return selectedIndicatorsData.map(indicator => ({
        name: indicator.name,
        value: indicator.value
      }));
    }
    
    // For area, bar, and line charts, use the monthly data
    if (selectedIndicatorsData.length === 0 || !selectedIndicatorsData[0].months) {
      return [];
    }
    
    // Create a merged dataset for multiple indicators
    return selectedIndicatorsData[0].months?.map((monthData, index) => {
      const dataPoint: any = { month: monthData.month };
      
      selectedIndicatorsData.forEach(indicator => {
        if (indicator.months && indicator.months[index]) {
          dataPoint[indicator.name] = indicator.months[index].value;
        }
      });
      
      return dataPoint;
    });
  };
  
  const chartData = getChartData();
  
  // COLORS for the charts
  const CHART_COLORS = [
    primaryColor,
    secondaryColor,
    '#10B981',
    '#F97316',
    '#8B5CF6',
    '#EC4899',
    '#0EA5E9',
    '#F59E0B'
  ];

  const handleAddIndicator = () => {
    if (!newIndicator.name || newIndicator.value === undefined) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Create monthly data (last 7 months)
    const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'];
    const months = monthNames.map((month, index) => {
      // Generate some variation for the chart
      const variance = (Math.random() * 0.2) - 0.1; // -10% to +10%
      const monthValue = (newIndicator.value || 0) * (1 - (0.1 * (6 - index)) + variance);
      return { month, value: Number(monthValue.toFixed(2)) };
    });

    const newId = `indicator-${Date.now()}`;
    const indicatorToAdd: ESGIndicator = {
      id: newId,
      name: newIndicator.name || '',
      category: newIndicator.category as 'environmental' | 'social' | 'governance',
      value: newIndicator.value || 0,
      target: newIndicator.target || 0,
      unit: newIndicator.unit || '',
      description: newIndicator.description,
      trend: (newIndicator.value || 0) > (newIndicator.lastYear || 0) ? 'up' : 'down',
      lastYear: newIndicator.lastYear,
      months
    };

    setIndicators([...indicators, indicatorToAdd]);
    setSelectedIndicators([...selectedIndicators, newId]);
    setIsAddDialogOpen(false);
    
    // Reset form
    setNewIndicator({
      category: activeTab as 'environmental' | 'social' | 'governance',
      value: 0,
      target: 0,
      unit: '%',
    });

    toast({
      title: "Indicador adicionado",
      description: `O indicador "${indicatorToAdd.name}" foi adicionado com sucesso.`
    });
  };

  const toggleIndicatorSelection = (id: string) => {
    if (selectedIndicators.includes(id)) {
      setSelectedIndicators(selectedIndicators.filter(i => i !== id));
    } else {
      setSelectedIndicators([...selectedIndicators, id]);
    }
  };

  const navItems = [
    {
      name: 'ESG',
      href: '/esg',
      icon: <Leaf size={18} />
    }
  ];
  
  // Render the appropriate chart based on the selected type
  const renderChart = () => {
    if (selectedIndicators.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[300px] text-center text-muted-foreground">
          <AlertTriangle className="mb-2 h-10 w-10 opacity-20" />
          <p className="text-lg">Selecione pelo menos um indicador para visualizar o gráfico</p>
          <p className="text-sm">Clique nos cartões de indicadores abaixo para selecionar</p>
        </div>
      );
    }
    
    switch (selectedChartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {indicators
                .filter(ind => selectedIndicators.includes(ind.id))
                .map((indicator, index) => (
                  <Area
                    key={indicator.id}
                    type="monotone"
                    dataKey={indicator.name}
                    stroke={CHART_COLORS[index % CHART_COLORS.length]}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                    fillOpacity={0.3}
                  />
                ))}
            </AreaChart>
          </ResponsiveContainer>
        );
        
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {indicators
                .filter(ind => selectedIndicators.includes(ind.id))
                .map((indicator, index) => (
                  <Line
                    key={indicator.id}
                    type="monotone"
                    dataKey={indicator.name}
                    stroke={CHART_COLORS[index % CHART_COLORS.length]}
                    activeDot={{ r: 8 }}
                  />
                ))}
            </LineChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={true}
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case 'bar':
      default:
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              {indicators
                .filter(ind => selectedIndicators.includes(ind.id))
                .map((indicator, index) => (
                  <Bar
                    key={indicator.id}
                    dataKey={indicator.name}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ))}
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <PageHeader
            title="Indicadores ESG"
            description="Monitore e gerencie indicadores de sustentabilidade, responsabilidade social e governança"
            actionButton={
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
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
                      Crie um novo indicador ESG para monitorar
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-name" className="text-right">
                        Nome
                      </Label>
                      <Input
                        id="indicator-name"
                        value={newIndicator.name || ''}
                        onChange={(e) => setNewIndicator({...newIndicator, name: e.target.value})}
                        placeholder="Nome do indicador"
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-category" className="text-right">
                        Categoria
                      </Label>
                      <Select
                        value={newIndicator.category}
                        onValueChange={(value) => setNewIndicator({
                          ...newIndicator,
                          category: value as 'environmental' | 'social' | 'governance'
                        })}
                      >
                        <SelectTrigger id="indicator-category" className="col-span-3">
                          <SelectValue placeholder="Categoria" />
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
                        value={newIndicator.value || ''}
                        onChange={(e) => setNewIndicator({
                          ...newIndicator,
                          value: parseFloat(e.target.value)
                        })}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-last-year" className="text-right">
                        Ano Anterior
                      </Label>
                      <Input
                        id="indicator-last-year"
                        type="number"
                        value={newIndicator.lastYear || ''}
                        onChange={(e) => setNewIndicator({
                          ...newIndicator,
                          lastYear: parseFloat(e.target.value)
                        })}
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
                        value={newIndicator.target || ''}
                        onChange={(e) => setNewIndicator({
                          ...newIndicator,
                          target: parseFloat(e.target.value)
                        })}
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-unit" className="text-right">
                        Unidade
                      </Label>
                      <Input
                        id="indicator-unit"
                        value={newIndicator.unit || ''}
                        onChange={(e) => setNewIndicator({...newIndicator, unit: e.target.value})}
                        placeholder="%, kg, m³, etc."
                        className="col-span-3"
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="indicator-description" className="text-right">
                        Descrição
                      </Label>
                      <Textarea
                        id="indicator-description"
                        value={newIndicator.description || ''}
                        onChange={(e) => setNewIndicator({...newIndicator, description: e.target.value})}
                        placeholder="Descreva brevemente este indicador"
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
          
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Análise de Indicadores</CardTitle>
                    <CardDescription>
                      Visualize e compare indicadores por categoria
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button 
                      variant={selectedChartType === 'bar' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedChartType('bar')}
                    >
                      <BarChartIcon className="h-4 w-4 mr-1" />
                      Barras
                    </Button>
                    <Button 
                      variant={selectedChartType === 'line' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedChartType('line')}
                    >
                      <LineChartIcon className="h-4 w-4 mr-1" />
                      Linha
                    </Button>
                    <Button 
                      variant={selectedChartType === 'area' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedChartType('area')}
                    >
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Área
                    </Button>
                    <Button 
                      variant={selectedChartType === 'pie' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedChartType('pie')}
                    >
                      <PieChartIcon className="h-4 w-4 mr-1" />
                      Pizza
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {renderChart()}
              </CardContent>
            </Card>
            
            <Tabs defaultValue="environmental" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="w-full sm:w-auto">
                <TabsTrigger value="environmental">Ambientais</TabsTrigger>
                <TabsTrigger value="social">Sociais</TabsTrigger>
                <TabsTrigger value="governance">Governança</TabsTrigger>
              </TabsList>
              
              <TabsContent value="environmental" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredIndicators.map(indicator => (
                    <Card 
                      key={indicator.id} 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedIndicators.includes(indicator.id) 
                          ? 'ring-2 ring-primary border-transparent' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => toggleIndicatorSelection(indicator.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base font-medium">{indicator.name}</CardTitle>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <span className="text-2xl font-bold">{indicator.value}</span>
                            <span className="text-sm text-muted-foreground ml-1">{indicator.unit}</span>
                          </div>
                          <div>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                              indicator.trend === 'up' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {indicator.trend === 'up' ? '▲' : '▼'} 
                              {Math.abs(((indicator.value - (indicator.lastYear || 0)) / (indicator.lastYear || 1)) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className="text-xs font-semibold inline-block text-muted-foreground">
                                Meta: {indicator.target} {indicator.unit}
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                            <div 
                              style={{ 
                                width: `${Math.min(100, (indicator.value / indicator.target) * 100)}%`,
                                backgroundColor: primaryColor
                              }} 
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                            ></div>
                          </div>
                        </div>
                        
                        {indicator.description && (
                          <p className="text-xs text-muted-foreground mt-4 flex items-start">
                            <Info className="h-4 w-4 mr-1 flex-shrink-0 mt-px" />
                            <span>{indicator.description}</span>
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="social" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredIndicators.map(indicator => (
                    <Card 
                      key={indicator.id} 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedIndicators.includes(indicator.id) 
                          ? 'ring-2 ring-primary border-transparent' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => toggleIndicatorSelection(indicator.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base font-medium">{indicator.name}</CardTitle>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <span className="text-2xl font-bold">{indicator.value}</span>
                            <span className="text-sm text-muted-foreground ml-1">{indicator.unit}</span>
                          </div>
                          <div>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                              indicator.trend === 'up' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {indicator.trend === 'up' ? '▲' : '▼'} 
                              {Math.abs(((indicator.value - (indicator.lastYear || 0)) / (indicator.lastYear || 1)) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className="text-xs font-semibold inline-block text-muted-foreground">
                                Meta: {indicator.target} {indicator.unit}
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                            <div 
                              style={{ 
                                width: `${Math.min(100, (indicator.value / indicator.target) * 100)}%`,
                                backgroundColor: secondaryColor
                              }} 
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                            ></div>
                          </div>
                        </div>
                        
                        {indicator.description && (
                          <p className="text-xs text-muted-foreground mt-4 flex items-start">
                            <Info className="h-4 w-4 mr-1 flex-shrink-0 mt-px" />
                            <span>{indicator.description}</span>
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="governance" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredIndicators.map(indicator => (
                    <Card 
                      key={indicator.id} 
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedIndicators.includes(indicator.id) 
                          ? 'ring-2 ring-primary border-transparent' 
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => toggleIndicatorSelection(indicator.id)}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base font-medium">{indicator.name}</CardTitle>
                          <Button variant="ghost" size="icon" className="h-6 w-6">
                            <FileEdit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-end mb-4">
                          <div>
                            <span className="text-2xl font-bold">{indicator.value}</span>
                            <span className="text-sm text-muted-foreground ml-1">{indicator.unit}</span>
                          </div>
                          <div>
                            <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                              indicator.trend === 'up' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
                                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {indicator.trend === 'up' ? '▲' : '▼'} 
                              {Math.abs(((indicator.value - (indicator.lastYear || 0)) / (indicator.lastYear || 1)) * 100).toFixed(1)}%
                            </span>
                          </div>
                        </div>
                        
                        <div className="relative pt-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <span className="text-xs font-semibold inline-block text-muted-foreground">
                                Meta: {indicator.target} {indicator.unit}
                              </span>
                            </div>
                          </div>
                          <div className="overflow-hidden h-2 text-xs flex rounded bg-muted">
                            <div 
                              style={{ 
                                width: `${Math.min(100, (indicator.value / indicator.target) * 100)}%`,
                                backgroundColor: '#10B981'
                              }} 
                              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"
                            ></div>
                          </div>
                        </div>
                        
                        {indicator.description && (
                          <p className="text-xs text-muted-foreground mt-4 flex items-start">
                            <Info className="h-4 w-4 mr-1 flex-shrink-0 mt-px" />
                            <span>{indicator.description}</span>
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ESGIndicators;
