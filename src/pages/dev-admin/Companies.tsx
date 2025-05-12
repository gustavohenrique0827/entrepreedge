
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, BarChart2, Code, Settings, Eye, Building, Calendar, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { DateRange } from 'react-day-picker';
import { format, addMonths } from 'date-fns';

// Sample data for companies
const initialCompanies = [
  { 
    id: 1, 
    name: 'Tech Solutions Ltda', 
    document: '12.345.678/0001-90', 
    plan: 'enterprise', 
    status: 'active', 
    employees: 25, 
    createdAt: '2022-10-15', 
    planExpiration: '2024-10-15',
    contact: 'contato@techsolutions.com.br',
    address: 'Av. Paulista, 1000, São Paulo - SP'
  },
  { 
    id: 2, 
    name: 'Comércio Express ME', 
    document: '98.765.432/0001-21', 
    plan: 'pro', 
    status: 'active', 
    employees: 8, 
    createdAt: '2023-03-20', 
    planExpiration: '2024-03-20',
    contact: 'financeiro@comercioexpress.com.br',
    address: 'Rua da Consolação, 500, São Paulo - SP'
  },
  { 
    id: 3, 
    name: 'Consultoria Financeira SA', 
    document: '45.678.901/0001-23', 
    plan: 'basic', 
    status: 'inactive', 
    employees: 3, 
    createdAt: '2023-05-10', 
    planExpiration: '2023-11-10',
    contact: 'atendimento@consultoriafinanceira.com.br',
    address: 'Av. Rio Branco, 200, Rio de Janeiro - RJ'
  },
  { 
    id: 4, 
    name: 'Indústria Nacional Ltda', 
    document: '34.567.890/0001-45', 
    plan: 'enterprise', 
    status: 'active', 
    employees: 120, 
    createdAt: '2021-08-05', 
    planExpiration: '2024-08-05',
    contact: 'comercial@industrianacional.com.br',
    address: 'Rod. Anhanguera, Km 100, Campinas - SP'
  },
  { 
    id: 5, 
    name: 'Serviços Contábeis ME', 
    document: '23.456.789/0001-67', 
    plan: 'pro', 
    status: 'active', 
    employees: 12, 
    createdAt: '2022-12-01', 
    planExpiration: '2024-12-01',
    contact: 'contato@servicoscontabeis.com.br',
    address: 'Rua XV de Novembro, 300, Curitiba - PR'
  },
];

const Companies = () => {
  const [companies, setCompanies] = useState(initialCompanies);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [newPlan, setNewPlan] = useState({
    plan: '',
    duration: '12'
  });
  const { toast } = useToast();

  const filteredCompanies = companies.filter(company => 
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.document.includes(searchTerm)
  );

  const handleViewDetails = (company: any) => {
    setSelectedCompany(company);
    setShowDetailsModal(true);
  };

  const handlePlanChange = (company: any) => {
    setSelectedCompany(company);
    setNewPlan({
      plan: company.plan,
      duration: '12'
    });
    setShowPlanModal(true);
  };

  const savePlanChange = () => {
    if (!selectedCompany || !newPlan.plan) return;

    const expirationDate = addMonths(new Date(), parseInt(newPlan.duration));
    
    setCompanies(companies.map(company => 
      company.id === selectedCompany.id 
        ? { 
            ...company, 
            plan: newPlan.plan, 
            status: 'active',
            planExpiration: format(expirationDate, 'yyyy-MM-dd')
          } 
        : company
    ));
    
    setShowPlanModal(false);
    
    toast({
      title: "Plano atualizado",
      description: `O plano da empresa ${selectedCompany.name} foi atualizado com sucesso para ${newPlan.plan.toUpperCase()}.`,
    });
  };

  const toggleCompanyStatus = (id: number) => {
    setCompanies(companies.map(company => 
      company.id === id 
        ? { ...company, status: company.status === 'active' ? 'inactive' : 'active' } 
        : company
    ));
    
    const company = companies.find(c => c.id === id);
    
    toast({
      title: "Status atualizado",
      description: `A empresa ${company?.name} foi ${company?.status === 'active' ? 'desativada' : 'ativada'} com sucesso.`,
    });
  };

  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Dev/Admin',
      href: '/dev-admin/companies',
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
            title="Empresas" 
            description="Visualize e gerencie todas as empresas cadastradas no sistema"
          />
          
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle>Empresas Cadastradas</CardTitle>
                  <CardDescription>
                    Lista de todas as empresas com seus respectivos planos
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Input
                    placeholder="Buscar por nome ou CNPJ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-[250px]"
                  />
                  <DatePickerWithRange date={dateRange} setDate={setDateRange} />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Funcionários</TableHead>
                    <TableHead>Vencimento</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell className="font-medium">{company.name}</TableCell>
                      <TableCell>{company.document}</TableCell>
                      <TableCell>
                        <Badge variant={
                          company.plan === 'enterprise' ? 'default' : 
                          company.plan === 'pro' ? 'secondary' : 'outline'
                        }>
                          {company.plan === 'enterprise' ? 'Enterprise' : 
                           company.plan === 'pro' ? 'Pro' : 'Básico'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={company.status === 'active' ? 'default' : 'destructive'}>
                          {company.status === 'active' ? 'Ativo' : 'Inativo'}
                        </Badge>
                      </TableCell>
                      <TableCell>{company.employees}</TableCell>
                      <TableCell>{company.planExpiration}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            title="Ver Detalhes"
                            onClick={() => handleViewDetails(company)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            title="Alterar Plano"
                            onClick={() => handlePlanChange(company)}
                          >
                            <Building className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant={company.status === 'active' ? 'destructive' : 'outline'} 
                            size="icon" 
                            title={company.status === 'active' ? 'Desativar' : 'Ativar'}
                            onClick={() => toggleCompanyStatus(company.id)}
                          >
                            <Users className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-between flex-col sm:flex-row">
              <div className="text-sm text-muted-foreground">
                Total de empresas: {companies.length}
              </div>
              <div className="text-sm text-muted-foreground mt-2 sm:mt-0">
                Ativas: {companies.filter(c => c.status === 'active').length} | 
                Inativas: {companies.filter(c => c.status === 'inactive').length}
              </div>
            </CardFooter>
          </Card>
          
          {/* Company Details Modal */}
          <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Detalhes da Empresa</DialogTitle>
                <DialogDescription>
                  Informações detalhadas sobre a empresa selecionada
                </DialogDescription>
              </DialogHeader>
              
              {selectedCompany && (
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Nome</Label>
                      <p className="font-medium">{selectedCompany.name}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">CNPJ</Label>
                      <p className="font-medium">{selectedCompany.document}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Funcionários</Label>
                      <p className="font-medium">{selectedCompany.employees}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Endereço</Label>
                    <p className="font-medium">{selectedCompany.address}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Contato</Label>
                    <p className="font-medium">{selectedCompany.contact}</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Plano</Label>
                      <p className="font-medium capitalize">{selectedCompany.plan}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Status</Label>
                      <p className="font-medium capitalize">{selectedCompany.status}</p>
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Vencimento</Label>
                      <p className="font-medium">{selectedCompany.planExpiration}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Data de Cadastro</Label>
                      <p className="font-medium">{selectedCompany.createdAt}</p>
                    </div>
                  </div>
                </div>
              )}
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDetailsModal(false)}>
                  Fechar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Plan Change Modal */}
          <Dialog open={showPlanModal} onOpenChange={setShowPlanModal}>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Alterar Plano</DialogTitle>
                <DialogDescription>
                  {selectedCompany ? `Altere o plano da empresa ${selectedCompany.name}` : 'Altere o plano da empresa selecionada'}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="plan">Plano</Label>
                  <Select
                    value={newPlan.plan}
                    onValueChange={(value) => setNewPlan({...newPlan, plan: value})}
                  >
                    <SelectTrigger id="plan">
                      <SelectValue placeholder="Selecione o plano" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básico</SelectItem>
                      <SelectItem value="pro">Pro</SelectItem>
                      <SelectItem value="enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duração</Label>
                  <Select
                    value={newPlan.duration}
                    onValueChange={(value) => setNewPlan({...newPlan, duration: value})}
                  >
                    <SelectTrigger id="duration">
                      <SelectValue placeholder="Selecione a duração" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 mês</SelectItem>
                      <SelectItem value="3">3 meses</SelectItem>
                      <SelectItem value="6">6 meses</SelectItem>
                      <SelectItem value="12">12 meses</SelectItem>
                      <SelectItem value="24">24 meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid gap-2 pt-2">
                  <Label>Nova Data de Vencimento</Label>
                  <p className="text-sm font-medium">
                    {format(addMonths(new Date(), parseInt(newPlan.duration)), 'dd/MM/yyyy')}
                  </p>
                </div>
              </div>
              
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPlanModal(false)}>
                  Cancelar
                </Button>
                <Button onClick={savePlanChange}>
                  Salvar Alteração
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </PageContainer>
      </div>
    </div>
  );
};

export default Companies;
