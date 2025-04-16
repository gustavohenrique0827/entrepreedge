import React from 'react';
import { CalendarIcon } from 'lucide-react';
import { format, isToday } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DayColumn from './DayColumn';
import { getWeekDays, getEventsForDay, getCategoryColor, formatDuration } from './utils';
import { CalendarViewProps } from './types';

const CalendarView: React.FC<CalendarViewProps> = ({ 
  currentDate, 
  events, 
  view, 
  onEventClick 
}) => {
  const weekDays = getWeekDays(currentDate);
  
  return (
    <>
      {view === 'week' && (
        <div className="flex gap-2">
          {weekDays.map(day => (
            <DayColumn 
              key={day.toString()} 
              day={day} 
              events={getEventsForDay(events, day)} 
              onEventClick={onEventClick} 
              view={view}
            />
          ))}
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
            {getEventsForDay(events, currentDate).length > 0 ? (
              getEventsForDay(events, currentDate).map(event => (
                <div 
                  key={event.id}
                  className="rounded-md p-3 cursor-pointer hover:opacity-90 transition-opacity"
                  style={{ backgroundColor: `${getCategoryColor(event.category)}10`, borderLeft: `3px solid ${getCategoryColor(event.category)}` }}
                  onClick={() => onEventClick(event)}
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
                      {/* {EVENT_CATEGORIES.find(cat => cat.id === event.category)?.name} */}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 text-muted-foreground">
                <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>Nenhum evento agendado para este dia</p>
                <Button variant="outline" className="mt-4" onClick={() => {}}>
                  Adicionar Evento
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CalendarView;
