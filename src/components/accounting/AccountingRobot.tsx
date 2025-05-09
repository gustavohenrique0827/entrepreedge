
import React, { useState } from 'react';
import { Robot, Search, FileUp, FileText, FileCheck, Receipt, CreditCard } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useSupabase } from '@/contexts/SupabaseContext';

const AccountingRobot = () => {
  const { toast } = useToast();
  const { supabase, currentSegment } = useSupabase();
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [documentType, setDocumentType] = useState<string>('');
  const [period, setPeriod] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setUploadFile(file);
  };

  const handleFileUpload = async () => {
    if (!uploadFile) {
      toast({
        title: "Erro",
        description: "Nenhum arquivo selecionado.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate processing/uploading
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Sucesso",
        description: `Arquivo "${uploadFile.name}" processado com sucesso.`,
      });
      
      setUploadFile(null);
      // Reset the file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    } catch (error) {
      console.error("Error processing file:", error);
      toast({
        title: "Erro",
        description: "Não foi possível processar o arquivo.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery) {
      toast({
        title: "Atenção",
        description: "Digite algo para pesquisar.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate search process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Busca concluída",
        description: `Não foram encontrados resultados para "${searchQuery}".`,
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao realizar a busca.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleGenerate = async () => {
    if (!documentType || !period) {
      toast({
        title: "Campos obrigatórios",
        description: "Selecione o tipo de documento e o período.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate document generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Documento gerado",
        description: `${documentType} para ${period} gerado com sucesso.`,
      });
      
      setDocumentType('');
      setPeriod('');
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível gerar o documento.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (!supabase || !currentSegment) {
    return (
      <Card className="w-full shadow-sm border-dashed border-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Robot className="h-5 w-5 text-muted-foreground" />
            Robô Contábil
          </CardTitle>
          <CardDescription>
            Conecte-se a um segmento de negócio para utilizar o robô contábil.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <p className="text-sm text-muted-foreground">
            Configure um segmento nas preferências para acessar esta funcionalidade.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Robot className="h-5 w-5 text-primary" />
          Robô Contábil
        </CardTitle>
        <CardDescription>
          Automatize tarefas contábeis como busca de documentos, geração de guias e processamento de arquivos
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => setActiveTask('search')}
              >
                <Search className="h-5 w-5" />
                <div>
                  <p className="font-medium">Buscar Documentos</p>
                  <p className="text-xs text-muted-foreground">
                    Notas fiscais, recibos, etc.
                  </p>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Buscar Documentos</DialogTitle>
                <DialogDescription>
                  Pesquise e encontre documentos contábeis arquivados no sistema
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="document-search">Buscar por</Label>
                  <Input
                    id="document-search"
                    placeholder="Número da NF, CNPJ, descrição..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="document-type">Tipo de documento</Label>
                    <Select>
                      <SelectTrigger id="document-type">
                        <SelectValue placeholder="Todos" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="invoice">Notas Fiscais</SelectItem>
                        <SelectItem value="receipt">Recibos</SelectItem>
                        <SelectItem value="guide">Guias</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="period">Período</Label>
                    <Select>
                      <SelectTrigger id="period">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current-month">Mês atual</SelectItem>
                        <SelectItem value="last-month">Mês anterior</SelectItem>
                        <SelectItem value="current-year">Ano atual</SelectItem>
                        <SelectItem value="custom">Personalizado</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleSearch} disabled={isProcessing}>
                  {isProcessing ? "Buscando..." : "Buscar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => setActiveTask('upload')}
              >
                <FileUp className="h-5 w-5" />
                <div>
                  <p className="font-medium">Processar Arquivo</p>
                  <p className="text-xs text-muted-foreground">
                    Boletos, notas fiscais digitais
                  </p>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Processar Arquivo</DialogTitle>
                <DialogDescription>
                  Faça upload de arquivos PDF ou XML para processamento automático
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="file-upload">Arquivo</Label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".pdf,.xml,.jpg,.png"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs text-muted-foreground">
                    Formatos aceitos: PDF, XML, JPG, PNG
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="document-category">Categoria</Label>
                  <Select>
                    <SelectTrigger id="document-category">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="invoice">Nota Fiscal</SelectItem>
                      <SelectItem value="receipt">Recibo</SelectItem>
                      <SelectItem value="guide">Guia</SelectItem>
                      <SelectItem value="slip">Boleto</SelectItem>
                      <SelectItem value="other">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleFileUpload} disabled={!uploadFile || isProcessing}>
                  {isProcessing ? "Processando..." : "Processar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="h-24 flex flex-col gap-2"
                onClick={() => setActiveTask('generate')}
              >
                <FileText className="h-5 w-5" />
                <div>
                  <p className="font-medium">Gerar Documentos</p>
                  <p className="text-xs text-muted-foreground">
                    Guias, relatórios, DARFs
                  </p>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Gerar Documentos</DialogTitle>
                <DialogDescription>
                  Gere guias de pagamento, relatórios e outros documentos contábeis
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="document-type">Tipo de documento</Label>
                  <Select value={documentType} onValueChange={setDocumentType}>
                    <SelectTrigger id="document-type">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="darf">DARF</SelectItem>
                      <SelectItem value="das">DAS (Simples Nacional)</SelectItem>
                      <SelectItem value="gps">GPS (INSS)</SelectItem>
                      <SelectItem value="monthly-report">Relatório Mensal</SelectItem>
                      <SelectItem value="annual-report">Relatório Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="period-select">Período</Label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger id="period-select">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jan-2023">Janeiro/2023</SelectItem>
                      <SelectItem value="feb-2023">Fevereiro/2023</SelectItem>
                      <SelectItem value="mar-2023">Março/2023</SelectItem>
                      <SelectItem value="apr-2023">Abril/2023</SelectItem>
                      <SelectItem value="may-2023">Maio/2023</SelectItem>
                      <SelectItem value="jun-2023">Junho/2023</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleGenerate} disabled={isProcessing}>
                  {isProcessing ? "Gerando..." : "Gerar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Button variant="outline" className="h-16 flex justify-start px-4 gap-3">
            <FileCheck className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="font-medium">Validar Documentos</p>
              <p className="text-xs text-muted-foreground">
                Verificar autenticidade de NF e outros documentos
              </p>
            </div>
          </Button>
          
          <Button variant="outline" className="h-16 flex justify-start px-4 gap-3">
            <Receipt className="h-5 w-5 text-primary" />
            <div className="text-left">
              <p className="font-medium">Conciliação Bancária</p>
              <p className="text-xs text-muted-foreground">
                Importar extratos e conciliar automaticamente
              </p>
            </div>
          </Button>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 pb-2">
        <p className="text-xs text-muted-foreground">
          Robô contábil atualizado em 09/05/2025. Segmento atual: <span className="font-medium">{currentSegment}</span>
        </p>
      </CardFooter>
    </Card>
  );
};

export default AccountingRobot;
