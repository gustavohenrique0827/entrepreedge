
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import FinanceTracker from '@/components/FinanceTracker';
import GoalTracker from '@/components/GoalTracker';
import LearnSection from '@/components/LearnSection';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    {
      name: 'Dashboard',
      href: '#dashboard',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Finanças',
      href: '#finances',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.03 9.64H15.72C15.67 8.34 14.9 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.97 8.18 9.47C8.18 11.21 9.67 12.08 11.84 12.61C13.79 13.08 14.18 13.73 14.18 14.47C14.18 15 13.75 15.93 12.07 15.93C10.5 15.93 9.85 15.22 9.76 14.33H8.07C8.17 15.93 9.4 16.9 10.9 17.2V19H13.23V17.22C14.75 16.94 15.97 16.07 15.97 14.47C15.97 12.36 14.07 11.6 12.31 11.14Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Metas',
      href: '#goals',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Aprendizado',
      href: '#learn',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" fill="currentColor" />
        </svg>
      )
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar items={navItems} />
      
      <div
        className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-primary/5 to-transparent overflow-hidden"
        style={{
          backgroundSize: '200% 200%',
          backgroundPosition: `0% ${Math.min(scrollY / 10, 100)}%`,
        }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1568992687947-868a62a9f521?q=80&w=2832')] bg-cover bg-center opacity-[0.03]"
            style={{
              transform: `translateY(${scrollY * 0.2}px)`,
            }}
          />
        </div>
        
        <div 
          className="container px-4 py-20 mt-16 relative z-10"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
          <div className="text-center mb-8 animate-slide-down">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              EntrepreEdge
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Plataforma simplificada para gestão de negócios
            </p>
          </div>
          
          <div className="max-w-lg mx-auto flex justify-center space-x-4 animate-slide-up">
            <a 
              href="#dashboard" 
              className="px-6 py-2.5 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('dashboard');
                document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Começar
            </a>
            <a 
              href="#learn" 
              className="px-6 py-2.5 bg-secondary text-secondary-foreground rounded-full font-medium hover:bg-secondary/90 transition-colors"
              onClick={(e) => {
                e.preventDefault();
                setActiveTab('learn');
                document.getElementById('main-content')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Aprenda agora
            </a>
          </div>
        </div>
      </div>
      
      <div id="main-content" className="container px-4 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="glass grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="finances">Finanças</TabsTrigger>
            <TabsTrigger value="goals">Metas</TabsTrigger>
            <TabsTrigger value="learn">Aprendizado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="dashboard" className="space-y-12">
            <section className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass stat-card">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Saldo atual</p>
                    <div className="text-muted-foreground">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.03 9.64H15.72C15.67 8.34 14.9 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.97 8.18 9.47C8.18 11.21 9.67 12.08 11.84 12.61C13.79 13.08 14.18 13.73 14.18 14.47C14.18 15 13.75 15.93 12.07 15.93C10.5 15.93 9.85 15.22 9.76 14.33H8.07C8.17 15.93 9.4 16.9 10.9 17.2V19H13.23V17.22C14.75 16.94 15.97 16.07 15.97 14.47C15.97 12.36 14.07 11.6 12.31 11.14Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-1">
                    <h3 className="text-2xl font-semibold">R$ 1.430,00</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium flex items-center text-green-500">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                          <path d="M12 3L20 11L17.6 13.4L13 8.8V21H11V8.8L6.4 13.4L4 11L12 3Z" fill="currentColor" />
                        </svg>
                        12,5%
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">desde o mês passado</span>
                    </div>
                  </div>
                </div>
                <div className="glass stat-card">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Metas concluídas</p>
                    <div className="text-muted-foreground">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 6V12L16 14M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-1">
                    <h3 className="text-2xl font-semibold">2 de 5</h3>
                    <div className="mt-2">
                      <div className="w-full bg-secondary rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="glass stat-card">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-medium text-muted-foreground">Cursos completos</p>
                    <div className="text-muted-foreground">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                  <div className="mt-1">
                    <h3 className="text-2xl font-semibold">1</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-xs font-medium flex items-center text-blue-500">
                        3 em andamento
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Finanças</h2>
              <FinanceTracker />
            </section>
            
            <section className="mb-12">
              <GoalTracker />
            </section>
          </TabsContent>
          
          <TabsContent value="finances">
            <section className="py-6">
              <h2 className="text-2xl font-bold mb-6">Gestão Financeira</h2>
              <FinanceTracker />
            </section>
          </TabsContent>
          
          <TabsContent value="goals">
            <section className="py-6">
              <GoalTracker />
            </section>
          </TabsContent>
          
          <TabsContent value="learn">
            <section className="py-6">
              <LearnSection />
            </section>
          </TabsContent>
        </Tabs>
      </div>
      
      <footer className="glass mt-24 py-8 border-t">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="bg-primary rounded-md p-1 mr-2">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L17 7H14V13H10V7H7L12 2Z" fill="white" />
                  <path d="M19 14H5V17H19V14Z" fill="white" />
                  <path d="M17 18H7V22H17V18Z" fill="white" />
                </svg>
              </div>
              <span className="text-lg font-semibold">EntrepreEdge</span>
            </div>
            
            <div className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} EntrepreEdge. Todos os direitos reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
