import { EyeOff, Wallet, Lock, TrendingUp, UserCheck, Coffee, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function FeatureSection() {
  return (
    <section className="py-20 bg-[#f8faff] relative overflow-hidden border-y border-slate-200/60">
      
      {/* RECURSO UI: Patrón de cuadrícula y Blobs de luz */}
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera idéntica a la referencia de la imagen */}
        <div className="mb-6 text-center">
          <h2 className="text-3xl md:text-4xl font-sans text-slate-900 tracking-tight leading-tight mb-4">
            Hacer crecer tu ferretería<br className="hidden md:block" />
            no debería ser <span className="text-blue-600 italic"> un camino solitario</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base md:text-lg">
            Te ayudamos a identificar las fricciones que frenan tu negocio
          </p>
        </div>

        {/* GRID DE CARTAS FLIPEABLES */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <FlipCard 
            isFirst={true}
            icon={<EyeOff size={28} className="text-blue-600" />}
            title="Ceguera Operativa con tu ERP"
            shortDesc="Tu sistema actual registra ventas, pero no te da claridad sobre el futuro."
            longDesc="Tu sistema registra ventas pero no te da claridad. Sigues sin saber qué comprar realmente, por eso activamos una <strong>auditoría técnica de rotación</strong> para detectar qué categorías financian tu negocio y cuáles solo ocupan espacio."
          />

          <FlipCard 
            isFirst={false}
            icon={<Wallet size={28} className="text-indigo-600" />}
            title="Fuga de Rentabilidad"
            shortDesc="Tienes capital durmiendo en estantes mientras las facturas de proveedores no esperan."
            longDesc="Recuperar el flujo de caja requiere un <strong>control de DOH (Días de Inventario)</strong> exacto y calculado internamente, para que sepas cuándo vuelve cada inversión a tu bolsillo con ganancia real."
          />

          <FlipCard 
            isFirst={false}
            icon={<TrendingUp size={28} className="text-emerald-600" />}
            title="Decisiones basadas en la intuición"
            shortDesc="Compras por 'corazonada' o por la presión del proveedor, no por la rotación real."
            longDesc="La certeza llega con un <strong>análisis ABC de demanda real</strong>, asegurando que tu surtido responda al ritmo de compra de tus clientes y no a una simple corazonada."
          />

          <FlipCard 
            isFirst={false}
            icon={<Lock size={28} className="text-cyan-600" />}
            title="El Efecto Cuello de Botella"
            shortDesc="Si tú no estás en el mostrador validando cada pedido, el negocio se detiene."
            longDesc="Salir del cuello de botella requiere un <strong>respaldo de criterio externo</strong>, permitiéndote delegar el análisis de datos mientras tú te enfocas en expandir el alcance de tu ferretería."
          />

          <FlipCard 
            isFirst={false}
            icon={<UserCheck size={28} className="text-sky-600" />}
            title="Costoso contratar especialistas"
            shortDesc="Sabes que necesitas un analista experto para crecer, pero contratar uno está fuera de presupuesto."
            longDesc="Por eso asignamos un <strong>analista dedicado a tu gestión</strong>, dándote acceso a interpretación técnica de alto nivel a una fracción del costo de una planilla profesional."
          />

          <FlipCard 
            isFirst={false}
            icon={<Coffee size={28} className="text-orange-600" />}
            title="Esclavo de las tareas manuales"
            shortDesc="Pasas más tiempo cuadrando Excels y revisando facturas que diseñando estrategias de venta."
            longDesc="Eliminar la fatiga requiere un <strong>monitoreo de rentabilidad constante</strong>, para que dejes de ser un capturador de datos y vuelvas a ser el director de tu propio éxito."
          />

        </div>
      </div>
    </section>
  );
}

// COMPONENTE FLIPCARD (Gestión de la animación 3D)
function FlipCard({ isFirst, icon, title, shortDesc, longDesc }: any) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasHinted, setHasHinted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Efecto de "guiño" al hacer scroll para la primera tarjeta
  useEffect(() => {
    if (!isFirst) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasHinted) {
        setHasHinted(true);
        // Voltea la carta a los 500ms de aparecer
        setTimeout(() => setIsFlipped(true), 600);
        // La regresa a su estado original después de 2.5 segundos
        setTimeout(() => setIsFlipped(false), 3100);
      }
    }, { threshold: 0.6 });
    
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isFirst, hasHinted]);

  return (
    <div 
      ref={cardRef}
      className="group relative h-[180px] md:h-[190px] [perspective:1000px] cursor-pointer"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div 
        className={`w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        
        {/* CARA FRONTAL (Light Mode, idéntica a tu referencia visual) */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-[24px] p-5 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] [backface-visibility:hidden]">
          <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#f8faff] flex items-center justify-center border border-blue-100 shadow-inner">
             {icon}
          </div>
          <div>
            <h3 className="text-[16px] font-bold text-slate-900 mb-1.5 leading-tight">
              {title}
            </h3>
            <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
              {shortDesc}
            </p>
          </div>
        </div>

        {/* CARA TRASERA (Diagnóstico Profundo, voltea en Y) */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-500 rounded-[24px] p-6 flex flex-col justify-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-lg shadow-blue-500/20">
            <h3 className="text-[13px] font-black uppercase tracking-wider text-blue-200 mb-2">{title}</h3>
            <p className="text-[13.5px] leading-relaxed font-medium text-white/95">
               <span dangerouslySetInnerHTML={{ __html: longDesc }} />
            </p>
            {/* Decoración sutil en la esquina */}
            <div className="absolute bottom-4 right-5 text-blue-300 opacity-40">
               <Sparkles size={16} />
            </div>
        </div>

      </div>
    </div>
  );
}


// import { XCircle, CheckCircle2, TrendingUp, ShieldAlert, Clock } from "lucide-react";

// export function FeatureSection() {
//   return (
//     <section className="py-16 bg-white">
//       <div className="max-w-5xl mx-auto px-6">
        
//         <div className="text-center mb-12">
//           <h2 className="text-2xl md:text-3xl font-sans text-slate-900 tracking-tight mb-4">
//             Deja de adivinar, <span className="text-blue-600 italic">empieza a decidir.</span>
//           </h2>
//           <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
//             Validamos tu inventario con datos reales para que recuperes el control de tu flujo de caja. Sin software complicado, solo resultados.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
//           {/* COLUMNA: EL DOLOR (Lo que queremos validar) */}
//           <div className="space-y-6">
//             <h3 className="text-[10px] font-black text-red-500 uppercase tracking-[0.2em] mb-4">La realidad actual</h3>
//             <ul className="space-y-4">
//               <PainPoint text="Compras basadas en 'intuición' o lo que el proveedor ofrece." />
//               <PainPoint text="Capital estancado en productos que no rotan hace meses." />
//               <PainPoint text="Falta de stock en los productos que realmente dejan margen." />
//               <PainPoint text="Horas perdidas en archivos de Excel que no dicen la verdad." />
//             </ul>
//           </div>

//           {/* COLUMNA: LA SOLUCIÓN (Lo que Genio PRO hará por ellos) */}
//           <div className="bg-slate-50 rounded-[32px] p-8 border border-slate-100 shadow-sm">
//             <h3 className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-6">Con Genio PRO + Asesor</h3>
//             <ul className="space-y-5">
//               <SolutionPoint 
//                 icon={<TrendingUp size={18} />} 
//                 title="Certeza de Compra" 
//                 desc="Sabrás exactamente qué pedir y cuándo hacerlo." 
//               />
//               <SolutionPoint 
//                 icon={<Clock size={18} />} 
//                 title="Liberación de Capital" 
//                 desc="Identificamos el stock muerto para convertirlo en efectivo." 
//               />
//               <SolutionPoint 
//                 icon={<ShieldAlert size={18} />} 
//                 title="Auditoría Permanente" 
//                 desc="Tu asesor experto vigila las discrepancias por ti." 
//               />
//             </ul>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }

// function PainPoint({ text }: { text: string }) {
//   return (
//     <li className="flex items-start gap-3 text-slate-500 text-sm font-medium">
//       <XCircle size={18} className="text-red-300 shrink-0 mt-0.5" />
//       <span>{text}</span>
//     </li>
//   );
// }

// function SolutionPoint({ icon, title, desc }: { icon: any, title: string, desc: string }) {
//   return (
//     <li className="flex items-start gap-4">
//       <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0">
//         {icon}
//       </div>
//       <div>
//         <h4 className="text-sm font-bold text-slate-900">{title}</h4>
//         <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
//       </div>
//     </li>
//   );
// }