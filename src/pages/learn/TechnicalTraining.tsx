
import React, { useState } from 'react';
import { PageContainer } from '@/components/PageContainer';
import { PageHeader } from '@/components/PageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/hooks/use-toast';
import { BookOpen, Clock, Search, Award, Play } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  progress: number;
  instructor: string;
  thumbnail: string;
  category: 'Técnico' | 'Procedimentos' | 'Legislação' | 'Soft Skills';
  completed: boolean;
}

const mockCourses: Course[] = [
  {
    id: 1,
    title: 'Introdução à Programação em React',
    description: 'Aprenda os fundamentos do React para desenvolvimento front-end.',
    duration: '3h 30min',
    progress: 75,
    instructor: 'Ana Souza',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Técnico',
    completed: false
  },
  {
    id: 2,
    title: 'Linguagem SQL Avançada',
    description: 'Domine consultas SQL complexas para análise de dados.',
    duration: '4h 15min',
    progress: 100,
    instructor: 'Carlos Mendes',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Técnico',
    completed: true
  },
  {
    id: 3,
    title: 'Arquitetura de Sistemas Cloud',
    description: 'Aprenda sobre as diferentes arquiteturas em nuvem e seus casos de uso.',
    duration: '5h 45min',
    progress: 30,
    instructor: 'Roberta Lima',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80',
    category: 'Técnico',
    completed: false
  },
  {
    id: 4,
    title: 'Desenvolvimento Mobile com Flutter',
    description: 'Crie aplicativos móveis multiplataforma com Flutter.',
    duration: '6h 20min',
    progress: 0,
    instructor: 'Paulo Oliveira',
    thumbnail: 'https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
    category: 'Técnico',
    completed: false
  }
];

const TechnicalTraining = () => {
  const [courses] = useState<Course[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  // Filtrar cursos
  const filteredCourses = courses.filter(
    (course) => 
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Iniciar um curso
  const startCourse = (courseId: number) => {
    toast({
      title: "Curso iniciado",
      description: "Você começou a assistir este curso. Boa aula!",
      variant: "success",
    });
  };

  // Continuar um curso
  const continueCourse = (courseId: number) => {
    toast({
      title: "Curso continuado",
      description: "Você continuou de onde parou. Boa aula!",
      variant: "success",
    });
  };

  return (
    <PageContainer>
      <PageHeader
        title="Treinamentos Técnicos"
        description="Desenvolva suas habilidades técnicas com nossos cursos especializados"
      />

      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="in-progress">Em Progresso</TabsTrigger>
            <TabsTrigger value="completed">Concluídos</TabsTrigger>
          </TabsList>
          
          <div className="relative w-72">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar cursos..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="overflow-hidden">
                <div>
                  <AspectRatio ratio={16 / 9}>
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="object-cover w-full h-full rounded-t-md"
                    />
                  </AspectRatio>
                </div>
                
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock size={14} className="mr-1" />
                      {course.duration}
                    </div>
                    <div className="text-sm font-medium">
                      {course.instructor}
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    {course.progress > 0 && (
                      <>
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progresso</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-1.5" />
                      </>
                    )}
                  </div>
                  
                  {course.completed ? (
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-sm text-green-600 font-medium">
                        <Award size={16} className="mr-1" />
                        Concluído
                      </span>
                      <Button size="sm" variant="outline" onClick={() => startCourse(course.id)}>
                        Rever
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => course.progress > 0 ? continueCourse(course.id) : startCourse(course.id)}
                    >
                      <Play size={16} />
                      {course.progress > 0 ? 'Continuar' : 'Iniciar Curso'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
            
            {filteredCourses.length === 0 && (
              <div className="col-span-3 flex flex-col items-center justify-center py-10 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">Nenhum curso encontrado</h3>
                <p className="text-muted-foreground">
                  Tente ajustar sua busca ou explore as categorias disponíveis.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses
              .filter(course => course.progress > 0 && course.progress < 100)
              .map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div>
                    <AspectRatio ratio={16 / 9}>
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="object-cover w-full h-full rounded-t-md"
                      />
                    </AspectRatio>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock size={14} className="mr-1" />
                        {course.duration}
                      </div>
                      <div className="text-sm font-medium">
                        {course.instructor}
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Progresso</span>
                        <span>{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-1.5" />
                    </div>
                    
                    <Button 
                      className="w-full flex items-center justify-center gap-2"
                      onClick={() => continueCourse(course.id)}
                    >
                      <Play size={16} />
                      Continuar
                    </Button>
                  </CardContent>
                </Card>
              ))}
              
            {filteredCourses.filter(course => course.progress > 0 && course.progress < 100).length === 0 && (
              <div className="col-span-3 flex flex-col items-center justify-center py-10 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">Nenhum curso em progresso</h3>
                <p className="text-muted-foreground">
                  Comece um novo curso para continuar seu aprendizado.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="completed">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses
              .filter(course => course.completed)
              .map((course) => (
                <Card key={course.id} className="overflow-hidden">
                  <div>
                    <AspectRatio ratio={16 / 9}>
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="object-cover w-full h-full rounded-t-md"
                      />
                    </AspectRatio>
                  </div>
                  
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock size={14} className="mr-1" />
                        {course.duration}
                      </div>
                      <div className="text-sm font-medium">
                        {course.instructor}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="flex items-center text-sm text-green-600 font-medium">
                        <Award size={16} className="mr-1" />
                        Concluído
                      </span>
                      <Button size="sm" variant="outline" onClick={() => startCourse(course.id)}>
                        Rever
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
            {filteredCourses.filter(course => course.completed).length === 0 && (
              <div className="col-span-3 flex flex-col items-center justify-center py-10 text-center">
                <BookOpen className="h-10 w-10 text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium">Nenhum curso concluído</h3>
                <p className="text-muted-foreground">
                  Complete cursos para vê-los nesta seção.
                </p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </PageContainer>
  );
};

export default TechnicalTraining;
