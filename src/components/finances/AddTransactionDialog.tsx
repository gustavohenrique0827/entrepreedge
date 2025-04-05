
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  ArrowDownCircle, 
  ArrowUpCircle, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  File, 
  ListChecks, 
  Plus, 
  Receipt, 
  Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AddTransactionDialogProps {
  onAddTransaction: (transaction: any) => void;
}

const AddTransactionDialog: React.FC<AddTransactionDialogProps> = ({ onAddTransaction }) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('income');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [category, setCategory] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [notes, setNotes] = useState('');
  const [attachFile, setAttachFile] = useState<File | null>(null);
  
  // Categories based on transaction type
  const incomeCategories = [
    'Vendas', 'Serviços', 'Investimentos', 'Reembolsos', 'Outros'
  ];
  
  const expenseCategories = [
    'Despesas fixas', 'Insumos', 'Serviços', 'Salários', 
    'Marketing', 'Impostos', 'Equipamentos', 'Utilidades', 'Outros'
  ];

  // Payment methods
  const paymentMethods = [
    'Dinheiro', 'Cartão de crédito', 'Cartão de débito', 'Transferência bancária', 
    'PIX', 'Boleto', 'Cheque', 'Outro'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!description || !amount || !date || !category) {
      toast({
        title: "Erro ao adicionar transação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }
    
    // Create new transaction object
    const newTransaction = {
      id: Date.now().toString(),
      description,
      amount: Number(amount),
      date,
      type: transactionType,
      category,
      paymentMethod,
      notes,
      attachmentName: attachFile ? attachFile.name : null,
    };
    
    // Pass the new transaction to the parent component
    onAddTransaction(newTransaction);
    
    // Reset form and close dialog
    resetForm();
    setOpen(false);
    
    toast({
      title: "Transação adicionada com sucesso!",
      description: `${transactionType === 'income' ? 'Receita' : 'Despesa'} registrada no sistema.`,
    });
  };
  
  const resetForm = () => {
    setDescription('');
    setAmount('');
    const today = new Date();
    setDate(today.toISOString().split('T')[0]);
    setCategory('');
    setPaymentMethod('');
    setNotes('');
    setAttachFile(null);
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAttachFile(e.target.files[0]);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={(newOpen) => {
      setOpen(newOpen);
      if (!newOpen) resetForm();
    }}>
      <DialogTrigger asChild>
        <Button size="sm" className="bg-primary hover:bg-primary/90 text-white">
          <Plus size={16} className="mr-2" />
          Nova transação
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Adicionar nova transação</DialogTitle>
          <DialogDescription>
            Registre uma nova transação financeira para sua empresa.
          </DialogDescription>
        </DialogHeader>
        
        <Tabs
          value={transactionType}
          onValueChange={(value) => setTransactionType(value as 'income' | 'expense')}
          className="mt-2"
        >
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger
              value="income"
              className={cn(
                "flex items-center gap-2",
                transactionType === "income" && "data-[state=active]:bg-green-500 data-[state=active]:text-white"
              )}
            >
              <ArrowUpCircle size={16} />
              <span>Receita</span>
            </TabsTrigger>
            <TabsTrigger
              value="expense"
              className={cn(
                "flex items-center gap-2",
                transactionType === "expense" && "data-[state=active]:bg-red-500 data-[state=active]:text-white"
              )}
            >
              <ArrowDownCircle size={16} />
              <span>Despesa</span>
            </TabsTrigger>
          </TabsList>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center text-sm">
                    <File size={14} className="mr-2" />
                    Descrição *
                  </Label>
                  <Input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={`Ex: ${transactionType === 'income' ? 'Venda de produtos' : 'Compra de material'}`}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center text-sm">
                    <DollarSign size={14} className="mr-2" />
                    Valor (R$) *
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <span className="text-gray-500">R$</span>
                    </div>
                    <Input
                      id="amount"
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0,00"
                      className="pl-10"
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center text-sm">
                    <Calendar size={14} className="mr-2" />
                    Data *
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center text-sm">
                    <Tag size={14} className="mr-2" />
                    Categoria *
                  </Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                    <SelectContent>
                      {transactionType === 'income'
                        ? incomeCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))
                        : expenseCategories.map((cat) => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                          ))
                      }
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod" className="flex items-center text-sm">
                    <CreditCard size={14} className="mr-2" />
                    Forma de pagamento
                  </Label>
                  <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                    <SelectTrigger id="paymentMethod">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {paymentMethods.map((method) => (
                        <SelectItem key={method} value={method}>{method}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes" className="flex items-center text-sm">
                  <ListChecks size={14} className="mr-2" />
                  Observações
                </Label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Observações adicionais (opcional)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="attachment" className="flex items-center text-sm">
                  <Receipt size={14} className="mr-2" />
                  Anexar comprovante
                </Label>
                <Input
                  id="attachment"
                  type="file"
                  onChange={handleFileChange}
                  className="cursor-pointer"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Formatos aceitos: PDF, JPG, PNG (máx. 5MB)
                </p>
              </div>
              
              <Separator className="my-4" />
              
              <div className={cn(
                "p-4 rounded-md",
                transactionType === "income" 
                  ? "bg-green-50 border border-green-200" 
                  : "bg-red-50 border border-red-200"
              )}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {transactionType === "income" 
                      ? <ArrowUpCircle size={20} className="mr-2 text-green-500" /> 
                      : <ArrowDownCircle size={20} className="mr-2 text-red-500" />
                    }
                    <span className="font-medium">
                      {transactionType === "income" ? "Receita" : "Despesa"}
                    </span>
                  </div>
                  <div className="text-lg font-bold">
                    R$ {amount || '0,00'}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter className="mt-6">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button 
                type="submit"
                className={transactionType === "income" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"}
              >
                {transactionType === "income" ? "Adicionar receita" : "Adicionar despesa"}
              </Button>
            </DialogFooter>
          </form>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionDialog;
