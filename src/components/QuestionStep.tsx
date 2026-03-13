"use client";

import { SCALE_LABELS } from "@/lib/questions";
import { clsx } from "clsx";

interface Props {
  stepLabel: string;
  title: string;
  subtitle?: string;
  questions: string[];
  answers: number[];
  onChange: (index: number, value: number) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack?: boolean;
}

interface ScaleButtonColors {
  base: string;
  hover: string;
  selected: string;
}

const SCALE_STYLES: Record<number, ScaleButtonColors> = {
  1: {
    base: "border-white/10 bg-white/5 text-slate-500",
    hover: "hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400",
    selected: "border-red-400 bg-red-500/25 text-red-300 shadow-lg shadow-red-500/20 scale-105",
  },
  2: {
    base: "border-white/10 bg-white/5 text-slate-500",
    hover: "hover:border-orange-500/50 hover:bg-orange-500/10 hover:text-orange-400",
    selected: "border-orange-400 bg-orange-500/25 text-orange-300 shadow-lg shadow-orange-500/20 scale-105",
  },
  3: {
    base: "border-white/10 bg-white/5 text-slate-500",
    hover: "hover:border-yellow-500/50 hover:bg-yellow-500/10 hover:text-yellow-400",
    selected: "border-yellow-400 bg-yellow-500/25 text-yellow-300 shadow-lg shadow-yellow-500/20 scale-105",
  },
  4: {
    base: "border-white/10 bg-white/5 text-slate-500",
    hover: "hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400",
    selected: "border-cyan-400 bg-cyan-500/25 text-cyan-300 shadow-lg shadow-cyan-500/20 scale-105",
  },
  5: {
    base: "border-white/10 bg-white/5 text-slate-500",
    hover: "hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400",
    selected: "border-indigo-400 bg-indigo-500/25 text-indigo-300 shadow-lg shadow-indigo-500/20 scale-105",
  },
};

export default function QuestionStep({
  stepLabel,
  title,
  subtitle,
  questions,
  answers,
  onChange,
  onNext,
  onBack,
  canGoBack = true,
}: Props) {
  const allAnswered = answers.every((a) => a > 0);
  const answeredCount = answers.filter((a) => a > 0).length;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="glass-card rounded-2xl p-8">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
            {stepLabel}
          </span>
          <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
          {subtitle && <p className="text-slate-400 text-sm">{subtitle}</p>}
        </div>

        {/* Scale legend */}
        <div className="mb-8 p-4 rounded-xl bg-white/[0.03] border border-white/[0.07]">
          <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wider">
            Escala de avaliação
          </p>
          <div className="flex flex-col gap-1.5 sm:flex-row sm:gap-3">
            {[1, 2, 3, 4, 5].map((val) => (
              <div key={val} className="flex items-center gap-2">
                <span
                  className={clsx(
                    "flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold",
                    val === 1 && "bg-red-500/30 text-red-300",
                    val === 2 && "bg-orange-500/30 text-orange-300",
                    val === 3 && "bg-yellow-500/30 text-yellow-300",
                    val === 4 && "bg-cyan-500/30 text-cyan-300",
                    val === 5 && "bg-indigo-500/30 text-indigo-300"
                  )}
                >
                  {val}
                </span>
                <span className="text-xs text-slate-500 leading-tight">
                  {SCALE_LABELS[val]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Questions */}
        <div className="space-y-7">
          {questions.map((question, idx) => {
            const currentAnswer = answers[idx];
            return (
              <div key={idx}>
                <div className="flex items-start gap-3 mb-3">
                  <span
                    className={clsx(
                      "flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center mt-0.5 transition-colors duration-200",
                      currentAnswer > 0
                        ? "bg-indigo-500/30 border border-indigo-400/50 text-indigo-300"
                        : "bg-white/8 border border-white/15 text-slate-500"
                    )}
                  >
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-200 leading-relaxed">{question}</p>
                </div>
                <div className="flex gap-2 ml-9">
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isSelected = currentAnswer === val;
                    const styles = SCALE_STYLES[val];
                    return (
                      <button
                        key={val}
                        onClick={() => onChange(idx, val)}
                        title={SCALE_LABELS[val]}
                        aria-label={`${val} — ${SCALE_LABELS[val]}`}
                        aria-pressed={isSelected}
                        className={clsx(
                          "flex-1 h-11 rounded-lg border text-sm font-bold transition-all duration-150",
                          isSelected
                            ? styles.selected
                            : `${styles.base} ${styles.hover}`
                        )}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
                {currentAnswer > 0 && (
                  <p className="ml-9 mt-1.5 text-xs text-slate-500 italic">
                    {SCALE_LABELS[currentAnswer]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress indicator */}
        <div className="mt-8 mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1.5">
            <span>{answeredCount} de {questions.length} respondidas</span>
            <span>{Math.round((answeredCount / questions.length) * 100)}%</span>
          </div>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-300"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3">
          {canGoBack && (
            <button
              onClick={onBack}
              className="px-6 py-3 rounded-xl font-semibold text-sm text-slate-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-slate-200 transition-all duration-200"
            >
              ← Voltar
            </button>
          )}
          <button
            onClick={onNext}
            disabled={!allAnswered}
            className={clsx(
              "flex-1 py-3 rounded-xl font-semibold text-sm transition-all duration-200",
              allAnswered
                ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:from-indigo-500 hover:to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01]"
                : "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5"
            )}
          >
            {allAnswered
              ? "Continuar →"
              : `Responda todas as ${questions.length} perguntas para continuar`}
          </button>
        </div>
      </div>
    </div>
  );
}
