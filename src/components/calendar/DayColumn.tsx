
import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { isToday, isBefore, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { DayColumnProps } from './types';
import { getCategoryColor, formatDuration } from './utils';

const DayColumn: React.FC<DayColumnProps> = ({ day, events, onEventClick, view }) => {
  const isCurrentDay = isToday(day);
  const isPastDay = isBefore(day, new Date()) && !isToday(day);
  
  const formatDayHeader = (day: Date): string => {
    if (view === 'week') {
      return format(day, 'EEEE, dd', { locale: ptBR });
    } else if (view === 'day') {
      return format(day, 'EEEE, dd MMMM', { locale: ptBR });
    }
    return '';
  };
  
  return (
    <div 
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
        {events.map(event => (
          <div 
            key={event.id}
            className="rounded-md p-2 cursor-pointer hover:opacity-90 transition-opacity"
            style={{ backgroundColor: `${getCategoryColor(event.category)}20`, borderLeft: `3px solid ${getCategoryColor(event.category)}` }}
            onClick={() => onEventClick(event)}
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

export default DayColumn;
