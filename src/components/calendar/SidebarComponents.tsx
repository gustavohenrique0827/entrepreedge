
import React from 'react';
import { format, parseISO, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Bell } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarComponentProps, Event } from './types';
import { getCategoryColor } from './utils';

export const UpcomingEvents: React.FC<{ events: Event[], onEventClick: (event: Event) => void }> = ({ 
  events, 
  onEventClick 
}) => {
  const upcomingEvents = events
    .filter(event => !isBefore(parseISO(event.startTime), new Date()))
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime())
    .slice(0, 5);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Próximos Eventos</CardTitle>
        <CardDescription>Seus eventos para os próximos dias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {upcomingEvents.map(event => (
            <div 
              key={event.id}
              className="flex items-center p-2 rounded-md hover:bg-muted/20 cursor-pointer"
              onClick={() => onEventClick(event)}
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
  );
};

export const CalendarCategories: React.FC<{ categories: SidebarComponentProps['categories'] }> = ({ 
  categories 
}) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Categorias</CardTitle>
        <CardDescription>Filtrar eventos por categorias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {categories.map(category => (
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
  );
};

export const Reminders: React.FC<{ events: Event[] }> = ({ events }) => {
  const eventsWithReminders = events
    .filter(event => event.reminder !== 'none')
    .slice(0, 3);
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Lembretes</CardTitle>
        <CardDescription>Próximos lembretes</CardDescription>
      </CardHeader>
      <CardContent>
        {eventsWithReminders.map(event => (
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
  );
};
