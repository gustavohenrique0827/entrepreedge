
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
import { Separator } from '@/components/ui/separator';
import { 
  HeadphonesIcon, 
  Search, 
  MessageCircle, 
  User, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Filter, 
  ChevronDown, 
  Package,
  Settings,
  Info,
  Calendar,
  Ban
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Label } from '@/components/ui/label';
import { format, isToday, isYesterday, differenceInDays } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Types
interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  status: 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  companyId: number;
  companyName: string;
  plan: 'basic' | 'pro' | 'enterprise';
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  category: 'technical' | 'billing' | 'access' | 'feature' | 'other';
  supportEnabled: boolean;
  messages: SupportMessage[];
}

interface SupportMessage {
  id: string;
  ticketId: string;
  sender: 'customer' | 'support';
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

interface SupportAgent {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  role: 'agent' | 'supervisor' | 'admin';
  activeTickets: number;
  resolvedToday: number;
}

interface SupportMetric {
  metric: string;
  value: number;
  change: number;
  period: 'day' | 'week' | 'month';
}

interface SupportPlan {
  id: number;
  planName: string;
  response: string;
  channels: string[];
  customization: boolean;
  dedicated: boolean;
}

const Support = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('tickets');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(null);
  const [isTicketDetailsOpen, setIsTicketDetailsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  
  // Support Plans
  const [supportPlans, setSupportPlans] = useState<SupportPlan[]>([
    {
      id: 1,
      planName: 'Básico',
      response: '24 horas',
      channels: ['Email'],
      customization: false,
      dedicated: false
    },
    {
      id: 2,
      planName: 'Pro',
      response: '12 horas',
      channels: ['Email', 'Chat'],
      customization: false,
      dedicated: false
    },
    {
      id: 3,
      planName: 'Enterprise',
      response: '4 horas',
      channels: ['Email', 'Chat', 'Telefone'],
      customization: true,
      dedicated: true
    }
  ]);
  
  // Support tickets data
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-1001',
      subject: 'Erro ao gerar relatório mensal',
      description: 'Estou tentando gerar o relatório mensal, mas o sistema apresenta um erro quando clico em "Gerar".',
      status: 'open',
      priority: 'medium',
      companyId: 1,
      companyName: 'Empresa ABC',
      plan: 'pro',
      createdAt: '2025-04-16T10:30:00',
      updatedAt: '2025-04-16T10:30:00',
      assignedTo: 'Maria Silva',
      category: 'technical',
      supportEnabled: true,
      messages: [
        {
          id: 'MSG-1001',
          ticketId: 'TKT-1001',
          sender: 'customer',
          senderName: 'João (Empresa ABC)',
          content: 'Estou tentando gerar o relatório mensal, mas o sistema apresenta um erro quando clico em "Gerar". O erro diz "Falha ao processar dados".',
          timestamp: '2025-04-16T10:30:00'
        }
      ]
    },
    {
      id: 'TKT-1002',
      subject: 'Dúvida sobre faturamento',
      description: 'Tenho uma dúvida sobre a cobrança do mês atual. Foi cobrado um valor diferente do contratado.',
      status: 'pending',
      priority: 'low',
      companyId: 2,
      companyName: 'Consultoria XYZ',
      plan: 'enterprise',
      createdAt: '2025-04-15T14:20:00',
      updatedAt: '2025-04-16T09:15:00',
      assignedTo: 'Carlos Oliveira',
      category: 'billing',
      supportEnabled: true,
      messages: [
        {
          id: 'MSG-2001',
          ticketId: 'TKT-1002',
          sender: 'customer',
          senderName: 'Ana (Consultoria XYZ)',
          content: 'Tenho uma dúvida sobre a cobrança do mês atual. Foi cobrado um valor diferente do contratado.',
          timestamp: '2025-04-15T14:20:00'
        },
        {
          id: 'MSG-2002',
          ticketId: 'TKT-1002',
          sender: 'support',
          senderName: 'Carlos Oliveira (Suporte)',
          content: 'Olá Ana, estou verificando a questão do faturamento. Poderia me informar qual o valor cobrado e em qual data?',
          timestamp: '2025-04-16T09:15:00'
        }
      ]
    },
    {
      id: 'TKT-1003',
      subject: 'Não consigo acessar módulo financeiro',
      description: 'Após a atualização do sistema, não consigo mais acessar o módulo financeiro. Aparece uma mensagem de "Acesso negado".',
      status: 'resolved',
      priority: 'high',
      companyId: 3,
      companyName: 'Startup 123',
      plan: 'basic',
      createdAt: '2025-04-14T11:45:00',
      updatedAt: '2025-04-16T16:30:00',
      assignedTo: 'Pedro Santos',
      category: 'access',
      supportEnabled: true,
      messages: [
        {
          id: 'MSG-3001',
          ticketId: 'TKT-1003',
          sender: 'customer',
          senderName: 'Lucas (Startup 123)',
          content: 'Após a atualização do sistema, não consigo mais acessar o módulo financeiro. Aparece uma mensagem de "Acesso negado".',
          timestamp: '2025-04-14T11:45:00'
        },
        {
          id: 'MSG-3002',
          ticketId: 'TKT-1003',
          sender: 'support',
          senderName: 'Pedro Santos (Suporte)',
          content: 'Olá Lucas, verificamos que houve um problema com as permissões após a atualização. Já estamos trabalhando nisso.',
          timestamp: '2025-04-14T13:20:00'
        },
        {
          id: 'MSG-3003',
          ticketId: 'TKT-1003',
          sender: 'support',
          senderName: 'Pedro Santos (Suporte)',
          content: 'O problema foi resolvido. Por favor, tente acessar novamente o módulo financeiro e me informe se está funcionando.',
          timestamp: '2025-04-16T16:30:00'
        }
      ]
    },
    {
      id: 'TKT-1004',
      subject: 'Solicitação de nova funcionalidade',
      description: 'Gostaria de solicitar a implementação de uma nova funcionalidade para exportar relatórios em formato CSV.',
      status: 'open',
      priority: 'low',
      companyId: 4,
      companyName: 'Indústria 456',
      plan: 'pro',
      createdAt: '2025-04-16T09:10:00',
      updatedAt: '2025-04-16T09:10:00',
      category: 'feature',
      supportEnabled: true,
      messages: [
        {
          id: 'MSG-4001',
          ticketId: 'TKT-1004',
          sender: 'customer',
          senderName: 'Mariana (Indústria 456)',
          content: 'Gostaria de solicitar a implementação de uma nova funcionalidade para exportar relatórios em formato CSV. Isso seria muito útil para nossa equipe de análise de dados.',
          timestamp: '2025-04-16T09:10:00'
        }
      ]
    },
    {
      id: 'TKT-1005',
      subject: 'Sistema lento após atualização',
      description: 'Desde a última atualização, o sistema está muito lento, especialmente no módulo de relatórios.',
      status: 'closed',
      priority: 'urgent',
      companyId: 5,
      companyName: 'Clínica Saúde',
      plan: 'basic',
      createdAt: '2025-04-13T16:50:00',
      updatedAt: '2025-04-15T17:20:00',
      assignedTo: 'Maria Silva',
      category: 'technical',
      supportEnabled: false,
      messages: [
        {
          id: 'MSG-5001',
          ticketId: 'TKT-1005',
          sender: 'customer',
          senderName: 'Roberto (Clínica Saúde)',
          content: 'Desde a última atualização, o sistema está muito lento, especialmente no módulo de relatórios. Isso está prejudicando nosso atendimento aos pacientes.',
          timestamp: '2025-04-13T16:50:00'
        },
        {
          id: 'MSG-5002',
          ticketId: 'TKT-1005',
          sender: 'support',
          senderName: 'Maria Silva (Suporte)',
          content: 'Olá Roberto, detectamos um problema de performance após a atualização. Nossa equipe técnica já está trabalhando nisso.',
          timestamp: '2025-04-14T08:30:00'
        },
        {
          id: 'MSG-5003',
          ticketId: 'TKT-1005',
          sender: 'support',
          senderName: 'Maria Silva (Suporte)',
          content: 'O problema foi resolvido com sucesso. Fizemos uma otimização no módulo de relatórios e o sistema deve estar funcionando normalmente agora.',
          timestamp: '2025-04-15T14:45:00'
        },
        {
          id: 'MSG-5004',
          ticketId: 'TKT-1005',
          sender: 'customer',
          senderName: 'Roberto (Clínica Saúde)',
          content: 'Confirmado! O sistema está funcionando bem agora. Obrigado pela solução rápida.',
          timestamp: '2025-04-15T17:20:00'
        }
      ]
    }
  ]);
  
  // Support agents data
  const [agents, setAgents] = useState<SupportAgent[]>([
    {
      id: 'AGT-001',
      name: 'Maria Silva',
      email: 'maria@suporte.com',
      status: 'online',
      role: 'supervisor',
      activeTickets: 2,
      resolvedToday: 3
    },
    {
      id: 'AGT-002',
      name: 'Carlos Oliveira',
      email: 'carlos@suporte.com',
      status: 'online',
      role: 'agent',
      activeTickets: 1,
      resolvedToday: 2
    },
    {
      id: 'AGT-003',
      name: 'Pedro Santos',
      email: 'pedro@suporte.com',
      status: 'away',
      role: 'agent',
      activeTickets: 1,
      resolvedToday: 1
    },
    {
      id: 'AGT-004',
      name: 'Ana Costa',
      email: 'ana@suporte.com',
      status: 'offline',
      role: 'agent',
      activeTickets: 0,
      resolvedToday: 2
    }
  ]);
  
  // Support metrics
  const metrics: SupportMetric[] = [
    {
      metric: 'Tickets Abertos',
      value: 12,
      change: -2,
      period: 'day'
    },
    {
      metric: 'Tempo Médio de Resposta',
      value: 2.5,
      change: -0.5,
      period: 'day'
    },
    {
      metric: 'Tickets Resolvidos',
      value: 18,
      change: 3,
      period: 'day'
    },
    {
      metric: 'Satisfação do Cliente',
      value: 95,
      change: 2,
      period: 'week'
    }
  ];
  
  // Settings
  const [supportSettings, setSupportSettings] = useState({
    enableEmailNotifications: true,
    enableAutoAssignment: true,
    defaultResponseTime: 'Responderemos em até 24 horas.',
    workingHours: '09:00 - 18:00',
    workingDays: 'Segunda a Sexta',
    holidays: ['01/01', '21/04', '01/05', '07/09', '12/10', '02/11', '15/11', '25/12'],
    autoCloseAfterDays: 5
  });
  
  const handleOpenTicketDetails = (ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsTicketDetailsOpen(true);
  };
  
  const handleChangeTicketStatus = (ticketId: string, newStatus: 'open' | 'pending' | 'resolved' | 'closed') => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { 
          ...ticket, 
          status: newStatus,
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    }
    
    toast({
      title: "Status atualizado",
      description: `O ticket ${ticketId} foi marcado como ${getStatusText(newStatus)}.`,
    });
  };
  
  const handleChangeTicketPriority = (ticketId: string, newPriority: 'low' | 'medium' | 'high' | 'urgent') => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { 
          ...ticket, 
          priority: newPriority,
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        priority: newPriority,
        updatedAt: new Date().toISOString()
      });
    }
    
    toast({
      title: "Prioridade atualizada",
      description: `A prioridade do ticket ${ticketId} foi alterada para ${getPriorityText(newPriority)}.`,
    });
  };
  
  const handleAssignTicket = (ticketId: string, agentName: string) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { 
          ...ticket, 
          assignedTo: agentName,
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        assignedTo: agentName,
        updatedAt: new Date().toISOString()
      });
    }
    
    toast({
      title: "Ticket atribuído",
      description: `O ticket ${ticketId} foi atribuído para ${agentName}.`,
    });
  };
  
  const handleSendMessage = () => {
    if (!selectedTicket || !newMessage.trim()) return;
    
    const newMessageObj: SupportMessage = {
      id: `MSG-${Math.floor(Math.random() * 10000)}`,
      ticketId: selectedTicket.id,
      sender: 'support',
      senderName: 'Você (Suporte)',
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    const updatedTicket = {
      ...selectedTicket,
      messages: [...selectedTicket.messages, newMessageObj],
      status: selectedTicket.status === 'open' ? 'pending' : selectedTicket.status,
      updatedAt: new Date().toISOString()
    };
    
    setSelectedTicket(updatedTicket);
    
    const updatedTickets = tickets.map(ticket => 
      ticket.id === selectedTicket.id ? updatedTicket : ticket
    );
    
    setTickets(updatedTickets);
    setNewMessage('');
    
    toast({
      title: "Mensagem enviada",
      description: "Sua resposta foi enviada para o cliente.",
    });
  };
  
  const handleToggleSupportEnabled = (ticketId: string) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return { 
          ...ticket, 
          supportEnabled: !ticket.supportEnabled,
          updatedAt: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    if (selectedTicket && selectedTicket.id === ticketId) {
      setSelectedTicket({
        ...selectedTicket,
        supportEnabled: !selectedTicket.supportEnabled,
        updatedAt: new Date().toISOString()
      });
    }
    
    const ticket = tickets.find(t => t.id === ticketId);
    
    toast({
      title: ticket?.supportEnabled ? "Suporte desativado" : "Suporte ativado",
      description: `O suporte para ${ticket?.companyName} foi ${ticket?.supportEnabled ? 'desativado' : 'ativado'}.`,
    });
  };
  
  const handleUpdateSupportSettings = () => {
    setIsSettingsOpen(false);
    
    toast({
      title: "Configurações salvas",
      description: "As configurações de suporte foram atualizadas com sucesso.",
    });
  };
  
  const handleUpdateSupportPlan = (planId: number, field: keyof SupportPlan, value: any) => {
    const updatedPlans = supportPlans.map(plan => {
      if (plan.id === planId) {
        return { ...plan, [field]: value };
      }
      return plan;
    });
    
    setSupportPlans(updatedPlans);
    
    toast({
      title: "Plano atualizado",
      description: "As configurações do plano de suporte foram atualizadas.",
    });
  };
  
  // Utility functions
  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Aberto';
      case 'pending': return 'Pendente';
      case 'resolved': return 'Resolvido';
      case 'closed': return 'Fechado';
      default: return status;
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'resolved': return 'bg-green-500';
      case 'closed': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };
  
  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'low': return 'Baixa';
      case 'medium': return 'Média';
      case 'high': return 'Alta';
      case 'urgent': return 'Urgente';
      default: return priority;
    }
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'border-green-500 text-green-500';
      case 'medium': return 'border-blue-500 text-blue-500';
      case 'high': return 'border-amber-500 text-amber-500';
      case 'urgent': return 'border-red-500 text-red-500';
      default: return 'border-gray-500 text-gray-500';
    }
  };
  
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'technical':
        return <Settings className="h-4 w-4 text-blue-500" />;
      case 'billing':
        return <CreditCard className="h-4 w-4 text-amber-500" />;
      case 'access':
        return <User className="h-4 w-4 text-green-500" />;
      case 'feature':
        return <Package className="h-4 w-4 text-purple-500" />;
      case 'other':
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const getCategoryText = (category: string) => {
    switch (category) {
      case 'technical': return 'Técnico';
      case 'billing': return 'Faturamento';
      case 'access': return 'Acesso';
      case 'feature': return 'Funcionalidade';
      case 'other': return 'Outros';
      default: return category;
    }
  };
  
  const getAgentStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-amber-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };
  
  const formatRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return `Hoje às ${format(date, 'HH:mm')}`;
    } else if (isYesterday(date)) {
      return `Ontem às ${format(date, 'HH:mm')}`;
    } else {
      const daysAgo = differenceInDays(new Date(), date);
      if (daysAgo < 7) {
        return `${daysAgo} dias atrás`;
      } else {
        return format(date, "dd/MM/yyyy 'às' HH:mm");
      }
    }
  };
  
  const getFilteredTickets = () => {
    return tickets.filter(ticket => {
      // Apply search filter
      const matchesSearch = 
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.companyName.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Apply status filter
      const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
      
      // Apply priority filter
      const matchesPriority = priorityFilter === 'all' || ticket.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  };
  
  return (
    <PageContainer>
      <PageHeader 
        title="Suporte" 
        description="Gerencie o suporte ao cliente e acompanhe tickets" 
      />
      
      <div className="space-y-6">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <Tabs 
            defaultValue="tickets" 
            value={activeTab} 
            onValueChange={setActiveTab}
            className="w-full sm:w-auto"
          >
            <TabsList>
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="agents">Atendentes</TabsTrigger>
              <TabsTrigger value="plans">Planos de Suporte</TabsTrigger>
              <TabsTrigger value="metrics">Métricas</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar tickets..."
                className="pl-8 w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
              <Settings className="mr-2 h-4 w-4" />
              Configurações
            </Button>
          </div>
        </div>
        
        <TabsContent value="tickets" className="mt-0 space-y-6">
          <div className="flex flex-wrap gap-4 justify-between items-center">
            <div className="flex flex-wrap gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {statusFilter === 'all' ? 'Todos' : getStatusText(statusFilter)}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter('all')}>
                    Todos
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('open')}>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor('open')}`}></div>
                      Aberto
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('pending')}>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor('pending')}`}></div>
                      Pendente
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('resolved')}>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor('resolved')}`}></div>
                      Resolvido
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter('closed')}>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${getStatusColor('closed')}`}></div>
                      Fechado
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Prioridade: {priorityFilter === 'all' ? 'Todas' : getPriorityText(priorityFilter)}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setPriorityFilter('all')}>
                    Todas
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter('low')}>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full bg-green-500`}></div>
                      Baixa
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter('medium')}>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full bg-blue-500`}></div>
                      Média
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter('high')}>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full bg-amber-500`}></div>
                      Alta
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPriorityFilter('urgent')}>
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full bg-red-500`}></div>
                      Urgente
                    </div>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Tickets de Suporte</CardTitle>
              <CardDescription>
                Gerencie tickets de suporte e atendimento ao cliente
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Assunto</TableHead>
                      <TableHead>Empresa</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Prioridade</TableHead>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Atribuído</TableHead>
                      <TableHead>Última Atualização</TableHead>
                      <TableHead>Suporte</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredTickets().length > 0 ? (
                      getFilteredTickets().map((ticket) => (
                        <TableRow key={ticket.id}>
                          <TableCell className="font-medium">{ticket.id}</TableCell>
                          <TableCell>{ticket.subject}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline">{ticket.plan}</Badge>
                              {ticket.companyName}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div className={`h-2 w-2 rounded-full ${getStatusColor(ticket.status)}`}></div>
                              {getStatusText(ticket.status)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={getPriorityColor(ticket.priority)}>
                              {getPriorityText(ticket.priority)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getCategoryIcon(ticket.category)}
                              <span className="text-xs">{getCategoryText(ticket.category)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {ticket.assignedTo ? (
                              <span className="text-xs">{ticket.assignedTo}</span>
                            ) : (
                              <Badge variant="outline" className="text-xs">Não atribuído</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4 text-muted-foreground" />
                              <span className="text-xs">{formatRelativeTime(ticket.updatedAt)}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Switch
                              checked={ticket.supportEnabled}
                              onCheckedChange={() => handleToggleSupportEnabled(ticket.id)}
                            />
                          </TableCell>
                          <TableCell className="text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleOpenTicketDetails(ticket)}
                            >
                              <MessageCircle className="h-4 w-4 text-primary" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={10} className="h-24 text-center">
                          <div className="flex flex-col items-center justify-center">
                            <HeadphonesIcon className="h-8 w-8 text-muted-foreground mb-2" />
                            <p className="text-muted-foreground">Nenhum ticket encontrado.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="agents" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {agents.map((agent) => (
              <Card key={agent.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar>
                          {agent.avatar ? (
                            <AvatarImage src={agent.avatar} alt={agent.name} />
                          ) : (
                            <AvatarFallback>
                              {agent.name.substring(0, 2).toUpperCase()}
                            </AvatarFallback>
                          )}
                        </Avatar>
                        <div 
                          className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getAgentStatusColor(agent.status)}`}
                        ></div>
                      </div>
                      <div>
                        <CardTitle className="text-base">{agent.name}</CardTitle>
                        <CardDescription className="text-xs">{agent.email}</CardDescription>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {agent.role === 'agent' ? 'Agente' : 
                       agent.role === 'supervisor' ? 'Supervisor' : 'Admin'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <div className="flex items-center gap-1 mt-1">
                        <div className={`h-2 w-2 rounded-full ${getAgentStatusColor(agent.status)}`}></div>
                        <span>
                          {agent.status === 'online' ? 'Online' : 
                           agent.status === 'away' ? 'Ausente' : 'Offline'}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Tickets Ativos</p>
                      <p className="font-semibold mt-1">{agent.activeTickets}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground">Tickets Resolvidos Hoje</p>
                      <p className="font-semibold mt-1">{agent.resolvedToday}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t mt-2 pt-3">
                  <Badge variant={agent.status === 'online' ? 'default' : 'secondary'}>
                    {agent.activeTickets > 0 ? `${agent.activeTickets} tickets ativos` : 'Disponível'}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="plans" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Planos de Suporte</CardTitle>
              <CardDescription>
                Configure os detalhes de suporte para cada plano
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Plano</TableHead>
                    <TableHead>Tempo de Resposta</TableHead>
                    <TableHead>Canais</TableHead>
                    <TableHead>Customização</TableHead>
                    <TableHead>Atendente Dedicado</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {supportPlans.map((plan) => (
                    <TableRow key={plan.id}>
                      <TableCell className="font-medium">{plan.planName}</TableCell>
                      <TableCell>
                        <Input
                          value={plan.response}
                          onChange={(e) => handleUpdateSupportPlan(plan.id, 'response', e.target.value)}
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {plan.channels.map((channel, index) => (
                            <Badge key={index} variant="outline">
                              {channel}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={plan.customization}
                          onCheckedChange={(checked) => 
                            handleUpdateSupportPlan(plan.id, 'customization', checked)
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <Switch
                          checked={plan.dedicated}
                          onCheckedChange={(checked) => 
                            handleUpdateSupportPlan(plan.id, 'dedicated', checked)
                          }
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics" className="mt-0 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{metric.metric}</CardTitle>
                  <CardDescription>
                    Últimas {metric.period === 'day' ? '24 horas' : 
                             metric.period === 'week' ? '7 dias' : '30 dias'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-end justify-between">
                    <div className="text-3xl font-bold">
                      {metric.metric.includes('Tempo') ? `${metric.value}h` : 
                       metric.metric.includes('Satisfação') ? `${metric.value}%` : 
                       metric.value}
                    </div>
                    <div className={`flex items-center text-sm ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change >= 0 ? (
                        <CheckCircle className="h-4 w-4 mr-1" />
                      ) : (
                        <AlertCircle className="h-4 w-4 mr-1" />
                      )}
                      {metric.change >= 0 ? '+' : ''}{metric.change}
                      {metric.metric.includes('Tempo') ? 'h' : 
                       metric.metric.includes('Satisfação') ? '%' : ''}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Desempenho do Suporte</CardTitle>
              <CardDescription>
                Visão geral de indicadores de suporte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Tempos de Atendimento (média)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-muted-foreground mb-1">Primeira Resposta</div>
                      <div className="text-2xl font-bold">2.5 horas</div>
                      <div className="text-xs text-green-500 mt-1">-15% vs. mês anterior</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-muted-foreground mb-1">Resolução</div>
                      <div className="text-2xl font-bold">12.7 horas</div>
                      <div className="text-xs text-green-500 mt-1">-8% vs. mês anterior</div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="text-muted-foreground mb-1">Taxa de Resolução na 1ª Resposta</div>
                      <div className="text-2xl font-bold">43%</div>
                      <div className="text-xs text-green-500 mt-1">+5% vs. mês anterior</div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Distribuição por Categoria</h3>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Settings className="h-4 w-4 text-blue-500" />
                        <span>Técnico</span>
                      </div>
                      <div className="text-2xl font-bold">42%</div>
                      <div className="w-full h-2 bg-muted-foreground/20 rounded-full mt-2">
                        <div className="h-2 bg-blue-500 rounded-full" style={{ width: '42%' }}></div>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <CreditCard className="h-4 w-4 text-amber-500" />
                        <span>Faturamento</span>
                      </div>
                      <div className="text-2xl font-bold">18%</div>
                      <div className="w-full h-2 bg-muted-foreground/20 rounded-full mt-2">
                        <div className="h-2 bg-amber-500 rounded-full" style={{ width: '18%' }}></div>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <User className="h-4 w-4 text-green-500" />
                        <span>Acesso</span>
                      </div>
                      <div className="text-2xl font-bold">25%</div>
                      <div className="w-full h-2 bg-muted-foreground/20 rounded-full mt-2">
                        <div className="h-2 bg-green-500 rounded-full" style={{ width: '25%' }}></div>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Package className="h-4 w-4 text-purple-500" />
                        <span>Funcionalidade</span>
                      </div>
                      <div className="text-2xl font-bold">12%</div>
                      <div className="w-full h-2 bg-muted-foreground/20 rounded-full mt-2">
                        <div className="h-2 bg-purple-500 rounded-full" style={{ width: '12%' }}></div>
                      </div>
                    </div>
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <Info className="h-4 w-4 text-gray-500" />
                        <span>Outros</span>
                      </div>
                      <div className="text-2xl font-bold">3%</div>
                      <div className="w-full h-2 bg-muted-foreground/20 rounded-full mt-2">
                        <div className="h-2 bg-gray-500 rounded-full" style={{ width: '3%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Ticket Details Dialog */}
        {selectedTicket && (
          <Dialog open={isTicketDetailsOpen} onOpenChange={setIsTicketDetailsOpen}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-hidden flex flex-col">
              <DialogHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <DialogTitle>
                      <div className="flex items-center gap-2">
                        {selectedTicket.id} - {selectedTicket.subject}
                        <Badge 
                          variant="outline" 
                          className={getPriorityColor(selectedTicket.priority)}
                        >
                          {getPriorityText(selectedTicket.priority)}
                        </Badge>
                      </div>
                    </DialogTitle>
                    <DialogDescription className="flex items-center gap-2 mt-1">
                      <div className="flex items-center gap-1">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(selectedTicket.status)}`}></div>
                        {getStatusText(selectedTicket.status)}
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        {getCategoryIcon(selectedTicket.category)}
                        {getCategoryText(selectedTicket.category)}
                      </div>
                      <span>•</span>
                      <div>
                        <Badge>
                          {selectedTicket.plan === 'basic' ? 'Básico' : 
                           selectedTicket.plan === 'pro' ? 'Pro' : 'Enterprise'}
                        </Badge>
                      </div>
                    </DialogDescription>
                  </div>
                  <div>
                    <Switch
                      checked={selectedTicket.supportEnabled}
                      onCheckedChange={() => handleToggleSupportEnabled(selectedTicket.id)}
                    />
                    <span className="text-xs ml-2">
                      {selectedTicket.supportEnabled ? 'Suporte ativo' : 'Suporte desativado'}
                    </span>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="grid grid-cols-3 gap-4 py-4">
                <div className="col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-sm font-medium">Detalhes</h3>
                  </div>
                  <div className="bg-muted p-3 rounded-md text-sm">
                    <p>{selectedTicket.description}</p>
                  </div>
                </div>
                
                <div>
                  <div className="mb-2">
                    <h3 className="text-sm font-medium">Informações</h3>
                  </div>
                  <div className="text-sm space-y-2">
                    <div>
                      <p className="text-muted-foreground">Empresa</p>
                      <p className="font-medium">{selectedTicket.companyName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Criado em</p>
                      <p>{format(new Date(selectedTicket.createdAt), "dd/MM/yyyy 'às' HH:mm")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Última atualização</p>
                      <p>{format(new Date(selectedTicket.updatedAt), "dd/MM/yyyy 'às' HH:mm")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Atribuído a</p>
                      <div className="flex justify-between items-center">
                        <p>{selectedTicket.assignedTo || 'Não atribuído'}</p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <ChevronDown className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            <DropdownMenuLabel>Atribuir Para</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {agents.map((agent) => (
                              <DropdownMenuItem
                                key={agent.id}
                                onClick={() => handleAssignTicket(selectedTicket.id, agent.name)}
                              >
                                <div className="flex items-center gap-2">
                                  <div className={`h-2 w-2 rounded-full ${getAgentStatusColor(agent.status)}`}></div>
                                  {agent.name}
                                </div>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex-1 overflow-hidden py-4">
                <h3 className="text-sm font-medium mb-3">Histórico de Mensagens</h3>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {selectedTicket.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'customer' ? 'justify-start' : 'justify-end'}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg p-3 ${
                            message.sender === 'customer'
                              ? 'bg-muted text-foreground'
                              : 'bg-primary text-primary-foreground'
                          }`}
                        >
                          <div className="flex justify-between items-center mb-1">
                            <p className="text-xs font-medium">
                              {message.senderName}
                            </p>
                            <p className="text-xs opacity-70">
                              {format(new Date(message.timestamp), "HH:mm")}
                            </p>
                          </div>
                          <p className="text-sm">{message.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>
              
              <div className="pt-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Digite sua resposta..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>Enviar</Button>
                </div>
              </div>
              
              <DialogFooter className="flex justify-between items-center mt-4">
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        <div className={`h-2 w-2 rounded-full ${getStatusColor(selectedTicket.status)} mr-2`}></div>
                        {getStatusText(selectedTicket.status)}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleChangeTicketStatus(selectedTicket.id, 'open')}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor('open')}`}></div>
                          Aberto
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeTicketStatus(selectedTicket.id, 'pending')}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor('pending')}`}></div>
                          Pendente
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeTicketStatus(selectedTicket.id, 'resolved')}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor('resolved')}`}></div>
                          Resolvido
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeTicketStatus(selectedTicket.id, 'closed')}>
                        <div className="flex items-center gap-2">
                          <div className={`h-2 w-2 rounded-full ${getStatusColor('closed')}`}></div>
                          Fechado
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm">
                        Prioridade: {getPriorityText(selectedTicket.priority)}
                        <ChevronDown className="h-4 w-4 ml-2" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => handleChangeTicketPriority(selectedTicket.id, 'low')}>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          Baixa
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeTicketPriority(selectedTicket.id, 'medium')}>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                          Média
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeTicketPriority(selectedTicket.id, 'high')}>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-amber-500"></div>
                          Alta
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleChangeTicketPriority(selectedTicket.id, 'urgent')}>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          Urgente
                        </div>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <div>
                  <Button variant="outline" onClick={() => setIsTicketDetailsOpen(false)}>
                    Fechar
                  </Button>
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
        
        {/* Support Settings Dialog */}
        <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Configurações de Suporte</DialogTitle>
              <DialogDescription>
                Configure as preferências gerais do sistema de suporte
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Notificações por Email</Label>
                  <p className="text-sm text-muted-foreground">
                    Enviar notificações por email para novos tickets e atualizações
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={supportSettings.enableEmailNotifications}
                  onCheckedChange={(checked) => 
                    setSupportSettings({ ...supportSettings, enableEmailNotifications: checked })
                  }
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="auto-assignment">Atribuição Automática</Label>
                  <p className="text-sm text-muted-foreground">
                    Atribuir tickets automaticamente aos agentes disponíveis
                  </p>
                </div>
                <Switch
                  id="auto-assignment"
                  checked={supportSettings.enableAutoAssignment}
                  onCheckedChange={(checked) => 
                    setSupportSettings({ ...supportSettings, enableAutoAssignment: checked })
                  }
                />
              </div>
              
              <div>
                <Label htmlFor="default-response">Resposta Padrão</Label>
                <Input
                  id="default-response"
                  value={supportSettings.defaultResponseTime}
                  onChange={(e) => 
                    setSupportSettings({ ...supportSettings, defaultResponseTime: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="working-hours">Horário de Trabalho</Label>
                  <Input
                    id="working-hours"
                    value={supportSettings.workingHours}
                    onChange={(e) => 
                      setSupportSettings({ ...supportSettings, workingHours: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="working-days">Dias de Trabalho</Label>
                  <Input
                    id="working-days"
                    value={supportSettings.workingDays}
                    onChange={(e) => 
                      setSupportSettings({ ...supportSettings, workingDays: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="holidays">Feriados (separados por vírgula)</Label>
                <Input
                  id="holidays"
                  value={supportSettings.holidays.join(', ')}
                  onChange={(e) => 
                    setSupportSettings({ 
                      ...supportSettings, 
                      holidays: e.target.value.split(',').map(d => d.trim()) 
                    })
                  }
                  className="mt-1"
                />
              </div>
              
              <div>
                <Label htmlFor="auto-close">Fechar Automaticamente Após (dias)</Label>
                <Input
                  id="auto-close"
                  type="number"
                  min="1"
                  value={supportSettings.autoCloseAfterDays}
                  onChange={(e) => 
                    setSupportSettings({ 
                      ...supportSettings, 
                      autoCloseAfterDays: parseInt(e.target.value) || 5
                    })
                  }
                  className="mt-1"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleUpdateSupportSettings}>
                <Settings className="mr-2 h-4 w-4" />
                Salvar Configurações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageContainer>
  );
};

export default Support;
