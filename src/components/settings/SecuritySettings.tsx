
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const SecuritySettings = () => {
  const { toast } = useToast();
  const [twoFactor, setTwoFactor] = useState(localStorage.getItem('twoFactor') === 'true');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleTwoFactorChange = (checked: boolean) => {
    setTwoFactor(checked);
    localStorage.setItem('twoFactor', checked.toString());
    
    if (checked) {
      toast({
        title: "Autenticação de dois fatores ativada",
        description: "Seu login agora é mais seguro.",
      });
    } else {
      toast({
        title: "Autenticação de dois fatores desativada",
        description: "Recomendamos manter este recurso ativado para maior segurança.",
      });
    }
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast({
        title: "Erro",
        description: "Por favor, insira sua senha atual.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Erro",
        description: "As novas senhas não correspondem.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword.length < 8) {
      toast({
        title: "Erro",
        description: "A nova senha deve ter pelo menos 8 caracteres.",
        variant: "destructive"
      });
      return;
    }
    
    // Simulação de mudança de senha bem-sucedida
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    
    toast({
      title: "Senha alterada com sucesso",
      description: "Sua senha foi atualizada. Lembre-se de mantê-la segura.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Segurança</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <Label htmlFor="two-factor">Autenticação de dois fatores</Label>
          <Switch 
            id="two-factor" 
            checked={twoFactor} 
            onCheckedChange={handleTwoFactorChange}
          />
        </div>
        
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Senha atual</Label>
            <Input 
              id="current-password" 
              type="password" 
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="new-password">Nova senha</Label>
            <Input 
              id="new-password" 
              type="password" 
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirmar nova senha</Label>
            <Input 
              id="confirm-password" 
              type="password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full">
            Alterar senha
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
