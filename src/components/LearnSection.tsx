
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { toast } from '@/hooks/use-toast';
import { courses, Course } from '@/lib/courseData';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { Lock, Book, BarChart, Clock, Award } from 'lucide-react';

const LearnSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const { hasAccess, currentPlan } = useSubscription();
  
  // Get business type from localStorage
  const businessType = localStorage.getItem('businessType') || '';
  const interestedTopics = JSON.parse(localStorage.getItem('interestedTopics') || '[]');
  
  // Filter courses based on business type, interested topics, and subscription plan
  useEffect(() => {
    let filtered = [...courses];
    
    // Apply subscription plan filtering
    if (currentPlan === 'free') {
      filtered = filtered.filter(course => course.level === 'Iniciante' || course.categories.includes('Financeiro'));
    } else if (currentPlan === 'starter') {
      filtered = filtered.filter(course => !course.categories.includes('Avançado') || course.categories.includes('Financeiro'));
    }
    
    // Apply tab filtering
    if (activeTab === 'in-progress') {
      filtered = filtered.filter(course => course.completed > 0);
    } else if (activeTab === 'new') {
      filtered = filtered.filter(course => course.new);
    } else if (activeTab === 'popular') {
      filtered = filtered.filter(course => course.popular);
    } else if (activeTab === 'recommended') {
      filtered = filtered.filter(course => 
        course.categories.includes(businessType) || 
        course.categories.includes('Empreendedorismo') ||
        course.categories.includes('Contabilidade') ||
        interestedTopics.some((topic: string) => course.categories.includes(topic))
      );
    }
    
    setFilteredCourses(filtered);
  }, [activeTab, businessType, currentPlan]);

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

  // Check if a course is locked based on subscription plan
  const isCourseLocked = (course: Course) => {
    if (currentPlan === 'premium') return false;
    
    if (currentPlan === 'free' && (course.level !== 'Iniciante' && !course.categories.includes('Financeiro'))) {
      return true;
    }
    
    if (currentPlan === 'starter' && course.categories.includes('Avançado')) {
      return true;
    }
    
    if (currentPlan === 'business' && course.categories.includes('Premium')) {
      return true;
    }
    
    return false;
  };

  const handleCourseClick = (courseId: string, locked: boolean) => {
    if (locked) {
      toast({
        title: "Curso bloqueado",
        description: "Atualize seu plano para acessar este conteúdo.",
        variant: "destructive"
      });
      return;
    }
    console.log(`Navigating to course: ${courseId}`);
  };

  return (
    <div className="animate-slide-up">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Microaprendizado</h2>
          <p className="text-xs text-muted-foreground">
            Cursos personalizados para {businessType || 'seu negócio'}
          </p>
        </div>
        <div>
          <Badge variant="outline" className="flex items-center gap-1">
            <Book size={14} />
            <span>{currentPlan === 'free' ? 'Básico' : 
                   currentPlan === 'starter' ? 'Iniciante' :
                   currentPlan === 'business' ? 'Empresarial' : 'Premium'}</span>
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="glass mb-4">
          <TabsTrigger value="recommended" className="text-xs">Recomendados</TabsTrigger>
          <TabsTrigger value="in-progress" className="text-xs">Em andamento</TabsTrigger>
          <TabsTrigger value="new" className="text-xs">Novos</TabsTrigger>
          <TabsTrigger value="popular" className="text-xs">Populares</TabsTrigger>
          <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {(activeTab === 'all' ? courses : filteredCourses).map((course) => (
              <CourseCard 
                key={course.id} 
                course={course} 
                locked={isCourseLocked(course)} 
              />
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <div className="text-center py-8">
              <Award className="mx-auto h-12 w-12 text-muted-foreground/60" />
              <h3 className="mt-2 text-lg font-semibold">Sem cursos nesta categoria</h3>
              <p className="text-sm text-muted-foreground">
                Não foi possível encontrar cursos nesta categoria para o seu plano atual.
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );

  function CourseCard({ course, locked }: { course: Course; locked: boolean }) {
    const progressPercent = (course.completed / course.modules) * 100;
    
    return (
      <Card className={`glass overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-md ${locked ? 'opacity-75' : ''}`}>
        <div className="relative h-28">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            {course.new && (
              <Badge className="bg-blue-500 hover:bg-blue-600 text-[10px] py-0 h-5">Novo</Badge>
            )}
            {course.popular && (
              <Badge className="bg-amber-500 hover:bg-amber-600 text-[10px] py-0 h-5">Popular</Badge>
            )}
            {locked && (
              <Badge className="bg-gray-500 hover:bg-gray-600 text-[10px] py-0 h-5 flex items-center gap-0.5">
                <Lock size={10} /> Bloqueado
              </Badge>
            )}
          </div>
        </div>
        <CardHeader className="pb-1 pt-2 px-3">
          <div className="flex justify-between items-start">
            <CardTitle className="text-sm line-clamp-2">{course.title}</CardTitle>
          </div>
          <CardDescription className="line-clamp-2 mt-1 text-xs">{course.description}</CardDescription>
        </CardHeader>
        <CardContent className="pb-1 pt-0 px-3 flex-grow">
          <div className="flex justify-between items-center text-xs mb-1">
            <span className="text-muted-foreground">
              {course.completed} de {course.modules} módulos
            </span>
            <span className="font-medium">{Math.round(progressPercent)}%</span>
          </div>
          <Progress value={progressPercent} className="h-1 mb-3" />
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <p className="text-muted-foreground flex items-center">
                <Clock size={12} className="mr-1" /> Duração
              </p>
              <p className="font-medium">{course.duration}</p>
            </div>
            <div>
              <p className="text-muted-foreground flex items-center">
                <BarChart size={12} className="mr-1" /> Nível
              </p>
              <p className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] ${getLevelColor(course.level)}`}>
                {course.level}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground flex items-center">
                <Award size={12} className="mr-1" /> Pontos
              </p>
              <p className="font-medium">{course.level === 'Iniciante' ? 10 : course.level === 'Intermediário' ? 25 : 50}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-1 pb-2 px-3">
          <Link 
            to={locked ? '#' : `/course/${course.id}`} 
            className="w-full"
            onClick={(e) => {
              if (locked) {
                e.preventDefault();
                handleCourseClick(course.id, locked);
              } else {
                handleCourseClick(course.id, false);
              }
            }}
          >
            <button 
              className={`w-full py-1.5 text-xs font-medium ${locked ? 'text-muted-foreground hover:text-muted-foreground/80' : 'text-primary hover:text-primary/80'} transition-colors flex justify-center items-center gap-1`}
            >
              {locked && <Lock size={12} />}
              {locked ? 'Atualizar plano para acessar' : (course.completed > 0 ? 'Continuar' : 'Começar curso')}
            </button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
};

export default LearnSection;
