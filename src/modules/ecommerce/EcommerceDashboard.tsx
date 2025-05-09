
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', vendas: 4200 },
  { name: 'Fev', vendas: 3800 },
  { name: 'Mar', vendas: 5100 },
  { name: 'Abr', vendas: 4700 },
  { name: 'Mai', vendas: 5800 },
  { name: 'Jun', vendas: 6300 },
];

const EcommerceDashboard = () => {
  const { currentSegment } = useSegment();

  return (
    <ModuleContainer requiredSegment="ecommerce">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard de E-commerce</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vendas</CardTitle>
              <CardDescription>Faturamento do mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R$ 58.349,70</div>
              <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pedidos</CardTitle>
              <CardDescription>Total do mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">428</div>
              <p className="text-xs text-muted-foreground">42 aguardando envio</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Conversão</CardTitle>
              <CardDescription>Taxa do mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3,8%</div>
              <p className="text-xs text-muted-foreground">+0,5% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Vendas Mensais</CardTitle>
            <CardDescription>Últimos 6 meses (R$)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="vendas" name="Vendas (R$)" stroke="#f97316" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Produtos Mais Vendidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Smartphone Galaxy S23</p>
                    <p className="text-sm text-muted-foreground">Eletrônicos</p>
                  </div>
                  <span className="font-medium">89 unidades</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Notebook Dell Inspiron</p>
                    <p className="text-sm text-muted-foreground">Eletrônicos</p>
                  </div>
                  <span className="font-medium">64 unidades</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Tênis Nike Air</p>
                    <p className="text-sm text-muted-foreground">Calçados</p>
                  </div>
                  <span className="font-medium">58 unidades</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Smart TV 55"</p>
                    <p className="text-sm text-muted-foreground">Eletrônicos</p>
                  </div>
                  <span className="font-medium">42 unidades</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Últimos Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">#12458 - Fernando Costa</p>
                    <p className="text-sm text-muted-foreground">2 itens - R$ 1.245,00</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Entregue</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">#12457 - Mariana Santos</p>
                    <p className="text-sm text-muted-foreground">1 item - R$ 399,90</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">Em trânsito</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">#12456 - Roberto Alves</p>
                    <p className="text-sm text-muted-foreground">4 itens - R$ 2.789,60</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Processando</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">#12455 - Camila Oliveira</p>
                    <p className="text-sm text-muted-foreground">3 itens - R$ 875,30</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Processando</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default EcommerceDashboard;
