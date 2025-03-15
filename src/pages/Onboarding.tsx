
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const businessTypes = [
  "Comércio varejista",
  "Comércio atacadista",
  "Indústria",
  "Prestação de serviços",
  "Tecnologia",
  "Educação",
  "Saúde",
  "Construção civil",
  "Alimentação",
  "Outro"
];

const Onboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const companyName = localStorage.getItem('companyName') || 'Sua Empresa';
  
  // Step 1: Basic Info
  const [businessType, setBusinessType] = useState("");
  const [employees, setEmployees] = useState("");
  const [foundingYear, setFoundingYear] = useState("");
  
  // Step 2: Business Goals
  const [annualRevenue, setAnnualRevenue] = useState("");
  const [targetRevenue, setTargetRevenue] = useState("");
  const [mainChallenges, setMainChallenges] = useState("");
  
  // Step 3: Learning Preferences
  const [interestedTopics, setInterestedTopics] = useState<string[]>([]);
  const [learningTime, setLearningTime] = useState("");
  
  const goToNextStep = () => {
    if (step === 1) {
      if (!businessType || !employees || !foundingYear) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todas as informações.",
          variant: "destructive"
        });
        return;
      }
    } else if (step === 2) {
      if (!annualRevenue || !targetRevenue || !mainChallenges) {
        toast({
          title: "Campos obrigatórios",
          description: "Por favor, preencha todas as informações.",
          variant: "destructive"
        });
        return;
      }
    }
    
    setStep(step + 1);
  };
  
  const goToPreviousStep = () => {
    setStep(step - 1);
  };
  
  const handleTopicToggle = (topic: string) => {
    if (interestedTopics.includes(topic)) {
      setInterestedTopics(interestedTopics.filter(t => t !== topic));
    } else {
      setInterestedTopics([...interestedTopics, topic]);
    }
  };
  
  const handleFinish = () => {
    if (interestedTopics.length === 0 || !learningTime) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione pelo menos um tópico e tempo disponível para aprendizado.",
        variant: "destructive"
      });
      return;
    }
    
    // Save all the information
    localStorage.setItem('businessType', businessType);
    localStorage.setItem('employees', employees);
    localStorage.setItem('foundingYear', foundingYear);
    localStorage.setItem('annualRevenue', annualRevenue);
    localStorage.setItem('targetRevenue', targetRevenue);
    localStorage.setItem('mainChallenges', mainChallenges);
    localStorage.setItem('interestedTopics', JSON.stringify(interestedTopics));
    localStorage.setItem('learningTime', learningTime);
    localStorage.setItem('onboardingCompleted', 'true');
    
    toast({
      title: "Configuração concluída!",
      description: "Seu perfil empresarial foi configurado com sucesso.",
    });
    
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">Configuração inicial</h1>
          <p className="text-muted-foreground text-sm">Vamos conhecer melhor sua empresa, {companyName}</p>
          
          <div className="w-full mt-4 mb-8">
            <Progress value={(step / 3) * 100} className="h-2" />
            <div className="flex justify-between mt-2 text-xs text-muted-foreground">
              <span>Informações básicas</span>
              <span>Metas de negócio</span>
              <span>Preferências de aprendizado</span>
            </div>
          </div>
        </div>
        
        <Card className="glass">
          <CardHeader>
            <CardTitle>
              {step === 1 && "Sobre sua empresa"}
              {step === 2 && "Metas e objetivos financeiros"}
              {step === 3 && "Preferências de aprendizado"}
            </CardTitle>
          </CardHeader>
          
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="business-type">Tipo de negócio</Label>
                  <Select value={businessType} onValueChange={setBusinessType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tipo do seu negócio" />
                    </SelectTrigger>
                    <SelectContent>
                      {businessTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="employees">Número de funcionários</Label>
                  <Select value={employees} onValueChange={setEmployees}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o número de funcionários" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1-5 funcionários</SelectItem>
                      <SelectItem value="6-10">6-10 funcionários</SelectItem>
                      <SelectItem value="11-20">11-20 funcionários</SelectItem>
                      <SelectItem value="21-50">21-50 funcionários</SelectItem>
                      <SelectItem value="51+">Mais de 50 funcionários</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="founding-year">Ano de fundação</Label>
                  <Input 
                    id="founding-year" 
                    type="number" 
                    placeholder="Ex: 2020"
                    value={foundingYear}
                    onChange={(e) => setFoundingYear(e.target.value)}
                    min="1900"
                    max={new Date().getFullYear()}
                  />
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="annual-revenue">Faturamento anual atual (R$)</Label>
                  <Input 
                    id="annual-revenue" 
                    type="text" 
                    placeholder="Ex: 120000"
                    value={annualRevenue}
                    onChange={(e) => setAnnualRevenue(e.target.value.replace(/\D/g, ''))}
                  />
                  <p className="text-xs text-muted-foreground">
                    {annualRevenue ? `R$ ${parseInt(annualRevenue).toLocaleString('pt-BR')}` : ''}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="target-revenue">Meta de faturamento para o próximo ano (R$)</Label>
                  <Input 
                    id="target-revenue" 
                    type="text" 
                    placeholder="Ex: 200000"
                    value={targetRevenue}
                    onChange={(e) => setTargetRevenue(e.target.value.replace(/\D/g, ''))}
                  />
                  <p className="text-xs text-muted-foreground">
                    {targetRevenue ? `R$ ${parseInt(targetRevenue).toLocaleString('pt-BR')}` : ''}
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="challenges">Principais desafios do negócio</Label>
                  <Textarea 
                    id="challenges" 
                    placeholder="Descreva os principais desafios que sua empresa enfrenta"
                    value={mainChallenges}
                    onChange={(e) => setMainChallenges(e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Tópicos de interesse (selecione pelo menos um)</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {[
                      "Gestão financeira", 
                      "Marketing digital", 
                      "Vendas", 
                      "RH e liderança", 
                      "Operações", 
                      "Planejamento estratégico",
                      "Tecnologia",
                      "Inovação"
                    ].map(topic => (
                      <Button
                        key={topic}
                        type="button"
                        variant={interestedTopics.includes(topic) ? "default" : "outline"}
                        onClick={() => handleTopicToggle(topic)}
                        className="text-xs h-auto py-2"
                      >
                        {topic}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="learning-time">Tempo disponível para aprendizado (por semana)</Label>
                  <Select value={learningTime} onValueChange={setLearningTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o tempo disponível" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="menos-1h">Menos de 1 hora</SelectItem>
                      <SelectItem value="1-2h">1-2 horas</SelectItem>
                      <SelectItem value="3-5h">3-5 horas</SelectItem>
                      <SelectItem value="6-10h">6-10 horas</SelectItem>
                      <SelectItem value="mais-10h">Mais de 10 horas</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={goToPreviousStep}>Voltar</Button>
            ) : (
              <div></div>
            )}
            
            {step < 3 ? (
              <Button onClick={goToNextStep}>Próximo</Button>
            ) : (
              <Button onClick={handleFinish}>Finalizar</Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
