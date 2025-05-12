
import React from 'react';
import { PageContainer } from '@/components/PageContainer';
import { Link } from 'react-router-dom';
import { AlertTriangle, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <PageContainer>
      <div className="container px-4 py-20 flex flex-col items-center justify-center">
        <div className="text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-primary/10 p-6 rounded-full">
              <AlertTriangle size={64} className="text-primary" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold mb-4">Página não encontrada</h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            A página que você está tentando acessar não existe ou foi movida.
          </p>
          
          <Link to="/">
            <Button size="lg">
              <Home size={18} className="mr-2" />
              Voltar ao Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
};

export default NotFound;
