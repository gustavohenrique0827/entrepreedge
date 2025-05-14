
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, Activity, Leaf, Building2, Users, AreaChart, DollarSign, BarChart2, PenLine, Plus } from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line, AreaChart as RechartsAreaChart, Area } from 'recharts';
import { useSegment } from '@/contexts/SegmentContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Select } from "@/components/ui/select";

// Define units for the different metrics
const METRIC_UNITS = {
  environmental: {
    'Emissões de CO2': 'toneladas',
    'Consumo de Energia': 'MWh',
    'Uso de Água': 'm³',
    'Geração de Resíduos': 'toneladas',
    'Reciclagem': 'toneladas',
    'Consumo de Papel': 'kg',
    'Resíduos Sólidos': 'toneladas',
  },
  social: {
    'Diversidade de Gênero': '%',
    'Inclusão Racial': '%',
    'Saúde e Segurança': 'incidentes',
    'Treinamento': 'horas/funcionário',
    'Engajamento Comunitário': 'horas',
    'Satisfação dos Funcionários': 'pontos',
    'Rotatividade': '%',
  },
  governance: {
    'Transparência': 'pontos',
    'Ética Empresarial': 'pontos',
    'Gestão de Riscos': 'pontos',
    'Diversidade no Conselho': '%',
    'Políticas Anticorrupção': 'pontos',
    'Conformidade Regulatória': 'violações',
    'Remuneração Executiva': 'razão',
  }
};

// Define base metrics for each category
const BASE_METRICS = {
  environmental: [
    { name: 'Emissões de CO2', value: 30, target: 25, unit: 'toneladas', color: '#00A3C4', description: 'Emissões totais de CO2 da empresa' },
    { name: 'Consumo de Energia', value: 450, target: 400, unit: 'MWh', color: '#36B37E', description: 'Consumo total de energia' },
    { name: 'Uso de Água', value: 2000, target: 1500, unit: 'm³', color: '#6554C0', description: 'Consumo total de água' },
    { name: 'Geração de Resíduos', value: 35, target: 30, unit: 'toneladas', color: '#FF8B00', description: 'Quantidade de resíduos gerados' },
    { name: 'Reciclagem', value: 12, target: 15, unit: 'toneladas', color: '#FF5630', description: 'Quantidade de material reciclado' },
  ],
  social: [
    { name: 'Diversidade de Gênero', value: 62, target: 50, unit: '%', color: '#00A3C4', description: 'Percentual de diversidade de gênero' },
    { name: 'Inclusão Racial', value: 48, target: 50, unit: '%', color: '#36B37E', description: 'Percentual de diversidade racial' },
    { name: 'Saúde e Segurança', value: 5, target: 3, unit: 'incidentes', color: '#6554C0', description: 'Número de incidentes de segurança' },
    { name: 'Treinamento', value: 22, target: 25, unit: 'horas/funcionário', color: '#FF8B00', description: 'Horas médias de treinamento por funcionário' },
    { name: 'Engajamento Comunitário', value: 120, target: 150, unit: 'horas', color: '#FF5630', description: 'Horas dedicadas a projetos comunitários' },
  ],
  governance: [
    { name: 'Transparência', value: 80, target: 85, unit: 'pontos', color: '#00A3C4', description: 'Pontuação em transparência corporativa' },
    { name: 'Ética Empresarial', value: 75, target: 80, unit: 'pontos', color: '#36B37E', description: 'Pontuação em ética empresarial' },
    { name: 'Gestão de Riscos', value: 65, target: 70, unit: 'pontos', color: '#6554C0', description: 'Eficácia da gestão de riscos' },
    { name: 'Diversidade no Conselho', value: 50, target: 60, unit: '%', color: '#FF8B00', description: 'Percentual de diversidade no conselho diretor' },
    { name: 'Políticas Anticorrupção', value: 85, target: 90, unit: 'pontos', color: '#FF5630', description: 'Robustez das políticas anticorrupção' },
  ]
};

// Time series data for tracking progress over months
const TIME_DATA = {
  environmental: [
    { month: 'Jan', value: 28, target: 25 },
    { month: 'Fev', value: 29, target: 25 },
    { month: 'Mar', value: 30, target: 25 },
    { month: 'Abr', value: 32, target: 25 },
    { month: 'Mai', value: 31, target: 25 },
    { month: 'Jun', value: 30, target: 25 },
  ],
  social: [
    { month: 'Jan', value: 58, target: 50 },
    { month: 'Fev', value: 60, target: 50 },
    { month: 'Mar', value: 59, target: 50 },
    { month: 'Abr', value: 62, target: 50 },
    { month: 'Mai', value: 63, target: 50 },
    { month: 'Jun', value: 62, target: 50 },
  ],
  governance: [
    { month: 'Jan', value: 76, target: 85 },
    { month: 'Fev', value: 78, target: 85 },
    { month: 'Mar', value: 77, target: 85 },
    { month: 'Abr', value: 79, target: 85 },
    { month: 'Mai', value: 80, target: 85 },
    { month: 'Jun', value: 80, target: 85 },
  ]
};

// Comparison data with industry averages
const COMPARISON_DATA = {
  environmental: [
    { name: 'Emissões de CO2', company: 30, industry: 35 },
    { name: 'Consumo de Energia', company: 450, industry: 500 },
    { name: 'Uso de Água', company: 2000, industry: 2500 },
    { name: 'Geração de Resíduos', company: 35, industry: 38 },
    { name: 'Reciclagem', company: 12, industry: 10 },
  ],
  social: [
    { name: 'Diversidade de Gênero', company: 62, industry: 45 },
    { name: 'Inclusão Racial', company: 48, industry: 40 },
    { name: 'Saúde e Segurança', company: 5, industry: 7 },
    { name: 'Treinamento', company: 22, industry: 20 },
    { name: 'Engajamento Comunitário', company: 120, industry: 100 },
  ],
  governance: [
    { name: 'Transparência', company: 80, industry: 75 },
    { name: 'Ética Empresarial', company: 75, industry: 70 },
    { name: 'Gestão de Riscos', company: 65, industry: 60 },
    { name: 'Diversidade no Conselho', company: 50, industry: 45 },
    { name: 'Políticas Anticorrupção', company: 85, industry: 80 },
  ]
};

// Chart types available
const CHART_TYPES = [
  { id: 'bar', label: 'Barras', icon: <BarChart className="h-4 w-4" /> },
  { id: 'line', label: 'Linha', icon: <LineChart className="h-4 w-4" /> },
  { id: 'pie', label: 'Pizza', icon: <PieChart className="h-4 w-4" /> },
  { id: 'area', label: 'Área', icon: <AreaChart className="h-4 w-4" /> },
];

// Color palette for new indicators
const COLOR_PALETTE = ['#00A3C4', '#36B37E', '#6554C0', '#FF8B00', '#FF5630', '#0052CC', '#5243AA', '#EF5350', '#FFB400', '#00875A'];

// Helper function to calculate percentage from actual values and targets
const calculatePercentage = (value, target, higherIsBetter = false) => {
  if (target === 0) return 0;
  
  if (higherIsBetter) {
    // For metrics where higher is better (e.g., recycling)
    return Math.round((value / target) * 100);
  } else {
    // For metrics where lower is better (e.g., CO2 emissions)
    return Math.round((1 - (value / target)) * 100);
  }
};

const ESGIndicators = () => {
  const { getVisualPreferences } = useSegment();
  const [activeTab, setActiveTab] = useState('environmental');
  const [selectedChart, setSelectedChart] = useState('bar');
  const [timeframe, setTimeframe] = useState('actual');
  const [esgData, setEsgData] = useState(BASE_METRICS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddIndicatorOpen, setIsAddIndicatorOpen] = useState(false);
  const [newIndicator, setNewIndicator] = useState({
    name: '',
    value: 0,
    target: 0,
    unit: '',
    category: 'environmental',
    color: '#00A3C4',
    description: ''
  });
  
  const primaryColor = getVisualPreferences().primaryColor;
  const secondaryColor = getVisualPreferences().secondaryColor;
  
  const getIconForCategory = (category) => {
    switch(category) {
      case 'environmental': return <Leaf className="h-5 w-5" />;
      case 'social': return <Users className="h-5 w-5" />;
      case 'governance': return <Building2 className="h-5 w-5" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };
  
  // Calculate overall score for a category
  const calculateCategoryScore = (category) => {
    const data = esgData[category];
    let totalScore = 0;
    
    data.forEach(item => {
      // Determine if higher is better based on the unit
      const higherIsBetter = !(item.name.includes('Emissões') || 
                              item.name.includes('Consumo') || 
                              item.name.includes('Resíduos') || 
                              item.name.includes('incidentes') || 
                              item.name.includes('violações'));
                              
      const itemScore = calculatePercentage(item.value, item.target, higherIsBetter);
      totalScore += itemScore;
    });
    
    return Math.round(totalScore / data.length);
  };
  
  // Get color based on performance (red if below target, green if above)
  const getPerformanceColor = (item) => {
    const higherIsBetter = !(item.name.includes('Emissões') || 
                            item.name.includes('Consumo') || 
                            item.name.includes('Resíduos') || 
                            item.name.includes('incidentes') || 
                            item.name.includes('violações'));
                            
    if (higherIsBetter) {
      return item.value >= item.target ? '#36B37E' : '#FF5630';
    } else {
      return item.value <= item.target ? '#36B37E' : '#FF5630';
    }
  };

  // Check if value is meeting target
  const isMeetingTarget = (item) => {
    const higherIsBetter = !(item.name.includes('Emissões') || 
                            item.name.includes('Consumo') || 
                            item.name.includes('Resíduos') || 
                            item.name.includes('incidentes') || 
                            item.name.includes('violações'));
                            
    return higherIsBetter ? item.value >= item.target : item.value <= item.target;
  };

  // Open add new indicator dialog
  const openAddIndicatorDialog = () => {
    setNewIndicator({
      name: '',
      value: 0,
      target: 0,
      unit: '',
      category: activeTab,
      color: COLOR_PALETTE[Math.floor(Math.random() * COLOR_PALETTE.length)],
      description: ''
    });
    setIsAddIndicatorOpen(true);
  };

  // Handle new indicator input changes
  const handleNewIndicatorChange = (field, value) => {
    setNewIndicator(prev => ({
      ...prev,
      [field]: field === 'value' || field === 'target' 
        ? Number(value)
        : value
    }));
  };

  // Add new indicator
  const addNewIndicator = () => {
    if (!newIndicator.name) {
      toast({
        title: "Erro ao adicionar indicador",
        description: "O nome do indicador é obrigatório.",
        variant: "destructive",
      });
      return;
    }

    if (!newIndicator.unit) {
      toast({
        title: "Erro ao adicionar indicador",
        description: "A unidade de medida é obrigatória.",
        variant: "destructive",
      });
      return;
    }

    const category = newIndicator.category;
    const updatedData = {...esgData};
    
    updatedData[category] = [
      ...updatedData[category],
      {
        name: newIndicator.name,
        value: newIndicator.value,
        target: newIndicator.target,
        unit: newIndicator.unit,
        color: newIndicator.color,
        description: newIndicator.description || `Medição de ${newIndicator.name}`
      }
    ];

    setEsgData(updatedData);
    setIsAddIndicatorOpen(false);
    setActiveTab(category);
    
    toast({
      title: "Indicador adicionado",
      description: `O indicador "${newIndicator.name}" foi adicionado com sucesso.`,
      variant: "success",
    });
  };

  // Render the selected chart type for the active category
  const renderChart = () => {
    const categoryData = esgData[activeTab];
    
    switch (selectedChart) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={320}>
            <RechartsBarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="font-medium">{data.name}</p>
                      <p>Valor: {data.value} {data.unit}</p>
                      <p>Meta: {data.target} {data.unit}</p>
                      <p>{data.description}</p>
                    </div>
                  );
                }
                return null;
              }}/>
              <Legend />
              <Bar name="Valor Atual" dataKey="value" fill={primaryColor} />
              <Bar name="Meta" dataKey="target" fill={secondaryColor} />
            </RechartsBarChart>
          </ResponsiveContainer>
        );
      
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={320}>
            <RechartsLineChart data={TIME_DATA[activeTab]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line name="Valor Atual" type="monotone" dataKey="value" stroke={primaryColor} activeDot={{ r: 8 }} />
              <Line name="Meta" type="monotone" dataKey="target" stroke={secondaryColor} strokeDasharray="5 5" />
            </RechartsLineChart>
          </ResponsiveContainer>
        );
        
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={320}>
            <RechartsPieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({name, value, unit}) => `${name}: ${value} ${unit}`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 border rounded shadow">
                      <p className="font-medium">{data.name}</p>
                      <p>Valor: {data.value} {data.unit}</p>
                      <p>Meta: {data.target} {data.unit}</p>
                      <p>{data.description}</p>
                    </div>
                  );
                }
                return null;
              }}/>
              <Legend />
            </RechartsPieChart>
          </ResponsiveContainer>
        );
        
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={320}>
            <RechartsAreaChart data={TIME_DATA[activeTab]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" name="Valor Atual" dataKey="value" stroke={primaryColor} fill={primaryColor} fillOpacity={0.3} />
              <Area type="monotone" name="Meta" dataKey="target" stroke={secondaryColor} fill={secondaryColor} fillOpacity={0.3} strokeDasharray="5 5" />
            </RechartsAreaChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };
  
  // Render comparison chart for industry benchmarking
  const renderComparisonChart = () => {
    const comparisonData = COMPARISON_DATA[activeTab];
    
    return (
      <ResponsiveContainer width="100%" height={220}>
        <RechartsBarChart data={comparisonData} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" width={100} />
          <Tooltip />
          <Legend />
          <Bar dataKey="company" name="Sua Empresa" fill={primaryColor} />
          <Bar dataKey="industry" name="Média do Setor" fill={secondaryColor} />
        </RechartsBarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold mb-1">Indicadores ESG</h1>
              <p className="text-sm text-muted-foreground">
                Métricas ambientais, sociais e de governança da sua empresa
              </p>
            </div>
            <div className="flex gap-2">
              <Button onClick={openAddIndicatorDialog} className="flex items-center gap-2">
                <Plus size={16} />
                <span>Adicionar Indicador</span>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className={`border-l-4 ${activeTab === 'environmental' ? 'border-l-emerald-500' : 'border-l-transparent'}`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
                        <Leaf className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Ambiental</p>
                        <p className="text-2xl font-bold">{calculateCategoryScore('environmental')}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={activeTab === 'environmental' ? 'default' : 'outline'} 
                      onClick={() => setActiveTab('environmental')}
                      size="sm"
                    >
                      {activeTab === 'environmental' ? 'Visualizando' : 'Visualizar'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`border-l-4 ${activeTab === 'social' ? 'border-l-blue-500' : 'border-l-transparent'}`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700">
                        <Users className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Social</p>
                        <p className="text-2xl font-bold">{calculateCategoryScore('social')}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={activeTab === 'social' ? 'default' : 'outline'} 
                      onClick={() => setActiveTab('social')}
                      size="sm"
                    >
                      {activeTab === 'social' ? 'Visualizando' : 'Visualizar'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className={`border-l-4 ${activeTab === 'governance' ? 'border-l-purple-500' : 'border-l-transparent'}`}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-700">
                        <Building2 className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Governança</p>
                        <p className="text-2xl font-bold">{calculateCategoryScore('governance')}%</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant={activeTab === 'governance' ? 'default' : 'outline'} 
                      onClick={() => setActiveTab('governance')}
                      size="sm"
                    >
                      {activeTab === 'governance' ? 'Visualizando' : 'Visualizar'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-6">
            <div className="lg:col-span-1">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm flex items-center gap-1">
                    <BarChart2 size={16} />
                    Tipo de Gráfico
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3">
                  <div className="space-y-1">
                    {CHART_TYPES.map(chart => (
                      <Button
                        key={chart.id}
                        variant={selectedChart === chart.id ? 'default' : 'outline'}
                        className="w-full justify-start gap-2 mb-2"
                        onClick={() => setSelectedChart(chart.id)}
                      >
                        {chart.icon}
                        {chart.label}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="font-medium text-sm mb-2">Período de Tempo</h3>
                    <Tabs defaultValue="actual" value={timeframe} onValueChange={setTimeframe}>
                      <TabsList className="w-full">
                        <TabsTrigger value="actual">Atual</TabsTrigger>
                        <TabsTrigger value="progress">Histórico</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h3 className="font-medium text-sm mb-2">Detalhes</h3>
                    <div className="text-xs space-y-1">
                      {esgData[activeTab].map((item, idx) => (
                        <div key={idx} className="py-1 border-b last:border-b-0">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{item.name}</span>
                            <span style={{ color: getPerformanceColor(item) }}>
                              {item.value} {item.unit}
                            </span>
                          </div>
                          <div className="flex justify-between items-center text-xs text-muted-foreground mt-1 mb-2">
                            <span>Meta: {item.target} {item.unit}</span>
                            <span>{item.description}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className="h-1.5 rounded-full" 
                              style={{ 
                                width: `${Math.min(100, Math.abs(item.value / item.target * 100))}%`,
                                backgroundColor: getPerformanceColor(item)
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="lg:col-span-4">
              <Card className="h-full">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base flex items-center gap-2">
                      {getIconForCategory(activeTab)}
                      {activeTab === 'environmental' ? 'Indicadores Ambientais' :
                       activeTab === 'social' ? 'Indicadores Sociais' : 'Indicadores de Governança'}
                    </CardTitle>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg">
                      {timeframe === 'actual' ? 'Visualização atual' : 'Visualização histórica'}
                    </span>
                  </div>
                  <CardDescription className="text-xs">
                    {activeTab === 'environmental' ? 'Métricas de sustentabilidade e impacto ambiental' :
                     activeTab === 'social' ? 'Métricas de impacto social e relacionamento com stakeholders' : 
                     'Métricas de transparência, ética e práticas de gestão'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[320px]">
                    {renderChart()}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h3 className="text-sm font-medium mb-3">Comparação com o Setor</h3>
                    <div className="h-[220px]">
                      {renderComparisonChart()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recomendações para Melhorias</CardTitle>
              <CardDescription>Ações sugeridas para melhorar suas métricas ESG</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 font-medium">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <span>Recomendações Ambientais</span>
                  </h3>
                  <ul className="pl-4 text-sm space-y-1 list-disc">
                    <li>Implementar programa de eficiência energética</li>
                    <li>Reduzir consumo de água em 10% nos próximos 6 meses</li>
                    <li>Aumentar taxa de reciclagem para 15 toneladas</li>
                    <li>Implementar programa de compensação de carbono</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 font-medium">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700">
                      <Users className="h-4 w-4" />
                    </div>
                    <span>Recomendações Sociais</span>
                  </h3>
                  <ul className="pl-4 text-sm space-y-1 list-disc">
                    <li>Implementar política de diversidade e inclusão</li>
                    <li>Aumentar horas de treinamento por funcionário</li>
                    <li>Expandir programas de voluntariado corporativo</li>
                    <li>Melhorar métricas de saúde e segurança ocupacional</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <h3 className="flex items-center gap-2 font-medium">
                    <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700">
                      <Building2 className="h-4 w-4" />
                    </div>
                    <span>Recomendações de Governança</span>
                  </h3>
                  <ul className="pl-4 text-sm space-y-1 list-disc">
                    <li>Aumentar diversidade no conselho administrativo</li>
                    <li>Publicar relatório de sustentabilidade anual</li>
                    <li>Implementar programa de compliance mais robusto</li>
                    <li>Estabelecer políticas de remuneração transparentes</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Relatório ESG Completo</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Baixe o relatório completo com todas as métricas e recomendações detalhadas.
                    </p>
                  </div>
                  <Button>Gerar Relatório</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add New Indicator Dialog */}
      <Dialog open={isAddIndicatorOpen} onOpenChange={setIsAddIndicatorOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Indicador ESG</DialogTitle>
            <DialogDescription>
              Preencha os dados para adicionar um novo indicador ESG ao seu painel.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="indicator-name">Nome do Indicador</Label>
                <Input
                  id="indicator-name"
                  placeholder="Ex: Consumo de Papel"
                  value={newIndicator.name}
                  onChange={(e) => handleNewIndicatorChange('name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="indicator-category">Categoria</Label>
                <select 
                  id="indicator-category"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={newIndicator.category}
                  onChange={(e) => handleNewIndicatorChange('category', e.target.value)}
                >
                  <option value="environmental">Ambiental</option>
                  <option value="social">Social</option>
                  <option value="governance">Governança</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="indicator-description">Descrição</Label>
                <Input
                  id="indicator-description"
                  placeholder="Descrição do indicador"
                  value={newIndicator.description}
                  onChange={(e) => handleNewIndicatorChange('description', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="indicator-value">Valor Atual</Label>
                  <Input
                    id="indicator-value"
                    type="number"
                    min={0}
                    value={newIndicator.value}
                    onChange={(e) => handleNewIndicatorChange('value', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="indicator-target">Meta</Label>
                  <Input
                    id="indicator-target"
                    type="number"
                    min={0}
                    value={newIndicator.target}
                    onChange={(e) => handleNewIndicatorChange('target', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="indicator-unit">Unidade</Label>
                  <Input
                    id="indicator-unit"
                    placeholder="Ex: toneladas, kWh, %"
                    value={newIndicator.unit}
                    onChange={(e) => handleNewIndicatorChange('unit', e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-muted-foreground text-sm mt-2">
                <span>Valor Atual: {newIndicator.value} {newIndicator.unit || '-'}</span>
                <span>Meta: {newIndicator.target} {newIndicator.unit || '-'}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddIndicatorOpen(false)}>Cancelar</Button>
            <Button onClick={addNewIndicator}>Adicionar Indicador</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ESGIndicators;

