"use client";

import { useState } from "react";
import {
  Qualification,
  AssessmentAnswers,
  TECHNICAL_QUESTIONS,
  AI_QUESTIONS,
  BEHAVIORAL_QUESTIONS,
  MANAGEMENT_QUESTIONS,
  Area,
} from "@/lib/questions";
import { calculateScores, isLeader, ScoreResult } from "@/lib/scoring";
import QualificationStep from "./Qualification";
import QuestionStep from "./QuestionStep";
import Results from "./Results";
import { clsx } from "clsx";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const STEP_LABELS: Record<number, string> = {
  0: "Qualificação",
  1: "Técnico",
  2: "Digital",
  3: "Comportamental",
  4: "Gestão",
  5: "Resultado",
};

function createEmptyAnswers(): AssessmentAnswers {
  return {
    technical: Array(7).fill(0),
    ai: Array(3).fill(0),
    behavioral: Array(10).fill(0),
    management: Array(10).fill(0),
  };
}

export default function Assessment() {
  const [step, setStep] = useState<Step>(0);
  const [qualification, setQualification] = useState<Qualification>({
    area: "",
    cargo: "",
    companySize: "",
  });
  const [answers, setAnswers] = useState<AssessmentAnswers>(createEmptyAnswers());
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [animating, setAnimating] = useState(false);

  const leader = isLeader(qualification.cargo);

  // Get effective step count for progress bar
  const progressSteps = leader ? 5 : 4; // excluding results
  const effectiveStep = leader ? step : step > 3 ? step - 1 : step;

  function transition(nextStep: Step) {
    setAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setAnimating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 150);
  }

  function handleQualificationNext() {
    transition(1);
  }

  function handleTechnicalNext() {
    transition(2);
  }

  function handleAINext() {
    transition(3);
  }

  function handleBehavioralNext() {
    if (leader) {
      transition(4);
    } else {
      // Calculate results, skip step 4
      const res = calculateScores(answers, qualification.cargo);
      setResult(res);
      transition(5);
    }
  }

  function handleManagementNext() {
    const res = calculateScores(answers, qualification.cargo);
    setResult(res);
    transition(5);
  }

  function handleReset() {
    setQualification({ area: "", cargo: "", companySize: "" });
    setAnswers(createEmptyAnswers());
    setResult(null);
    transition(0);
  }

  function updateAnswer(
    pillar: keyof AssessmentAnswers,
    index: number,
    value: number
  ) {
    setAnswers((prev) => {
      const arr = [...prev[pillar]];
      arr[index] = value;
      return { ...prev, [pillar]: arr };
    });
  }

  const showProgress = step > 0 && step < 5;

  return (
    <div className="min-h-screen px-4 py-8">
      {/* Header */}
      <header className="text-center mb-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center">
            <span className="text-white font-bold text-xs">IH</span>
          </div>
          <span className="text-sm font-semibold text-slate-400 tracking-widest uppercase">
            Inskill HR Executive
          </span>
        </div>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Avaliação de Maturidade em RH
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Descubra seu nível de maturidade e acelere sua carreira em RH
        </p>
      </header>

      {/* Progress bar */}
      {showProgress && (
        <div className="max-w-3xl mx-auto mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-400">
              Etapa {effectiveStep} de {progressSteps}
            </span>
            <span className="text-xs font-medium text-indigo-400">
              {STEP_LABELS[step]}
            </span>
          </div>
          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 transition-all duration-500"
              style={{
                width: `${(effectiveStep / progressSteps) * 100}%`,
              }}
            />
          </div>
          {/* Step dots */}
          <div className="flex justify-between mt-3">
            {Array.from({ length: progressSteps }, (_, i) => i + 1).map((s) => (
              <div
                key={s}
                className={clsx(
                  "flex flex-col items-center gap-1",
                )}
              >
                <div
                  className={clsx(
                    "w-2 h-2 rounded-full transition-all duration-300",
                    effectiveStep >= s
                      ? "bg-indigo-400 scale-125"
                      : "bg-white/20"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Content with fade transition */}
      <div
        className={clsx(
          "transition-all duration-150",
          animating ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}
      >
        {step === 0 && (
          <QualificationStep
            qualification={qualification}
            onChange={setQualification}
            onNext={handleQualificationNext}
          />
        )}

        {step === 1 && qualification.area && (
          <QuestionStep
            stepLabel="PILAR 1 — COMPETÊNCIAS TÉCNICAS"
            title={`Competências de ${qualification.area}`}
            subtitle="Avalie sua proficiência em cada competência técnica da sua área."
            questions={TECHNICAL_QUESTIONS[qualification.area as Area]}
            answers={answers.technical}
            onChange={(i, v) => updateAnswer("technical", i, v)}
            onNext={handleTechnicalNext}
            onBack={() => transition(0)}
          />
        )}

        {step === 2 && (
          <QuestionStep
            stepLabel="PILAR 1B — COMPETÊNCIAS DIGITAIS"
            title="Inteligência Artificial em RH"
            subtitle="Avalie seu nível de adoção e conhecimento sobre IA aplicada ao RH."
            questions={AI_QUESTIONS}
            answers={answers.ai}
            onChange={(i, v) => updateAnswer("ai", i, v)}
            onNext={handleAINext}
            onBack={() => transition(1)}
          />
        )}

        {step === 3 && (
          <QuestionStep
            stepLabel="PILAR 2 — COMPETÊNCIAS COMPORTAMENTAIS"
            title="Competências Comportamentais"
            subtitle="Avalie como você age e se posiciona no ambiente de trabalho."
            questions={BEHAVIORAL_QUESTIONS}
            answers={answers.behavioral}
            onChange={(i, v) => updateAnswer("behavioral", i, v)}
            onNext={handleBehavioralNext}
            onBack={() => transition(2)}
          />
        )}

        {step === 4 && leader && (
          <QuestionStep
            stepLabel="PILAR 3 — COMPETÊNCIAS DE GESTÃO"
            title="Competências de Gestão"
            subtitle="Avalie suas habilidades de liderança e gestão de pessoas."
            questions={MANAGEMENT_QUESTIONS}
            answers={answers.management}
            onChange={(i, v) => updateAnswer("management", i, v)}
            onNext={handleManagementNext}
            onBack={() => transition(3)}
          />
        )}

        {step === 5 && result && (
          <Results
            result={result}
            qualification={qualification}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
