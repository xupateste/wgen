import { Star, Quote } from "lucide-react";

export function TestimonialSection() {
  return (
    <section className="py-16 bg-[#fcfcfd] relative overflow-hidden">
      {/* Patrón de cuadrícula más tenue */}
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] [background-size:30px_30px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Encabezado más pequeño y directo */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-sans text-slate-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Convierte tu inventario en una <span className="text-blue-600 italic"> ventaja competitiva.</span>
          </h2>
        </div>

        {/* CONTENEDOR REDUCIDO */}
        <div className="flex md:grid md:grid-cols-2 gap-5 lg:gap-8 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-hide pb-6 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
          
          {/* TARJETA 1 */}
          <div className="min-w-[85vw] md:min-w-0 snap-center group relative bg-white border border-slate-200/50 p-6 md:p-8 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-500">
            
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-blue-600 text-blue-600" />
                ))}
              </div>
              <Quote className="text-slate-200" size={20} strokeWidth={1.5} />
            </div>
            
            <p className="text-slate-600 text-[15px] md:text-[16px] leading-relaxed mb-1 font-sans italic">
              "Cambiamos a un ERP hace años, pero solo nos servía para facturar. <strong>Monitorear la rotación real cambió todo.</strong> Ahora mi equipo confía en lo que tenemos en stock."
            </p>
            
            <div className="flex items-center gap-4 pt-2 border-t border-slate-50">
              <div className="w-11 h-11 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xs shadow-md">
                MR
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-[14px]">Martín Rojas</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  Ferretería El Clavo <span className="w-1 h-1 rounded-full bg-slate-300" /> 🇵🇪 Perú
                </p>
              </div>
            </div>
          </div>

          {/* TARJETA 2 */}
          <div className="min-w-[85vw] md:min-w-0 snap-center group relative bg-white border border-slate-200/50 p-6 md:p-8 rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all duration-500">
            
            <div className="flex justify-between items-start mb-3">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-blue-600 text-blue-600" />
                ))}
              </div>
              <Quote className="text-slate-200" size={20} strokeWidth={1.5} />
            </div>
            
            <p className="text-slate-600 text-[15px] md:text-[16px] leading-relaxed mb-1 font-sans italic">
              "Ya no estamos en el negocio de la acumulación, sino de la rotación. Saber mis días de inventario me permite <strong>negociar mejores precios con proveedores.</strong>"
            </p>
            
            <div className="flex items-center gap-4 pt-2 border-t border-slate-50">
              <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-md">
                CS
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-[14px]">Carmen Silva</h4>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                  Ferretería Silva <span className="w-1 h-1 rounded-full bg-slate-300" /> 🇸🇻 El Salvador
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Dots de swipe móviles reducidos */}
        <div className="flex justify-center gap-1.5 mt-4 md:hidden">
          <div className="w-6 h-1 bg-blue-600 rounded-full" />
          <div className="w-1.5 h-1 bg-slate-200 rounded-full" />
        </div>
      </div>
    </section>
  );
}