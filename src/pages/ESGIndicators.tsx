
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Leaf, Recycle, Droplets, Factory, BatteryCharging, Building, Heart, Users, BriefcaseBusiness } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { BarChart, LineChart, AreaChart, PieChart, ResponsiveContainer, Bar, Line, Area, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Sample data for graphs
const environmentalData = {
  bar: [
    { name: 'Jan', valor: 1200 },
    { name: 'Fev', valor: 1900 },
    { name: 'Mar', valor: 3000 },
    { name: 'Abr', valor: 2780 },
    { name: 'Mai', valor: 1890 },
    { name: 'Jun', valor: 2390 },
    { name: 'Jul', valor: 3490 },
  ],
  line: [
    { name: 'Jan', valor: 4000 },
    { name: 'Fev', valor: 3000 },
    { name: 'Mar', valor: 2000 },
    { name: 'Abr', valor: 2780 },
    { name: 'Mai', valor: 1890 },
    { name: 'Jun', valor: 2390 },
    { name: 'Jul', valor: 3490 },
  ],
  area: [
    { name: 'Jan', valor: 4000 },
    { name: 'Fev', valor: 5000 },
    { name: 'Mar', valor: 3000 },
    { name: 'Abr', valor: 4000 },
    { name: 'Mai', valor: 3000 },
    { name: 'Jun', valor: 5000 },
    { name: 'Jul', valor: 6000 },
  ],
  pie: [
    { name: 'Reciclagem', valor: 400 },
    { name: 'Energia renovável', valor: 300 },
    { name: 'Água reaproveitada', valor: 300 },
    { name: 'Emissões reduzidas', valor: 200 },
  ],
};

const socialData = {
  bar: [
    { name: 'Jan', valor: 500 },
    { name: 'Fev', valor: 800 },
    { name: 'Mar', valor: 1500 },
    { name: 'Abr', valor: 1300 },
    { name: 'Mai', valor: 1700 },
    { name: 'Jun', valor: 1400 },
    { name: 'Jul', valor: 2000 },
  ],
  line: [
    { name: 'Jan', valor: 1000 },
    { name: 'Fev', valor: 1500 },
    { name: 'Mar', valor: 1300 },
    { name: 'Abr', valor: 1780 },
    { name: 'Mai', valor: 1890 },
    { name: 'Jun', valor: 2390 },
    { name: 'Jul', valor: 2490 },
  ],
  area: [
    { name: 'Jan', valor: 2000 },
    { name: 'Fev', valor: 2500 },
    { name: 'Mar', valor: 2000 },
    { name: 'Abr', valor: 3000 },
    { name: 'Mai', valor: 2500 },
    { name: 'Jun', valor: 4000 },
    { name: 'Jul', valor: 3500 },
  ],
  pie: [
    { name: 'Diversidade', valor: 500 },
    { name: 'Treinamento', valor: 300 },
    { name: 'Benefícios', valor: 250 },
    { name: 'Voluntariado', valor: 200 },
  ],
};

const governanceData = {
  bar: [
    { name: 'Jan', valor: 900 },
    { name: 'Fev', valor: 1200 },
    { name: 'Mar', valor: 1600 },
    { name: 'Abr', valor: 1400 },
    { name: 'Mai', valor: 1900 },
    { name: 'Jun', valor: 2100 },
    { name: 'Jul', valor: 2400 },
  ],
  line: [
    { name: 'Jan', valor: 2000 },
    { name: 'Fev', valor: 2200 },
    { name: 'Mar', valor: 2100 },
    { name: 'Abr', valor: 2500 },
    { name: 'Mai', valor: 2300 },
    { name: 'Jun', valor: 2800 },
    { name: 'Jul', valor: 3100 },
  ],
  area: [
    { name: 'Jan', valor: 3000 },
    { name: 'Fev', valor: 3200 },
    { name: 'Mar', valor: 3100 },
    { name: 'Abr', valor: 3300 },
    { name: 'Mai', valor: 3500 },
    { name: 'Jun', valor: 3700 },
    { name: 'Jul', valor: 4000 },
  ],
  pie: [
    { name: 'Transparência', valor: 350 },
    { name: 'Ética', valor: 300 },
    { name: 'Compliance', valor: 280 },
    { name: 'Gestão de Riscos', valor: 240 },
  ],
};

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const ESGIndicators = () => {
  const [activeTab, setActiveTab] = useState('environmental');
  const [chartType, setChartType] = useState('bar');
  
  // Function to get the current data based on active tab
  const getCurrentData = () => {
    if (activeTab === 'environmental') return environmentalData;
    if (activeTab === 'social') return socialData;
    return governanceData;
  };
  
  // Function to render the appropriate chart based on type
  const renderChart = () => {
    const data = getCurrentData()[chartType as keyof typeof environmentalData];
    
    switch(chartType) {
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="valor" fill="var(--primary-color)" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="valor" stroke="var(--primary-color)" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'area':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="valor" stroke="var(--primary-color)" fill="var(--primary-color)" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="valor"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <div>Selecione um tipo de gráfico</div>;
    }
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Indicadores ESG</h1>
            <p className="text-sm text-muted-foreground">
              Monitore o progresso da sua empresa em iniciativas ambientais, sociais e de governança
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Benefícios ESG</AlertTitle>
            <AlertDescription className="text-xs">
              Empresas com boas práticas ESG geralmente apresentam melhores resultados e maior valor de mercado a longo prazo.
            </AlertDescription>
          </Alert>
          
          <Tabs 
            defaultValue="environmental" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="mb-6"
          >
            <TabsList className="grid grid-cols-3 w-full md:w-[600px]">
              <TabsTrigger value="environmental" className="flex items-center gap-2">
                <Leaf size={16} />
                <span>Ambiental</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Heart size={16} />
                <span>Social</span>
              </TabsTrigger>
              <TabsTrigger value="governance" className="flex items-center gap-2">
                <Building size={16} />
                <span>Governança</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="environmental" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Leaf size={18} className="text-green-500" />
                    Métricas Ambientais
                  </CardTitle>
                  <CardDescription>Monitoramento do impacto ambiental da empresa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Emissão de CO2</p>
                          <p className="text-xl font-bold mt-1">14.5 <span className="text-xs font-normal">ton</span></p>
                        </div>
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Factory className="h-5 w-5 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Energia Renovável</p>
                          <p className="text-xl font-bold mt-1">42% <span className="text-xs font-normal">do total</span></p>
                        </div>
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <BatteryCharging className="h-5 w-5 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Consumo de Água</p>
                          <p className="text-xl font-bold mt-1">3.2 <span className="text-xs font-normal">mil m³</span></p>
                        </div>
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Droplets className="h-5 w-5 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Reciclagem</p>
                          <p className="text-xl font-bold mt-1">78% <span className="text-xs font-normal">do lixo</span></p>
                        </div>
                        <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                          <Recycle className="h-5 w-5 text-green-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={chartType === 'bar' ? 'default' : 'outline'} 
                        onClick={() => setChartType('bar')}
                        size="sm"
                      >
                        Barras
                      </Button>
                      <Button 
                        variant={chartType === 'line' ? 'default' : 'outline'} 
                        onClick={() => setChartType('line')}
                        size="sm"
                      >
                        Linha
                      </Button>
                      <Button 
                        variant={chartType === 'area' ? 'default' : 'outline'} 
                        onClick={() => setChartType('area')}
                        size="sm"
                      >
                        Área
                      </Button>
                      <Button 
                        variant={chartType === 'pie' ? 'default' : 'outline'} 
                        onClick={() => setChartType('pie')}
                        size="sm"
                      >
                        Pizza
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      {renderChart()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="social" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Heart size={18} className="text-red-500" />
                    Métricas Sociais
                  </CardTitle>
                  <CardDescription>Acompanhamento das iniciativas sociais e de recursos humanos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Diversidade</p>
                          <p className="text-xl font-bold mt-1">48% <span className="text-xs font-normal">mulheres</span></p>
                        </div>
                        <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-red-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Treinamento</p>
                          <p className="text-xl font-bold mt-1">22 <span className="text-xs font-normal">horas/col.</span></p>
                        </div>
                        <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <BriefcaseBusiness className="h-5 w-5 text-red-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Voluntariado</p>
                          <p className="text-xl font-bold mt-1">480 <span className="text-xs font-normal">horas</span></p>
                        </div>
                        <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Heart className="h-5 w-5 text-red-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Rotatividade</p>
                          <p className="text-xl font-bold mt-1">12% <span className="text-xs font-normal">anual</span></p>
                        </div>
                        <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <Users className="h-5 w-5 text-red-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={chartType === 'bar' ? 'default' : 'outline'} 
                        onClick={() => setChartType('bar')}
                        size="sm"
                      >
                        Barras
                      </Button>
                      <Button 
                        variant={chartType === 'line' ? 'default' : 'outline'} 
                        onClick={() => setChartType('line')}
                        size="sm"
                      >
                        Linha
                      </Button>
                      <Button 
                        variant={chartType === 'area' ? 'default' : 'outline'} 
                        onClick={() => setChartType('area')}
                        size="sm"
                      >
                        Área
                      </Button>
                      <Button 
                        variant={chartType === 'pie' ? 'default' : 'outline'} 
                        onClick={() => setChartType('pie')}
                        size="sm"
                      >
                        Pizza
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      {renderChart()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="governance" className="pt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <Building size={18} className="text-blue-500" />
                    Métricas de Governança
                  </CardTitle>
                  <CardDescription>Acompanhamento das práticas de governança corporativa</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Transparência</p>
                          <p className="text-xl font-bold mt-1">94% <span className="text-xs font-normal">índice</span></p>
                        </div>
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Compliance</p>
                          <p className="text-xl font-bold mt-1">100% <span className="text-xs font-normal">conformidade</span></p>
                        </div>
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Ética</p>
                          <p className="text-xl font-bold mt-1">0 <span className="text-xs font-normal">violações</span></p>
                        </div>
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Building className="h-5 w-5 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">Riscos</p>
                          <p className="text-xl font-bold mt-1">87% <span className="text-xs font-normal">mitigação</span></p>
                        </div>
                        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-blue-500" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      <Button 
                        variant={chartType === 'bar' ? 'default' : 'outline'} 
                        onClick={() => setChartType('bar')}
                        size="sm"
                      >
                        Barras
                      </Button>
                      <Button 
                        variant={chartType === 'line' ? 'default' : 'outline'} 
                        onClick={() => setChartType('line')}
                        size="sm"
                      >
                        Linha
                      </Button>
                      <Button 
                        variant={chartType === 'area' ? 'default' : 'outline'} 
                        onClick={() => setChartType('area')}
                        size="sm"
                      >
                        Área
                      </Button>
                      <Button 
                        variant={chartType === 'pie' ? 'default' : 'outline'} 
                        onClick={() => setChartType('pie')}
                        size="sm"
                      >
                        Pizza
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-md">
                      {renderChart()}
                    </div>
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

export default ESGIndicators;
