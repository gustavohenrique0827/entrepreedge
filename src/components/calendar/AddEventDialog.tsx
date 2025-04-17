
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { format, addDays } from 'date-fns';
import { Category, EventFormData } from './types';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  MapPin, 
  Users, 
  Bell, 
  Repeat, 
  Palette 
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { HexColorPicker } from 'react-colorful';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  event: EventFormData;
  setEvent: (event: EventFormData) => void;
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
  const [isRecurring, setIsRecurring] = React.useState(false);
  const [showColorPicker, setShowColorPicker] = React.useState(false);
  const [eventColor, setEventColor] = React.useState('#3b82f6');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent({ ...event, [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setEvent({ ...event, [name]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar Evento ou Lembrete</DialogTitle>
          <DialogDescription>
            Preencha os detalhes do seu evento ou lembrete. Os campos com * são obrigatórios.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Título*</Label>
            <Input
              id="title"
              name="title"
              value={event.title}
              onChange={handleChange}
              placeholder="Ex: Reunião de Equipe"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              name="description"
              value={event.description}
              onChange={handleChange}
              placeholder="Detalhes sobre o evento..."
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="startTime">Data e hora de início*</Label>
              <div className="relative">
                <Input
                  id="startTime"
                  name="startTime"
                  type="datetime-local"
                  value={event.startTime}
                  onChange={handleChange}
                />
                <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="endTime">Data e hora de término*</Label>
              <div className="relative">
                <Input
                  id="endTime"
                  name="endTime"
                  type="datetime-local"
                  value={event.endTime}
                  onChange={handleChange}
                />
                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">Categoria</Label>
            <Select 
              value={event.category} 
              onValueChange={(value) => handleSelectChange('category', value)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Selecione uma categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
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
            <Label htmlFor="location">Localização</Label>
            <div className="relative">
              <Input
                id="location"
                name="location"
                value={event.location}
                onChange={handleChange}
                placeholder="Ex: Sala de reuniões 3"
              />
              <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="recurring" className="flex-grow">Evento recorrente</Label>
            <Switch 
              id="recurring" 
              checked={isRecurring}
              onCheckedChange={setIsRecurring}
            />
          </div>
          
          {isRecurring && (
            <div className="grid gap-2">
              <Label htmlFor="recurrence">Frequência de repetição</Label>
              <Select 
                defaultValue="weekly"
              >
                <SelectTrigger id="recurrence">
                  <SelectValue placeholder="Selecione a frequência" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diariamente</SelectItem>
                  <SelectItem value="weekly">Semanalmente</SelectItem>
                  <SelectItem value="monthly">Mensalmente</SelectItem>
                  <SelectItem value="yearly">Anualmente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div className="grid gap-2">
            <Label htmlFor="participants">Participantes</Label>
            <div className="relative">
              <Input
                id="participants"
                name="participants"
                value={event.participants}
                onChange={handleChange}
                placeholder="Ex: joão@empresa.com, maria@empresa.com"
              />
              <Users className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <p className="text-xs text-muted-foreground">Separar e-mails por vírgula</p>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="reminder">Lembrete</Label>
            <Select 
              value={event.reminder} 
              onValueChange={(value) => handleSelectChange('reminder', value)}
            >
              <SelectTrigger id="reminder">
                <SelectValue placeholder="Selecione quando ser lembrado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Sem lembrete</SelectItem>
                <SelectItem value="10min">10 minutos antes</SelectItem>
                <SelectItem value="30min">30 minutos antes</SelectItem>
                <SelectItem value="1hour">1 hora antes</SelectItem>
                <SelectItem value="1day">1 dia antes</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label>Cor do evento (opcional)</Label>
            <Popover open={showColorPicker} onOpenChange={setShowColorPicker}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className="flex justify-between items-center w-full"
                >
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: eventColor }}
                    ></div>
                    <span>Selecionar cor</span>
                  </div>
                  <Palette className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-3">
                <HexColorPicker color={eventColor} onChange={setEventColor} />
                <div className="mt-2 flex justify-end">
                  <p className="text-sm text-center">{eventColor}</p>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={onSave}>Salvar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventDialog;
