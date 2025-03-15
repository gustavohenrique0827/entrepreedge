
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
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
    
    // Simulate successful login
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
    if (!companyName || !companyCnpj || !registerEmail || !registerPassword || !confirmPassword) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos.",
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
    
    toast({
      title: "Cadastro realizado com sucesso",
      description: "Redirecionando para o questionário inicial...",
    });
    
    navigate('/onboarding');
  };
  
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
          <p className="text-muted-foreground text-sm">Sua plataforma completa de gestão empresarial</p>
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
                    <Button type="submit" className="w-full">Entrar</Button>
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
