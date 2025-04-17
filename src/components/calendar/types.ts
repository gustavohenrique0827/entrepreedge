
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

// Adding missing types
export interface Category {
  id: string;
  name: string;
  color: string;
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
  setNewEvent: (event: EventFormData) => void;
  handleCreateEvent: () => void;
  categories: Category[];
}

export interface SidebarComponentProps {
  events: Event[];
  categories: Category[];
  onEventClick?: (event: Event) => void;
}
