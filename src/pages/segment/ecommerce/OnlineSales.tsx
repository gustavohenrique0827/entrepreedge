
import React, { useState, useEffect } from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { StatsCard } from '@/components/segment/StatsCard';
import { DataTable } from '@/components/segment/DataTable';
import { Button } from '@/components/ui/button';
import { FormLayout } from '@/components/segment/FormLayout';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';
import { DollarSign, ShoppingCart, TrendingUp, Clock, Package, Search, Plus, Eye, Edit, Trash } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

// Dados simulados para as vendas
const salesData = [
  { 
    id: '1001', 
    customer: 'João Silva', 
    date: '2025-05-10', 
    total: 349.99, 
    items: 3, 
    status: 'Finalizado',
    payment: 'Cartão de Crédito' 
  },
  { 
    id: '1002', 
    customer: 'Maria Oliveira', 
    date: '2025-05-11', 
    total: 129.50, 
    items: 1, 
    status: 'Em processamento',
    payment: 'Pix' 
  },
  { 
    id: '1003', 
    customer: 'Carlos Andrade', 
    date: '2025-05-12', 
    total: 457.80, 
    items: 4, 
    status: 'Aguardando pagamento',
    payment: 'Boleto' 
  },
  { 
    id: '1004', 
    customer: 'Ana Beatriz', 
    date: '2025-05-12', 
    total: 89.90, 
    items: 1, 
    status: 'Finalizado',
    payment: 'Pix' 
  },
  { 
    id: '1005', 
    customer: 'Roberto Mendes', 
    date: '2025-05-13', 
    total: 756.30, 
    items: 5, 
    status: 'Enviado',
    payment: 'Cartão de Crédito' 
  }
];

// Definição das colunas para a tabela de vendas
const salesColumns = [
  { accessorKey: 'id', header: 'Pedido #' },
  { accessorKey: 'customer', header: 'Cliente' },
  { accessorKey: 'date', header: 'Data', cell: (info: any) => new Date(info.date).toLocaleDateString('pt-BR') },
  { 
    accessorKey: 'total', 
    header: 'Total', 
    cell: (info: any) => window.currencyFormatter.format(info.total) 
  },
  { accessorKey: 'items', header: 'Itens' },
  { 
    accessorKey: 'status', 
    header: 'Status', 
    cell: (info: any) => {
      const statusClasses = {
        'Finalizado': 'bg-green-100 text-green-800',
        'Em processamento': 'bg-blue-100 text-blue-800',
        'Aguardando pagamento': 'bg-yellow-100 text-yellow-800',
        'Enviado': 'bg-purple-100 text-purple-800',
        'Cancelado': 'bg-red-100 text-red-800'
      };
      const statusClass = statusClasses[info.status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-800';
      return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClass}`}>
          {info.status}
        </span>
      );
    }
  },
  { accessorKey: 'payment', header: 'Pagamento' },
];

interface OrderDetailsProps {
  order: any;
  onClose: () => void;
  onUpdateStatus: (id: string, status: string) => void;
}

const OrderDetails = ({ order, onClose, onUpdateStatus }: OrderDetailsProps) => {
  const [status, setStatus] = useState(order.status);
  
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };
  
  const handleUpdateStatus = () => {
    onUpdateStatus(order.id, status);
    onClose();
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Pedido #</h4>
          <p className="text-lg font-semibold">{order.id}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Data</h4>
          <p className="text-lg">{new Date(order.date).toLocaleDateString('pt-BR')}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Cliente</h4>
          <p className="text-lg">{order.customer}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Pagamento</h4>
          <p className="text-lg">{order.payment}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Total</h4>
          <p className="text-lg font-semibold">{window.currencyFormatter.format(order.total)}</p>
        </div>
        <div>
          <h4 className="text-sm font-medium text-muted-foreground">Itens</h4>
          <p className="text-lg">{order.items}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <label className="text-sm font-medium">Status do Pedido</label>
        <select 
          value={status} 
          onChange={handleStatusChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="Aguardando pagamento">Aguardando pagamento</option>
          <option value="Em processamento">Em processamento</option>
          <option value="Enviado">Enviado</option>
          <option value="Finalizado">Finalizado</option>
          <option value="Cancelado">Cancelado</option>
        </select>
      </div>
      
      <div className="flex justify-end space-x-2 mt-6">
        <Button variant="outline" onClick={onClose}>Cancelar</Button>
        <Button onClick={handleUpdateStatus}>Atualizar Status</Button>
      </div>
    </div>
  );
};

export default function OnlineSales() {
  const { segmentName } = useSegment();
  const [orders, setOrders] = useState(salesData);
  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);
  
  // Estatísticas baseadas nos dados de vendas
  const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter(order => order.status === 'Finalizado').length;
  const pendingOrders = orders.filter(order => order.status === 'Aguardando pagamento').length;
  const processingOrders = orders.filter(order => order.status === 'Em processamento' || order.status === 'Enviado').length;
  
  useEffect(() => {
    if (searchQuery) {
      setFilteredOrders(orders.filter(order => 
        order.id.includes(searchQuery) || 
        order.customer.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    } else {
      setFilteredOrders(orders);
    }
  }, [searchQuery, orders]);
  
  const handleViewOrder = (order: any) => {
    setSelectedOrder(order);
    setIsDialogOpen(true);
  };
  
  const handleUpdateOrderStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: newStatus } : order
    ));
    
    toast({
      title: "Status atualizado",
      description: `O status do pedido #${id} foi alterado para ${newStatus}`,
    });
  };
  
  return (
    <SegmentPageLayout 
      title="Gestão de Vendas Online" 
      description={`Acompanhe e gerencie as vendas online do seu negócio de ${segmentName}`}
      action={
        <div className="flex items-center gap-2">
          <Input 
            placeholder="Buscar pedido ou cliente..." 
            className="w-64" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button>
            <Search className="h-4 w-4 mr-2" />
            Buscar
          </Button>
        </div>
      }
    >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard 
          title="Vendas Totais" 
          value={window.currencyFormatter.format(totalSales)} 
          icon={<DollarSign className="h-4 w-4" />} 
          trend="up" 
          trendValue="12% este mês"
        />
        <StatsCard 
          title="Pedidos Finalizados" 
          value={completedOrders.toString()} 
          icon={<ShoppingCart className="h-4 w-4" />} 
          trend="up" 
          trendValue="5 novos hoje"
        />
        <StatsCard 
          title="Aguardando Pagamento" 
          value={pendingOrders.toString()} 
          icon={<Clock className="h-4 w-4" />} 
          trend="neutral" 
          trendValue="2 expirando hoje"
        />
        <StatsCard 
          title="Em Processamento" 
          value={processingOrders.toString()} 
          icon={<Package className="h-4 w-4" />} 
          trend="down" 
          trendValue="3 menos que ontem"
        />
      </div>
      
      <Tabs defaultValue="all" className="mb-8">
        <TabsList>
          <TabsTrigger value="all">Todos os Pedidos</TabsTrigger>
          <TabsTrigger value="pending">Aguardando Pagamento</TabsTrigger>
          <TabsTrigger value="processing">Em Processamento</TabsTrigger>
          <TabsTrigger value="completed">Finalizados</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-4">
          <DataTable 
            title="Pedidos" 
            data={filteredOrders} 
            columns={salesColumns} 
            onRowClick={handleViewOrder}
            searchable={false}
          />
        </TabsContent>
        
        <TabsContent value="pending" className="mt-4">
          <DataTable 
            title="Pedidos Aguardando Pagamento" 
            data={filteredOrders.filter(order => order.status === 'Aguardando pagamento')} 
            columns={salesColumns} 
            onRowClick={handleViewOrder}
            searchable={false}
          />
        </TabsContent>
        
        <TabsContent value="processing" className="mt-4">
          <DataTable 
            title="Pedidos Em Processamento" 
            data={filteredOrders.filter(order => order.status === 'Em processamento' || order.status === 'Enviado')} 
            columns={salesColumns} 
            onRowClick={handleViewOrder}
            searchable={false}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="mt-4">
          <DataTable 
            title="Pedidos Finalizados" 
            data={filteredOrders.filter(order => order.status === 'Finalizado')} 
            columns={salesColumns} 
            onRowClick={handleViewOrder}
            searchable={false}
          />
        </TabsContent>
      </Tabs>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Pedido #{selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <OrderDetails 
              order={selectedOrder} 
              onClose={() => setIsDialogOpen(false)} 
              onUpdateStatus={handleUpdateOrderStatus}
            />
          )}
        </DialogContent>
      </Dialog>
    </SegmentPageLayout>
  );
}
