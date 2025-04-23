
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Bell, Moon, Settings, User, Search, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from "@/hooks/use-toast";
import { useTheme } from '@/contexts/ThemeContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface NavbarProps {
  items?: Array<{
    name: string;
    href: string;
    icon: React.ReactNode;
  }>;
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { toggleDarkMode, darkMode } = useTheme();
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when navigation happens
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('companyName');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate('/auth');
  };

  const handleDarkModeToggle = () => {
    toggleDarkMode(!darkMode);
  };

  const companyName = localStorage.getItem('companyName') || 'EntrepreEdge';
  
  const handleHelpClick = () => {
    navigate('/contact');
  };
  
  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 ease-in-out px-4 py-3',
        scrolled ? 'glass shadow-sm backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                type="search" 
                placeholder="Pesquisar..." 
                className="w-full pl-9 bg-background/50 text-sm"
              />
            </div>
          </div>

          {/* Title on mobile */}
          <div className="md:hidden font-semibold text-sm">
            {companyName}
          </div>

          {/* User navigation */}
          <div className="flex items-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full h-8 w-8"
                    onClick={handleHelpClick}
                    type="button"
                  >
                    <HelpCircle size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Ajuda e Contato</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full h-8 w-8"
                    type="button"
                  >
                    <Bell size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notificações</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full h-8 w-8"
                    onClick={handleDarkModeToggle}
                    type="button"
                  >
                    <Moon size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{darkMode ? 'Modo Claro' : 'Modo Escuro'}</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full h-8 w-8"
                    onClick={() => navigate('/settings')}
                    type="button"
                  >
                    <Settings size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Configurações do Sistema</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full ml-1 bg-primary/10 h-8 w-8"
                    onClick={handleProfileClick}
                    type="button"
                  >
                    <User size={16} className="text-primary" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Perfil de {companyName}</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full h-8 w-8 text-red-500 hover:bg-red-50"
                    onClick={handleLogout}
                    type="button"
                  >
                    <LogOut size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Sair</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground focus:outline-none"
            type="button"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
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
              onClick={handleLogout}
              type="button"
            >
              <LogOut size={16} className="mr-3" />
              <span>Sair</span>
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
