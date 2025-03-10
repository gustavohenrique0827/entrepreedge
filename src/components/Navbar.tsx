
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Bell, Moon, Settings, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

interface NavbarProps {
  items: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ items }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      // Handle anchor links
      const id = href.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300 ease-in-out px-6 py-4',
        scrolled ? 'glass shadow-sm backdrop-blur-lg' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {items.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "flex items-center text-sm font-medium gap-2",
                  location.hash === item.href || (item.href === '#dashboard' && !location.hash)
                    ? "bg-accent/50 text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
                onClick={() => handleNavigation(item.href)}
              >
                <span className="mr-1">{item.icon}</span>
                <span>{item.name}</span>
              </Button>
            ))}
          </nav>

          {/* User navigation */}
          <div className="flex items-center space-x-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <Bell size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Moon size={18} />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Settings size={18} />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full ml-2 bg-primary/10">
              <User size={18} className="text-primary" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-foreground focus:outline-none"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
            {items.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => handleNavigation(item.href)}
              >
                <span className="mr-2">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
