"use client";

import { useWaitlist } from "./WaitlistProvider";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  const { openModal } = useWaitlist();

  return (
    <section className="py-16 md:py-20 px-6">
      <div className="max-w-5xl mx-auto relative">
        
        {/* Contenedor Principal Compacto */}
        <div className="relative bg-slate-900 rounded-3xl p-8 md:p-12 lg:p-14 overflow-hidden border border-white/10 shadow-xl shadow-blue-900/20">
          
          {/* Luces de fondo (Efectos sutiles) */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-600/15 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[200px] h-[200px] bg-indigo-500/10 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 text-center max-w-xl mx-auto">
            {/* Badge más discreto */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[9px] font-bold uppercase tracking-[0.15em] mb-6">
              <Sparkles size={10} /> Acceso Limitado 2026
            </div>

            <h2 className="text-2xl md:text-4xl font-sans text-white tracking-tight mb-4 leading-[1.2]">
              Deja de ser el cuello de botella. <br />
              <span className="text-blue-400 italic font-serif">Empieza a dirigir.</span>
            </h2>

            <p className="text-slate-400 text-sm md:text-base mb-6 font-medium leading-relaxed">
              Únete a los <strong className="text-white font-bold">2,300+ dueños</strong> que ya transforman su inventario en una ventaja.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => openModal("CTA Final de la landing")}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-8 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-[10px] md:text-xs"
              >
                Obtener acceso prioritario
                <ArrowRight size={14} />
              </button>
            </div>

            <p className="mt-6 text-slate-500 text-[10px] font-bold uppercase tracking-widest opacity-60">
              Pausa o cancela el servicio cuando quieras
              <br/>Asesorías ilimitadas
            </p>
          </div>
        </div>

        {/* Brillo externo reducido */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-full max-w-2xl h-8 bg-blue-600/10 blur-2xl -z-10" />
      </div>
    </section>
  );
}