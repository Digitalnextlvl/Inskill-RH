"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ScoreResult, LEVEL_COLORS, LEVEL_DESCRIPTIONS, getPillarFeedback } from "@/lib/scoring";
import { Qualification } from "@/lib/questions";
import { clsx } from "clsx";

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
      <div className="glass-card rounded-xl p-5 border border-white/10 opacity-40">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-slate-400">{label}</span>
          <span className="text-xs text-slate-500 bg-white/5 px-2 py-0.5 rounded-full">N/A</span>
        </div>
        <p className="text-xs text-slate-500 italic">Não aplicável para o seu cargo.</p>
      </div>
    );
  }

  const width = `${score}%`;

  return (
    <div className="glass-card rounded-xl p-5 border border-white/10">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-slate-200">{label}</span>
        <span className="text-xl font-bold" style={{ color }}>
          {score}%
        </span>
      </div>
      {/* Progress bar */}
      <div className="h-1.5 bg-white/10 rounded-full mb-3 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width, backgroundColor: color }}
        />
      </div>
      <p className="text-xs text-slate-400 leading-relaxed">{feedback}</p>
    </div>
  );
}

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ value: number; name: string }> }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 border border-white/20 rounded-lg px-3 py-2 text-sm">
        <p className="text-white font-semibold">{payload[0]?.value}%</p>
      </div>
    );
  }
  return null;
};

export default function Results({ result, qualification, onReset }: Props) {
  const { pillars, overall, level, isLeader } = result;
  const feedback = getPillarFeedback(pillars);
  const levelColor = LEVEL_COLORS[level];

  const radarData = [
    { subject: "Técnica", value: pillars.technical, fullMark: 100 },
    { subject: "Digital", value: pillars.digital, fullMark: 100 },
    { subject: "Comportamental", value: pillars.behavioral, fullMark: 100 },
    { subject: "Gestão", value: pillars.management ?? 0, fullMark: 100 },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 pb-12">
      {/* Header / Level Badge */}
      <div className="glass-card rounded-2xl p-8 text-center">
        <p className="text-slate-400 text-sm mb-2">
          {qualification.cargo} · {qualification.area}
        </p>
        <h2 className="text-3xl font-bold text-white mb-6">Seu Resultado</h2>

        {/* Overall score circle */}
        <div className="flex items-center justify-center mb-6">
          <div
            className="relative w-36 h-36 rounded-full flex items-center justify-center"
            style={{
              background: `conic-gradient(${levelColor} ${overall * 3.6}deg, rgba(255,255,255,0.05) 0deg)`,
            }}
          >
            <div className="w-28 h-28 rounded-full bg-slate-950 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold" style={{ color: levelColor }}>
                {overall}%
              </span>
              <span className="text-xs text-slate-500">geral</span>
            </div>
          </div>
        </div>

        {/* Level badge */}
        <div
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 mb-4"
          style={{
            borderColor: levelColor,
            backgroundColor: `${levelColor}18`,
          }}
        >
          <span className="text-lg font-bold" style={{ color: levelColor }}>
            {level}
          </span>
        </div>

        <p className="text-slate-400 text-sm max-w-md mx-auto">
          {LEVEL_DESCRIPTIONS[level]}
        </p>
      </div>

      {/* Radar Chart */}
      <div className="glass-card rounded-2xl p-8">
        <h3 className="text-lg font-bold text-white mb-6 text-center">
          Mapa de Maturidade
        </h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={radarData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
              <PolarGrid stroke="rgba(255,255,255,0.1)" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: "#94a3b8", fontSize: 13, fontWeight: 600 }}
              />
              <Radar
                name="Score"
                dataKey="value"
                stroke="#6366F1"
                fill="#6366F1"
                fillOpacity={0.25}
                strokeWidth={2}
                dot={{ fill: "#6366F1", strokeWidth: 2, r: 4 }}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Axis legend */}
        <div className="grid grid-cols-2 gap-2 mt-4 sm:grid-cols-4">
          {radarData.map((d) => (
            <div
              key={d.subject}
              className={clsx(
                "text-center p-2 rounded-lg",
                d.subject === "Gestão" && !isLeader
                  ? "opacity-30"
                  : "bg-white/5"
              )}
            >
              <p className="text-xs text-slate-400">{d.subject}</p>
              <p className="text-base font-bold text-indigo-400">
                {d.subject === "Gestão" && !isLeader ? "N/A" : `${d.value}%`}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Pillar Score Cards */}
      <div>
        <h3 className="text-lg font-bold text-white mb-4">
          Análise por Pilar
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <PillarCard
            label="Técnica"
            score={pillars.technical}
            feedback={feedback.technical}
            color="#06B6D4"
          />
          <PillarCard
            label="Digital (IA)"
            score={pillars.digital}
            feedback={feedback.digital}
            color="#8B5CF6"
          />
          <PillarCard
            label="Comportamental"
            score={pillars.behavioral}
            feedback={feedback.behavioral}
            color="#6366F1"
          />
          <PillarCard
            label="Gestão"
            score={pillars.management}
            feedback={feedback.management}
            color="#F59E0B"
          />
        </div>
      </div>

      {/* Reset button */}
      <div className="text-center">
        <button
          onClick={onReset}
          className="px-8 py-4 rounded-xl font-semibold text-base bg-white/5 border border-white/15 text-slate-300 hover:bg-white/10 hover:border-white/25 hover:text-white transition-all duration-200"
        >
          Refazer Avaliação
        </button>
      </div>
    </div>
  );
}
