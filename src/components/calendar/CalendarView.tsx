
import React from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Users } from 'lucide-react';
import { format, isToday, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import DayColumn from './DayColumn';
import { getWeekDays, getEventsForDay, getCategoryColor, formatDuration } from './utils';
import { CalendarViewProps } from './types';
import { EVENT_CATEGORIES } from './constants';

const CalendarView: React.FC<CalendarViewProps> = ({ 
  currentDate, 
  events, 
  view, 
  onEventClick 
}) => {
  const weekDays = getWeekDays(currentDate);
  
  // For Month view, get all days in current month
  const monthDays = React.useMemo(() => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    return eachDayOfInterval({ start, end });
  }, [currentDate]);
  
  return (
    <>
      {view === 'week' && (
        <div className="flex gap-2 overflow-x-auto">
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
      
      {view === 'month' && (
        <div className="min-h-[600px]">
          <div className="grid grid-cols-7 gap-1 mb-2 text-center">
            {['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'].map((dayName) => (
              <div key={dayName} className="py-2 text-sm font-medium text-muted-foreground">
                {dayName}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1 auto-rows-fr">
            {monthDays.map((day) => {
              const dayEvents = getEventsForDay(events, day);
              const isCurrentMonth = isSameMonth(day, currentDate);
              
              return (
                <div 
                  key={day.toString()} 
                  className={cn(
                    "min-h-[100px] border rounded-md p-1 relative",
                    isToday(day) ? "border-primary bg-primary/5" : "border-border",
                    !isCurrentMonth && "opacity-40"
                  )}
                >
                  <div className={cn(
                    "text-right text-sm p-1",
                    isToday(day) ? "font-bold text-primary" : ""
                  )}>
                    {format(day, 'd')}
                  </div>
                  
                  <div className="space-y-1 max-h-[80px] overflow-y-auto">
                    {dayEvents.length > 0 ? (
                      dayEvents.slice(0, 3).map((event) => (
                        <div 
                          key={event.id}
                          onClick={() => onEventClick(event)}
                          className="text-xs p-1 rounded cursor-pointer truncate"
                          style={{ backgroundColor: `${getCategoryColor(event.category)}20`, borderLeft: `2px solid ${getCategoryColor(event.category)}` }}
                        >
                          {event.title}
                        </div>
                      ))
                    ) : null}
                    
                    {dayEvents.length > 3 && (
                      <div className="text-xs text-center text-muted-foreground">
                        +{dayEvents.length - 3} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
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
                      {EVENT_CATEGORIES.find(cat => cat.id === event.category)?.name || 'Categoria'}
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
