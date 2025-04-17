import React, { useState, useEffect } from 'react';
import { format, addDays } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Home, BarChart2, Target, BookOpen } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarView from '@/components/calendar/CalendarView';
import EventForm from '@/components/calendar/EventForm';
import EventDetails from '@/components/calendar/EventDetails';
import { UpcomingEvents, CalendarCategories, Reminders } from '@/components/calendar/SidebarComponents';
import { EVENT_CATEGORIES, INITIAL_EVENTS } from '@/components/calendar/constants';
import { Event, EventFormData } from '@/components/calendar/types';
import AddEventDialog from '@/components/calendar/AddEventDialog';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState<boolean>(false);
  const [isAddEventOpen, setIsAddEventOpen] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<EventFormData>({
    title: '',
    description: '',
    startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    endTime: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
    location: '',
    category: 'internal',
    participants: '',
    reminder: '30min',
    repeat: false
  });
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { toast } = useToast();
  const { applyThemeColors } = useTheme();
  
  useEffect(() => {
    applyThemeColors();
  }, []);
  
  const handleEventClick = (event: Event) => {
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
    
    const createdEvent: Event = {
      id: events.length + 1,
      ...newEvent,
      participants: participantsArray
    };
    
    setEvents([...events, createdEvent]);
    setIsCreatingEvent(false);
    setIsAddEventOpen(false);
    setNewEvent({
      title: '',
      description: '',
      startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      endTime: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
      location: '',
      category: 'internal',
      participants: '',
      reminder: '30min',
      repeat: false
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

  const handleAddEvent = () => {
    setIsAddEventOpen(true);
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Finanças',
      href: '/finances',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Metas',
      href: '/goals',
      icon: <Target size={18} />
    },
    {
      name: 'Aprendizado',
      href: '/learn',
      icon: <BookOpen size={18} />
    },
  ];
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <PageContainer>
          <PageHeader 
            title="Agenda" 
            description="Gerencie seus compromissos e reuniões"
          />
          
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <CalendarHeader 
                currentDate={currentDate}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setCurrentDate={setCurrentDate}
                view={view}
                setView={setView}
                onNewEvent={handleAddEvent}
              />
            </div>
            
            <Card>
              <CardContent className="p-4">
                <CalendarView 
                  currentDate={currentDate}
                  events={events}
                  view={view}
                  onEventClick={handleEventClick}
                />
              </CardContent>
            </Card>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <UpcomingEvents events={events} onEventClick={handleEventClick} />
              <CalendarCategories categories={EVENT_CATEGORIES} />
              <Reminders events={events} />
            </div>
            
            <EventForm 
              isOpen={isCreatingEvent}
              setIsOpen={setIsCreatingEvent}
              newEvent={newEvent}
              setNewEvent={setNewEvent}
              handleCreateEvent={handleCreateEvent}
              categories={EVENT_CATEGORIES}
            />
            
            <EventDetails 
              event={selectedEvent}
              onClose={handleCloseEventDetails}
              onDelete={handleDeleteEvent}
              categories={EVENT_CATEGORIES}
            />

            <AddEventDialog
              isOpen={isAddEventOpen}
              onClose={() => setIsAddEventOpen(false)}
              onSave={handleCreateEvent}
              event={newEvent}
              setEvent={setNewEvent}
              categories={EVENT_CATEGORIES}
            />
          </div>
        </PageContainer>
      </div>
    </div>
  );
};

export default CalendarPage;
