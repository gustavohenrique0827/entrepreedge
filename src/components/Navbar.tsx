
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import SearchBar from './navbar/SearchBar';
import ActionBar from './navbar/ActionBar';
import MobileMenu from './navbar/MobileMenu';

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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const companyName = localStorage.getItem('companyName') || 'EntrepreEdge';
  
  const handleHelpClick = () => {
    navigate('/contact');
  };
  
  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleThemeToggle = () => {
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    toast({
      title: `Tema ${newTheme === 'dark' ? 'escuro' : 'claro'} ativado`,
      description: "A aparência da aplicação foi atualizada.",
    });
  };

  const handleNotificationsClick = () => {
    toast({
      title: "Notificações",
      description: "Você não tem novas notificações no momento.",
    });
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
            <SearchBar />
          </div>

          {/* Title on mobile */}
          <div className="md:hidden font-semibold text-sm">
            {companyName}
          </div>

          {/* User navigation */}
          <ActionBar 
            onHelpClick={handleHelpClick}
            onNotificationsClick={handleNotificationsClick}
            onThemeToggle={handleThemeToggle}
            onSettingsClick={handleSettingsClick}
            onProfileClick={handleProfileClick}
            onLogout={handleLogout}
            companyName={companyName}
          />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground focus:outline-none"
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
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          items={items} 
          onLogout={handleLogout} 
        />
      </div>
    </header>
  );
};

export default Navbar;
