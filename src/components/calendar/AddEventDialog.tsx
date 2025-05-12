
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
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EventFormData, Category } from './types';

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  event: EventFormData;
  setEvent: React.Dispatch<React.SetStateAction<EventFormData>>;
  categories: Category[];
}

const AddEventDialog: React.FC<AddEventDialogProps> = ({
  isOpen,
  onClose,
  onSave,
  event,
  setEvent,
  categories
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleToggleChange = (checked: boolean) => {
    setEvent({ ...event, repeat: checked });
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] rounded-md sm:rounded-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Adicionar Lembrete/Evento</DialogTitle>
          <DialogDescription>
            Preencha os detalhes para adicionar um novo lembrete ou evento.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título *</Label>
            <Input 
              id="title" 
              name="title" 
              value={event.title} 
              onChange={handleInputChange} 
              placeholder="Ex: Reunião de Planejamento" 
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea 
              id="description" 
              name="description" 
              value={event.description} 
              onChange={handleInputChange} 
              placeholder="Detalhes do evento" 
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Início *</Label>
              <Input 
                id="startTime" 
                name="startTime" 
                type="datetime-local" 
                value={event.startTime} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="endTime">Término *</Label>
              <Input 
                id="endTime" 
                name="endTime" 
                type="datetime-local" 
                value={event.endTime} 
                onChange={handleInputChange} 
              />
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="location">Local</Label>
            <Input 
              id="location" 
              name="location" 
              value={event.location} 
              onChange={handleInputChange} 
              placeholder="Ex: Sala de Reuniões" 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">Categoria / Cor</Label>
              <Select 
                name="category" 
                value={event.category} 
                onValueChange={(value) => setEvent({...event, category: value})}
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
                value={event.reminder} 
                onValueChange={(value) => setEvent({...event, reminder: value})}
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
          
          <div className="flex items-center justify-between space-x-2 pt-2">
            <Label htmlFor="repeat" className="font-medium">Repetir evento</Label>
            <Switch 
              id="repeat" 
              checked={event.repeat || false}
              onCheckedChange={handleToggleChange}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="participants">Participantes</Label>
            <Textarea 
              id="participants" 
              name="participants" 
              value={event.participants} 
              onChange={handleInputChange} 
              placeholder="Nome dos participantes, separados por vírgula" 
              rows={2}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button onClick={onSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
