
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { tipo: 'Civil', processos: 42 },
  { tipo: 'Trabalhista', processos: 28 },
  { tipo: 'Tributário', processos: 15 },
  { tipo: 'Empresarial', processos: 23 },
  { tipo: 'Imobiliário', processos: 18 },
];

const LegalDashboard = () => {
  return (
    <ModuleContainer requiredSegment="legal">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard Jurídico</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Processos Ativos</CardTitle>
              <CardDescription>Total em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">126</div>
              <p className="text-xs text-muted-foreground">+8 novos este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Audiências</CardTitle>
              <CardDescription>Programadas este mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">38</div>
              <p className="text-xs text-muted-foreground">12 já realizadas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Contratos</CardTitle>
              <CardDescription>Pendentes de revisão</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">14</div>
              <p className="text-xs text-muted-foreground">3 com prazo crítico</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Processos por Tipo</CardTitle>
            <CardDescription>Distribuição atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="tipo" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="processos" name="Número de Processos" fill="#0f172a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Audiências</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Processo nº 0001234-56.2023.8.26.0100</p>
                    <p className="text-sm text-muted-foreground">Vara: 2ª Cível - São Paulo</p>
                  </div>
                  <span className="text-sm">Hoje, 14:00</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Processo nº 0001235-56.2023.8.26.0100</p>
                    <p className="text-sm text-muted-foreground">Vara: 5ª Trabalhista - São Paulo</p>
                  </div>
                  <span className="text-sm">Amanhã, 10:30</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Processo nº 0001236-56.2023.8.26.0100</p>
                    <p className="text-sm text-muted-foreground">Vara: 1ª Cível - Campinas</p>
                  </div>
                  <span className="text-sm">15/06, 09:00</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Processo nº 0001237-56.2023.8.26.0100</p>
                    <p className="text-sm text-muted-foreground">Vara: 3ª Tributária - São Paulo</p>
                  </div>
                  <span className="text-sm">17/06, 15:45</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Prazos Críticos</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Recurso - Processo nº 0001238-56.2023</p>
                    <p className="text-sm text-muted-foreground">Responsável: Dr. João Silva</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">Hoje</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Contestação - Processo nº 0001239-56.2023</p>
                    <p className="text-sm text-muted-foreground">Responsável: Dra. Maria Santos</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded">Amanhã</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Embargos - Processo nº 0001240-56.2023</p>
                    <p className="text-sm text-muted-foreground">Responsável: Dr. Pedro Lima</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">3 dias</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Agravo - Processo nº 0001241-56.2023</p>
                    <p className="text-sm text-muted-foreground">Responsável: Dra. Ana Carvalho</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">5 dias</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default LegalDashboard;
