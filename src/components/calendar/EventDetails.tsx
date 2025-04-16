
import React from 'react';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { 
  Clock, 
  MapPin, 
  Users, 
  Trash2, 
  Edit, 
  MoreHorizontal, 
  Bell, 
  Bookmark 
} from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { EventDetailsProps } from './types';
import { getCategoryColor, formatDuration } from './utils';

const EventDetails: React.FC<EventDetailsProps> = ({ 
  event, 
  onClose, 
  onDelete,
  categories
}) => {
  if (!event) return null;
  
  return (
    <Dialog open={!!event} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: getCategoryColor(event.category) }}
              ></div>
              <DialogTitle>{event.title}</DialogTitle>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="cursor-pointer">
                  <Edit className="mr-2 h-4 w-4" />
                  <span>Editar</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer text-red-600" 
                  onClick={() => onDelete(event.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  <span>Excluir</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <div>
              {format(parseISO(event.startTime), 'EEEE, dd MMMM yyyy', { locale: ptBR })}
              <br />
              {formatDuration(event.startTime, event.endTime)}
            </div>
          </div>
          
          {event.location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{event.location}</span>
            </div>
          )}
          
          {event.description && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium mb-2">Descrição</h3>
              <p className="text-sm text-muted-foreground">{event.description}</p>
            </div>
          )}
          
          {event.participants && event.participants.length > 0 && (
            <div className="border-t pt-4 mt-4">
              <h3 className="text-sm font-medium mb-2">Participantes</h3>
              <div className="space-y-1">
                {event.participants.map((participant, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-xs">
                      {participant.charAt(0)}
                    </div>
                    <span className="text-sm">{participant}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {event.reminder && event.reminder !== 'none' && (
            <div className="border-t pt-4 mt-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4" />
                <span className="text-sm">
                  {event.reminder === '10min' ? '10 minutos antes' : 
                   event.reminder === '30min' ? '30 minutos antes' :
                   event.reminder === '1h' ? '1 hora antes' : '1 dia antes'}
                </span>
              </div>
              <Button variant="outline" size="sm">Editar Lembrete</Button>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose}>Fechar</Button>
            <Button variant="outline">
              <Bookmark className="mr-2 h-4 w-4" />
              Salvar
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetails;
