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
      <body className={`${geistSans.variable} antialiased min-h-screen`}>
        {/* Full-bleed vivid purple base — mimics Neolude reference */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, #2A0B52 0%, #5B14A0 30%, #3D0C80 55%, #1A0838 100%)",
          }}
          aria-hidden="true"
        />

        {/* Bright purple radial bloom — top-left hero glow */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 10% 5%, rgba(140,30,210,0.55) 0%, transparent 65%)," +
              "radial-gradient(ellipse 50% 40% at 90% 85%, rgba(80,10,160,0.4) 0%, transparent 55%)," +
              "radial-gradient(ellipse 35% 30% at 50% 0%, rgba(192,132,252,0.2) 0%, transparent 50%)",
          }}
          aria-hidden="true"
        />

        {/* Subtle grid overlay */}
        <div
          className="fixed inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(200,160,255,1) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(200,160,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
          aria-hidden="true"
        />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
