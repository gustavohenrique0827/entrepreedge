import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart, 
  Leaf, 
  Recycle, 
  Users, 
  Building2, 
  Award, 
  Lightbulb, 
  Target, 
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Shield,
  BadgeCheck,
  Scale,
  Tree as TreeDeciduous,
  Droplet as Droplets
} from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';
import { Separator } from "@/components/ui/separator";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  Line, 
  BarChart as RechartsBarChart,
  Bar
} from 'recharts';

const ESGIndicators = () => {
  const { currentSegment, segmentName } = useSegment();
  const [reportType, setReportType] = useState('summary');
  const [timeframe, setTimeframe] = useState('year');
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <BarChart size={18} />
    },
    {
      name: 'Indicadores ESG',
      href: '/esg',
      icon: <Leaf size={18} />
    },
  ];

  // ESG score data
  const esgScores = {
    environment: 78,
    social: 65,
    governance: 82,
    total: 75
  };

  // Environmental data
  const environmentalData = [
    { month: 'Jan', energyUsage: 320, wasteProduction: 250, waterConsumption: 180, carbonEmissions: 150 },
    { month: 'Fev', energyUsage: 310, wasteProduction: 240, waterConsumption: 170, carbonEmissions: 145 },
    { month: 'Mar', energyUsage: 300, wasteProduction: 230, waterConsumption: 165, carbonEmissions: 140 },
    { month: 'Abr', energyUsage: 290, wasteProduction: 220, waterConsumption: 160, carbonEmissions: 135 },
    { month: 'Mai', energyUsage: 280, wasteProduction: 210, waterConsumption: 155, carbonEmissions: 130 },
    { month: 'Jun', energyUsage: 270, wasteProduction: 200, waterConsumption: 150, carbonEmissions: 125 },
    { month: 'Jul', energyUsage: 260, wasteProduction: 190, waterConsumption: 145, carbonEmissions: 120 },
    { month: 'Ago', energyUsage: 250, wasteProduction: 180, waterConsumption: 140, carbonEmissions: 115 },
    { month: 'Set', energyUsage: 245, wasteProduction: 175, waterConsumption: 135, carbonEmissions: 110 },
    { month: 'Out', energyUsage: 240, wasteProduction: 170, waterConsumption: 130, carbonEmissions: 105 },
    { month: 'Nov', energyUsage: 235, wasteProduction: 165, waterConsumption: 125, carbonEmissions: 100 },
    { month: 'Dez', energyUsage: 230, wasteProduction: 160, waterConsumption: 120, carbonEmissions: 95 },
  ];

  // Social data
  const socialData = [
    { quarter: 'Q1', employeeSatisfaction: 75, communityEngagement: 25, diversityScore: 65, trainingHours: 120 },
    { quarter: 'Q2', employeeSatisfaction: 78, communityEngagement: 35, diversityScore: 68, trainingHours: 150 },
    { quarter: 'Q3', employeeSatisfaction: 80, communityEngagement: 40, diversityScore: 72, trainingHours: 180 },
    { quarter: 'Q4', employeeSatisfaction: 84, communityEngagement: 50, diversityScore: 76, trainingHours: 200 },
  ];

  // Governance data
  const governanceData = [
    { category: 'Estrutura de Governança', score: 85, benchmark: 70 },
    { category: 'Ética e Compliance', score: 90, benchmark: 75 },
    { category: 'Transparência', score: 75, benchmark: 65 },
    { category: 'Gestão de Riscos', score: 80, benchmark: 68 },
    { category: 'Direitos dos Acionistas', score: 78, benchmark: 72 },
  ];

  // ESG initiatives
  const esgInitiatives = [
    {
      title: 'Redução de Emissões de Carbono',
      area: 'environment',
      progress: 65,
      target: 'Reduzir 30% até 2025',
      status: 'Em andamento'
    },
    {
      title: 'Diversidade e Inclusão',
      area: 'social',
      progress: 80,
      target: '40% de diversidade na liderança',
      status: 'Em andamento'
    },
    {
      title: 'Código de Ética Revisado',
      area: 'governance',
      progress: 100,
      target: 'Implementação completa',
      status: 'Concluído'
    },
    {
      title: 'Economia Circular',
      area: 'environment',
      progress: 40,
      target: '90% de reaproveitamento',
      status: 'Iniciado'
    },
    {
      title: 'Engajamento Comunitário',
      area: 'social',
      progress: 60,
      target: '5 programas sociais anuais',
      status: 'Em andamento'
    }
  ];

  // Calculate improvements year over year
  const improvementYoY = {
    environment: 12.5,
    social: 8.3,
    governance: 5.7,
    total: 9.2
  };

  const handleGenerateReport = () => {
    // Toast logic remains unchanged
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <PageHeader
            title="Indicadores ESG"
            description={`Monitore e gerencie indicadores de sustentabilidade, responsabilidade social e governança para ${segmentName}`}
            icon={<Leaf size={24} />}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20 mr-3">
                      <TreeDeciduous className="h-5 w-5 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Ambiental</p>
                      <p className="text-2xl font-bold">{esgScores.environment}</p>
                    </div>
                  </div>
                  <div className={`flex items-center text-sm ${improvementYoY.environment >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {improvementYoY.environment >= 0 ? 
                      <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                      <ArrowDownRight className="h-4 w-4 mr-1" />}
                    {Math.abs(improvementYoY.environment)}%
                  </div>
                </div>
                <Progress value={esgScores.environment} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 mr-3">
                      <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Social</p>
                      <p className="text-2xl font-bold">{esgScores.social}</p>
                    </div>
                  </div>
                  <div className={`flex items-center text-sm ${improvementYoY.social >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {improvementYoY.social >= 0 ? 
                      <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                      <ArrowDownRight className="h-4 w-4 mr-1" />}
                    {Math.abs(improvementYoY.social)}%
                  </div>
                </div>
                <Progress value={esgScores.social} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20 mr-3">
                      <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Governança</p>
                      <p className="text-2xl font-bold">{esgScores.governance}</p>
                    </div>
                  </div>
                  <div className={`flex items-center text-sm ${improvementYoY.governance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {improvementYoY.governance >= 0 ? 
                      <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                      <ArrowDownRight className="h-4 w-4 mr-1" />}
                    {Math.abs(improvementYoY.governance)}%
                  </div>
                </div>
                <Progress value={esgScores.governance} className="h-2 mt-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/20 mr-3">
                      <BadgeCheck className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Score Total</p>
                      <p className="text-2xl font-bold">{esgScores.total}</p>
                    </div>
                  </div>
                  <div className={`flex items-center text-sm ${improvementYoY.total >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {improvementYoY.total >= 0 ? 
                      <ArrowUpRight className="h-4 w-4 mr-1" /> : 
                      <ArrowDownRight className="h-4 w-4 mr-1" />}
                    {Math.abs(improvementYoY.total)}%
                  </div>
                </div>
                <Progress value={esgScores.total} className="h-2 mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="mb-6">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle>Iniciativas ESG</CardTitle>
                    <CardDescription>Acompanhamento das principais iniciativas de sustentabilidade</CardDescription>
                  </div>
                  <Button onClick={handleGenerateReport}>
                    Gerar Relatório ESG
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {esgInitiatives.map((initiative, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {initiative.area === 'environment' && (
                            <div className="p-2 rounded-full bg-green-100 dark:bg-green-900/20 mr-3">
                              <TreeDeciduous className="h-4 w-4 text-green-600 dark:text-green-400" />
                            </div>
                          )}
                          {initiative.area === 'social' && (
                            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20 mr-3">
                              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                            </div>
                          )}
                          {initiative.area === 'governance' && (
                            <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20 mr-3">
                              <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                            </div>
                          )}
                          <h3 className="font-medium">{initiative.title}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground whitespace-nowrap">{initiative.target}</span>
                          <span 
                            className={`text-xs px-2 py-1 rounded-full ${
                              initiative.status === 'Concluído' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' : 
                              initiative.status === 'Em andamento' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/20 dark:text-amber-400' :
                              'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            }`}
                          >
                            {initiative.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={initiative.progress} className="h-2 flex-1" />
                        <span className="text-sm font-medium w-10 text-right">{initiative.progress}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="environmental" className="mt-6">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="environmental" className="flex items-center">
                <TreeDeciduous className="mr-2 h-4 w-4" />
                Ambiental
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Social
              </TabsTrigger>
              <TabsTrigger value="governance" className="flex items-center">
                <Shield className="mr-2 h-4 w-4" />
                Governança
              </TabsTrigger>
            </TabsList>

            <TabsContent value="environmental" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Indicadores Ambientais</CardTitle>
                  <CardDescription>
                    Evolução dos principais indicadores ambientais nos últimos 12 meses
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={environmentalData}>
                        <defs>
                          <linearGradient id="colorEnergy" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorCarbon" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Legend />
                        <Area type="monotone" dataKey="energyUsage" stroke="#f59e0b" fillOpacity={1} fill="url(#colorEnergy)" name="Consumo de Energia" />
                        <Area type="monotone" dataKey="wasteProduction" stroke="#ef4444" fillOpacity={1} fill="url(#colorWaste)" name="Produção de Resíduos" />
                        <Area type="monotone" dataKey="waterConsumption" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWater)" name="Consumo de Água" />
                        <Area type="monotone" dataKey="carbonEmissions" stroke="#10b981" fillOpacity={1} fill="url(#colorCarbon)" name="Emissões de Carbono" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                    <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-800/50 mb-2">
                          <Droplets className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <h3 className="text-lg font-semibold">-28%</h3>
                        <p className="text-sm text-center text-amber-800 dark:text-amber-300">Consumo de Energia</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="p-2 rounded-full bg-red-100 dark:bg-red-800/50 mb-2">
                          <Recycle className="h-4 w-4 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-lg font-semibold">-36%</h3>
                        <p className="text-sm text-center text-red-800 dark:text-red-300">Produção de Resíduos</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800/50 mb-2">
                          <Droplets className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="text-lg font-semibold">-33%</h3>
                        <p className="text-sm text-center text-blue-800 dark:text-blue-300">Consumo de Água</p>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                      <CardContent className="p-4 flex flex-col items-center">
                        <div className="p-2 rounded-full bg-green-100 dark:bg-green-800/50 mb-2">
                          <Leaf className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold">-37%</h3>
                        <p className="text-sm text-center text-green-800 dark:text-green-300">Emissões de Carbono</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Indicadores Sociais</CardTitle>
                  <CardDescription>
                    Evolução dos principais indicadores sociais nos últimos 4 trimestres
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={socialData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="quarter" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="employeeSatisfaction" stroke="#8884d8" name="Satisfação dos Funcionários" />
                        <Line type="monotone" dataKey="communityEngagement" stroke="#82ca9d" name="Engajamento Comunitário" />
                        <Line type="monotone" dataKey="diversityScore" stroke="#ff7300" name="Índice de Diversidade" />
                        <Line type="monotone" dataKey="trainingHours" stroke="#0088fe" name="Horas de Treinamento" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                          Diversidade e Inclusão
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Gênero</span>
                              <span className="font-medium">47% mulheres</span>
                            </div>
                            <Progress value={47} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Raça/Etnia</span>
                              <span className="font-medium">38% diversidade</span>
                            </div>
                            <Progress value={38} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>PcD</span>
                              <span className="font-medium">5% inclusão</span>
                            </div>
                            <Progress value={5} className="h-2" />
                          </div>
                          <div>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Liderança Diversa</span>
                              <span className="font-medium">29% diversidade</span>
                            </div>
                            <Progress value={29} className="h-2" />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center">
                          <BadgeCheck className="h-4 w-4 mr-2 text-muted-foreground" />
                          Impacto na Comunidade
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                            <span>Pessoas impactadas</span>
                            <span className="font-medium">1.240</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                            <span>Projetos sociais</span>
                            <span className="font-medium">7</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                            <span>Horas voluntariado</span>
                            <span className="font-medium">862</span>
                          </div>
                          <div className="flex justify-between items-center p-2 bg-muted rounded-md">
                            <span>Doações (R$)</span>
                            <span className="font-medium">R$ 87.500</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="governance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Indicadores de Governança</CardTitle>
                  <CardDescription>
                    Comparação entre os indicadores de governança e o benchmark do setor
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsBarChart data={governanceData} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="category" type="category" />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="score" name="Sua Empresa" fill="#8884d8" />
                        <Bar dataKey="benchmark" name="Benchmark do Setor" fill="#82ca9d" />
                      </RechartsBarChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Estrutura de Governança</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Scale className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Compliance Fiscal</div>
                            <div className="text-sm text-muted-foreground">
                              100% das obrigações fiscais atendidas
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-600">Completo</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Shield className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Gerenciamento de Riscos</div>
                            <div className="text-sm text-muted-foreground">
                              Sistema implementado e operante
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-600">Completo</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <BadgeCheck className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Código de Ética e Conduta</div>
                            <div className="text-sm text-muted-foreground">
                              Atualizado e comunicado aos stakeholders
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-green-600">Completo</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 border rounded-md">
                        <div className="flex items-center">
                          <Users className="h-5 w-5 mr-3 text-muted-foreground" />
                          <div>
                            <div className="font-medium">Diversidade no Conselho</div>
                            <div className="text-sm text-muted-foreground">
                              30% de diversidade - meta de 40%
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-amber-600">Em Progresso</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">
                    Exportar Relatório de Governança
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ESGIndicators;
