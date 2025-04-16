
import { format, parseISO, isSameDay, startOfWeek, endOfWeek, addDays } from 'date-fns';
import { Event, Category } from './types';
import { EVENT_CATEGORIES } from './constants';

export const getWeekDays = (date: Date) => {
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

export const getEventsForDay = (events: Event[], day: Date) => {
  return events.filter(event => {
    const eventDate = parseISO(event.startTime);
    return isSameDay(eventDate, day);
  });
};

export const getCategoryColor = (categoryId: string) => {
  const category = EVENT_CATEGORIES.find(cat => cat.id === categoryId);
  return category ? category.color : '#6c757d';
};

export const getTimeFromISO = (isoString: string) => {
  return format(parseISO(isoString), 'HH:mm');
};

export const formatDuration = (startTime: string, endTime: string) => {
  const start = parseISO(startTime);
  const end = parseISO(endTime);
  
  return `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;
};
