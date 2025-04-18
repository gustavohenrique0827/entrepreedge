
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { 
  Home, 
  BarChart2, 
  Target, 
  BookOpen, 
  Activity, 
  Calendar, 
  DollarSign, 
  ShoppingCart,
  Users,
  Briefcase,
  AlertCircle,
  TrendingUp,
  Palette, 
  Bell, 
  Shield, 
  Sliders, 
  Settings as SettingsIcon
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import FinanceTracker from '@/components/FinanceTracker';
import GoalTracker from '@/components/GoalTracker';
import StatCard from '@/components/StatCard';
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from '@/contexts/SubscriptionContext';
import { useSegment } from '@/contexts/SegmentContext';
import { useTheme } from '@/contexts/ThemeContext';
import api from '@/services/dbService';

const financialData = [
  { month: 'Jan', receita: 4000, despesas: 2400 },
  { month: 'Fev', receita: 3000, despesas: 1398 },
  { month: 'Mar', receita: 2000, despesas: 9800 },
  { month: 'Abr', receita: 2780, despesas: 3908 },
  { month: 'Mai', receita: 1890, despesas: 4800 },
  { month: 'Jun', receita: 2390, despesas: 3800 },
  { month: 'Jul', receita: 3490, despesas: 4300 },
  { month: 'Ago', receita: 4000, despesas: 2400 },
  { month: 'Set', receita: 3000, despesas: 1398 },
  { month: 'Out', receita: 2000, despesas: 9800 },
  { month: 'Nov', receita: 2780, despesas: 3908 },
  { month: 'Dez', receita: 1890, despesas: 4800 },
];

const categoryData = [
  { name: 'Marketing', value: 400, fill: '#8884d8' },
  { name: 'Vendas', value: 300, fill: '#83a6ed' },
  { name: 'Produtos', value: 300, fill: '#8dd1e1' },
  { name: 'Serviços', value: 200, fill: '#82ca9d' },
];

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Fev', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Abr', sales: 8000 },
  { name: 'Mai', sales: 6000 },
  { name: 'Jun', sales: 3500 },
  { name: 'Jul', sales: 4000 },
  { name: 'Ago', sales: 5000 },
  { name: 'Set', sales: 6000 },
  { name: 'Out', sales: 8500 },
  { name: 'Nov', sales: 7000 },
  { name: 'Dez', sales: 9000 },
];

const Dashboard = () => {
  const [timePeriod, setTimePeriod] = useState('year');
  const [chartType, setChartType] = useState('area');
  const { currentPlan, hasAccess } = useSubscription();
  const { toast } = useToast();
  const { getVisualPreferences } = useSegment();
  const { primaryColor, secondaryColor, applyThemeColors } = useTheme();
  
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  const businessType = localStorage.getItem('businessType') || '';
  const annualRevenue = localStorage.getItem('annualRevenue') || '0';
  const targetRevenue = localStorage.getItem('targetRevenue') || '0';
  const logoUrl = localStorage.getItem('logoUrl') || '';
  
  const currentRevenueValue = parseInt(annualRevenue) || 0;
  const targetRevenueValue = parseInt(targetRevenue) || 0;
  const monthlyRevenue = Math.round(currentRevenueValue / 12);
  const targetGrowth = currentRevenueValue > 0 
    ? Math.round(((targetRevenueValue - currentRevenueValue) / currentRevenueValue) * 100) 
    : 0;

  useEffect(() => {
    applyThemeColors();
    
    document.title = `${companyName} - Dashboard`;
  }, []);

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Finanças',
      href: '/finances',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Metas',
      href: '/goals',
      icon: <Target size={18} />
    },
    {
      name: 'Benchmarking',
      href: '/benchmarking',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Aprendizado',
      href: '/learn',
      icon: <BookOpen size={18} />
    },
  ];

  const tabIcons = {
    subscription: <SettingsIcon size={16} />,
    appearance: <Palette size={16} />,
    notifications: <Bell size={16} />,
    security: <Shield size={16} />,
    preferences: <Sliders size={16} />
  };

  const renderFinancialChart = () => {
    switch (chartType) {
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="receita" 
                name="Receita" 
                stroke={primaryColor} 
                fill={primaryColor} 
                fillOpacity={0.3} 
              />
              <Area 
                type="monotone" 
                dataKey="despesas" 
                name="Despesas" 
                stroke={secondaryColor} 
                fill={secondaryColor} 
                fillOpacity={0.3} 
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="receita" 
                name="Receita" 
                stroke={primaryColor} 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="despesas" 
                name="Despesas" 
                stroke={secondaryColor} 
              />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
              <Legend />
              <Bar dataKey="receita" name="Receita" fill={primaryColor} />
              <Bar dataKey="despesas" name="Despesas" fill={secondaryColor} />
            </BarChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">Dashboard | {companyName}</h1>
              <p className="text-sm text-muted-foreground">
                {businessType && `${businessType} • `}
                Análise detalhada dos indicadores do seu negócio
              </p>
            </div>
            
            {logoUrl && (
              <div className="hidden md:block">
                <img 
                  src={logoUrl} 
                  alt={`${companyName} Logo`} 
                  className="h-16 w-auto object-contain" 
                />
              </div>
            )}
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Área de análise avançada</AlertTitle>
            <AlertDescription className="text-xs">
              Seu plano atual: <strong>{currentPlan === 'free' ? 'Gratuito' : currentPlan === 'starter' ? 'Iniciante' : currentPlan === 'business' ? 'Empresarial' : 'Premium'}</strong>. 
              {currentPlan === 'free' && " Faça upgrade para acessar todas as funcionalidades de análise."}
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatCard 
              title="Receita Mensal" 
              value={`R$ ${monthlyRevenue.toLocaleString('pt-BR')}`} 
              description={`Meta anual: R$ ${Math.round(targetRevenueValue / 12).toLocaleString('pt-BR')}`} 
              icon={<Activity className="h-4 w-4" />} 
            />
            <StatCard 
              title="Meta de Crescimento" 
              value={`${targetGrowth}%`} 
              description="Para o próximo ano" 
              icon={<TrendingUp className="h-4 w-4" />} 
            />
            <StatCard 
              title="Categoria" 
              value={businessType || "Não definido"} 
              description="Segmento de atuação" 
              icon={<BarChart2 className="h-4 w-4" />} 
            />
            <StatCard 
              title="Metas em Progresso" 
              value="4" 
              description="2 prestes a concluir" 
              icon={<Target className="h-4 w-4" />} 
            />
          </div>
          
          <div className="mb-6">
            <Tabs defaultValue="financial" className="w-full">
              <div className="flex justify-between items-center mb-4">
                <TabsList>
                  <TabsTrigger value="financial">Financeiro</TabsTrigger>
                  <TabsTrigger value="sales">Vendas</TabsTrigger>
                  <TabsTrigger value="goals">Metas</TabsTrigger>
                  <TabsTrigger value="analytics">Análises</TabsTrigger>
                </TabsList>
                
                <div className="flex gap-2">
                  <Select value={timePeriod} onValueChange={setTimePeriod}>
                    <SelectTrigger className="w-[120px]">
                      <div className="flex items-center">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Período</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="month">Mês</SelectItem>
                      <SelectItem value="quarter">Trimestre</SelectItem>
                      <SelectItem value="year">Ano</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={chartType} onValueChange={setChartType}>
                    <SelectTrigger className="w-[120px]">
                      <div className="flex items-center">
                        <BarChart2 className="mr-2 h-4 w-4" />
                        <span>Gráfico</span>
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="area">Área</SelectItem>
                      <SelectItem value="line">Linha</SelectItem>
                      <SelectItem value="bar">Barras</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <TabsContent value="financial" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-1">
                        <BarChart2 size={16} /> 
                        Análise Financeira Detalhada
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Evolução de receitas e despesas ao longo do {timePeriod === 'month' ? 'mês' : timePeriod === 'quarter' ? 'trimestre' : 'ano'}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] overflow-hidden">
                        {renderFinancialChart()}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-1">
                        <DollarSign size={16} /> 
                        Distribuição por Categoria
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Percentual de receita por categoria
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="h-[300px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height={280}>
                          <PieChart>
                            <Pie
                              data={categoryData.map(item => ({
                                ...item,
                                fill: item.name === 'Marketing' ? primaryColor :
                                      item.name === 'Vendas' ? secondaryColor :
                                      item.name === 'Produtos' ? '#36B37E' : '#00B8D9'
                              }))}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            />
                            <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="sales" className="mt-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <Card className="col-span-2">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-1">
                        <ShoppingCart size={16} /> 
                        Performance de Vendas
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Volume de vendas mensais
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] overflow-hidden">
                        <ResponsiveContainer width="100%" height={300}>
                          <BarChart data={salesData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `R$ ${value.toLocaleString('pt-BR')}`} />
                            <Bar dataKey="sales" name="Vendas" fill={primaryColor} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-1">
                        <Users size={16} /> 
                        Top Clientes
                      </CardTitle>
                      <CardDescription className="text-xs">
                        Clientes com maior volume de compras
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 pt-4">
                        {['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D', 'Cliente E'].map((client, i) => (
                          <div key={client} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                                {client.charAt(0)}
                              </div>
                              <span className="font-medium">{client}</span>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              R$ {(Math.random() * 10000).toFixed(2).replace('.', ',')}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="goals" className="mt-0">
                {hasAccess('goals') ? (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-1">
                        <Target size={16} /> 
                        Progresso de Metas Detalhado
                      </CardTitle>
                      <CardDescription className="text-xs">Acompanhamento detalhado das suas metas estratégicas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px] overflow-auto">
                        <GoalTracker />
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="bg-muted/10 border border-dashed rounded-lg p-8 text-center">
                    <Target className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
                    <h3 className="text-lg font-medium mb-2">Módulo de Metas</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      O módulo de metas está disponível apenas em planos mais avançados. Faça upgrade para acessar.
                    </p>
                    <button 
                      onClick={() => window.location.href = '/settings'} 
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Fazer upgrade
                    </button>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="analytics" className="mt-0">
                {hasAccess('analytics') ? (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-1">
                        <Briefcase size={16} /> 
                        Análise Avançada de Negócio
                      </CardTitle>
                      <CardDescription className="text-xs">Métricas avançadas para tomada de decisão</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium mb-2">KPIs de Performance</h3>
                            <div className="space-y-2">
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Conversão de Leads</span>
                                  <span className="font-medium">32%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-1.5">
                                  <div className="bg-primary h-1.5 rounded-full" style={{ width: '32%' }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Satisfação do Cliente</span>
                                  <span className="font-medium">89%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-1.5">
                                  <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '89%' }}></div>
                                </div>
                              </div>
                              <div>
                                <div className="flex items-center justify-between text-xs mb-1">
                                  <span>Tempo Médio de Resposta</span>
                                  <span className="font-medium">67%</span>
                                </div>
                                <div className="w-full bg-muted rounded-full h-1.5">
                                  <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: '67%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium mb-2">Eficiência Operacional</h3>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="p-2 border rounded-md">
                                <div className="text-xs text-muted-foreground">CAC</div>
                                <div className="text-lg font-semibold">R$ 350</div>
                              </div>
                              <div className="p-2 border rounded-md">
                                <div className="text-xs text-muted-foreground">LTV</div>
                                <div className="text-lg font-semibold">R$ 5.800</div>
                              </div>
                              <div className="p-2 border rounded-md">
                                <div className="text-xs text-muted-foreground">Churn</div>
                                <div className="text-lg font-semibold">3.2%</div>
                              </div>
                              <div className="p-2 border rounded-md">
                                <div className="text-xs text-muted-foreground">MRR</div>
                                <div className="text-lg font-semibold">R$ 15K</div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="h-[300px] flex items-center justify-center">
                          <ResponsiveContainer width="100%" height={280}>
                            <LineChart data={[
                              { month: 'Jan', eficiencia: 65 },
                              { month: 'Fev', eficiencia: 68 },
                              { month: 'Mar', eficiencia: 62 },
                              { month: 'Abr', eficiencia: 70 },
                              { month: 'Mai', eficiencia: 75 },
                              { month: 'Jun', eficiencia: 78 },
                              { month: 'Jul', eficiencia: 82 },
                              { month: 'Ago', eficiencia: 85 },
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="month" />
                              <YAxis domain={[50, 100]} />
                              <Tooltip formatter={(value) => `${value}%`} />
                              <Line 
                                type="monotone" 
                                dataKey="eficiencia" 
                                name="Eficiência" 
                                stroke={primaryColor} 
                                activeDot={{ r: 8 }} 
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="bg-muted/10 border border-dashed rounded-lg p-8 text-center">
                    <BarChart2 className="mx-auto h-12 w-12 text-muted-foreground/60 mb-3" />
                    <h3 className="text-lg font-medium mb-2">Módulo de Análises</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      O módulo de análises avançadas está disponível apenas em planos mais avançados. Faça upgrade para acessar.
                    </p>
                    <button 
                      onClick={() => window.location.href = '/settings'} 
                      className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    >
                      Fazer upgrade
                    </button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <Card className="glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center gap-1">
                  <BarChart2 size={16} /> 
                  Projeção Financeira
                </CardTitle>
                <CardDescription className="text-xs">
                  Análise de tendências futuras com base nos dados atuais
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] overflow-hidden">
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart
                      data={[...financialData, 
                        { month: 'Jan (Proj)', receita: 5000, despesas: 2600, previsao: true },
                        { month: 'Fev (Proj)', receita: 5200, despesas: 2700, previsao: true },
                        { month: 'Mar (Proj)', receita: 5500, despesas: 2900, previsao: true },
                      ]}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value, name, props) => {
                        return [`R$ ${value.toLocaleString('pt-BR')}`, name];
                      }} />
                      <Legend />
                      <defs>
                        <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={primaryColor} stopOpacity={0.8}/>
                          <stop offset="95%" stopColor={primaryColor} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area 
                        type="monotone" 
                        dataKey="receita" 
                        name="Receita (Atual)" 
                        stroke={primaryColor} 
                        fillOpacity={1} 
                        fill="url(#colorReceita)"
                        connectNulls
                        data={[...financialData]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="receita" 
                        name="Receita (Projeção)" 
                        stroke={primaryColor}
                        strokeDasharray="5 5" 
                        fillOpacity={0.3} 
                        fill="url(#colorReceita)"
                        connectNulls
                        data={[
                          { month: 'Dez', receita: 1890 },
                          { month: 'Jan (Proj)', receita: 5000 },
                          { month: 'Fev (Proj)', receita: 5200 },
                          { month: 'Mar (Proj)', receita: 5500 },
                        ]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="despesas" 
                        name="Despesas (Atual)" 
                        stroke={secondaryColor} 
                        fillOpacity={0.3}
                        connectNulls
                        data={[...financialData]}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="despesas" 
                        name="Despesas (Projeção)" 
                        stroke={secondaryColor}
                        strokeDasharray="5 5" 
                        fillOpacity={0.1}
                        connectNulls
                        data={[
                          { month: 'Dez', despesas: 4800 },
                          { month: 'Jan (Proj)', despesas: 2600 },
                          { month: 'Fev (Proj)', despesas: 2700 },
                          { month: 'Mar (Proj)', despesas: 2900 },
                        ]}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
