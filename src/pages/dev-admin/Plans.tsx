
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  CreditCard, 
  Users, 
  Database, 
  HardDrive, 
  FileText,
  Settings,
  Copy,
  CheckCircle
} from 'lucide-react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

interface Feature {
  id: number;
  name: string;
  description: string;
  category: 'core' | 'advanced' | 'support';
}

interface PlanFeature {
  featureId: number;
  included: boolean;
  limit?: string | null;
}

interface Plan {
  id: number;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: PlanFeature[];
  isPublic: boolean;
  isDefault: boolean;
  maxUsers: number;
  storage: number;
  color: string;
  badge?: string;
}

const Plans = () => {
  const { toast } = useToast();
  const [isAddFeatureOpen, setIsAddFeatureOpen] = useState(false);
  const [isAddPlanOpen, setIsAddPlanOpen] = useState(false);
  const [isEditPlanOpen, setIsEditPlanOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('plans');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  
  const [features, setFeatures] = useState<Feature[]>([
    { id: 1, name: 'Usuários', description: 'Número de usuários permitidos', category: 'core' },
    { id: 2, name: 'Armazenamento', description: 'Espaço de armazenamento disponível', category: 'core' },
    { id: 3, name: 'Suporte técnico', description: 'Acesso ao suporte técnico', category: 'support' },
    { id: 4, name: 'Relatórios avançados', description: 'Acesso a relatórios avançados e análises', category: 'advanced' },
    { id: 5, name: 'Integrações', description: 'Integrações com sistemas externos', category: 'advanced' },
    { id: 6, name: 'Backup automático', description: 'Backups automáticos dos dados', category: 'core' },
    { id: 7, name: 'API acesso', description: 'Acesso à API do sistema', category: 'advanced' },
    { id: 8, name: 'Personalização branding', description: 'Personalização da marca/logo no sistema', category: 'advanced' },
    { id: 9, name: 'Suporte prioritário', description: 'Acesso prioritário ao suporte', category: 'support' },
    { id: 10, name: 'Implementação assistida', description: 'Ajuda na implementação do sistema', category: 'support' },
  ]);
  
  const [plans, setPlans] = useState<Plan[]>([
    {
      id: 1,
      name: 'Básico',
      description: 'Para pequenas empresas e startups',
      monthlyPrice: 99.90,
      annualPrice: 999.00,
      features: [
        { featureId: 1, included: true, limit: '5' },
        { featureId: 2, included: true, limit: '10 GB' },
        { featureId: 3, included: true, limit: 'Email' },
        { featureId: 4, included: false, limit: null },
        { featureId: 5, included: false, limit: null },
        { featureId: 6, included: true, limit: 'Diário' },
        { featureId: 7, included: false, limit: null },
        { featureId: 8, included: false, limit: null },
        { featureId: 9, included: false, limit: null },
        { featureId: 10, included: false, limit: null },
      ],
      isPublic: true,
      isDefault: true,
      maxUsers: 5,
      storage: 10,
      color: '#8B5CF6'
    },
    {
      id: 2,
      name: 'Pro',
      description: 'Para empresas em crescimento',
      monthlyPrice: 199.90,
      annualPrice: 1999.00,
      features: [
        { featureId: 1, included: true, limit: '20' },
        { featureId: 2, included: true, limit: '50 GB' },
        { featureId: 3, included: true, limit: 'Email e Chat' },
        { featureId: 4, included: true, limit: null },
        { featureId: 5, included: true, limit: '5 integrações' },
        { featureId: 6, included: true, limit: 'Diário' },
        { featureId: 7, included: true, limit: 'Básico' },
        { featureId: 8, included: true, limit: null },
        { featureId: 9, included: false, limit: null },
        { featureId: 10, included: false, limit: null },
      ],
      isPublic: true,
      isDefault: false,
      maxUsers: 20,
      storage: 50,
      color: '#0EA5E9',
      badge: 'Popular'
    },
    {
      id: 3,
      name: 'Enterprise',
      description: 'Para grandes empresas e corporações',
      monthlyPrice: 499.90,
      annualPrice: 4999.00,
      features: [
        { featureId: 1, included: true, limit: 'Ilimitado' },
        { featureId: 2, included: true, limit: '200 GB' },
        { featureId: 3, included: true, limit: 'Email, Chat e Telefone' },
        { featureId: 4, included: true, limit: null },
        { featureId: 5, included: true, limit: 'Ilimitado' },
        { featureId: 6, included: true, limit: 'Horário' },
        { featureId: 7, included: true, limit: 'Avançado' },
        { featureId: 8, included: true, limit: null },
        { featureId: 9, included: true, limit: null },
        { featureId: 10, included: true, limit: null },
      ],
      isPublic: true,
      isDefault: false,
      maxUsers: 999,
      storage: 200,
      color: '#F97316'
    }
  ]);
  
  const [newFeature, setNewFeature] = useState<Omit<Feature, 'id'>>({
    name: '',
    description: '',
    category: 'core'
  });
  
  const [newPlan, setNewPlan] = useState<Omit<Plan, 'id' | 'features'>>({
    name: '',
    description: '',
    monthlyPrice: 0,
    annualPrice: 0,
    isPublic: true,
    isDefault: false,
    maxUsers: 5,
    storage: 10,
    color: '#8B5CF6',
    badge: ''
  });
  
  const handleAddFeature = () => {
    if (!newFeature.name) {
      toast({
        title: "Erro ao adicionar feature",
        description: "Nome da feature é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    const feature: Feature = {
      ...newFeature,
      id: features.length + 1
    };
    
    setFeatures([...features, feature]);
    
    // Also add this feature to all plans (as not included by default)
    const updatedPlans = plans.map(plan => ({
      ...plan,
      features: [...plan.features, { featureId: feature.id, included: false, limit: null }]
    }));
    
    setPlans(updatedPlans);
    setIsAddFeatureOpen(false);
    setNewFeature({
      name: '',
      description: '',
      category: 'core'
    });
    
    toast({
      title: "Feature adicionada",
      description: "A feature foi adicionada com sucesso.",
    });
  };
  
  const handleAddPlan = () => {
    if (!newPlan.name) {
      toast({
        title: "Erro ao adicionar plano",
        description: "Nome do plano é obrigatório.",
        variant: "destructive",
      });
      return;
    }
    
    const plan: Plan = {
      ...newPlan,
      id: plans.length + 1,
      features: features.map(feature => ({
        featureId: feature.id,
        included: false,
        limit: null
      }))
    };
    
    // If this is set as default, remove default from other plans
    if (plan.isDefault) {
      const updatedPlans = plans.map(p => ({
        ...p,
        isDefault: false
      }));
      setPlans([...updatedPlans, plan]);
    } else {
      setPlans([...plans, plan]);
    }
    
    setIsAddPlanOpen(false);
    setNewPlan({
      name: '',
      description: '',
      monthlyPrice: 0,
      annualPrice: 0,
      isPublic: true,
      isDefault: false,
      maxUsers: 5,
      storage: 10,
      color: '#8B5CF6',
      badge: ''
    });
    
    toast({
      title: "Plano adicionado",
      description: "O plano foi adicionado com sucesso.",
    });
  };
  
  const handleEditPlan = (plan: Plan) => {
    setSelectedPlan(plan);
    setIsEditPlanOpen(true);
  };
  
  const handleDeletePlan = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id));
    
    toast({
      title: "Plano removido",
      description: "O plano foi removido com sucesso.",
    });
  };
  
  const handleToggleFeature = (planId: number, featureId: number) => {
    const updatedPlans = plans.map(plan => {
      if (plan.id === planId) {
        const updatedFeatures = plan.features.map(feature => {
          if (feature.featureId === featureId) {
            return { ...feature, included: !feature.included };
          }
          return feature;
        });
        return { ...plan, features: updatedFeatures };
      }
      return plan;
    });
    
    setPlans(updatedPlans);
  };
  
  const handleUpdateFeatureLimit = (planId: number, featureId: number, limit: string) => {
    const updatedPlans = plans.map(plan => {
      if (plan.id === planId) {
        const updatedFeatures = plan.features.map(feature => {
          if (feature.featureId === featureId) {
            return { ...feature, limit };
          }
          return feature;
        });
        return { ...plan, features: updatedFeatures };
      }
      return plan;
    });
    
    setPlans(updatedPlans);
  };
  
  const handleSaveEditedPlan = () => {
    if (!selectedPlan) return;
    
    // If this is set as default, remove default from other plans
    if (selectedPlan.isDefault) {
      const updatedPlans = plans.map(p => ({
        ...p,
        isDefault: p.id === selectedPlan.id ? true : false
      }));
      setPlans(updatedPlans);
    } else {
      setPlans(plans.map(p => p.id === selectedPlan.id ? selectedPlan : p));
    }
    
    setIsEditPlanOpen(false);
    
    toast({
      title: "Plano atualizado",
      description: "O plano foi atualizado com sucesso.",
    });
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };
  
  const getFeatureIcon = (category: string) => {
    switch (category) {
      case 'core':
        return <Database className="h-4 w-4 text-primary" />;
      case 'advanced':
        return <Settings className="h-4 w-4 text-amber-500" />;
      case 'support':
        return <Users className="h-4 w-4 text-green-500" />;
      default:
        return <Database className="h-4 w-4" />;
    }
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title="Planos" 
        description="Gerencie os planos e features disponíveis no sistema" 
      />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Tabs 
            defaultValue="plans" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="plans">Planos</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="comparison">Comparativo</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center ml-4 gap-2">
            {activeTab === 'plans' && (
              <Button onClick={() => setIsAddPlanOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Novo Plano
              </Button>
            )}
            
            {activeTab === 'features' && (
              <Button onClick={() => setIsAddFeatureOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nova Feature
              </Button>
            )}
          </div>
        </div>
        
        <TabsContent value="plans" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden relative">
                {plan.badge && (
                  <div className="absolute top-0 right-0 bg-primary text-white text-xs px-2 py-1 font-medium">
                    {plan.badge}
                  </div>
                )}
                <div className="h-2" style={{ backgroundColor: plan.color }}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </div>
                    {plan.isDefault && (
                      <Badge variant="outline" className="border-primary text-primary">
                        Padrão
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-4">
                    <p className="text-3xl font-bold">{formatCurrency(plan.monthlyPrice)}</p>
                    <p className="text-sm text-muted-foreground">por mês</p>
                  </div>
                  
                  <div className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {plan.maxUsers === 999 ? 'Usuários ilimitados' : `Até ${plan.maxUsers} usuários`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <HardDrive className="h-4 w-4 text-muted-foreground" />
                      <span>{plan.storage} GB de armazenamento</span>
                    </div>
                    
                    <Separator className="my-3" />
                    
                    <div className="space-y-2">
                      {features.filter(f => {
                        const planFeature = plan.features.find(pf => pf.featureId === f.id);
                        return planFeature?.included;
                      }).slice(0, 5).map((feature) => {
                        const planFeature = plan.features.find(pf => pf.featureId === feature.id);
                        return (
                          <div key={feature.id} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>
                              {feature.name}
                              {planFeature?.limit && ` (${planFeature.limit})`}
                            </span>
                          </div>
                        );
                      })}
                      
                      {features.filter(f => {
                        const planFeature = plan.features.find(pf => pf.featureId === f.id);
                        return planFeature?.included;
                      }).length > 5 && (
                        <div className="text-muted-foreground text-xs">
                          +{features.filter(f => {
                            const planFeature = plan.features.find(pf => pf.featureId === f.id);
                            return planFeature?.included;
                          }).length - 5} recursos adicionais
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Switch
                      checked={plan.isPublic}
                      onCheckedChange={(checked) => {
                        const updatedPlans = plans.map(p => {
                          if (p.id === plan.id) {
                            return { ...p, isPublic: checked };
                          }
                          return p;
                        });
                        setPlans(updatedPlans);
                      }}
                    />
                    <Label>Visível</Label>
                  </div>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleEditPlan(plan)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeletePlan(plan.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Gerenciamento de Planos</CardTitle>
              <CardDescription>Visão geral de todos os planos</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Preço Mensal</TableHead>
                      <TableHead>Preço Anual</TableHead>
                      <TableHead>Usuários</TableHead>
                      <TableHead>Armazenamento</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Padrão</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {plans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell className="font-medium">{plan.name}</TableCell>
                        <TableCell>{formatCurrency(plan.monthlyPrice)}</TableCell>
                        <TableCell>{formatCurrency(plan.annualPrice)}</TableCell>
                        <TableCell>{plan.maxUsers === 999 ? 'Ilimitado' : plan.maxUsers}</TableCell>
                        <TableCell>{plan.storage} GB</TableCell>
                        <TableCell>
                          <Badge
                            variant={plan.isPublic ? 'default' : 'secondary'}
                          >
                            {plan.isPublic ? 'Público' : 'Privado'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {plan.isDefault ? (
                            <Check className="h-4 w-4 text-green-500" />
                          ) : (
                            <X className="h-4 w-4 text-muted-foreground" />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="features" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Features Disponíveis</CardTitle>
              <CardDescription>
                Lista de todas as features que podem ser incluídas nos planos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Básico</TableHead>
                      <TableHead>Pro</TableHead>
                      <TableHead>Enterprise</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {features.map((feature) => (
                      <TableRow key={feature.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {getFeatureIcon(feature.category)}
                            {feature.name}
                          </div>
                        </TableCell>
                        <TableCell>{feature.description}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              feature.category === 'core' 
                                ? 'border-primary text-primary'
                                : feature.category === 'advanced'
                                  ? 'border-amber-500 text-amber-500'
                                  : 'border-green-500 text-green-500'
                            }
                          >
                            {feature.category === 'core' && 'Básica'}
                            {feature.category === 'advanced' && 'Avançada'}
                            {feature.category === 'support' && 'Suporte'}
                          </Badge>
                        </TableCell>
                        {plans.map((plan) => {
                          const planFeature = plan.features.find(
                            (pf) => pf.featureId === feature.id
                          );
                          
                          return (
                            <TableCell key={`${feature.id}-${plan.id}`}>
                              <div className="flex items-center gap-1">
                                <Switch
                                  checked={planFeature?.included || false}
                                  onCheckedChange={() => 
                                    handleToggleFeature(plan.id, feature.id)
                                  }
                                />
                                {planFeature?.included && planFeature?.limit && (
                                  <span className="text-xs ml-2">
                                    {planFeature.limit}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="comparison" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Comparativo de Planos</CardTitle>
              <CardDescription>
                Visualize as diferenças entre os planos disponíveis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <div className="grid grid-cols-4 gap-4">
                  <div className="col-span-1 font-medium">
                    <div className="h-16"></div>
                    <div className="h-12 flex items-center">Preço Mensal</div>
                    <div className="h-12 flex items-center">Preço Anual</div>
                    <div className="h-12 flex items-center">Usuários</div>
                    <div className="h-12 flex items-center">Armazenamento</div>
                    
                    <Separator className="my-4" />
                    
                    {features.map((feature) => (
                      <div key={feature.id} className="h-12 flex items-center gap-2">
                        {getFeatureIcon(feature.category)}
                        {feature.name}
                      </div>
                    ))}
                  </div>
                  
                  {plans.map((plan) => (
                    <div key={plan.id} className="col-span-1">
                      <div 
                        className="h-16 flex flex-col justify-center font-bold text-lg relative"
                        style={{ color: plan.color }}
                      >
                        {plan.name}
                        {plan.badge && (
                          <Badge className="absolute top-0 right-0 bg-primary text-white">
                            {plan.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="h-12 flex items-center font-bold">
                        {formatCurrency(plan.monthlyPrice)}
                      </div>
                      <div className="h-12 flex items-center font-bold">
                        {formatCurrency(plan.annualPrice)}
                      </div>
                      <div className="h-12 flex items-center">
                        {plan.maxUsers === 999 ? 'Ilimitado' : plan.maxUsers}
                      </div>
                      <div className="h-12 flex items-center">
                        {plan.storage} GB
                      </div>
                      
                      <Separator className="my-4" />
                      
                      {features.map((feature) => {
                        const planFeature = plan.features.find(
                          (pf) => pf.featureId === feature.id
                        );
                        
                        return (
                          <div key={`${plan.id}-${feature.id}`} className="h-12 flex items-center">
                            {planFeature?.included ? (
                              <div className="flex items-center">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                                {planFeature.limit && (
                                  <span className="text-sm">{planFeature.limit}</span>
                                )}
                              </div>
                            ) : (
                              <X className="h-5 w-5 text-muted-foreground" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Add Feature Dialog */}
        <Dialog open={isAddFeatureOpen} onOpenChange={setIsAddFeatureOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Feature</DialogTitle>
              <DialogDescription>
                Defina os detalhes da nova feature que poderá ser incluída nos planos.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="feature-name">Nome*</Label>
                <Input
                  id="feature-name"
                  value={newFeature.name}
                  onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                  placeholder="Ex: Backup Diário"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="feature-description">Descrição</Label>
                <Textarea
                  id="feature-description"
                  value={newFeature.description}
                  onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                  placeholder="Descreva o que esta feature oferece..."
                  rows={3}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="feature-category">Categoria</Label>
                <Select
                  value={newFeature.category}
                  onValueChange={(value: 'core' | 'advanced' | 'support') => 
                    setNewFeature({ ...newFeature, category: value })
                  }
                >
                  <SelectTrigger id="feature-category">
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="core">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-primary" />
                        <span>Básica</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="advanced">
                      <div className="flex items-center gap-2">
                        <Settings className="h-4 w-4 text-amber-500" />
                        <span>Avançada</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="support">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-green-500" />
                        <span>Suporte</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddFeatureOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddFeature}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Feature
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Add Plan Dialog */}
        <Dialog open={isAddPlanOpen} onOpenChange={setIsAddPlanOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Plano</DialogTitle>
              <DialogDescription>
                Defina os detalhes do novo plano de assinatura.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="plan-name">Nome*</Label>
                  <Input
                    id="plan-name"
                    value={newPlan.name}
                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                    placeholder="Ex: Premium"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="plan-badge">Badge (opcional)</Label>
                  <Input
                    id="plan-badge"
                    value={newPlan.badge}
                    onChange={(e) => setNewPlan({ ...newPlan, badge: e.target.value })}
                    placeholder="Ex: Popular"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="plan-description">Descrição</Label>
                <Textarea
                  id="plan-description"
                  value={newPlan.description}
                  onChange={(e) => setNewPlan({ ...newPlan, description: e.target.value })}
                  placeholder="Descreva o plano brevemente..."
                  rows={2}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="plan-monthlyPrice">Preço Mensal (R$)*</Label>
                  <Input
                    id="plan-monthlyPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPlan.monthlyPrice}
                    onChange={(e) => setNewPlan({ ...newPlan, monthlyPrice: parseFloat(e.target.value) || 0 })}
                    placeholder="99.90"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="plan-annualPrice">Preço Anual (R$)*</Label>
                  <Input
                    id="plan-annualPrice"
                    type="number"
                    min="0"
                    step="0.01"
                    value={newPlan.annualPrice}
                    onChange={(e) => setNewPlan({ ...newPlan, annualPrice: parseFloat(e.target.value) || 0 })}
                    placeholder="999.00"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="plan-maxUsers">Número Máximo de Usuários*</Label>
                  <Input
                    id="plan-maxUsers"
                    type="number"
                    min="1"
                    value={newPlan.maxUsers}
                    onChange={(e) => setNewPlan({ ...newPlan, maxUsers: parseInt(e.target.value) || 1 })}
                    placeholder="10"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="plan-storage">Armazenamento (GB)*</Label>
                  <Input
                    id="plan-storage"
                    type="number"
                    min="1"
                    value={newPlan.storage}
                    onChange={(e) => setNewPlan({ ...newPlan, storage: parseInt(e.target.value) || 1 })}
                    placeholder="10"
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="plan-color">Cor do Plano</Label>
                <div className="flex gap-2 items-center">
                  <div 
                    className="w-8 h-8 rounded-md border"
                    style={{ backgroundColor: newPlan.color }}
                  ></div>
                  <Input
                    id="plan-color"
                    type="text"
                    value={newPlan.color}
                    onChange={(e) => setNewPlan({ ...newPlan, color: e.target.value })}
                    placeholder="#8B5CF6"
                  />
                  <Input
                    type="color"
                    value={newPlan.color}
                    onChange={(e) => setNewPlan({ ...newPlan, color: e.target.value })}
                    className="w-12 h-8 p-1"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="plan-public"
                    checked={newPlan.isPublic}
                    onCheckedChange={(checked) => 
                      setNewPlan({ ...newPlan, isPublic: checked })
                    }
                  />
                  <Label htmlFor="plan-public">Plano Público</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="plan-default"
                    checked={newPlan.isDefault}
                    onCheckedChange={(checked) => 
                      setNewPlan({ ...newPlan, isDefault: checked })
                    }
                  />
                  <Label htmlFor="plan-default">Plano Padrão</Label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddPlanOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleAddPlan}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Plano
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        {/* Edit Plan Dialog */}
        {selectedPlan && (
          <Dialog open={isEditPlanOpen} onOpenChange={setIsEditPlanOpen}>
            <DialogContent className="sm:max-w-[700px]">
              <DialogHeader>
                <DialogTitle>Editar Plano - {selectedPlan.name}</DialogTitle>
                <DialogDescription>
                  Modifique os detalhes e features do plano.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-plan-name">Nome*</Label>
                    <Input
                      id="edit-plan-name"
                      value={selectedPlan.name}
                      onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-plan-badge">Badge (opcional)</Label>
                    <Input
                      id="edit-plan-badge"
                      value={selectedPlan.badge || ''}
                      onChange={(e) => setSelectedPlan({ ...selectedPlan, badge: e.target.value })}
                      placeholder="Ex: Popular"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-plan-description">Descrição</Label>
                  <Textarea
                    id="edit-plan-description"
                    value={selectedPlan.description}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, description: e.target.value })}
                    rows={2}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-plan-monthlyPrice">Preço Mensal (R$)*</Label>
                    <Input
                      id="edit-plan-monthlyPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={selectedPlan.monthlyPrice}
                      onChange={(e) => setSelectedPlan({ ...selectedPlan, monthlyPrice: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-plan-annualPrice">Preço Anual (R$)*</Label>
                    <Input
                      id="edit-plan-annualPrice"
                      type="number"
                      min="0"
                      step="0.01"
                      value={selectedPlan.annualPrice}
                      onChange={(e) => setSelectedPlan({ ...selectedPlan, annualPrice: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-plan-maxUsers">Usuários Máximos*</Label>
                    <Input
                      id="edit-plan-maxUsers"
                      type="number"
                      min="1"
                      value={selectedPlan.maxUsers}
                      onChange={(e) => setSelectedPlan({ ...selectedPlan, maxUsers: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="edit-plan-storage">Armazenamento (GB)*</Label>
                    <Input
                      id="edit-plan-storage"
                      type="number"
                      min="1"
                      value={selectedPlan.storage}
                      onChange={(e) => setSelectedPlan({ ...selectedPlan, storage: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="edit-plan-color">Cor do Plano</Label>
                  <div className="flex gap-2 items-center">
                    <div 
                      className="w-8 h-8 rounded-md border"
                      style={{ backgroundColor: selectedPlan.color }}
                    ></div>
                    <Input
                      id="edit-plan-color"
                      type="text"
                      value={selectedPlan.color}
                      onChange={(e) => setSelectedPlan({ ...selectedPlan, color: e.target.value })}
                    />
                    <Input
                      type="color"
                      value={selectedPlan.color}
                      onChange={(e) => setSelectedPlan({ ...selectedPlan, color: e.target.value })}
                      className="w-12 h-8 p-1"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <Label>Features Incluídas</Label>
                  <div className="mt-2 space-y-2 max-h-64 overflow-y-auto pr-2">
                    {features.map((feature) => {
                      const planFeature = selectedPlan.features.find(
                        (pf) => pf.featureId === feature.id
                      );
                      return (
                        <div key={feature.id} className="flex items-center justify-between p-2 border rounded-md">
                          <div className="flex items-center gap-2">
                            {getFeatureIcon(feature.category)}
                            <div>
                              <div className="font-medium">{feature.name}</div>
                              <div className="text-xs text-muted-foreground">{feature.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {planFeature?.included && (
                              <Input
                                type="text"
                                value={planFeature.limit || ''}
                                onChange={(e) => {
                                  const updatedFeatures = selectedPlan.features.map(pf => 
                                    pf.featureId === feature.id 
                                      ? { ...pf, limit: e.target.value } 
                                      : pf
                                  );
                                  setSelectedPlan({ ...selectedPlan, features: updatedFeatures });
                                }}
                                placeholder="Limite/Detalhes"
                                className="w-[150px] h-8 text-sm"
                              />
                            )}
                            <Switch
                              checked={planFeature?.included || false}
                              onCheckedChange={() => {
                                const updatedFeatures = selectedPlan.features.map(pf => 
                                  pf.featureId === feature.id 
                                    ? { ...pf, included: !pf.included } 
                                    : pf
                                );
                                setSelectedPlan({ ...selectedPlan, features: updatedFeatures });
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-plan-public"
                      checked={selectedPlan.isPublic}
                      onCheckedChange={(checked) => 
                        setSelectedPlan({ ...selectedPlan, isPublic: checked })
                      }
                    />
                    <Label htmlFor="edit-plan-public">Plano Público</Label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="edit-plan-default"
                      checked={selectedPlan.isDefault}
                      onCheckedChange={(checked) => 
                        setSelectedPlan({ ...selectedPlan, isDefault: checked })
                      }
                    />
                    <Label htmlFor="edit-plan-default">Plano Padrão</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditPlanOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleSaveEditedPlan}>
                  <Check className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </PageContainer>
  );
};

export default Plans;
