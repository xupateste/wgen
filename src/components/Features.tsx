"use client";

import { EyeOff, Wallet, Lock, TrendingUp, UserCheck, Coffee } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// 1. EXTRAEMOS LOS DATOS: Esto hace tu código limpio y profesional.
const PAIN_CARDS = [
  {
    id: "ceguera",
    icon: <EyeOff size={28} className="text-blue-600" />,
    title: "Ceguera Operativa con tu ERP",
    shortDesc: "Tu sistema actual registra ventas, pero no te da claridad sobre el futuro.",
    longDesc: "Tu sistema registra ventas pero no te da claridad. Sigues sin saber qué comprar realmente, por eso activamos una <strong>auditoría técnica de rotación</strong>.",
    iconDash: <EyeOff size={16} />
  },
  {
    id: "rentabilidad",
    icon: <Wallet size={28} className="text-indigo-600" />,
    title: "Fuga de Rentabilidad",
    shortDesc: "Tienes capital durmiendo en estantes mientras las facturas no esperan.",
    longDesc: "Recuperar el flujo de caja requiere un <strong>control de DOH (Días de Inventario)</strong> exacto, para que sepas cuándo vuelve cada inversión a tu bolsillo.",
    iconDash: <Wallet size={16} />
  },
  {
    id: "intuicion",
    icon: <TrendingUp size={28} className="text-emerald-600" />,
    title: "Decisiones por intuición",
    shortDesc: "Compras por 'corazonada' o por la presión del proveedor, no por rotación.",
    longDesc: "La certeza llega con un <strong>análisis ABC de demanda real</strong>, asegurando que tu surtido responda al ritmo de compra de tus clientes.",
    iconDash: <TrendingUp size={16} />
  },
  {
    id: "cuello-botella",
    icon: <Lock size={28} className="text-cyan-600" />,
    title: "El Efecto Cuello de Botella",
    shortDesc: "Si tú no estás en el mostrador validando cada pedido, todo se detiene.",
    longDesc: "Salir del cuello de botella requiere un <strong>respaldo de criterio externo</strong>, permitiéndote delegar el análisis mientras te enfocas en expandir.",
    iconDash: <Lock size={16} />
  },
  {
    id: "costoso",
    icon: <UserCheck size={28} className="text-sky-600" />,
    title: "Costoso contratar especialistas",
    shortDesc: "Necesitas un experto para crecer, pero contratar uno está fuera de presupuesto.",
    longDesc: "Por eso asignamos un <strong>analista dedicado a tu gestión</strong>, dándote acceso a interpretación técnica de alto nivel a una fracción del costo.",
    iconDash: <UserCheck size={16} />
  },
  {
    id: "esclavo",
    icon: <Coffee size={28} className="text-orange-600" />,
    title: "Esclavo de las tareas manuales",
    shortDesc: "Pasas más tiempo cuadrando Excels que diseñando estrategias de venta.",
    longDesc: "Eliminar la fatiga requiere un <strong>monitoreo de rentabilidad constante</strong>, para que dejes de ser un capturador de datos y vuelvas a ser director.",
    iconDash: <Coffee size={16} />
  }
];

export function FeatureSection() {
  // 2. TRUCO DE SCROLL INFINITO: Duplicamos la lista 3 veces para móviles.
  // El usuario pasará de la carta 6 a la 1 de manera natural.
  const infiniteMobileCards = [...PAIN_CARDS];

  return (
    <section className="py-12 md:py-14 bg-[#f8faff] relative overflow-hidden border-y border-slate-200/60">
      
      {/* RECURSO UI: Patrón de cuadrícula y Blobs */}
      <div className="absolute inset-0 [background-image:linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100/30 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Cabecera */}
        <div className="mb-5 md:mb-7 text-center md:text-left lg:text-center">
          <h2 className="text-2xl md:text-3xl font-sans text-slate-900 tracking-tight leading-tight mb-3">
            Hacer crecer tu ferretería<br className="hidden md:block" />
            no debería ser <span className="text-blue-600 italic"> un camino solitario</span>
          </h2>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto md:mx-0 lg:mx-auto text-sm md:text-lg">
            Te ayudamos a identificar las fricciones que frenan tu negocio.
          </p>
        </div>

        {/* --- VISTA DESKTOP: Grid Estático (Oculto en móvil) --- */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PAIN_CARDS.map((card, index) => (
            <FlipCard key={`desktop-${card.id}`} isFirst={index === 0} {...card} />
          ))}
        </div>

        {/* --- VISTA MÓVIL: Carrusel "Infinito" (Oculto en PC) --- */}
        <div className="flex md:hidden gap-2 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {infiniteMobileCards.map((card, index) => (
            <FlipCard 
              key={`mobile-${card.id}-${index}`} 
              isFirst={index === 0} 
              {...card} 
            />
          ))}
        </div>

        {/* Indicador visual de swipe (Solo visible en móvil) */}
        <div className="flex justify-center gap-2 mt-2 md:hidden">
          <div className="w-8 h-1.5 bg-blue-600 rounded-full" />
          <div className="w-2 h-1.5 bg-slate-200 rounded-full" />
          <div className="w-2 h-1.5 bg-slate-200 rounded-full" />
        </div>

      </div>
    </section>
  );
}

// COMPONENTE FLIPCARD
function FlipCard({ isFirst, icon, title, shortDesc, longDesc, iconDash }: any) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasHinted, setHasHinted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFirst) return;
    
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasHinted) {
        setHasHinted(true);
        setTimeout(() => setIsFlipped(true), 600);
        setTimeout(() => setIsFlipped(false), 3100);
      }
    }, { threshold: 0.6 });
    
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isFirst, hasHinted]);

  return (
    <div 
      ref={cardRef}
      className="group relative h-[180px] md:h-[190px] min-w-[85vw] md:min-w-0 snap-center [perspective:1000px] cursor-pointer shrink-0 md:shrink"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
      >
        
        {/* CARA FRONTAL */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-[24px] p-5 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] [backface-visibility:hidden]">
          <div className="shrink-0 w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-[#f8faff] flex items-center justify-center border border-blue-100 shadow-inner">
             {icon}
          </div>
          <div>
            <h3 className="text-[15px] md:text-[16px] font-bold text-slate-900 mb-1.5 leading-tight">
              {title}
            </h3>
            <p className="text-[12px] md:text-[13px] text-slate-500 leading-relaxed font-medium">
              {shortDesc}
            </p>
          </div>
        </div>

        {/* CARA TRASERA */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-500 rounded-[24px] p-5 md:p-6 flex flex-col justify-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-lg shadow-blue-500/20">
            <h3 className="text-[12px] md:text-[13px] font-black uppercase tracking-wider text-blue-200 mb-2">{title}</h3>
            <p className="text-[12.5px] md:text-[13.5px] leading-relaxed font-medium text-white/95">
               <span dangerouslySetInnerHTML={{ __html: longDesc }} />
            </p>
            <div className="absolute bottom-4 right-5 text-blue-300 opacity-40">
               {iconDash}
            </div>
        </div>

      </div>
    </div>
  );
}


// import { EyeOff, Wallet, Lock, TrendingUp, UserCheck, Coffee, Sparkles } from "lucide-react";
// import { useEffect, useRef, useState } from "react";

// export function FeatureSection() {
//   return (
//     <section className="py-20 bg-[#f8faff] relative overflow-hidden border-y border-slate-200/60">
      
//       {/* RECURSO UI: Patrón de cuadrícula y Blobs de luz */}
//       <div className="absolute inset-0 [background-image:linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [background-size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
//       <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100/40 blur-[120px] rounded-full pointer-events-none" />
//       <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-100/30 blur-[120px] rounded-full pointer-events-none" />

//       <div className="max-w-7xl mx-auto px-6 relative z-10">
        
//         {/* Cabecera idéntica a la referencia de la imagen */}
//         <div className="mb-6 text-center">
//           <h2 className="text-3xl md:text-4xl font-sans text-slate-900 tracking-tight leading-tight mb-4">
//             Hacer crecer tu ferretería<br className="hidden md:block" />
//             no debería ser <span className="text-blue-600 italic"> un camino solitario</span>
//           </h2>
//           <p className="text-slate-500 font-medium max-w-2xl mx-auto text-base md:text-lg">
//             Te ayudamos a identificar las fricciones que frenan tu negocio
//           </p>
//         </div>

//         {/* GRID DE CARTAS FLIPEABLES */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
//           <FlipCard 
//             isFirst={true}
//             icon={<EyeOff size={28} className="text-blue-600" />}
//             title="Ceguera Operativa con tu ERP"
//             shortDesc="Tu sistema actual registra ventas, pero no te da claridad sobre el futuro."
//             longDesc="Tu sistema registra ventas pero no te da claridad. Sigues sin saber qué comprar realmente, por eso activamos una <strong>auditoría técnica de rotación</strong> para detectar qué categorías financian tu negocio y cuáles solo ocupan espacio."
//             iconDash={<EyeOff size={16} />}
//           />

//           <FlipCard 
//             isFirst={false}
//             icon={<Wallet size={28} className="text-indigo-600" />}
//             title="Fuga de Rentabilidad"
//             shortDesc="Tienes capital durmiendo en estantes mientras las facturas de proveedores no esperan."
//             longDesc="Recuperar el flujo de caja requiere un <strong>control de DOH (Días de Inventario)</strong> exacto y calculado internamente, para que sepas cuándo vuelve cada inversión a tu bolsillo con ganancia real."
//             iconDash={<Wallet size={16} />}
//           />

//           <FlipCard 
//             isFirst={false}
//             icon={<TrendingUp size={28} className="text-emerald-600" />}
//             title="Decisiones basadas en la intuición"
//             shortDesc="Compras por 'corazonada' o por la presión del proveedor, no por la rotación real."
//             longDesc="La certeza llega con un <strong>análisis ABC de demanda real</strong>, asegurando que tu surtido responda al ritmo de compra de tus clientes y no a una simple corazonada."
//             iconDash={<TrendingUp size={16} />}
//           />

//           <FlipCard 
//             isFirst={false}
//             icon={<Lock size={28} className="text-cyan-600" />}
//             title="El Efecto Cuello de Botella"
//             shortDesc="Si tú no estás en el mostrador validando cada pedido, el negocio se detiene."
//             longDesc="Salir del cuello de botella requiere un <strong>respaldo de criterio externo</strong>, permitiéndote delegar el análisis de datos mientras tú te enfocas en expandir el alcance de tu ferretería."
//             iconDash={<Lock size={16} />}
//           />

//           <FlipCard 
//             isFirst={false}
//             icon={<UserCheck size={28} className="text-sky-600" />}
//             title="Costoso contratar especialistas"
//             shortDesc="Sabes que necesitas un analista experto para crecer, pero contratar uno está fuera de presupuesto."
//             longDesc="Por eso asignamos un <strong>analista dedicado a tu gestión</strong>, dándote acceso a interpretación técnica de alto nivel a una fracción del costo de una planilla profesional."
//             iconDash={<UserCheck size={16} />}
//           />

//           <FlipCard 
//             isFirst={false}
//             icon={<Coffee size={28} className="text-orange-600" />}
//             title="Esclavo de las tareas manuales"
//             shortDesc="Pasas más tiempo cuadrando Excels y revisando facturas que diseñando estrategias de venta."
//             longDesc="Eliminar la fatiga requiere un <strong>monitoreo de rentabilidad constante</strong>, para que dejes de ser un capturador de datos y vuelvas a ser el director de tu propio éxito."
//             iconDash={<Coffee size={16} />}
//           />

//         </div>
//       </div>
//     </section>
//   );
// }

// // COMPONENTE FLIPCARD (Gestión de la animación 3D)
// function FlipCard({ isFirst, icon, title, shortDesc, longDesc, iconDash }: any) {
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [hasHinted, setHasHinted] = useState(false);
//   const cardRef = useRef<HTMLDivElement>(null);

//   // Efecto de "guiño" al hacer scroll para la primera tarjeta
//   useEffect(() => {
//     if (!isFirst) return;
    
//     const observer = new IntersectionObserver(([entry]) => {
//       if (entry.isIntersecting && !hasHinted) {
//         setHasHinted(true);
//         // Voltea la carta a los 500ms de aparecer
//         setTimeout(() => setIsFlipped(true), 600);
//         // La regresa a su estado original después de 2.5 segundos
//         setTimeout(() => setIsFlipped(false), 3100);
//       }
//     }, { threshold: 0.6 });
    
//     if (cardRef.current) observer.observe(cardRef.current);
//     return () => observer.disconnect();
//   }, [isFirst, hasHinted]);

//   return (
//     <div 
//       ref={cardRef}
//       className="group relative h-[180px] md:h-[190px] [perspective:1000px] cursor-pointer"
//       onMouseEnter={() => setIsFlipped(true)}
//       onMouseLeave={() => setIsFlipped(false)}
//     >
//       <div 
//         className={`w-full h-full relative transition-transform duration-700 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
//       >
        
//         {/* CARA FRONTAL (Light Mode, idéntica a tu referencia visual) */}
//         <div className="absolute inset-0 bg-white/80 backdrop-blur-sm border border-slate-200/60 rounded-[24px] p-5 flex items-center gap-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] [backface-visibility:hidden]">
//           <div className="shrink-0 w-16 h-16 rounded-2xl bg-[#f8faff] flex items-center justify-center border border-blue-100 shadow-inner">
//              {icon}
//           </div>
//           <div>
//             <h3 className="text-[16px] font-bold text-slate-900 mb-1.5 leading-tight">
//               {title}
//             </h3>
//             <p className="text-[13px] text-slate-500 leading-relaxed font-medium">
//               {shortDesc}
//             </p>
//           </div>
//         </div>

//         {/* CARA TRASERA (Diagnóstico Profundo, voltea en Y) */}
//         <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-700 border border-blue-500 rounded-[24px] p-6 flex flex-col justify-center text-white [transform:rotateY(180deg)] [backface-visibility:hidden] shadow-lg shadow-blue-500/20">
//             <h3 className="text-[13px] font-black uppercase tracking-wider text-blue-200 mb-2">{title}</h3>
//             <p className="text-[13.5px] leading-relaxed font-medium text-white/95">
//                <span dangerouslySetInnerHTML={{ __html: longDesc }} />
//             </p>
//             {/* Decoración sutil en la esquina */}
//             <div className="absolute bottom-4 right-5 text-blue-300 opacity-40">
//                {iconDash}
//             </div>
//         </div>

//       </div>
//     </div>
//   );
// }