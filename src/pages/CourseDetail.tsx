
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Home, 
  BarChart2, 
  Target, 
  BookOpen,
  Play,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { findCourseById } from '@/lib/courseData';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courseId ? findCourseById(courseId) : undefined;
  
  const [selectedLesson, setSelectedLesson] = useState<{moduleIndex: number, lessonIndex: number, url: string} | null>(null);
  const [openModules, setOpenModules] = useState<{[key: number]: boolean}>({0: true});
  
  useEffect(() => {
    if (!course) {
      toast({
        title: "Curso não encontrado",
        description: "O curso que você está procurando não existe.",
        variant: "destructive"
      });
    }
  }, [course]);
  
  const navItems = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <Home size={18} />
    },
    {
      name: 'Finanças',
      href: '/finances',
      icon: <BarChart2 size={18} />
    },
    {
      name: 'Metas',
      href: '/goals',
      icon: <Target size={18} />
    },
    {
      name: 'Aprendizado',
      href: '/learn',
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

  // Toggle module open/closed
  const toggleModule = (moduleIndex: number) => {
    setOpenModules(prev => ({
      ...prev,
      [moduleIndex]: !prev[moduleIndex]
    }));
  };

  // Mark lesson as completed
  const toggleLessonCompleted = (moduleIndex: number, lessonIndex: number) => {
    // This would update the state in a real application
    toast({
      title: "Progresso atualizado",
      description: "Seu progresso nesta lição foi atualizado.",
    });
    console.log(`Toggled completion for module ${moduleIndex}, lesson ${lessonIndex}`);
  };

  // Start or continue course by selecting first incomplete lesson
  const startCourse = () => {
    if (!course) return;
    
    for (let i = 0; i < course.modules.length; i++) {
      for (let j = 0; j < course.modules[i].lessons.length; j++) {
        const lesson = course.modules[i].lessons[j];
        if (!lesson.completed) {
          // Select this lesson and open its module
          setSelectedLesson({
            moduleIndex: i,
            lessonIndex: j,
            url: lesson.youtubeUrl || ''
          });
          setOpenModules(prev => ({...prev, [i]: true}));
          return;
        }
      }
    }
    
    // If all lessons are completed, select the first one
    if (course.modules.length > 0 && course.modules[0].lessons.length > 0) {
      setSelectedLesson({
        moduleIndex: 0,
        lessonIndex: 0,
        url: course.modules[0].lessons[0].youtubeUrl || ''
      });
      setOpenModules(prev => ({...prev, [0]: true}));
    }
  };

  // Play specific lesson
  const playLesson = (moduleIndex: number, lessonIndex: number, url: string) => {
    setSelectedLesson({
      moduleIndex,
      lessonIndex,
      url
    });
    setOpenModules(prev => ({...prev, [moduleIndex]: true}));
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-background flex">
        <Sidebar />
        <div className="flex-1 ml-[240px] transition-all duration-300">
          <Navbar items={navItems} />
          <div className="container px-4 py-12 mt-16 text-center">
            <h1 className="text-2xl font-bold mb-4">Curso não encontrado</h1>
            <Link to="/learn">
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
        
        <div className="container px-4 py-6">
          <div className="flex items-center mb-6">
            <Link to="/learn" className="flex items-center text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={18} className="mr-2" />
              <span>Voltar para cursos</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="glass p-6 rounded-xl mb-8">
                <div className="aspect-video rounded-lg overflow-hidden mb-6 relative">
                  {selectedLesson ? (
                    <iframe
                      src={selectedLesson.url}
                      title={`Aula ${selectedLesson.moduleIndex + 1}.${selectedLesson.lessonIndex + 1}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  ) : (
                    <>
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="object-cover w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Button className="rounded-full" size="lg" onClick={startCourse}>
                          <Play className="mr-2" size={20} />
                          Começar curso
                        </Button>
                      </div>
                    </>
                  )}
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
              
              <div className="glass p-6 rounded-xl mb-8">
                <h2 className="text-xl font-bold mb-4">Conteúdo do Curso</h2>
                
                <div className="space-y-4">
                  {course.modules.map((module, moduleIndex) => (
                    <div key={moduleIndex} className="border border-border rounded-lg overflow-hidden">
                      <div 
                        className="flex w-full p-4 border-b border-border bg-secondary/20 justify-between items-center hover:bg-secondary/30 transition-colors cursor-pointer"
                        onClick={() => toggleModule(moduleIndex)}
                      >
                        <h3 className="text-lg font-semibold">{module.title}</h3>
                        <div className="flex items-center">
                          <div className="text-xs text-muted-foreground mr-2">
                            {module.lessons.length} aulas
                          </div>
                          {openModules[moduleIndex] ? (
                            <ChevronUp size={18} />
                          ) : (
                            <ChevronDown size={18} />
                          )}
                        </div>
                      </div>
                      
                      {openModules[moduleIndex] && (
                        <div className="divide-y divide-border">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <div 
                              key={lessonIndex} 
                              className={`p-4 flex items-center justify-between ${
                                selectedLesson && 
                                selectedLesson.moduleIndex === moduleIndex && 
                                selectedLesson.lessonIndex === lessonIndex ? 
                                'bg-primary/10' : ''
                              }`}
                            >
                              <div className="flex items-center">
                                {lesson.completed ? (
                                  <CheckCircle2 
                                    size={20} 
                                    className="text-green-500 mr-3 cursor-pointer" 
                                    onClick={() => toggleLessonCompleted(moduleIndex, lessonIndex)}
                                  />
                                ) : (
                                  <div 
                                    className="w-5 h-5 rounded-full border border-border mr-3 flex items-center justify-center cursor-pointer"
                                    onClick={() => toggleLessonCompleted(moduleIndex, lessonIndex)}
                                  >
                                    <span className="text-xs">{moduleIndex + 1}.{lessonIndex + 1}</span>
                                  </div>
                                )}
                                <div>
                                  <h4 className="font-medium">{lesson.title}</h4>
                                  <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                                </div>
                              </div>
                              
                              <Button 
                                variant={selectedLesson && 
                                  selectedLesson.moduleIndex === moduleIndex && 
                                  selectedLesson.lessonIndex === lessonIndex ? 
                                  "default" : "ghost"} 
                                size="sm" 
                                className="rounded-full"
                                onClick={() => playLesson(moduleIndex, lessonIndex, lesson.youtubeUrl)}
                              >
                                <Play size={16} />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Descrição do Curso</h2>
                <div className="space-y-4 text-sm">
                  <p className="text-base">{course.about}</p>
                  
                  <div>
                    <h3 className="font-semibold text-base mt-6 mb-2">Pré-requisitos</h3>
                    <p>{course.prerequisite}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-base mt-6 mb-2">Metodologia</h3>
                    <p>
                      Este curso utiliza uma abordagem prática e orientada a resultados. Combinamos teoria com exemplos do mundo real 
                      e exercícios práticos para ajudar você a implementar os conhecimentos em seu próprio negócio. Cada módulo foi 
                      cuidadosamente desenvolvido para construir sobre o anterior, resultando em uma experiência de aprendizado coesa e abrangente.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-base mt-6 mb-2">Público-alvo</h3>
                    <p>
                      Este curso é ideal para empreendedores iniciantes, proprietários de pequenos negócios que desejam melhorar suas 
                      habilidades de gestão, e profissionais que planejam iniciar seu próprio negócio no futuro próximo. Não é necessário 
                      experiência prévia em negócios, apenas vontade de aprender e motivação para implementar as estratégias ensinadas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="glass p-6 rounded-xl mb-6">
                <h2 className="text-xl font-bold mb-4">Sobre este curso</h2>
                <div className="space-y-4 text-sm">
                  <p>{course.about}</p>
                  
                  <div>
                    <h3 className="font-semibold text-base mb-2">Pré-requisitos</h3>
                    <p>{course.prerequisite}</p>
                  </div>
                </div>
              </div>
              
              <div className="glass p-6 rounded-xl mb-6">
                <h2 className="text-xl font-bold mb-4">O que você vai aprender</h2>
                <ul className="space-y-3">
                  {course.benefits && course.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-green-500 mr-2 flex-shrink-0 mt-0.5">
                        <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="glass p-6 rounded-xl">
                <h2 className="text-xl font-bold mb-4">Detalhes do curso</h2>
                <div className="space-y-4">
                  <div>
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">Português</Badge>
                    <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-200">Certificado</Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-muted-foreground">Total de módulos</p>
                      <p className="font-medium">{course.modules.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Total de aulas</p>
                      <p className="font-medium">
                        {course.modules.reduce((total, module) => total + module.lessons.length, 0)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Última atualização</p>
                      <p className="font-medium">Abril 2023</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Nível</p>
                      <p className="font-medium">Iniciante a Intermediário</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
