
export interface Course {
  id: string;
  title: string;
  description: string;
  image: string;
  level: 'Iniciante' | 'Intermediário' | 'Avançado';
  duration: string;
  modules: number;
  completed: number;
  categories: string[];
  popular?: boolean;
  new?: boolean;
}

export const courses: Course[] = [
  {
    id: "1",
    title: "Fundamentos da Gestão Financeira",
    description: "Aprenda os princípios fundamentais para gerenciar as finanças do seu negócio de forma eficiente e sustentável.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    level: "Iniciante",
    duration: "3h 30min",
    modules: 5,
    completed: 2,
    categories: ["Financeiro", "Empreendedorismo"],
    popular: true
  },
  {
    id: "2",
    title: "Estratégias de Marketing Digital",
    description: "Domine as técnicas de marketing digital para promover seu negócio e alcançar mais clientes.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    level: "Intermediário",
    duration: "5h 15min",
    modules: 8,
    completed: 0,
    categories: ["Marketing", "Tecnologia", "Comércio varejista"],
    new: true
  },
  {
    id: "3",
    title: "Gestão de Equipes e Liderança",
    description: "Desenvolva habilidades de liderança para gerenciar sua equipe de forma eficaz e motivada.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    level: "Intermediário",
    duration: "4h 45min",
    modules: 6,
    completed: 0,
    categories: ["RH", "Liderança", "Gestão"]
  },
  {
    id: "4",
    title: "Análise de Dados para Negócios",
    description: "Utilize dados para tomar decisões estratégicas e impulsionar o crescimento do seu negócio.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    level: "Avançado",
    duration: "6h",
    modules: 7,
    completed: 0,
    categories: ["Análise de dados", "Tecnologia", "Estratégia"]
  },
  {
    id: "5",
    title: "Planejamento Financeiro para Startups",
    description: "Aprenda a planejar as finanças da sua startup para garantir sustentabilidade e crescimento.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    level: "Iniciante",
    duration: "3h",
    modules: 4,
    completed: 0,
    categories: ["Financeiro", "Startups", "Planejamento"]
  },
  {
    id: "6",
    title: "Técnicas de Vendas Eficazes",
    description: "Domine estratégias de vendas para aumentar sua taxa de conversão e faturamento.",
    image: "https://images.unsplash.com/photo-1556745753-b2904692b3cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1473&q=80",
    level: "Intermediário",
    duration: "4h 30min",
    modules: 6,
    completed: 0,
    categories: ["Vendas", "Comércio varejista", "Estratégia"],
    popular: true
  },
  {
    id: "7",
    title: "Gestão de Projetos para PMEs",
    description: "Implementação de metodologias ágeis de gestão de projetos adaptadas para pequenas empresas.",
    image: "https://images.unsplash.com/photo-1542626991-cbc4e32524cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
    level: "Intermediário",
    duration: "5h",
    modules: 7,
    completed: 3,
    categories: ["Projetos", "Gestão", "PME"]
  },
  {
    id: "8",
    title: "Estratégias Fiscais para Empresários",
    description: "Compreenda a tributação e desenvolva estratégias para otimização fiscal do seu negócio.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1426&q=80",
    level: "Avançado",
    duration: "5h 30min",
    modules: 8,
    completed: 0,
    categories: ["Financeiro", "Impostos", "Contabilidade"]
  },
  {
    id: "9",
    title: "E-commerce para Pequenos Negócios",
    description: "Monte sua loja virtual e expanda seu alcance através do comércio eletrônico.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    level: "Iniciante",
    duration: "4h",
    modules: 6,
    completed: 0,
    categories: ["E-commerce", "Tecnologia", "Vendas"],
    new: true
  },
  {
    id: "10",
    title: "Inovação e Criatividade nos Negócios",
    description: "Desenvolva um mindset inovador e aplique técnicas criativas para solucionar problemas.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    level: "Intermediário",
    duration: "3h 45min",
    modules: 5,
    completed: 1,
    categories: ["Inovação", "Criatividade", "Estratégia"]
  },
  {
    id: "11",
    title: "Gestão de Tempo e Produtividade",
    description: "Técnicas para gerenciar melhor seu tempo e aumentar sua produtividade como empreendedor.",
    image: "https://images.unsplash.com/photo-1506784926709-22f1ec395907?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1468&q=80",
    level: "Iniciante",
    duration: "2h 30min",
    modules: 4,
    completed: 0,
    categories: ["Produtividade", "Gestão", "Desenvolvimento Pessoal"]
  },
  {
    id: "12",
    title: "Transformação Digital para PMEs",
    description: "Prepare seu negócio para a era digital e aproveite as oportunidades da tecnologia.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    level: "Avançado",
    duration: "6h 15min",
    modules: 9,
    completed: 0,
    categories: ["Tecnologia", "Transformação Digital", "Inovação"],
    popular: true
  }
];
