"use client";

import { AREAS, CARGOS, COMPANY_SIZES, Qualification } from "@/lib/questions";
import { clsx } from "clsx";

interface Props {
  qualification: Qualification;
  onChange: (q: Qualification) => void;
  onNext: () => void;
}

export default function QualificationStep({ qualification, onChange, onNext }: Props) {
  const isComplete =
    qualification.area !== "" &&
    qualification.cargo !== "" &&
    qualification.companySize !== "";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="glass-card rounded-2xl p-8">
        <div className="mb-8">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 mb-4">
            ETAPA 0 — QUALIFICAÇÃO
          </span>
          <h2 className="text-2xl font-bold text-white mb-2">Sobre você</h2>
          <p className="text-slate-400 text-sm">
            Essas informações personalizam sua avaliação.
          </p>
        </div>

        {/* Q0.1 — Area */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Área principal de atuação
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {AREAS.map((area) => (
              <button
                key={area}
                onClick={() => onChange({ ...qualification, area })}
                className={clsx(
                  "px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left border",
                  qualification.area === area
                    ? "bg-indigo-600/80 border-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-slate-200"
                )}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Q0.2 — Cargo */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Cargo atual
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CARGOS.map((cargo) => (
              <button
                key={cargo}
                onClick={() => onChange({ ...qualification, cargo })}
                className={clsx(
                  "px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 text-left border",
                  qualification.cargo === cargo
                    ? "bg-indigo-600/80 border-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-slate-200"
                )}
              >
                {cargo}
              </button>
            ))}
          </div>
        </div>

        {/* Q0.3 — Company size */}
        <div className="mb-8">
          <label className="block text-sm font-semibold text-slate-300 mb-3">
            Tamanho da empresa
          </label>
          <div className="flex flex-col gap-2 sm:flex-row">
            {COMPANY_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => onChange({ ...qualification, companySize: size })}
                className={clsx(
                  "flex-1 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border",
                  qualification.companySize === size
                    ? "bg-indigo-600/80 border-indigo-400 text-white shadow-lg shadow-indigo-500/20"
                    : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10 hover:border-white/20 hover:text-slate-200"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!isComplete}
          className={clsx(
            "w-full py-4 rounded-xl font-semibold text-base transition-all duration-200",
            isComplete
              ? "bg-gradient-to-r from-indigo-600 to-cyan-600 text-white hover:from-indigo-500 hover:to-cyan-500 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.01]"
              : "bg-white/5 text-slate-600 cursor-not-allowed border border-white/5"
          )}
        >
          Iniciar Avaliação →
        </button>
      </div>
    </div>
  );
}
