export type Area =
  | "RH Generalista"
  | "Universidade Corporativa"
  | "Gente & Gestão"
  | "T&D"
  | "Departamento Pessoal"
  | "DHO";

export type Cargo =
  | "Analista Jr"
  | "Analista Pl"
  | "Analista Sr"
  | "Especialista"
  | "Coordenador"
  | "Gerente"
  | "Head / Diretor";

export type CompanySize =
  | "Até 200 colaboradores"
  | "200 a 1.000"
  | "1.000+";

export interface Qualification {
  area: Area | "";
  cargo: Cargo | "";
  companySize: CompanySize | "";
}

export interface Question {
  id: string;
  text: string;
  pillar: "technical" | "ai" | "behavioral" | "management";
}

export const AREAS: Area[] = [
  "RH Generalista",
  "Universidade Corporativa",
  "Gente & Gestão",
  "T&D",
  "Departamento Pessoal",
  "DHO",
];

export const CARGOS: Cargo[] = [
  "Analista Jr",
  "Analista Pl",
  "Analista Sr",
  "Especialista",
  "Coordenador",
  "Gerente",
  "Head / Diretor",
];

export const COMPANY_SIZES: CompanySize[] = [
  "Até 200 colaboradores",
  "200 a 1.000",
  "1.000+",
];

export const LEADER_CARGOS: Cargo[] = ["Coordenador", "Gerente", "Head / Diretor"];

export const TECHNICAL_QUESTIONS: Record<Area, string[]> = {
  "RH Generalista": [
    "Estruturo e acompanho indicadores como turnover, absenteísmo e custo por contratação.",
    "Participo da revisão de cargos e salários com base em dados.",
    "Conecto ações de RH com metas estratégicas da empresa.",
    "Estruturo processos de avaliação de desempenho.",
    "Utilizo sistemas de RH (ATS, HRIS, LMS) de forma analítica.",
    "Já participei de projetos de cultura organizacional.",
    "Estruturei planos de desenvolvimento individual (PDI).",
  ],
  "Universidade Corporativa": [
    "Estruturo trilhas de aprendizagem por cargo ou competência.",
    "Utilizo matriz de competências para planejamento educacional.",
    "Mensuro impacto de treinamentos na performance.",
    "Trabalho com indicadores de engajamento em LMS.",
    "Segmento público-alvo para aprendizagem personalizada.",
    "Estruturei programas de liderança.",
    "Conecto educação corporativa a metas de negócio.",
  ],
  "T&D": [
    "Realizo diagnóstico antes de estruturar treinamentos.",
    "Mensuro ROI ou impacto dos treinamentos aplicados.",
    "Estruturo programas baseados em competências.",
    "Utilizo LMS de forma estratégica.",
    "Desenvolvo trilhas híbridas (presencial + online).",
    "Trabalho com avaliação de reação e aprendizagem.",
    "Conecto treinamento a indicadores de performance.",
  ],
  "Departamento Pessoal": [
    "Domino legislação trabalhista atualizada.",
    "Estruturo processos com foco em compliance.",
    "Utilizo sistemas de folha com domínio técnico.",
    "Automatizo processos administrativos.",
    "Participei de auditorias trabalhistas.",
    "Acompanho indicadores de passivo trabalhista.",
    "Conecto DP a indicadores financeiros da empresa.",
  ],
  DHO: [
    "Estruturo avaliação de desempenho por competências.",
    "Desenvolvo programas de sucessão.",
    "Trabalho cultura organizacional de forma estruturada.",
    "Utilizo assessment comportamental com critério técnico.",
    "Estruturo planos de desenvolvimento individuais.",
    "Trabalho employer branding estrategicamente.",
    "Conecto desenvolvimento humano a metas estratégicas.",
  ],
  "Gente & Gestão": [
    "Estruturo rituais de gestão para líderes.",
    "Apoio gestores com indicadores de pessoas.",
    "Desenvolvo lideranças com plano estruturado.",
    "Trabalho sucessão e pipeline de liderança.",
    "Conecto RH à estratégia de negócio.",
    "Uso dados para apoiar decisões de gestão.",
    "Estruturei políticas claras de performance.",
  ],
};

export const AI_QUESTIONS: string[] = [
  "Utilizo IA para apoiar tarefas estratégicas de RH.",
  "Uso IA para análise de dados ou geração de relatórios.",
  "Conheço riscos éticos e legais do uso de IA em RH.",
];

export const BEHAVIORAL_QUESTIONS: string[] = [
  "Conecto decisões de RH a indicadores de negócio.",
  "Analiso dados antes de tomar decisões.",
  "Sou reconhecido como influenciador interno.",
  "Me adapto rapidamente a mudanças organizacionais.",
  "Busco atualização constante.",
  "Consigo comunicar decisões difíceis com clareza.",
  "Trabalho bem em ambientes de pressão.",
  "Tenho visão sistêmica da organização.",
  "Colaboro com outras áreas de forma estratégica.",
  "Consigo transformar problemas complexos em planos práticos.",
];

export const MANAGEMENT_QUESTIONS: string[] = [
  "Delego responsabilidades com clareza.",
  "Dou feedback estruturado e frequente.",
  "Desenvolvo sucessores.",
  "Estruturei rituais de gestão periódicos.",
  "Tomo decisões baseadas em dados.",
  "Participo ativamente de decisões estratégicas.",
  "Entendo indicadores financeiros (DRE, margem, custo).",
  "Conecto metas da minha área ao planejamento estratégico.",
  "Gerencio conflitos com maturidade.",
  "Estruturo planos de ação com acompanhamento claro.",
];

export const SCALE_LABELS: Record<number, string> = {
  1: "Não aplico / Não domino",
  2: "Conheço superficialmente",
  3: "Aplico ocasionalmente",
  4: "Aplico com segurança",
  5: "Sou referência / Estruturei isso na minha área",
};

export interface AssessmentAnswers {
  technical: number[]; // 7 answers
  ai: number[]; // 3 answers
  behavioral: number[]; // 10 answers
  management: number[]; // 10 answers or empty
}
