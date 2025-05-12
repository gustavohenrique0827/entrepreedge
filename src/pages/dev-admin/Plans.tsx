
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Home, BarChart2, Code, Settings, Package, PenTool, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample plan features
const initialPlanFeatures = [
  { id: 'financial', name: 'Módulo Financeiro' },
  { id: 'goals', name: 'Módulo de Metas' },
  { id: 'calendar', name: 'Calendário e Agenda' },
  { id: 'hr', name: 'Departamento Pessoal' },
  { id: 'accounting', name: 'Contabilidade' },
  { id: 'reports', name: 'Relatórios Avançados' },
  { id: 'api', name: 'Acesso à API' },
  { id: 'support', name: 'Suporte Prioritário' },
  { id: 'customization', name: 'Personalização' },
  { id: 'white_label', name: 'White Label' },
];

// Sample plans
const initialPlans = [
  { 
    id: 1, 
    name: 'Básico', 
    code: 'basic',
    price: 89.90, 
    monthlyPrice: 99.90,
    yearlyPrice: 89.90,
    description: 'Ideal para pequenas empresas e profissionais autônomos',
    maxUsers: 3,
    features: {
      financial: true,
      goals: true,
      calendar: true,
      hr: false,
      accounting: false,
      reports: false,
      api: false,
      support: false,
      customization: false,
      white_label: false,
    }
  },
  { 
    id: 2, 
    name: 'Pro', 
    code: 'pro',
    price: 199.90,
    monthlyPrice: 229.90,
    yearlyPrice: 199.90, 
    description: 'Perfeito para empresas em crescimento e equipes médias',
    maxUsers: 10,
    features: {
      financial: true,
      goals: true,
      calendar: true,
      hr: true,
      accounting: true,
      reports: true,
      api: false,
      support: true,
      customization: false,
      white_label: false,
    }
  },
  { 
    id: 3, 
    name: 'Enterprise', 
    code: 'enterprise',
    price: 349.90,
    monthlyPrice: 399.90,
    yearlyPrice: 349.90, 
    description: 'Solução completa para empresas de médio e grande porte',
    maxUsers: 'Ilimitado',
    features: {
      financial: true,
      goals: true,
      calendar: true,
      hr: true,
      accounting: true,
      reports: true,
      api: true,
      support: true,
      customization: true,
      white_label: true,
    }
  }
];

const Plans = () => {
  const [plans, setPlans] = useState(initialPlans);
  const [planFeatures, setPlanFeatures] = useState(initialPlanFeatures);
  const [editingPlanId, setEditingPlanId] = useState<number | null>(null);
  const [currentPlan, setCurrentPlan] = useState<any>(null);
  const { toast } = useToast();

  const handleEditPlan = (plan: any) => {
    setEditingPlanId(plan.id);
    setCurrentPlan({...plan});
  };

  const handleCancelEdit = () => {
    setEditingPlanId(null);
    setCurrentPlan(null);
  };

  const handleSavePlan = () => {
    if (!currentPlan) return;
    
    setPlans(plans.map(plan => 
      plan.id === currentPlan.id ? currentPlan : plan
    ));
    
    setEditingPlanId(null);
    setCurrentPlan(null);
    
    toast({
      title: "Plano atualizado",
      description: `O plano ${currentPlan.name} foi atualizado com sucesso.`,
    });
  };

  const toggleFeature = (featureId: string, checked: boolean) => {
    if (!currentPlan) return;
    
    setCurrentPlan({
      ...currentPlan,
      features: {
        ...currentPlan.features,
        [featureId]: checked
      }
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentPlan) return;
    
    const { name, value } = e.target;
    
    if (name === 'price' || name === 'monthlyPrice' || name === 'yearlyPrice') {
      setCurrentPlan({
        ...currentPlan,
        [name]: parseFloat(value) || 0
      });
    } else {
      setCurrentPlan({
        ...currentPlan,
        [name]: value
      });
    }
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Dev/Admin',
      href: '/dev-admin/plans',
      icon: <Code size={18} />
    },
    {
      name: 'Configurações',
      href: '/settings',
      icon: <Settings size={18} />
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <PageContainer>
          <PageHeader 
            title="Planos do Sistema" 
            description="Gerencie os planos disponíveis para venda"
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Planos Disponíveis</CardTitle>
              <CardDescription>
                Configure os planos e funcionalidades disponíveis em cada nível
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Plano</TableHead>
                    <TableHead>Descrição</TableHead>
                    <TableHead>Preço Mensal</TableHead>
                    <TableHead>Preço Anual</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {plans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">
                        <Badge variant={
                          plan.code === 'enterprise' ? 'default' : 
                          plan.code === 'pro' ? 'secondary' : 'outline'
                        } className="px-2 py-1">
                          {plan.name}
                        </Badge>
                      </TableCell>
                      <TableCell>{plan.description}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plan.monthlyPrice)}
                      </TableCell>
                      <TableCell>
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(plan.yearlyPrice)}
                        <span className="ml-1 text-xs text-green-600">
                          (-{Math.round(100 - (plan.yearlyPrice * 100 / plan.monthlyPrice))}%)
                        </span>
                      </TableCell>
                      <TableCell>{plan.maxUsers}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
                          <PenTool className="h-4 w-4 mr-2" />
                          Editar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {editingPlanId !== null && currentPlan && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Editar Plano: {currentPlan.name}</CardTitle>
                    <CardDescription>
                      Ajuste os detalhes e funcionalidades do plano
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome do Plano</Label>
                          <Input
                            id="name"
                            name="name"
                            value={currentPlan.name}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="code">Código</Label>
                          <Input
                            id="code"
                            name="code"
                            value={currentPlan.code}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Descrição</Label>
                        <Input
                          id="description"
                          name="description"
                          value={currentPlan.description}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="monthlyPrice">Preço Mensal (R$)</Label>
                          <Input
                            id="monthlyPrice"
                            name="monthlyPrice"
                            type="number"
                            step="0.01"
                            value={currentPlan.monthlyPrice}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="yearlyPrice">Preço Anual (R$)</Label>
                          <Input
                            id="yearlyPrice"
                            name="yearlyPrice"
                            type="number"
                            step="0.01"
                            value={currentPlan.yearlyPrice}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxUsers">Usuários Máximos</Label>
                          <Input
                            id="maxUsers"
                            name="maxUsers"
                            value={currentPlan.maxUsers}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <Label>Funcionalidades Incluídas</Label>
                        <div className="grid grid-cols-2 gap-4">
                          {planFeatures.map((feature) => (
                            <div key={feature.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={feature.id}
                                checked={currentPlan.features[feature.id]}
                                onCheckedChange={(checked) => toggleFeature(feature.id, !!checked)}
                              />
                              <Label htmlFor={feature.id} className="font-normal">
                                {feature.name}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={handleCancelEdit}>
                      <X className="h-4 w-4 mr-2" />
                      Cancelar
                    </Button>
                    <Button onClick={handleSavePlan}>
                      <Check className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </CardContent>
            <CardFooter className="border-t pt-6">
              <div className="space-y-4 w-full">
                <h3 className="font-medium">Comparativo de Recursos</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Recurso</TableHead>
                      {plans.map((plan) => (
                        <TableHead key={plan.id}>{plan.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {planFeatures.map((feature) => (
                      <TableRow key={feature.id}>
                        <TableCell>{feature.name}</TableCell>
                        {plans.map((plan) => (
                          <TableCell key={`${plan.id}-${feature.id}`}>
                            {plan.features[feature.id] ? 
                              <Check className="h-4 w-4 text-green-500" /> : 
                              <X className="h-4 w-4 text-red-500" />
                            }
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardFooter>
          </Card>
        </PageContainer>
      </div>
    </div>
  );
};

export default Plans;
