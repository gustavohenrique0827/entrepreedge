
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Plus, Search, Mail, Phone } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Customers = () => {
  // Sample customers data
  const customers = [
    { id: 1, name: 'João Silva', email: 'joao.silva@example.com', phone: '(11) 98765-4321', orders: 5, totalSpent: 1249.95, lastPurchase: '2023-10-28' },
    { id: 2, name: 'Maria Oliveira', email: 'maria.oliveira@example.com', phone: '(21) 97654-3210', orders: 3, totalSpent: 3689.97, lastPurchase: '2023-11-02' },
    { id: 3, name: 'Pedro Santos', email: 'pedro.santos@example.com', phone: '(31) 96543-2109', orders: 2, totalSpent: 459.98, lastPurchase: '2023-10-15' },
    { id: 4, name: 'Ana Costa', email: 'ana.costa@example.com', phone: '(41) 95432-1098', orders: 7, totalSpent: 2329.93, lastPurchase: '2023-11-01' },
    { id: 5, name: 'Lucas Mendes', email: 'lucas.mendes@example.com', phone: '(51) 94321-0987', orders: 1, totalSpent: 199.99, lastPurchase: '2023-09-22' }
  ];

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('pt-BR', options);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Clientes"
        description="Gerencie e analise os clientes da sua loja"
        actions={
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Novo Cliente
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total de clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground mt-1">+24 novos este mês</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taxa de retenção</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.2%</div>
            <p className="text-xs text-muted-foreground mt-1">+2.4% em relação ao mês anterior</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Valor médio por cliente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 785,60</div>
            <p className="text-xs text-muted-foreground mt-1">Baseado nas compras dos últimos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader className="pb-2">
          <CardTitle>Busca e Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Buscar por nome, email ou telefone..." className="pl-8" />
            </div>
            <Button variant="outline" className="sm:w-[120px]">
              Filtrar
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" /> 
            <span>Lista de Clientes</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 text-left">Cliente</th>
                  <th className="py-3 px-4 text-left">Contato</th>
                  <th className="py-3 px-4 text-center">Pedidos</th>
                  <th className="py-3 px-4 text-right">Total gasto</th>
                  <th className="py-3 px-4 text-center">Última compra</th>
                  <th className="py-3 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody>
                {customers.map(customer => (
                  <tr key={customer.id} className="border-b">
                    <td className="py-3 px-4 text-left">
                      <div className="flex items-center space-x-3">
                        <Avatar>
                          <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{customer.name}</div>
                          <div className="text-sm text-muted-foreground">Cliente desde {formatDate(customer.lastPurchase)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-left">
                      <div className="flex flex-col space-y-1">
                        <div className="flex items-center text-sm">
                          <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          {customer.email}
                        </div>
                        <div className="flex items-center text-sm">
                          <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                          {customer.phone}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">{customer.orders}</td>
                    <td className="py-3 px-4 text-right">R$ {customer.totalSpent.toFixed(2)}</td>
                    <td className="py-3 px-4 text-center">{formatDate(customer.lastPurchase)}</td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm">Ver perfil</Button>
                        <Button variant="ghost" size="sm">Histórico</Button>
                      </div>
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

export default Customers;
