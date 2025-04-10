
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { HelpCircle, MessageSquare, Heart, LightbulbIcon, Bug } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const feedbackTypes = [
  { value: "suggestion", label: "Sugestão de Melhoria", icon: <LightbulbIcon className="h-4 w-4 mr-2" /> },
  { value: "bug", label: "Reportar um Problema", icon: <Bug className="h-4 w-4 mr-2" /> },
  { value: "feature", label: "Solicitar Nova Funcionalidade", icon: <MessageSquare className="h-4 w-4 mr-2" /> },
  { value: "praise", label: "Elogio", icon: <Heart className="h-4 w-4 mr-2" /> },
  { value: "other", label: "Outro", icon: <HelpCircle className="h-4 w-4 mr-2" /> },
];

const FeedbackForm = () => {
  const { toast } = useToast();
  const [feedbackType, setFeedbackType] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feedbackType || !description) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, selecione o tipo de feedback e escreva uma descrição.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulando envio para API
    setTimeout(() => {
      toast({
        title: "Feedback enviado",
        description: "Agradecemos o seu feedback. Ele será analisado pela nossa equipe.",
      });
      
      // Limpar o formulário
      setFeedbackType("");
      setTitle("");
      setDescription("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Envie-nos seu Feedback</CardTitle>
        <CardDescription>
          Ajude-nos a melhorar o sistema enviando suas sugestões, ideias ou reportando problemas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="feedback-type">Tipo de Feedback</Label>
            <Select value={feedbackType} onValueChange={setFeedbackType}>
              <SelectTrigger id="feedback-type">
                <SelectValue placeholder="Selecione o tipo de feedback" />
              </SelectTrigger>
              <SelectContent>
                {feedbackTypes.map((type) => (
                  <SelectItem 
                    key={type.value} 
                    value={type.value}
                    className="flex items-center"
                  >
                    <div className="flex items-center">
                      {type.icon}
                      {type.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback-title">Título (opcional)</Label>
            <Input
              id="feedback-title"
              placeholder="Um título breve para seu feedback"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="feedback-description">Descrição</Label>
            <Textarea
              id="feedback-description"
              placeholder="Descreva em detalhes sua sugestão ou problema..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="pt-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Enviar Feedback"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default FeedbackForm;
