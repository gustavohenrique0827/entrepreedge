
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, DollarSign, FileText, TrendingUp, ChevronDown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Taxes = () => {
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Gestão de Impostos</h1>
            <p className="text-sm text-muted-foreground">
              Controle e planejamento tributário de {companyName}
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">Calendário tributário</AlertTitle>
            <AlertDescription className="text-xs">
              Você tem 3 impostos com vencimento nos próximos 15 dias. <a href="#" className="underline">Ver vencimentos</a>
            </AlertDescription>
          </Alert>
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-semibold">Visão Geral de Impostos</h2>
            </div>
            
            <div className="flex items-center gap-2">
              <Select defaultValue="abril">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="janeiro">Janeiro 2025</SelectItem>
                  <SelectItem value="fevereiro">Fevereiro 2025</SelectItem>
                  <SelectItem value="marco">Março 2025</SelectItem>
                  <SelectItem value="abril">Abril 2025</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Impostos Federais</p>
                    <p className="text-2xl font-bold mt-1">R$ 9.341,00</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-red-500 mt-2 flex items-center">
                  +5.8% em relação ao mês anterior
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Impostos Estaduais</p>
                    <p className="text-2xl font-bold mt-1">R$ 5.210,00</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-red-500 mt-2 flex items-center">
                  +3.2% em relação ao mês anterior
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Impostos Municipais</p>
                    <p className="text-2xl font-bold mt-1">R$ 3.020,00</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-green-500 mt-2 flex items-center">
                  -1.5% em relação ao mês anterior
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Carga Tributária</p>
                    <p className="text-2xl font-bold mt-1">28.4%</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-amber-500 mt-2 flex items-center">
                  Média do setor: 27.6%
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="gestao" className="mb-6">
            <TabsList className="grid grid-cols-3 w-full md:w-[500px]">
              <TabsTrigger value="gestao">Gestão de Impostos</TabsTrigger>
              <TabsTrigger value="planejamento">Planejamento Tributário</TabsTrigger>
              <TabsTrigger value="incentivos">Incentivos Fiscais</TabsTrigger>
            </TabsList>
            
            <TabsContent value="gestao" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Próximos Vencimentos</CardTitle>
                    <CardDescription>Impostos a vencer nos próximos 30 dias</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-md flex justify-between items-center bg-amber-50 border-amber-100">
                        <div>
                          <p className="font-medium">IRPJ</p>
                          <p className="text-sm text-muted-foreground">Vencimento em 29/04/2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ 2.450,00</p>
                          <Button variant="outline" size="sm" className="mt-1">Pagar</Button>
                        </div>
                      </div>
                      <div className="p-3 border rounded-md flex justify-between items-center bg-amber-50 border-amber-100">
                        <div>
                          <p className="font-medium">CSLL</p>
                          <p className="text-sm text-muted-foreground">Vencimento em 29/04/2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ 1.380,00</p>
                          <Button variant="outline" size="sm" className="mt-1">Pagar</Button>
                        </div>
                      </div>
                      <div className="p-3 border rounded-md flex justify-between items-center bg-amber-50 border-amber-100">
                        <div>
                          <p className="font-medium">INSS</p>
                          <p className="text-sm text-muted-foreground">Vencimento em 20/04/2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ 3.450,00</p>
                          <Button variant="outline" size="sm" className="mt-1">Pagar</Button>
                        </div>
                      </div>
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <p className="font-medium">PIS</p>
                          <p className="text-sm text-muted-foreground">Vencimento em 20/05/2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ 975,00</p>
                          <Button variant="outline" size="sm" className="mt-1">Pagar</Button>
                        </div>
                      </div>
                      <div className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                          <p className="font-medium">COFINS</p>
                          <p className="text-sm text-muted-foreground">Vencimento em 20/05/2025</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ 4.536,00</p>
                          <Button variant="outline" size="sm" className="mt-1">Pagar</Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Distribuição de Impostos</CardTitle>
                    <CardDescription>Por esfera e tipo tributário</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-5">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">Por Esfera</h3>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span>Federal</span>
                              <span>53%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '53%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span>Estadual</span>
                              <span>30%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span>Municipal</span>
                              <span>17%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{ width: '17%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="text-sm font-medium">Por Tipo de Imposto</h3>
                        </div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span>Sobre Faturamento</span>
                              <span>41%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '41%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span>Sobre Lucro</span>
                              <span>22%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span>Sobre Folha de Pagamento</span>
                              <span>20%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between items-center text-xs mb-1">
                              <span>Outros</span>
                              <span>17%</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '17%' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button variant="outline" className="w-full mt-5">
                      <FileText className="mr-2 h-4 w-4" /> 
                      Ver relatório completo
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="planejamento" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Planejamento Tributário</CardTitle>
                  <CardDescription>Estratégias e análises para otimização fiscal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="bg-muted/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary mr-2 text-xs">1</span>
                            Regime Tributário
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm mb-3">
                            <p className="font-medium">Regime atual: <span className="text-primary">Lucro Presumido</span></p>
                            <p className="text-muted-foreground mt-1">Baseado na sua receita bruta e atividade.</p>
                          </div>
                          <div className="space-y-2 mb-3">
                            <div className="flex justify-between text-xs">
                              <span>Eficiência:</span>
                              <span>82%</span>
                            </div>
                            <Progress value={82} className="h-1.5" />
                          </div>
                          <Button variant="outline" size="sm" className="w-full">Simular outros regimes</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary mr-2 text-xs">2</span>
                            Oportunidades de Economia
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm mb-2">
                            <p className="text-muted-foreground">Potencial de economia identificado:</p>
                            <p className="font-medium text-lg">R$ 4.850,00</p>
                            <p className="text-green-500 text-xs">8.5% da carga atual</p>
                          </div>
                          <div className="space-y-1 mb-3">
                            <div className="text-xs">
                              <span className="text-muted-foreground">• Otimização de créditos de PIS/COFINS</span>
                            </div>
                            <div className="text-xs">
                              <span className="text-muted-foreground">• Revisão de enquadramento NCM</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">Ver detalhes</Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm flex items-center">
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/20 text-primary mr-2 text-xs">3</span>
                            Riscos Fiscais
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-sm mb-2">
                            <p className="text-muted-foreground">Nível de risco atual:</p>
                            <div className="flex items-center mt-1">
                              <div className="w-3 h-3 rounded-full bg-amber-500 mr-2"></div>
                              <p className="font-medium">Médio</p>
                            </div>
                          </div>
                          <div className="space-y-1 mb-3">
                            <div className="text-xs">
                              <span className="text-muted-foreground">• Divergência de alíquotas ICMS</span>
                            </div>
                            <div className="text-xs">
                              <span className="text-muted-foreground">• Validação de créditos fiscais</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full">Análise de riscos</Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <div className="flex items-start">
                        <div className="mr-4">
                          <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                            <FileText className="h-5 w-5 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-medium mb-1">Consultoria Tributária Personalizada</h3>
                          <p className="text-sm text-muted-foreground mb-3">
                            Agende uma sessão com nosso especialista tributário para analisar oportunidades específicas para seu negócio.
                          </p>
                          <Button>Agendar Consultoria</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="incentivos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Incentivos Fiscais</CardTitle>
                  <CardDescription>Benefícios disponíveis para seu negócio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div className="border p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">Lei do Bem</h3>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Elegível</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 mb-2">
                        Incentivos fiscais para empresas que realizam pesquisa e desenvolvimento de inovação tecnológica.
                      </p>
                      <div className="text-sm space-y-1 mb-3">
                        <div className="flex items-start">
                          <div className="w-4 h-4 text-primary mt-0.5">✓</div>
                          <div className="ml-2">Dedução de 60% a 100% dos investimentos em P&D do IRPJ e CSLL</div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-4 h-4 text-primary mt-0.5">✓</div>
                          <div className="ml-2">Redução de 50% do IPI na compra de equipamentos para P&D</div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Economia potencial anual: <strong>R$ 15.000,00</strong>
                        </span>
                        <Button variant="outline" size="sm">
                          Detalhes
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">ProUni Empresa</h3>
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">Elegível</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 mb-2">
                        Programa de concessão de bolsas de estudo com benefícios fiscais para empresas participantes.
                      </p>
                      <div className="text-sm space-y-1 mb-3">
                        <div className="flex items-start">
                          <div className="w-4 h-4 text-primary mt-0.5">✓</div>
                          <div className="ml-2">Isenção de tributos federais (IRPJ, CSLL, PIS e COFINS)</div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-4 h-4 text-primary mt-0.5">✓</div>
                          <div className="ml-2">Dedução de bolsas concedidas do imposto de renda</div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Economia potencial anual: <strong>R$ 8.500,00</strong>
                        </span>
                        <Button variant="outline" size="sm">
                          Detalhes
                          <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border p-4 rounded-lg bg-muted/5">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium">REIDI</h3>
                        <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded">Análise Pendente</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1 mb-2">
                        Regime Especial de Incentivos para o Desenvolvimento da Infraestrutura.
                      </p>
                      <div className="text-sm space-y-1 mb-3">
                        <div className="flex items-start">
                          <div className="w-4 h-4 text-muted-foreground mt-0.5">•</div>
                          <div className="ml-2">Suspensão de PIS/COFINS sobre bens e serviços</div>
                        </div>
                        <div className="flex items-start">
                          <div className="w-4 h-4 text-muted-foreground mt-0.5">•</div>
                          <div className="ml-2">Para projetos de infraestrutura aprovados pelo Ministério</div>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Verificando elegibilidade...
                        </span>
                        <Button variant="outline" size="sm">
                          Avaliar
                        </Button>
                      </div>
                    </div>
                    
                    <Button className="w-full">Ver todos os incentivos disponíveis</Button>
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

export default Taxes;
