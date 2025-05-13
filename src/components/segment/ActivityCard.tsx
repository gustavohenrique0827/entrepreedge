
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LucideIcon } from 'lucide-react';

interface ActivityCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
}

export function ActivityCard({ title, description, icon, footer, onClick }: ActivityCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow">
      <CardHeader className="flex flex-row items-start gap-4">
        {icon && <div className="mt-1 text-primary">{icon}</div>}
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription className="mt-2">{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {/* Content can be added here */}
      </CardContent>
      <CardFooter className="pt-2">
        {footer || (
          onClick && <Button onClick={onClick} variant="secondary" className="w-full">Acessar</Button>
        )}
      </CardFooter>
    </Card>
  );
}
