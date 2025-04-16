
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDays, Clock, Plus, Search, Calendar as CalendarIcon, AlertTriangle, CheckCircle, Trash2, Edit, MoreVertical } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type EventType = {
  id: number;
  title: string;
  date: Date;
  time: string;
  description: string;
  type: 'event' | 'reminder' | 'task';
  completed?: boolean;
};

const Calendar = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'month' | 'list'>('month');
  const [events, setEvents] = useState<EventType[]>([
    {
      id: 1,
      title: 'Reunião com equipe',
      date: new Date(2025, 3, 20),
      time: '14:30',
      description: 'Discutir as metas do próximo trimestre',
      type: 'event'
    },
    {
      id: 2,
      title: 'Pagamento de contas',
      date: new Date(2025, 3, 25),
      time: '',
      description: 'Não esquecer de pagar as contas do mês',
      type: 'reminder'
    },
    {
      id: 3,
      title: 'Enviar relatório mensal',
      date: new Date(2025, 3, 30),
      time: '18:00',
      description: 'Enviar relatório de desempenho para os gestores',
      type: 'task',
      completed: false
    }
  ]);
  
  const [newEvent, setNewEvent] = useState<Omit<EventType, 'id'>>({
    title: '',
    date: new Date(),
    time: '',
    description: '',
    type: 'event'
  });

  const navItems = [
    {
      name: 'Calendar',
      href: '/calendar',
      icon: <CalendarDays size={18} />
    }
  ];

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha o título e a data do evento.",
        variant: "destructive"
      });
      return;
    }

    const id = events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1;
    const eventToAdd = {
      id,
      ...newEvent,
      completed: newEvent.type === 'task' ? false : undefined
    };

    setEvents([...events, eventToAdd]);
    setNewEvent({
      title: '',
      date: new Date(),
      time: '',
      description: '',
      type: 'event'
    });
    setIsAddEventOpen(false);

    toast({
      title: "Evento adicionado",
      description: `${eventToAdd.title} foi adicionado com sucesso.`
    });
  };

  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    toast({
      title: "Evento removido",
      description: "O evento foi removido com sucesso."
    });
  };

  const handleToggleTaskCompletion = (id: number) => {
    setEvents(events.map(event => 
      event.id === id ? {...event, completed: !event.completed} : event
    ));
  };

  // Get events for the selected date
  const selectedDateEvents = events.filter(event => 
    date && event.date.getDate() === date.getDate() && 
    event.date.getMonth() === date.getMonth() && 
    event.date.getFullYear() === date.getFullYear()
  );

  // Get dates that have events for highlighting in the calendar
  const eventDates = events.map(event => event.date);

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <PageHeader
            title="Agenda e Lembretes"
            description="Gerencie seus eventos, tarefas e lembretes em um só lugar"
            actionButton={
              <Dialog open={isAddEventOpen} onOpenChange={setIsAddEventOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Item</DialogTitle>
                    <DialogDescription>
                      Crie um evento, lembrete ou tarefa em sua agenda.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Tabs defaultValue="event" onValueChange={(value) => setNewEvent({...newEvent, type: value as EventType['type']})}>
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="event">Evento</TabsTrigger>
                        <TabsTrigger value="reminder">Lembrete</TabsTrigger>
                        <TabsTrigger value="task">Tarefa</TabsTrigger>
                      </TabsList>
                    </Tabs>
                    
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="title" className="text-right">
                        Título
                      </Label>
                      <Input
                        id="title"
                        value={newEvent.title}
                        onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="date" className="text-right">
                        Data
                      </Label>
                      <div className="col-span-3">
                        <Input
                          id="date"
                          type="date"
                          value={newEvent.date ? format(newEvent.date, 'yyyy-MM-dd') : ''}
                          onChange={(e) => {
                            const date = e.target.value ? new Date(e.target.value) : new Date();
                            setNewEvent({...newEvent, date});
                          }}
                        />
                      </div>
                    </div>
                    {newEvent.type !== 'reminder' && (
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">
                          Horário
                        </Label>
                        <Input
                          id="time"
                          type="time"
                          value={newEvent.time}
                          onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                          className="col-span-3"
                        />
                      </div>
                    )}
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="description" className="text-right">
                        Descrição
                      </Label>
                      <Textarea
                        id="description"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                        className="col-span-3"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={handleAddEvent}>Adicionar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            }
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle>Calendário</CardTitle>
                <CardDescription>Selecione uma data para ver os eventos</CardDescription>
              </CardHeader>
              <CardContent>
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={(day) => day && setDate(day)}
                  className="rounded-md border"
                  locale={ptBR}
                  modifiers={{
                    highlighted: eventDates
                  }}
                  modifiersClassNames={{
                    highlighted: "bg-primary/20"
                  }}
                />
                
                <div className="mt-4">
                  <Button variant="outline" className="w-full" onClick={() => setDate(new Date())}>
                    Hoje
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>
                      {date ? format(date, "EEEE, d 'de' MMMM 'de' yyyy", { locale: ptBR }) : ''}
                    </CardTitle>
                    <CardDescription>
                      {selectedDateEvents.length === 0 
                        ? 'Nenhum evento para esta data' 
                        : `${selectedDateEvents.length} item(ns) agendado(s)`}
                    </CardDescription>
                  </div>
                  <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'month' | 'list')}>
                    <TabsList>
                      <TabsTrigger value="month">Mês</TabsTrigger>
                      <TabsTrigger value="list">Lista</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </CardHeader>
              <CardContent>
                {viewMode === 'month' ? (
                  <div className="space-y-4">
                    {selectedDateEvents.length === 0 ? (
                      <div className="text-center py-10">
                        <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                        <h3 className="mt-2 text-lg font-medium">Nenhum evento</h3>
                        <p className="text-muted-foreground">
                          Não há eventos agendados para esta data.
                        </p>
                        <Button className="mt-4" onClick={() => setIsAddEventOpen(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar Evento
                        </Button>
                      </div>
                    ) : (
                      selectedDateEvents.map(event => (
                        <Card key={event.id} className="overflow-hidden">
                          <div className={`h-2 ${
                            event.type === 'event' ? 'bg-blue-500' : 
                            event.type === 'reminder' ? 'bg-yellow-500' : 
                            event.type === 'task' ? (event.completed ? 'bg-green-500' : 'bg-red-500') : ''
                          }`} />
                          <CardContent className="pt-6">
                            <div className="flex justify-between items-start">
                              <div>
                                <div className="flex items-center gap-2">
                                  {event.type === 'event' && <CalendarIcon size={16} className="text-blue-500" />}
                                  {event.type === 'reminder' && <AlertTriangle size={16} className="text-yellow-500" />}
                                  {event.type === 'task' && (
                                    event.completed 
                                      ? <CheckCircle size={16} className="text-green-500" /> 
                                      : <Clock size={16} className="text-red-500" />
                                  )}
                                  <h3 className={`font-medium ${
                                    event.type === 'task' && event.completed ? 'line-through text-muted-foreground' : ''
                                  }`}>
                                    {event.title}
                                  </h3>
                                </div>
                                {event.time && (
                                  <p className="text-sm text-muted-foreground mt-1">
                                    <Clock size={14} className="inline mr-1" />
                                    {event.time}
                                  </p>
                                )}
                                {event.description && (
                                  <p className="text-sm mt-2">{event.description}</p>
                                )}
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon">
                                    <MoreVertical size={16} />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  {event.type === 'task' && (
                                    <DropdownMenuItem onClick={() => handleToggleTaskCompletion(event.id)}>
                                      {event.completed ? (
                                        <>
                                          <Clock className="mr-2 h-4 w-4" />
                                          <span>Marcar como pendente</span>
                                        </>
                                      ) : (
                                        <>
                                          <CheckCircle className="mr-2 h-4 w-4" />
                                          <span>Marcar como concluída</span>
                                        </>
                                      )}
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem>
                                    <Edit className="mr-2 h-4 w-4" />
                                    <span>Editar</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => handleDeleteEvent(event.id)}>
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    <span>Excluir</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Buscar eventos..."
                        className="pl-8"
                      />
                    </div>
                    
                    <div className="rounded-md border">
                      {events.length === 0 ? (
                        <div className="text-center py-10">
                          <p className="text-muted-foreground">Nenhum evento encontrado</p>
                        </div>
                      ) : (
                        <div className="divide-y">
                          {events
                            .sort((a, b) => a.date.getTime() - b.date.getTime())
                            .map(event => (
                              <div key={event.id} className="flex items-center p-4 hover:bg-muted/50">
                                <div className={`w-3 h-3 rounded-full mr-4 ${
                                  event.type === 'event' ? 'bg-blue-500' : 
                                  event.type === 'reminder' ? 'bg-yellow-500' : 
                                  event.type === 'task' ? (event.completed ? 'bg-green-500' : 'bg-red-500') : ''
                                }`} />
                                <div className="flex-1 min-w-0">
                                  <p className={`font-medium truncate ${
                                    event.type === 'task' && event.completed ? 'line-through text-muted-foreground' : ''
                                  }`}>
                                    {event.title}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {format(event.date, "d 'de' MMMM", { locale: ptBR })}
                                    {event.time ? ` · ${event.time}` : ''}
                                  </p>
                                </div>
                                <div className="flex gap-2">
                                  {event.type === 'task' && (
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => handleToggleTaskCompletion(event.id)}
                                    >
                                      {event.completed ? (
                                        <Clock size={16} />
                                      ) : (
                                        <CheckCircle size={16} />
                                      )}
                                    </Button>
                                  )}
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleDeleteEvent(event.id)}
                                  >
                                    <Trash2 size={16} />
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
                    <span>Evento</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2" />
                    <span>Lembrete</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2" />
                    <span>Tarefa Pendente</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
                    <span>Tarefa Concluída</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
