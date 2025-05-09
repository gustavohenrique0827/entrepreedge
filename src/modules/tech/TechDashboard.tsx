
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { nome: 'Desenvolvimento', horas: 450 },
  { nome: 'Design', horas: 280 },
  { nome: 'QA', horas: 180 },
  { nome: 'DevOps', horas: 210 },
  { nome: 'Suporte', horas: 320 },
];

const TechDashboard = () => {
  return (
    <ModuleContainer requiredSegment="tech">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Tecnologia</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Projetos Ativos</CardTitle>
              <CardDescription>Em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">3 em fase crítica</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Bugs Abertos</CardTitle>
              <CardDescription>Pendentes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">5 de alta prioridade</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Deployments</CardTitle>
              <CardDescription>Este mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">36</div>
              <p className="text-xs text-muted-foreground">98% bem sucedidos</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Horas por Departamento</CardTitle>
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
                  <Bar dataKey="horas" name="Horas Trabalhadas" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Projetos em Destaque</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Sistema ERP</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa ABC</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">75% concluído</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Aplicativo Mobile</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa XYZ</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">60% concluído</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Portal de Vendas</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa DEF</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">90% concluído</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Integração de APIs</p>
                    <p className="text-sm text-muted-foreground">Cliente: Empresa GHI</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">40% concluído</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Métricas de Desempenho</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Velocidade da Equipe</p>
                    <p className="text-sm text-muted-foreground">Pontos concluídos por sprint</p>
                  </div>
                  <span className="font-medium">85 pontos</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Tempo Médio de Resolução</p>
                    <p className="text-sm text-muted-foreground">Bugs de alta prioridade</p>
                  </div>
                  <span className="font-medium">1.5 dias</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Cobertura de Testes</p>
                    <p className="text-sm text-muted-foreground">Média dos projetos</p>
                  </div>
                  <span className="font-medium">78%</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Tempo de Build</p>
                    <p className="text-sm text-muted-foreground">Pipeline de CI/CD</p>
                  </div>
                  <span className="font-medium">4.2 min</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default TechDashboard;
