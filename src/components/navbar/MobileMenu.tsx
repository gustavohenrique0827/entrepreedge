
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LogOut, Search } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  items?: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
  }>;
  onLogout: () => void;
}

const MobileMenu = ({ isOpen, items, onLogout }: MobileMenuProps) => {
  if (!isOpen) return null;

  return (
    <nav className="mt-4 pb-4 md:hidden flex flex-col space-y-4 animate-fade-in">
      <div className="relative w-full mb-4">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input 
          type="search" 
          placeholder="Pesquisar..." 
          className="w-full pl-9 text-sm"
        />
      </div>
      {items && items.length > 0 && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <a 
              key={index}
              href={item.href}
              className="flex items-center p-2 rounded-md hover:bg-primary/10 text-sm"
            >
              <span className="mr-3 text-primary">{item.icon}</span>
              <span>{item.name}</span>
            </a>
          ))}
        </div>
      )}
      
      <Button 
        variant="ghost" 
        className="flex items-center justify-start p-2 rounded-md hover:bg-red-50 text-red-500 text-sm"
        onClick={onLogout}
      >
        <LogOut size={16} className="mr-3" />
        <span>Sair</span>
      </Button>
    </nav>
  );
};

export default MobileMenu;
