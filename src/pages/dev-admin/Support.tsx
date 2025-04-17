
import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  MessageSquare, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Filter, 
  Calendar, 
  BarChart, 
  HeartHandshake, 
  CreditCard as CreditCardIcon, 
  Users, 
  Search 
} from 'lucide-react';

const Support = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("tickets");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "medium",
    category: "account",
  });

  // Sample support tickets data
  const [tickets, setTickets] = useState([
    {
      id: "TCK-001",
      subject: "Problema de login no sistema",
      customer: "Empresa ABC Ltda",
      status: "open",
      priority: "high",
      category: "account",
      createdAt: "2024-04-10T14:30:00",
      lastUpdate: "2024-04-10T16:45:00",
      messages: [
        {
          id: "MSG-001",
          sender: "customer",
          content: "Não consigo fazer login no sistema desde ontem. A mensagem diz 'Credenciais inválidas' mesmo tendo certeza que a senha está correta.",
          timestamp: "2024-04-10T14:30:00",
        },
        {
          id: "MSG-002",
          sender: "support",
          content: "Olá, verifiquei seu caso e parece que houve uma tentativa de acesso com muitas falhas. Por segurança, o sistema bloqueou temporariamente o acesso. Acabei de desbloquear, por favor tente novamente e me informe se conseguiu acessar.",
          timestamp: "2024-04-10T16:45:00",
        }
      ],
      assignedTo: "Suporte Técnico",
      plan: "business"
    },
    {
      id: "TCK-002",
      subject: "Solicitação de nova funcionalidade",
      customer: "Distribuidora XYZ",
      status: "waiting",
      priority: "medium",
      category: "feature",
      createdAt: "2024-04-08T09:15:00",
      lastUpdate: "2024-04-09T11:20:00",
      messages: [
        {
          id: "MSG-003",
          sender: "customer",
          content: "Gostaria de solicitar uma funcionalidade para importação em lote de produtos a partir de uma planilha Excel. Isso ajudaria muito nossa equipe de cadastro.",
          timestamp: "2024-04-08T09:15:00",
        },
        {
          id: "MSG-004",
          sender: "support",
          content: "Obrigado pela sugestão! Encaminhei para nossa equipe de produto avaliar a possibilidade de incluir essa funcionalidade em versões futuras. Assim que tivermos novidades, atualizaremos este ticket.",
          timestamp: "2024-04-09T11:20:00",
        }
      ],
      assignedTo: "Gerente de Produto",
      plan: "premium"
    },
    {
      id: "TCK-003",
      subject: "Relatório financeiro com valores incorretos",
      customer: "Consultoria Financeira Ltda",
      status: "closed",
      priority: "critical",
      category: "bug",
      createdAt: "2024-04-05T16:20:00",
      lastUpdate: "2024-04-07T10:35:00",
      messages: [
        {
          id: "MSG-005",
          sender: "customer",
          content: "O relatório de fluxo de caixa está apresentando valores incorretos para transações parceladas. Os valores futuros não estão sendo considerados corretamente.",
          timestamp: "2024-04-05T16:20:00",
        },
        {
          id: "MSG-006",
          sender: "support",
          content: "Identificamos o problema e nossa equipe de desenvolvimento já está trabalhando na correção. Estamos dando prioridade máxima a este caso.",
          timestamp: "2024-04-06T09:10:00",
        },
        {
          id: "MSG-007",
          sender: "support",
          content: "Gostaríamos de informar que o problema foi corrigido na versão 2.3.5 que acabou de ser lançada. Por favor, atualize o sistema e verifique se os relatórios estão corretos agora.",
          timestamp: "2024-04-07T10:35:00",
        }
      ],
      assignedTo: "Desenvolvimento",
      plan: "premium"
    },
    {
      id: "TCK-004",
      subject: "Dúvida sobre integração com API",
      customer: "Tech Solutions SA",
      status: "open",
      priority: "low",
      category: "question",
      createdAt: "2024-04-12T11:05:00",
      lastUpdate: "2024-04-12T11:05:00",
      messages: [
        {
          id: "MSG-008",
          sender: "customer",
          content: "Estamos tentando integrar nosso sistema com sua API REST, mas temos dúvidas sobre a autenticação. A documentação menciona tokens JWT, mas não explica como obter o token inicial. Podem nos ajudar?",
          timestamp: "2024-04-12T11:05:00",
        }
      ],
      assignedTo: "Não atribuído",
      plan: "business"
    },
  ]);

  // Sample customer data
  const customers = [
    {
      id: "CUST-001",
      name: "Empresa ABC Ltda",
      plan: "business",
      contactName: "Maria Silva",
      contactEmail: "maria@empresaabc.com",
      contactPhone: "(11) 98765-4321",
      supportHistory: [
        { ticketId: "TCK-001", date: "2024-04-10", status: "open" }
      ]
    },
    {
      id: "CUST-002",
      name: "Distribuidora XYZ",
      plan: "premium",
      contactName: "João Santos",
      contactEmail: "joao@distribuidoraxyz.com",
      contactPhone: "(21) 97654-3210",
      supportHistory: [
        { ticketId: "TCK-002", date: "2024-04-08", status: "waiting" }
      ]
    },
    {
      id: "CUST-003",
      name: "Consultoria Financeira Ltda",
      plan: "premium",
      contactName: "Ana Oliveira",
      contactEmail: "ana@consultoriafinanceira.com",
      contactPhone: "(31) 96543-2109",
      supportHistory: [
        { ticketId: "TCK-003", date: "2024-04-05", status: "closed" }
      ]
    },
    {
      id: "CUST-004",
      name: "Tech Solutions SA",
      plan: "business",
      contactName: "Carlos Mendes",
      contactEmail: "carlos@techsolutions.com",
      contactPhone: "(41) 95432-1098",
      supportHistory: [
        { ticketId: "TCK-004", date: "2024-04-12", status: "open" }
      ]
    }
  ];

  // Sample support metrics
  const supportMetrics = {
    ticketsByStatus: {
      open: 2,
      waiting: 1,
      closed: 1
    },
    ticketsByPriority: {
      low: 1,
      medium: 1,
      high: 1,
      critical: 1
    },
    averageResponseTime: "1h 45min",
    averageResolutionTime: "28h 15min",
    customerSatisfaction: 4.7,
    ticketsThisMonth: 12,
    ticketsLastMonth: 18
  };

  // Filtered tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = searchQuery === "" || 
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Handle creating a new ticket
  const handleCreateTicket = () => {
    if (!newTicket.subject || !newTicket.description) {
      toast({
        title: "Informações incompletas",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const ticketId = `TCK-${(tickets.length + 1).toString().padStart(3, '0')}`;
    const now = new Date().toISOString();
    
    const newTicketObj = {
      id: ticketId,
      subject: newTicket.subject,
      customer: "Empresa Teste (Simulação)",
      status: "open",
      priority: newTicket.priority,
      category: newTicket.category,
      createdAt: now,
      lastUpdate: now,
      messages: [
        {
          id: `MSG-${Math.floor(Math.random() * 1000)}`,
          sender: "customer",
          content: newTicket.description,
          timestamp: now,
        }
      ],
      assignedTo: "Não atribuído",
      plan: "business"
    };
    
    setTickets([newTicketObj, ...tickets]);
    setIsCreateTicketOpen(false);
    setNewTicket({
      subject: "",
      description: "",
      priority: "medium",
      category: "account",
    });
    
    toast({
      title: "Ticket criado",
      description: `O ticket ${ticketId} foi criado com sucesso.`,
    });
  };

  // Handle ticket status change
  const handleStatusChange = (ticketId, newStatus) => {
    const updatedTickets = tickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
          lastUpdate: new Date().toISOString()
        };
      }
      return ticket;
    });
    
    setTickets(updatedTickets);
    
    toast({
      title: "Status atualizado",
      description: `O status do ticket ${ticketId} foi alterado para ${
        newStatus === 'open' ? 'Aberto' :
        newStatus === 'waiting' ? 'Aguardando cliente' : 'Fechado'
      }.`,
    });
  };

  // Get status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'open':
        return <Badge variant="secondary">Aberto</Badge>;
      case 'waiting':
        return <Badge variant="outline">Aguardando</Badge>;
      case 'closed':
        return <Badge variant="default">Fechado</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Baixa</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Média</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Alta</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Crítica</Badge>;
      default:
        return <Badge>Desconhecida</Badge>;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  // Format time
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Central de Suporte"
        description="Gerencie tickets de suporte e atendimento ao cliente"
        actionButton={
          <Button onClick={() => setIsCreateTicketOpen(true)}>
            Novo Ticket
          </Button>
        }
      />

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tickets">
            <MessageSquare className="w-4 h-4 mr-2" />
            Tickets
          </TabsTrigger>
          <TabsTrigger value="customers">
            <Users className="w-4 h-4 mr-2" />
            Clientes
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart className="w-4 h-4 mr-2" />
            Análises
          </TabsTrigger>
        </TabsList>

        {/* Tickets Tab */}
        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Tickets de Suporte</CardTitle>
              <CardDescription>Visualize e gerencie todas as solicitações de suporte</CardDescription>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Buscar por ID, assunto ou cliente..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px]">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os status</SelectItem>
                    <SelectItem value="open">Abertos</SelectItem>
                    <SelectItem value="waiting">Aguardando</SelectItem>
                    <SelectItem value="closed">Fechados</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                  <SelectTrigger className="w-[180px]">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <SelectValue placeholder="Prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as prioridades</SelectItem>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="critical">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Assunto</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Prioridade</TableHead>
                    <TableHead>Última atualização</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length > 0 ? (
                    filteredTickets.map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-medium">{ticket.id}</TableCell>
                        <TableCell>{ticket.subject}</TableCell>
                        <TableCell>{ticket.customer}</TableCell>
                        <TableCell>{getStatusBadge(ticket.status)}</TableCell>
                        <TableCell>{getPriorityBadge(ticket.priority)}</TableCell>
                        <TableCell>
                          {formatDate(ticket.lastUpdate)} às {formatTime(ticket.lastUpdate)}
                        </TableCell>
                        <TableCell>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">Detalhes</Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle className="flex items-center gap-2">
                                  <span className="text-sm font-mono">{ticket.id}</span>
                                  <Separator orientation="vertical" className="h-4" />
                                  <span>{ticket.subject}</span>
                                </DialogTitle>
                                <DialogDescription>
                                  Cliente: {ticket.customer} | Plano: {ticket.plan.charAt(0).toUpperCase() + ticket.plan.slice(1)}
                                </DialogDescription>
                              </DialogHeader>
                              
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">Status:</span>
                                  {getStatusBadge(ticket.status)}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">Prioridade:</span>
                                  {getPriorityBadge(ticket.priority)}
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-medium">Atribuído para:</span>
                                  <span className="text-sm">{ticket.assignedTo}</span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2 mb-4">
                                <span className="text-sm font-medium">Criado em:</span>
                                <span className="text-sm">
                                  {formatDate(ticket.createdAt)} às {formatTime(ticket.createdAt)}
                                </span>
                              </div>
                              
                              <Separator className="my-4" />
                              
                              <div className="space-y-4 max-h-96 overflow-y-auto">
                                <h4 className="text-sm font-semibold">Histórico de mensagens</h4>
                                {ticket.messages.map((message) => (
                                  <div 
                                    key={message.id} 
                                    className={`p-3 rounded-lg ${
                                      message.sender === 'customer' 
                                        ? 'bg-muted ml-0 mr-12' 
                                        : 'bg-primary/10 ml-12 mr-0'
                                    }`}
                                  >
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-xs font-semibold">
                                        {message.sender === 'customer' ? 'Cliente' : 'Suporte'}
                                      </span>
                                      <span className="text-xs text-muted-foreground">
                                        {formatDate(message.timestamp)} às {formatTime(message.timestamp)}
                                      </span>
                                    </div>
                                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                                  </div>
                                ))}
                              </div>
                              
                              <Separator className="my-4" />
                              
                              <div className="flex flex-col gap-4">
                                <Textarea 
                                  placeholder="Digite sua resposta aqui..." 
                                  className="min-h-[100px]"
                                />
                                <div className="flex justify-between">
                                  <div className="space-x-2">
                                    {ticket.status !== 'closed' && (
                                      <Button
                                        variant="outline"
                                        onClick={() => handleStatusChange(ticket.id, 'closed')}
                                      >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Fechar ticket
                                      </Button>
                                    )}
                                    {ticket.status === 'open' && (
                                      <Button
                                        variant="outline"
                                        onClick={() => handleStatusChange(ticket.id, 'waiting')}
                                      >
                                        <Clock className="w-4 h-4 mr-2" />
                                        Aguardar cliente
                                      </Button>
                                    )}
                                    {ticket.status !== 'open' && (
                                      <Button
                                        variant="outline"
                                        onClick={() => handleStatusChange(ticket.id, 'open')}
                                      >
                                        <MessageSquare className="w-4 h-4 mr-2" />
                                        Reabrir ticket
                                      </Button>
                                    )}
                                  </div>
                                  <Button>
                                    Responder
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-4">
                        Nenhum ticket encontrado com os filtros selecionados.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>Clientes com Suporte Ativo</CardTitle>
              <CardDescription>Visualize e gerencie clientes que utilizam o suporte</CardDescription>
              
              <div className="relative flex-1 mt-4">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome, email ou ID do cliente..."
                  className="pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customers.map((customer) => (
                  <Card key={customer.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{customer.name}</CardTitle>
                      <CardDescription>{customer.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Plano:</span>
                          <Badge>{customer.plan.charAt(0).toUpperCase() + customer.plan.slice(1)}</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Contato:</span>
                          <span className="text-sm">{customer.contactName}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Email:</span>
                          <span className="text-sm">{customer.contactEmail}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Telefone:</span>
                          <span className="text-sm">{customer.contactPhone}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-4">
                      <span className="text-sm">
                        {customer.supportHistory.length} tickets no histórico
                      </span>
                      <Button variant="outline" size="sm">Ver histórico</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Distribuição por Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Abertos</span>
                    <span className="text-sm font-medium">{supportMetrics.ticketsByStatus.open}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Aguardando</span>
                    <span className="text-sm font-medium">{supportMetrics.ticketsByStatus.waiting}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Fechados</span>
                    <span className="text-sm font-medium">{supportMetrics.ticketsByStatus.closed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Tempo de Resposta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tempo médio de resposta</span>
                    <span className="text-sm font-medium">{supportMetrics.averageResponseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tempo médio de resolução</span>
                    <span className="text-sm font-medium">{supportMetrics.averageResolutionTime}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Satisfação do Cliente</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Avaliação média</span>
                  <span className="text-sm font-medium">{supportMetrics.customerSatisfaction}/5.0</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-primary h-2.5 rounded-full" 
                    style={{ width: `${(supportMetrics.customerSatisfaction / 5) * 100}%` }}
                  ></div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <HeartHandshake className="w-5 h-5 mr-2" />
                Relatório de Atendimento
              </CardTitle>
              <CardDescription>Visão geral dos tickets por período</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-medium">Período de análise:</span>
                    <Select defaultValue="month">
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Selecione..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">Última semana</SelectItem>
                        <SelectItem value="month">Último mês</SelectItem>
                        <SelectItem value="quarter">Último trimestre</SelectItem>
                        <SelectItem value="year">Último ano</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    Exportar relatório
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <CreditCardIcon className="w-8 h-8 mx-auto text-primary mb-2" />
                        <div className="text-2xl font-bold">{supportMetrics.ticketsThisMonth}</div>
                        <p className="text-xs text-muted-foreground">Tickets neste mês</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <MessageSquare className="w-8 h-8 mx-auto text-primary mb-2" />
                        <div className="text-2xl font-bold">{supportMetrics.ticketsLastMonth}</div>
                        <p className="text-xs text-muted-foreground">Tickets no mês anterior</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <Clock className="w-8 h-8 mx-auto text-primary mb-2" />
                        <div className="text-2xl font-bold">{supportMetrics.averageResponseTime}</div>
                        <p className="text-xs text-muted-foreground">Tempo médio de resposta</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <CheckCircle className="w-8 h-8 mx-auto text-primary mb-2" />
                        <div className="text-2xl font-bold">{supportMetrics.ticketsByStatus.closed}</div>
                        <p className="text-xs text-muted-foreground">Tickets resolvidos</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="border rounded-lg p-6 mt-4">
                  <div className="text-center text-muted-foreground">
                    <p>Gráfico de desempenho seria exibido aqui</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Ticket Dialog */}
      <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Criar Novo Ticket de Suporte</DialogTitle>
            <DialogDescription>
              Preencha as informações para abrir uma nova solicitação de suporte.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="subject">Assunto</Label>
              <Input 
                id="subject" 
                placeholder="Descreva brevemente o problema" 
                value={newTicket.subject}
                onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="description">Descrição detalhada</Label>
              <Textarea 
                id="description" 
                placeholder="Forneça todos os detalhes relevantes do problema" 
                className="min-h-[120px]"
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority">Prioridade</Label>
                <Select 
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Baixa</SelectItem>
                    <SelectItem value="medium">Média</SelectItem>
                    <SelectItem value="high">Alta</SelectItem>
                    <SelectItem value="critical">Crítica</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={newTicket.category}
                  onValueChange={(value) => setNewTicket({ ...newTicket, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione a categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="account">Conta/Acesso</SelectItem>
                    <SelectItem value="bug">Bug/Problema</SelectItem>
                    <SelectItem value="feature">Nova Funcionalidade</SelectItem>
                    <SelectItem value="question">Dúvida</SelectItem>
                    <SelectItem value="billing">Faturamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateTicketOpen(false)}>Cancelar</Button>
            <Button onClick={handleCreateTicket}>Criar Ticket</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageContainer>
  );
};

export default Support;
