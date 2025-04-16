
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, FileDown, FileText, Calendar, FileCheck } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

const Fiscal = () => {
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Obrigações Fiscais</h1>
            <p className="text-sm text-muted-foreground">
              Gerenciamento de obrigações e documentos fiscais de {companyName}
            </p>
          </div>
          
          <Alert className="mb-6 border-amber-400/20 bg-amber-400/5">
            <AlertCircle className="h-4 w-4 text-amber-400" />
            <AlertTitle className="text-sm font-medium">Próximos vencimentos</AlertTitle>
            <AlertDescription className="text-xs">
              Você tem 3 obrigações a vencer nos próximos 15 dias. Confira a seção "Calendário Fiscal".
            </AlertDescription>
          </Alert>
          
          <Tabs defaultValue="calendario" className="mb-6">
            <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
              <TabsTrigger value="calendario">Calendário</TabsTrigger>
              <TabsTrigger value="impostos">Impostos</TabsTrigger>
              <TabsTrigger value="obrigatorias">Declarações</TabsTrigger>
              <TabsTrigger value="certidoes">Certidões</TabsTrigger>
            </TabsList>
            
            <TabsContent value="calendario" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Calendário Fiscal</CardTitle>
                  <CardDescription>Próximos vencimentos e obrigações fiscais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 border border-amber-200 bg-amber-50 rounded-md flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">DARF - IRPJ</p>
                          <p className="text-sm text-muted-foreground">Vencimento em 29/04/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ 2.450,00</p>
                        <Button variant="outline" size="sm" className="mt-1">Gerar Guia</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border border-amber-200 bg-amber-50 rounded-md flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">DARF - CSLL</p>
                          <p className="text-sm text-muted-foreground">Vencimento em 29/04/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ 1.380,00</p>
                        <Button variant="outline" size="sm" className="mt-1">Gerar Guia</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border border-amber-200 bg-amber-50 rounded-md flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">EFD-Contribuições</p>
                          <p className="text-sm text-muted-foreground">Prazo em 10/05/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-amber-600">Pendente</p>
                        <Button variant="outline" size="sm" className="mt-1">Preparar</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">SPED Fiscal</p>
                          <p className="text-sm text-muted-foreground">Prazo em 15/05/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-muted-foreground">Em andamento</p>
                        <Button variant="outline" size="sm" className="mt-1">Continuar</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <Calendar className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">DARF - PIS</p>
                          <p className="text-sm text-muted-foreground">Vencimento em 20/05/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ 975,00</p>
                        <Button variant="outline" size="sm" className="mt-1">Gerar Guia</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="impostos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Controle de Impostos</CardTitle>
                  <CardDescription>Impostos e tributos gerenciados</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <Card className="bg-muted/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Impostos Federais</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>IRPJ</span>
                              <span className="font-medium">R$ 2.450,00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>CSLL</span>
                              <span className="font-medium">R$ 1.380,00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>PIS</span>
                              <span className="font-medium">R$ 975,00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>COFINS</span>
                              <span className="font-medium">R$ 4.536,00</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-3">
                            <FileDown className="mr-2 h-4 w-4" /> 
                            Exportar
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Impostos Estaduais</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>ICMS</span>
                              <span className="font-medium">R$ 5.210,00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>DIFAL</span>
                              <span className="font-medium">R$ 780,00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>ICMS-ST</span>
                              <span className="font-medium">R$ 0,00</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-3">
                            <FileDown className="mr-2 h-4 w-4" /> 
                            Exportar
                          </Button>
                        </CardContent>
                      </Card>
                      
                      <Card className="bg-muted/5">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm">Impostos Municipais</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center text-sm">
                              <span>ISS</span>
                              <span className="font-medium">R$ 1.850,00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>IPTU</span>
                              <span className="font-medium">R$ 850,00</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <span>Taxa de Licença</span>
                              <span className="font-medium">R$ 320,00</span>
                            </div>
                          </div>
                          <Button variant="outline" size="sm" className="w-full mt-3">
                            <FileDown className="mr-2 h-4 w-4" /> 
                            Exportar
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card className="mt-4">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm">Histórico de Pagamentos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-sm text-left">
                            <thead className="text-xs bg-muted/20">
                              <tr>
                                <th className="px-4 py-2">Imposto</th>
                                <th className="px-4 py-2">Competência</th>
                                <th className="px-4 py-2">Vencimento</th>
                                <th className="px-4 py-2">Valor</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2">Comprovante</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b">
                                <td className="px-4 py-2">IRPJ</td>
                                <td className="px-4 py-2">03/2025</td>
                                <td className="px-4 py-2">29/03/2025</td>
                                <td className="px-4 py-2">R$ 2.380,00</td>
                                <td className="px-4 py-2">
                                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-green-100 text-green-800">
                                    Pago
                                  </span>
                                </td>
                                <td className="px-4 py-2">
                                  <Button variant="ghost" size="sm">Ver</Button>
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="px-4 py-2">CSLL</td>
                                <td className="px-4 py-2">03/2025</td>
                                <td className="px-4 py-2">29/03/2025</td>
                                <td className="px-4 py-2">R$ 1.350,00</td>
                                <td className="px-4 py-2">
                                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-green-100 text-green-800">
                                    Pago
                                  </span>
                                </td>
                                <td className="px-4 py-2">
                                  <Button variant="ghost" size="sm">Ver</Button>
                                </td>
                              </tr>
                              <tr className="border-b">
                                <td className="px-4 py-2">ICMS</td>
                                <td className="px-4 py-2">03/2025</td>
                                <td className="px-4 py-2">15/03/2025</td>
                                <td className="px-4 py-2">R$ 5.150,00</td>
                                <td className="px-4 py-2">
                                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-green-100 text-green-800">
                                    Pago
                                  </span>
                                </td>
                                <td className="px-4 py-2">
                                  <Button variant="ghost" size="sm">Ver</Button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="obrigatorias" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Declarações Obrigatórias</CardTitle>
                  <CardDescription>Controle de declarações e obrigações acessórias</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">SPED Fiscal</h3>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-amber-100 text-amber-800">
                            Em andamento
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Sistema Público de Escrituração Digital
                        </p>
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-xs">
                            <span>Progresso</span>
                            <span>65%</span>
                          </div>
                          <Progress value={65} className="h-2" />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Próximo prazo: 15/05/2025</span>
                          <span>Responsável: João Silva</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">Continuar</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">EFD-Contribuições</h3>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-red-100 text-red-800">
                            Pendente
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Escrituração Fiscal Digital - Contribuições
                        </p>
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-xs">
                            <span>Progresso</span>
                            <span>0%</span>
                          </div>
                          <Progress value={0} className="h-2" />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Próximo prazo: 10/05/2025</span>
                          <span>Responsável: Maria Santos</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">Iniciar</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">DCTF</h3>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-green-100 text-green-800">
                            Concluído
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Declaração de Débitos e Créditos Tributários Federais
                        </p>
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-xs">
                            <span>Progresso</span>
                            <span>100%</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Enviado em: 15/04/2025</span>
                          <span>Responsável: João Silva</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">Ver Protocolo</Button>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <div className="flex justify-between items-center mb-3">
                          <h3 className="font-medium">ECD</h3>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs bg-green-100 text-green-800">
                            Concluído
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Escrituração Contábil Digital
                        </p>
                        <div className="space-y-2 mb-3">
                          <div className="flex justify-between text-xs">
                            <span>Progresso</span>
                            <span>100%</span>
                          </div>
                          <Progress value={100} className="h-2" />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Enviado em: 10/04/2025</span>
                          <span>Responsável: Maria Santos</span>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">Ver Protocolo</Button>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <FileText className="mr-2 h-4 w-4" /> 
                      Ver Todas as Declarações
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="certidoes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Certidões</CardTitle>
                  <CardDescription>Controle de certidões e documentos legais</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4 bg-green-50">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <FileCheck className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Certidão Negativa de Débitos - Receita Federal</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Certidão válida até 15/07/2025
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm">Ver Documento</Button>
                              <Button variant="outline" size="sm">Baixar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-green-50">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <FileCheck className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Certidão Negativa de Débitos - Estado</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Certidão válida até 20/06/2025
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm">Ver Documento</Button>
                              <Button variant="outline" size="sm">Baixar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 bg-green-50">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <FileCheck className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Certidão Negativa de Débitos - Município</h3>
                            <p className="text-sm text-muted-foreground mt-1">
                              Certidão válida até 05/06/2025
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm">Ver Documento</Button>
                              <Button variant="outline" size="sm">Baixar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border rounded-lg p-4 border-amber-200">
                        <div className="flex items-start gap-3">
                          <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <h3 className="font-medium">Certidão Negativa de Débitos - FGTS</h3>
                            <p className="text-sm text-amber-600 mt-1">
                              Vencendo em 5 dias (29/04/2025)
                            </p>
                            <div className="flex gap-2 mt-2">
                              <Button variant="outline" size="sm">Ver Documento</Button>
                              <Button variant="outline" size="sm">Renovar</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full">
                      <FileText className="mr-2 h-4 w-4" /> 
                      Emitir Nova Certidão
                    </Button>
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

export default Fiscal;
