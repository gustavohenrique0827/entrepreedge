
import React from 'react';
import { Bell, Moon, Settings, User, HelpCircle, LogOut } from 'lucide-react';
import { TooltipProvider } from "@/components/ui/tooltip";
import NavAction from './NavAction';

interface ActionBarProps {
  onHelpClick: () => void;
  onNotificationsClick: () => void;
  onThemeToggle: () => void;
  onSettingsClick: () => void;
  onProfileClick: () => void;
  onLogout: () => void;
  companyName: string;
}

const ActionBar = ({
  onHelpClick,
  onNotificationsClick,
  onThemeToggle,
  onSettingsClick,
  onProfileClick,
  onLogout,
  companyName
}: ActionBarProps) => {
  return (
    <div className="flex items-center space-x-1">
      <TooltipProvider>
        <NavAction
          icon={<HelpCircle size={16} />}
          label="Ajuda e Contato"
          onClick={onHelpClick}
        />
        
        <NavAction
          icon={<Bell size={16} />}
          label="Notificações"
          onClick={onNotificationsClick}
        />
        
        <NavAction
          icon={<Moon size={16} />}
          label="Alternar Tema"
          onClick={onThemeToggle}
        />
        
        <NavAction
          icon={<Settings size={16} />}
          label="Configurações do Sistema"
          onClick={onSettingsClick}
        />
        
        <NavAction
          icon={<User size={16} className="text-primary" />}
          label={`Perfil de ${companyName}`}
          variant="outline"
          className="ml-1 bg-primary/10"
          onClick={onProfileClick}
        />
        
        <NavAction
          icon={<LogOut size={16} />}
          label="Sair"
          className="text-red-500 hover:bg-red-50"
          onClick={onLogout}
        />
      </TooltipProvider>
    </div>
  );
};

export default ActionBar;
