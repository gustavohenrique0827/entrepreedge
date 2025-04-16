
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar as CalendarIcon, Clock, Plus, Filter, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

// Mock data for time entries
const mockTimeEntries = [
  { id: 1, employeeName: 'João Silva', date: '2023-04-10', checkIn: '08:00', checkOut: '17:00', totalHours: '09:00', status: 'Aprovado' },
  { id: 2, employeeName: 'Maria Souza', date: '2023-04-10', checkIn: '08:30', checkOut: '17:30', totalHours: '09:00', status: 'Aprovado' },
  { id: 3, employeeName: 'Pedro Santos', date: '2023-04-10', checkIn: '09:00', checkOut: '18:00', totalHours: '09:00', status: 'Pendente' },
  { id: 4, employeeName: 'Ana Oliveira', date: '2023-04-09', checkIn: '08:00', checkOut: '17:00', totalHours: '09:00', status: 'Aprovado' },
  { id: 5, employeeName: 'Carlos Pereira', date: '2023-04-09', checkIn: '08:15', checkOut: '17:15', totalHours: '09:00', status: 'Rejeitado' },
];

const TimeTracking = () => {
  const { toast } = useToast();
  const [timeEntries, setTimeEntries] = useState(mockTimeEntries);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTimeEntry, setNewTimeEntry] = useState({
    employeeName: '',
    date: '',
    checkIn: '',
    checkOut: '',
    status: 'Pendente'
  });

  // Filter time entries based on search term
  const filteredTimeEntries = timeEntries.filter(entry =>
    entry.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.date.includes(searchTerm) ||
    entry.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddTimeEntry = () => {
    if (!newTimeEntry.employeeName || !newTimeEntry.date || !newTimeEntry.checkIn) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Calculate total hours if both check-in and check-out are provided
    let totalHours = '';
    if (newTimeEntry.checkIn && newTimeEntry.checkOut) {
      const checkIn = new Date(`2023-01-01T${newTimeEntry.checkIn}`);
      const checkOut = new Date(`2023-01-01T${newTimeEntry.checkOut}`);
      const diffMs = checkOut.getTime() - checkIn.getTime();
      const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
      const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      totalHours = `${diffHrs.toString().padStart(2, '0')}:${diffMins.toString().padStart(2, '0')}`;
    }

    const id = timeEntries.length > 0 ? Math.max(...timeEntries.map(e => e.id)) + 1 : 1;
    const entryToAdd = {
      id,
      ...newTimeEntry,
      totalHours
    };

    setTimeEntries([...timeEntries, entryToAdd]);
    setNewTimeEntry({
      employeeName: '',
      date: '',
      checkIn: '',
      checkOut: '',
      status: 'Pendente'
    });
    setIsAddDialogOpen(false);

    toast({
      title: "Registro adicionado",
      description: `Registro de ponto para ${entryToAdd.employeeName} foi adicionado com sucesso.`
    });
  };

  // Create the action button for the header
  const actionButton = (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Novo Registro
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Registro de Ponto</DialogTitle>
          <DialogDescription>
            Registre a entrada ou saída de um colaborador.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="employeeName" className="text-right">Colaborador</Label>
            <Input
              id="employeeName"
              value={newTimeEntry.employeeName}
              onChange={(e) => setNewTimeEntry({...newTimeEntry, employeeName: e.target.value})}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">Data</Label>
            <div className="col-span-3 flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                id="date"
                type="date"
                value={newTimeEntry.date}
                onChange={(e) => setNewTimeEntry({...newTimeEntry, date: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="checkIn" className="text-right">Entrada</Label>
            <div className="col-span-3 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                id="checkIn"
                type="time"
                value={newTimeEntry.checkIn}
                onChange={(e) => setNewTimeEntry({...newTimeEntry, checkIn: e.target.value})}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="checkOut" className="text-right">Saída</Label>
            <div className="col-span-3 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
              <Input
                id="checkOut"
                type="time"
                value={newTimeEntry.checkOut}
                onChange={(e) => setNewTimeEntry({...newTimeEntry, checkOut: e.target.value})}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleAddTimeEntry}>Registrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  const navItems = [
    { name: 'Colaboradores', href: '/personnel/employees', icon: <Clock size={18} /> },
    { name: 'Ponto Eletrônico', href: '/personnel/time-tracking', icon: <Clock size={18} /> },
    { name: 'Holerites', href: '/personnel/payslips', icon: <Clock size={18} /> }
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <PageHeader
            title="Controle de Ponto"
            description="Gerencie os registros de ponto dos colaboradores"
            actionButton={actionButton}
          />

          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Registros de Ponto</CardTitle>
                <CardDescription>
                  Histórico de entradas e saídas dos colaboradores.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Buscar por colaborador, data ou status..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8"
                    />
                  </div>
                  <Button variant="outline" className="sm:w-auto w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Colaborador</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Entrada</TableHead>
                        <TableHead>Saída</TableHead>
                        <TableHead>Total de Horas</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTimeEntries.length > 0 ? (
                        filteredTimeEntries.map((entry) => (
                          <TableRow key={entry.id}>
                            <TableCell className="font-medium">{entry.employeeName}</TableCell>
                            <TableCell>{entry.date}</TableCell>
                            <TableCell>{entry.checkIn}</TableCell>
                            <TableCell>{entry.checkOut || '-'}</TableCell>
                            <TableCell>{entry.totalHours || '-'}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                entry.status === 'Aprovado' ? 'bg-green-100 text-green-800' :
                                entry.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {entry.status}
                              </span>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} className="h-24 text-center">
                            Nenhum resultado encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Mostrando {filteredTimeEntries.length} de {timeEntries.length} registros
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Anterior</Button>
                  <Button variant="outline" size="sm" disabled>Próxima</Button>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;
