
import React from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useParams, Link } from 'react-router-dom';
import { 
  Home, 
  BarChart2, 
  Target, 
  BookOpen,
  Play,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const MOCK_COURSES = [
  {
    id: "1",
    title: "Fundamentos do Empreendedorismo",
    description: "Aprenda os conceitos básicos para iniciar seu negócio de sucesso.",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1470&auto=format&fit=crop",
    author: "Maria Silva",
    duration: "3 horas",
    modules: [
      {
        title: "Introdução ao Empreendedorismo",
        lessons: [
          { title: "O que é empreendedorismo?", duration: "15min", completed: true },
          { title: "Mentalidade empreendedora", duration: "20min", completed: true },
          { title: "Identificando oportunidades", duration: "25min", completed: false }
        ]
      },
      {
        title: "Planejamento de Negócios",
        lessons: [
          { title: "Modelos de negócios", duration: "30min", completed: false },
          { title: "Análise de mercado", duration: "25min", completed: false },
          { title: "Plano financeiro básico", duration: "40min", completed: false }
        ]
      },
      {
        title: "Marketing para Pequenos Negócios",
        lessons: [
          { title: "Fundamentos de marketing", duration: "20min", completed: false },
          { title: "Marketing digital", duration: "35min", completed: false },
          { title: "Estratégias de baixo custo", duration: "25min", completed: false }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Finanças para Empreendedores",
    description: "Gerencie o dinheiro do seu negócio de forma eficiente e sustentável.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop",
    author: "Carlos Mendes",
    duration: "4 horas",
    modules: [
      {
        title: "Fundamentos Financeiros",
        lessons: [
          { title: "Conceitos básicos", duration: "20min", completed: false },
          { title: "Fluxo de caixa", duration: "25min", completed: false },
          { title: "Precificação", duration: "30min", completed: false }
        ]
      },
      {
        title: "Gestão Financeira",
        lessons: [
          { title: "Controle de despesas", duration: "25min", completed: false },
          { title: "Planejamento financeiro", duration: "35min", completed: false },
          { title: "Análise de resultados", duration: "30min", completed: false }
        ]
      }
    ]
  }
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const course = MOCK_COURSES.find(c => c.id === courseId);
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/',
      icon: <Home size={18} />
    },
    {
      name: 'Finanças',
      href: '/#finances',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Metas',
      href: '/#goals',
      icon: <Target size={18} />
    },
    {
      name: 'Aprendizado',
      href: '/#learn',
      icon: <BookOpen size={18} />
    },
  ];

  // Calculate completion percentage
  const calculateProgress = () => {
    if (!course) return 0;
    
    let completedLessons = 0;
    let totalLessons = 0;
    
    course.modules.forEach(module => {
      module.lessons.forEach(lesson => {
        totalLessons++;
        if (lesson.completed) completedLessons++;
      });
    });
    
    return totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <div className="flex-1 ml-[240px] transition-all duration-300">
          <Navbar items={navItems} />
          <div className="container px-4 py-12 mt-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Curso não encontrado</h1>
            <Link to="/#learn">
              <Button>Voltar para cursos</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar items={navItems} />
        
        <div className="container px-4 py-12">
          <div className="flex items-center mb-6">
            <Link to="/#learn" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={18} className="mr-2" />
              <span>Voltar para cursos</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass p-6 rounded-xl mb-8">
                <div className="aspect-video rounded-lg overflow-hidden mb-6 relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <Button className="rounded-full" size="lg">
                      <Play className="mr-2" size={20} />
                      Começar curso
                    </Button>
                  </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-3">{course.title}</h1>
                <p className="text-muted-foreground mb-4">{course.description}</p>
                
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12.5 7H11V13L16.2 16.2L17 14.9L12.5 12.2V7Z" fill="currentColor" />
                    </svg>
                    {course.duration}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="currentColor" />
                    </svg>
                    {course.author}
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progresso do curso</span>
                    <span>{Math.round(calculateProgress())}%</span>
                  </div>
                  <Progress value={calculateProgress()} className="h-2" />
                </div>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Conteúdo do Curso</h2>
                
                <div className="space-y-6">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border border-border rounded-lg">
                      <div className="p-4 border-b border-border bg-secondary/20">
                        <h3 className="text-lg font-semibold">{module.title}</h3>
                      </div>
                      <div className="divide-y divide-border">
                        {module.lessons.map((lesson, lessonIndex) => (
                          <div 
                            key={lessonIndex} 
                            className="p-4 flex items-center justify-between"
                          >
                            <div className="flex items-center">
                              {lesson.completed ? (
                                <CheckCircle2 size={20} className="text-green-500 mr-3" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border border-border mr-3 flex items-center justify-center">
                                  <span className="text-xs">{moduleIndex + 1}.{lessonIndex + 1}</span>
                                </div>
                              )}
                              <div>
                                <h4 className="font-medium">{lesson.title}</h4>
                                <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="rounded-full">
                              <Play size={16} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div>
              <div className="glass p-6 rounded-xl mb-6">
                <h2 className="text-xl font-bold mb-4">Sobre este curso</h2>
                <div className="space-y-4 text-sm">
                  <p>
                    Este curso foi desenvolvido para ajudar empreendedores iniciantes a construir uma base sólida para 
                    seus negócios. Abordamos conceitos fundamentais que são essenciais para o sucesso empresarial.
                  </p>
                  <p>
                    Os módulos foram organizados de forma progressiva, permitindo que você construa seu conhecimento 
                    passo a passo, desde os conceitos básicos até estratégias mais avançadas.
                  </p>
                  <p>
                    Cada aula inclui exemplos práticos e exercícios para ajudar você a aplicar o conhecimento adquirido 
                    em seu próprio negócio imediatamente.
                  </p>
                </div>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">O que você vai aprender</h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500 mr-2 flex-shrink-0 mt-0.5">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Como identificar oportunidades de negócio viáveis</span>
                  </li>
                  <li className="flex items-start">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500 mr-2 flex-shrink-0 mt-0.5">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Desenvolver uma mentalidade empreendedora</span>
                  </li>
                  <li className="flex items-start">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500 mr-2 flex-shrink-0 mt-0.5">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Técnicas de planejamento financeiro para pequenos negócios</span>
                  </li>
                  <li className="flex items-start">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500 mr-2 flex-shrink-0 mt-0.5">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Estratégias de marketing eficientes e de baixo custo</span>
                  </li>
                  <li className="flex items-start">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500 mr-2 flex-shrink-0 mt-0.5">
                      <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                    </svg>
                    <span>Como analisar o mercado e a concorrência</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
