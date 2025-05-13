
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface FormLayoutProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading?: boolean;
  isSuccess?: boolean;
  successMessage?: string;
  error?: string;
}

export function FormLayout({
  title,
  description,
  children,
  footer,
  onSubmit,
  isLoading = false,
  isSuccess = false,
  successMessage = "Dados salvos com sucesso!",
  error
}: FormLayoutProps) {
  const [showSuccess, setShowSuccess] = React.useState(false);
  
  React.useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <Card className="w-full">
      <form onSubmit={onSubmit}>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
          
          {error && (
            <div className="rounded-md bg-destructive/15 p-3 text-destructive text-sm">
              {error}
            </div>
          )}
          
          {showSuccess && (
            <div className="rounded-md bg-green-100 p-3 text-green-800 text-sm">
              {successMessage}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {footer || (
            onSubmit && (
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar
              </Button>
            )
          )}
        </CardFooter>
      </form>
    </Card>
  );
}
