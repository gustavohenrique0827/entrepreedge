
export interface CourseModule {
  title: string;
  lessons: {
    title: string;
    duration: string;
    completed: boolean;
    youtubeUrl: string;
  }[];
}

export interface Course {
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

export interface CourseDetail {
  id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  duration: string;
  about: string;
  prerequisite: string;
  benefits: string[];
  modules: CourseModule[];
}

// Lista de cursos para exibição na página principal
export const courses: Course[] = [
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
    categories: ['Gestão financeira', 'Comércio varejista', 'Prestação de serviços']
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
    categories: ['Marketing digital', 'Comércio varejista', 'Tecnologia']
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
    categories: ['Planejamento estratégico', 'Indústria', 'Gestão financeira']
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
    categories: ['Vendas', 'Comércio varejista', 'Comércio atacadista']
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
    categories: ['RH e liderança', 'Prestação de serviços', 'Indústria']
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
    categories: ['Gestão financeira', 'Tecnologia', 'Educação']
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
    categories: ['Tecnologia', 'Inovação', 'Operações']
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
    categories: ['Planejamento estratégico', 'Sustentabilidade', 'Indústria']
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
    categories: ['Contabilidade', 'Gestão financeira', 'Comércio varejista']
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
    categories: ['Empreendedorismo', 'Inovação', 'Vendas']
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
    categories: ['Contabilidade', 'Gestão financeira', 'Tributação']
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
    categories: ['Inovação', 'Empreendedorismo', 'Tecnologia']
  }
];

// Detalhes completos dos cursos para a página individual de cada curso
export const courseDetails: CourseDetail[] = [
  {
    id: "1",
    title: "Fundamentos de gestão financeira",
    description: "Aprenda os conceitos básicos de gestão financeira para pequenos negócios",
    image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    author: "Maria Silva",
    duration: "2h 30min",
    about: "Este curso foi desenvolvido para ajudar empreendedores iniciantes a construir uma base sólida para seus negócios. Abordamos conceitos fundamentais que são essenciais para o sucesso empresarial. Os módulos foram organizados de forma progressiva, permitindo que você construa seu conhecimento passo a passo, desde os conceitos básicos até estratégias mais avançadas.",
    prerequisite: "Nenhum conhecimento prévio é necessário. Este curso é ideal para iniciantes no empreendedorismo.",
    benefits: [
      "Desenvolver uma visão clara de gestão financeira",
      "Identificar oportunidades de economia",
      "Compreender conceitos financeiros básicos",
      "Desenvolver estratégias de controle financeiro eficientes",
      "Estruturar processos de controle e análise"
    ],
    modules: [
      {
        title: "Introdução à Gestão Financeira",
        lessons: [
          { title: "O que é gestão financeira?", duration: "15min", completed: true, youtubeUrl: "https://www.youtube.com/embed/BwZYMbCLTzU" },
          { title: "Princípios básicos", duration: "20min", completed: true, youtubeUrl: "https://www.youtube.com/embed/ZUHpg5SnQjU" },
          { title: "Identificando oportunidades", duration: "25min", completed: false, youtubeUrl: "https://www.youtube.com/embed/NG_O2zEUh5M" }
        ]
      },
      {
        title: "Planejamento Financeiro",
        lessons: [
          { title: "Orçamento empresarial", duration: "30min", completed: false, youtubeUrl: "https://www.youtube.com/embed/JBEz-6ELbTU" },
          { title: "Análise de custos", duration: "25min", completed: false, youtubeUrl: "https://www.youtube.com/embed/1y5ImXm5aOo" },
          { title: "Fluxo de caixa", duration: "40min", completed: false, youtubeUrl: "https://www.youtube.com/embed/NG_O2zEUh5M" }
        ]
      }
    ]
  },
  {
    id: "2",
    title: "Marketing digital para empreendedores",
    description: "Estratégias eficientes de marketing digital com baixo investimento",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    author: "Carlos Mendes",
    duration: "1h 45min",
    about: "Este curso foi desenvolvido para empreendedores que desejam aprimorar suas habilidades de marketing digital com baixo orçamento. Compreender as estratégias digitais é fundamental para alcançar clientes no ambiente online e garantir a visibilidade do seu negócio.",
    prerequisite: "Conhecimento básico de internet. Não é necessário experiência prévia em marketing.",
    benefits: [
      "Criar estratégias eficientes de marketing digital",
      "Entender as principais plataformas e ferramentas",
      "Criar conteúdo relevante para seu público",
      "Mensurar resultados das campanhas",
      "Otimizar investimentos em marketing"
    ],
    modules: [
      {
        title: "Fundamentos de Marketing Digital",
        lessons: [
          { title: "Conceitos básicos", duration: "20min", completed: false, youtubeUrl: "https://www.youtube.com/embed/4CnY7LVUE_Y" },
          { title: "Jornada do cliente online", duration: "25min", completed: false, youtubeUrl: "https://www.youtube.com/embed/lXwGeZL2tmY" },
          { title: "Estratégias de presença online", duration: "30min", completed: false, youtubeUrl: "https://www.youtube.com/embed/yBimw45Tn5M" }
        ]
      },
      {
        title: "Plataformas e Ferramentas",
        lessons: [
          { title: "Redes sociais para negócios", duration: "25min", completed: false, youtubeUrl: "https://www.youtube.com/embed/gRYa5JZoU3Y" },
          { title: "Email marketing", duration: "20min", completed: false, youtubeUrl: "https://www.youtube.com/embed/4CnY7LVUE_Y" },
          { title: "SEO básico", duration: "35min", completed: false, youtubeUrl: "https://www.youtube.com/embed/lXwGeZL2tmY" }
        ]
      }
    ]
  },
  {
    id: "3",
    title: "Planejamento estratégico",
    description: "Como definir e executar um planejamento estratégico para seu negócio",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    author: "Ana Prado",
    duration: "2h 15min",
    about: "Este curso aborda como criar e implementar um planejamento estratégico eficiente para pequenas e médias empresas. Você aprenderá a definir objetivos claros, analisar o ambiente de negócios e criar planos de ação alinhados com a visão da sua empresa.",
    prerequisite: "Conhecimento básico sobre gestão de negócios é recomendado.",
    benefits: [
      "Desenvolver uma visão estratégica para seu negócio",
      "Realizar análises eficientes do ambiente competitivo",
      "Definir objetivos claros e alcançáveis",
      "Criar planos de ação eficientes",
      "Monitorar a execução do planejamento"
    ],
    modules: [
      {
        title: "Fundamentos do Planejamento Estratégico",
        lessons: [
          { title: "O que é planejamento estratégico?", duration: "20min", completed: false, youtubeUrl: "https://www.youtube.com/embed/wZzM96G5ap0" },
          { title: "Análise SWOT", duration: "30min", completed: false, youtubeUrl: "https://www.youtube.com/embed/kCpXdZN-Aks" },
          { title: "Definição de missão e visão", duration: "25min", completed: false, youtubeUrl: "https://www.youtube.com/embed/wZzM96G5ap0" }
        ]
      },
      {
        title: "Implementação da Estratégia",
        lessons: [
          { title: "Planos de ação", duration: "35min", completed: false, youtubeUrl: "https://www.youtube.com/embed/kCpXdZN-Aks" },
          { title: "Indicadores de desempenho", duration: "25min", completed: false, youtubeUrl: "https://www.youtube.com/embed/wZzM96G5ap0" },
          { title: "Revisão e ajustes", duration: "20min", completed: false, youtubeUrl: "https://www.youtube.com/embed/kCpXdZN-Aks" }
        ]
      }
    ]
  },
  {
    id: "4",
    title: "Vendas e negociação",
    description: "Técnicas avançadas de vendas e negociação para aumentar sua receita",
    image: "https://images.unsplash.com/photo-1573496358961-3c82861ab8f4?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    author: "Pedro Santos",
    duration: "3h 10min",
    about: "Este curso ensina técnicas eficientes de vendas e negociação para empreendedores, com foco em criar relacionamentos duradouros com clientes e aumentar a taxa de conversão das suas ofertas.",
    prerequisite: "Experiência básica em atendimento ao cliente é recomendada.",
    benefits: [
      "Desenvolver habilidades avançadas de comunicação",
      "Entender a psicologia do cliente",
      "Criar propostas de valor irresistíveis",
      "Superar objeções com eficiência",
      "Fechar negócios com taxas maiores de conversão"
    ],
    modules: [
      {
        title: "Fundamentos de Vendas",
        lessons: [
          { title: "Psicologia do consumidor", duration: "25min", completed: false, youtubeUrl: "https://www.youtube.com/embed/R9jfRjQLoT8" },
          { title: "Ciclo de vendas", duration: "30min", completed: false, youtubeUrl: "https://www.youtube.com/embed/R9jfRjQLoT8" },
          { title: "Proposta de valor", duration: "35min", completed: false, youtubeUrl: "https://www.youtube.com/embed/R9jfRjQLoT8" }
        ]
      },
      {
        title: "Técnicas de Negociação",
        lessons: [
          { title: "Preparação para negociações", duration: "30min", completed: false, youtubeUrl: "https://www.youtube.com/embed/R9jfRjQLoT8" },
          { title: "Táticas de negociação", duration: "40min", completed: false, youtubeUrl: "https://www.youtube.com/embed/R9jfRjQLoT8" },
          { title: "Fechamento de negócios", duration: "30min", completed: false, youtubeUrl: "https://www.youtube.com/embed/R9jfRjQLoT8" }
        ]
      }
    ]
  },
  {
    id: "5",
    title: "Gestão de equipes",
    description: "Como liderar e motivar seu time para alcançar melhores resultados",
    image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    author: "Juliana Moraes",
    duration: "2h 20min",
    about: "Aprenda técnicas modernas de liderança e gestão de pessoas para criar um ambiente de trabalho produtivo e engajado, mesmo com recursos limitados. Este curso foca em estratégias práticas para pequenas e médias empresas.",
    prerequisite: "Experiência básica em gestão de pessoas é recomendada.",
    benefits: [
      "Desenvolver habilidades de liderança eficiente",
      "Criar um ambiente de trabalho positivo",
      "Implementar técnicas de feedback construtivo",
      "Gerenciar conflitos de maneira produtiva",
      "Potencializar o desempenho da sua equipe"
    ],
    modules: [
      {
        title: "Fundamentos de Liderança",
        lessons: [
          { title: "Estilos de liderança", duration: "25min", completed: false, youtubeUrl: "https://www.youtube.com/embed/ggE_wUNlWy0" },
          { title: "Comunicação eficiente", duration: "30min", completed: false, youtubeUrl: "https://www.youtube.com/embed/ggE_wUNlWy0" },
          { title: "Delegação e confiança", duration: "20min", completed: false, youtubeUrl: "https://www.youtube.com/embed/ggE_wUNlWy0" }
        ]
      },
      {
        title: "Desenvolvimento de Equipes",
        lessons: [
          { title: "Recrutamento e seleção", duration: "35min", completed: false, youtubeUrl: "https://www.youtube.com/embed/ggE_wUNlWy0" },
          { title: "Feedback e avaliação", duration: "30min", completed: false, youtubeUrl: "https://www.youtube.com/embed/ggE_wUNlWy0" },
          { title: "Desenvolvimento de talentos", duration: "25min", completed: false, youtubeUrl: "https://www.youtube.com/embed/ggE_wUNlWy0" }
        ]
      }
    ]
  }
];

// Função para encontrar um curso pelo ID
export const findCourseById = (id: string): CourseDetail | undefined => {
  return courseDetails.find(course => course.id === id);
};
