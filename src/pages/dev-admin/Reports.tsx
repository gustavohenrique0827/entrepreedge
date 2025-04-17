
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  BarChart,
  LineChart,
  ResponsiveContainer,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Pie,
  PieChart,
  Cell,
  TooltipProps
} from 'recharts';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { format, addDays, subMonths, subDays, subYears } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Calendar, 
  Download, 
  FileBarChart, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  BarChart2, 
  Filter, 
  Share2 
} from 'lucide-react';

const Reports = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('revenue');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: subMonths(new Date(), 6),
    to: new Date(),
  });
  const [periodFilter, setPeriodFilter] = useState<'monthly' | 'annual'>('monthly');
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  
  // Revenue data
  const revenueData = [
    { month: 'Jan', value: 12500, users: 15, planBasic: 5, planPro: 8, planEnterprise: 2 },
    { month: 'Fev', value: 14200, users: 17, planBasic: 6, planPro: 9, planEnterprise: 2 },
    { month: 'Mar', value: 15800, users: 20, planBasic: 7, planPro: 10, planEnterprise: 3 },
    { month: 'Abr', value: 17500, users: 22, planBasic: 7, planPro: 12, planEnterprise: 3 },
    { month: 'Mai', value: 19200, users: 25, planBasic: 8, planPro: 13, planEnterprise: 4 },
    { month: 'Jun', value: 21000, users: 28, planBasic: 9, planPro: 14, planEnterprise: 5 },
    { month: 'Jul', value: 22800, users: 30, planBasic: 10, planPro: 15, planEnterprise: 5 },
    { month: 'Ago', value: 24500, users: 32, planBasic: 11, planPro: 16, planEnterprise: 5 },
    { month: 'Set', value: 26200, users: 35, planBasic: 12, planPro: 17, planEnterprise: 6 },
    { month: 'Out', value: 28000, users: 37, planBasic: 12, planPro: 18, planEnterprise: 7 },
    { month: 'Nov', value: 29800, users: 40, planBasic: 13, planPro: 19, planEnterprise: 8 },
    { month: 'Dez', value: 32000, users: 45, planBasic: 15, planPro: 21, planEnterprise: 9 }
  ];
  
  // Plan distribution data
  const planDistributionData = [
    { name: 'Plano Básico', value: 120 },
    { name: 'Plano Pro', value: 200 },
    { name: 'Plano Enterprise', value: 80 }
  ];
  
  // Status data
  const statusData = [
    { name: 'Ativos', value: 300 },
    { name: 'Trial', value: 50 },
    { name: 'Expirados', value: 20 },
    { name: 'Suspensos', value: 30 }
  ];
  
  // Churn data
  const churnData = [
    { month: 'Jan', value: 2.1 },
    { month: 'Fev', value: 1.8 },
    { month: 'Mar', value: 2.2 },
    { month: 'Abr', value: 1.9 },
    { month: 'Mai', value: 1.7 },
    { month: 'Jun', value: 1.5 },
    { month: 'Jul', value: 1.4 },
    { month: 'Ago', value: 1.6 },
    { month: 'Set', value: 1.5 },
    { month: 'Out', value: 1.3 },
    { month: 'Nov', value: 1.2 },
    { month: 'Dez', value: 1.1 }
  ];
  
  // Colors for pie charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
  
  const handleExportData = () => {
    toast({
      title: "Exportação iniciada",
      description: "Os dados estão sendo exportados para Excel.",
    });
  };
  
  const handleShareReport = () => {
    toast({
      title: "Compartilhar relatório",
      description: "Link para compartilhamento gerado com sucesso.",
    });
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const formatPercentage = (value: number) => {
    return `${value}%`;
  };
  
  // Calculate total revenue
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.value, 0);
  const averageRevenuePerMonth = totalRevenue / revenueData.length;
  
  // Calculate total users
  const totalUsers = revenueData[revenueData.length - 1].users;
  
  // Calculate plan distribution percentages
  const totalPlanUsers = planDistributionData.reduce((sum, item) => sum + item.value, 0);
  const planPercentages = planDistributionData.map(item => ({
    ...item,
    percentage: ((item.value / totalPlanUsers) * 100).toFixed(1)
  }));
  
  // Calculate average churn rate
  const averageChurn = churnData.reduce((sum, item) => sum + item.value, 0) / churnData.length;
  
  return (
    <PageContainer>
      <PageHeader 
        title="Relatórios" 
        description="Visualize e analise os dados financeiros e métricas do sistema" 
      />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Tabs 
            defaultValue="revenue" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="revenue">Receita</TabsTrigger>
              <TabsTrigger value="companies">Empresas</TabsTrigger>
              <TabsTrigger value="plans">Planos</TabsTrigger>
              <TabsTrigger value="churn">Churn</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex-shrink-0">
              <DatePickerWithRange 
                date={dateRange} 
                setDate={setDateRange} 
              />
            </div>
            
            <Select 
              value={periodFilter} 
              onValueChange={(value: 'monthly' | 'annual') => setPeriodFilter(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Mensal</SelectItem>
                <SelectItem value="annual">Anual</SelectItem>
              </SelectContent>
            </Select>
            
            <Select 
              value={chartType} 
              onValueChange={(value: 'bar' | 'line' | 'pie') => setChartType(value)}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo de gráfico" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bar">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="h-4 w-4" />
                    <span>Barras</span>
                  </div>
                </SelectItem>
                <SelectItem value="line">
                  <div className="flex items-center gap-2">
                    <LineChartIcon className="h-4 w-4" />
                    <span>Linha</span>
                  </div>
                </SelectItem>
                <SelectItem value="pie">
                  <div className="flex items-center gap-2">
                    <PieChartIcon className="h-4 w-4" />
                    <span>Pizza</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" onClick={handleExportData}>
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
            
            <Button variant="outline" onClick={handleShareReport}>
              <Share2 className="h-4 w-4 mr-2" />
              Compartilhar
            </Button>
          </div>
        </div>
        
        <TabsContent value="revenue" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Receita Total</CardTitle>
                <CardDescription>Total acumulado no período</CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-3xl font-bold">{formatCurrency(totalRevenue)}</div>
                <p className="text-muted-foreground text-sm">
                  Média: {formatCurrency(averageRevenuePerMonth)}/mês
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Empresas Ativas</CardTitle>
                <CardDescription>Total de empresas cadastradas</CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-3xl font-bold">{totalUsers}</div>
                <p className="text-muted-foreground text-sm">
                  Crescimento: <span className="text-green-500">+12%</span> (últimos 30 dias)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Taxa de Conversão</CardTitle>
                <CardDescription>Trials para assinantes pagos</CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-3xl font-bold">78%</div>
                <p className="text-muted-foreground text-sm">
                  Crescimento: <span className="text-green-500">+5%</span> (último trimestre)
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Receita Mensal</CardTitle>
              <CardDescription>
                Evolução da receita ao longo do tempo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' ? (
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `R$ ${value/1000}k`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), 'Receita']}
                      />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Receita" 
                        fill="#8884d8" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  ) : chartType === 'line' ? (
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `R$ ${value/1000}k`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [formatCurrency(value), 'Receita']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Receita" 
                        stroke="#8884d8" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={revenueData.slice(6, 12)} // Just showing last 6 months for pie
                        dataKey="value"
                        nameKey="month"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {revenueData.slice(6, 12).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [formatCurrency(value), 'Receita']} />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="companies" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Total de Empresas</CardTitle>
                <CardDescription>Empresas cadastradas no sistema</CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-3xl font-bold">400</div>
                <p className="text-muted-foreground text-sm">
                  Crescimento: <span className="text-green-500">+15%</span> (último trimestre)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Taxa de Ativação</CardTitle>
                <CardDescription>Empresas que completaram onboarding</CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-3xl font-bold">85%</div>
                <p className="text-muted-foreground text-sm">
                  Crescimento: <span className="text-green-500">+3%</span> (último mês)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Tempo de Retenção</CardTitle>
                <CardDescription>Tempo médio de assinatura</CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-3xl font-bold">14 meses</div>
                <p className="text-muted-foreground text-sm">
                  Crescimento: <span className="text-green-500">+2 meses</span> (último ano)
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Status das Empresas</CardTitle>
              <CardDescription>
                Distribuição atual de status das empresas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' || chartType === 'line' ? (
                    <BarChart data={statusData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Quantidade" 
                        fill="#0088FE" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="plans" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {planPercentages.map((plan, index) => (
              <Card key={index}>
                <CardHeader className="py-4">
                  <CardTitle className="text-base">{plan.name}</CardTitle>
                  <CardDescription>Empresas neste plano</CardDescription>
                </CardHeader>
                <CardContent className="py-0">
                  <div className="text-3xl font-bold">{plan.value}</div>
                  <p className="text-muted-foreground text-sm">
                    {plan.percentage}% do total de empresas
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Planos</CardTitle>
              <CardDescription>
                Distribuição das empresas por plano de assinatura
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' ? (
                    <BarChart data={planDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Quantidade" 
                        fill="#00C49F" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  ) : chartType === 'line' ? (
                    <BarChart data={planDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Quantidade" 
                        fill="#00C49F" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={planDistributionData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {planDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="churn" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Taxa de Churn</CardTitle>
                <CardDescription>Média do período</CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-3xl font-bold">{averageChurn.toFixed(1)}%</div>
                <p className="text-muted-foreground text-sm">
                  Melhoria: <span className="text-green-500">-0.5%</span> (vs. período anterior)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Tempo para Churn</CardTitle>
                <CardDescription>Média até cancelamento</CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-3xl font-bold">8 meses</div>
                <p className="text-muted-foreground text-sm">
                  Melhoria: <span className="text-green-500">+2 meses</span> (vs. período anterior)
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="py-4">
                <CardTitle className="text-base">Taxa de Renovação</CardTitle>
                <CardDescription>Renovações após vencimento</CardDescription>
              </CardHeader>
              <CardContent className="py-0">
                <div className="text-3xl font-bold">92%</div>
                <p className="text-muted-foreground text-sm">
                  Crescimento: <span className="text-green-500">+3%</span> (vs. período anterior)
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Evolução da Taxa de Churn</CardTitle>
              <CardDescription>
                Acompanhamento mensal da taxa de churn
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'bar' ? (
                    <BarChart data={churnData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Taxa de Churn']}
                      />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Taxa de Churn" 
                        fill="#FF8042" 
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  ) : chartType === 'line' ? (
                    <LineChart data={churnData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis 
                        tickFormatter={(value) => `${value}%`}
                      />
                      <Tooltip 
                        formatter={(value: number) => [`${value}%`, 'Taxa de Churn']}
                      />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        name="Taxa de Churn" 
                        stroke="#FF8042" 
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={churnData.slice(6, 12)} // Just showing last 6 months for pie
                        dataKey="value"
                        nameKey="month"
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        fill="#8884d8"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                      >
                        {churnData.slice(6, 12).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`${value}%`, 'Taxa de Churn']} />
                      <Legend />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </PageContainer>
  );
};

export default Reports;
