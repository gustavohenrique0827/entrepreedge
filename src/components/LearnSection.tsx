
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  description: string;
  modules: number;
  completed: number;
  duration: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  image: string;
  popular?: boolean;
  new?: boolean;
}

// Sample data
const courses: Course[] = [
  {
    id: '1',
    title: 'Fundamentos de gestão financeira',
    description: 'Aprenda os conceitos básicos de gestão financeira para pequenos negócios',
    modules: 8,
    completed: 3,
    duration: '2h 30min',
    level: 'Iniciante',
    image: 'https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    popular: true
  },
  {
    id: '2',
    title: 'Marketing digital para empreendedores',
    description: 'Estratégias eficientes de marketing digital com baixo investimento',
    modules: 6,
    completed: 0,
    duration: '1h 45min',
    level: 'Intermediário',
    image: 'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    new: true
  },
  {
    id: '3',
    title: 'Planejamento estratégico',
    description: 'Como definir e executar um planejamento estratégico para seu negócio',
    modules: 5,
    completed: 0,
    duration: '2h 15min',
    level: 'Avançado',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  },
];

const LearnSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

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
    <div className="animate-slide-up">
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Microaprendizado</h2>
        <p className="text-muted-foreground">Aprenda conceitos essenciais de empreendedorismo em pequenos módulos</p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="in-progress">Em andamento</TabsTrigger>
          <TabsTrigger value="new">Novos</TabsTrigger>
          <TabsTrigger value="popular">Populares</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="in-progress" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter(course => course.completed > 0).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="new" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter(course => course.new).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="popular" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.filter(course => course.popular).map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  function CourseCard({ course }: { course: Course }) {
    const progressPercent = (course.completed / course.modules) * 100;
    
    return (
      <Link to={`/course/${course.id}`}>
        <Card className="glass overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-md">
          <div className="relative h-36">
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
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
            </div>
            <CardDescription className="line-clamp-2 mt-1">{course.description}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2 flex-grow">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-muted-foreground">
                {course.completed} de {course.modules} módulos
              </span>
              <span className="font-medium">{Math.round(progressPercent)}%</span>
            </div>
            <Progress value={progressPercent} className="h-1.5 mb-4" />
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Duração</p>
                <p className="font-medium">{course.duration}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Nível</p>
                <p className={`inline-block px-2 py-0.5 rounded-full text-xs ${getLevelColor(course.level)}`}>
                  {course.level}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="pt-2">
            <button className="w-full py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
              {course.completed > 0 ? 'Continuar' : 'Começar curso'}
            </button>
          </CardFooter>
        </Card>
      </Link>
    );
  }
};

export default LearnSection;
