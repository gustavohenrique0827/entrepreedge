
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Code, Settings, HeadphonesIcon, Users, Activity, MessageCircle, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Sample support plans
const initialSupportPlans = [
  { 
    id: 1, 
    name: 'Suporte Básico', 
    planLevel: 'basic',
    email: true,
    chat: false,
    phone: false,
    responseTime: '48h',
    dedicatedAgent: false,
    prioritySupport: false,
    enabled: true,
    description: 'Suporte básico por email com tempo de resposta de até 48 horas úteis.'
  },
  { 
    id: 2, 
    name: 'Suporte Pro', 
    planLevel: 'pro',
    email: true,
    chat: true,
    phone: false,
    responseTime: '24h',
    dedicatedAgent: false,
    prioritySupport: true,
    enabled: true,
    description: 'Suporte via email e chat com tempo de resposta de até 24 horas úteis e prioridade no atendimento.'
  },
  { 
    id: 3, 
    name: 'Suporte Enterprise', 
    planLevel: 'enterprise',
    email: true,
    chat: true,
    phone: true,
    responseTime: '4h',
    dedicatedAgent: true,
    prioritySupport: true,
    enabled: true,
    description: 'Suporte completo via email, chat e telefone com tempo de resposta de até 4 horas úteis, agente dedicado e prioridade máxima.'
  }
];

// Sample active support tickets
const initialTickets = [
  { 
    id: 1,
    companyName: 'Tech Solutions Ltda',
    planLevel: 'enterprise',
    subject: 'Problema na integração com API',
    status: 'open',
    priority: 'high',
    createdAt: '2024-04-15T14:30:00',
    lastUpdate: '2024-04-16T10:15:00',
    assignedTo: 'Carlos Mendes'
  },
  { 
    id: 2,
    companyName: 'Comércio Express ME',
    planLevel: 'pro',
    subject: 'Dúvida sobre relatórios financeiros',
    status: 'in_progress',
    priority: 'medium',
    createdAt: '2024-04-14T09:45:00',
    lastUpdate: '2024-04-16T11:20:00',
    assignedTo: 'Ana Souza'
  },
  { 
    id: 3,
    companyName: 'Consultoria Financeira SA',
    planLevel: 'basic',
    subject: 'Erro ao gerar holerite',
    status: 'waiting',
    priority: 'low',
    createdAt: '2024-04-13T16:10:00',
    lastUpdate: '2024-04-15T14:50:00',
    assignedTo: null
  },
  { 
    id: 4,
    companyName: 'Indústria Nacional Ltda',
    planLevel: 'enterprise',
    subject: 'Customização de dashboard',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-04-10T11:25:00',
    lastUpdate: '2024-04-15T17:30:00',
    assignedTo: 'Pedro Alves'
  },
  { 
    id: 5,
    companyName: 'Tech Solutions Ltda',
    planLevel: 'enterprise',
    subject: 'Falha na sincronização',
    status: 'closed',
    priority: 'high',
    createdAt: '2024-04-08T08:15:00',
    lastUpdate: '2024-04-12T13:45:00',
    assignedTo: 'Carlos Mendes'
  }
];

const Support = () => {
  const [supportPlans, setSupportPlans] = useState(initialSupportPlans);
  const [tickets, setTickets] = useState(initialTickets);
  const [activeTab, setActiveTab] = useState('plans');
  const [statusFilter, setStatusFilter] = useState('all');
  const { toast } = useToast();

  const toggleSupportFeature = (planId: number, feature: string) => {
    setSupportPlans(supportPlans.map(plan => 
      plan.id === planId 
        ? { ...plan, [feature]: !plan[feature] } 
        : plan
    ));

    toast({
      title: "Configuração atualizada",
      description: "A configuração de suporte foi atualizada com sucesso",
    });
  };

  const toggleSupportPlan = (planId: number) => {
    setSupportPlans(supportPlans.map(plan => 
      plan.id === planId 
        ? { ...plan, enabled: !plan.enabled } 
        : plan
    ));

    const plan = supportPlans.find(p => p.id === planId);
    
    toast({
      title: plan?.enabled ? "Suporte desativado" : "Suporte ativado",
      description: `O suporte para planos ${plan?.planLevel.toUpperCase()} foi ${plan?.enabled ? 'desativado' : 'ativado'} com sucesso.`,
    });
  };

  const updateTicketStatus = (ticketId: number, status: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status, lastUpdate: new Date().toISOString() } 
        : ticket
    ));
    
    toast({
      title: "Status atualizado",
      description: "O status do chamado foi atualizado com sucesso.",
    });
  };

  const filteredTickets = statusFilter === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === statusFilter);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'open':
        return <Badge variant="default">Aberto</Badge>;
      case 'in_progress':
        return <Badge variant="secondary">Em Andamento</Badge>;
      case 'waiting':
        return <Badge variant="outline">Aguardando</Badge>;
      case 'resolved':
        return <Badge className="bg-green-500 hover:bg-green-600">Resolvido</Badge>;
      case 'closed':
        return <Badge variant="outline">Fechado</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">Alta</Badge>;
      case 'medium':
        return <Badge variant="secondary">Média</Badge>;
      case 'low':
        return <Badge variant="outline">Baixa</Badge>;
      default:
        return <Badge variant="outline">{priority}</Badge>;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
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
      href: '/dev-admin/support',
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
            title="Gerenciamento de Suporte" 
            description="Configure as opções de suporte disponíveis para cada plano"
          />
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="plans" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Planos de Suporte
              </TabsTrigger>
              <TabsTrigger value="tickets" className="flex items-center gap-2">
                <HeadphonesIcon className="h-4 w-4" />
                Chamados Ativos
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="plans">
              <Card>
                <CardHeader>
                  <CardTitle>Configuração de Suporte por Plano</CardTitle>
                  <CardDescription>
                    Configure as funcionalidades de suporte disponíveis para cada nível de plano
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plano</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Chat</TableHead>
                        <TableHead>Telefone</TableHead>
                        <TableHead>Tempo de Resposta</TableHead>
                        <TableHead>Agente Dedicado</TableHead>
                        <TableHead>Prioridade</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {supportPlans.map((plan) => (
                        <TableRow key={plan.id}>
                          <TableCell className="font-medium">
                            <Badge variant={
                              plan.planLevel === 'enterprise' ? 'default' : 
                              plan.planLevel === 'pro' ? 'secondary' : 'outline'
                            } className="px-2 py-1">
                              {plan.name}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={plan.email} 
                              onCheckedChange={() => toggleSupportFeature(plan.id, 'email')} 
                            />
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={plan.chat} 
                              onCheckedChange={() => toggleSupportFeature(plan.id, 'chat')} 
                            />
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={plan.phone} 
                              onCheckedChange={() => toggleSupportFeature(plan.id, 'phone')} 
                            />
                          </TableCell>
                          <TableCell>
                            <Select 
                              value={plan.responseTime} 
                              onValueChange={(value) => {
                                setSupportPlans(supportPlans.map(p => 
                                  p.id === plan.id ? { ...p, responseTime: value } : p
                                ));
                              }}
                            >
                              <SelectTrigger className="w-[100px]">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="48h">48h</SelectItem>
                                <SelectItem value="24h">24h</SelectItem>
                                <SelectItem value="12h">12h</SelectItem>
                                <SelectItem value="4h">4h</SelectItem>
                                <SelectItem value="1h">1h</SelectItem>
                              </SelectContent>
                            </Select>
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={plan.dedicatedAgent} 
                              onCheckedChange={() => toggleSupportFeature(plan.id, 'dedicatedAgent')} 
                            />
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={plan.prioritySupport} 
                              onCheckedChange={() => toggleSupportFeature(plan.id, 'prioritySupport')} 
                            />
                          </TableCell>
                          <TableCell>
                            <Switch 
                              checked={plan.enabled} 
                              onCheckedChange={() => toggleSupportPlan(plan.id)} 
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-2 border-t pt-6">
                  <h3 className="font-semibold mb-2">Descrição dos Planos de Suporte</h3>
                  {supportPlans.map((plan) => (
                    <div key={`desc-${plan.id}`} className="mb-2">
                      <Badge variant={
                        plan.planLevel === 'enterprise' ? 'default' : 
                        plan.planLevel === 'pro' ? 'secondary' : 'outline'
                      } className="mr-2">
                        {plan.name}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{plan.description}</span>
                    </div>
                  ))}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="tickets">
              <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                  <div>
                    <CardTitle>Chamados de Suporte</CardTitle>
                    <CardDescription>
                      Visualize e gerencie os chamados de suporte ativos
                    </CardDescription>
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os chamados</SelectItem>
                      <SelectItem value="open">Abertos</SelectItem>
                      <SelectItem value="in_progress">Em andamento</SelectItem>
                      <SelectItem value="waiting">Aguardando</SelectItem>
                      <SelectItem value="resolved">Resolvidos</SelectItem>
                      <SelectItem value="closed">Fechados</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Empresa</TableHead>
                        <TableHead>Plano</TableHead>
                        <TableHead>Assunto</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Prioridade</TableHead>
                        <TableHead>Última Atualização</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTickets.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={8} className="text-center py-4 text-muted-foreground">
                            Nenhum chamado encontrado com os filtros atuais.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredTickets.map((ticket) => (
                          <TableRow key={ticket.id}>
                            <TableCell className="font-medium">#{ticket.id}</TableCell>
                            <TableCell>{ticket.companyName}</TableCell>
                            <TableCell>
                              <Badge variant={
                                ticket.planLevel === 'enterprise' ? 'default' : 
                                ticket.planLevel === 'pro' ? 'secondary' : 'outline'
                              } className="capitalize">
                                {ticket.planLevel}
                              </Badge>
                            </TableCell>
                            <TableCell>{ticket.subject}</TableCell>
                            <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                            <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                            <TableCell>{formatDate(ticket.lastUpdate)}</TableCell>
                            <TableCell>
                              <div className="flex space-x-1">
                                <Button variant="outline" size="sm" className="h-7">
                                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                                  Responder
                                </Button>
                                <Select 
                                  value={ticket.status} 
                                  onValueChange={(value) => updateTicketStatus(ticket.id, value)}
                                  disabled={ticket.status === 'closed'}
                                >
                                  <SelectTrigger className="h-7 w-[100px]">
                                    <Activity className="h-3.5 w-3.5 mr-1" />
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="open">Aberto</SelectItem>
                                    <SelectItem value="in_progress">Em andamento</SelectItem>
                                    <SelectItem value="waiting">Aguardando</SelectItem>
                                    <SelectItem value="resolved">Resolvido</SelectItem>
                                    <SelectItem value="closed">Fechado</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <div className="text-sm text-muted-foreground">
                    Total de chamados ativos: {tickets.filter(t => t.status !== 'closed' && t.status !== 'resolved').length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Tempo médio de resolução: 36h
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </PageContainer>
      </div>
    </div>
  );
};

export default Support;
