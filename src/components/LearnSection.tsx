import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { courses, Course } from '@/lib/courseData';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { 
  Lock, 
  Book, 
  BarChart, 
  Clock, 
  Award, 
  Search, 
  BookOpen,
  GraduationCap,
  Filter,
  ExternalLink
} from 'lucide-react';

// External courses data
const externalCourses = [
  {
    title: "Empreendedorismo Básico",
    provider: "SEBRAE",
    url: "https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/empreendedorismo",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    description: "Aprenda os fundamentos do empreendedorismo.",
    categories: ["Empreendedorismo", "Iniciante"],
    duration: "20h"
  },
  {
    title: "Gestão Financeira para Pequenos Negócios",
    provider: "SENAC",
    url: "https://www.ead.senac.br/cursos-livres/gestao-financeira-para-pequenos-negocios/",
    image: "https://images.unsplash.com/photo-1554224155-8947eb1c8a7f",
    description: "Aprimore suas habilidades em gestão financeira.",
    categories: ["Financeiro", "Intermediário"],
    duration: "40h"
  },
  {
    title: "Marketing Digital para Empreendedores",
    provider: "SEBRAE",
    url: "https://www.sebrae.com.br/sites/PortalSebrae/cursosonline/marketing-digital",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48",
    description: "Estratégias de marketing digital para pequenas empresas.",
    categories: ["Marketing", "Digital", "Iniciante"],
    duration: "15h"
  },
  {
    title: "Técnicas de Vendas",
    provider: "SENAC",
    url: "https://www.ead.senac.br/cursos-livres/tecnicas-de-vendas/",
    image: "https://images.unsplash.com/photo-1560472355-536de3962603",
    description: "Aprenda técnicas eficazes para aumentar suas vendas.",
    categories: ["Vendas", "Negociação", "Intermediário"],
    duration: "30h"
  },
  {
    title: "Liderança e Gestão de Equipes",
    provider: "FGV",
    url: "https://educacao-executiva.fgv.br/cursos/online/curta-media-duracao-online/lideranca-e-gestao-de-equipes",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
    description: "Desenvolva suas habilidades de liderança e gestão.",
    categories: ["Liderança", "RH", "Avançado"],
    duration: "45h"
  }
];

const LearnSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('recommended');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const { toast } = useToast();
  const { hasAccess, currentPlan } = useSubscription();
  
  const businessType = localStorage.getItem('businessType') || '';
  const interestedTopics = JSON.parse(localStorage.getItem('interestedTopics') || '[]');
  
  const allCategories = Array.from(
    new Set(courses.flatMap(course => course.categories))
  );
  
  useEffect(() => {
    let filtered = [...courses];
    
    if (currentPlan === 'free') {
      filtered = filtered.filter(course => course.level === 'Iniciante' || course.categories.includes('Financeiro'));
    } else if (currentPlan === 'starter') {
      filtered = filtered.filter(course => !course.categories.includes('Avançado') || course.categories.includes('Financeiro'));
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(course => 
        course.title.toLowerCase().includes(query) || 
        course.description.toLowerCase().includes(query) ||
        course.categories.some(cat => cat.toLowerCase().includes(query))
      );
    }
    
    if (selectedCategory) {
      filtered = filtered.filter(course => 
        course.categories.includes(selectedCategory)
      );
    }
    
    if (selectedLevel) {
      filtered = filtered.filter(course => course.level === selectedLevel);
    }
    
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
  }, [activeTab, businessType, currentPlan, searchQuery, selectedCategory, selectedLevel]);

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
  
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory(null);
    setSelectedLevel(null);
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-lg font-bold flex items-center gap-2">
            <GraduationCap className="text-primary" size={24} />
            Centro de Aprendizado
          </h2>
          <p className="text-sm text-muted-foreground">
            Cursos personalizados para {businessType || 'seu negócio'} e desenvolvimento profissional
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Book size={14} />
            <span>{currentPlan === 'free' ? 'Básico' : 
                   currentPlan === 'starter' ? 'Iniciante' :
                   currentPlan === 'business' ? 'Empresarial' : 'Premium'}</span>
          </Badge>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
          </Button>
        </div>
      </div>
      
      {showFilters && (
        <div className="mb-6 p-4 bg-muted/20 rounded-lg border animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <Input
                placeholder="Buscar cursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <select 
                className="w-full bg-background border border-input rounded-md h-10 px-3 py-2 text-sm"
                value={selectedCategory || ''}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
              >
                <option value="">Todas categorias</option>
                {allCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <select 
                className="w-full bg-background border border-input rounded-md h-10 px-3 py-2 text-sm"
                value={selectedLevel || ''}
                onChange={(e) => setSelectedLevel(e.target.value || null)}
              >
                <option value="">Todos níveis</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end mt-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFilters}
            >
              Limpar filtros
            </Button>
          </div>
        </div>
      )}

      <Tabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-background border shadow-sm mb-4">
          <TabsTrigger value="recommended" className="text-xs">Recomendados</TabsTrigger>
          <TabsTrigger value="in-progress" className="text-xs">Em andamento</TabsTrigger>
          <TabsTrigger value="new" className="text-xs">Novos</TabsTrigger>
          <TabsTrigger value="popular" className="text-xs">Populares</TabsTrigger>
          <TabsTrigger value="external" className="text-xs">Cursos Externos</TabsTrigger>
          <TabsTrigger value="all" className="text-xs">Todos</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className={activeTab !== 'external' ? 'space-y-6' : ''}>
          {activeTab === 'external' ? (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 flex items-center">
                  <ExternalLink size={20} className="mr-2 text-primary" /> 
                  Cursos do SEBRAE, SENAC e outros parceiros
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Acesse cursos e treinamentos oficiais oferecidos pelos nossos parceiros educacionais
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {externalCourses.map((course, i) => (
                    <Card key={i} className="overflow-hidden transition-all hover:shadow-md">
                      <div className="h-40 bg-muted relative">
                        <img 
                          src={course.image} 
                          alt={course.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-blue-500">{course.provider}</Badge>
                        </div>
                      </div>
                      <CardHeader className="pb-1 pt-3">
                        <CardTitle className="text-base line-clamp-1">{course.title}</CardTitle>
                        <CardDescription className="line-clamp-2 text-xs">{course.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2 pt-0">
                        <div className="flex flex-wrap gap-1 my-2">
                          {course.categories.map((cat, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{cat}</Badge>
                          ))}
                        </div>
                        <div className="flex justify-between items-center text-xs">
                          <span className="flex items-center">
                            <Clock size={12} className="mr-1" /> {course.duration}
                          </span>
                        </div>
                      </CardContent>
                      <CardFooter className="pt-0">
                        <a 
                          href={course.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="w-full"
                        >
                          <Button variant="outline" className="w-full flex items-center gap-1">
                            Acessar curso <ExternalLink size={14} />
                          </Button>
                        </a>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button variant="outline" className="mx-auto">
                  Carregar mais cursos
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(activeTab === 'all' ? courses : filteredCourses).map((course) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    locked={isCourseLocked(course)} 
                    onCourseClick={handleCourseClick}
                  />
                ))}
              </div>
              
              {(activeTab === 'all' ? courses : filteredCourses).length === 0 && (
                <div className="text-center py-12 bg-muted/20 rounded-lg border border-dashed">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/60" />
                  <h3 className="mt-4 text-lg font-semibold">Nenhum curso encontrado</h3>
                  <p className="text-sm text-muted-foreground mt-2 max-w-md mx-auto">
                    {activeTab === 'recommended' ? 'Não encontramos cursos recomendados para o seu perfil atual. Tente atualizar seus interesses.' : 
                     activeTab === 'in-progress' ? 'Você ainda não começou nenhum curso. Explore nossos cursos recomendados.' : 
                     'Não foi possível encontrar cursos com os filtros selecionados.'}
                  </p>
                  {activeTab !== 'recommended' && (
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => setActiveTab('recommended')}
                    >
                      Ver recomendados
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface CourseCardProps {
  course: Course;
  locked: boolean;
  onCourseClick: (courseId: string, locked: boolean) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, locked, onCourseClick }) => {
  const progressPercent = (course.completed / course.modules) * 100;
  
  return (
    <Card className={`glass overflow-hidden h-full flex flex-col transition-all duration-300 transform hover:translate-y-[-4px] hover:shadow-md ${locked ? 'opacity-75' : ''}`}>
      <div className="relative h-36">
        <img 
          src={course.image} 
          alt={course.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
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
        <div className="absolute bottom-2 left-2">
          <Badge className={`text-[10px] py-0 h-5 ${
            course.level === 'Iniciante' ? 'bg-green-500' : 
            course.level === 'Intermediário' ? 'bg-blue-500' : 'bg-purple-500'
          }`}>
            {course.level}
          </Badge>
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
              <Book size={12} className="mr-1" /> Módulos
            </p>
            <p className="font-medium">{course.modules}</p>
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
              onCourseClick(course.id, locked);
            } else {
              onCourseClick(course.id, false);
            }
          }}
        >
          <Button 
            className={`w-full py-1.5 text-xs font-medium ${locked ? 'bg-muted/50 hover:bg-muted/60 text-foreground' : ''}`}
            variant={locked ? "outline" : "default"}
          >
            {locked && <Lock size={12} className="mr-1" />}
            {locked ? 'Atualizar plano para acessar' : (course.completed > 0 ? 'Continuar' : 'Começar curso')}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default LearnSection;
