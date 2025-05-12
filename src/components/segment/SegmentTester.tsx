
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSegment } from '@/contexts/SegmentContext';
import { segmentNames } from '@/data/segments-config';
import { useToast } from "@/hooks/use-toast";
import { Badge } from '@/components/ui/badge';
import useSegmentConfig from '@/hooks/useSegmentConfig';
import { CheckCircle, User } from 'lucide-react';

type BusinessSegmentType = 
  | 'generic' 
  | 'agro' 
  | 'ecommerce' 
  | 'health' 
  | 'fashion' 
  | 'services' 
  | 'tech' 
  | 'legal' 
  | 'education' 
  | 'manufacturing';

const SegmentTester: React.FC = () => {
  const { currentSegment, setCurrentSegment, segmentName } = useSegment();
  const { applySegmentConfig } = useSegmentConfig();
  const { toast } = useToast();
  const [loggedIn, setLoggedIn] = useState<Record<string, boolean>>({});
  
  // Create test accounts for each segment
  const setupTestAccounts = () => {
    const allSegments: BusinessSegmentType[] = [
      'generic', 'agro', 'ecommerce', 'health', 'fashion', 
      'services', 'tech', 'legal', 'education', 'manufacturing'
    ];
    
    // Create test accounts for each segment
    allSegments.forEach(segment => {
      const email = `test.${segment}@example.com`;
      const password = 'Test123!';
      
      // Store test credentials in localStorage (in real app this would be in a database)
      localStorage.setItem(`test_${segment}_email`, email);
      localStorage.setItem(`test_${segment}_password`, password);
    });
    
    toast({
      title: "Contas de teste criadas",
      description: "Contas de teste para todos os segmentos foram criadas com sucesso.",
      variant: "success"
    });
  };
  
  // Login as a test user for a specific segment
  const loginAsSegment = (segment: BusinessSegmentType) => {
    // Set segment
    setCurrentSegment(segment);
    
    // Apply segment configuration
    setTimeout(() => {
      applySegmentConfig();
      
      // Store auth info in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', `test.${segment}@example.com`);
      localStorage.setItem('companyName', `Empresa Teste ${segmentNames[segment]}`);
      localStorage.setItem('segment', segment);
      localStorage.setItem('onboardingCompleted', 'true');
      
      // Mark as logged in in our state
      setLoggedIn(prev => ({ ...prev, [segment]: true }));
      
      toast({
        title: "Login realizado",
        description: `Login como usuário de teste do segmento ${segmentNames[segment]} realizado com sucesso.`,
        variant: "success"
      });
    }, 100);
  };
  
  // Logout from all segments
  const logoutFromAll = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setLoggedIn({});
    
    toast({
      title: "Logout realizado",
      description: "Logout de todos os segmentos realizado com sucesso.",
      variant: "info"
    });
  };
  
  return (
    <Card className="shadow-lg border-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Teste de Segmentos
        </CardTitle>
        <CardDescription>
          Teste os diferentes segmentos de negócio configurados no sistema
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(segmentNames).map(([segment, name]) => (
            <Button
              key={segment}
              onClick={() => loginAsSegment(segment as BusinessSegmentType)}
              variant={loggedIn[segment] ? "outline" : "default"}
              className={`flex items-center justify-between ${currentSegment === segment ? 'ring-2 ring-primary' : ''}`}
            >
              <span>{name}</span>
              {loggedIn[segment] && (
                <Badge variant="success" className="ml-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Logado
                </Badge>
              )}
            </Button>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 pt-4">
          <Button onClick={setupTestAccounts} variant="outline" className="flex-1">
            Criar Contas de Teste
          </Button>
          <Button onClick={logoutFromAll} variant="secondary" className="flex-1">
            Logout de Todos
          </Button>
        </div>
      </CardContent>
      <CardFooter className="bg-secondary/10 flex flex-col items-start gap-2 text-sm">
        <div>
          <strong>Segmento Atual:</strong> {segmentName}
        </div>
        <div>
          <strong>Email:</strong> {loggedIn[currentSegment as string] ? `test.${currentSegment}@example.com` : 'Não logado'}
        </div>
        <div>
          <strong>Senha:</strong> {loggedIn[currentSegment as string] ? 'Test123!' : 'N/A'}
        </div>
      </CardFooter>
    </Card>
  );
};

export default SegmentTester;
