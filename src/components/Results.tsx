"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  ScoreResult,
  LEVEL_COLORS,
  LEVEL_DESCRIPTIONS,
  getPillarFeedback,
} from "@/lib/scoring";
import { Qualification } from "@/lib/questions";
import { RotateCcw, TrendingUp } from "lucide-react";

interface Props {
  result: ScoreResult;
  qualification: Qualification;
  onReset: () => void;
}

interface PillarCardProps {
  label: string;
  score: number | null;
  feedback: string;
  color: string;
}

function PillarCard({ label, score, feedback, color }: PillarCardProps) {
  if (score === null) {
    return (
      <div
        className="glass-card p-5"
        style={{
          borderRadius: "var(--radius-lg)",
          opacity: 0.38,
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold" style={{ color: "var(--text-muted)" }}>
            {label}
          </span>
          <span
            className="text-xs px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.05)",
              color: "var(--text-dim)",
            }}
          >
            N/A
          </span>
        </div>
        <p className="text-xs italic" style={{ color: "var(--text-dim)" }}>
          Não aplicável para o seu cargo.
        </p>
      </div>
    );
  }

  return (
    <div
      className="glass-card p-5 transition-transform duration-200 hover:scale-[1.01]"
      style={{
        borderRadius: "var(--radius-lg)",
        borderColor: `${color}30`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
          {label}
        </span>
        <span className="text-xl font-extrabold" style={{ color }}>
          {score}%
        </span>
      </div>

      {/* Gradient progress bar */}
      <div
        className="mb-3 overflow-hidden"
        style={{
          height: "5px",
          borderRadius: "9999px",
          background: "rgba(255,255,255,0.07)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${score}%`,
            borderRadius: "9999px",
            background: `linear-gradient(90deg, ${color}CC, ${color})`,
            boxShadow: `0 0 8px ${color}55`,
            transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>

      <p className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
        {feedback}
      </p>
    </div>
  );
}

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
}) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="px-3 py-2 text-sm rounded-lg"
        style={{
          background: "rgba(17,13,43,0.95)",
          border: "1px solid var(--border)",
          backdropFilter: "blur(8px)",
        }}
      >
        <p className="font-bold" style={{ color: "var(--primary-light)" }}>
          {payload[0]?.value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function Results({ result, qualification, onReset }: Props) {
  const { pillars, overall, level, isLeader } = result;
  const feedback   = getPillarFeedback(pillars);
  const levelColor = LEVEL_COLORS[level];

  const radarData = [
    { subject: "Técnica",        value: pillars.technical,          fullMark: 100 },
    { subject: "Digital",        value: pillars.digital,            fullMark: 100 },
    { subject: "Comportamental", value: pillars.behavioral,         fullMark: 100 },
    { subject: "Gestão",         value: pillars.management ?? 0,    fullMark: 100 },
  ];

  const conicDeg = Math.round((overall / 100) * 360);

  return (
    <div
      className="w-full max-w-4xl mx-auto pb-14"
      style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
    >

      {/* ── Score hero card ── */}
      <div
        className="glass-card p-8 text-center"
        style={{ borderRadius: "var(--radius-xl)" }}
      >
        <p
          className="text-xs uppercase font-bold tracking-widest mb-1"
          style={{ color: "var(--text-dim)" }}
        >
          {qualification.cargo} · {qualification.area}
        </p>
        <h2
          className="text-2xl font-extrabold mb-8"
          style={{ color: "var(--text)" }}
        >
          Seu Resultado
        </h2>

        {/* Score ring */}
        <div className="flex justify-center mb-7">
          <div
            className="relative flex items-center justify-center"
            style={{
              width: "9rem",
              height: "9rem",
              borderRadius: "50%",
              background: `conic-gradient(${levelColor} ${conicDeg}deg, rgba(255,255,255,0.06) 0deg)`,
              boxShadow: `0 0 32px ${levelColor}44`,
            }}
          >
            {/* Inner circle */}
            <div
              className="flex flex-col items-center justify-center"
              style={{
                width: "7rem",
                height: "7rem",
                borderRadius: "50%",
                background: "var(--surface-1)",
              }}
            >
              <span className="text-3xl font-extrabold" style={{ color: levelColor, lineHeight: 1 }}>
                {overall}%
              </span>
              <span className="text-xs mt-1" style={{ color: "var(--text-dim)" }}>
                geral
              </span>
            </div>
          </div>
        </div>

        {/* Level badge */}
        <div
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full mb-4"
          style={{
            border: `2px solid ${levelColor}`,
            background: `${levelColor}18`,
            boxShadow: `0 0 18px ${levelColor}22`,
          }}
        >
          <TrendingUp size={14} style={{ color: levelColor }} />
          <span className="font-bold text-base" style={{ color: levelColor }}>
            {level}
          </span>
        </div>

        <p
          className="text-sm max-w-md mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          {LEVEL_DESCRIPTIONS[level]}
        </p>
      </div>

      {/* ── Radar chart ── */}
      <div
        className="glass-card p-8"
        style={{ borderRadius: "var(--radius-xl)" }}
      >
        <h3
          className="text-base font-bold text-center mb-6 uppercase tracking-wider"
          style={{ color: "var(--text-muted)" }}
        >
          Mapa de Maturidade
        </h3>

        <div style={{ height: "17rem" }}>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 10, right: 40, bottom: 10, left: 40 }}>
              <PolarGrid stroke="rgba(124,58,237,0.18)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#9E99C0", fontSize: 12, fontWeight: 600 }}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke="var(--primary)"
                fill="var(--primary)"
                fillOpacity={0.22}
                strokeWidth={2}
                dot={{ fill: "var(--accent)", strokeWidth: 0, r: 4 }}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Radar axis summaries */}
        <div className="grid grid-cols-2 gap-2 mt-5 sm:grid-cols-4">
          {radarData.map((d) => {
            const isNA = d.subject === "Gestão" && !isLeader;
            return (
              <div
                key={d.subject}
                className="text-center p-2.5 rounded-lg"
                style={{
                  background: isNA ? "rgba(255,255,255,0.02)" : "rgba(124,58,237,0.08)",
                  border: "1px solid rgba(124,58,237,0.12)",
                  opacity: isNA ? 0.35 : 1,
                }}
              >
                <p className="text-xs mb-0.5" style={{ color: "var(--text-dim)" }}>
                  {d.subject}
                </p>
                <p
                  className="text-base font-bold"
                  style={{ color: isNA ? "var(--text-dim)" : "var(--primary-light)" }}
                >
                  {isNA ? "N/A" : `${d.value}%`}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Pillar cards ── */}
      <div>
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-4"
          style={{ color: "var(--text-dim)" }}
        >
          Análise por Pilar
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PillarCard label="Técnica"         score={pillars.technical}  feedback={feedback.technical}  color="#22D3EE" />
          <PillarCard label="Digital (IA)"    score={pillars.digital}    feedback={feedback.digital}    color="#C084FC" />
          <PillarCard label="Comportamental"  score={pillars.behavioral} feedback={feedback.behavioral} color="#7C3AED" />
          <PillarCard label="Gestão"          score={pillars.management} feedback={feedback.management} color="#F59E0B" />
        </div>
      </div>

      {/* ── Reset CTA ── */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="btn-ghost inline-flex gap-2"
        >
          <RotateCcw size={14} />
          Refazer Avaliação
        </button>
      </div>
    </div>
  );
}
