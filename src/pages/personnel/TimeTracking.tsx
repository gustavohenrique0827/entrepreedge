
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Clock, Calendar, Search, Check, FileText, Download } from 'lucide-react';

interface TimeEntry {
  id: number;
  employeeId: number;
  employeeName: string;
  date: string;
  clockIn: string;
  clockOut: string;
  lunchStart: string;
  lunchEnd: string;
  totalHours: string;
  status: 'Pendente' | 'Aprovado' | 'Rejeitado';
}

const mockTimeEntries: TimeEntry[] = [
  {
    id: 1,
    employeeId: 1,
    employeeName: 'João Silva',
    date: '2023-05-15',
    clockIn: '08:00',
    clockOut: '17:00',
    lunchStart: '12:00',
    lunchEnd: '13:00',
    totalHours: '8:00',
    status: 'Aprovado'
  },
  {
    id: 2,
    employeeId: 1,
    employeeName: 'João Silva',
    date: '2023-05-16',
    clockIn: '08:15',
    clockOut: '17:30',
    lunchStart: '12:00',
    lunchEnd: '13:00',
    totalHours: '8:15',
    status: 'Aprovado'
  },
  {
    id: 3,
    employeeId: 2,
    employeeName: 'Maria Oliveira',
    date: '2023-05-15',
    clockIn: '09:00',
    clockOut: '18:00',
    lunchStart: '12:30',
    lunchEnd: '13:30',
    totalHours: '8:00',
    status: 'Aprovado'
  },
  {
    id: 4,
    employeeId: 2,
    employeeName: 'Maria Oliveira',
    date: '2023-05-16',
    clockIn: '09:00',
    clockOut: '18:00',
    lunchStart: '12:30',
    lunchEnd: '13:30',
    totalHours: '8:00',
    status: 'Pendente'
  }
];

const TimeTracking = () => {
  const [timeEntries] = useState<TimeEntry[]>(mockTimeEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const currentTime = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  const currentDate = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });

  // Filtrar entradas de ponto
  const filteredEntries = timeEntries.filter(
    (entry) => 
      entry.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.date.includes(searchTerm) ||
      entry.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para registrar ponto
  const registerTimeEntry = (type: 'in' | 'out' | 'lunch_start' | 'lunch_end') => {
    const actions = {
      'in': 'Entrada registrada',
      'out': 'Saída registrada',
      'lunch_start': 'Saída para almoço registrada',
      'lunch_end': 'Retorno do almoço registrado'
    };
    
    toast({
      title: actions[type],
      description: `${currentTime} - ${currentDate}`,
      variant: "success",
    });
  };

  // Aprovar entrada de ponto
  const approveTimeEntry = (id: number) => {
    toast({
      title: "Ponto aprovado",
      description: "O registro de ponto foi aprovado com sucesso",
      variant: "success",
    });
  };

  // Gerar relatório
  const generateReport = () => {
    toast({
      title: "Relatório gerado",
      description: "O relatório de ponto foi gerado com sucesso",
      variant: "success",
    });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Controle de Ponto"
        description="Gerenciamento de registro e controle de ponto dos funcionários"
      />

      <Tabs defaultValue="register" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="register">Registrar Ponto</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
          <TabsTrigger value="reports">Relatórios</TabsTrigger>
        </TabsList>
        
        <TabsContent value="register">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Registro de Ponto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-6">
                  <h3 className="text-3xl font-bold mb-1">{currentTime}</h3>
                  <p className="text-muted-foreground">{currentDate}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button 
                    className="flex items-center justify-center gap-2"
                    onClick={() => registerTimeEntry('in')}
                  >
                    <Clock className="h-4 w-4" />
                    Entrada
                  </Button>
                  
                  <Button 
                    className="flex items-center justify-center gap-2"
                    onClick={() => registerTimeEntry('out')}
                  >
                    <Clock className="h-4 w-4" />
                    Saída
                  </Button>
                  
                  <Button 
                    className="flex items-center justify-center gap-2"
                    onClick={() => registerTimeEntry('lunch_start')}
                  >
                    <Clock className="h-4 w-4" />
                    Saída Almoço
                  </Button>
                  
                  <Button 
                    className="flex items-center justify-center gap-2"
                    onClick={() => registerTimeEntry('lunch_end')}
                  >
                    <Clock className="h-4 w-4" />
                    Retorno Almoço
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Resumo Diário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2">
                  <Calendar size={16} />
                  <Input 
                    type="date" 
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="max-w-[180px]"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Entrada:</span>
                    <span className="font-medium">08:00</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Saída Almoço:</span>
                    <span className="font-medium">12:00</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Retorno Almoço:</span>
                    <span className="font-medium">13:00</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="text-muted-foreground">Saída:</span>
                    <span className="font-medium">17:00</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 font-bold">
                    <span>Total de Horas:</span>
                    <span>8:00</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="history">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Histórico de Ponto
                </CardTitle>
                
                <div className="flex items-center gap-3">
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar registros..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <Input 
                    type="date" 
                    className="w-40"
                  />
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Funcionário</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Saída Almoço</TableHead>
                    <TableHead>Retorno Almoço</TableHead>
                    <TableHead>Saída</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell className="font-medium">{entry.employeeName}</TableCell>
                      <TableCell>{new Date(entry.date).toLocaleDateString('pt-BR')}</TableCell>
                      <TableCell>{entry.clockIn}</TableCell>
                      <TableCell>{entry.lunchStart}</TableCell>
                      <TableCell>{entry.lunchEnd}</TableCell>
                      <TableCell>{entry.clockOut}</TableCell>
                      <TableCell>{entry.totalHours}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          entry.status === 'Aprovado' 
                            ? 'bg-green-100 text-green-800' 
                            : entry.status === 'Rejeitado'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {entry.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {entry.status === 'Pendente' && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => approveTimeEntry(entry.id)}
                          >
                            <Check size={16} />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Relatórios de Ponto
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Relatórios por Funcionário</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Funcionário</label>
                        <select className="border rounded-md p-2">
                          <option value="">Selecione um funcionário</option>
                          <option value="1">João Silva</option>
                          <option value="2">Maria Oliveira</option>
                          <option value="3">Pedro Santos</option>
                        </select>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Período</label>
                        <div className="flex gap-2">
                          <Input type="date" className="flex-1" />
                          <span className="flex items-center">até</span>
                          <Input type="date" className="flex-1" />
                        </div>
                      </div>
                      
                      <Button 
                        onClick={generateReport}
                        className="w-full flex items-center justify-center gap-2 mt-2"
                      >
                        <Download size={16} />
                        Gerar Relatório Individual
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Relatórios Gerenciais</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Tipo de Relatório</label>
                        <select className="border rounded-md p-2">
                          <option value="">Selecione um tipo</option>
                          <option value="monthly">Espelho de Ponto Mensal</option>
                          <option value="overtime">Horas Extras</option>
                          <option value="absences">Faltas e Atrasos</option>
                          <option value="bank">Banco de Horas</option>
                        </select>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium">Período</label>
                        <select className="border rounded-md p-2">
                          <option value="">Selecione um período</option>
                          <option value="current-month">Mês Atual</option>
                          <option value="last-month">Mês Anterior</option>
                          <option value="custom">Período Personalizado</option>
                        </select>
                      </div>
                      
                      <Button 
                        onClick={generateReport}
                        className="w-full flex items-center justify-center gap-2 mt-2"
                      >
                        <Download size={16} />
                        Gerar Relatório Gerencial
                      </Button>
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

export default TimeTracking;
