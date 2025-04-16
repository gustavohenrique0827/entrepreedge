
import { ReactNode } from 'react';

export interface Event {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  category: string;
  participants: string[];
  reminder: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
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

export interface DayColumnProps {
  day: Date;
  events: Event[];
  onEventClick: (event: Event) => void;
  view: 'day' | 'week';
}

export interface CalendarViewProps {
  currentDate: Date;
  events: Event[];
  view: 'day' | 'week';
  onEventClick: (event: Event) => void;
}

export interface CalendarHeaderProps {
  currentDate: Date;
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  setCurrentDate: (date: Date) => void;
  view: 'day' | 'week';
  setView: (view: 'day' | 'week') => void;
  onNewEvent: () => void;
}

export interface EventDetailsProps {
  event: Event | null;
  onClose: () => void;
  onDelete: (id: number) => void;
  categories: Category[];
}

export interface EventFormProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  newEvent: EventFormData;
  setNewEvent: (newEvent: EventFormData) => void;
  handleCreateEvent: () => void;
  categories: Category[];
}

export interface SidebarComponentProps {
  events: Event[];
  categories: Category[];
  onEventClick: (event: Event) => void;
}
