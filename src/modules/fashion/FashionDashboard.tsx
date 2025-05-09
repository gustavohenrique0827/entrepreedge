
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { nome: 'Vestidos', vendas: 1200 },
  { nome: 'Calças', vendas: 980 },
  { nome: 'Camisetas', vendas: 1450 },
  { nome: 'Casacos', vendas: 750 },
  { nome: 'Acessórios', vendas: 1100 },
];

const FashionDashboard = () => {
  return (
    <ModuleContainer requiredSegment="fashion">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Moda</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vendas</CardTitle>
              <CardDescription>Total do mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R$ 86.450,00</div>
              <p className="text-xs text-muted-foreground">+12% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Produtos Ativos</CardTitle>
              <CardDescription>No catálogo</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">245</div>
              <p className="text-xs text-muted-foreground">35 novos este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Ticket Médio</CardTitle>
              <CardDescription>Valor médio por compra</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R$ 320,50</div>
              <p className="text-xs text-muted-foreground">+5% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Vendas por Categoria</CardTitle>
            <CardDescription>Mês atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="nome" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="vendas" name="Vendas (R$)" fill="#db2777" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Coleções Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Verão 2023</p>
                    <p className="text-sm text-muted-foreground">84 produtos</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Em destaque</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Inverno 2023</p>
                    <p className="text-sm text-muted-foreground">65 produtos</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Pré-venda</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Primavera 2023</p>
                    <p className="text-sm text-muted-foreground">58 produtos</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">Em produção</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Básicos</p>
                    <p className="text-sm text-muted-foreground">38 produtos</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Em destaque</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Top Produtos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Vestido Floral</p>
                    <p className="text-sm text-muted-foreground">Coleção Verão 2023</p>
                  </div>
                  <span className="font-medium">86 vendas</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Calça Wide Leg</p>
                    <p className="text-sm text-muted-foreground">Coleção Básicos</p>
                  </div>
                  <span className="font-medium">74 vendas</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Blusa Cropped</p>
                    <p className="text-sm text-muted-foreground">Coleção Verão 2023</p>
                  </div>
                  <span className="font-medium">68 vendas</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Blazer Oversized</p>
                    <p className="text-sm text-muted-foreground">Coleção Inverno 2023</p>
                  </div>
                  <span className="font-medium">52 vendas</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default FashionDashboard;
