
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Jan', faturamento: 42000 },
  { mes: 'Fev', faturamento: 38000 },
  { mes: 'Mar', faturamento: 51000 },
  { mes: 'Abr', faturamento: 47000 },
  { mes: 'Mai', faturamento: 58000 },
  { mes: 'Jun', faturamento: 63000 },
];

const ServicosDashboard = () => {
  return (
    <ModuleContainer requiredSegment="services">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Serviços</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Faturamento</CardTitle>
              <CardDescription>Total do mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">R$ 63.250,00</div>
              <p className="text-xs text-muted-foreground">+9% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Clientes Ativos</CardTitle>
              <CardDescription>Total atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">128</div>
              <p className="text-xs text-muted-foreground">+5 novos este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Serviços</CardTitle>
              <CardDescription>Agendados para hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">18</div>
              <p className="text-xs text-muted-foreground">7 já realizados</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Faturamento Mensal</CardTitle>
            <CardDescription>Últimos 6 meses (R$)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="faturamento" name="Faturamento (R$)" stroke="#4f46e5" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximos Agendamentos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Consultoria Estratégica</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa ABC</p>
                  </div>
                  <span className="text-sm">Hoje, 14:30</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Manutenção de TI</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa XYZ</p>
                  </div>
                  <span className="text-sm">Hoje, 16:00</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Treinamento</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa DEF</p>
                  </div>
                  <span className="text-sm">Amanhã, 09:00</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auditoria</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa GHI</p>
                  </div>
                  <span className="text-sm">Amanhã, 13:30</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Avaliações Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Consultoria Estratégica</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa MNO</p>
                  </div>
                  <div className="flex">
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Manutenção de TI</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa JKL</p>
                  </div>
                  <div className="flex">
                    <span className="text-yellow-500">★★★★☆</span>
                  </div>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Treinamento</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa PQR</p>
                  </div>
                  <div className="flex">
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auditoria</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa STU</p>
                  </div>
                  <div className="flex">
                    <span className="text-yellow-500">★★★★☆</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default ServicosDashboard;
