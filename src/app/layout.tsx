import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Inskill HR Executive — Avaliação de Maturidade em RH",
  description:
    "Descubra seu nível de maturidade profissional em RH com a avaliação Inskill HR Executive. Análise multi-pilar com resultados personalizados.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} antialiased min-h-screen`}
        style={{ backgroundColor: "#0F0F1A" }}
      >
        {/* Background mesh */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(at 20% 20%, rgba(99, 102, 241, 0.12) 0px, transparent 50%), radial-gradient(at 80% 80%, rgba(6, 182, 212, 0.08) 0px, transparent 50%), radial-gradient(at 60% 10%, rgba(139, 92, 246, 0.07) 0px, transparent 40%)",
          }}
          aria-hidden="true"
        />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
