
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, LineChart, PieChart, Activity, Leaf, Building2, Users, AreaChart, DollarSign, BarChart2, PenLine } from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart as RechartsLineChart, Line, AreaChart as RechartsAreaChart, Area } from 'recharts';
import { useSegment } from '@/contexts/SegmentContext';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const ESG_DATA = {
  environmental: [
    { name: 'Emissões de CO2', value: 30, target: 25, color: '#00A3C4' },
    { name: 'Consumo de Energia', value: 45, target: 40, color: '#36B37E' },
    { name: 'Uso de Água', value: 20, target: 15, color: '#6554C0' },
    { name: 'Geração de Resíduos', value: 35, target: 30, color: '#FF8B00' },
    { name: 'Reciclagem', value: 60, target: 75, color: '#FF5630' },
  ],
  social: [
    { name: 'Diversidade de Gênero', value: 62, target: 50, color: '#00A3C4' },
    { name: 'Inclusão Racial', value: 48, target: 50, color: '#36B37E' },
    { name: 'Saúde e Segurança', value: 75, target: 80, color: '#6554C0' },
    { name: 'Treinamento', value: 55, target: 60, color: '#FF8B00' },
    { name: 'Engajamento Comunitário', value: 40, target: 45, color: '#FF5630' },
  ],
  governance: [
    { name: 'Transparência', value: 80, target: 85, color: '#00A3C4' },
    { name: 'Ética Empresarial', value: 75, target: 80, color: '#36B37E' },
    { name: 'Gestão de Riscos', value: 65, target: 70, color: '#6554C0' },
    { name: 'Diversidade no Conselho', value: 50, target: 60, color: '#FF8B00' },
    { name: 'Políticas Anticorrupção', value: 85, target: 90, color: '#FF5630' },
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
    { name: 'Consumo de Energia', company: 45, industry: 50 },
    { name: 'Uso de Água', company: 20, industry: 25 },
    { name: 'Geração de Resíduos', company: 35, industry: 38 },
    { name: 'Reciclagem', company: 60, industry: 55 },
  ],
  social: [
    { name: 'Diversidade de Gênero', company: 62, industry: 45 },
    { name: 'Inclusão Racial', company: 48, industry: 40 },
    { name: 'Saúde e Segurança', company: 75, industry: 70 },
    { name: 'Treinamento', company: 55, industry: 50 },
    { name: 'Engajamento Comunitário', company: 40, industry: 35 },
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

const ESGIndicators = () => {
  const { getVisualPreferences } = useSegment();
  const [activeTab, setActiveTab] = useState('environmental');
  const [selectedChart, setSelectedChart] = useState('bar');
  const [timeframe, setTimeframe] = useState('actual');
  const [esgData, setEsgData] = useState(ESG_DATA);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editCategory, setEditCategory] = useState('');
  const [editValues, setEditValues] = useState<any>([]);
  
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
    return Math.round(data.reduce((acc, item) => acc + item.value, 0) / data.length);
  };
  
  // Get color based on performance (red if below target, green if above)
  const getPerformanceColor = (value, target) => {
    return value >= target ? '#36B37E' : '#FF5630';
  };

  // Open dialog to edit ESG values for a specific category
  const openEditDialog = (category) => {
    setEditCategory(category);
    setEditValues([...esgData[category]]);
    setIsDialogOpen(true);
  };

  // Handle value changes in the dialog
  const handleValueChange = (index, newValue) => {
    const updatedValues = [...editValues];
    updatedValues[index] = { ...updatedValues[index], value: Math.min(Math.max(0, Number(newValue)), 100) };
    setEditValues(updatedValues);
  };

  // Handle target changes in the dialog
  const handleTargetChange = (index, newTarget) => {
    const updatedValues = [...editValues];
    updatedValues[index] = { ...updatedValues[index], target: Math.min(Math.max(0, Number(newTarget)), 100) };
    setEditValues(updatedValues);
  };

  // Save the edited values
  const saveValues = () => {
    setEsgData(prev => ({
      ...prev,
      [editCategory]: editValues
    }));
    setIsDialogOpen(false);
    toast({
      title: "Dados atualizados",
      description: `Os dados de ${editCategory === 'environmental' ? 'Ambiental' : 
                     editCategory === 'social' ? 'Social' : 'Governança'} foram atualizados com sucesso.`,
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
              <Tooltip />
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
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
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
            <Button onClick={() => openEditDialog(activeTab)} className="flex items-center gap-2">
              <PenLine size={16} />
              <span>Editar Indicadores {activeTab === 'environmental' ? 'Ambientais' : 
                     activeTab === 'social' ? 'Sociais' : 'de Governança'}</span>
            </Button>
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
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog('environmental')}
                    >
                      Editar
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
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog('social')}
                    >
                      Editar
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
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog('governance')}
                    >
                      Editar
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
                            <span className={item.value >= item.target ? 'text-green-600' : 'text-red-600'}>
                              {item.value}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${item.value >= item.target ? 'bg-green-500' : 'bg-red-500'}`} 
                              style={{ width: `${item.value}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between text-muted-foreground mt-1">
                            <span>Meta: {item.target}%</span>
                            <span className={item.value >= item.target ? 'text-green-600' : 'text-red-600'}>
                              {item.value >= item.target ? '+' : ''}{item.value - item.target}%
                            </span>
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
                    <li>Aumentar taxa de reciclagem para 75%</li>
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

      {/* ESG Data Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle>Editar Indicadores {editCategory === 'environmental' ? 'Ambientais' : 
                       editCategory === 'social' ? 'Sociais' : 'de Governança'}</DialogTitle>
            <DialogDescription>
              Atualize os valores atuais e as metas para cada indicador.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              {editValues.map((item, index) => (
                <div key={index} className="grid gap-2">
                  <h4 className="font-medium text-sm">{item.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`value-${index}`}>Valor Atual (%)</Label>
                      <Input
                        id={`value-${index}`}
                        type="number"
                        value={item.value}
                        min={0}
                        max={100}
                        onChange={(e) => handleValueChange(index, e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`target-${index}`}>Meta (%)</Label>
                      <Input
                        id={`target-${index}`}
                        type="number"
                        value={item.target}
                        min={0}
                        max={100}
                        onChange={(e) => handleTargetChange(index, e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-1.5 mt-2">
                    <div 
                      className={`h-1.5 rounded-full ${item.value >= item.target ? 'bg-green-500' : 'bg-red-500'}`} 
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                  {index < editValues.length - 1 && <hr className="my-2" />}
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
            <Button onClick={saveValues}>Salvar Alterações</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ESGIndicators;
