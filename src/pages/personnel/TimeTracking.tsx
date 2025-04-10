
import React, { useState } from 'react';
import PageContainer from '@/components/PageContainer';
import PageHeader from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Clock, CalendarDays, UserRound, AlertCircle, CheckCircle2 } from "lucide-react";
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Mock data for time entries
const mockTimeEntries = [
  { id: 1, employeeId: 1, employeeName: 'João Silva', date: '2025-04-10', clockIn: '08:00', clockOut: '17:00', status: 'approved', totalHours: '09:00' },
  { id: 2, employeeId: 2, employeeName: 'Maria Souza', date: '2025-04-10', clockIn: '08:30', clockOut: '17:30', status: 'approved', totalHours: '09:00' },
  { id: 3, employeeId: 3, employeeName: 'Pedro Santos', date: '2025-04-10', clockIn: '09:00', clockOut: '18:00', status: 'pending', totalHours: '09:00' },
  { id: 4, employeeId: 1, employeeName: 'João Silva', date: '2025-04-09', clockIn: '08:15', clockOut: '17:15', status: 'approved', totalHours: '09:00' },
  { id: 5, employeeId: 2, employeeName: 'Maria Souza', date: '2025-04-09', clockIn: '08:45', clockOut: '17:45', status: 'approved', totalHours: '09:00' },
];

// Mock employees
const mockEmployees = [
  { id: 1, name: 'João Silva' },
  { id: 2, name: 'Maria Souza' },
  { id: 3, name: 'Pedro Santos' },
  { id: 4, name: 'Ana Oliveira' },
  { id: 5, name: 'Carlos Pereira' },
];

const TimeTracking = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState<string>('all');
  const [entries, setEntries] = useState(mockTimeEntries);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newEntry, setNewEntry] = useState({
    employeeId: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    clockIn: '',
    clockOut: '',
    notes: ''
  });

  // Filter entries by selected date and employee
  const filteredEntries = entries.filter(entry => {
    const dateMatches = entry.date === format(date, 'yyyy-MM-dd');
    const employeeMatches = selectedEmployee === 'all' || entry.employeeId.toString() === selectedEmployee;
    return dateMatches && employeeMatches;
  });

  const handleRegisterTime = () => {
    if (!newEntry.employeeId || !newEntry.clockIn) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha pelo menos o funcionário e o horário de entrada.",
        variant: "destructive"
      });
      return;
    }

    const employee = mockEmployees.find(e => e.id.toString() === newEntry.employeeId);
    if (!employee) return;

    // Calculate total hours if both clock in and clock out are provided
    let totalHours = '';
    if (newEntry.clockIn && newEntry.clockOut) {
      const clockInParts = newEntry.clockIn.split(':');
      const clockOutParts = newEntry.clockOut.split(':');
      
      const clockInMinutes = parseInt(clockInParts[0]) * 60 + parseInt(clockInParts[1]);
      const clockOutMinutes = parseInt(clockOutParts[0]) * 60 + parseInt(clockOutParts[1]);
      
      const diffMinutes = clockOutMinutes - clockInMinutes;
      const hours = Math.floor(diffMinutes / 60);
      const minutes = diffMinutes % 60;
      
      totalHours = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    const id = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
    const entryToAdd = {
      id,
      employeeId: parseInt(newEntry.employeeId),
      employeeName: employee.name,
      date: newEntry.date,
      clockIn: newEntry.clockIn,
      clockOut: newEntry.clockOut || '',
      status: 'pending',
      totalHours: totalHours
    };

    setEntries([...entries, entryToAdd]);
    setNewEntry({
      employeeId: '',
      date: format(new Date(), 'yyyy-MM-dd'),
      clockIn: '',
      clockOut: '',
      notes: ''
    });
    setIsDialogOpen(false);

    toast({
      title: "Registro adicionado",
      description: `Ponto registrado com sucesso para ${employee.name}.`
    });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Controle de Ponto"
        description="Registre entradas e saídas dos colaboradores"
        actions={
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Clock className="mr-2 h-4 w-4" />
                Registrar Ponto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Ponto</DialogTitle>
                <DialogDescription>
                  Registre a entrada ou saída de um colaborador.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="employee" className="text-right">Funcionário</Label>
                  <Select
                    value={newEntry.employeeId}
                    onValueChange={(value) => setNewEntry({...newEntry, employeeId: value})}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Selecione um funcionário" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockEmployees.map(employee => (
                        <SelectItem key={employee.id} value={employee.id.toString()}>
                          {employee.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">Data</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({...newEntry, date: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="clockIn" className="text-right">Entrada</Label>
                  <Input
                    id="clockIn"
                    type="time"
                    value={newEntry.clockIn}
                    onChange={(e) => setNewEntry({...newEntry, clockIn: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="clockOut" className="text-right">Saída</Label>
                  <Input
                    id="clockOut"
                    type="time"
                    value={newEntry.clockOut}
                    onChange={(e) => setNewEntry({...newEntry, clockOut: e.target.value})}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">Observações</Label>
                  <Input
                    id="notes"
                    value={newEntry.notes}
                    onChange={(e) => setNewEntry({...newEntry, notes: e.target.value})}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleRegisterTime}>Registrar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Calendário</CardTitle>
              <CardDescription>
                Selecione uma data para visualizar os registros
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={(newDate) => newDate && setDate(newDate)}
                className="rounded-md border"
                locale={ptBR}
              />
              
              <div className="mt-6">
                <Label htmlFor="employeeFilter">Filtrar por funcionário</Label>
                <Select
                  value={selectedEmployee}
                  onValueChange={setSelectedEmployee}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Selecione um funcionário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os funcionários</SelectItem>
                    {mockEmployees.map(employee => (
                      <SelectItem key={employee.id} value={employee.id.toString()}>
                        {employee.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="font-medium">Legenda</div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-sm">Aprovado</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-sm">Pendente</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-sm">Rejeitado</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Registros de Ponto - {format(date, 'dd/MM/yyyy')}</CardTitle>
              <CardDescription>
                Visualize os registros de ponto dos funcionários na data selecionada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="list">Lista</TabsTrigger>
                  <TabsTrigger value="summary">Resumo</TabsTrigger>
                </TabsList>
                
                <TabsContent value="list">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Funcionário</TableHead>
                          <TableHead>Entrada</TableHead>
                          <TableHead>Saída</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEntries.length > 0 ? (
                          filteredEntries.map((entry) => (
                            <TableRow key={entry.id}>
                              <TableCell className="font-medium">{entry.employeeName}</TableCell>
                              <TableCell>{entry.clockIn}</TableCell>
                              <TableCell>{entry.clockOut || '-'}</TableCell>
                              <TableCell>{entry.totalHours || '-'}</TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  entry.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  entry.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-red-100 text-red-800'
                                }`}>
                                  {entry.status === 'approved' ? 'Aprovado' :
                                   entry.status === 'pending' ? 'Pendente' : 'Rejeitado'}
                                </span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="ghost" size="sm">Editar</Button>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              Nenhum registro encontrado para esta data.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="summary">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Registros do Dia</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">{filteredEntries.length}</div>
                        <p className="text-sm text-muted-foreground">Total de registros</p>
                        
                        <div className="mt-4 space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Aprovados</span>
                            <span className="font-medium">{filteredEntries.filter(e => e.status === 'approved').length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Pendentes</span>
                            <span className="font-medium">{filteredEntries.filter(e => e.status === 'pending').length}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Rejeitados</span>
                            <span className="font-medium">{filteredEntries.filter(e => e.status === 'rejected').length}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Horas Trabalhadas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">
                          {filteredEntries.reduce((total, entry) => {
                            if (!entry.totalHours) return total;
                            const [hours, minutes] = entry.totalHours.split(':').map(Number);
                            return total + hours + minutes/60;
                          }, 0).toFixed(1)}h
                        </div>
                        <p className="text-sm text-muted-foreground">Total de horas</p>
                        
                        <div className="mt-4">
                          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                            <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-1">
                            <span>0h</span>
                            <span>Meta: 40h</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarDays className="mr-1 h-4 w-4" />
                Última atualização: {format(new Date(), "dd/MM/yyyy 'às' HH:mm")}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default TimeTracking;
