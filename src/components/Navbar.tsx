// src/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useWaitlist } from "./WaitlistProvider"

// Definimos las props para aceptar openModal (es opcional para que el blog no falle)

export default function Navbar() {
  const pathname = usePathname();
  const isBlog = pathname?.startsWith("/blog");
  const { openModal } = useWaitlist()

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (isBlog) {
      setIsVisible(true);
      return;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isBlog]);

  const navClasses = isBlog
    ? "sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100" 
    : `fixed top-0 left-0 right-0 z-50 bg-[#f8faff]/90 backdrop-blur-md transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`;

  // Clases de botón compartidas: Redujimos la altura (h-9) y el texto (text-xs) para móviles
  const buttonBaseClasses = "rounded-lg font-medium transition-colors h-9 md:h-10 flex items-center justify-center text-xs md:text-sm px-3 md:px-5";
  const blueButtonClasses = `${buttonBaseClasses} bg-[#0f6fff] hover:bg-blue-700 text-white`;
  const outlineButtonClasses = `${buttonBaseClasses} border border-slate-200 text-slate-700 hover:bg-slate-50`;

  return (
    <header className={navClasses}>
      {/* Redujimos px-6 a px-4 para ganar espacio a los lados en móvil */}
      <nav className="w-full flex justify-between items-center px-4 md:px-8 py-3 md:py-4 max-w-7xl mx-auto">
        
        <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity" aria-label="Inicio">
          <div className="h-7 w-28 md:h-9 md:w-36 bg-[url('/logo.png')] bg-contain bg-no-repeat bg-left" />
          <span className="sr-only">Ferreteros.app</span>
        </Link>
        
        <div className="flex items-center gap-4 md:gap-6">
          <Link 
            href="/#servicios" 
            className="hidden md:block text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors"
          >
            Servicios
          </Link>
          
          {/* BOTÓN ACTUALIZADO PARA MODAL Y DISEÑO DE KLEO */}
          <button onClick={() => openModal()} className={blueButtonClasses}>Unirse a Waitlist</button>
        </div>
      </nav>
    </header>
  );
}