
import React from 'react';
import { format, addWeeks, subWeeks, addDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChevronLeft, ChevronRight, CalendarIcon, Search, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarHeaderProps } from './types';
import { getWeekDays } from './utils';

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  selectedDate,
  setSelectedDate,
  setCurrentDate,
  view,
  setView,
  onNewEvent
}) => {
  const weekDays = getWeekDays(currentDate);
  
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
  
  return (
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
                if (date) {
                  setSelectedDate(date);
                  setCurrentDate(date);
                }
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
        
        <Button onClick={onNewEvent}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Evento
        </Button>
      </div>
    </div>
  );
};

export default CalendarHeader;
