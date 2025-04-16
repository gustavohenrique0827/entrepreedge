import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CalendarIcon, Plus, Search, Filter, ChevronLeft, ChevronRight, Clock, Users, MapPin, Trash2, Edit, MoreHorizontal, Calendar as CalendarIcon2, Bookmark, Bell } from 'lucide-react';
import { format, startOfWeek, endOfWeek, addDays, isToday, isSameDay, isBefore, addWeeks, subWeeks, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const EVENT_CATEGORIES = [
  { id: 'internal', name: 'Interno', color: '#8B5CF6' },
  { id: 'client', name: 'Cliente', color: '#10B981' },
  { id: 'personal', name: 'Pessoal', color: '#3B82F6' },
  { id: 'holiday', name: 'Feriado', color: '#F97316' },
  { id: 'deadline', name: 'Prazo', color: '#EF4444' },
];

const INITIAL_EVENTS = [
  {
    id: 1,
    title: 'Reunião de Planejamento',
    description: 'Planejamento trimestral com a equipe de vendas',
    startTime: '2025-04-16T09:00:00',
    endTime: '2025-04-16T11:00:00',
    location: 'Sala de Conferências A',
    category: 'internal',
    participants: ['João Silva', 'Maria Santos', 'Carlos Oliveira'],
    reminder: '30min'
  },
  {
    id: 2,
    title: 'Apresentação para Cliente',
    description: 'Apresentação da nova proposta para XYZ Corp',
    startTime: '2025-04-16T14:00:00',
    endTime: '2025-04-16T15:30:00',
    location: 'Escritório do Cliente',
    category: 'client',
    participants: ['Ana Costa', 'Pedro Souza'],
    reminder: '1h'
  },
  {
    id: 3,
    title: 'Prazo: Entrega do Relatório',
    description: 'Entrega do relatório trimestral financeiro',
    startTime: '2025-04-18T17:00:00',
    endTime: '2025-04-18T17:00:00',
    location: '',
    category: 'deadline',
    participants: [],
    reminder: '1d'
  },
  {
    id: 4,
    title: 'Treinamento de Equipe',
    description: 'Treinamento sobre as novas ferramentas',
    startTime: '2025-04-17T13:00:00',
    endTime: '2025-04-17T16:00:00',
    location: 'Sala de Treinamento',
    category: 'internal',
    participants: ['Toda a equipe'],
    reminder: '1h'
  },
  {
    id: 5,
    title: 'Almoço com Parceiros',
    description: 'Almoço para discutir nova parceria',
    startTime: '2025-04-19T12:00:00',
    endTime: '2025-04-19T13:30:00',
    location: 'Restaurante Central',
    category: 'client',
    participants: ['Marcos Vinicius', 'Juliana Alves'],
    reminder: '1h'
  }
];

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    endTime: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
    location: '',
    category: 'internal',
    participants: '',
    reminder: '30min'
  });
  const [view, setView] = useState('week'); // week, day, month
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { toast } = useToast();
  
  const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 });
    const end = endOfWeek(date, { weekStartsOn: 0 });
    
    const days = [];
    let current = start;
    
    while (current <= end) {
      days.push(current);
      current = addDays(current, 1);
    }
    
    return days;
  };
  
  const weekDays = getWeekDays(currentDate);
  
  const getEventsForDay = (day: Date) => {
    return events.filter(event => {
      const eventDate = parseISO(event.startTime);
      return isSameDay(eventDate, day);
    });
  };
  
  const getCategoryColor = (categoryId: string) => {
    const category = EVENT_CATEGORIES.find(cat => cat.id === categoryId);
    return category ? category.color : '#6c757d';
  };
  
  const getTimeFromISO = (isoString: string) => {
    return format(parseISO(isoString), 'HH:mm');
  };
  
  const formatDuration = (startTime: string, endTime: string) => {
    const start = parseISO(startTime);
    const end = parseISO(endTime);
    
    return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
  };
  
  const handlePrevious = () => {
    if (view === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (view === 'day') {
      setCurrentDate(addDays(currentDate, -1));
    }
  };
  
  const handleNext = () => {
    if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (view === 'day') {
      setCurrentDate(addDays(currentDate, 1));
    }
  };
  
  const handleToday = () => {
    setCurrentDate(new Date());
  };
  
  const formatDayHeader = (day: Date): string => {
    if (view === 'week') {
      return format(day, 'EEEE, dd', { locale: ptBR });
    } else if (view === 'day') {
      return format(day, 'EEEE, dd MMMM', { locale: ptBR });
    }
    return '';
  };
  
  const handleEventClick = (event: any) => {
    setSelectedEvent(event);
  };
  
  const handleCloseEventDetails = () => {
    setSelectedEvent(null);
  };
  
  const handleCreateEvent = () => {
    if (!newEvent.title || !newEvent.startTime || !newEvent.endTime) {
      toast({
        title: "Erro ao criar evento",
        description: "Título, hora de início e término são obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    const participantsArray = newEvent.participants ? newEvent.participants.split(',').map(p => p.trim()) : [];
    
    const createdEvent = {
      id: events.length + 1,
      ...newEvent,
      participants: participantsArray
    };
    
    setEvents([...events, createdEvent]);
    setIsCreatingEvent(false);
    setNewEvent({
      title: '',
      description: '',
      startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endTime: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
      location: '',
      category: 'internal',
      participants: '',
      reminder: '30min'
    });
    
    toast({
      title: "Evento criado",
      description: "O evento foi criado com sucesso.",
    });
  };
  
  const handleDeleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    setSelectedEvent(null);
    
    toast({
      title: "Evento excluído",
      description: "O evento foi excluído com sucesso.",
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };
  
  const renderDayColumn = (day: Date) => {
    const dayEvents = getEventsForDay(day);
    const isCurrentDay = isToday(day);
    const isPastDay = isBefore(day, new Date()) && !isToday(day);
    
    return (
      <div 
        key={day.toString()} 
        className={cn(
          "border rounded-md min-h-[500px] flex-1 flex flex-col",
          isCurrentDay ? "bg-primary/5 border-primary" : isPastDay ? "bg-muted/20" : ""
        )}
      >
        <div className={cn(
          "p-2 border-b text-center",
          isCurrentDay ? "bg-primary/10 text-primary font-medium" : ""
        )}>
          {formatDayHeader(day)}
        </div>
        <div className="flex-1 p-2 space-y-2">
          {dayEvents.map(event => (
            <div 
              key={event.id}
              className="rounded-md p-2 cursor-pointer hover:opacity-90 transition-opacity"
              style={{ backgroundColor: `${getCategoryColor(event.category)}20`, borderLeft: `3px solid ${getCategoryColor(event.category)}` }}
              onClick={() => handleEventClick(event)}
            >
              <div className="text-sm font-medium truncate">{event.title}</div>
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatDuration(event.startTime, event.endTime)}
              </div>
              {event.location && (
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Agenda</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie seus compromissos e reuniões
            </p>
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <Button onClick={handleToday}>Hoje</Button>
              <Button variant="outline" size="icon" onClick={handlePrevious}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNext}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <div className="text-lg font-medium ml-2">
                {view === 'week' ? (
                  <>
                    {format(weekDays[0], 'dd MMM', { locale: ptBR })} - {format(weekDays[6], 'dd MMM yyyy', { locale: ptBR })}
                  </>
                ) : (
                  format(currentDate, 'dd MMMM yyyy', { locale: ptBR })
                )}
              </div>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="ml-2">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    Selecionar Data
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setCurrentDate(date);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex border rounded-md">
                <Button 
                  variant={view === 'day' ? 'default' : 'ghost'} 
                  className="rounded-r-none" 
                  onClick={() => setView('day')}
                >
                  Dia
                </Button>
                <Button 
                  variant={view === 'week' ? 'default' : 'ghost'} 
                  className="rounded-l-none" 
                  onClick={() => setView('week')}
                >
                  Semana
                </Button>
              </div>
              
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              
              <Dialog open={isCreatingEvent} onOpenChange={setIsCreatingEvent}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Novo Evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[550px]">
                  <DialogHeader>
                    <DialogTitle>Criar Novo Evento</DialogTitle>
                    <DialogDescription>
                      Preencha os detalhes para criar um novo evento na sua agenda.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="title">Título *</Label>
                      <Input 
                        id="title" 
                        name="title" 
                        value={newEvent.title} 
                        onChange={handleInputChange} 
                        placeholder="Ex: Reunião de Planejamento" 
                      />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="description">Descrição</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        value={newEvent.description} 
                        onChange={handleInputChange} 
                        placeholder="Detalhes do evento" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="startTime">Início *</Label>
                        <Input 
                          id="startTime" 
                          name="startTime" 
                          type="datetime-local" 
                          value={newEvent.startTime} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="endTime">Término *</Label>
                        <Input 
                          id="endTime" 
                          name="endTime" 
                          type="datetime-local" 
                          value={newEvent.endTime} 
                          onChange={handleInputChange} 
                        />
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="location">Local</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        value={newEvent.location} 
                        onChange={handleInputChange} 
                        placeholder="Ex: Sala de Reuniões" 
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="category">Categoria</Label>
                        <Select name="category" value={newEvent.category} onValueChange={(value) => setNewEvent({...newEvent, category: value})}>
                          <SelectTrigger id="category">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {EVENT_CATEGORIES.map(category => (
                              <SelectItem key={category.id} value={category.id}>
                                <div className="flex items-center gap-2">
                                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }}></div>
                                  {category.name}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="reminder">Lembrete</Label>
                        <Select name="reminder" value={newEvent.reminder} onValueChange={(value) => setNewEvent({...newEvent, reminder: value})}>
                          <SelectTrigger id="reminder">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Sem lembrete</SelectItem>
                            <SelectItem value="10min">10 minutos antes</SelectItem>
                            <SelectItem value="30min">30 minutos antes</SelectItem>
                            <SelectItem value="1h">1 hora antes</SelectItem>
                            <SelectItem value="1d">1 dia antes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="participants">Participantes</Label>
                      <Textarea 
                        id="participants" 
                        name="participants" 
                        value={newEvent.participants} 
                        onChange={handleInputChange} 
                        placeholder="Nome dos participantes, separados por vírgula" 
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsCreatingEvent(false)}>Cancelar</Button>
                    <Button onClick={handleCreateEvent}>Criar Evento</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          <Card>
            <CardContent className="p-4">
              {view === 'week' && (
                <div className="flex gap-2">
                  {weekDays.map(day => renderDayColumn(day))}
                </div>
              )}
              
              {view === 'day' && (
                <div className="min-h-[600px]">
                  <div className={cn(
                    "py-2 border-b mb-4 text-center",
                    isToday(currentDate) ? "text-primary font-medium" : ""
                  )}>
                    {format(currentDate, 'EEEE, dd MMMM yyyy', { locale: ptBR })}
                  </div>
                  
                  <div className="space-y-3">
                    {getEventsForDay(currentDate).length > 0 ? (
                      getEventsForDay(currentDate).map(event => (
                        <div 
                          key={event.id}
                          className="rounded-md p-3 cursor-pointer hover:opacity-90 transition-opacity"
                          style={{ backgroundColor: `${getCategoryColor(event.category)}10`, borderLeft: `3px solid ${getCategoryColor(event.category)}` }}
                          onClick={() => handleEventClick(event)}
                        >
                          <div className="text-base font-medium">{event.title}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-1 my-1">
                            <Clock className="h-4 w-4" />
                            {formatDuration(event.startTime, event.endTime)}
                          </div>
                          
                          {event.description && (
                            <div className="text-sm text-muted-foreground mt-2">
                              {event.description}
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-4 mt-2">
                            {event.location && (
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </div>
                            )}
                            
                            {event.participants && event.participants.length > 0 && (
                              <div className="text-sm text-muted-foreground flex items-center gap-1">
                                <Users className="h-4 w-4" />
                                {event.participants.length} participante(s)
                              </div>
                            )}
                            
                            <div className="text-sm bg-muted/50 px-2 py-0.5 rounded-full">
                              {EVENT_CATEGORIES.find(cat => cat.id === event.category)?.name}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-20 text-muted-foreground">
                        <CalendarIcon2 className="h-12 w-12 mx-auto mb-4 opacity-20" />
                        <p>Nenhum evento agendado para este dia</p>
                        <Button variant="outline" className="mt-4" onClick={() => setIsCreatingEvent(true)}>
                          <Plus className="mr-2 h-4 w-4" />
                          Adicionar Evento
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Próximos Eventos</CardTitle>
                <CardDescription>Seus eventos para os próximos dias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {events
                    .filter(event => !isBefore(parseISO(event.startTime), new Date()))
                    .sort((a, b) => new Date(a.startTime) - new Date(b.startTime))
                    .slice(0, 5)
                    .map(event => (
                      <div 
                        key={event.id}
                        className="flex items-center p-2 rounded-md hover:bg-muted/20 cursor-pointer"
                        onClick={() => handleEventClick(event)}
                      >
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: getCategoryColor(event.category) }}
                        ></div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{event.title}</div>
                          <div className="text-xs text-muted-foreground">
                            {format(parseISO(event.startTime), 'dd MMM, HH:mm', { locale: ptBR })}
                          </div>
                        </div>
                      </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Categorias</CardTitle>
                <CardDescription>Filtrar eventos por categorias</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {EVENT_CATEGORIES.map(category => (
                    <div key={category.id} className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-sm">{category.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Lembretes</CardTitle>
                <CardDescription>Próximos lembretes</CardDescription>
              </CardHeader>
              <CardContent>
                {events
                  .filter(event => event.reminder !== 'none')
                  .slice(0, 3)
                  .map(event => (
                    <div key={event.id} className="mb-2 p-2 border rounded-md">
                      <div className="text-sm font-medium">{event.title}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Bell className="h-3 w-3" />
                        {event.reminder === '10min' ? '10 minutos antes' : 
                         event.reminder === '30min' ? '30 minutos antes' :
                         event.reminder === '1h' ? '1 hora antes' : '1 dia antes'}
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </div>
          
          <Dialog open={selectedEvent !== null} onOpenChange={handleCloseEventDetails}>
            {selectedEvent && (
              <>
                <DialogHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded-full" 
                        style={{ backgroundColor: getCategoryColor(selectedEvent.category) }}
                      ></div>
                      <DialogTitle>{selectedEvent.title}</DialogTitle>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Editar</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer text-red-600" 
                          onClick={() => handleDeleteEvent(selectedEvent.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Excluir</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </DialogHeader>
                
                <div className="space-y-4 py-4">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <div>
                      {format(parseISO(selectedEvent.startTime), 'EEEE, dd MMMM yyyy', { locale: ptBR })}
                      <br />
                      {formatDuration(selectedEvent.startTime, selectedEvent.endTime)}
                    </div>
                  </div>
                  
                  {selectedEvent.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  )}
                  
                  {selectedEvent.description && (
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-sm font-medium mb-2">Descrição</h3>
                      <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                    </div>
                  )}
                  
                  {selectedEvent.participants && selectedEvent.participants.length > 0 && (
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-sm font-medium mb-2">Participantes</h3>
                      <div className="space-y-1">
                        {selectedEvent.participants.map((participant, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                              {participant.charAt(0)}
                            </div>
                            <span className="text-sm">{participant}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {selectedEvent.reminder && selectedEvent.reminder !== 'none' && (
                    <div className="border-t pt-4 mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <span className="text-sm">
                          {selectedEvent.reminder === '10min' ? '10 minutos antes' : 
                           selectedEvent.reminder === '30min' ? '30 minutos antes' :
                           selectedEvent.reminder === '1h' ? '1 hora antes' : '1 dia antes'}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">Editar Lembrete</Button>
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <div className="flex space-x-2">
                    <Button variant="outline" onClick={handleCloseEventDetails}>Fechar</Button>
                    <Button variant="outline">
                      <Bookmark className="mr-2 h-4 w-4" />
                      Salvar
                    </Button>
                  </div>
                </DialogFooter>
              </>
            )}
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
