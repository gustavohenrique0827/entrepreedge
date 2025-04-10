
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Book, CreditCard, BarChart, FileText, TrendingUp, ShieldCheck } from "lucide-react";
import { useSegment } from '@/contexts/SegmentContext';

const PartnerLinks = () => {
  const { currentSegment, segmentName } = useSegment();
  
  // Links comuns a todos os segmentos
  const commonLinks = [
    {
      name: "Portal do Empreendedor",
      description: "Serviços e informações para MEI e empresas",
      url: "https://www.gov.br/empresas-e-negocios/pt-br/empreendedor",
      icon: <ShieldCheck className="h-5 w-5 text-blue-500" />
    },
    {
      name: "SEBRAE",
      description: "Suporte para pequenos negócios",
      url: "https://www.sebrae.com.br/",
      icon: <TrendingUp className="h-5 w-5 text-blue-500" />
    }
  ];
  
  // Links específicos por segmento
  const segmentSpecificLinks: Record<string, Array<{name: string; description: string; url: string; icon: JSX.Element}>> = {
    agro: [
      {
        name: "EMBRAPA",
        description: "Pesquisa agropecuária brasileira",
        url: "https://www.embrapa.br/",
        icon: <FileText className="h-5 w-5 text-green-600" />
      },
      {
        name: "Canal Rural",
        description: "Notícias do agronegócio",
        url: "https://www.canalrural.com.br/",
        icon: <Book className="h-5 w-5 text-green-600" />
      }
    ],
    ecommerce: [
      {
        name: "E-Commerce Brasil",
        description: "Associação de comércio eletrônico",
        url: "https://www.ecommercebrasil.com.br/",
        icon: <CreditCard className="h-5 w-5 text-orange-500" />
      }
    ],
    tech: [
      {
        name: "Associação Brasileira de Startups",
        description: "Comunidade de startups",
        url: "https://abstartups.com.br/",
        icon: <BarChart className="h-5 w-5 text-indigo-500" />
      }
    ]
  };
  
  // Combinar links comuns com links específicos
  const links = [
    ...commonLinks,
    ...(segmentSpecificLinks[currentSegment] || [])
  ];
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Links Úteis para {segmentName}</CardTitle>
        <CardDescription>
          Sites parceiros e recursos relacionados ao seu segmento
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {links.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-start p-4 border rounded-lg hover:bg-accent/50 transition-colors"
            >
              <div className="mr-3 mt-0.5">
                {link.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center">
                  <h3 className="font-medium text-foreground">{link.name}</h3>
                  <ExternalLink className="h-3 w-3 ml-1.5 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
              </div>
            </a>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <a href="#" className="text-sm text-primary hover:underline inline-flex items-center">
            Ver mais recursos para {segmentName}
            <ExternalLink className="h-3 w-3 ml-1.5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default PartnerLinks;
