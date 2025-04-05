
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { courses } from '@/lib/courseData';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { 
  Book, 
  BookOpen, 
  CheckCircle2, 
  PlayCircle, 
  Award, 
  FileText, 
  Clock, 
  ArrowLeft,
  Star,
  Share2,
  Download,
  ExternalLink,
  BookmarkPlus
} from 'lucide-react';

// Interface for course lessons
interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: 'video' | 'text' | 'quiz' | 'exercise';
  url?: string;
  externalResource?: {
    name: string;
    provider: string;
    url: string;
  };
}

// Interface for module structure
interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

// External courses from SEBRAE, SENAC, etc.
const externalCourses = [
  {
    title: "Empreendedorismo Básico",
    provider: "SEBRAE",
    url: "https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/empreendedorismo",
    description: "Aprenda os fundamentos do empreendedorismo.",
    duration: "20h"
  },
  {
    title: "Gestão Financeira para Pequenos Negócios",
    provider: "SENAC",
    url: "https://www.ead.senac.br/cursos-livres/gestao-financeira-para-pequenos-negocios/",
    description: "Aprimore suas habilidades em gestão financeira.",
    duration: "40h"
  },
  {
    title: "Marketing Digital para Empreendedores",
    provider: "SEBRAE",
    url: "https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/marketing-digital",
    description: "Estratégias de marketing digital para pequenas empresas.",
    duration: "15h"
  }
];

// Sample course modules with lessons
const sampleModules: CourseModule[] = [
  {
    id: "1",
    title: "Introdução ao Curso",
    description: "Conceitos básicos e visão geral",
    lessons: [
      {
        id: "1-1",
        title: "Boas-vindas e objetivos do curso",
        duration: "3:45",
        completed: true,
        type: "video"
      },
      {
        id: "1-2",
        title: "Preparando seu ambiente de aprendizagem",
        duration: "5:20",
        completed: true,
        type: "text"
      },
      {
        id: "1-3",
        title: "Quiz inicial de conhecimentos",
        duration: "10:00",
        completed: false,
        type: "quiz"
      }
    ]
  },
  {
    id: "2",
    title: "Fundamentos Importantes",
    description: "Aprendizado dos conceitos fundamentais",
    lessons: [
      {
        id: "2-1",
        title: "Conceitos essenciais do mercado",
        duration: "12:30",
        completed: false,
        type: "video",
        externalResource: {
          name: "Análise de Mercado para Iniciantes",
          provider: "SEBRAE",
          url: "https://www.sebrae.com.br/sites/PortalSebrae/artigos/como-fazer-uma-analise-de-mercado"
        }
      },
      {
        id: "2-2",
        title: "Principais desafios e soluções",
        duration: "8:15",
        completed: false,
        type: "video"
      },
      {
        id: "2-3",
        title: "Exercício prático aplicado",
        duration: "25:00",
        completed: false,
        type: "exercise"
      }
    ]
  },
  {
    id: "3",
    title: "Aplicação Prática",
    description: "Implementando o conhecimento adquirido",
    lessons: [
      {
        id: "3-1",
        title: "Estudo de caso: empresa de sucesso",
        duration: "15:45",
        completed: false,
        type: "video"
      },
      {
        id: "3-2",
        title: "Montando seu plano de ação",
        duration: "20:00",
        completed: false,
        type: "text",
        externalResource: {
          name: "Plano de Negócios",
          provider: "SENAC",
          url: "https://www.ead.senac.br/cursos-livres/plano-de-negocios/"
        }
      },
      {
        id: "3-3",
        title: "Avaliação final do módulo",
        duration: "30:00",
        completed: false,
        type: "quiz"
      }
    ]
  }
];

const CourseDetail = () => {
  const { courseId } = useParams();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('content');
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<CourseModule[]>(sampleModules);
  const { currentPlan, hasAccess } = useSubscription();
  const businessType = localStorage.getItem('businessType') || '';
  
  // Find course by ID
  useEffect(() => {
    if (courseId) {
      const foundCourse = courses.find(c => c.id === courseId);
      if (foundCourse) {
        setCourse(foundCourse);
        // Set first lesson as active if none is selected
        if (!activeLessonId && modules.length > 0 && modules[0].lessons.length > 0) {
          setActiveLessonId(modules[0].lessons[0].id);
        }
      }
    }
  }, [courseId]);
  
  // Check if user has access to this course
  const checkAccess = () => {
    if (currentPlan === 'premium') return true;
    
    if (!course) return false;
    
    if (currentPlan === 'free' && (course.level !== 'Iniciante' && !course.categories.includes('Financeiro'))) {
      return false;
    }
    
    if (currentPlan === 'starter' && course.categories.includes('Avançado')) {
      return false;
    }
    
    if (currentPlan === 'business' && course.categories.includes('Premium')) {
      return false;
    }
    
    return true;
  };

  const handleMarkComplete = (lessonId: string) => {
    setModules(prevModules => 
      prevModules.map(module => ({
        ...module,
        lessons: module.lessons.map(lesson => 
          lesson.id === lessonId 
            ? {...lesson, completed: !lesson.completed} 
            : lesson
        )
      }))
    );
    
    toast({
      title: "Aula atualizada",
      description: "Status da aula atualizado com sucesso.",
    });
  };
  
  const calculateProgress = () => {
    if (!modules) return 0;
    
    const totalLessons = modules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = modules.reduce(
      (acc, module) => acc + module.lessons.filter(l => l.completed).length, 0
    );
    
    return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  };
  
  const findCurrentLesson = () => {
    if (!activeLessonId) return null;
    
    for (const module of modules) {
      const lesson = module.lessons.find(l => l.id === activeLessonId);
      if (lesson) return lesson;
    }
    
    return null;
  };
  
  const currentLesson = findCurrentLesson();
  
  const getRecommendedCourses = () => {
    if (!course) return [];
    
    return courses.filter(c => 
      c.id !== courseId && 
      (c.categories.some(cat => course.categories.includes(cat)) || 
       c.categories.includes(businessType))
    ).slice(0, 3);
  };
  
  const getLessonIcon = (type: string) => {
    switch(type) {
      case 'video': return <PlayCircle size={16} className="text-blue-500" />;
      case 'text': return <FileText size={16} className="text-green-500" />;
      case 'quiz': return <CheckCircle2 size={16} className="text-purple-500" />;
      case 'exercise': return <Book size={16} className="text-amber-500" />;
      default: return <FileText size={16} />;
    }
  };
  
  if (!course) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <div className="flex-1 ml-[240px] transition-all duration-300">
          <Navbar />
          <div className="container px-4 py-6">
            <div className="flex items-center mb-6">
              <Link to="/learn" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft size={16} className="mr-1" /> Voltar para cursos
              </Link>
            </div>
            <Card className="p-8 text-center">
              <CardContent>
                <p>Curso não encontrado</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const hasUserAccess = checkAccess();
  
  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />
      
      <div className="flex-1 ml-[240px] transition-all duration-300">
        <Navbar />
        
        <div className="container px-4 py-6">
          <div className="flex items-center mb-6">
            <Link to="/learn" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={16} className="mr-1" /> Voltar para cursos
            </Link>
          </div>
          
          {!hasUserAccess ? (
            <Card className="p-8">
              <CardContent className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <BookOpen size={32} className="text-primary" />
                </div>
                <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
                <p className="text-muted-foreground mb-6">
                  Este curso está disponível apenas para planos mais avançados.
                </p>
                <Button 
                  onClick={() => {
                    localStorage.setItem('settingsTab', 'subscription');
                    window.location.href = '/settings';
                  }}
                >
                  Atualizar plano para acessar
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card className="mb-6 overflow-hidden">
                  <div className="h-48 w-full relative bg-gradient-to-r from-primary/30 to-primary/10">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6">
                      <Badge className={
                        course.level === 'Iniciante' ? 'bg-green-500' :
                        course.level === 'Intermediário' ? 'bg-blue-500' : 'bg-purple-500'
                      }>
                        {course.level}
                      </Badge>
                      <h1 className="text-2xl font-bold mt-2">{course.title}</h1>
                    </div>
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
                    <TabsList className="glass mb-4">
                      <TabsTrigger value="content">Conteúdo</TabsTrigger>
                      <TabsTrigger value="info">Informações</TabsTrigger>
                      <TabsTrigger value="resources">Recursos Adicionais</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="content">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-1 space-y-6">
                          <div className="bg-muted/50 p-4 rounded-md">
                            <h3 className="text-sm font-semibold mb-2 flex items-center">
                              <Book size={16} className="mr-2" /> Módulos do Curso
                            </h3>
                            <Separator className="mb-3" />
                            
                            {modules.map((module, index) => (
                              <div key={module.id} className="mb-4">
                                <h4 className="text-sm font-medium mb-1">
                                  {index + 1}. {module.title}
                                </h4>
                                <p className="text-xs text-muted-foreground mb-2">
                                  {module.description}
                                </p>
                                <ul className="space-y-1">
                                  {module.lessons.map(lesson => (
                                    <li 
                                      key={lesson.id}
                                      className={`
                                        text-xs p-2 rounded-md flex items-center justify-between cursor-pointer
                                        ${activeLessonId === lesson.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}
                                        ${lesson.completed ? 'text-muted-foreground' : ''}
                                      `}
                                      onClick={() => setActiveLessonId(lesson.id)}
                                    >
                                      <div className="flex items-center">
                                        <div className="mr-2">
                                          {getLessonIcon(lesson.type)}
                                        </div>
                                        <span className={lesson.completed ? 'line-through' : ''}>
                                          {lesson.title}
                                        </span>
                                      </div>
                                      <div className="flex items-center">
                                        <span className="text-xs text-muted-foreground mr-2">
                                          {lesson.duration}
                                        </span>
                                        <Button 
                                          variant="ghost" 
                                          size="icon" 
                                          className="h-4 w-4"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            handleMarkComplete(lesson.id);
                                          }}
                                        >
                                          <CheckCircle2 
                                            size={14} 
                                            className={lesson.completed ? 'text-green-500' : 'text-muted-foreground/50'} 
                                            fill={lesson.completed ? 'currentColor' : 'none'}
                                          />
                                        </Button>
                                      </div>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                          
                          <Card className="bg-gradient-to-br from-primary/20 to-primary/5 border-none shadow-sm">
                            <CardContent className="p-4">
                              <div className="flex justify-between items-center mb-2">
                                <h3 className="text-sm font-semibold">Progresso do curso</h3>
                                <span className="text-sm font-medium">{calculateProgress()}%</span>
                              </div>
                              <Progress value={calculateProgress()} className="h-2" />
                              <div className="mt-4 text-center">
                                <Button variant="outline" size="sm" className="w-full text-xs" onClick={() => {
                                  toast({
                                    title: "Certificado em progresso",
                                    description: "Complete o curso para obter seu certificado.",
                                    variant: calculateProgress() === 100 ? "default" : "destructive"
                                  });
                                }}>
                                  <Award size={14} className="mr-1" />
                                  {calculateProgress() === 100 ? 'Obter certificado' : 'Certificado bloqueado'}
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                        
                        <div className="lg:col-span-2">
                          {currentLesson && (
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <h2 className="text-lg font-semibold">{currentLesson.title}</h2>
                                <div className="flex items-center space-x-2">
                                  <Badge variant="outline" className="flex items-center">
                                    <Clock size={12} className="mr-1" />
                                    {currentLesson.duration}
                                  </Badge>
                                </div>
                              </div>
                              
                              {currentLesson.type === 'video' && (
                                <div className="aspect-video bg-muted rounded-md overflow-hidden">
                                  {/* Placeholder for video player */}
                                  <div className="w-full h-full flex items-center justify-center bg-primary/5">
                                    <PlayCircle size={48} className="text-primary/50" />
                                  </div>
                                </div>
                              )}
                              
                              {currentLesson.type === 'text' && (
                                <div className="prose max-w-none">
                                  <h3>Conteúdo da Lição</h3>
                                  <p>
                                    Este é um exemplo de conteúdo textual para a lição. Em uma implementação real, 
                                    este texto seria carregado de uma base de dados ou API. O conteúdo seria formatado 
                                    adequadamente usando HTML ou Markdown para melhor apresentação.
                                  </p>
                                  <p>
                                    Os pontos principais desta lição são:
                                  </p>
                                  <ul>
                                    <li>Compreender os conceitos fundamentais apresentados</li>
                                    <li>Aplicar o conhecimento em situações práticas</li>
                                    <li>Desenvolvimento de habilidades específicas para o seu negócio</li>
                                  </ul>
                                  <blockquote>
                                    "A educação é o passaporte para o futuro, pois o amanhã pertence a quem se prepara para ele hoje."
                                  </blockquote>
                                </div>
                              )}
                              
                              {currentLesson.type === 'quiz' && (
                                <div className="bg-muted/30 p-6 rounded-lg">
                                  <h3 className="text-base font-medium mb-4">Quiz: Teste seus conhecimentos</h3>
                                  <div className="space-y-4">
                                    <div className="bg-background p-4 rounded-md">
                                      <p className="font-medium mb-2">1. Qual dos seguintes é um exemplo de meta SMART?</p>
                                      <ul className="space-y-2">
                                        <li className="flex items-center">
                                          <input type="radio" id="q1-a" name="q1" className="mr-2" />
                                          <label htmlFor="q1-a">Aumentar vendas</label>
                                        </li>
                                        <li className="flex items-center">
                                          <input type="radio" id="q1-b" name="q1" className="mr-2" />
                                          <label htmlFor="q1-b">Melhorar a empresa</label>
                                        </li>
                                        <li className="flex items-center">
                                          <input type="radio" id="q1-c" name="q1" className="mr-2" />
                                          <label htmlFor="q1-c">Aumentar vendas em 20% até o final do trimestre</label>
                                        </li>
                                      </ul>
                                    </div>
                                    <div className="bg-background p-4 rounded-md">
                                      <p className="font-medium mb-2">2. O que significa a letra "M" em SMART?</p>
                                      <ul className="space-y-2">
                                        <li className="flex items-center">
                                          <input type="radio" id="q2-a" name="q2" className="mr-2" />
                                          <label htmlFor="q2-a">Motivacional</label>
                                        </li>
                                        <li className="flex items-center">
                                          <input type="radio" id="q2-b" name="q2" className="mr-2" />
                                          <label htmlFor="q2-b">Mensurável</label>
                                        </li>
                                        <li className="flex items-center">
                                          <input type="radio" id="q2-c" name="q2" className="mr-2" />
                                          <label htmlFor="q2-c">Memorável</label>
                                        </li>
                                      </ul>
                                    </div>
                                    <Button className="w-full">Enviar respostas</Button>
                                  </div>
                                </div>
                              )}
                              
                              {currentLesson.type === 'exercise' && (
                                <div className="bg-muted/30 p-6 rounded-lg">
                                  <h3 className="text-base font-medium mb-4">Exercício Prático</h3>
                                  <div className="space-y-4">
                                    <p>
                                      Com base no conteúdo apresentado, complete o exercício abaixo:
                                    </p>
                                    <div className="bg-background p-4 rounded-md">
                                      <h4 className="font-medium mb-2">Definição de Metas SMART</h4>
                                      <p className="mb-2">
                                        Para seu negócio atual ou planejado, defina três metas SMART 
                                        (Específicas, Mensuráveis, Atingíveis, Relevantes e Temporais).
                                      </p>
                                      <textarea 
                                        className="w-full min-h-[150px] p-3 border rounded-md" 
                                        placeholder="Digite suas metas aqui..."
                                      ></textarea>
                                    </div>
                                    <Button className="w-full">Salvar exercício</Button>
                                  </div>
                                </div>
                              )}
                              
                              {currentLesson.externalResource && (
                                <Card className="bg-blue-50 border-blue-200">
                                  <CardContent className="p-4">
                                    <div className="flex justify-between items-center">
                                      <div>
                                        <h4 className="text-sm font-medium">Recurso Externo Relacionado</h4>
                                        <p className="text-xs text-muted-foreground">
                                          {currentLesson.externalResource.name} - {currentLesson.externalResource.provider}
                                        </p>
                                      </div>
                                      <a 
                                        href={currentLesson.externalResource.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-primary hover:text-primary/80 flex items-center text-xs"
                                      >
                                        Acessar <ExternalLink size={12} className="ml-1" />
                                      </a>
                                    </div>
                                  </CardContent>
                                </Card>
                              )}
                              
                              <div className="flex justify-between pt-4 border-t">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleMarkComplete(currentLesson.id)}
                                >
                                  {currentLesson.completed ? 'Marcar como não concluído' : 'Marcar como concluído'}
                                </Button>
                                <div className="flex gap-2">
                                  <Button variant="outline" size="icon" className="h-8 w-8">
                                    <Share2 size={16} />
                                  </Button>
                                  <Button variant="outline" size="icon" className="h-8 w-8">
                                    <BookmarkPlus size={16} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="info">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Sobre este curso</h3>
                          <p>{course.description}</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-muted/30 p-4 rounded-md">
                            <h4 className="text-sm font-medium mb-2">Nível</h4>
                            <div className="flex items-center">
                              <Badge className={
                                course.level === 'Iniciante' ? 'bg-green-500' :
                                course.level === 'Intermediário' ? 'bg-blue-500' : 'bg-purple-500'
                              }>
                                {course.level}
                              </Badge>
                            </div>
                          </div>
                          <div className="bg-muted/30 p-4 rounded-md">
                            <h4 className="text-sm font-medium mb-2">Duração</h4>
                            <div className="flex items-center">
                              <Clock size={16} className="mr-2 text-muted-foreground" />
                              <span>{course.duration}</span>
                            </div>
                          </div>
                          <div className="bg-muted/30 p-4 rounded-md">
                            <h4 className="text-sm font-medium mb-2">Módulos</h4>
                            <div className="flex items-center">
                              <Book size={16} className="mr-2 text-muted-foreground" />
                              <span>{course.modules} módulos</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">O que você vai aprender</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            <li className="flex items-start">
                              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-1" />
                              <span>Fundamentos essenciais para o sucesso empresarial</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-1" />
                              <span>Estratégias eficientes de gestão financeira</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-1" />
                              <span>Técnicas de planejamento estratégico</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-1" />
                              <span>Análise de mercado e oportunidades</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-1" />
                              <span>Implementação prática em seu negócio</span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 size={16} className="mr-2 text-green-500 mt-1" />
                              <span>Como avaliar resultados e ajustar estratégias</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Pré-requisitos</h3>
                          <p>
                            Não há pré-requisitos específicos para este curso. É ideal para iniciantes 
                            e empreendedores que desejam aprimorar suas habilidades.
                          </p>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Instrutores</h3>
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                              <span className="font-medium">AB</span>
                            </div>
                            <div>
                              <h4 className="font-medium">Ana Beatriz</h4>
                              <p className="text-sm text-muted-foreground">
                                Especialista em gestão empresarial
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="resources">
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Recursos do SEBRAE</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {externalCourses.filter(c => c.provider === 'SEBRAE').map((resource, i) => (
                              <Card key={i} className="overflow-hidden">
                                <div className="h-2 bg-primary"></div>
                                <CardContent className="p-4">
                                  <div className="flex justify-between">
                                    <div>
                                      <h4 className="font-medium">{resource.title}</h4>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {resource.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center mt-4">
                                    <Badge variant="outline">{resource.duration}</Badge>
                                    <a 
                                      href={resource.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-primary hover:text-primary/80 flex items-center text-xs"
                                    >
                                      Acessar curso <ExternalLink size={12} className="ml-1" />
                                    </a>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Recursos do SENAC</h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {externalCourses.filter(c => c.provider === 'SENAC').map((resource, i) => (
                              <Card key={i} className="overflow-hidden">
                                <div className="h-2 bg-blue-500"></div>
                                <CardContent className="p-4">
                                  <div className="flex justify-between">
                                    <div>
                                      <h4 className="font-medium">{resource.title}</h4>
                                      <p className="text-xs text-muted-foreground mt-1">
                                        {resource.description}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex justify-between items-center mt-4">
                                    <Badge variant="outline">{resource.duration}</Badge>
                                    <a 
                                      href={resource.url} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-primary hover:text-primary/80 flex items-center text-xs"
                                    >
                                      Acessar curso <ExternalLink size={12} className="ml-1" />
                                    </a>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-semibold mb-2">Downloads disponíveis</h3>
                          <div className="space-y-2">
                            <Card>
                              <CardContent className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <FileText size={20} className="mr-3 text-primary" />
                                  <div>
                                    <h4 className="text-sm font-medium">Planilha de Fluxo de Caixa</h4>
                                    <p className="text-xs text-muted-foreground">Excel, 250KB</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="flex items-center">
                                  <Download size={16} className="mr-1" /> Baixar
                                </Button>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardContent className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <FileText size={20} className="mr-3 text-primary" />
                                  <div>
                                    <h4 className="text-sm font-medium">Guia de Definição de Metas</h4>
                                    <p className="text-xs text-muted-foreground">PDF, 1.2MB</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="flex items-center">
                                  <Download size={16} className="mr-1" /> Baixar
                                </Button>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardContent className="p-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <FileText size={20} className="mr-3 text-primary" />
                                  <div>
                                    <h4 className="text-sm font-medium">Modelo de Plano de Negócios</h4>
                                    <p className="text-xs text-muted-foreground">Word, 350KB</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm" className="flex items-center">
                                  <Download size={16} className="mr-1" /> Baixar
                                </Button>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Cursos Relacionados</CardTitle>
                    <CardDescription className="text-xs">
                      Baseado no seu perfil e interesses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {getRecommendedCourses().map(rec => (
                        <Link to={`/course/${rec.id}`} key={rec.id}>
                          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                            <div className="h-24">
                              <img 
                                src={rec.image} 
                                alt={rec.title} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <CardContent className="p-3">
                              <h4 className="font-medium text-sm line-clamp-2">{rec.title}</h4>
                              <div className="flex items-center justify-between mt-2">
                                <Badge variant="outline" className="text-[10px]">{rec.level}</Badge>
                                <div className="flex items-center">
                                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                                  <span className="text-xs ml-1">4.8</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="space-y-6">
                <Card className="glass">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Seu progresso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-medium">Neste curso</h4>
                          <span className="text-sm">{calculateProgress()}%</span>
                        </div>
                        <Progress value={calculateProgress()} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-medium">Total aprendizado</h4>
                          <span className="text-sm">35%</span>
                        </div>
                        <Progress value={35} className="h-2" />
                      </div>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="text-sm font-medium mb-2">Certificados</h4>
                      <p className="text-xs text-muted-foreground mb-2">
                        Complete o curso para obter seu certificado
                      </p>
                      <Button variant="outline" size="sm" className="w-full" disabled={calculateProgress() < 100}>
                        <Award size={14} className="mr-1" />
                        {calculateProgress() === 100 ? 'Emitir certificado' : 'Certificado bloqueado'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Informações do curso</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Criado por</span>
                        <span className="text-sm font-medium">EntrepreEdge</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Última atualização</span>
                        <span className="text-sm">Março 2025</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Idioma</span>
                        <span className="text-sm">Português</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Avaliação</span>
                        <span className="text-sm flex items-center">
                          <Star size={12} className="text-yellow-400 fill-yellow-400 mr-1" />
                          4.8 (256 avaliações)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="glass">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Recursos externos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {externalCourses.slice(0, 2).map((resource, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-medium">{resource.title}</h4>
                          <p className="text-xs text-muted-foreground">
                            {resource.provider} • {resource.duration}
                          </p>
                        </div>
                        <a 
                          href={resource.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:text-primary/80"
                        >
                          <ExternalLink size={16} />
                        </a>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      Ver todos os recursos
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
