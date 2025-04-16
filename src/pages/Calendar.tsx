
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, CalendarDays, Plus, Clock, Users, Calendar as CalendarIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Constants
const eventColors = ['#4ade80', '#60a5fa', '#f472b6', '#facc15', '#a855f7'];

// Interfaces
interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  location: string;
  description: string;
  color: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Helper function to format date
const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState<Omit<Event, 'id'>>({
    title: '',
    date: new Date(),
    time: '09:00',
    location: '',
    description: '',
    color: eventColors[0],
  });
  const [isEventDetailsModalOpen, setIsEventDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  
  useEffect(() => {
    document.title = `Calendário - Sua Empresa`;
  }, []);
  
  const navItems: NavItem[] = [
    { name: 'Dashboard', href: '/dashboard', icon: <CalendarIcon size={18} /> },
    { name: 'Finanças', href: '/finances', icon: <CalendarIcon size={18} /> },
    { name: 'Metas', href: '/goals', icon: <CalendarIcon size={18} /> },
    { name: 'Aprendizado', href: '/learn', icon: <CalendarIcon size={18} /> },
  ];
  
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };
  
  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const handleAddEvent = () => {
    setIsAddEventModalOpen(true);
  };
  
  const handleCloseAddEventModal = () => {
    setIsAddEventModalOpen(false);
    setNewEvent({
      title: '',
      date: new Date(),
      time: '09:00',
      location: '',
      description: '',
      color: eventColors[0],
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const handleColorChange = (color: string) => {
    setNewEvent(prev => ({
      ...prev,
      color: color,
    }));
  };
  
  const handleSubmitEvent = () => {
    const newEventWithId: Event = {
      id: String(Date.now()),
      ...newEvent,
    };
    setEvents(prev => [...prev, newEventWithId]);
    handleCloseAddEventModal();
  };
  
  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
    setIsEventDetailsModalOpen(true);
  };
  
  const handleCloseEventDetailsModal = () => {
    setIsEventDetailsModalOpen(false);
    setSelectedEvent(null);
  };
  
  const primaryColor = localStorage.getItem('primaryColor') || '#8B5CF6';
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <PageHeader 
            title="Calendário"
            subtitle="Gerencie seus eventos e compromissos"
            icon={<CalendarDays className="h-6 w-6 text-primary" />}
            actionButton={
              <Button onClick={handleAddEvent}>
                <Plus className="mr-2 h-4 w-4" /> Novo Evento
              </Button>
            }
          />
          
          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-semibold">
              {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <Button variant="outline" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <Card className="lg:col-span-2 glass">
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">Calendário</CardTitle>
                <CardDescription>Visualize e gerencie seus eventos</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="month" className="w-full">
                  <TabsList className="mb-4">
                    <TabsTrigger value="month">Mês</TabsTrigger>
                    <TabsTrigger value="week">Semana</TabsTrigger>
                    <TabsTrigger value="day">Dia</TabsTrigger>
                    <TabsTrigger value="agenda">Agenda</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="month" className="mt-0">
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      className="rounded-md border shadow-sm p-3"
                      classNames={{
                        day_today: "bg-primary/10 font-bold text-primary",
                        day_selected: "bg-primary text-primary-foreground",
                        day_outside: "text-muted-foreground opacity-50",
                        day_disabled: "text-muted-foreground opacity-50",
                        day_hidden: "invisible",
                      }}
                      modifiersClassNames={{
                        highlighted: "bg-primary/20"
                      }}
                    />
                  </TabsContent>
                  
                  <TabsContent value="week" className="mt-2">
                    Em breve
                  </TabsContent>
                  
                  <TabsContent value="day" className="mt-2">
                    Em breve
                  </TabsContent>
                  
                  <TabsContent value="agenda" className="mt-2">
                    Em breve
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader>
                <CardTitle>Eventos do Dia</CardTitle>
                <CardDescription>Seus eventos para {selectedDate ? formatDate(selectedDate) : 'hoje'}</CardDescription>
              </CardHeader>
              <CardContent className="p-4">
                {selectedDate ? (
                  events.filter(event => {
                    const eventDate = new Date(event.date);
                    return (
                      eventDate.getDate() === selectedDate.getDate() &&
                      eventDate.getMonth() === selectedDate.getMonth() &&
                      eventDate.getFullYear() === selectedDate.getFullYear()
                    );
                  }).length > 0 ? (
                    <ul className="list-none p-0">
                      {events.filter(event => {
                        const eventDate = new Date(event.date);
                        return (
                          eventDate.getDate() === selectedDate.getDate() &&
                          eventDate.getMonth() === selectedDate.getMonth() &&
                          eventDate.getFullYear() === selectedDate.getFullYear()
                        );
                      }).map(event => (
                        <li key={event.id} className="mb-2 p-3 rounded-md shadow-sm border" style={{ backgroundColor: event.color, color: 'white' }}>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold">{event.title}</span>
                            <span className="text-sm">{event.time}</span>
                          </div>
                          <p className="text-sm">{event.location}</p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">Nenhum evento para este dia.</p>
                  )
                ) : (
                  <p className="text-muted-foreground">Selecione uma data para ver os eventos.</p>
                )}
              </CardContent>
            </Card>
          </div>
          
          {/* Add Event Modal */}
          {isAddEventModalOpen && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <Card className="w-full max-w-md glass">
                <CardHeader>
                  <CardTitle>Adicionar Novo Evento</CardTitle>
                  <CardDescription>Crie um novo evento no seu calendário</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid gap-4">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-gray-700">Título</label>
                      <input
                        type="text"
                        name="title"
                        id="title"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        value={newEvent.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Data</label>
                      <input
                        type="date"
                        name="date"
                        id="date"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        value={newEvent.date.toISOString().split('T')[0]}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="time" className="block text-sm font-medium text-gray-700">Hora</label>
                      <input
                        type="time"
                        name="time"
                        id="time"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        value={newEvent.time}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="location" className="block text-sm font-medium text-gray-700">Localização</label>
                      <input
                        type="text"
                        name="location"
                        id="location"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        value={newEvent.location}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
                      <textarea
                        name="description"
                        id="description"
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                        value={newEvent.description}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Cor do Evento</label>
                      <div className="flex gap-2">
                        {eventColors.map(color => (
                          <button
                            key={color}
                            type="button"
                            className="w-6 h-6 rounded-full focus:outline-none"
                            style={{ backgroundColor: color, border: newEvent.color === color ? '2px solid black' : 'none' }}
                            onClick={() => handleColorChange(color)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={handleCloseAddEventModal}>Cancelar</Button>
                  <Button onClick={handleSubmitEvent}>Adicionar Evento</Button>
                </CardFooter>
              </Card>
            </div>
          )}
          
          {/* Event Details Modal */}
          {isEventDetailsModalOpen && selectedEvent && (
            <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
              <Card className="w-full max-w-md glass">
                <CardHeader>
                  <CardTitle>Detalhes do Evento</CardTitle>
                  <CardDescription>{selectedEvent.title}</CardDescription>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="grid gap-4">
                    <div>
                      <p className="block text-sm font-medium text-gray-700">Data:</p>
                      <p>{formatDate(new Date(selectedEvent.date))}</p>
                    </div>
                    <div>
                      <p className="block text-sm font-medium text-gray-700">Hora:</p>
                      <p>{selectedEvent.time}</p>
                    </div>
                    <div>
                      <p className="block text-sm font-medium text-gray-700">Localização:</p>
                      <p>{selectedEvent.location}</p>
                    </div>
                    <div>
                      <p className="block text-sm font-medium text-gray-700">Descrição:</p>
                      <p>{selectedEvent.description}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2">
                  <Button variant="ghost" onClick={handleCloseEventDetailsModal}>Fechar</Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
