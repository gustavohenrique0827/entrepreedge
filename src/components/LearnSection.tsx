
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from 'lucide-react';

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
  categories: string[];
  youtubeUrl?: string;
  youtubeChannel?: string;
}

const LearnSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  
  // Get business type from localStorage
  const businessType = localStorage.getItem('businessType') || '';
  const interestedTopics = JSON.parse(localStorage.getItem('interestedTopics') || '[]');
  
  // All available courses including YouTube courses
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
      popular: true,
      categories: ['Gestão financeira', 'Comércio varejista', 'Prestação de serviços'],
      youtubeUrl: 'https://www.youtube.com/watch?v=BwZYMbCLTzU',
      youtubeChannel: 'Sebrae'
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
      new: true,
      categories: ['Marketing digital', 'Comércio varejista', 'Tecnologia'],
      youtubeUrl: 'https://www.youtube.com/watch?v=4CnY7LVUE_Y',
      youtubeChannel: 'Conquer'
    },
    {
      id: '3',
      title: 'Planejamento estratégico',
      description: 'Como definir e executar um planejamento estratégico para seu negócio',
      modules: 5,
      completed: 0,
      duration: '2h 15min',
      level: 'Avançado',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      categories: ['Planejamento estratégico', 'Indústria', 'Gestão financeira'],
      youtubeUrl: 'https://www.youtube.com/watch?v=wZzM96G5ap0',
      youtubeChannel: 'Escola de Negócios'
    },
    {
      id: '4',
      title: 'Vendas e negociação',
      description: 'Técnicas avançadas de vendas e negociação para aumentar sua receita',
      modules: 7,
      completed: 0,
      duration: '3h 10min',
      level: 'Intermediário',
      image: 'https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      popular: true,
      categories: ['Vendas', 'Comércio varejista', 'Comércio atacadista'],
      youtubeUrl: 'https://www.youtube.com/watch?v=R9jfRjQLoT8',
      youtubeChannel: 'O Primo Rico'
    },
    {
      id: '5',
      title: 'Gestão de equipes',
      description: 'Como liderar e motivar seu time para alcançar melhores resultados',
      modules: 6,
      completed: 0,
      duration: '2h 20min',
      level: 'Intermediário',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      categories: ['RH e liderança', 'Prestação de serviços', 'Indústria'],
      youtubeUrl: 'https://www.youtube.com/watch?v=ggE_wUNlWy0',
      youtubeChannel: 'HSM'
    },
    {
      id: '6',
      title: 'Finanças para não-financeiros',
      description: 'Entenda os conceitos financeiros essenciais de forma simples e prática',
      modules: 4,
      completed: 0,
      duration: '1h 30min',
      level: 'Iniciante',
      image: 'https://images.unsplash.com/photo-1565514310578-7eefc7a7cfcf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      new: true,
      categories: ['Gestão financeira', 'Tecnologia', 'Educação'],
      youtubeUrl: 'https://www.youtube.com/watch?v=ZUHpg5SnQjU',
      youtubeChannel: 'Me Poupe!'
    },
    {
      id: '7',
      title: 'Transformação digital para pequenas empresas',
      description: 'Como digitalizar processos e aumentar a eficiência do seu negócio',
      modules: 5,
      completed: 0,
      duration: '2h 45min',
      level: 'Iniciante',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      categories: ['Tecnologia', 'Inovação', 'Operações'],
      youtubeUrl: 'https://www.youtube.com/watch?v=gRYa5JZoU3Y',
      youtubeChannel: 'Rock Content'
    },
    {
      id: '8',
      title: 'Estratégias de crescimento sustentável',
      description: 'Planeje o crescimento do seu negócio de forma sustentável e escalável',
      modules: 6,
      completed: 0,
      duration: '2h 15min',
      level: 'Avançado',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      categories: ['Planejamento estratégico', 'Sustentabilidade', 'Indústria'],
      youtubeUrl: 'https://www.youtube.com/watch?v=kCpXdZN-Aks',
      youtubeChannel: 'Endeavor Brasil'
    },
    {
      id: '9',
      title: 'Contabilidade básica para empreendedores',
      description: 'Conceitos essenciais de contabilidade para gerenciar seu negócio',
      modules: 5,
      completed: 0,
      duration: '1h 50min',
      level: 'Iniciante',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      categories: ['Contabilidade', 'Gestão financeira', 'Comércio varejista'],
      youtubeUrl: 'https://www.youtube.com/watch?v=w7CyxMoNM3Y',
      youtubeChannel: 'Contabili'
    },
    {
      id: '10',
      title: 'Empreendedorismo na prática',
      description: 'Como transformar ideias em negócios lucrativos',
      modules: 7,
      completed: 0,
      duration: '3h 20min',
      level: 'Intermediário',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      categories: ['Empreendedorismo', 'Inovação', 'Vendas'],
      youtubeUrl: 'https://www.youtube.com/watch?v=UOevBGt5Ljs',
      youtubeChannel: 'Sebrae'
    },
    {
      id: '11',
      title: 'Gestão tributária para pequenas empresas',
      description: 'Entenda os impostos e como otimizar a carga tributária do seu negócio',
      modules: 4,
      completed: 0,
      duration: '2h 10min',
      level: 'Intermediário',
      image: 'https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      categories: ['Contabilidade', 'Gestão financeira', 'Tributação'],
      youtubeUrl: 'https://www.youtube.com/watch?v=t-WGY4K8QU0',
      youtubeChannel: 'Contabilizei'
    },
    {
      id: '12',
      title: 'Inovação em pequenos negócios',
      description: 'Como implementar inovação no dia a dia da sua empresa',
      modules: 5,
      completed: 0,
      duration: '2h 30min',
      level: 'Avançado',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      categories: ['Inovação', 'Empreendedorismo', 'Tecnologia'],
      youtubeUrl: 'https://www.youtube.com/watch?v=qZGslGVEIPg',
      youtubeChannel: 'Sebrae'
    }
  ];

  // Filter courses based on business type and interested topics
  useEffect(() => {
    let filtered = [...courses];
    
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
  }, [activeTab, businessType]);

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
      <div className="mb-4">
        <h2 className="text-lg font-bold">Microaprendizado</h2>
        <p className="text-xs text-muted-foreground">
          Cursos personalizados para {businessType || 'seu negócio'}
        </p>
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
      <Card className="glass overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-md">
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
            {course.youtubeUrl && (
              <Badge className="bg-red-500 hover:bg-red-600 text-[10px] py-0 h-5">YouTube</Badge>
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
          
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <p className="text-muted-foreground">Duração</p>
              <p className="font-medium">{course.duration}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Nível</p>
              <p className={`inline-block px-1.5 py-0.5 rounded-full text-[10px] ${getLevelColor(course.level)}`}>
                {course.level}
              </p>
            </div>
          </div>
          
          {course.youtubeUrl && (
            <div className="mt-2 text-xs">
              <p className="text-muted-foreground">Canal</p>
              <p className="font-medium">{course.youtubeChannel}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-1 pb-2 px-3">
          {course.youtubeUrl ? (
            <a
              href={course.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center py-1.5 text-xs font-medium text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
            >
              Assistir no YouTube <ExternalLink className="ml-1 h-3 w-3" />
            </a>
          ) : (
            <Link to={`/course/${course.id}`} className="w-full">
              <button className="w-full py-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                {course.completed > 0 ? 'Continuar' : 'Começar curso'}
              </button>
            </Link>
          )}
        </CardFooter>
      </Card>
    );
  }
};

export default LearnSection;
