
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSegment } from '@/contexts/SegmentContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from "@/components/ui/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  items?: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const { currentSegment, segmentName } = useSegment();
  const { logout } = useAuth();
  const { toast } = useToast();
  const location = useLocation();
  const { setTheme } = useTheme();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado do sistema.",
    });
  };

  const isAuthPage = location.pathname === '/auth';
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const userEmail = localStorage.getItem('userEmail') || 'N/A';

  return (
    <nav className="bg-background border-b sticky top-0 z-50">
      <div className="container max-w-7xl h-16 flex items-center justify-between">
        <Link to="/" className="font-bold text-xl">
          EntrepreEdge <span className="text-sm text-muted-foreground">v2.0</span>
        </Link>

        <div className="flex items-center gap-4">
          {!isAuthPage && isLoggedIn && (
            <>
              <Link to="/segment-test" className="nav-link">
                <span>Teste de Segmentos</span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="absolute right-0 mt-2 w-56">
                  <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Link to="/settings" className="w-full h-full block">
                      Configurações
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="/profile" className="w-full h-full block">
                      Perfil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          )}

          <button className="p-1 rounded-full relative" onClick={() => setTheme(theme => theme === "light" ? "dark" : "light")}>
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
