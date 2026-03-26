import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { WaitlistProvider } from "@/components/WaitlistProvider";
import { GoogleAnalytics } from '@next/third-parties/google';

export const viewport: Viewport = {
  themeColor: "#0f6fff", // El color azul de Genio en la barra de Safari/Chrome
};

// 2. Configuramos la fuente
const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  // Opcional pero recomendado: mejora la carga visual
  display: 'swap', 
});

export const metadata: Metadata = {
  title: {
    default: "Ferreteros.app | Dirige tu ferretería como un experto",
    template: "%s | ferreteros.app",
  },
  description: "Plataforma integral para ferreterías independientes. Audita tu inventario, evita el stock muerto y aumenta tu rentabilidad con cálculos técnicos y diagnósticos precisos.",
  keywords: [
    "software ferretería", 
    "gestión de inventario", 
    "control de stock", 
    "rentabilidad ferretera", 
    "Genio PRO", 
    "análisis ABC ferretería",
    "sistema para ferreterías"
  ],
  authors: [{ name: "ferreteros.app Team" }],
  openGraph: {
    title: "ferreteros.app | Dirige tu ferretería como un experto",
    description: "Audita tu inventario y aumenta tu rentabilidad con cálculos precisos. Deja de decidir por intuición.",
    url: "https://web.ferreteros.app", // Asegúrate de usar la URL final
    siteName: "ferreteros.app",
    images: [
      {
        url: "/logo.png", // Sugerencia: Crea una imagen de 1200x630px para compartir en redes
        width: 1200,
        height: 630,
        alt: "Ferreteros.app - Ecosistema para ferreterías",
      },
    ],
    locale: "es_PE",
    type: "website",
  },

  // Twitter (X) Card
  twitter: {
    card: "summary_large_image",
    title: "Ferreteros.app | #1 Saas para Ferreterías",
    description: "Reabastece a tiempo, siempre. Recupera tu rentabilidad.",
    images: ["/logo.png"],
  },

  // Iconos
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-32x32.png",
    apple: "/apple-touch-icon.png",
  },

  // Para que no indexe páginas de prueba si no quieres
  robots: {
    index: true,
    follow: true,
  },
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
        <GoogleAnalytics gaId="G-6TBQVG5P7V" />
      </body>
    </html>
  );
}
