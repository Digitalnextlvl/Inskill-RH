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
import { CheckIcon } from "lucide-react";

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const STEP_META: Record<number, { label: string; short: string }> = {
  1: { label: "Competências Técnicas", short: "Técnico" },
  2: { label: "Competências Digitais",  short: "Digital" },
  3: { label: "Competências Comportamentais", short: "Comportamental" },
  4: { label: "Competências de Gestão", short: "Gestão" },
};

function createEmptyAnswers(): AssessmentAnswers {
  return {
    technical:   Array(7).fill(0),
    ai:          Array(3).fill(0),
    behavioral:  Array(10).fill(0),
    management:  Array(10).fill(0),
  };
}

export default function Assessment() {
  const [step, setStep]               = useState<Step>(0);
  const [qualification, setQualification] = useState<Qualification>({ area: "", cargo: "", companySize: "" });
  const [answers, setAnswers]         = useState<AssessmentAnswers>(createEmptyAnswers());
  const [result, setResult]           = useState<ScoreResult | null>(null);
  const [animating, setAnimating]     = useState(false);

  const leader        = isLeader(qualification.cargo);
  const totalSteps    = leader ? 4 : 3;
  const effectiveStep = leader ? step - 1 : step > 3 ? step - 2 : step - 1;

  function transition(nextStep: Step) {
    setAnimating(true);
    setTimeout(() => {
      setStep(nextStep);
      setAnimating(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 160);
  }

  function handleQualificationNext() { transition(1); }
  function handleTechnicalNext()     { transition(2); }
  function handleAINext()            { transition(3); }

  function handleBehavioralNext() {
    if (leader) {
      transition(4);
    } else {
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

  function updateAnswer(pillar: keyof AssessmentAnswers, index: number, value: number) {
    setAnswers((prev) => {
      const arr = [...prev[pillar]];
      arr[index] = value;
      return { ...prev, [pillar]: arr };
    });
  }

  const showProgress = step > 0 && step < 5;
  const stepNumbers  = leader ? [1, 2, 3, 4] : [1, 2, 3];

  return (
    <div className="min-h-screen">

      {/* ── Header ── */}
      <header className="text-center mb-12">
        {/* Logo */}
        <div className="flex items-center justify-center mb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/inspand-logo.png"
            alt="Inspand"
            style={{
              height: "52px",
              width: "auto",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
            }}
          />
        </div>

        <h1
          className="font-extrabold tracking-tight"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.75rem)",
            color: "var(--text)",
            lineHeight: 1.15,
          }}
        >
          Avaliação de Maturidade em RH
        </h1>
        <p className="mt-3 text-sm" style={{ color: "var(--text-muted)", maxWidth: "34rem", margin: "0.75rem auto 0" }}>
          Descubra seu nível de maturidade e acelere sua carreira em RH
        </p>
      </header>

      {/* ── Step progress ── */}
      {showProgress && (
        <div className="max-w-2xl mx-auto mb-10 px-2">
          {/* Step pills row */}
          <div className="flex items-center justify-center gap-0 mb-5">
            {stepNumbers.map((s, i) => {
              const done    = effectiveStep > i;
              const active  = effectiveStep === i;
              const stepKey = leader ? s : s;
              const meta    = STEP_META[stepKey];

              return (
                <div key={s} className="flex items-center">
                  {/* Connector line (before first pill is hidden) */}
                  {i > 0 && (
                    <div
                      style={{
                        width: "3.5rem",
                        height: "1px",
                        background: done || active
                          ? "linear-gradient(90deg, var(--primary), var(--primary-light))"
                          : "rgba(255,255,255,0.1)",
                        transition: "background 0.4s ease",
                      }}
                    />
                  )}

                  {/* Pill */}
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="flex items-center justify-center rounded-full text-xs font-bold transition-all duration-300"
                      style={{
                        width: "2.25rem",
                        height: "2.25rem",
                        background: done
                          ? "linear-gradient(135deg, var(--primary), var(--accent))"
                          : active
                          ? "linear-gradient(135deg, var(--primary), #9333EA)"
                          : "rgba(255,255,255,0.05)",
                        border: active
                          ? "2px solid var(--primary-light)"
                          : done
                          ? "2px solid transparent"
                          : "2px solid rgba(255,255,255,0.12)",
                        color: done || active ? "#fff" : "var(--text-dim)",
                        boxShadow: active ? "var(--shadow-glow-sm)" : "none",
                        transform: active ? "scale(1.1)" : "scale(1)",
                      }}
                    >
                      {done ? <CheckIcon size={13} strokeWidth={3} /> : i + 1}
                    </div>
                    <span
                      className="hidden sm:block text-center"
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 600,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: active ? "var(--primary-light)" : done ? "var(--text-muted)" : "var(--text-dim)",
                        maxWidth: "5rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {meta?.short}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active step label + progress bar */}
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: "var(--text-dim)" }}
            >
              Etapa {Math.max(1, effectiveStep + 1)} de {totalSteps}
            </span>
            <span
              className="text-xs font-semibold"
              style={{ color: "var(--primary-light)" }}
            >
              {STEP_META[step]?.label}
            </span>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${((effectiveStep + 1) / totalSteps) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* ── Main content ── */}
      <div
        className={clsx(
          "transition-all duration-150",
          animating ? "opacity-0 translate-y-3" : "opacity-100 translate-y-0"
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
