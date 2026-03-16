"use client";

import { SCALE_LABELS } from "@/lib/questions";
import { clsx } from "clsx";
import { ArrowLeft } from "lucide-react";

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

/* Color system for 1-5 scale */
const SCALE_COLORS: Record<number, { fill: string; border: string; glow: string; text: string }> = {
  1: { fill: "rgba(239,68,68,0.2)",   border: "#EF4444", glow: "rgba(239,68,68,0.25)",   text: "#FCA5A5" },
  2: { fill: "rgba(249,115,22,0.2)",  border: "#F97316", glow: "rgba(249,115,22,0.25)",  text: "#FDBA74" },
  3: { fill: "rgba(234,179,8,0.2)",   border: "#EAB308", glow: "rgba(234,179,8,0.25)",   text: "#FDE047" },
  4: { fill: "rgba(34,211,238,0.2)",  border: "#22D3EE", glow: "rgba(34,211,238,0.25)",  text: "#67E8F9" },
  5: { fill: "rgba(124,58,237,0.25)", border: "#7C3AED", glow: "rgba(124,58,237,0.35)",  text: "#A78BFA" },
};

const SCALE_LEGEND_COLORS: Record<number, string> = {
  1: "#EF4444",
  2: "#F97316",
  3: "#EAB308",
  4: "#22D3EE",
  5: "#7C3AED",
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
  const allAnswered   = answers.every((a) => a > 0);
  const answeredCount = answers.filter((a) => a > 0).length;
  const pct           = Math.round((answeredCount / questions.length) * 100);

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        className="glass-card p-8"
        style={{ borderRadius: "var(--radius-xl)" }}
      >

        {/* Header */}
        <div className="mb-8">
          <span className="step-badge mb-4 inline-flex">{stepLabel}</span>
          <h2
            className="text-2xl font-bold mb-1.5"
            style={{ color: "var(--text)" }}
          >
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Scale legend */}
        <div
          className="mb-8 p-4 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "var(--radius-md)",
          }}
        >
          <p
            className="text-xs font-bold mb-3 uppercase tracking-widest"
            style={{ color: "var(--text-dim)" }}
          >
            Escala de avaliação
          </p>
          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-1.5">
            {[1, 2, 3, 4, 5].map((val) => (
              <div key={val} className="flex items-center gap-2">
                <span
                  className="shrink-0 w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
                  style={{
                    background: `${SCALE_LEGEND_COLORS[val]}22`,
                    color: SCALE_LEGEND_COLORS[val],
                    border: `1px solid ${SCALE_LEGEND_COLORS[val]}44`,
                  }}
                >
                  {val}
                </span>
                <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                  {SCALE_LABELS[val]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-8">
          {questions.map((question, idx) => {
            const current = answers[idx];
            const answered = current > 0;

            return (
              <div key={idx}>
                {/* Question row */}
                <div className="flex items-start gap-3 mb-3">
                  {/* Number bubble */}
                  <span
                    className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 transition-all duration-200"
                    style={{
                      background: answered
                        ? "linear-gradient(135deg, var(--primary), var(--accent))"
                        : "rgba(255,255,255,0.05)",
                      border: answered
                        ? "none"
                        : "1px solid rgba(255,255,255,0.12)",
                      color: answered ? "#fff" : "var(--text-dim)",
                      boxShadow: answered ? "var(--shadow-glow-sm)" : "none",
                    }}
                  >
                    {idx + 1}
                  </span>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: answered ? "var(--text)" : "var(--text-muted)" }}
                  >
                    {question}
                  </p>
                </div>

                {/* Rating buttons */}
                <div className="flex gap-2 ml-10">
                  {[1, 2, 3, 4, 5].map((val) => {
                    const isSelected = current === val;
                    const c = SCALE_COLORS[val];
                    return (
                      <button
                        key={val}
                        onClick={() => onChange(idx, val)}
                        title={SCALE_LABELS[val]}
                        aria-label={`${val} — ${SCALE_LABELS[val]}`}
                        aria-pressed={isSelected}
                        className="flex-1 h-11 rounded-lg text-sm font-bold transition-all duration-150"
                        style={
                          isSelected
                            ? {
                                background: c.fill,
                                border: `1.5px solid ${c.border}`,
                                color: c.text,
                                boxShadow: `0 0 14px ${c.glow}`,
                                transform: "scale(1.06)",
                              }
                            : {
                                background: "rgba(255,255,255,0.03)",
                                border: "1px solid rgba(255,255,255,0.09)",
                                color: "var(--text-dim)",
                              }
                        }
                        onMouseEnter={(e) => {
                          if (!isSelected) {
                            (e.currentTarget as HTMLButtonElement).style.background = c.fill.replace("0.2", "0.1").replace("0.25", "0.12");
                            (e.currentTarget as HTMLButtonElement).style.borderColor = `${c.border}66`;
                            (e.currentTarget as HTMLButtonElement).style.color = c.text;
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected) {
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.09)";
                            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-dim)";
                          }
                        }}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>

                {/* Answer label */}
                {answered && (
                  <p
                    className="ml-10 mt-1.5 text-xs italic"
                    style={{ color: SCALE_COLORS[current].text, opacity: 0.8 }}
                  >
                    {SCALE_LABELS[current]}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion progress */}
        <div className="mt-10 mb-6">
          <div
            className="flex justify-between mb-2 text-xs font-semibold"
            style={{ color: "var(--text-dim)" }}
          >
            <span>
              {answeredCount} de {questions.length} respondidas
            </span>
            <span style={{ color: pct === 100 ? "var(--accent)" : "var(--text-muted)" }}>
              {pct}%
            </span>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>

        {/* Divider */}
        <div
          className="mb-6"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
          }}
        />

        {/* Navigation */}
        <div className="flex gap-3">
          {canGoBack && (
            <button
              onClick={onBack}
              className="btn-ghost"
              style={{ gap: "0.4rem" }}
            >
              <ArrowLeft size={14} />
              Voltar
            </button>
          )}
          <button
            onClick={onNext}
            disabled={!allAnswered}
            className={clsx("btn-primary flex-1", !allAnswered && "opacity-50")}
            style={allAnswered ? {} : { background: "rgba(255,255,255,0.06)", boxShadow: "none" }}
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
