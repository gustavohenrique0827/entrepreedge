
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { 
  Search, 
  Building, 
  Users, 
  Calendar, 
  BarChart3, 
  Package, 
  Settings, 
  Eye, 
  ExternalLink, 
  Clock, 
  Info 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';

interface Company {
  id: number;
  name: string;
  segment: string;
  plan: 'basic' | 'pro' | 'enterprise';
  status: 'active' | 'trial' | 'expired' | 'suspended';
  usersCount: number;
  createdAt: string;
  lastLogin: string;
  logo?: string;
  cnpj?: string;
  subscription: {
    startDate: string;
    endDate: string;
    value: number;
    interval: 'monthly' | 'annual';
    autoRenew: boolean;
  };
}

const Companies = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const [companies, setCompanies] = useState<Company[]>([
    {
      id: 1,
      name: 'Empresa ABC',
      segment: 'Tecnologia',
      plan: 'pro',
      status: 'active',
      usersCount: 8,
      createdAt: '2024-11-15',
      lastLogin: '2025-03-31',
      logo: '',
      cnpj: '12.345.678/0001-90',
      subscription: {
        startDate: '2024-11-15',
        endDate: '2025-11-15',
        value: 199.90,
        interval: 'monthly',
        autoRenew: true
      }
    },
    {
      id: 2,
      name: 'Consultoria XYZ',
      segment: 'Consultoria',
      plan: 'enterprise',
      status: 'active',
      usersCount: 25,
      createdAt: '2024-10-03',
      lastLogin: '2025-04-01',
      logo: '',
      cnpj: '98.765.432/0001-10',
      subscription: {
        startDate: '2024-10-03',
        endDate: '2025-10-03',
        value: 999.90,
        interval: 'annual',
        autoRenew: true
      }
    },
    {
      id: 3,
      name: 'Startup 123',
      segment: 'E-commerce',
      plan: 'basic',
      status: 'trial',
      usersCount: 3,
      createdAt: '2025-03-20',
      lastLogin: '2025-04-02',
      logo: '',
      cnpj: '23.456.789/0001-23',
      subscription: {
        startDate: '2025-03-20',
        endDate: '2025-04-20',
        value: 0,
        interval: 'monthly',
        autoRenew: false
      }
    },
    {
      id: 4,
      name: 'Indústria 456',
      segment: 'Indústria',
      plan: 'pro',
      status: 'expired',
      usersCount: 12,
      createdAt: '2024-05-10',
      lastLogin: '2025-02-15',
      logo: '',
      cnpj: '34.567.890/0001-45',
      subscription: {
        startDate: '2024-05-10',
        endDate: '2025-03-10',
        value: 199.90,
        interval: 'monthly',
        autoRenew: false
      }
    },
    {
      id: 5,
      name: 'Clínica Saúde',
      segment: 'Saúde',
      plan: 'basic',
      status: 'suspended',
      usersCount: 5,
      createdAt: '2024-08-22',
      lastLogin: '2025-01-30',
      logo: '',
      cnpj: '45.678.901/0001-67',
      subscription: {
        startDate: '2024-08-22',
        endDate: '2025-02-22',
        value: 99.90,
        interval: 'monthly',
        autoRenew: true
      }
    }
  ]);
  
  const viewCompanyDetails = (company: Company) => {
    setSelectedCompany(company);
    setIsDetailsOpen(true);
  };
  
  const getPlanBadge = (plan: 'basic' | 'pro' | 'enterprise') => {
    switch (plan) {
      case 'basic':
        return <Badge variant="outline">Básico</Badge>;
      case 'pro':
        return <Badge variant="secondary">Pro</Badge>;
      case 'enterprise':
        return <Badge variant="default">Enterprise</Badge>;
      default:
        return <Badge variant="outline">Básico</Badge>;
    }
  };
  
  const getStatusBadge = (status: 'active' | 'trial' | 'expired' | 'suspended') => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Ativo</Badge>;
      case 'trial':
        return <Badge variant="secondary">Trial</Badge>;
      case 'expired':
        return <Badge variant="destructive">Expirado</Badge>;
      case 'suspended':
        return <Badge variant="outline" className="border-red-500 text-red-500">Suspenso</Badge>;
      default:
        return <Badge variant="outline">Desconhecido</Badge>;
    }
  };
  
  // Filter companies based on search term and active tab
  const filteredCompanies = companies.filter(company => {
    const matchesSearch = 
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.segment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.cnpj?.includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && company.status === 'active';
    if (activeTab === 'trial') return matchesSearch && company.status === 'trial';
    if (activeTab === 'expired') return matchesSearch && company.status === 'expired';
    if (activeTab === 'suspended') return matchesSearch && company.status === 'suspended';
    
    return matchesSearch;
  });
  
  return (
    <PageContainer>
      <PageHeader 
        title="Empresas" 
        description="Gerencie as empresas cadastradas no sistema" 
      />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Tabs 
            defaultValue="all" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="active">Ativas</TabsTrigger>
              <TabsTrigger value="trial">Trial</TabsTrigger>
              <TabsTrigger value="expired">Expiradas</TabsTrigger>
              <TabsTrigger value="suspended">Suspensas</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center ml-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar empresa..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Empresas Cadastradas</CardTitle>
            <CardDescription>
              Visualize e gerencie as empresas cadastradas no sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Segmento</TableHead>
                    <TableHead>Plano</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Usuários</TableHead>
                    <TableHead>Entrada</TableHead>
                    <TableHead>Último Acesso</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.length > 0 ? (
                    filteredCompanies.map((company) => (
                      <TableRow key={company.id}>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              {company.logo ? (
                                <AvatarImage src={company.logo} alt={company.name} />
                              ) : (
                                <AvatarFallback>
                                  {company.name.substring(0, 2).toUpperCase()}
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div className="font-medium">{company.name}</div>
                          </div>
                        </TableCell>
                        <TableCell>{company.segment}</TableCell>
                        <TableCell>{getPlanBadge(company.plan)}</TableCell>
                        <TableCell>{getStatusBadge(company.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            {company.usersCount}
                          </div>
                        </TableCell>
                        <TableCell>{company.createdAt}</TableCell>
                        <TableCell>{company.lastLogin}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => viewCompanyDetails(company)}
                              className="text-primary"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Settings className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-6 text-muted-foreground">
                        Nenhuma empresa encontrada.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
        
        {selectedCompany && (
          <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Detalhes da Empresa</DialogTitle>
                <DialogDescription>
                  Informações detalhadas sobre a empresa selecionada
                </DialogDescription>
              </DialogHeader>
              <div className="py-4 space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    {selectedCompany.logo ? (
                      <AvatarImage src={selectedCompany.logo} alt={selectedCompany.name} />
                    ) : (
                      <AvatarFallback className="text-lg">
                        {selectedCompany.name.substring(0, 2).toUpperCase()}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div>
                    <h2 className="text-xl font-bold">{selectedCompany.name}</h2>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline">{selectedCompany.segment}</Badge>
                      {getPlanBadge(selectedCompany.plan)}
                      {getStatusBadge(selectedCompany.status)}
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">CNPJ</h3>
                    <p>{selectedCompany.cnpj || 'Não informado'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Data de Cadastro</h3>
                    <p>{selectedCompany.createdAt}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Último Acesso</h3>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <p>{selectedCompany.lastLogin}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Usuários</h3>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <p>{selectedCompany.usersCount} usuários</p>
                    </div>
                  </div>
                </div>
                
                <Card className="mt-4">
                  <CardHeader className="py-3">
                    <CardTitle className="text-base">Detalhes da Assinatura</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Plano</h3>
                        <p className="font-medium">
                          {selectedCompany.plan === 'basic' && 'Básico'}
                          {selectedCompany.plan === 'pro' && 'Profissional'}
                          {selectedCompany.plan === 'enterprise' && 'Enterprise'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Valor</h3>
                        <p className="font-medium">
                          R$ {selectedCompany.subscription.value.toFixed(2)}/{selectedCompany.subscription.interval === 'monthly' ? 'mês' : 'ano'}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Início</h3>
                        <p>{selectedCompany.subscription.startDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Término</h3>
                        <p>{selectedCompany.subscription.endDate}</p>
                      </div>
                      <div className="col-span-2">
                        <h3 className="text-sm font-medium text-muted-foreground">Renovação Automática</h3>
                        <Badge variant={selectedCompany.subscription.autoRenew ? 'default' : 'outline'}>
                          {selectedCompany.subscription.autoRenew ? 'Ativada' : 'Desativada'}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="flex justify-between mt-4">
                  <Button variant="outline">
                    <Building className="mr-2 h-4 w-4" />
                    Acessar Portal
                  </Button>
                  <Button>
                    <Settings className="mr-2 h-4 w-4" />
                    Gerenciar Empresa
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </PageContainer>
  );
};

export default Companies;
