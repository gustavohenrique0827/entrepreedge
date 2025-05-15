
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BusinessSegmentType, useSegment } from '@/contexts/SegmentContext';
import { Flame } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentSegment } = useSegment();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Register form state
  const [companyName, setCompanyName] = useState('');
  const [companyCnpj, setCompanyCnpj] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [segment, setSegment] = useState<BusinessSegmentType | ''>('');
  
  // Create test user on component mount if it doesn't exist
  useEffect(() => {
    // Check if test user already exists
    if (!localStorage.getItem('testUserCreated')) {
      // Create test user credentials
      localStorage.setItem('testEmail', 'teste@empresa.com');
      localStorage.setItem('testPassword', 'senha123');
      localStorage.setItem('testCompanyName', 'Empresa Teste LTDA');
      localStorage.setItem('testCompanyCnpj', '12.345.678/0001-90');
      localStorage.setItem('testUserCreated', 'true');
      
      // Set test credentials in the form for easy access
      setLoginEmail('teste@empresa.com');
      setLoginPassword('senha123');
      
      toast({
        title: "Usuário de teste criado",
        description: "Email: teste@empresa.com | Senha: senha123",
      });
    }
  }, [toast]);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate login validation
    if (!loginEmail || !loginPassword) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }
    
    // Check if it's the test user
    const isTestUser = loginEmail === localStorage.getItem('testEmail') && 
                       loginPassword === localStorage.getItem('testPassword');
                       
    if (isTestUser) {
      // Set logged in user data
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', loginEmail);
      localStorage.setItem('companyName', localStorage.getItem('testCompanyName') || '');
      localStorage.setItem('companyCnpj', localStorage.getItem('testCompanyCnpj') || '');
      localStorage.setItem('onboardingCompleted', 'true'); // Skip onboarding for test user
      
      // Carregar o segmento armazenado ou definir um padrão
      const savedSegment = localStorage.getItem('segment') as BusinessSegmentType || 'generic';
      setCurrentSegment(savedSegment);
      
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo à plataforma Fenix!",
      });
      
      navigate('/');
      return;
    }
    
    // Continue with normal login flow
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', loginEmail);
    
    toast({
      title: "Login bem-sucedido",
      description: "Redirecionando para o questionário inicial...",
    });
    
    // Check if onboarding completed
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    
    if (onboardingCompleted === 'true') {
      navigate('/');
    } else {
      navigate('/onboarding');
    }
  };
  
  // Format CNPJ as user types
  const formatCnpj = (value: string) => {
    // Remove any non-digit character
    const cnpj = value.replace(/\D/g, '');
    
    // Apply CNPJ mask (XX.XXX.XXX/XXXX-XX)
    return cnpj
      .replace(/^(\d{2})(\d)/, '$1.$2')
      .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
      .replace(/\.(\d{3})(\d)/, '.$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .substring(0, 18);
  };
  
  const handleCnpjChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCnpj = formatCnpj(e.target.value);
    setCompanyCnpj(formattedCnpj);
  };
  
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate register form
    if (!companyName || !companyCnpj || !registerEmail || !registerPassword || !confirmPassword || !segment) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos, incluindo o segmento da empresa.",
        variant: "destructive"
      });
      return;
    }
    
    // Basic CNPJ validation (should have 14 digits)
    const cnpjDigits = companyCnpj.replace(/\D/g, '');
    if (cnpjDigits.length !== 14) {
      toast({
        title: "Erro de validação",
        description: "CNPJ inválido. Por favor, verifique o número informado.",
        variant: "destructive"
      });
      return;
    }
    
    if (registerPassword !== confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "As senhas não coincidem.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulate successful registration
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', registerEmail);
    localStorage.setItem('companyName', companyName);
    localStorage.setItem('companyCnpj', companyCnpj);
    localStorage.setItem('segment', segment);
    
    // Aplicar o segmento escolhido
    setCurrentSegment(segment as BusinessSegmentType);
    
    toast({
      title: "Cadastro realizado com sucesso",
      description: "Redirecionando para o questionário inicial...",
    });
    
    navigate('/onboarding');
  };
  
  const fillTestCredentials = () => {
    setLoginEmail(localStorage.getItem('testEmail') || 'teste@empresa.com');
    setLoginPassword(localStorage.getItem('testPassword') || 'senha123');
  };

  const segments: {id: BusinessSegmentType, name: string}[] = [
    { id: 'generic', name: 'Genérico' },
    { id: 'agro', name: 'Agronegócio' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'health', name: 'Saúde' },
    { id: 'fashion', name: 'Moda' },
    { id: 'services', name: 'Serviços' },
    { id: 'tech', name: 'Tecnologia' },
    { id: 'legal', name: 'Jurídico' },
    { id: 'education', name: 'Educação' },
    { id: 'manufacturing', name: 'Indústria' }
  ];
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-primary rounded-full p-4 mb-2">
            <Flame size={32} className="text-white animate-pulse" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-500 via-red-500 to-purple-500 bg-clip-text text-transparent">Fenix</h1>
          <p className="text-muted-foreground text-sm">Sua plataforma completa de gestão empresarial</p>
        </div>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-xl text-center">Bem-vindo à Plataforma Fenix</CardTitle>
            <CardDescription className="text-center">
              Faça login ou cadastre sua empresa para começar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Cadastro</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleLogin}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Senha</Label>
                        <a href="#" className="text-sm text-primary hover:underline">
                          Esqueceu a senha?
                        </a>
                      </div>
                      <Input 
                        id="password" 
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full">Entrar</Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full"
                      onClick={fillTestCredentials}
                    >
                      Usar credenciais de teste
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="register">
                <form onSubmit={handleRegister}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="company">Nome da Empresa</Label>
                      <Input 
                        id="company" 
                        placeholder="Sua Empresa Ltda."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cnpj">CNPJ</Label>
                      <Input 
                        id="cnpj" 
                        placeholder="XX.XXX.XXX/XXXX-XX"
                        value={companyCnpj}
                        onChange={handleCnpjChange}
                        maxLength={18}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="segment">Segmento da Empresa <span className="text-destructive">*</span></Label>
                      <Select value={segment} onValueChange={(value: BusinessSegmentType) => setSegment(value)}>
                        <SelectTrigger id="segment">
                          <SelectValue placeholder="Selecione o segmento" />
                        </SelectTrigger>
                        <SelectContent>
                          {segments.map((segment) => (
                            <SelectItem key={segment.id} value={segment.id}>
                              {segment.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground mt-1">
                        O visual e os recursos do sistema serão personalizados de acordo com o segmento escolhido.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input 
                        id="register-email" 
                        type="email" 
                        placeholder="contato@suaempresa.com"
                        value={registerEmail}
                        onChange={(e) => setRegisterEmail(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <Input 
                        id="register-password" 
                        type="password"
                        value={registerPassword}
                        onChange={(e) => setRegisterPassword(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirmar Senha</Label>
                      <Input 
                        id="confirm-password" 
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full">Cadastrar</Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-muted-foreground">
              Ao continuar, você concorda com nossos <a href="#" className="text-primary hover:underline">Termos de Serviço</a> e <a href="#" className="text-primary hover:underline">Política de Privacidade</a>.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
