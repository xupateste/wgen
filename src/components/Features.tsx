import { ShieldCheck, Zap, BarChart3, ArrowUpRight, Fingerprint } from "lucide-react";

export function FeatureSection() {
  return (
    <section className="py-16 md:py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Encabezado más contenido */}
        <div className="mb-12">
          <h2 className="text-2xl md:text-4xl font-sans text-slate-900 tracking-tight mb-4 leading-tight">
            La metodología para <br className="hidden md:block" />
            <span className="text-blue-600 italic">recuperar el mando</span> de tu stock.
          </h2>
          <p className="text-slate-500 font-medium max-w-lg text-sm md:text-base">
            Genio PRO activa el valor de la información que tu negocio genera cada día, sin añadir carga operativa.
          </p>
        </div>

        {/* BENTO GRID COMPACTO */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* 1. Patrimonio de Datos */}
          <div className="md:col-span-2 group relative bg-slate-50 rounded-3xl p-7 md:p-8 overflow-hidden border border-slate-100 hover:border-blue-200 transition-all duration-500">
            <div className="relative z-10 max-w-md">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-5">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Patrimonio de Datos</h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">
                Tus datos son tu activo más valioso. Genio PRO los organiza para que tus decisiones tengan cimientos sólidos y profesionales.
              </p>
            </div>
            <div className="absolute top-5 -right-5 w-48 h-48 bg-blue-100/30 blur-3xl rounded-full pointer-events-none" />
          </div>

          {/* 2. Copiloto Ferretero */}
          <div className="group bg-slate-900 rounded-3xl p-7 md:p-8 text-white border border-slate-800 hover:bg-black transition-all duration-500 shadow-lg shadow-slate-900/10">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-blue-400 mb-5 group-hover:rotate-12 transition-transform">
              <Zap size={20} />
            </div>
            <h3 className="text-xl font-bold mb-3">Copiloto Ferretero</h3>
            <p className="text-slate-400 leading-relaxed text-[13px] font-medium">
              Un aliado silencioso que vigila tu almacén. Te entrega <strong>certeza absoluta</strong> sobre qué reabastecer hoy mismo.
            </p>
          </div>

          {/* 3. Estrategia DOH */}
          <div className="group bg-blue-600 rounded-3xl p-7 md:p-8 text-white border border-blue-500 shadow-md shadow-blue-600/10 hover:-translate-y-1 transition-all duration-500">
             <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white mb-5">
              <BarChart3 size={20} />
            </div>
            <h3 className="text-xl font-bold mb-3">Estrategia DOH</h3>
            <p className="text-blue-100 leading-relaxed text-[13px] font-medium">
              Calculamos tus <strong>Días de Inventario</strong>. Sabrás cuánto tiempo tarda cada sol invertido en regresar con ganancia.
            </p>
            <div className="mt-5 flex items-center gap-2 text-white/80 font-bold text-[9px] uppercase tracking-widest bg-white/10 w-fit px-2.5 py-1 rounded-full">
              <ArrowUpRight size={10} /> Flujo de caja optimizado
            </div>
          </div>

          {/* 4. ADN de Consumo */}
          <div className="md:col-span-2 group bg-slate-50 rounded-3xl p-7 md:p-8 border border-slate-100 flex flex-col md:flex-row gap-6 items-center hover:bg-slate-100/50 transition-colors">
            <div className="flex-1">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-600 mb-5">
                <Fingerprint size={20} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">ADN de Consumo</h3>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">
                Entiende el ritmo único de <strong>tus clientes</strong>. Anticipa la demanda y fideliza a tus compradores con el surtido perfecto para tu zona.
              </p>
            </div>
            
            {/* Indicador visual ajustado */}
            <div className="w-full md:w-48 h-28 bg-white rounded-2xl border border-slate-200 p-5 shadow-inner flex flex-col justify-between shrink-0">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[75%] rounded-full group-hover:w-full transition-all duration-1000" />
                </div>
                <div className="h-1.5 w-[60%] bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 w-[40%] rounded-full group-hover:w-[85%] transition-all duration-1000 delay-100" />
                </div>
                <div className="h-1.5 w-[85%] bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-[20%] rounded-full group-hover:w-[65%] transition-all duration-1000 delay-200" />
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}