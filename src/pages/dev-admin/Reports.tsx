
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, LineChart, PieChart } from 'recharts';
import { Bar, Line, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Home, BarChart2, Code, Settings, PieChart as PieChartIcon, LineChart as LineChartIcon, Download } from 'lucide-react';

// Sample data for monthly revenue
const monthlyRevenueData = [
  { name: 'Jan', value: 12500 },
  { name: 'Fev', value: 13200 },
  { name: 'Mar', value: 14800 },
  { name: 'Abr', value: 15100 },
  { name: 'Mai', value: 16300 },
  { name: 'Jun', value: 17200 },
  { name: 'Jul', value: 18900 },
  { name: 'Ago', value: 19500 },
  { name: 'Set', value: 21000 },
  { name: 'Out', value: 22500 },
  { name: 'Nov', value: 23800 },
  { name: 'Dez', value: 25000 },
];

// Sample data for plan distribution
const planDistributionData = [
  { name: 'Básico', value: 120, color: '#8884d8' },
  { name: 'Pro', value: 85, color: '#82ca9d' },
  { name: 'Enterprise', value: 35, color: '#ffc658' },
];

// Sample data for user growth
const userGrowthData = [
  { name: 'Jan', newUsers: 25, activeUsers: 230 },
  { name: 'Fev', newUsers: 30, activeUsers: 255 },
  { name: 'Mar', newUsers: 45, activeUsers: 290 },
  { name: 'Abr', newUsers: 40, activeUsers: 320 },
  { name: 'Mai', newUsers: 55, activeUsers: 360 },
  { name: 'Jun', newUsers: 60, activeUsers: 410 },
  { name: 'Jul', newUsers: 75, activeUsers: 470 },
  { name: 'Ago', newUsers: 85, activeUsers: 540 },
  { name: 'Set', newUsers: 90, activeUsers: 610 },
  { name: 'Out', newUsers: 95, activeUsers: 680 },
  { name: 'Nov', newUsers: 100, activeUsers: 760 },
  { name: 'Dez', newUsers: 110, activeUsers: 850 },
];

// Sample data for revenue by plan
const revenueByPlanData = [
  { name: 'Jan', basic: 2500, pro: 6500, enterprise: 3500 },
  { name: 'Fev', basic: 2600, pro: 6800, enterprise: 3800 },
  { name: 'Mar', basic: 2800, pro: 7500, enterprise: 4500 },
  { name: 'Abr', basic: 2900, pro: 7600, enterprise: 4600 },
  { name: 'Mai', basic: 3100, pro: 8200, enterprise: 5000 },
  { name: 'Jun', basic: 3300, pro: 8600, enterprise: 5300 },
  { name: 'Jul', basic: 3500, pro: 9500, enterprise: 5900 },
  { name: 'Ago', basic: 3700, pro: 9800, enterprise: 6000 },
  { name: 'Set', basic: 3900, pro: 10500, enterprise: 6600 },
  { name: 'Out', basic: 4100, pro: 11200, enterprise: 7200 },
  { name: 'Nov', basic: 4300, pro: 11900, enterprise: 7600 },
  { name: 'Dez', basic: 4600, pro: 12800, enterprise: 7600 },
];

const Reports = () => {
  const [yearFilter, setYearFilter] = useState('2024');
  const [activeTab, setActiveTab] = useState('revenue');
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Dev/Admin',
      href: '/dev-admin/reports',
      icon: <Code size={18} />
    },
    {
      name: 'Configurações',
      href: '/settings',
      icon: <Settings size={18} />
    },
  ];

  const currencyFormatter = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  // Calculate totals
  const totalRevenue = monthlyRevenueData.reduce((sum, item) => sum + item.value, 0);
  const totalCustomers = planDistributionData.reduce((sum, item) => sum + item.value, 0);
  const totalGrowth = userGrowthData[userGrowthData.length - 1].activeUsers - userGrowthData[0].activeUsers;
  const growthPercentage = Math.round((totalGrowth / userGrowthData[0].activeUsers) * 100);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <PageContainer>
          <PageHeader 
            title="Relatórios Financeiros" 
            description="Acompanhe os ganhos e métricas do sistema"
          />
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2024">2024</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Exportar Relatórios
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Receita Total ({yearFilter})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{currencyFormatter(totalRevenue)}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total de Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCustomers}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Crescimento Anual
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{growthPercentage}%</div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="revenue" className="flex items-center gap-2">
                <LineChartIcon className="h-4 w-4" />
                Receita
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <BarChart2 className="h-4 w-4" />
                Usuários
              </TabsTrigger>
              <TabsTrigger value="plans" className="flex items-center gap-2">
                <PieChartIcon className="h-4 w-4" />
                Planos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="revenue">
              <Card>
                <CardHeader>
                  <CardTitle>Receita Mensal ({yearFilter})</CardTitle>
                  <CardDescription>
                    Acompanhe a evolução da receita ao longo do ano
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={monthlyRevenueData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `R$ ${value / 1000}k`} />
                        <Tooltip formatter={(value: any) => currencyFormatter(value)} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="value"
                          name="Receita"
                          stroke="var(--primary-color)"
                          activeDot={{ r: 8 }}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    Crescimento médio mensal: {Math.round((monthlyRevenueData[monthlyRevenueData.length - 1].value / monthlyRevenueData[0].value - 1) * 100 / 12)}%
                  </div>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Receita por Plano ({yearFilter})</CardTitle>
                  <CardDescription>
                    Distribuição da receita entre os diferentes planos
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={revenueByPlanData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis tickFormatter={(value) => `R$ ${value / 1000}k`} />
                        <Tooltip formatter={(value: any) => currencyFormatter(value)} />
                        <Legend />
                        <Bar dataKey="basic" name="Básico" fill="#8884d8" />
                        <Bar dataKey="pro" name="Pro" fill="#82ca9d" />
                        <Bar dataKey="enterprise" name="Enterprise" fill="#ffc658" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    A receita do plano Pro representa a maior parte da receita total.
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Crescimento de Usuários ({yearFilter})</CardTitle>
                  <CardDescription>
                    Acompanhe a evolução de novos usuários e usuários ativos
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userGrowthData}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="activeUsers"
                          name="Usuários Ativos"
                          stroke="var(--primary-color)"
                          strokeWidth={2}
                        />
                        <Line
                          type="monotone"
                          dataKey="newUsers"
                          name="Novos Usuários"
                          stroke="#82ca9d"
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    Crescimento total de {growthPercentage}% no número de usuários ativos durante o ano.
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="plans">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Plano ({yearFilter})</CardTitle>
                  <CardDescription>
                    Visualize a proporção de clientes em cada plano
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="h-[400px] flex items-center justify-center">
                    <ResponsiveContainer width="70%" height="100%">
                      <PieChart>
                        <Pie
                          data={planDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={true}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={150}
                          fill="#8884d8"
                          dataKey="value"
                          nameKey="name"
                        >
                          {planDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any) => value} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <div className="text-sm text-muted-foreground">
                    O plano Básico possui o maior número de clientes, representando {Math.round((planDistributionData[0].value / totalCustomers) * 100)}% do total.
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </PageContainer>
      </div>
    </div>
  );
};

export default Reports;
