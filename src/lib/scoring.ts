import { AssessmentAnswers, Cargo, LEADER_CARGOS } from "./questions";

export interface PillarScore {
  technical: number; // 0-100
  digital: number; // 0-100
  behavioral: number; // 0-100
  management: number | null; // 0-100 or null if not applicable
}

export type MaturityLevel =
  | "Iniciante"
  | "Em Desenvolvimento"
  | "Profissional"
  | "Sênior"
  | "Referência HR Executive";

export interface ScoreResult {
  pillars: PillarScore;
  overall: number;
  level: MaturityLevel;
  isLeader: boolean;
}

export function isLeader(cargo: Cargo | ""): boolean {
  return LEADER_CARGOS.includes(cargo as Cargo);
}

export function calculateScores(
  answers: AssessmentAnswers,
  cargo: Cargo | ""
): ScoreResult {
  const leader = isLeader(cargo);

  // Técnico: Part A only (7 questions, max 35)
  const technicalSum = answers.technical.reduce((a, b) => a + b, 0);
  const technicalScore = Math.round((technicalSum / 35) * 100);

  // Digital: AI questions (3 questions, max 15)
  const aiSum = answers.ai.reduce((a, b) => a + b, 0);
  const digitalScore = Math.round((aiSum / 15) * 100);

  // Comportamental: 10 questions, max 50
  const behavioralSum = answers.behavioral.reduce((a, b) => a + b, 0);
  const behavioralScore = Math.round((behavioralSum / 50) * 100);

  // Gestão: 10 questions, max 50 — only for leaders
  let managementScore: number | null = null;
  if (leader && answers.management.length === 10) {
    const managementSum = answers.management.reduce((a, b) => a + b, 0);
    managementScore = Math.round((managementSum / 50) * 100);
  }

  // Overall: average of applicable pillars
  const applicableScores = [technicalScore, digitalScore, behavioralScore];
  if (managementScore !== null) {
    applicableScores.push(managementScore);
  }
  const overall = Math.round(
    applicableScores.reduce((a, b) => a + b, 0) / applicableScores.length
  );

  const level = classifyLevel(overall);

  return {
    pillars: {
      technical: technicalScore,
      digital: digitalScore,
      behavioral: behavioralScore,
      management: managementScore,
    },
    overall,
    level,
    isLeader: leader,
  };
}

export function classifyLevel(overall: number): MaturityLevel {
  if (overall <= 40) return "Iniciante";
  if (overall <= 60) return "Em Desenvolvimento";
  if (overall <= 75) return "Profissional";
  if (overall <= 90) return "Sênior";
  return "Referência HR Executive";
}

export interface PillarFeedback {
  technical: string;
  digital: string;
  behavioral: string;
  management: string;
}

export function getPillarFeedback(pillars: PillarScore): PillarFeedback {
  const getTechnicalFeedback = (score: number): string => {
    if (score <= 40)
      return "Sua base técnica ainda está em formação. Foque em dominar os fundamentos da sua área e começar a trabalhar com indicadores básicos de RH.";
    if (score <= 60)
      return "Você tem conhecimento técnico inicial, mas ainda há espaço para aprofundamento. Busque aplicar suas competências com mais frequência e consistência.";
    if (score <= 75)
      return "Boa solidez técnica! Você aplica suas competências com segurança. O próximo passo é estruturar processos e influenciar decisões estratégicas.";
    if (score <= 90)
      return "Você demonstra domínio técnico avançado. Seu diferencial está em conectar os processos de RH à estratégia do negócio.";
    return "Referência técnica na sua área! Você estrutura processos, mentora equipes e tem visão completa das competências da sua função.";
  };

  const getDigitalFeedback = (score: number): string => {
    if (score <= 40)
      return "O uso de IA ainda é muito incipiente na sua atuação. Comece explorando ferramentas básicas e entenda os fundamentos éticos antes de avançar.";
    if (score <= 60)
      return "Você tem alguma familiaridade com IA, mas ainda usa de forma pontual. Explore casos de uso estratégico e aprofunde seu conhecimento sobre riscos e compliance.";
    if (score <= 75)
      return "Bom nível de adoção digital! Você já usa IA de forma aplicada. Avance para uso mais estratégico e analítico no dia a dia de RH.";
    if (score <= 90)
      return "Alto nível de maturidade digital. Você integra IA ao trabalho estratégico e tem consciência crítica sobre seus riscos e limites.";
    return "Você é referência em uso de IA em RH — combina domínio técnico, visão estratégica e consciência ética de forma exemplar.";
  };

  const getBehavioralFeedback = (score: number): string => {
    if (score <= 40)
      return "Suas competências comportamentais ainda estão em desenvolvimento. Trabalhe autoconhecimento, comunicação e adaptabilidade como prioridades.";
    if (score <= 60)
      return "Você tem competências comportamentais relevantes, mas ainda falta consistência. Invista em comunicação estratégica e visão sistêmica.";
    if (score <= 75)
      return "Perfil comportamental bem desenvolvido. Você demonstra maturidade e influência. Foque em ampliar seu impacto além da área de RH.";
    if (score <= 90)
      return "Forte presença comportamental. Você é reconhecido como influenciador e referência em resiliência, análise e visão estratégica.";
    return "Excelência comportamental! Você combina inteligência analítica, influência, visão sistêmica e capacidade de transformar desafios em resultados.";
  };

  const getManagementFeedback = (score: number | null): string => {
    if (score === null) return "Não aplicável para o seu cargo atual.";
    if (score <= 40)
      return "Sua gestão ainda está se estruturando. Priorize feedback, delegação e a criação de rituais claros de acompanhamento da equipe.";
    if (score <= 60)
      return "Você tem bases de gestão, mas ainda pode evoluir em estruturação de processos, desenvolvimento de pessoas e tomada de decisão baseada em dados.";
    if (score <= 75)
      return "Boa maturidade de gestão. Você aplica práticas com segurança. Avance na construção de sucessores e na conexão das metas da equipe à estratégia.";
    if (score <= 90)
      return "Gestão de alto nível. Você lidera com clareza, usa dados, desenvolve pessoas e conecta o time às metas do negócio.";
    return "Liderança de referência. Você é um gestor completo — estratégico, humano, analítico e com capacidade de desenvolver novos líderes.";
  };

  return {
    technical: getTechnicalFeedback(pillars.technical),
    digital: getDigitalFeedback(pillars.digital),
    behavioral: getBehavioralFeedback(pillars.behavioral),
    management: getManagementFeedback(pillars.management),
  };
}

export const LEVEL_COLORS: Record<MaturityLevel, string> = {
  Iniciante: "#EF4444",
  "Em Desenvolvimento": "#F97316",
  Profissional: "#EAB308",
  Sênior: "#06B6D4",
  "Referência HR Executive": "#6366F1",
};

export const LEVEL_DESCRIPTIONS: Record<MaturityLevel, string> = {
  Iniciante: "Você está no início da jornada. Há muito potencial a desenvolver.",
  "Em Desenvolvimento": "Você está crescendo! Consistência e prática vão acelerar sua evolução.",
  Profissional: "Você tem sólidas competências e aplica com confiança no dia a dia.",
  Sênior: "Alto desempenho! Você é referência dentro da sua área e influencia decisões.",
  "Referência HR Executive":
    "Excelência em RH. Você é um líder estratégico de pessoas com visão de negócio.",
};
