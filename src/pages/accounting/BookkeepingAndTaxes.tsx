
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { FileText, Filter, Download, Upload, Plus, Calendar } from 'lucide-react';

interface TaxRecord {
  id: number;
  date: string;
  description: string;
  type: string;
  amount: number;
  status: 'Pendente' | 'Enviado' | 'Aprovado';
}

const mockTaxRecords: TaxRecord[] = [
  {
    id: 1,
    date: '2023-04-15',
    description: 'Nota Fiscal 001234',
    type: 'Saída',
    amount: 1250.75,
    status: 'Aprovado'
  },
  {
    id: 2,
    date: '2023-04-17',
    description: 'Nota Fiscal 001235',
    type: 'Entrada',
    amount: 875.30,
    status: 'Aprovado'
  },
  {
    id: 3,
    date: '2023-05-01',
    description: 'Documento Fiscal 2345',
    type: 'Saída',
    amount: 2345.90,
    status: 'Pendente'
  },
  {
    id: 4,
    date: '2023-05-10',
    description: 'EFD Contribuições',
    type: 'Obrigação',
    amount: 0,
    status: 'Enviado'
  }
];

const BookkeepingAndTaxes = () => {
  const [taxRecords] = useState<TaxRecord[]>(mockTaxRecords);
  const [selectedMonth, setSelectedMonth] = useState('04/2023');
  const { toast } = useToast();

  // Formatar valores monetários
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleReportGeneration = () => {
    toast({
      title: "Relatório gerado",
      description: `O relatório do mês ${selectedMonth} foi gerado com sucesso.`,
      variant: "success",
    });
  };

  const handleSubmission = () => {
    toast({
      title: "Escrituração enviada",
      description: `A escrituração fiscal do mês ${selectedMonth} foi enviada com sucesso.`,
      variant: "success",
    });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Escrituração Contábil e Fiscal"
        description="Gerenciamento da escrituração contábil e fiscal da empresa"
      />

      <Tabs defaultValue="tax-records" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="tax-records">Registros Fiscais</TabsTrigger>
          <TabsTrigger value="tax-obligations">Obrigações Fiscais</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="tax-records">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Registros Fiscais
                </CardTitle>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} />
                    <select 
                      className="bg-background border rounded py-1 px-2 text-sm"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(e.target.value)}
                    >
                      <option value="04/2023">Abril/2023</option>
                      <option value="05/2023">Maio/2023</option>
                      <option value="06/2023">Junho/2023</option>
                    </select>
                  </div>
                  
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <Filter size={14} />
                    Filtros
                  </Button>
                  
                  <Button size="sm" className="flex items-center gap-1">
                    <Plus size={14} />
                    Novo Registro
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Data</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {taxRecords.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        {new Date(record.date).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>{record.description}</TableCell>
                      <TableCell>{record.type}</TableCell>
                      <TableCell className="text-right">
                        {formatCurrency(record.amount)}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          record.status === 'Aprovado' 
                            ? 'bg-green-100 text-green-800' 
                            : record.status === 'Enviado'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax-obligations">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Obrigações Fiscais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="border p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">EFD ICMS/IPI</h3>
                  <p className="text-sm mb-3">
                    Escrituração Fiscal Digital do ICMS e IPI. Prazo de entrega até o dia 15 do mês subsequente.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs">
                        Prazo: 15/06/2023
                      </span>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Upload size={14} />
                        Importar
                      </Button>
                      <Button size="sm" onClick={handleSubmission}>Enviar</Button>
                    </div>
                  </div>
                </div>

                <div className="border p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">EFD Contribuições</h3>
                  <p className="text-sm mb-3">
                    Escrituração Fiscal Digital do PIS/PASEP e COFINS. Prazo de entrega até o dia 10 do 
                    segundo mês subsequente.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs">
                        Prazo: 10/07/2023
                      </span>
                    </div>
                    <div className="space-x-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Upload size={14} />
                        Importar
                      </Button>
                      <Button size="sm" onClick={handleSubmission}>Enviar</Button>
                    </div>
                  </div>
                </div>

                <div className="border p-4 rounded-lg">
                  <h3 className="text-lg font-medium mb-3">DCTF</h3>
                  <p className="text-sm mb-3">
                    Declaração de Débitos e Créditos Tributários Federais. Entrega até o 15º dia útil do 2º mês 
                    subsequente.
                  </p>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs">
                        Enviado em 15/05/2023
                      </span>
                    </div>
                    <div>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Download size={14} />
                        Download Recibo
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Relatórios Fiscais
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Livros Fiscais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="font-medium">Registro de Entradas</p>
                          <p className="text-sm text-muted-foreground">
                            Período: {selectedMonth}
                          </p>
                        </div>
                        <Button size="sm" onClick={handleReportGeneration} className="flex items-center gap-1">
                          <Download size={14} />
                          Gerar
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="font-medium">Registro de Saídas</p>
                          <p className="text-sm text-muted-foreground">
                            Período: {selectedMonth}
                          </p>
                        </div>
                        <Button size="sm" onClick={handleReportGeneration} className="flex items-center gap-1">
                          <Download size={14} />
                          Gerar
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="font-medium">Registro de Apuração</p>
                          <p className="text-sm text-muted-foreground">
                            Período: {selectedMonth}
                          </p>
                        </div>
                        <Button size="sm" onClick={handleReportGeneration} className="flex items-center gap-1">
                          <Download size={14} />
                          Gerar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Relatórios Gerenciais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="font-medium">Resumo de Impostos</p>
                          <p className="text-sm text-muted-foreground">
                            Resumo dos impostos do período
                          </p>
                        </div>
                        <Button size="sm" onClick={handleReportGeneration} className="flex items-center gap-1">
                          <Download size={14} />
                          Gerar
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="font-medium">Análise de Créditos</p>
                          <p className="text-sm text-muted-foreground">
                            Detalhamento de créditos fiscais
                          </p>
                        </div>
                        <Button size="sm" onClick={handleReportGeneration} className="flex items-center gap-1">
                          <Download size={14} />
                          Gerar
                        </Button>
                      </div>
                      
                      <div className="flex justify-between items-center pt-2">
                        <div>
                          <p className="font-medium">Conciliação Fiscal</p>
                          <p className="text-sm text-muted-foreground">
                            Conciliação contábil e fiscal
                          </p>
                        </div>
                        <Button size="sm" onClick={handleReportGeneration} className="flex items-center gap-1">
                          <Download size={14} />
                          Gerar
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default BookkeepingAndTaxes;
