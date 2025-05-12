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
import { useSupabase } from '@/contexts/SupabaseContext';
import { supabase } from '@/integrations/supabase/client';
import { getUserProfile } from '@/lib/database';

// Function to safely fetch user segment from database
const getUserSegment = async (userId: string) => {
  try {
    // Use a stored procedure or generic query to get user segment
    const { data, error } = await supabase.rpc('get_user_profile', {
      user_id_param: userId
    });
    
    if (!error && data) {
      return data.segment;
    }
  } catch (err) {
    console.error("Error fetching user segment:", err);
  }
  return null;
};

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setCurrentSegment } = useSegment();
  const { switchSegment } = useSupabase();
  const [activeTab, setActiveTab] = useState('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Register form state
  const [companyName, setCompanyName] = useState('');
  const [companyCnpj, setCompanyCnpj] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [segment, setSegment] = useState<BusinessSegmentType | ''>('');
  
  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  // Create test users on component mount if they don't exist
  useEffect(() => {
    // Check if test users already exist
    if (!localStorage.getItem('testUsersCreated')) {
      // Define test users for different segments
      const testUsers = [
        { email: 'vendas@empresa.com', password: 'senha123', segment: 'sales', company: 'Empresa de Vendas LTDA' },
        { email: 'financeiro@empresa.com', password: 'senha123', segment: 'financial', company: 'Empresa Financeira LTDA' },
        { email: 'saude@empresa.com', password: 'senha123', segment: 'health', company: 'Clínica Médica LTDA' },
        { email: 'educacao@empresa.com', password: 'senha123', segment: 'education', company: 'Escola ABC LTDA' },
        { email: 'ecommerce@empresa.com', password: 'senha123', segment: 'ecommerce', company: 'Loja Virtual LTDA' },
        { email: 'industrial@empresa.com', password: 'senha123', segment: 'industrial', company: 'Indústria XYZ LTDA' },
        { email: 'agro@empresa.com', password: 'senha123', segment: 'agro', company: 'Agropecuária ABC LTDA' },
        { email: 'moda@empresa.com', password: 'senha123', segment: 'fashion', company: 'Moda Fashion LTDA' },
        { email: 'servicos@empresa.com', password: 'senha123', segment: 'services', company: 'Serviços Gerais LTDA' },
        { email: 'tech@empresa.com', password: 'senha123', segment: 'tech', company: 'Tecnologia LTDA' },
        { email: 'juridico@empresa.com', password: 'senha123', segment: 'legal', company: 'Escritório de Advocacia' },
        { email: 'fabrica@empresa.com', password: 'senha123', segment: 'manufacturing', company: 'Manufatura Industrial LTDA' },
        { email: 'teste@empresa.com', password: 'senha123', segment: 'generic', company: 'Empresa Teste LTDA' },
      ];
      
      // Save test user credentials in localStorage for demo purposes
      testUsers.forEach(user => {
        localStorage.setItem(`test_${user.segment}_email`, user.email);
        localStorage.setItem(`test_${user.segment}_password`, user.password);
        localStorage.setItem(`test_${user.segment}_company`, user.company);
        localStorage.setItem(`test_${user.segment}_segment`, user.segment);
      });
      
      localStorage.setItem('testUsersCreated', 'true');
      
      // Set first test user credentials in the form for easy access
      setLoginEmail(testUsers[0].email);
      setLoginPassword(testUsers[0].password);
      
      toast({
        title: "Usuários de teste criados",
        description: "Use os botões de usuário de teste para acessar os diferentes segmentos.",
      });
    }
  }, [toast]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate form
      if (!loginEmail || !loginPassword) {
        toast({
          title: "Erro de validação",
          description: "Por favor, preencha todos os campos.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // For test users, we'll simulate the login process 
      // to ensure segment is correctly loaded
      const isTestUser = Object.keys(localStorage)
        .filter(key => key.startsWith('test_') && key.endsWith('_email'))
        .some(key => localStorage.getItem(key) === loginEmail);
      
      if (isTestUser) {
        // Find the segment for this test user
        const segmentKey = Object.keys(localStorage)
          .filter(key => key.startsWith('test_') && key.endsWith('_email'))
          .find(key => localStorage.getItem(key) === loginEmail);
          
        if (segmentKey) {
          const segmentName = segmentKey.replace('test_', '').replace('_email', '');
          const company = localStorage.getItem(`test_${segmentName}_company`) || '';
          
          // Try to log in with Supabase (for future real implementation)
          const { data, error } = await supabase.auth.signInWithPassword({
            email: loginEmail,
            password: loginPassword
          });
          
          if (error) {
            // For demo purposes, we'll proceed even if there's an auth error
            console.log("Supabase auth error, but proceeding with demo login:", error);
          }
          
          // Set logged in user data
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', loginEmail);
          localStorage.setItem('companyName', company);
          localStorage.setItem('segment', segmentName);
          localStorage.setItem('onboardingCompleted', 'true'); // Skip onboarding for test users
          
          // Update segment context
          setCurrentSegment(segmentName as BusinessSegmentType);
          await switchSegment(segmentName);
          
          toast({
            title: "Login bem-sucedido",
            description: `Bem-vindo ao segmento ${segmentName}!`,
          });
          
          navigate('/dashboard');
          return;
        }
      }
      
      // Real Supabase authentication for non-test users
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });
      
      if (error) {
        toast({
          title: "Erro de autenticação",
          description: error.message,
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }
      
      // User successfully logged in
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', loginEmail);
      
      // Try to get user segment from metadata
      let userSegment = null;
      if (data.user?.user_metadata?.segment) {
        userSegment = data.user.user_metadata.segment;
        localStorage.setItem('segment', userSegment);
        setCurrentSegment(userSegment as BusinessSegmentType);
        await switchSegment(userSegment);
      } else {
        // If no segment in metadata, try to fetch from profiles
        try {
          const userProfile = await getUserProfile(data.user.id);
          
          if (userProfile?.segment) {
            userSegment = userProfile.segment;
            localStorage.setItem('segment', userSegment);
            setCurrentSegment(userSegment as BusinessSegmentType);
            await switchSegment(userSegment);
          }
        } catch (profileQueryError) {
          console.error("Error querying profile data:", profileQueryError);
          // Continue with login flow even if profile query fails
        }
      }
      
      toast({
        title: "Login bem-sucedido",
        description: "Redirecionando para o dashboard...",
      });
      
      // Check if onboarding completed
      const onboardingCompleted = localStorage.getItem('onboardingCompleted');
      
      if (onboardingCompleted === 'true') {
        navigate('/dashboard');
      } else {
        navigate('/onboarding');
      }
    } catch (err) {
      console.error("Login error:", err);
      toast({
        title: "Erro ao fazer login",
        description: "Ocorreu um erro durante o processo de login.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
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
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Validate register form
      if (!companyName || !companyCnpj || !registerEmail || !registerPassword || !confirmPassword || !segment) {
        toast({
          title: "Erro de validação",
          description: "Por favor, preencha todos os campos, incluindo o segmento da empresa.",
          variant: "destructive"
        });
        setIsLoading(false);
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
        setIsLoading(false);
        return;
      }
      
      if (registerPassword !== confirmPassword) {
        toast({
          title: "Erro de validação",
          description: "As senhas não coincidem.",
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // Create user in Supabase
      const { data, error } = await supabase.auth.signUp({
        email: registerEmail,
        password: registerPassword,
        options: {
          data: {
            segment: segment,
            company_name: companyName,
            company_cnpj: companyCnpj
          }
        }
      });
      
      if (error) {
        toast({
          title: "Erro no cadastro",
          description: error.message,
          variant: "destructive"
        });
        setIsLoading(false);
        return;
      }
      
      // Create company profile in database (future implementation)
      // For now, we'll just simulate it with localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', registerEmail);
      localStorage.setItem('companyName', companyName);
      localStorage.setItem('companyCnpj', companyCnpj);
      localStorage.setItem('segment', segment);
      
      // Aplicar o segmento escolhido
      setCurrentSegment(segment as BusinessSegmentType);
      await switchSegment(segment);
      
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Redirecionando para o questionário inicial...",
      });
      
      navigate('/onboarding');
    } catch (err) {
      console.error("Registration error:", err);
      toast({
        title: "Erro no cadastro",
        description: "Ocorreu um erro durante o processo de cadastro.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const fillTestCredentials = (segmentId: string) => {
    const email = localStorage.getItem(`test_${segmentId}_email`) || '';
    const password = localStorage.getItem(`test_${segmentId}_password`) || '';
    
    setLoginEmail(email);
    setLoginPassword(password);
  };

  const segments: {id: BusinessSegmentType, name: string}[] = [
    { id: 'sales', name: 'Vendas' },
    { id: 'financial', name: 'Financeiro' },
    { id: 'health', name: 'Saúde' },
    { id: 'education', name: 'Educação' },
    { id: 'ecommerce', name: 'E-Commerce' },
    { id: 'industrial', name: 'Industrial' },
    { id: 'agro', name: 'Agronegócio' },
    { id: 'fashion', name: 'Moda' },
    { id: 'services', name: 'Serviços' },
    { id: 'tech', name: 'Tecnologia' },
    { id: 'legal', name: 'Jurídico' },
    { id: 'manufacturing', name: 'Manufatura' },
    { id: 'generic', name: 'Genérico' },
  ];
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-primary rounded-md p-2 mb-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L17 7H14V13H10V7H7L12 2Z" fill="white" />
              <path d="M19 14H5V17H19V14Z" fill="white" />
              <path d="M17 18H7V22H17V18Z" fill="white" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">EntrepreEdge</h1>
          <p className="text-sm text-muted-foreground">Sua plataforma completa de gestão empresarial</p>
        </div>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-xl text-center">Bem-vindo</CardTitle>
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
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Carregando..." : "Entrar"}
                    </Button>
                    
                    <div className="mt-4">
                      <Label className="text-sm mb-2 block">Acessos para teste</Label>
                      <div className="grid grid-cols-2 gap-2 mt-2">
                        {segments.map((segment) => (
                          <Button 
                            key={segment.id}
                            type="button" 
                            variant="outline" 
                            size="sm"
                            className="text-xs"
                            onClick={() => fillTestCredentials(segment.id)}
                          >
                            {segment.name}
                          </Button>
                        ))}
                      </div>
                    </div>
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
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? "Carregando..." : "Cadastrar"}
                    </Button>
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
