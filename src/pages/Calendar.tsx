
import React, { useState } from 'react';
import { format, addDays, parseISO } from 'date-fns';
import { Card, CardContent } from "@/components/ui/card";
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useToast } from "@/hooks/use-toast";
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';

// Import refactored components
import CalendarHeader from '@/components/calendar/CalendarHeader';
import CalendarView from '@/components/calendar/CalendarView';
import EventForm from '@/components/calendar/EventForm';
import EventDetails from '@/components/calendar/EventDetails';
import { UpcomingEvents, CalendarCategories, Reminders } from '@/components/calendar/SidebarComponents';
import { EVENT_CATEGORIES, INITIAL_EVENTS } from '@/components/calendar/constants';
import { Event, EventFormData } from '@/components/calendar/types';

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [events, setEvents] = useState<Event[]>(INITIAL_EVENTS);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<EventFormData>({
    title: '',
    description: '',
    startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
    endTime: format(addDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm"),
    location: '',
    category: 'internal',
    participants: '',
    reminder: '30min'
  });
  const [view, setView] = useState<'month' | 'week' | 'day'>('week');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { toast } = useToast();
  
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
  
  return (
    <PageContainer>
      <PageHeader 
        title="Agenda" 
        description="Gerencie seus compromissos e reuniões"
      />
      
      <div className="space-y-6">
        <CalendarHeader 
          currentDate={currentDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setCurrentDate={setCurrentDate}
          view={view}
          setView={setView}
          onNewEvent={() => setIsCreatingEvent(true)}
        />
        
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
      </div>
    </PageContainer>
  );
};

export default CalendarPage;
