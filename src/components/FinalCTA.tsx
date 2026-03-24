// src/components/FinalCTA.tsx
"use client";

import { useWaitlist } from "./WaitlistProvider";
import { ArrowRight, Sparkles } from "lucide-react";

export function FinalCTA() {
  const { openModal } = useWaitlist();

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto relative">
        
        {/* Contenedor Principal con Gradiente Moderno */}
        <div className="relative bg-slate-900 rounded-[40px] p-8 md:p-16 overflow-hidden border border-white/10 shadow-2xl shadow-blue-900/20">
          
          {/* Luces de fondo (Efecto Genio) */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/20 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8">
              <Sparkles size={12} /> Acceso Limitado 2026
            </div>

            <h2 className="text-3xl md:text-5xl font-sans text-white tracking-tight mb-6 leading-tight">
              Deja de ser el cuello de botella. <br />
              <span className="text-blue-400 italic">Empieza a dirigir.</span>
            </h2>

            <p className="text-slate-400 text-lg mb-10 font-medium">
              Únete a los <strong className="text-white font-bold">2,300+ dueños</strong> que ya están transformando su inventario en una ventaja competitiva real.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => openModal("CTA Final de la landing")}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-black py-5 px-10 rounded-full shadow-lg shadow-blue-600/30 transition-all hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
              >
                Quiero obtener acceso prioritario
                <ArrowRight size={16} />
              </button>
            </div>

            <p className="mt-8 text-slate-500 text-xs font-medium">
              Sin compromisos. Solo claridad absoluta para tu negocio.
            </p>
          </div>
        </div>

        {/* Decoración externa sutil */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full max-w-3xl h-12 bg-blue-600/10 blur-3xl -z-10" />
      </div>
    </section>
  );
}