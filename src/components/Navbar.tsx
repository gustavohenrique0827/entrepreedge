
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  MessageSquare, 
  Search, 
  Menu,
  ChevronDown
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from 'react-router-dom';
import { useSegment } from '@/contexts/SegmentContext';

// Define the interface for the navigation items
interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  items?: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items = [] }) => {
  const navigate = useNavigate();
  const { segmentName } = useSegment();
  
  // Users can set a profile picture in localStorage
  const profilePicture = localStorage.getItem('profilePicture') || '';
  const userName = localStorage.getItem('userName') || 'Usuário';
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  
  return (
    <header className="sticky top-0 z-30 bg-background border-b px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2 md:hidden">
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 flex items-center gap-4 max-w-sm">
        <div className="relative flex-1 hidden sm:block">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Pesquisar..." className="pl-8" />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-1">
          {items.map((item, index) => (
            <Button key={index} variant="ghost" asChild>
              <Link to={item.href} className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <Bell className="h-4 w-4" />
              <span>Notificações</span>
              <Badge className="ml-1 bg-primary rounded-full h-5 w-5 p-0 flex items-center justify-center">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificações</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {/* Notification items would go here */}
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Nova mensagem</p>
                <p className="text-sm text-muted-foreground">Você recebeu uma nova mensagem</p>
                <p className="text-xs text-muted-foreground">Há 5 minutos</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Lembrete de reunião</p>
                <p className="text-sm text-muted-foreground">Reunião com equipe em 15 minutos</p>
                <p className="text-xs text-muted-foreground">Há 20 minutos</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Atualização de sistema</p>
                <p className="text-sm text-muted-foreground">O sistema foi atualizado para versão 2.3</p>
                <p className="text-xs text-muted-foreground">Há 1 hora</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <Button variant="ghost" className="w-full justify-center">Ver todas</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" className="sm:hidden">
          <Bell className="h-5 w-5" />
        </Button>
        
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
          <span className="sr-only">Mensagens</span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                {profilePicture && <AvatarImage src={profilePicture} />}
                <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 ml-1" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              <div>
                <p>{userName}</p>
                <p className="text-xs font-normal text-muted-foreground">
                  {segmentName}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile">Meu Perfil</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings">Configurações</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/help">Ajuda</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
