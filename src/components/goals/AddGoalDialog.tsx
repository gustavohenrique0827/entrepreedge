
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Goal } from '@/pages/Goals';
import { CalendarIcon, Target, Plus } from 'lucide-react';
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface AddGoalDialogProps {
  onAddGoal: (goal: Goal) => void;
}

// Create a local Goal type that matches the one in Goals.tsx
interface GoalType {
  id: string;
  title: string;
  description: string;
  targetValue: number;
  currentValue: number;
  dueDate: string;
  category: string;
  status: "em andamento" | "concluída" | "atrasada";
  priority: string;
  createdAt: string;
}

const AddGoalDialog: React.FC<AddGoalDialogProps> = ({ onAddGoal }) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [targetValue, setTargetValue] = React.useState('');
  const [dueDate, setDueDate] = React.useState<Date | undefined>(undefined);
  const [category, setCategory] = React.useState('Vendas');
  const [priority, setPriority] = React.useState('Média');

  const formatDate = (date: Date | undefined) => {
    if (!date) return '';
    return format(date, 'yyyy-MM-dd');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!title || !targetValue || !dueDate) {
      toast({
        title: "Erro ao adicionar meta",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new goal object
    const newGoal: GoalType = {
      id: Date.now().toString(),
      title,
      description,
      targetValue: Number(targetValue),
      currentValue: 0,
      dueDate: formatDate(dueDate),
      category,
      status: "em andamento",
      priority,
      createdAt: new Date().toISOString().split('T')[0],
    };
    
    // Pass the new goal to the parent component
    onAddGoal(newGoal as Goal);
    
    // Reset form and close dialog
    setTitle('');
    setDescription('');
    setTargetValue('');
    setDueDate(undefined);
    setCategory('Vendas');
    setPriority('Média');
    setOpen(false);
    
    toast({
      title: "Meta adicionada com sucesso!",
      description: "Sua nova meta foi adicionada ao sistema.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2">
          <Plus size={16} />
          Nova meta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target size={18} className="text-primary" />
            Adicionar nova meta
          </DialogTitle>
          <DialogDescription>
            Crie uma nova meta SMART para a sua empresa.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Título da meta *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Aumentar vendas mensais"
              className="focus-visible:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descreva a meta com detalhes"
              className="focus-visible:ring-primary"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetValue">Valor alvo *</Label>
              <Input
                id="targetValue"
                type="number"
                value={targetValue}
                onChange={(e) => setTargetValue(e.target.value)}
                placeholder="Ex: 15000"
                className="focus-visible:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="priority">Prioridade</Label>
              <Select value={priority} onValueChange={setPriority}>
                <SelectTrigger className="focus-visible:ring-primary">
                  <SelectValue placeholder="Selecione uma prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Baixa">Baixa</SelectItem>
                  <SelectItem value="Média">Média</SelectItem>
                  <SelectItem value="Alta">Alta</SelectItem>
                  <SelectItem value="Urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="dueDate">Data limite *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal focus-visible:ring-primary",
                      !dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, 'dd/MM/yyyy', { locale: ptBR }) : "Selecione uma data"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    initialFocus
                    locale={ptBR}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Categoria *</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="focus-visible:ring-primary">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vendas">Vendas</SelectItem>
                  <SelectItem value="Finanças">Finanças</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="RH">RH</SelectItem>
                  <SelectItem value="Operações">Operações</SelectItem>
                  <SelectItem value="Educação">Educação</SelectItem>
                  <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="Inovação">Inovação</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="mr-2">
              Cancelar
            </Button>
            <Button type="submit" className="bg-primary hover:bg-primary/90">Adicionar meta</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalDialog;
