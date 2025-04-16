
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertCircle, Calendar, FileText, FileCheck, PlusCircle, Clock, CreditCard, HelpCircle, FileSpreadsheet } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";

const MEI = () => {
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Portal do MEI</h1>
            <p className="text-sm text-muted-foreground">
              Gestão simplificada para Microempreendedores Individuais
            </p>
          </div>
          
          <Alert className="mb-6 border-primary/20 bg-primary/5">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-sm font-medium">DAS-MEI com vencimento próximo</AlertTitle>
            <AlertDescription className="text-xs">
              O DAS-MEI de abril/2025 vence dia 20/05/2025. Não esqueça de realizar o pagamento para manter sua regularidade.
            </AlertDescription>
          </Alert>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">DAS Mensal</p>
                    <p className="text-2xl font-bold mt-1">R$ 72,80</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-amber-500 mt-2 flex items-center">
                  Vencimento em 20/05/2025
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Faturamento Anual</p>
                    <p className="text-2xl font-bold mt-1">R$ 42.600,00</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <FileSpreadsheet className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-green-500 mt-2 flex items-center">
                  Limite: R$ 81.000,00 (52,6% utilizado)
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">DASN-SIMEI</p>
                    <p className="text-2xl font-bold mt-1">31/05/2025</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                </div>
                <div className="text-xs text-amber-500 mt-2 flex items-center">
                  Prazo para Declaração Anual
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs defaultValue="obrigacoes" className="mb-6">
            <TabsList className="grid grid-cols-4 w-full md:w-[600px]">
              <TabsTrigger value="obrigacoes">Obrigações</TabsTrigger>
              <TabsTrigger value="faturamento">Faturamento</TabsTrigger>
              <TabsTrigger value="documentos">Documentos</TabsTrigger>
              <TabsTrigger value="guias">Auxílio</TabsTrigger>
            </TabsList>
            
            <TabsContent value="obrigacoes" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Calendário de Obrigações</CardTitle>
                  <CardDescription>Prazos e obrigações do MEI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 border border-amber-200 bg-amber-50 rounded-md flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-amber-500" />
                        </div>
                        <div>
                          <p className="font-medium">DAS-MEI</p>
                          <p className="text-sm text-muted-foreground">Vencimento em 20/05/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">R$ 72,80</p>
                        <Button variant="outline" size="sm" className="mt-1">Emitir Guia</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="font-medium">DASN-SIMEI</p>
                          <p className="text-sm text-muted-foreground">Prazo até 31/05/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-muted-foreground">Declaração Anual</p>
                        <Button variant="outline" size="sm" className="mt-1">Preparar</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <FileCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">DAS-MEI</p>
                          <p className="text-sm text-muted-foreground">Abril/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">Pago em 20/04/2025</p>
                        <Button variant="outline" size="sm" className="mt-1">Ver Recibo</Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded-md flex justify-between items-center">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                          <FileCheck className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">DAS-MEI</p>
                          <p className="text-sm text-muted-foreground">Março/2025</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-green-600">Pago em 20/03/2025</p>
                        <Button variant="outline" size="sm" className="mt-1">Ver Recibo</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 p-4 border rounded-lg bg-muted/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Histórico de Pagamentos</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Visualize o histórico completo de pagamentos do DAS-MEI.
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Button>Ver Histórico</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="faturamento" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Controle de Faturamento</CardTitle>
                  <CardDescription>Registro mensal de receitas</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-5">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Limite de Faturamento Anual: R$ 81.000,00</h3>
                      <Button variant="outline" size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Registrar Receita
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Faturamento atual: R$ 42.600,00</span>
                        <span>52,6%</span>
                      </div>
                      <Progress value={52.6} className="h-2" />
                    </div>
                  </div>
                  
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Mês</TableHead>
                        <TableHead>Faturamento (R$)</TableHead>
                        <TableHead>Registro</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Abril/2025</TableCell>
                        <TableCell>4.850,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Registrado
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Março/2025</TableCell>
                        <TableCell>5.120,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Registrado
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Fevereiro/2025</TableCell>
                        <TableCell>3.950,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Registrado
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Janeiro/2025</TableCell>
                        <TableCell>4.200,00</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800">
                            Registrado
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Relatório de Faturamento</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Exporte relatórios detalhados do seu faturamento para controle ou contabilidade.
                      </p>
                      <Button variant="outline" className="w-full">Gerar Relatório</Button>
                    </div>
                    
                    <div className="border p-4 rounded-lg">
                      <h3 className="font-medium mb-2">Alerta de Faturamento</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Configure alertas quando seu faturamento se aproximar do limite permitido para MEI.
                      </p>
                      <Button variant="outline" className="w-full">Configurar Alertas</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="documentos" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Documentos e Certidões</CardTitle>
                  <CardDescription>Documentos oficiais do seu MEI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">CCMEI</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Certificado da Condição de Microempreendedor Individual
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">Visualizar</Button>
                            <Button variant="outline" size="sm">Baixar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Cartão CNPJ</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Comprovante de Inscrição e Situação Cadastral
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">Visualizar</Button>
                            <Button variant="outline" size="sm">Baixar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileCheck className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Certidão Negativa de Débitos</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            Certidão de Regularidade Fiscal
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">Emitir</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Declarações Anuais Anteriores</h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            DASN-SIMEI de anos anteriores
                          </p>
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">Visualizar</Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-5 p-4 border rounded-lg bg-muted/5">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-amber-500" />
                      </div>
                      <div>
                        <h3 className="font-medium">Mudança de Atividade ou Desenquadramento</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Precisa mudar suas atividades ou deixar de ser MEI? Acesse aqui.
                        </p>
                      </div>
                      <div className="ml-auto">
                        <Button>Acessar</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="guias" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Central de Ajuda e Suporte</CardTitle>
                  <CardDescription>Informações e orientações para MEI</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <HelpCircle className="mr-2 h-4 w-4" />
                          Perguntas Frequentes
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Como emitir nota fiscal como MEI?</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Posso contratar funcionários como MEI?</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Como funciona a aposentadoria para MEI?</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Como alterar meu endereço no MEI?</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">Ver todas</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <FileText className="mr-2 h-4 w-4" />
                          Guias e Tutoriais
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Guia completo do MEI 2025</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Como preencher a DASN-SIMEI</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Registro de receitas para MEI</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Direitos e obrigações do MEI</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">Ver todos</Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm flex items-center">
                          <Calendar className="mr-2 h-4 w-4" />
                          Capacitação
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Webinar: Gestão Financeira para MEI</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Minicurso: Marketing Digital</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Palestra: Crescimento do MEI</p>
                          </div>
                          <div className="border-b pb-2">
                            <p className="text-sm hover:text-primary cursor-pointer">Workshop: Emissão de Notas Fiscais</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full mt-3">Ver agenda</Button>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="border p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <HelpCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Atendimento e Suporte</h3>
                        <p className="text-sm text-muted-foreground mt-1 mb-3">
                          Está com dúvidas ou precisa de ajuda com seu MEI? Entre em contato com nossa equipe de suporte.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                          <Button variant="outline" className="gap-2">
                            <span>Chat Online</span>
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <span>Email</span>
                          </Button>
                          <Button variant="outline" className="gap-2">
                            <span>Telefone</span>
                          </Button>
                        </div>
                      </div>
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

export default MEI;
