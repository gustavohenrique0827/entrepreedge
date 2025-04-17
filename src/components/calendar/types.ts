
import { ReactNode } from 'react';

export interface Event {
  id: number;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  location?: string;
  category: string;
  participants: string[];
  reminder: string;
}

export interface EventFormData {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  participants: string;
  reminder: string;
}

export interface CalendarViewProps {
  currentDate: Date;
  events: Event[];
  view: 'day' | 'week' | 'month';
  onEventClick: (event: Event) => void;
}

export interface DayColumnProps {
  day: Date;
  events: Event[];
  view: 'day' | 'week';
  onEventClick: (event: Event) => void;
}
