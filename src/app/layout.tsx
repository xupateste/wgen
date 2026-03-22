import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { WaitlistProvider } from "@/components/WaitlistProvider";

// 2. Configuramos la fuente
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  // Opcional pero recomendado: mejora la carga visual
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Genio by Ferreteros.app",
  description: "Tu especialista ferretero impulsado por IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      {/* 3. Aplicamos la fuente al body para toda la aplicación */}
      <body className={`${jakarta.className} bg-white antialiased`}>
        <WaitlistProvider>
          {children}
        </WaitlistProvider>
      </body>
    </html>
  );
}
