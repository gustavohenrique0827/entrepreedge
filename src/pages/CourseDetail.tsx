
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface CourseModule {
  id: string;
  title: string;
  duration: string;
  isLocked: boolean;
  isCompleted: boolean;
}

interface Course {
  id: string;
  title: string;
  description: string;
  modules: CourseModule[];
  totalModules: number;
  completed: number;
  duration: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  image: string;
  popular?: boolean;
  new?: boolean;
  instructor: string;
  rating: number;
}

// Sample course data
const courses: Record<string, Course> = {
  '1': {
    id: '1',
    title: 'Fundamentos de gestão financeira',
    description: 'Aprenda os conceitos básicos de gestão financeira para pequenos negócios. Este curso aborda desde o controle básico de fluxo de caixa até análises mais complexas de viabilidade financeira.',
    totalModules: 8,
    completed: 3,
    duration: '2h 30min',
    level: 'Iniciante',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true,
    instructor: 'Ana Silva',
    rating: 4.7,
    modules: [
      { id: 'm1', title: 'Introdução à gestão financeira', duration: '15min', isLocked: false, isCompleted: true },
      { id: 'm2', title: 'Fluxo de caixa básico', duration: '20min', isLocked: false, isCompleted: true },
      { id: 'm3', title: 'Gestão de despesas', duration: '25min', isLocked: false, isCompleted: true },
      { id: 'm4', title: 'Precificação de produtos e serviços', duration: '30min', isLocked: false, isCompleted: false },
      { id: 'm5', title: 'Indicadores financeiros', duration: '20min', isLocked: true, isCompleted: false },
      { id: 'm6', title: 'Planejamento financeiro', duration: '20min', isLocked: true, isCompleted: false },
      { id: 'm7', title: 'Análise de investimentos', duration: '15min', isLocked: true, isCompleted: false },
      { id: 'm8', title: 'Estudo de caso prático', duration: '25min', isLocked: true, isCompleted: false },
    ]
  },
  '2': {
    id: '2',
    title: 'Marketing digital para empreendedores',
    description: 'Estratégias eficientes de marketing digital com baixo investimento para empreendedores que desejam aumentar sua presença online e gerar mais vendas.',
    totalModules: 6,
    completed: 0,
    duration: '1h 45min',
    level: 'Intermediário',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    new: true,
    instructor: 'Carlos Oliveira',
    rating: 4.5,
    modules: [
      { id: 'm1', title: 'Fundamentos de marketing digital', duration: '20min', isLocked: false, isCompleted: false },
      { id: 'm2', title: 'Estratégias para redes sociais', duration: '15min', isLocked: true, isCompleted: false },
      { id: 'm3', title: 'Email marketing eficiente', duration: '15min', isLocked: true, isCompleted: false },
      { id: 'm4', title: 'SEO para pequenas empresas', duration: '25min', isLocked: true, isCompleted: false },
      { id: 'm5', title: 'Análise de métricas', duration: '15min', isLocked: true, isCompleted: false },
      { id: 'm6', title: 'Campanhas de baixo custo', duration: '15min', isLocked: true, isCompleted: false },
    ]
  },
  '3': {
    id: '3',
    title: 'Planejamento estratégico',
    description: 'Como definir e executar um planejamento estratégico para seu negócio, alinhando objetivos de curto, médio e longo prazo com a visão da empresa.',
    totalModules: 5,
    completed: 0,
    duration: '2h 15min',
    level: 'Avançado',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    instructor: 'Mariana Costa',
    rating: 4.9,
    modules: [
      { id: 'm1', title: 'Fundamentos do planejamento estratégico', duration: '25min', isLocked: false, isCompleted: false },
      { id: 'm2', title: 'Análise SWOT aplicada', duration: '30min', isLocked: true, isCompleted: false },
      { id: 'm3', title: 'Definição de objetivos e metas', duration: '20min', isLocked: true, isCompleted: false },
      { id: 'm4', title: 'Implementação e monitoramento', duration: '30min', isLocked: true, isCompleted: false },
      { id: 'm5', title: 'Revisão e ajustes estratégicos', duration: '30min', isLocked: true, isCompleted: false },
    ]
  }
};

const CourseDetail = () => {
  const { courseId } = useParams<{courseId: string}>();
  const course = courseId ? courses[courseId] : null;
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 13H11V3H3V13ZM3 21H11V15H3V21ZM13 21H21V11H13V21ZM13 3V9H21V3H13Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Finanças',
      href: '/#finances',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.31 11.14C10.54 10.69 9.97 10.2 9.97 9.47C9.97 8.63 10.76 8.04 12.07 8.04C13.45 8.04 13.97 8.7 14.03 9.64H15.72C15.67 8.34 14.9 7.11 13.23 6.71V5H10.9V6.69C9.39 7.01 8.18 7.97 8.18 9.47C8.18 11.21 9.67 12.08 11.84 12.61C13.79 13.08 14.18 13.73 14.18 14.47C14.18 15 13.75 15.93 12.07 15.93C10.5 15.93 9.85 15.22 9.76 14.33H8.07C8.17 15.93 9.4 16.9 10.9 17.2V19H13.23V17.22C14.75 16.94 15.97 16.07 15.97 14.47C15.97 12.36 14.07 11.6 12.31 11.14Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Metas',
      href: '/#goals',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM13.96 12.29L11.21 15.83L9.25 13.47L6.5 17H17.5L13.96 12.29Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Aprendizado',
      href: '/#learn',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 3L1 9L5 11.18V17.18L12 21L19 17.18V11.18L21 10.09V17H23V9L12 3ZM18.82 9L12 12.72L5.18 9L12 5.28L18.82 9ZM17 16L12 18.72L7 16V12.27L12 15L17 12.27V16Z" fill="currentColor" />
        </svg>
      )
    },
    {
      name: 'Contato',
      href: '/contact',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor" />
        </svg>
      )
    },
  ];

  if (!course) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar items={navItems} />
        <div className="pt-28 pb-16 container px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-bold mb-4">Curso não encontrado</h1>
            <p className="text-muted-foreground mb-6">O curso que você está procurando não existe ou foi removido.</p>
            <Link to="/#learn">
              <Button>Voltar para cursos</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const progressPercent = (course.completed / course.totalModules) * 100;
  
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Iniciante':
        return 'bg-green-100 text-green-800';
      case 'Intermediário':
        return 'bg-blue-100 text-blue-800';
      case 'Avançado':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar items={navItems} />
      
      <div className="pt-28 pb-16 container px-4">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <Link to="/#learn" className="text-sm text-primary hover:underline inline-flex items-center mb-4">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor" />
              </svg>
              Voltar para cursos
            </Link>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-2/3">
                <div className="relative h-48 md:h-72 rounded-lg overflow-hidden mb-4">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
                    {course.new && (
                      <Badge className="bg-blue-500 hover:bg-blue-600">Novo</Badge>
                    )}
                    {course.popular && (
                      <Badge className="bg-amber-500 hover:bg-amber-600">Popular</Badge>
                    )}
                  </div>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{course.title}</h1>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-muted-foreground">
                      <path d="M12 6V12L16 14M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{course.duration}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-muted-foreground">
                      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
                    </svg>
                    <span>{course.instructor}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1 text-amber-500">
                      <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" />
                    </svg>
                    <span>{course.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${getLevelColor(course.level)}`}>
                      {course.level}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="md:w-1/3">
                <Card className="glass sticky top-24">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-xl">Progresso do curso</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex justify-between items-center text-sm mb-2">
                      <span className="text-muted-foreground">
                        {course.completed} de {course.totalModules} módulos
                      </span>
                      <span className="font-medium">{Math.round(progressPercent)}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2 mb-6" />
                    
                    <Button className="w-full mb-3 bg-primary text-white">
                      {course.completed > 0 ? 'Continuar curso' : 'Começar curso'}
                    </Button>
                    
                    <p className="text-xs text-center text-muted-foreground">
                      {course.completed > 0 
                        ? 'Último acesso: há 3 dias' 
                        : 'Acesso liberado por 90 dias'}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="content" className="mt-10">
            <TabsList className="glass mb-6">
              <TabsTrigger value="content">Conteúdo</TabsTrigger>
              <TabsTrigger value="resources">Recursos</TabsTrigger>
              <TabsTrigger value="reviews">Avaliações</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="space-y-4">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Módulos do curso</CardTitle>
                  <CardDescription>
                    {course.totalModules} módulos • {course.duration} de conteúdo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {course.modules.map((module, index) => (
                      <div 
                        key={module.id}
                        className={`p-3 rounded-lg border ${module.isCompleted ? 'bg-primary/5 border-primary/20' : 'hover:bg-muted/50'} transition-colors`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-start">
                            <div className={`flex-shrink-0 w-8 h-8 rounded-full mr-3 flex items-center justify-center ${module.isCompleted ? 'bg-primary text-white' : module.isLocked ? 'bg-muted text-muted-foreground' : 'bg-secondary text-secondary-foreground'}`}>
                              {module.isCompleted ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                                </svg>
                              ) : module.isLocked ? (
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8Z" fill="currentColor" />
                                </svg>
                              ) : (
                                <span>{index + 1}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{module.title}</p>
                              <p className="text-xs text-muted-foreground mt-0.5">{module.duration}</p>
                            </div>
                          </div>
                          
                          <Button 
                            size="sm" 
                            variant={module.isLocked ? "outline" : "default"}
                            disabled={module.isLocked}
                            className={module.isCompleted ? "bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary" : ""}
                          >
                            {module.isCompleted ? 'Rever' : module.isLocked ? 'Bloqueado' : 'Iniciar'}
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="resources">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Materiais complementares</CardTitle>
                  <CardDescription>
                    Recursos adicionais para aprofundar seu conhecimento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 bg-blue-100 rounded">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16H16V18H8V16ZM8 12H16V14H8V12ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="#3B82F6" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Planilha de fluxo de caixa</p>
                          <p className="text-xs text-muted-foreground">Excel • 250KB</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M5 20H19V18H5V20ZM19 9H15V3H9V9H5L12 16L19 9Z" fill="currentColor" />
                        </svg>
                        Download
                      </Button>
                    </div>
                    
                    <div className="p-4 border rounded-lg flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="mr-3 p-2 bg-red-100 rounded">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 16H16V18H8V16ZM8 12H16V14H8V12ZM14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.89 22 5.99 22H18C19.1 22 20 21.1 20 20V8L14 2ZM18 20H6V4H13V9H18V20Z" fill="#EF4444" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Guia de gestão financeira</p>
                          <p className="text-xs text-muted-foreground">PDF • 1.2MB</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                          <path d="M5 20H19V18H5V20ZM19 9H15V3H9V9H5L12 16L19 9Z" fill="currentColor" />
                        </svg>
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews">
              <Card className="glass">
                <CardHeader>
                  <CardTitle>Avaliações dos alunos</CardTitle>
                  <CardDescription>
                    O que outros empreendedores acharam deste curso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="font-medium">RS</span>
                          </div>
                          <div>
                            <p className="font-medium">Ricardo Santos</p>
                            <div className="flex items-center">
                              {Array(5).fill(0).map((_, i) => (
                                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-500">
                                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" />
                                </svg>
                              ))}
                              <span className="text-xs text-muted-foreground ml-2">há 2 semanas</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        Curso excelente! Consegui aplicar os conceitos imediatamente no meu negócio e já estou vendo resultados. O material é bem explicado e fácil de seguir.
                      </p>
                    </div>
                    
                    <div className="border-b pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                            <span className="font-medium">MP</span>
                          </div>
                          <div>
                            <p className="font-medium">Maria Pereira</p>
                            <div className="flex items-center">
                              {Array(4).fill(0).map((_, i) => (
                                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-amber-500">
                                  <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" />
                                </svg>
                              ))}
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground">
                                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" fill="currentColor" />
                              </svg>
                              <span className="text-xs text-muted-foreground ml-2">há 1 mês</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        Conteúdo muito bom e prático. Gostaria que tivesse mais exemplos práticos, mas ainda assim aprendi bastante e estou implementando no meu dia a dia.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">Ver todas as avaliações</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <footer className="glass mt-12 py-8 border-t">
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

export default CourseDetail;
