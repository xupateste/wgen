import { Star, Quote, CheckCircle2 } from "lucide-react";

export function TestimonialSection() {
  return (
    <section className="py-24 bg-[#fcfcfd] relative overflow-hidden">
      {/* Patrón de cuadrícula sutil */}
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <h2 className="text-4xl md:text-5xl font-sans text-slate-900 tracking-tight leading-[1.1] max-w-4xl mx-auto">
            Convierte las operaciones de inventario <br className="hidden md:block" />
            en tu <span className="text-blue-600 italic">ventaja competitiva.</span>
          </h2>
        </div>

        {/* CONTENEDOR DINÁMICO: 
          - Mobile: Flex horizontal, scroll x, con "snap" (imán)
          - Desktop: Grid de 2 columnas
        */}
        <div className="flex md:grid md:grid-cols-2 gap-6 lg:gap-12 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          
          {/* TARJETA 1 */}
          <div className="min-w-[85vw] md:min-w-0 snap-center group relative bg-white border border-slate-200/60 p-8 md:p-10 rounded-[40px] shadow-[0_2px_10px_rgba(0,0,0,0.02),0_15px_50px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 md:hover:-translate-y-2">
            <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="flex justify-between items-start mb-8 md:mb-10">
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-blue-600 text-blue-600" />
                ))}
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                <Quote className="text-slate-300" size={24} strokeWidth={1.5} />
              </div>
            </div>
            
            <p className="text-slate-700 text-[16px] md:text-[18px] leading-relaxed mb-10 font-sans italic">
              "Cambiamos a un ERP hace años, pero solo nos servía para facturar; seguíamos ciegos sobre qué comprar realmente. <strong>Monitorear la rotación real y los días de inventario cambió todo.</strong> Ahora mis trabajadores tienen la confianza de siempre contar con lo que el cliente necesita."
            </p>
            
            <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm ring-4 ring-slate-50 shadow-lg">
                MR
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-[16px]">Martín Rojas</h4>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  Ferretería El Constructor <span className="w-1 h-1 rounded-full bg-slate-300" /> 🇵🇪 Perú
                </p>
              </div>
            </div>
          </div>

          {/* TARJETA 2 */}
          <div className="min-w-[85vw] md:min-w-0 snap-center group relative bg-white border border-slate-200/60 p-8 md:p-10 rounded-[40px] shadow-[0_2px_10px_rgba(0,0,0,0.02),0_15px_50px_-15px_rgba(0,0,0,0.05)] transition-all duration-700 md:hover:-translate-y-2">
            <div className="absolute top-0 left-12 right-12 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex justify-between items-start mb-8 md:mb-10">
              <div className="flex gap-1.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-blue-600 text-blue-600" />
                ))}
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl">
                <Quote className="text-slate-300" size={24} strokeWidth={1.5} />
              </div>
            </div>
            
            <p className="text-slate-700 text-[16px] md:text-[18px] leading-relaxed mb-10 font-sans italic">
              "Entender la dinámica de consumo de mis clientes fue la clave. Antes comprábamos lo que el proveedor nos ofrecía; <strong>hoy ya no estamos en el negocio de la acumulación, sino de la rotación.</strong> Saber mis días de inventario exactos me permite negociar mejores precios y días de créditos."
            </p>
            
            <div className="flex items-center gap-5 pt-8 border-t border-slate-50">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold text-sm ring-4 ring-emerald-50 shadow-lg">
                CS
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-[16px]">Carmen Silva</h4>
                <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  Ferretería Silva <span className="w-1 h-1 rounded-full bg-slate-300" /> 🇸🇻 El Salvador
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Indicador visual de swipe (Solo visible en móvil) */}
        <div className="flex justify-center gap-2 mt-4 md:hidden">
          <div className="w-8 h-1 bg-blue-600 rounded-full" />
          <div className="w-2 h-1 bg-slate-200 rounded-full" />
        </div>
      </div>
    </section>
  );
}






