
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { 
  Home, 
  BarChart2, 
  Target, 
  BookOpen,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Calendar,
  Edit,
  Settings,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useSubscription } from '@/contexts/SubscriptionContext';
import AppearanceSettings from '@/components/settings/AppearanceSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { currentPlan } = useSubscription();
  const [activeTab, setActiveTab] = useState('company');
  const [isEditing, setIsEditing] = useState(false);
  
  const companyName = localStorage.getItem('companyName') || 'EntrepreEdge';
  const businessType = localStorage.getItem('businessType') || 'Comércio varejista';
  const userEmail = localStorage.getItem('userEmail') || 'usuario@exemplo.com';
  const logoUrl = localStorage.getItem('logoUrl') || '';
  const primaryColor = localStorage.getItem('primaryColor') || '#8B5CF6';
  const secondaryColor = localStorage.getItem('secondaryColor') || '#D946EF';
  
  const [formData, setFormData] = useState({
    companyName: companyName,
    businessType: businessType,
    email: userEmail,
    phone: localStorage.getItem('phone') || '(11) 98765-4321',
    address: localStorage.getItem('address') || 'Rua das Empresas, 123',
    city: localStorage.getItem('city') || 'São Paulo',
    state: localStorage.getItem('state') || 'SP',
    website: localStorage.getItem('website') || 'www.minhaempresa.com.br',
    foundedYear: localStorage.getItem('foundedYear') || '2020',
    employees: localStorage.getItem('employees') || '5-10',
    description: localStorage.getItem('description') || 'Empresa especializada em soluções para empreendedores e pequenos negócios.'
  });
  
  // Apply theme colors when component loads
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-color', primaryColor);
    document.documentElement.style.setProperty('--secondary-color', secondaryColor);
  }, [primaryColor, secondaryColor]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    // Save all form data to localStorage
    localStorage.setItem('companyName', formData.companyName);
    localStorage.setItem('businessType', formData.businessType);
    localStorage.setItem('userEmail', formData.email);
    localStorage.setItem('phone', formData.phone);
    localStorage.setItem('address', formData.address);
    localStorage.setItem('city', formData.city);
    localStorage.setItem('state', formData.state);
    localStorage.setItem('website', formData.website);
    localStorage.setItem('foundedYear', formData.foundedYear);
    localStorage.setItem('employees', formData.employees);
    localStorage.setItem('description', formData.description);
    
    setIsEditing(false);
    toast({
      title: "Perfil atualizado",
      description: "As informações da empresa foram atualizadas com sucesso.",
    });
    
    // Update document title
    document.title = `${formData.companyName} - Painel de Controle`;
  };
  
  const handlePlanManagement = () => {
    navigate('/settings?tab=subscription');
  };
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Finanças',
      href: '/finances',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Metas',
      href: '/goals',
      icon: <Target size={18} />
    },
    {
      name: 'Aprendizado',
      href: '/learn',
      icon: <BookOpen size={18} />
    },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-1">Perfil e Configurações</h1>
            <p className="text-sm text-muted-foreground">
              Gerencie as informações da sua empresa e configurações do sistema
            </p>
          </div>
          
          <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="glass mb-6 grid grid-cols-2 sm:grid-cols-4 md:flex md:flex-wrap">
              <TabsTrigger value="company">Perfil da Empresa</TabsTrigger>
              <TabsTrigger value="user">Usuário</TabsTrigger>
              <TabsTrigger value="preferences">Preferências</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="company">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 glass">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Dados da Empresa</CardTitle>
                      <CardDescription>
                        Informações principais da sua empresa
                      </CardDescription>
                    </div>
                    <Button 
                      variant={isEditing ? "default" : "outline"} 
                      size="sm"
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                      {isEditing ? "Salvar" : "Editar"}
                      {!isEditing && <Edit className="ml-2" size={16} />}
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {isEditing ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="companyName">Nome da Empresa</Label>
                          <Input 
                            id="companyName" 
                            name="companyName" 
                            value={formData.companyName} 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="businessType">Tipo de Negócio</Label>
                          <Input 
                            id="businessType" 
                            name="businessType" 
                            value={formData.businessType} 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email para Contato</Label>
                          <Input 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Telefone</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Endereço</Label>
                          <Input 
                            id="address" 
                            name="address" 
                            value={formData.address} 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="city">Cidade</Label>
                          <Input 
                            id="city" 
                            name="city" 
                            value={formData.city} 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="state">Estado</Label>
                          <Input 
                            id="state" 
                            name="state" 
                            value={formData.state} 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="website">Website</Label>
                          <Input 
                            id="website" 
                            name="website" 
                            value={formData.website} 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="foundedYear">Ano de Fundação</Label>
                          <Input 
                            id="foundedYear" 
                            name="foundedYear" 
                            value={formData.foundedYear} 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="employees">Número de Funcionários</Label>
                          <Input 
                            id="employees" 
                            name="employees" 
                            value={formData.employees} 
                            onChange={handleChange}
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="description">Descrição da Empresa</Label>
                          <Input 
                            id="description" 
                            name="description" 
                            value={formData.description} 
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Informações Básicas</h3>
                            <dl className="space-y-2">
                              <div className="flex justify-between">
                                <dt className="font-medium">Nome:</dt>
                                <dd>{formData.companyName}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Tipo de Negócio:</dt>
                                <dd>{formData.businessType}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Fundada em:</dt>
                                <dd>{formData.foundedYear}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Funcionários:</dt>
                                <dd>{formData.employees}</dd>
                              </div>
                            </dl>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">Contato</h3>
                            <dl className="space-y-2">
                              <div className="flex justify-between">
                                <dt className="font-medium">Email:</dt>
                                <dd>{formData.email}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Telefone:</dt>
                                <dd>{formData.phone}</dd>
                              </div>
                              <div className="flex justify-between">
                                <dt className="font-medium">Website:</dt>
                                <dd>{formData.website}</dd>
                              </div>
                            </dl>
                          </div>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Localização</h3>
                          <dl className="space-y-2">
                            <div className="flex justify-between">
                              <dt className="font-medium">Endereço:</dt>
                              <dd>{formData.address}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="font-medium">Cidade:</dt>
                              <dd>{formData.city}</dd>
                            </div>
                            <div className="flex justify-between">
                              <dt className="font-medium">Estado:</dt>
                              <dd>{formData.state}</dd>
                            </div>
                          </dl>
                        </div>
                        
                        <Separator />
                        
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground mb-2">Descrição</h3>
                          <p className="text-sm">{formData.description}</p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                <div className="space-y-6">
                  <Card className="glass">
                    <CardHeader className="pb-2">
                      <CardTitle>Perfil da Empresa</CardTitle>
                      <CardDescription>
                        Como sua empresa é exibida no sistema
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center text-center">
                      <Avatar className="h-24 w-24 mb-4">
                        {logoUrl ? (
                          <AvatarImage src={logoUrl} alt={companyName} />
                        ) : (
                          <AvatarFallback className="text-2xl bg-primary/20">
                            {companyName.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        )}
                      </Avatar>
                      <h3 className="font-bold text-xl mb-1">{companyName}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{businessType}</p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={() => navigate('/settings?tab=preferences')}
                      >
                        Alterar logo e cores
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="glass">
                    <CardHeader className="pb-2">
                      <CardTitle>Plano Atual</CardTitle>
                      <CardDescription>
                        Informações do seu plano
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">Plano:</span>
                          <span className="font-bold text-primary">
                            {currentPlan === 'free' ? 'Gratuito' : 
                             currentPlan === 'starter' ? 'Iniciante' :
                             currentPlan === 'business' ? 'Empresarial' : 'Premium'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Status:</span>
                          <span className="text-green-600 font-medium">Ativo</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-medium">Próximo pagamento:</span>
                          <span>15/06/2023</span>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="w-full mt-4"
                          onClick={handlePlanManagement}
                        >
                          Gerenciar plano
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="user">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Perfil do Usuário</CardTitle>
                  <CardDescription>
                    Gerencie suas informações pessoais e preferências
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1 flex flex-col items-center">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src="" alt="Usuário" />
                        <AvatarFallback className="text-2xl bg-primary/20">
                          <User size={32} />
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-bold text-lg mb-1">Usuário Admin</h3>
                      <p className="text-muted-foreground text-sm mb-4">{userEmail}</p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Atualizar foto
                      </Button>
                    </div>
                    
                    <div className="md:col-span-2 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nome</Label>
                          <Input id="name" defaultValue="Admin" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="surname">Sobrenome</Label>
                          <Input id="surname" defaultValue="Usuário" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="userEmail">Email</Label>
                          <Input id="userEmail" defaultValue={userEmail} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="userPhone">Telefone</Label>
                          <Input id="userPhone" defaultValue="(11) 98765-4321" />
                        </div>
                      </div>
                      
                      <Separator />
                      
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium mb-2">Segurança</h3>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate('/settings?tab=security')}
                          >
                            Alterar senha
                          </Button>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-2">Sessões ativas</h3>
                          <div className="text-sm text-muted-foreground">
                            <p>Chrome em Windows - São Paulo, Brasil</p>
                            <p className="text-xs mt-1">Ativo agora</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button>Salvar alterações</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="preferences">
              <AppearanceSettings />
            </TabsContent>
            
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Profile;
