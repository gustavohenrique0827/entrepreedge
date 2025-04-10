
import React from 'react';
import FeedbackForm from './FeedbackForm';
import PartnerLinks from './PartnerLinks';
import SegmentConsulting from './SegmentConsulting';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Link, BookOpen } from 'lucide-react';
import { useSegment } from '@/contexts/SegmentContext';

const SuggestionSection = () => {
  const { segmentName } = useSegment();
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Lightbulb className="mr-2 h-5 w-5 text-primary" />
            Recursos e Suporte para {segmentName}
          </CardTitle>
          <CardDescription>
            Ferramentas e recursos para auxiliar no crescimento do seu negócio
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="feedback" className="space-y-4">
            <TabsList className="grid grid-cols-3 gap-2">
              <TabsTrigger value="feedback" className="flex items-center">
                <Lightbulb className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Sugestões</span>
              </TabsTrigger>
              <TabsTrigger value="partners" className="flex items-center">
                <Link className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Links Parceiros</span>
              </TabsTrigger>
              <TabsTrigger value="consulting" className="flex items-center">
                <BookOpen className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Consultoria</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="feedback" className="space-y-4">
              <FeedbackForm />
            </TabsContent>
            
            <TabsContent value="partners" className="space-y-4">
              <PartnerLinks />
            </TabsContent>
            
            <TabsContent value="consulting" className="space-y-4">
              <SegmentConsulting />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuggestionSection;
