
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', consultas: 65 },
  { name: 'Fev', consultas: 59 },
  { name: 'Mar', consultas: 80 },
  { name: 'Abr', consultas: 81 },
  { name: 'Mai', consultas: 56 },
  { name: 'Jun', consultas: 75 },
];

const SaudeDashboard = () => {
  const { currentSegment } = useSegment();

  return (
    <ModuleContainer requiredSegment="health">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Saúde</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total de Pacientes</CardTitle>
              <CardDescription>Cadastrados no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">745</div>
              <p className="text-xs text-muted-foreground">+12 novos este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Consultas Hoje</CardTitle>
              <CardDescription>Agendadas para hoje</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">3 já realizadas</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Exames Pendentes</CardTitle>
              <CardDescription>Resultados a receber</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">8 com urgência</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Histórico de Consultas</CardTitle>
            <CardDescription>Últimos 6 meses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="consultas" name="Consultas" stroke="#00A3C4" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Consultas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Ana Silva</p>
                    <p className="text-sm text-muted-foreground">Consulta de rotina</p>
                  </div>
                  <span className="text-sm">Hoje, 14:30</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Carlos Ferreira</p>
                    <p className="text-sm text-muted-foreground">Retorno</p>
                  </div>
                  <span className="text-sm">Hoje, 15:45</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Maria Santos</p>
                    <p className="text-sm text-muted-foreground">Exame</p>
                  </div>
                  <span className="text-sm">Hoje, 16:30</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Roberto Almeida</p>
                    <p className="text-sm text-muted-foreground">Primeira consulta</p>
                  </div>
                  <span className="text-sm">Amanhã, 09:15</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Exames Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Hemograma Completo</p>
                    <p className="text-sm text-muted-foreground">Paciente: João Costa</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Concluído</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Raio-X Tórax</p>
                    <p className="text-sm text-muted-foreground">Paciente: Mariana Lima</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Concluído</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Eletrocardiograma</p>
                    <p className="text-sm text-muted-foreground">Paciente: Pedro Santos</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded">Em análise</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Ultrassonografia</p>
                    <p className="text-sm text-muted-foreground">Paciente: Clara Oliveira</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">Agendado</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default SaudeDashboard;
