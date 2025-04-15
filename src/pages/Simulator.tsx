
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { BarChart, Target, Calculator, TrendingUp, LineChart, ArrowRight, Briefcase, Leaf, Users, DollarSign, BriefcaseBusiness, Building2, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSegment } from '@/contexts/SegmentContext';
import { useToast } from "@/hooks/use-toast";

const Simulator = () => {
  const { currentSegment, segmentName } = useSegment();
  const { toast } = useToast();
  
  // Simulation parameters
  const [goalType, setGoalType] = useState('revenue');
  const [timeframe, setTimeframe] = useState('12');
  const [growthRate, setGrowthRate] = useState(10);
  const [initialValue, setInitialValue] = useState(100000);
  const [investmentPercent, setInvestmentPercent] = useState(5);
  const [simulationCategory, setSimulationCategory] = useState('financial');

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
  
  const generateFinancialSimulationData = () => {
    const months = parseInt(timeframe);
    const data = [];
    let currentValue = initialValue;
    const monthlyGrowthRate = growthRate / 100 / 12;
    const monthlyInvestment = initialValue * (investmentPercent / 100);
    
    for (let i = 0; i <= months; i++) {
      if (goalType === 'revenue') {
        data.push({
          month: i,
          value: currentValue,
          baseline: initialValue * (1 + (0.02 * i)), // 2% baseline growth
        });
        currentValue = currentValue * (1 + monthlyGrowthRate) + monthlyInvestment;
      } else if (goalType === 'clients') {
        data.push({
          month: i,
          value: Math.floor(currentValue),
          baseline: Math.floor(initialValue * (1 + (0.01 * i))), // 1% baseline growth
        });
        currentValue = currentValue * (1 + monthlyGrowthRate * 0.8);
      } else if (goalType === 'costs') {
        data.push({
          month: i,
          value: currentValue,
          baseline: initialValue * (1 - (0.005 * i)), // 0.5% baseline reduction
        });
        currentValue = currentValue * (1 - (monthlyGrowthRate * 0.5));
      }
    }
    
    return data;
  };
  
  const generateHRSimulationData = () => {
    const months = parseInt(timeframe);
    const data = [];
    let currentValue = initialValue; // initial employee count or HR cost
    const monthlyGrowthRate = growthRate / 100 / 12;
    
    for (let i = 0; i <= months; i++) {
      if (goalType === 'employees') {
        data.push({
          month: i,
          value: Math.floor(currentValue),
          baseline: Math.floor(initialValue * (1 + (0.01 * i))), // 1% baseline growth
        });
        currentValue = currentValue * (1 + monthlyGrowthRate * 0.9);
      } else if (goalType === 'productivity') {
        data.push({
          month: i,
          value: currentValue,
          baseline: initialValue * (1 + (0.008 * i)), // 0.8% baseline growth
        });
        currentValue = currentValue * (1 + monthlyGrowthRate * 1.1);
      } else if (goalType === 'training') {
        data.push({
          month: i,
          value: currentValue,
          baseline: initialValue * (1 + (0.01 * i)), // 1% baseline growth
        });
        currentValue = currentValue * (1 + monthlyGrowthRate);
      }
    }
    
    return data;
  };
  
  const generateESGSimulationData = () => {
    const months = parseInt(timeframe);
    const data = [];
    let currentValue = initialValue; // initial ESG score or metric
    const monthlyGrowthRate = growthRate / 100 / 12;
    
    for (let i = 0; i <= months; i++) {
      if (goalType === 'environmental') {
        data.push({
          month: i,
          value: Math.min(100, currentValue), // cap environmental score at 100
          baseline: Math.min(100, initialValue * (1 + (0.01 * i))), // 1% baseline growth
        });
        currentValue = currentValue * (1 + monthlyGrowthRate * 0.8);
      } else if (goalType === 'social') {
        data.push({
          month: i,
          value: Math.min(100, currentValue), // cap social score at 100
          baseline: Math.min(100, initialValue * (1 + (0.008 * i))), // 0.8% baseline growth
        });
        currentValue = currentValue * (1 + monthlyGrowthRate * 0.9);
      } else if (goalType === 'governance') {
        data.push({
          month: i,
          value: Math.min(100, currentValue), // cap governance score at 100
          baseline: Math.min(100, initialValue * (1 + (0.005 * i))), // 0.5% baseline growth
        });
        currentValue = currentValue * (1 + monthlyGrowthRate * 1.2);
      }
    }
    
    return data;
  };
  
  const generateBenchmarkingSimulationData = () => {
    const months = parseInt(timeframe);
    const data = [];
    let currentValue = initialValue;
    const monthlyGrowthRate = growthRate / 100 / 12;
    
    for (let i = 0; i <= months; i++) {
      if (goalType === 'marketshare') {
        data.push({
          month: i,
          value: Math.min(100, currentValue), // cap at 100%
          baseline: Math.min(100, initialValue * (1 + (0.005 * i))), // 0.5% baseline growth
          competitor: Math.min(100, (initialValue * 0.8) * (1 + (0.01 * i))), // competitor growth
        });
        currentValue = currentValue * (1 + monthlyGrowthRate);
      } else if (goalType === 'competitiveness') {
        data.push({
          month: i,
          value: currentValue,
          baseline: initialValue * (1 + (0.01 * i)), // 1% baseline growth
          competitor: (initialValue * 0.9) * (1 + (0.015 * i)), // competitor growth
        });
        currentValue = currentValue * (1 + monthlyGrowthRate * 1.1);
      } else if (goalType === 'growth') {
        data.push({
          month: i,
          value: currentValue,
          baseline: initialValue * (1 + (0.02 * i)), // 2% baseline growth
          industry: (initialValue * 0.85) * (1 + (0.015 * i)), // industry average
        });
        currentValue = currentValue * (1 + monthlyGrowthRate);
      }
    }
    
    return data;
  };
  
  // Get the appropriate simulation data based on the current tab
  const getSimulationData = () => {
    switch(simulationCategory) {
      case 'financial':
        return generateFinancialSimulationData();
      case 'hr':
        return generateHRSimulationData();
      case 'esg':
        return generateESGSimulationData();
      case 'benchmarking':
        return generateBenchmarkingSimulationData();
      default:
        return generateFinancialSimulationData();
    }
  };
  
  const simulationData = getSimulationData();
  const finalValue = simulationData[simulationData.length - 1].value;
  const percentageChange = ((finalValue - initialValue) / initialValue * 100).toFixed(1);
  const isPositiveGoal = goalType !== 'costs';
  
  // Fixed type issues here - ensuring we handle numbers correctly
  const handleGrowthRateChange = (value: number[]) => {
    setGrowthRate(value[0]);
  };
  
  const handleInvestmentPercentChange = (value: number[]) => {
    setInvestmentPercent(value[0]);
  };
  
  const handleSimulationSave = () => {
    toast({
      title: "Simulação Salva",
      description: "Sua simulação foi salva com sucesso."
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  const handleCategoryChange = (category: string) => {
    setSimulationCategory(category);
    
    // Set appropriate initial values and goal types for the selected category
    switch(category) {
      case 'financial':
        setGoalType('revenue');
        setInitialValue(100000);
        break;
      case 'hr':
        setGoalType('employees');
        setInitialValue(50);
        break;
      case 'esg':
        setGoalType('environmental');
        setInitialValue(60);
        break;
      case 'benchmarking':
        setGoalType('marketshare');
        setInitialValue(25);
        break;
    }
  };
  
  // Get the appropriate goal type options based on the current tab
  const getGoalTypeOptions = () => {
    switch(simulationCategory) {
      case 'financial':
        return [
          { value: 'revenue', label: 'Receita' },
          { value: 'clients', label: 'Clientes' },
          { value: 'costs', label: 'Custos' }
        ];
      case 'hr':
        return [
          { value: 'employees', label: 'Colaboradores' },
          { value: 'productivity', label: 'Produtividade' },
          { value: 'training', label: 'Treinamento' }
        ];
      case 'esg':
        return [
          { value: 'environmental', label: 'Ambiental' },
          { value: 'social', label: 'Social' },
          { value: 'governance', label: 'Governança' }
        ];
      case 'benchmarking':
        return [
          { value: 'marketshare', label: 'Participação de Mercado' },
          { value: 'competitiveness', label: 'Competitividade' },
          { value: 'growth', label: 'Crescimento' }
        ];
      default:
        return [
          { value: 'revenue', label: 'Receita' },
          { value: 'clients', label: 'Clientes' },
          { value: 'costs', label: 'Custos' }
        ];
    }
  };
  
  // Format the display value based on the goal type
  const formatValue = (value: number) => {
    switch(simulationCategory) {
      case 'financial':
        return goalType === 'clients' ? Math.floor(value) + ' clientes' : formatCurrency(value);
      case 'hr':
        return goalType === 'employees' ? Math.floor(value) + ' colaboradores' : 
              goalType === 'productivity' ? value.toFixed(1) + '% de produtividade' : 
              formatCurrency(value);
      case 'esg':
        return value.toFixed(1) + ' pontos';
      case 'benchmarking':
        return goalType === 'marketshare' ? value.toFixed(1) + '% de participação' : 
              goalType === 'competitiveness' ? value.toFixed(1) + ' pontos' : 
              value.toFixed(1) + '% de crescimento';
      default:
        return value.toString();
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <PageHeader
            title="Simulador de Metas e Crescimento"
            description={`Projete cenários de crescimento para sua empresa no segmento de ${segmentName}`}
          />
          
          <Tabs defaultValue="financial" value={simulationCategory} onValueChange={handleCategoryChange} className="mt-4">
            <TabsList className="mb-4">
              <TabsTrigger value="financial" className="flex gap-2 items-center">
                <DollarSign size={16} />
                <span>Financeiro</span>
              </TabsTrigger>
              <TabsTrigger value="hr" className="flex gap-2 items-center">
                <Users size={16} />
                <span>Recursos Humanos</span>
              </TabsTrigger>
              <TabsTrigger value="esg" className="flex gap-2 items-center">
                <Leaf size={16} />
                <span>ESG</span>
              </TabsTrigger>
              <TabsTrigger value="benchmarking" className="flex gap-2 items-center">
                <LineChart size={16} />
                <span>Benchmarking</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <Calculator className="mr-2 h-5 w-5 text-muted-foreground" />
                    Parâmetros da Simulação
                  </CardTitle>
                  <CardDescription>Ajuste os valores para simular diferentes cenários</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="goal-type">Tipo de Meta</Label>
                    <Select value={goalType} onValueChange={setGoalType}>
                      <SelectTrigger id="goal-type">
                        <SelectValue placeholder="Selecione o tipo de meta" />
                      </SelectTrigger>
                      <SelectContent>
                        {getGoalTypeOptions().map(option => (
                          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="initial-value">Valor Inicial</Label>
                    <Input 
                      id="initial-value"
                      type="number" 
                      value={initialValue}
                      onChange={(e) => setInitialValue(Number(e.target.value))}
                    />
                    <p className="text-sm text-muted-foreground">
                      {formatValue(initialValue)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>
                      {simulationCategory === 'financial' && goalType === 'costs' ? 'Taxa de Redução (%)' : 'Taxa de Crescimento (%)'}
                    </Label>
                    <div className="flex items-center space-x-2">
                      <Slider 
                        value={[growthRate]} 
                        max={30} 
                        step={0.5}
                        onValueChange={handleGrowthRateChange} 
                      />
                      <span className="w-12 text-center">{growthRate}%</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {simulationCategory === 'financial' && goalType === 'costs' 
                        ? 'Quanto você espera reduzir mensalmente'
                        : 'Taxa anualizada de crescimento esperada'}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timeframe">Período da Simulação (meses)</Label>
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger id="timeframe">
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 meses</SelectItem>
                        <SelectItem value="6">6 meses</SelectItem>
                        <SelectItem value="12">12 meses</SelectItem>
                        <SelectItem value="24">24 meses</SelectItem>
                        <SelectItem value="36">36 meses</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {(simulationCategory === 'financial' && goalType !== 'clients') && (
                    <div className="space-y-2">
                      <Label>
                        {goalType === 'costs' ? 'Investimento em Eficiência (%)' : 'Investimento Mensal (%)'}
                      </Label>
                      <div className="flex items-center space-x-2">
                        <Slider 
                          value={[investmentPercent]} 
                          max={20} 
                          step={0.5}
                          onValueChange={handleInvestmentPercentChange} 
                        />
                        <span className="w-12 text-center">{investmentPercent}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {goalType === 'costs' 
                          ? 'Quanto será investido para reduzir custos'
                          : 'Percentual do valor inicial a ser reinvestido mensalmente'}
                      </p>
                    </div>
                  )}
                  
                  <Button className="w-full mt-2">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Calcular Projeção
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <LineChart className="mr-2 h-5 w-5 text-muted-foreground" />
                    Resultado da Simulação
                  </CardTitle>
                  <CardDescription>
                    Projeção baseada nos parâmetros informados vs. crescimento orgânico
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={simulationData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorBaseline" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1} />
                          </linearGradient>
                          <linearGradient id="colorCompetitor" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#ffc658" stopOpacity={0.1} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="month" 
                          label={{ value: 'Meses', position: 'insideBottomRight', offset: -10 }} 
                        />
                        <YAxis 
                          tickFormatter={(value) => 
                            simulationCategory === 'financial' && goalType === 'clients' ||
                            simulationCategory === 'hr' && goalType === 'employees'
                              ? value.toString() 
                              : new Intl.NumberFormat('pt-BR', { 
                                  notation: 'compact',
                                  compactDisplay: 'short',
                                }).format(value)
                          }
                        />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip
                          formatter={(value: number) => formatValue(value)}
                          labelFormatter={(value) => `Mês ${value}`}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#8884d8" 
                          fillOpacity={1} 
                          fill="url(#colorValue)" 
                          name="Com estratégia"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="baseline" 
                          stroke="#82ca9d" 
                          fillOpacity={1}
                          fill="url(#colorBaseline)" 
                          name="Crescimento orgânico"
                        />
                        {(simulationCategory === 'benchmarking') && (
                          <Area 
                            type="monotone" 
                            dataKey={goalType === 'growth' ? 'industry' : 'competitor'} 
                            stroke="#ffc658" 
                            fillOpacity={1}
                            fill="url(#colorCompetitor)" 
                            name={goalType === 'growth' ? 'Média do setor' : 'Concorrente principal'}
                          />
                        )}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="text-sm font-medium">Valor Inicial</div>
                        <div className="text-2xl font-bold">
                          {formatValue(initialValue)}
                        </div>
                        <ArrowRight className="my-2 text-muted-foreground" />
                        <div className="text-sm font-medium">Valor Projetado</div>
                        <div className="text-2xl font-bold text-primary">
                          {formatValue(finalValue)}
                        </div>
                        <div className={`text-sm mt-1 ${isPositiveGoal ? 'text-green-600' : 'text-red-600'}`}>
                          {isPositiveGoal ? '+' : ''}{percentageChange}% em {timeframe} meses
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-muted/30">
                      <CardContent className="p-4">
                        <div className="text-sm font-medium">Análise de Viabilidade</div>
                        <div className="flex items-center mt-2">
                          <div className="mr-4">
                            <Progress value={75} className="h-2 w-24" />
                          </div>
                          <div>
                            <div className="font-medium">75% de Confiança</div>
                            <div className="text-sm text-muted-foreground">
                              Baseado no histórico do setor
                            </div>
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-sm font-medium mb-1">Recomendações</div>
                          {simulationCategory === 'financial' && (
                            <ul className="text-sm space-y-1 list-disc pl-4">
                              <li>Investir em marketing digital</li>
                              <li>Aumentar retenção de clientes</li>
                              <li>Analisar novos mercados</li>
                            </ul>
                          )}
                          {simulationCategory === 'hr' && (
                            <ul className="text-sm space-y-1 list-disc pl-4">
                              <li>Investir em treinamentos</li>
                              <li>Melhorar processos de contratação</li>
                              <li>Desenvolver plano de carreira</li>
                            </ul>
                          )}
                          {simulationCategory === 'esg' && (
                            <ul className="text-sm space-y-1 list-disc pl-4">
                              <li>Implementar práticas sustentáveis</li>
                              <li>Desenvolver políticas de diversidade</li>
                              <li>Melhorar transparência corporativa</li>
                            </ul>
                          )}
                          {simulationCategory === 'benchmarking' && (
                            <ul className="text-sm space-y-1 list-disc pl-4">
                              <li>Analisar estratégias da concorrência</li>
                              <li>Revisar posicionamento de mercado</li>
                              <li>Desenvolver diferencial competitivo</li>
                            </ul>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="flex justify-end mt-4 gap-2">
                    <Button variant="outline" onClick={handleSimulationSave}>Salvar Simulação</Button>
                    <Button variant="outline">Exportar Relatório</Button>
                    <Button>Criar Meta Baseada na Simulação</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
