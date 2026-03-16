"use client";

import { AREAS, CARGOS, COMPANY_SIZES, Qualification } from "@/lib/questions";
import { clsx } from "clsx";
import { Sparkles } from "lucide-react";

interface Props {
  qualification: Qualification;
  onChange: (q: Qualification) => void;
  onNext: () => void;
}

interface SelectGroupProps {
  label: string;
  children: React.ReactNode;
}

function SelectGroup({ label, children }: SelectGroupProps) {
  return (
    <div className="mb-7">
      <label
        className="block mb-3 text-xs font-bold uppercase tracking-widest"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

export default function QualificationStep({ qualification, onChange, onNext }: Props) {
  const isComplete =
    qualification.area !== "" &&
    qualification.cargo !== "" &&
    qualification.companySize !== "";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className="glass-card rounded-2xl p-8"
        style={{ borderRadius: "var(--radius-xl)" }}
      >
        {/* Header */}
        <div className="mb-8">
          <span className="step-badge mb-4 inline-flex">
            Etapa 0 — Qualificação
          </span>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: "var(--text)" }}
          >
            Sobre você
          </h2>
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            Essas informações personalizam sua avaliação.
          </p>
        </div>

        {/* Divider */}
        <div
          className="mb-7"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, var(--border), transparent)",
          }}
        />

        {/* Area */}
        <SelectGroup label="Área principal de atuação">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {AREAS.map((area) => (
              <button
                key={area}
                onClick={() => onChange({ ...qualification, area })}
                className={clsx(
                  "option-chip text-left",
                  qualification.area === area && "selected"
                )}
              >
                {area}
              </button>
            ))}
          </div>
        </SelectGroup>

        {/* Cargo */}
        <SelectGroup label="Cargo atual">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {CARGOS.map((cargo) => (
              <button
                key={cargo}
                onClick={() => onChange({ ...qualification, cargo })}
                className={clsx(
                  "option-chip text-left",
                  qualification.cargo === cargo && "selected"
                )}
              >
                {cargo}
              </button>
            ))}
          </div>
        </SelectGroup>

        {/* Company size */}
        <SelectGroup label="Tamanho da empresa">
          <div className="flex flex-col gap-2 sm:flex-row">
            {COMPANY_SIZES.map((size) => (
              <button
                key={size}
                onClick={() => onChange({ ...qualification, companySize: size })}
                className={clsx(
                  "option-chip flex-1 text-center",
                  qualification.companySize === size && "selected"
                )}
              >
                {size}
              </button>
            ))}
          </div>
        </SelectGroup>

        {/* Divider */}
        <div
          className="mb-7"
          style={{
            height: "1px",
            background: "linear-gradient(90deg, transparent, var(--border), transparent)",
          }}
        />

        {/* CTA */}
        <button
          onClick={onNext}
          disabled={!isComplete}
          className="btn-primary"
        >
          {isComplete && (
            <Sparkles size={16} className="mr-2" style={{ color: "rgba(255,255,255,0.8)" }} />
          )}
          Iniciar Avaliação →
        </button>

        {!isComplete && (
          <p
            className="text-center mt-3 text-xs"
            style={{ color: "var(--text-dim)" }}
          >
            Preencha todos os campos para continuar
          </p>
        )}
      </div>
    </div>
  );
}
