
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { dia: '01/06', producao: 2450 },
  { dia: '02/06', producao: 2300 },
  { dia: '03/06', producao: 2800 },
  { dia: '04/06', producao: 2750 },
  { dia: '05/06', producao: 3100 },
  { dia: '06/06', producao: 2950 },
  { dia: '07/06', producao: 3200 },
];

const ManufacturingDashboard = () => {
  return (
    <ModuleContainer requiredSegment="manufacturing">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Manufatura</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Produção Diária</CardTitle>
              <CardDescription>Unidades produzidas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3.245</div>
              <p className="text-xs text-muted-foreground">+8% acima da meta</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Qualidade</CardTitle>
              <CardDescription>Taxa de aprovação</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">98,7%</div>
              <p className="text-xs text-muted-foreground">+1,2% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Eficiência</CardTitle>
              <CardDescription>Índice geral</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">92,5%</div>
              <p className="text-xs text-muted-foreground">+0,8% em relação à semana anterior</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Produção Semanal</CardTitle>
            <CardDescription>Últimos 7 dias (unidades)</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="producao" name="Unidades produzidas" stroke="#475569" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Linhas de Produção</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Linha A</p>
                    <p className="text-sm text-muted-foreground">Produto: Motor Elétrico</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Operacional</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Linha B</p>
                    <p className="text-sm text-muted-foreground">Produto: Painel Eletrônico</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Operacional</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Linha C</p>
                    <p className="text-sm text-muted-foreground">Produto: Conjunto Mecânico</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">Manutenção</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Linha D</p>
                    <p className="text-sm text-muted-foreground">Produto: Componente de precisão</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Operacional</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Ordens de Produção</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">OP#78952</p>
                    <p className="text-sm text-muted-foreground">Motor Elétrico - 500 unidades</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">80% concluído</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">OP#78953</p>
                    <p className="text-sm text-muted-foreground">Painel Eletrônico - 750 unidades</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">95% concluído</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">OP#78954</p>
                    <p className="text-sm text-muted-foreground">Conjunto Mecânico - 300 unidades</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">45% concluído</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">OP#78955</p>
                    <p className="text-sm text-muted-foreground">Componente de precisão - 1000 unidades</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">30% concluído</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default ManufacturingDashboard;
