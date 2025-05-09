
import React from 'react';
import { useSegment } from '@/contexts/SegmentContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ModuleContainer } from '@/modules/ModuleContainer';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { nome: 'Matemática', alunos: 78 },
  { nome: 'Português', alunos: 65 },
  { nome: 'Ciências', alunos: 52 },
  { nome: 'História', alunos: 38 },
  { nome: 'Geografia', alunos: 45 },
  { nome: 'Inglês', alunos: 53 },
];

const EducacaoDashboard = () => {
  const { currentSegment } = useSegment();

  return (
    <ModuleContainer requiredSegment="education">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard de Educação</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total de Alunos</CardTitle>
              <CardDescription>Ativos no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">356</div>
              <p className="text-xs text-muted-foreground">+28 novos este mês</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cursos Ativos</CardTitle>
              <CardDescription>Em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">2 iniciam próxima semana</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Certificados</CardTitle>
              <CardDescription>Emitidos este mês</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">45</div>
              <p className="text-xs text-muted-foreground">+22% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Alunos por Curso</CardTitle>
            <CardDescription>Distribuição atual</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="nome" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="alunos" name="Alunos" fill="#6554C0" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Próximas Turmas</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Introdução à Programação</p>
                    <p className="text-sm text-muted-foreground">20 vagas disponíveis</p>
                  </div>
                  <span className="text-sm">Início em 10/06</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Marketing Digital</p>
                    <p className="text-sm text-muted-foreground">15 vagas disponíveis</p>
                  </div>
                  <span className="text-sm">Início em 15/06</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Gestão de Projetos</p>
                    <p className="text-sm text-muted-foreground">8 vagas disponíveis</p>
                  </div>
                  <span className="text-sm">Início em 22/06</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Excel Avançado</p>
                    <p className="text-sm text-muted-foreground">12 vagas disponíveis</p>
                  </div>
                  <span className="text-sm">Início em 28/06</span>
                </li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Certificados Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Ricardo Soares</p>
                    <p className="text-sm text-muted-foreground">Design UX/UI</p>
                  </div>
                  <span className="text-sm">14/05/2023</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Amanda Moreira</p>
                    <p className="text-sm text-muted-foreground">Contabilidade Básica</p>
                  </div>
                  <span className="text-sm">12/05/2023</span>
                </li>
                <li className="flex items-center justify-between pb-2 border-b">
                  <div>
                    <p className="font-medium">Carlos Oliveira</p>
                    <p className="text-sm text-muted-foreground">Programação em Python</p>
                  </div>
                  <span className="text-sm">10/05/2023</span>
                </li>
                <li className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Juliana Lima</p>
                    <p className="text-sm text-muted-foreground">Marketing Digital</p>
                  </div>
                  <span className="text-sm">08/05/2023</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </ModuleContainer>
  );
};

export default EducacaoDashboard;
