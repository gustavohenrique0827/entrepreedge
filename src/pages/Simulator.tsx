import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Target, Calculator, TrendingUp, LineChart, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useSegment } from '@/contexts/SegmentContext';

const Simulator = () => {
  const { currentSegment, segmentName } = useSegment();
  
  // Simulation parameters
  const [goalType, setGoalType] = useState('revenue');
  const [timeframe, setTimeframe] = useState('12');
  const [growthRate, setGrowthRate] = useState(10);
  const [initialValue, setInitialValue] = useState(100000);
  const [investmentPercent, setInvestmentPercent] = useState(5);

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
  
  const generateSimulationData = () => {
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
  
  const simulationData = generateSimulationData();
  const finalValue = simulationData[simulationData.length - 1].value;
  const percentageChange = ((finalValue - initialValue) / initialValue * 100).toFixed(1);
  const isPositiveGoal = goalType !== 'costs';
  
  const handleGrowthRateChange = (value: number[]) => {
    setGrowthRate(value[0]);
  };
  
  const handleInvestmentPercentChange = (value: number[]) => {
    setInvestmentPercent(value[0]);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <PageHeader
            title="Simulador de Metas e Crescimento"
            subtitle={`Projete cenários de crescimento para sua empresa no segmento de ${segmentName}`}
          />
          
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
                      <SelectItem value="revenue">Receita</SelectItem>
                      <SelectItem value="clients">Clientes</SelectItem>
                      <SelectItem value="costs">Custos</SelectItem>
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
                    {goalType === 'clients' ? 'Número atual de clientes' : formatCurrency(initialValue)}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label>
                    {goalType === 'costs' ? 'Taxa de Redução (%)' : 'Taxa de Crescimento (%)'}
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
                    {goalType === 'costs' 
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
                
                {goalType !== 'clients' && (
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
                      </defs>
                      <XAxis 
                        dataKey="month" 
                        label={{ value: 'Meses', position: 'insideBottomRight', offset: -10 }} 
                      />
                      <YAxis 
                        tickFormatter={(value) => goalType === 'clients' 
                          ? value 
                          : new Intl.NumberFormat('pt-BR', { 
                              notation: 'compact',
                              compactDisplay: 'short',
                            }).format(value)
                        }
                      />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip
                        formatter={(value) => goalType === 'clients'
                          ? Math.floor(value) + ' clientes'
                          : formatCurrency(value)
                        }
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
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  <Card className="bg-muted/30">
                    <CardContent className="p-4">
                      <div className="text-sm font-medium">Valor Inicial</div>
                      <div className="text-2xl font-bold">
                        {goalType === 'clients' 
                          ? Math.floor(initialValue) + ' clientes'
                          : formatCurrency(initialValue)
                        }
                      </div>
                      <ArrowRight className="my-2 text-muted-foreground" />
                      <div className="text-sm font-medium">Valor Projetado</div>
                      <div className="text-2xl font-bold text-primary">
                        {goalType === 'clients' 
                          ? Math.floor(finalValue) + ' clientes'
                          : formatCurrency(finalValue)
                        }
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
                        <ul className="text-sm space-y-1 list-disc pl-4">
                          <li>Investir em marketing digital</li>
                          <li>Aumentar retenção de clientes</li>
                          <li>Analisar novos mercados</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="flex justify-end mt-4 gap-2">
                  <Button variant="outline">Salvar Simulação</Button>
                  <Button variant="outline">Exportar Relatório</Button>
                  <Button>Criar Meta Baseada na Simulação</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulator;
