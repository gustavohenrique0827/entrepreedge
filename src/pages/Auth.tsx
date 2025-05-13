import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSupabase } from '@/contexts/SupabaseContext';
import { BusinessSegmentType } from '@/contexts/SegmentContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { supabase, setSession, setCompanyName: setContextCompanyName, setIsConfigured } = useSupabase();

  useEffect(() => {
    document.title = isLogin ? 'Login' : 'Register';
  }, [isLogin]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Erro ao logar",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setSession(data.session);
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('token', data.session?.access_token || '');

          // Fetch user details from the public schema
          const { data: userDetails, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session?.user.id)
            .single();

          if (userError) {
            console.error("Erro ao buscar detalhes do usuário:", userError);
            toast({
              title: "Erro ao buscar detalhes do usuário",
              description: userError.message,
              variant: "destructive",
            });
          } else {
            // Set company name and segment in local storage and context
            const companyName = userDetails?.company_name || 'Sua Empresa';
            const segmentType = userDetails?.segment as BusinessSegmentType || null;

            localStorage.setItem('companyName', companyName);
            setContextCompanyName(companyName);

            if (segmentType) {
              localStorage.setItem('segmentType', segmentType);
            }

            setIsConfigured(!!segmentType);
            localStorage.setItem('isConfigured', !!segmentType ? 'true' : 'false');
            localStorage.setItem('userRole', userDetails?.role || 'user');

            toast({
              title: "Login efetuado com sucesso!",
              description: `Bem-vindo(a) ${companyName}!`,
            });
            navigate('/');
          }
        }
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              company_name: companyName,
            }
          }
        });

        if (error) {
          toast({
            title: "Erro ao registrar",
            description: error.message,
            variant: "destructive",
          });
        } else {
          setSession(data.session);
           // Insert user details into the public schema
           const { error: insertError } = await supabase
           .from('users')
           .insert([
             { 
               id: data.user?.id, 
               email: email, 
               company_name: companyName,
               role: 'user'
             },
           ]);
 
         if (insertError) {
           console.error("Erro ao inserir detalhes do usuário:", insertError);
           toast({
             title: "Erro ao inserir detalhes do usuário",
             description: insertError.message,
             variant: "destructive",
           });
         } else {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('companyName', companyName);
            setContextCompanyName(companyName);
            localStorage.setItem('isConfigured', 'false');
            localStorage.setItem('token', data.session?.access_token || '');

            toast({
              title: "Registro efetuado com sucesso!",
              description: "Verifique seu email para confirmar o cadastro.",
            });
            navigate('/onboarding');
          }
        }
      }
    } catch (error: any) {
      toast({
        title: "Erro inesperado",
        description: error.message || "Ocorreu um erro ao processar sua requisição.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">{isLogin ? "Login" : "Criar Conta"}</CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            {isLogin ? "Entre com seu email e senha" : "Crie uma nova conta"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="seuemail@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {!isLogin && (
            <div className="grid gap-2">
              <Label htmlFor="companyName">Nome da Empresa</Label>
              <Input
                id="companyName"
                type="text"
                placeholder="Nome da sua empresa"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button disabled={isLoading} onClick={handleSubmit}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {isLogin ? "Entrar" : "Criar conta"}
          </Button>
          <div className="text-center">
            <Button variant="link" size="sm" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Criar uma conta" : "Já tenho uma conta"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Auth;
