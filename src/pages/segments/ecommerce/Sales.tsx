
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingBag, Download, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Sales = () => {
  // Sample sales data
  const sales = [
    { id: 'ORD-1001', customer: 'João Silva', date: '2023-11-01', items: 3, total: 599.97, status: 'Entregue' },
    { id: 'ORD-1002', customer: 'Maria Oliveira', date: '2023-11-02', items: 1, total: 3499.99, status: 'Em processamento' },
    { id: 'ORD-1003', customer: 'Pedro Santos', date: '2023-11-02', items: 2, total: 339.98, status: 'Enviado' },
    { id: 'ORD-1004', customer: 'Ana Costa', date: '2023-11-03', items: 5, total: 1245.95, status: 'Entregue' },
    { id: 'ORD-1005', customer: 'Lucas Mendes', date: '2023-11-04', items: 2, total: 159.98, status: 'Cancelado' }
  ];

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Gestão de Vendas"
        description="Acompanhe e gerencie todas as vendas da sua loja"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Vendas hoje</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 2.349,90</div>
            <p className="text-xs text-muted-foreground mt-1">+12.5% em relação a ontem</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pedidos pendentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground mt-1">5 aguardando aprovação</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de conversão</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.2%</div>
            <p className="text-xs text-muted-foreground mt-1">+0.8% em relação à semana anterior</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center space-x-2">
            <ShoppingBag className="h-5 w-5" /> 
            <span>Pedidos Recentes</span>
          </CardTitle>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" /> Filtrar
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" /> Exportar
            </Button>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="processing">Em processamento</SelectItem>
                <SelectItem value="shipped">Enviado</SelectItem>
                <SelectItem value="delivered">Entregue</SelectItem>
                <SelectItem value="cancelled">Cancelado</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="7">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Hoje</SelectItem>
                <SelectItem value="7">Últimos 7 dias</SelectItem>
                <SelectItem value="30">Últimos 30 dias</SelectItem>
                <SelectItem value="90">Últimos 3 meses</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Pedido</th>
                  <th className="py-3 px-4 text-left">Cliente</th>
                  <th className="py-3 px-4 text-left">Data</th>
                  <th className="py-3 px-4 text-center">Itens</th>
                  <th className="py-3 px-4 text-right">Total</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {sales.map(sale => (
                  <tr key={sale.id} className="border-b">
                    <td className="py-3 px-4 text-left font-medium">{sale.id}</td>
                    <td className="py-3 px-4 text-left">{sale.customer}</td>
                    <td className="py-3 px-4 text-left">{formatDate(sale.date)}</td>
                    <td className="py-3 px-4 text-center">{sale.items}</td>
                    <td className="py-3 px-4 text-right">R$ {sale.total.toFixed(2)}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={`inline-block px-2 py-1 rounded text-xs ${
                        sale.status === 'Entregue' 
                          ? 'bg-green-100 text-green-800' 
                          : sale.status === 'Enviado' 
                            ? 'bg-blue-100 text-blue-800' 
                            : sale.status === 'Cancelado' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="sm">Detalhes</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </PageContainer>
  );
};

export default Sales;
