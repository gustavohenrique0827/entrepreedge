import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  FileSpreadsheet,
  Calculator,
  Receipt,
  Upload,
  Bot,
  ChevronRight,
  Loader2,
  Check,
  AlertCircle
} from 'lucide-react';
import { Progress } from "@/components/ui/progress";
import { useToast } from '@/hooks/use-toast';
import { useSupabase } from '@/contexts/SupabaseContext';

// Mock function for simulating API calls
const simulateApiCall = (task: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Completed ${task} successfully!`);
    }, 2000);
  });
};

const AccountingRobot = () => {
  const { toast } = useToast();
  const { currentSegment, supabaseForSegment } = useSupabase();
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [processingStatus, setProcessingStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [processingMessage, setProcessingMessage] = useState('');
  
  const resetForm = () => {
    setDocumentType('');
    setPeriod('');
    setFile(null);
    setProcessingStatus('idle');
    setProgress(0);
    setProcessingMessage('');
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleProcess = async (task: string) => {
    if (!documentType && task === 'interpret') {
      toast({
        title: "Formulário incompleto",
        description: "Por favor, selecione o tipo de documento.",
        variant: "destructive"
      });
      return;
    }
    
    if (!file && task === 'upload') {
      toast({
        title: "Arquivo ausente",
        description: "Por favor, selecione um arquivo para enviar.",
        variant: "destructive"
      });
      return;
    }
    
    if (!period && (task === 'dre' || task === 'taxes')) {
      toast({
        title: "Período não selecionado",
        description: "Por favor, selecione o período para gerar o relatório.",
        variant: "destructive"
      });
      return;
    }
    
    setActiveTask(task);
    setProcessingStatus('processing');
    
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newValue = prev + Math.floor(Math.random() * 10);
        if (newValue >= 100) {
          clearInterval(interval);
          return 100;
        }
        return newValue;
      });
    }, 300);
    
    try {
      // Simulate API call
      const result = await simulateApiCall(task);
      setProcessingMessage(result);
      
      // Complete progress
      setProgress(100);
      setProcessingStatus('success');
      
      toast({
        title: "Processamento concluído",
        description: `A tarefa ${task} foi concluída com sucesso.`,
      });
    } catch (error) {
      setProcessingStatus('error');
      setProcessingMessage('Ocorreu um erro durante o processamento.');
      
      toast({
        title: "Erro",
        description: "Ocorreu um erro durante o processamento da tarefa.",
        variant: "destructive"
      });
    } finally {
      clearInterval(interval);
    }
  };

  // Check if we have a segment and a client for that segment
  const currentClient = currentSegment ? supabaseForSegment(currentSegment) : null;

  if (!currentSegment || !currentClient) {
    return (
      <Card className="w-full shadow-sm border-dashed border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-1">
            <Bot className="h-5 w-5" />
            Robô Contábil
          </CardTitle>
          <CardDescription>
            Seu assistente para tarefas contábeis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" className="my-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Segmento não configurado</AlertTitle>
            <AlertDescription>
              Para utilizar o Robô Contábil, selecione um segmento nas configurações.
            </AlertDescription>
          </Alert>
          <div className="flex justify-center mt-4">
            <Button onClick={() => window.location.href = '/settings'}>
              Configurar Segmento
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-1">
          <Bot className="h-5 w-5" />
          Robô Contábil
        </CardTitle>
        <CardDescription>
          Seu assistente para tarefas contábeis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="interpreter">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="interpreter" onClick={() => setActiveTask(null)}>
              <Receipt className="h-4 w-4 mr-2" />
              Interpretação
            </TabsTrigger>
            <TabsTrigger value="reports" onClick={() => setActiveTask(null)}>
              <FileSpreadsheet className="h-4 w-4 mr-2" />
              Relatórios
            </TabsTrigger>
            <TabsTrigger value="taxes" onClick={() => setActiveTask(null)}>
              <Calculator className="h-4 w-4 mr-2" />
              Impostos
            </TabsTrigger>
          </TabsList>
          
          {/* Interpretação de Documentos */}
          <TabsContent value="interpreter">
            {activeTask ? (
              <div className="space-y-4 p-4 border rounded-md">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Processando Documento</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {processingStatus === 'processing' ? 'Analisando o documento...' : 
                     processingStatus === 'success' ? 'Análise concluída!' : 
                     processingStatus === 'error' ? 'Erro durante a análise' : ''}
                  </p>
                  
                  <Progress value={progress} className="mb-4" />
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {processingStatus === 'processing' ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : processingStatus === 'success' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : processingStatus === 'error' ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : null}
                    <span className="text-sm">
                      {processingStatus === 'processing' ? 'Processando...' : 
                       processingStatus === 'success' ? 'Concluído' : 
                       processingStatus === 'error' ? 'Erro' : ''}
                    </span>
                  </div>
                  
                  {processingMessage && (
                    <div className="my-4 p-4 bg-muted rounded-md">
                      <p className="text-sm">{processingMessage}</p>
                    </div>
                  )}
                  
                  {processingStatus !== 'processing' && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setActiveTask(null)}
                    >
                      Voltar
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="document-type">Tipo de Documento</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de documento" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nfe">Nota Fiscal Eletrônica (NF-e)</SelectItem>
                      <SelectItem value="nfce">Nota Fiscal de Consumidor (NFC-e)</SelectItem>
                      <SelectItem value="nfse">Nota Fiscal de Serviço (NFS-e)</SelectItem>
                      <SelectItem value="receipt">Recibo</SelectItem>
                      <SelectItem value="invoice">Fatura</SelectItem>
                      <SelectItem value="bank">Extrato Bancário</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="file-upload">Enviar Documento</Label>
                  <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Arraste arquivos ou clique para selecionar
                    </p>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button
                      variant="outline"
                      onClick={() => document.getElementById('file-upload')?.click()}
                    >
                      Selecionar Arquivo
                    </Button>
                    {file && (
                      <p className="mt-2 text-sm">{file.name}</p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => resetForm()}
                  >
                    Limpar
                  </Button>
                  <Button 
                    className="w-full"
                    disabled={!documentType || !file}
                    onClick={() => handleProcess('interpret')}
                  >
                    Interpretar
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Relatórios */}
          <TabsContent value="reports">
            {activeTask ? (
              <div className="space-y-4 p-4 border rounded-md">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Gerando Relatório</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {processingStatus === 'processing' ? 'Processando dados...' : 
                     processingStatus === 'success' ? 'Relatório gerado!' : 
                     processingStatus === 'error' ? 'Erro durante a geração' : ''}
                  </p>
                  
                  <Progress value={progress} className="mb-4" />
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {processingStatus === 'processing' ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : processingStatus === 'success' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : processingStatus === 'error' ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : null}
                    <span className="text-sm">
                      {processingStatus === 'processing' ? 'Processando...' : 
                       processingStatus === 'success' ? 'Concluído' : 
                       processingStatus === 'error' ? 'Erro' : ''}
                    </span>
                  </div>
                  
                  {processingMessage && (
                    <div className="my-4 p-4 bg-muted rounded-md">
                      <p className="text-sm">{processingMessage}</p>
                    </div>
                  )}
                  
                  {processingStatus === 'success' && (
                    <Button className="mt-4">
                      Baixar Relatório
                    </Button>
                  )}
                  
                  {processingStatus !== 'processing' && (
                    <Button 
                      variant="outline" 
                      className="mt-4 ml-2"
                      onClick={() => setActiveTask(null)}
                    >
                      Voltar
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Tipo de Relatório</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de relatório" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dre">Demonstração do Resultado do Exercício (DRE)</SelectItem>
                      <SelectItem value="balance">Balanço Patrimonial</SelectItem>
                      <SelectItem value="cashflow">Fluxo de Caixa</SelectItem>
                      <SelectItem value="invoices">Contas a Pagar/Receber</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="period">Período</Label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current-month">Mês atual</SelectItem>
                      <SelectItem value="previous-month">Mês anterior</SelectItem>
                      <SelectItem value="current-quarter">Trimestre atual</SelectItem>
                      <SelectItem value="year-to-date">Ano até o momento</SelectItem>
                      <SelectItem value="last-year">Último ano</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Observações (opcional)</Label>
                  <Textarea 
                    placeholder="Adicione informações ou filtros específicos para o relatório"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => resetForm()}
                  >
                    Limpar
                  </Button>
                  <Button 
                    className="w-full"
                    disabled={!documentType || !period}
                    onClick={() => handleProcess('dre')}
                  >
                    Gerar Relatório
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
          
          {/* Impostos */}
          <TabsContent value="taxes">
            {activeTask ? (
              <div className="space-y-4 p-4 border rounded-md">
                <div className="text-center">
                  <h3 className="text-lg font-medium mb-2">Calculando Impostos</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {processingStatus === 'processing' ? 'Processando cálculos...' : 
                     processingStatus === 'success' ? 'Cálculos concluídos!' : 
                     processingStatus === 'error' ? 'Erro durante o cálculo' : ''}
                  </p>
                  
                  <Progress value={progress} className="mb-4" />
                  
                  <div className="flex items-center justify-center space-x-2 mb-4">
                    {processingStatus === 'processing' ? (
                      <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    ) : processingStatus === 'success' ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : processingStatus === 'error' ? (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    ) : null}
                    <span className="text-sm">
                      {processingStatus === 'processing' ? 'Processando...' : 
                       processingStatus === 'success' ? 'Concluído' : 
                       processingStatus === 'error' ? 'Erro' : ''}
                    </span>
                  </div>
                  
                  {processingMessage && (
                    <div className="my-4 p-4 bg-muted rounded-md">
                      <p className="text-sm">{processingMessage}</p>
                    </div>
                  )}
                  
                  {processingStatus === 'success' && (
                    <Button className="mt-4">
                      Baixar Relatório de Impostos
                    </Button>
                  )}
                  
                  {processingStatus !== 'processing' && (
                    <Button 
                      variant="outline" 
                      className="mt-4 ml-2"
                      onClick={() => setActiveTask(null)}
                    >
                      Voltar
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tax-type">Tipo de Imposto</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo de imposto" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="simples">Simples Nacional</SelectItem>
                      <SelectItem value="irpj">IRPJ</SelectItem>
                      <SelectItem value="csll">CSLL</SelectItem>
                      <SelectItem value="pis">PIS</SelectItem>
                      <SelectItem value="cofins">COFINS</SelectItem>
                      <SelectItem value="icms">ICMS</SelectItem>
                      <SelectItem value="iss">ISS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="tax-period">Período de Apuração</Label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan-2023">Janeiro 2023</SelectItem>
                      <SelectItem value="feb-2023">Fevereiro 2023</SelectItem>
                      <SelectItem value="mar-2023">Março 2023</SelectItem>
                      <SelectItem value="apr-2023">Abril 2023</SelectItem>
                      <SelectItem value="may-2023">Maio 2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => resetForm()}
                  >
                    Limpar
                  </Button>
                  <Button 
                    className="w-full"
                    disabled={!documentType || !period}
                    onClick={() => handleProcess('taxes')}
                  >
                    Calcular
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AccountingRobot;
