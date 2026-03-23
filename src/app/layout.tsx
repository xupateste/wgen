import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { WaitlistProvider } from "@/components/WaitlistProvider";

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
    default: "Genio - Dirige tu Ferretería como un experto | Ferreteros.app",
    template: "%s | Genio",
  },
  description: "Planifica, audita y optimiza tu negocio en un solo lugar. Reabastece a tiempo, siempre. Recupera 20+ horas a la semana automatizando tu gestión.",
  keywords: ["ferretería", "software ferretero", "inventario inteligente", "gestión de stock", "SaaS", "automatización de compras"],
  authors: [{ name: "Ferreteros.app Team" }],
  openGraph: {
    title: "Genio | Dirigir tu ferretería nunca fue tan sencillo",
    description: "Reabastece a tiempo, siempre.",
    url: "https://genio.ferreteros.app", // Reemplaza con tu dominio real
    siteName: "Genio by Ferreteros.app",
    images: [
      {
        url: "/logo.png", // Debes subir esta imagen a /public
        width: 1200,
        height: 630,
        alt: "Genio - Inteligencia para tu ferretería",
      },
    ],
    locale: "es_PE",
    type: "website",
  },

  // Twitter (X) Card
  twitter: {
    card: "summary_large_image",
    title: "Genio | #1 Saas para Ferreterías",
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
      </body>
    </html>
  );
}
