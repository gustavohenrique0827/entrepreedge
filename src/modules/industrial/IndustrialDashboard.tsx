
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Linha A', producao: 1200 },
  { name: 'Linha B', producao: 1800 },
  { name: 'Linha C', producao: 1400 },
  { name: 'Linha D', producao: 2000 },
  { name: 'Linha E', producao: 980 },
];

const IndustrialDashboard = () => {
  const { currentSegment } = useSegment();

  return (
    <ModuleContainer requiredSegment="industrial">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Industrial</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Produção</CardTitle>
              <CardDescription>Total do dia</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">7.450</div>
              <p className="text-xs text-muted-foreground">+5% em relação à meta</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Eficiência</CardTitle>
              <CardDescription>OEE atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">87%</div>
              <p className="text-xs text-muted-foreground">+2% em relação à semana anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Manutenções</CardTitle>
              <CardDescription>Programadas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Próximas 24 horas</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Produção por Linha</CardTitle>
            <CardDescription>Unidades produzidas hoje</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="producao" name="Unidades" fill="#505F79" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Ordens de Produção</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">OP-2023-0485</p>
                    <p className="text-sm text-muted-foreground">Linha A - 1.500 unidades</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Em execução</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">OP-2023-0486</p>
                    <p className="text-sm text-muted-foreground">Linha C - 2.000 unidades</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Programada</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">OP-2023-0487</p>
                    <p className="text-sm text-muted-foreground">Linha B - 1.800 unidades</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Programada</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">OP-2023-0488</p>
                    <p className="text-sm text-muted-foreground">Linha D - 3.000 unidades</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Programada</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Manutenções Pendentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Máquina ID-345</p>
                    <p className="text-sm text-muted-foreground">Manutenção preventiva</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">Urgente</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Máquina ID-123</p>
                    <p className="text-sm text-muted-foreground">Calibração</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">Programada</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Esteira B</p>
                    <p className="text-sm text-muted-foreground">Revisão de rotina</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">Programada</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Máquina ID-456</p>
                    <p className="text-sm text-muted-foreground">Troca de peças</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">Programada</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default IndustrialDashboard;
