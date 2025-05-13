
import React, { useState } from 'react';
import { SegmentPageLayout } from '@/components/segment/SegmentPageLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSegment } from '@/contexts/SegmentContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { 
  BarChart, 
  LineChart, 
  ShoppingCart, 
  FileText, 
  Package, 
  Users, 
  ArrowUpRight, 
  ArrowDownRight, 
  Banknote,
  Clock
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { DataTable } from '@/components/segment/DataTable';

// Demo data
const salesData = [
  { date: '2023-01', revenue: 4000, orders: 240, avg: 166.67 },
  { date: '2023-02', revenue: 4500, orders: 250, avg: 180.00 },
  { date: '2023-03', revenue: 5100, orders: 270, avg: 188.89 },
  { date: '2023-04', revenue: 4800, orders: 280, avg: 171.43 },
  { date: '2023-05', revenue: 6000, orders: 300, avg: 200.00 },
  { date: '2023-06', revenue: 7000, orders: 340, avg: 205.88 },
  { date: '2023-07', revenue: 8500, orders: 380, avg: 223.68 },
  { date: '2023-08', revenue: 9000, orders: 400, avg: 225.00 },
  { date: '2023-09', revenue: 8000, orders: 390, avg: 205.13 },
  { date: '2023-10', revenue: 9500, orders: 410, avg: 231.71 },
  { date: '2023-11', revenue: 11000, orders: 450, avg: 244.44 },
  { date: '2023-12', revenue: 15000, orders: 520, avg: 288.46 },
];

const recentOrders = [
  { id: 'ORD-1001', customer: 'João Silva', date: '2023-12-15 14:30', total: 159.90, status: 'Entregue' },
  { id: 'ORD-1002', customer: 'Maria Oliveira', date: '2023-12-15 15:45', total: 349.50, status: 'Processando' },
  { id: 'ORD-1003', customer: 'Carlos Santos', date: '2023-12-14 10:20', total: 89.90, status: 'Enviado' },
  { id: 'ORD-1004', customer: 'Ana Beatriz', date: '2023-12-14 09:15', total: 219.80, status: 'Enviado' },
  { id: 'ORD-1005', customer: 'Lucas Mendes', date: '2023-12-13 16:50', total: 499.99, status: 'Entregue' },
  { id: 'ORD-1006', customer: 'Paula Costa', date: '2023-12-13 11:30', total: 149.90, status: 'Entregue' },
  { id: 'ORD-1007', customer: 'Fernando Alves', date: '2023-12-12 14:20', total: 799.90, status: 'Cancelado' },
  { id: 'ORD-1008', customer: 'Mariana Lima', date: '2023-12-12 10:10', total: 129.90, status: 'Entregue' },
];

const topProducts = [
  { id: 'PROD-001', name: 'Smartphone XYZ', sales: 145, revenue: 72500, inventory: 58 },
  { id: 'PROD-002', name: 'Notebook Ultra', sales: 89, revenue: 111250, inventory: 12 },
  { id: 'PROD-003', name: 'Headphone Pro', sales: 204, revenue: 30600, inventory: 45 },
  { id: 'PROD-004', name: 'Smartwatch', sales: 152, revenue: 22800, inventory: 37 },
  { id: 'PROD-005', name: 'Câmera Digital', sales: 76, revenue: 38000, inventory: 15 },
];

// Status mapping
const statusStyleMap: Record<string, string> = {
  'Entregue': 'bg-green-100 text-green-800 border-green-300',
  'Enviado': 'bg-blue-100 text-blue-800 border-blue-300',
  'Processando': 'bg-yellow-100 text-yellow-800 border-yellow-300',
  'Cancelado': 'bg-red-100 text-red-800 border-red-300',
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
};

export default function OnlineSales() {
  const { segmentName } = useSegment();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Column definitions for the tables
  const ordersColumns = [
    { accessorKey: 'id', header: 'Pedido' },
    { accessorKey: 'customer', header: 'Cliente' },
    { accessorKey: 'date', header: 'Data' },
    { 
      accessorKey: 'total', 
      header: 'Total',
      cell: (info: any) => formatCurrency(info.getValue())
    },
    { 
      accessorKey: 'status', 
      header: 'Status',
      cell: (info: any) => {
        const status = info.getValue();
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyleMap[status] || ''}`}>
            {status}
          </span>
        );
      }
    }
  ];
  
  const productsColumns = [
    { accessorKey: 'name', header: 'Produto' },
    { 
      accessorKey: 'sales', 
      header: 'Vendas',
      cell: (info: any) => info.getValue().toLocaleString('pt-BR')
    },
    { 
      accessorKey: 'revenue', 
      header: 'Receita',
      cell: (info: any) => formatCurrency(info.getValue())
    },
    { accessorKey: 'inventory', header: 'Estoque' }
  ];
  
  return (
    <SegmentPageLayout 
      title="Gestão de Vendas Online"
      description={`Acompanhamento de vendas online para o segmento de ${segmentName}`}
      action={
        <Button>
          <FileText className="mr-2 h-4 w-4" />
          Exportar relatório
        </Button>
      }
    >
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="orders">Pedidos</TabsTrigger>
          <TabsTrigger value="products">Produtos</TabsTrigger>
          <TabsTrigger value="customers">Clientes</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="glass">
              <CardContent className="p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-primary" />
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    <ArrowUpRight className="h-3 w-3 inline mr-1" />
                    +12%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Total de Pedidos</p>
                <h3 className="text-2xl font-bold mt-1">2.340</h3>
                <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardContent className="p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <Banknote className="h-8 w-8 text-primary" />
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    <ArrowUpRight className="h-3 w-3 inline mr-1" />
                    +18%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Receita</p>
                <h3 className="text-2xl font-bold mt-1">R$ 158.900</h3>
                <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardContent className="p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <Package className="h-8 w-8 text-primary" />
                  <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                    <ArrowDownRight className="h-3 w-3 inline mr-1" />
                    -4%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Taxa de Conversão</p>
                <h3 className="text-2xl font-bold mt-1">3.2%</h3>
                <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardContent className="p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    <ArrowUpRight className="h-3 w-3 inline mr-1" />
                    +5%
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">Ticket Médio</p>
                <h3 className="text-2xl font-bold mt-1">R$ 259,50</h3>
                <p className="text-xs text-muted-foreground mt-1">Últimos 30 dias</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Charts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LineChart className="h-5 w-5 mr-2" />
                Performance de Vendas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={salesData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--primary-color)" 
                      fill="var(--primary-color)" 
                      fillOpacity={0.2} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Orders and Top Products */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Pedidos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable 
                  columns={ordersColumns} 
                  data={recentOrders.slice(0, 5)} 
                  searchable={false}
                  onRowClick={(order) => console.log('Order clicked:', order)}
                  emptyMessage="Nenhum pedido recente encontrado."
                />
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" onClick={() => setActiveTab('orders')}>
                    Ver todos os pedidos
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Produtos Mais Vendidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <DataTable 
                  columns={productsColumns} 
                  data={topProducts} 
                  searchable={false}
                  onRowClick={(product) => console.log('Product clicked:', product)}
                  emptyMessage="Nenhum produto encontrado."
                />
                <div className="mt-4 flex justify-center">
                  <Button variant="outline" onClick={() => setActiveTab('products')}>
                    Ver todos os produtos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Todos os Pedidos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={ordersColumns} 
                data={recentOrders} 
                onRowClick={(order) => console.log('Order clicked:', order)}
                emptyMessage="Nenhum pedido encontrado."
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="products">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Produtos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable 
                columns={productsColumns} 
                data={topProducts} 
                onRowClick={(product) => console.log('Product clicked:', product)}
                emptyMessage="Nenhum produto encontrado."
              />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Clientes
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <p>Funcionalidade de gestão de clientes em desenvolvimento.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </SegmentPageLayout>
  );
}
