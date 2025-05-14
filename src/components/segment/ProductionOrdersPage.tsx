
import React, { useState, useEffect } from 'react';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { useSegment } from '@/contexts/SegmentContext';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardFooter
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar, ClipboardList, Truck, BarChart, FileText, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Types
interface ProductionOrder {
  id: string;
  orderNumber: string;
  productName: string;
  quantity: number;
  startDate: string;
  endDate: string;
  status: 'planejada' | 'em_producao' | 'finalizada' | 'cancelada';
  priority: 'baixa' | 'media' | 'alta' | 'urgente';
  notes?: string;
  createdAt: string;
}

// Schema for form validation
const formSchema = z.object({
  productName: z.string().min(2, {
    message: "O nome do produto deve ter pelo menos 2 caracteres.",
  }),
  quantity: z.number().min(1, {
    message: "A quantidade deve ser pelo menos 1.",
  }),
  startDate: z.string().min(1, {
    message: "Data de início é obrigatória.",
  }),
  endDate: z.string().min(1, {
    message: "Data de término é obrigatória.",
  }),
  status: z.enum(['planejada', 'em_producao', 'finalizada', 'cancelada']),
  priority: z.enum(['baixa', 'media', 'alta', 'urgente']),
  notes: z.string().optional(),
});

// Mock data service
const mockProductionOrders: ProductionOrder[] = [
  {
    id: '1',
    orderNumber: 'OP-2025-001',
    productName: 'Mesa de escritório',
    quantity: 10,
    startDate: '2025-05-15',
    endDate: '2025-05-30',
    status: 'em_producao',
    priority: 'media',
    notes: 'Cliente precisa de entrega no dia.',
    createdAt: '2025-05-10',
  },
  {
    id: '2',
    orderNumber: 'OP-2025-002',
    productName: 'Cadeira ergonômica',
    quantity: 25,
    startDate: '2025-05-20',
    endDate: '2025-06-05',
    status: 'planejada',
    priority: 'alta',
    notes: 'Verificar estoque de materiais.',
    createdAt: '2025-05-12',
  },
  {
    id: '3',
    orderNumber: 'OP-2025-003',
    productName: 'Armário modular',
    quantity: 5,
    startDate: '2025-05-10',
    endDate: '2025-05-25',
    status: 'finalizada',
    priority: 'media',
    createdAt: '2025-05-05',
  },
];

// Component for the Production Orders page
const ProductionOrdersPage = () => {
  const { segmentName } = useSegment();
  const [orders, setOrders] = useState<ProductionOrder[]>(mockProductionOrders);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTab, setCurrentTab] = useState('todas');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Stats calculation
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'finalizada').length;
  const inProductionOrders = orders.filter(order => order.status === 'em_producao').length;
  const plannedOrders = orders.filter(order => order.status === 'planejada').length;
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      quantity: 1,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      status: 'planejada',
      priority: 'media',
      notes: "",
    },
  });
  
  // Filter orders based on current tab and search term
  const filteredOrders = orders.filter(order => {
    const matchesTab = currentTab === 'todas' || order.status === currentTab;
    const matchesSearch = order.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Create new order
    const newOrder: ProductionOrder = {
      id: Date.now().toString(),
      orderNumber: `OP-2025-${(orders.length + 1).toString().padStart(3, '0')}`,
      productName: values.productName,
      quantity: values.quantity,
      startDate: values.startDate,
      endDate: values.endDate,
      status: values.status,
      priority: values.priority,
      notes: values.notes,
      createdAt: new Date().toISOString(),
    };
    
    setOrders([...orders, newOrder]);
    setOpenDialog(false);
    
    toast({
      title: "Ordem de produção criada",
      description: `Ordem ${newOrder.orderNumber} foi criada com sucesso.`,
    });
    
    form.reset();
  };
  
  // Function to get status badge style
  const getStatusBadge = (status: ProductionOrder['status']) => {
    switch (status) {
      case 'planejada':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'em_producao':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'finalizada':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'cancelada':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };
  
  // Function to get priority badge style
  const getPriorityBadge = (priority: ProductionOrder['priority']) => {
    switch (priority) {
      case 'baixa':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
      case 'media':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'alta':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'urgente':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };
  
  return (
    <SegmentPageLayout
      title="Ordens de Produção"
      description={`Gerenciamento de ordens de produção para o segmento de ${segmentName}`}
      action={
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <ClipboardList className="mr-2 h-4 w-4" />
              Nova Ordem de Produção
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Criar Nova Ordem de Produção</DialogTitle>
              <DialogDescription>
                Preencha os campos abaixo para criar uma nova ordem de produção.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome do Produto</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do produto" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quantidade</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min={1} 
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Início</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data de Término</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="planejada">Planejada</SelectItem>
                            <SelectItem value="em_producao">Em Produção</SelectItem>
                            <SelectItem value="finalizada">Finalizada</SelectItem>
                            <SelectItem value="cancelada">Cancelada</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="priority"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prioridade</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Prioridade" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="baixa">Baixa</SelectItem>
                            <SelectItem value="media">Média</SelectItem>
                            <SelectItem value="alta">Alta</SelectItem>
                            <SelectItem value="urgente">Urgente</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Observações</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Observações adicionais sobre a ordem" 
                          className="resize-none" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Criar Ordem de Produção</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      }
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-blue-100 text-blue-600 p-3 mb-2">
                <ClipboardList size={24} />
              </div>
              <h3 className="text-2xl font-bold">{totalOrders}</h3>
              <p className="text-sm text-muted-foreground">Total de Ordens</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-green-100 text-green-600 p-3 mb-2">
                <Package size={24} />
              </div>
              <h3 className="text-2xl font-bold">{completedOrders}</h3>
              <p className="text-sm text-muted-foreground">Ordens Finalizadas</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-yellow-100 text-yellow-600 p-3 mb-2">
                <FileText size={24} />
              </div>
              <h3 className="text-2xl font-bold">{inProductionOrders}</h3>
              <p className="text-sm text-muted-foreground">Em Produção</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-purple-100 text-purple-600 p-3 mb-2">
                <Calendar size={24} />
              </div>
              <h3 className="text-2xl font-bold">{plannedOrders}</h3>
              <p className="text-sm text-muted-foreground">Ordens Planejadas</p>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <CardTitle>Lista de Ordens de Produção</CardTitle>
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Pesquisar ordens..." 
                className="max-w-xs" 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select onValueChange={(value) => setCurrentTab(value)} defaultValue="todas">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filtrar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas</SelectItem>
                  <SelectItem value="planejada">Planejadas</SelectItem>
                  <SelectItem value="em_producao">Em Produção</SelectItem>
                  <SelectItem value="finalizada">Finalizadas</SelectItem>
                  <SelectItem value="cancelada">Canceladas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ordem #</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Qtd.</TableHead>
                  <TableHead className="hidden md:table-cell">Data Início</TableHead>
                  <TableHead className="hidden md:table-cell">Data Término</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Prioridade</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.orderNumber}</TableCell>
                      <TableCell>{order.productName}</TableCell>
                      <TableCell>{order.quantity}</TableCell>
                      <TableCell className="hidden md:table-cell">{new Date(order.startDate).toLocaleDateString()}</TableCell>
                      <TableCell className="hidden md:table-cell">{new Date(order.endDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(order.status)}`}>
                          {order.status === 'planejada' ? 'Planejada' : 
                           order.status === 'em_producao' ? 'Em Produção' : 
                           order.status === 'finalizada' ? 'Finalizada' : 'Cancelada'}
                        </span>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(order.priority)}`}>
                          {order.priority === 'baixa' ? 'Baixa' : 
                           order.priority === 'media' ? 'Média' : 
                           order.priority === 'alta' ? 'Alta' : 'Urgente'}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Detalhes
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      Nenhuma ordem de produção encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </SegmentPageLayout>
  );
};

export default ProductionOrdersPage;
