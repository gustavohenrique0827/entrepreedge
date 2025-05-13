
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ActivityCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  status?: 'active' | 'pending' | 'completed';
  onAction?: () => void;
  actionLabel?: string;
  footerContent?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export const ActivityCard: React.FC<ActivityCardProps> = ({
  title,
  description,
  icon,
  status,
  onAction,
  actionLabel = "Ver detalhes",
  footerContent,
  children,
  className
}) => {
  const getStatusBadge = () => {
    if (!status) return null;
    
    const statusConfig = {
      active: { label: "Ativo", className: "bg-green-500 hover:bg-green-600" },
      pending: { label: "Pendente", className: "bg-amber-500 hover:bg-amber-600" },
      completed: { label: "Concluído", className: "bg-blue-500 hover:bg-blue-600" }
    };
    
    const config = statusConfig[status];
    
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };
  
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="flex items-center">
          {icon && <div className="mr-2 text-primary">{icon}</div>}
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
        </div>
        {status && (
          <div>{getStatusBadge()}</div>
        )}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      <CardFooter className="flex justify-between">
        {footerContent}
        {onAction && (
          <Button size="sm" onClick={onAction}>{actionLabel}</Button>
        )}
      </CardFooter>
    </Card>
  );
};
