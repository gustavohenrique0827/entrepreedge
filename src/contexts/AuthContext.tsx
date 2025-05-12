
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextProps {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  userEmail: string | null;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  userEmail: null,
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [userEmail, setUserEmail] = useState<string | null>(
    localStorage.getItem('userEmail')
  );
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const storedEmail = localStorage.getItem('userEmail');
      setIsAuthenticated(isLoggedIn);
      setUserEmail(storedEmail);
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  const login = async (email: string, password: string) => {
    // In a real application, you would validate against a backend
    try {
      // Simulate API call
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      setIsAuthenticated(true);
      setUserEmail(email);

      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
        variant: "success",
      });

      // Check if onboarding is needed
      const onboardingCompleted = localStorage.getItem('onboardingCompleted') === 'true';
      if (!onboardingCompleted) {
        navigate('/onboarding');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({
        title: "Falha no login",
        description: "Credenciais inválidas. Tente novamente.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const logout = () => {
    localStorage.setItem('isLoggedIn', 'false');
    setIsAuthenticated(false);
    setUserEmail(null);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
