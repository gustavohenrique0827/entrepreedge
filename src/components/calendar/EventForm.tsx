
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventFormProps } from './types';
import { EVENT_CATEGORIES } from './constants';

const EventForm: React.FC<EventFormProps> = ({
  isOpen,
  setIsOpen,
  newEvent,
  setNewEvent,
  handleCreateEvent,
  categories
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Evento</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para criar um novo evento na sua agenda.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título *</Label>
            <Input 
              id="title" 
              name="title" 
              value={newEvent.title} 
              onChange={handleInputChange} 
              placeholder="Ex: Reunião de Planejamento" 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={newEvent.description} 
              onChange={handleInputChange} 
              placeholder="Detalhes do evento" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Início *</Label>
              <Input 
                id="startTime" 
                name="startTime" 
                type="datetime-local" 
                value={newEvent.startTime} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">Término *</Label>
              <Input 
                id="endTime" 
                name="endTime" 
                type="datetime-local" 
                value={newEvent.endTime} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Local</Label>
            <Input 
              id="location" 
              name="location" 
              value={newEvent.location} 
              onChange={handleInputChange} 
              placeholder="Ex: Sala de Reuniões" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria</Label>
              <Select 
                name="category" 
                value={newEvent.category} 
                onValueChange={(value) => setNewEvent({...newEvent, category: value})}
              >
                <SelectTrigger id="category">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: category.color }}
                        ></div>
                        {category.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="reminder">Lembrete</Label>
              <Select 
                name="reminder" 
                value={newEvent.reminder} 
                onValueChange={(value) => setNewEvent({...newEvent, reminder: value})}
              >
                <SelectTrigger id="reminder">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Sem lembrete</SelectItem>
                  <SelectItem value="10min">10 minutos antes</SelectItem>
                  <SelectItem value="30min">30 minutos antes</SelectItem>
                  <SelectItem value="1h">1 hora antes</SelectItem>
                  <SelectItem value="1d">1 dia antes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="participants">Participantes</Label>
            <Textarea 
              id="participants" 
              name="participants" 
              value={newEvent.participants} 
              onChange={handleInputChange} 
              placeholder="Nome dos participantes, separados por vírgula" 
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancelar</Button>
          <Button onClick={handleCreateEvent}>Criar Evento</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EventForm;
