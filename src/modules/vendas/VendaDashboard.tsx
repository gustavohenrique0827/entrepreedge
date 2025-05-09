
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', vendas: 4000 },
  { name: 'Fev', vendas: 3000 },
  { name: 'Mar', vendas: 2000 },
  { name: 'Abr', vendas: 2780 },
  { name: 'Mai', vendas: 1890 },
  { name: 'Jun', vendas: 2390 },
];

const VendaDashboard = () => {
  const { currentSegment } = useSegment();

  return (
    <ModuleContainer requiredSegment="sales">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Vendas</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vendas do Mês</CardTitle>
              <CardDescription>Total de vendas no período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R$ 12.580,00</div>
              <p className="text-xs text-muted-foreground">+15% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Produtos Vendidos</CardTitle>
              <CardDescription>Quantidade total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">186</div>
              <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ticket Médio</CardTitle>
              <CardDescription>Valor médio por venda</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R$ 243,50</div>
              <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Histórico de Vendas</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="vendas" name="Vendas (R$)" fill="#f97316" />
                </BarChart>
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
              <ul className="space-y-2">
                <li className="flex items-center justify-between pb-2 border-b">
                  <span>Produto A</span>
                  <span className="font-medium">35 unidades</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <span>Produto B</span>
                  <span className="font-medium">29 unidades</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <span>Produto C</span>
                  <span className="font-medium">24 unidades</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <span>Produto D</span>
                  <span className="font-medium">18 unidades</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Produto E</span>
                  <span className="font-medium">12 unidades</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Estoque Baixo</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center justify-between pb-2 border-b">
                  <span>Produto X</span>
                  <span className="text-red-500 font-medium">3 unidades</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <span>Produto Y</span>
                  <span className="text-red-500 font-medium">5 unidades</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <span>Produto Z</span>
                  <span className="text-amber-500 font-medium">8 unidades</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <span>Produto W</span>
                  <span className="text-amber-500 font-medium">10 unidades</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Produto V</span>
                  <span className="text-amber-500 font-medium">12 unidades</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default VendaDashboard;
