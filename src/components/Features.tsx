import { ShieldCheck, Zap, BarChart3, ArrowUpRight, History, Fingerprint } from "lucide-react";

export function FeatureSection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-sans text-slate-900 tracking-tight mb-6">
            La metodología para <br />
            <span className="text-blue-600 italic">recuperar el mando</span> de tu stock.
          </h2>
          <p className="text-slate-500 font-medium max-w-xl">
            Genio no es una tarea más; es la inteligencia que activa el valor de la información que tu negocio genera cada día.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. ANTES: Laboratorio de Datos -> AHORA: Patrimonio de Datos (Aspiracional) */}
          <div className="md:col-span-2 group relative bg-slate-50 rounded-[32px] p-10 overflow-hidden border border-slate-100 hover:border-blue-200 transition-all duration-500">
            <div className="relative z-10 max-w-md">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-600 mb-6">
                <ShieldCheck size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Patrimonio de Datos</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Tus datos es tu activo más valioso. Genio lo transforma en una <strong>fuente inagotable de claridad</strong>, organizando años de experiencia para que tus decisiones futuras tengan cimientos sólidos y profesionales.
              </p>
            </div>
            <div className="absolute top-10 -right-10 w-64 h-64 bg-blue-100/40 blur-3xl rounded-full pointer-events-none" />
          </div>

          {/* 2. COPILOTO FERRETERO (El Cerebro) */}
          <div className="group bg-slate-900 rounded-[32px] p-10 text-white border border-slate-800 hover:bg-black transition-all duration-500 shadow-xl shadow-slate-900/20">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:rotate-12 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Copiloto Ferretero</h3>
            <p className="text-slate-400 leading-relaxed text-sm font-medium">
              Un aliado silencioso que vigila tu almacén las 24 horas. Te entrega <strong>certeza absoluta</strong> sobre qué reabastecer, permitiéndote dirigir con la agilidad de una gran cadena.
            </p>
          </div>

          {/* 3. ESTRATEGIA DOH (La ventaja económica) */}
          <div className="group bg-blue-600 rounded-[32px] p-10 text-white border border-blue-500 shadow-lg shadow-blue-600/20 hover:-translate-y-1 transition-all duration-500">
             <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-6">
              <BarChart3 size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Estrategia DOH</h3>
            <p className="text-blue-100 leading-relaxed text-sm font-medium">
              Calculamos tus <strong>Días de Inventario</strong> exactos. Sabrás con precisión cuánto tiempo tardará cada sol invertido en regresar a tu bolsillo con una ganancia real.
            </p>
            <div className="mt-6 flex items-center gap-2 text-white/80 font-bold text-[10px] uppercase tracking-widest bg-white/10 w-fit px-3 py-1 rounded-full">
              <ArrowUpRight size={12} /> Flujo de caja optimizado
            </div>
          </div>

          {/* 4. ANTES: Análisis de Dinámica -> AHORA: ADN de Consumo (Foco Interno y Privado) */}
          <div className="md:col-span-2 group bg-slate-50 rounded-[32px] p-10 border border-slate-100 flex flex-col md:flex-row gap-8 items-center hover:bg-slate-100/50 transition-colors">
            <div className="flex-1">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-600 mb-6">
                <Fingerprint size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">ADN de Consumo</h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                Entiende el ritmo único de <strong>tus clientes</strong>. Genio descifra los patrones de compra exclusivos de <strong>tu negocio</strong>, permitiéndote anticipar la demanda y fidelizar a tus compradores con el stock y surtido perfecto.
              </p>
            </div>
            {/* Indicador visual de fidelidad sutil */}
            <div className="w-full md:w-56 h-36 bg-white rounded-3xl border border-slate-200 p-6 shadow-inner flex flex-col justify-between">
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[75%] rounded-full group-hover:w-full transition-all duration-1000" />
                </div>
                <div className="h-2 w-[60%] bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-slate-300 w-[40%] rounded-full group-hover:w-[85%] transition-all duration-1000 delay-100" />
                </div>
                <div className="h-2 w-[85%] bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-400 w-[20%] rounded-full group-hover:w-[65%] transition-all duration-1000 delay-200" />
                </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}