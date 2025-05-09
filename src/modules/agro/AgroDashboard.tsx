
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { mes: 'Jan', producao: 280 },
  { mes: 'Fev', producao: 300 },
  { mes: 'Mar', producao: 380 },
  { mes: 'Abr', producao: 420 },
  { mes: 'Mai', producao: 450 },
  { mes: 'Jun', producao: 470 },
];

const AgroDashboard = () => {
  return (
    <ModuleContainer requiredSegment="agro">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Agronegócio</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Produção</CardTitle>
              <CardDescription>Total do mês (ton)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">450</div>
              <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Área Cultivada</CardTitle>
              <CardDescription>Total em hectares</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2.500</div>
              <p className="text-xs text-muted-foreground">75% do total disponível</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Rebanho</CardTitle>
              <CardDescription>Cabeças totais</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">3.845</div>
              <p className="text-xs text-muted-foreground">+120 nascimentos este mês</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Produção Mensal</CardTitle>
            <CardDescription>Em toneladas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mes" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="producao" name="Produção (ton)" stroke="#15803d" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Culturas Ativas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Soja</p>
                    <p className="text-sm text-muted-foreground">1.200 hectares</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Em desenvolvimento</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Milho</p>
                    <p className="text-sm text-muted-foreground">800 hectares</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">Plantio</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Café</p>
                    <p className="text-sm text-muted-foreground">350 hectares</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Colheita</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Cana-de-açúcar</p>
                    <p className="text-sm text-muted-foreground">150 hectares</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Em desenvolvimento</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Maquinário</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Trator John Deere 7230J</p>
                    <p className="text-sm text-muted-foreground">Horas de uso: 3.450</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Operacional</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Colheitadeira Case IH 8250</p>
                    <p className="text-sm text-muted-foreground">Horas de uso: 2.120</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Operacional</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Pulverizador Jacto Uniport 3030</p>
                    <p className="text-sm text-muted-foreground">Horas de uso: 1.840</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">Em manutenção</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Caminhão Mercedes Atego 2426</p>
                    <p className="text-sm text-muted-foreground">Km: 75.340</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Operacional</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default AgroDashboard;
