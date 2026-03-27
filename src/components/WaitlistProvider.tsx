"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { X, Loader2, Zap, Brain, Clock, Users, Trophy, ArrowRight, Check } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { submitWaitlist } from "@/app/actions";

interface WaitlistContextType {
  openModal: (promptContext?: string) => void;
  closeModal: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (!context) throw new Error("useWaitlist debe usarse dentro de WaitlistProvider");
  return context;
}

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1); 
  const [promptData, setPromptData] = useState("");
  const [phone, setPhone] = useState<string | undefined>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [submittedName, setSubmittedName] = useState("");
  const [submittedEmail, setSubmittedEmail] = useState("");

  // ESTADOS NUEVOS PARA EL QUEUE JUMPING
  const [queuePos, setQueuePos] = useState(427);
  const [countdown, setCountdown] = useState(9);
  const [willRedirect, setWillRedirect] = useState(true);

  // Genera un número de posición dinámico que crece con los días
  useEffect(() => {
    // 1. Verificamos si este navegador ya tiene un puesto asignado
    const savedPos = localStorage.getItem("genio_queue_pos");
    
    if (savedPos) {
      setQueuePos(parseInt(savedPos, 10));
    } else {
      // 2. Si es nuevo, generamos uno calculando: Días + Hora + Factor Aleatorio
      const basePos = 427;
      const now = new Date();
      
      const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
      const hourOfDay = now.getHours();
      const randomFactor = Math.floor(Math.random() * 18); // Agrega entre 0 y 17 puestos de diferencia
      
      // Crece mucho por día, un poco por hora, y es diferente por navegador
      const generatedPos = basePos + (dayOfYear * 5) + hourOfDay + randomFactor; 
      
      setQueuePos(generatedPos);
      localStorage.setItem("genio_queue_pos", generatedPos.toString());
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem("genio_waitlist_status") === "registered") {
      setAlreadyRegistered(true);
      
      // Recuperamos los datos para que el saludo y el link de Tally no se rompan
      const savedName = localStorage.getItem("genio_user_name");
      const savedEmail = localStorage.getItem("genio_user_email");
      const savedPhone = localStorage.getItem("genio_user_whatsapp");

      if (savedName) setSubmittedName(savedName);
      if (savedEmail) setSubmittedEmail(savedEmail);
      if (savedPhone) setPhone(savedPhone);
    }
  }, []);

  // Lógica del Countdown
  useEffect(() => {
    if (alreadyRegistered && willRedirect && countdown > 0) {
      const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (alreadyRegistered && willRedirect && countdown === 0) {
      redirectToTally();
    }
  }, [alreadyRegistered, willRedirect, countdown]);

  const redirectToTally = () => {
    // 1. Recuperamos el ID único que creaste en el paso anterior
    const userId = localStorage.getItem("ferreteros_user_id") || "";

    // 2. Construimos los parámetros. Usamos encodeURIComponent para evitar que 
    // espacios o símbolos (como el '+' del WhatsApp) rompan la URL.
    const params = new URLSearchParams({
      nombre: submittedName,
      email: submittedEmail,
      whatsapp: phone || "",
      waitlist_id: userId // El dato oculto clave para Make
    });
    
    // TODO: REEMPLAZA ESTA URL CON EL LINK DIRECTO DE TU TALLY FORM
    const tallyBaseUrl = "https://tally.so/r/XxqdJe"; 
    
    // 3. Redirigimos al usuario con todos los datos pre-cargados
    window.location.href = `${tallyBaseUrl}?${params.toString()}`;
  };

  const openModal = (promptContext = "") => {
    setPromptData(promptContext);
    setStep(1);
    setIsOpen(true);
    setCountdown(9);
    setWillRedirect(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setWillRedirect(false); // Detenemos el redirect si cierra el modal
    setTimeout(() => setStep(1), 300); 
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const getOrLinkUserId = () => {
      let existingId = localStorage.getItem("ferreteros_user_id");
      if (!existingId) {
        existingId = crypto.randomUUID(); 
        localStorage.setItem("ferreteros_user_id", existingId);
      }
      return existingId;
    };

    const formData = new FormData(e.currentTarget);
    const data = {
      waitlist_id: getOrLinkUserId(), 
      nombre: formData.get("nombre") as string,
      email: formData.get("email") as string,
      whatsapp: phone || "",
      prompt: promptData,
      honeypot: formData.get("empresa_secundaria") as string,
    };
    
    const success = await submitWaitlist(data);
    setIsSubmitting(false);
    
    if (success) {
      // 1. Guardamos en el estado de React (para uso inmediato)
      setSubmittedName(data.nombre); 
      setSubmittedEmail(data.email); 
      
      // 2. Guardamos en LocalStorage (para persistencia si recarga la página)
      localStorage.setItem("genio_waitlist_status", "registered");
      localStorage.setItem("genio_user_name", data.nombre);
      localStorage.setItem("genio_user_email", data.email);
      if (data.whatsapp) localStorage.setItem("genio_user_whatsapp", data.whatsapp);

      setAlreadyRegistered(true);
      // El setTimeout fue eliminado en el paso anterior, así que aquí termina.
    }
  };

  return (
    <WaitlistContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 cursor-pointer transition-opacity"
          onClick={closeModal} 
          role="button"
          tabIndex={0}
        >
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent transition-all pointer-events-none">
            
            <div 
              className="bg-white border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-[24px] w-full max-w-md p-8 relative animate-in fade-in zoom-in-[0.98] duration-300 overflow-hidden pointer-events-auto" 
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* === SHAPES LIGEROS ESTÁTICOS (Sin Lag) === */}
              {/* ELIMINADO: animate-blob y animation-delay. Dejamos el blur-3xl estático, que carga al instante */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[24px]">
                <div className="absolute -top-[15%] -left-[15%] w-[65%] h-[65%] bg-blue-300/25 rounded-full blur-3xl" />
                <div className="absolute top-[20%] -right-[15%] w-[75%] h-[75%] bg-indigo-300/25 rounded-full blur-3xl" />
                <div className="absolute -bottom-[15%] left-[10%] w-[65%] h-[65%] bg-sky-300/30 rounded-full blur-3xl" />
              </div>

              {/* CONTENIDO DEL MODAL */}
              <div className="relative z-10">
                <button 
                  onClick={closeModal} 
                  className="absolute top-0 right-0 z-[60] cursor-pointer text-slate-400 bg-slate-50 hover:bg-slate-200 hover:text-slate-700 p-2.5 rounded-full transition-all shadow-sm border border-slate-100 active:scale-95"
                >
                  <X size={18} strokeWidth={2.5} />
                </button>
                
                {alreadyRegistered ? (
                  // PASO 3: REDISEÑO DE QUEUE JUMPING (SALTO DE FILA)
                  <div className="text-center pt-4 pb-2 animate-in fade-in zoom-in duration-500 relative z-10">
                    
                    {/* Header de Éxito Sutil */}
                    <div className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold uppercase tracking-widest mb-4">
                      <Check size={14} strokeWidth={3} /> Registro Exitoso
                    </div>

                    <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2 tracking-tight">
                      ¡Lugar asegurado{submittedName ? `, ${submittedName.split(' ')[0]}` : ''}!
                    </h2>
                    
                    {/* Posición Dinámica */}
                    <div className="my-6">
                      <p className="text-slate-500 text-sm font-medium mb-1">Tu posición actual en la lista es:</p>
                      <div className="text-5xl font-black text-blue-600 tracking-tighter">
                        #{queuePos}
                      </div>
                    </div>

                    {/* Caja de Recompensa (Priority Box) */}
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 p-5 rounded-2xl text-left mb-6 relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <Trophy size={60} />
                      </div>
                      <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2 relative z-10">
                        <Zap size={16} className="text-blue-600" fill="currentColor" /> 
                        Acceso Prioritario (Top 10)
                      </h3>
                      <p className="text-[13px] text-slate-600 leading-relaxed font-medium relative z-10">
                        Estamos asignando analistas manualmente. Completa tu <strong className="text-slate-900">Diagnóstico de Inventario</strong> ahora y salta directamente a los primeros puestos para acceder esta semana.
                      </p>
                    </div>

                    {/* Botón Principal con Countdown */}
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={redirectToTally}
                        className="relative w-full overflow-hidden bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-xl shadow-[0_10px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_15px_25px_rgba(37,99,235,0.3)] hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2 group"
                      >
                        {/* Barra de progreso de fondo */}
                        {willRedirect && (
                          <div 
                            className="absolute left-0 top-0 bottom-0 bg-white/20 transition-all duration-1000 ease-linear" 
                            style={{ width: `${((9 - countdown) / 9) * 100}%` }}
                          />
                        )}
                        <span className="relative z-10 flex items-center gap-2">
                          SALTAR FILA Y EVALUAR <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </button>
                      
                      {/* Texto de redirección o cancelación */}
                      {willRedirect ? (
                        <div className="text-[11px] font-bold text-slate-400 mt-1 flex flex-col gap-3">
                          <span>Redirigiendo al diagnóstico en {countdown}s...</span>
                          <button 
                            onClick={() => setWillRedirect(false)} 
                            className="text-slate-400 hover:text-slate-600 underline decoration-slate-300 transition-colors cursor-pointer"
                          >
                            Prefiero no saltar la fila y esperar mi turno
                          </button>
                        </div>
                      ) : (
                        <div className="text-[12px] font-bold text-slate-400 mt-2">
                          <button 
                            onClick={closeModal} 
                            className="text-slate-400 hover:text-slate-600 underline decoration-slate-300 transition-colors cursor-pointer"
                          >
                            Cerrar y volver a la página
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ) : step === 1 ? (
                  // PASO 1 (Se mantiene igual)
                  <div className="py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4 tracking-tight leading-tight">
                      De ferreteros,<br/> para ferreteros.
                    </h2>
                    <p className="text-slate-600 text-[14px] mb-4 leading-relaxed font-medium">
                      Construimos <strong className="text-blue-600 font-extrabold">Genio</strong> <strong className="text-slate-900 font-extrabold">PRO</strong> para devolverte la confianza y que dirijas tu negocio como un experto.
                    </p>
                    
                    <div className="bg-slate-50/80 border border-slate-100 rounded-[24px] p-3 mb-5 space-y-4 shadow-sm">
                      <li className="flex items-start gap-2 text-[14px] text-slate-700 font-medium">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <Brain size={16} strokeWidth={2.5} />
                        </div>
                        <span>
                          <strong className="text-slate-900">Inteligencia de Datos:</strong> Auditoría y planificación automática de tu stock.
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px] text-slate-700 font-medium">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          <Users size={16} strokeWidth={2.5} />
                        </div>
                        <span>
                          <strong className="text-slate-900">Asesoría Experta:</strong> Ten consultas ilimitadas con un especialista en inventarios ferreteros.
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-[14px] text-slate-700 font-medium">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                          <Clock size={16} strokeWidth={2.5} />
                        </div>
                        <span>
                          <strong className="text-slate-900">Control Total:</strong> Recupera 20+ horas de trabajo a la semana y elimina compras innecesarias.
                        </span>
                      </li>
                    </div>

                    <button 
                      onClick={() => setStep(2)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-full shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex justify-center items-center gap-2"
                    >
                      Quiero obtener acceso <span>→</span>
                    </button>
                    
                    <div className="text-center text-xs text-slate-500 mt-4 font-medium flex items-center justify-center gap-2.5">
                      <span className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full ring-2 ring-white z-30 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">SM</div>
                        <div className="w-7 h-7 rounded-full ring-2 ring-white z-20 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">JP</div>
                        <div className="w-7 h-7 rounded-full ring-2 ring-white z-10 bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">CA</div>
                      </span>
                      <span>
                        Únete a los más de <strong className="font-bold text-slate-700">2k ferreteros.</strong>
                      </span>
                    </div>
                  </div>
                ) : (
                  // PASO 2 (Se mantiene igual)
                  <div className="py-2 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="text-center md:text-left mb-6">
                      <h2 className="text-2xl font-serif text-slate-900 mb-2">Reserva tu lugar.</h2>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        Estamos asignando <strong className="text-slate-900">analistas expertos</strong> por orden de registro. Asegura tu posición para el diagnóstico inicial.
                      </p>
                    </div>
                    
                    <form onSubmit={handleModalSubmit} className="flex flex-col gap-2 text-left">
                      <div aria-hidden="true" className="opacity-0 absolute -left-[9999px]">
                        <input type="text" name="empresa_secundaria" tabIndex={-1} autoComplete="off" />
                      </div>

                      <div className="group">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">Nombre Completo</label>
                        <input type="text" name="nombre" required placeholder="Ej. Juan Pérez" className="w-full px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" />
                      </div>

                      <div className="group">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">Correo Electrónico</label>
                        <input type="email" name="email" required placeholder="tu@correo.com" className="w-full px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" />
                      </div>

                      <div className="group">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 flex justify-between transition-colors">
                          WhatsApp
                          <span className="text-blue-500 font-bold normal-case italic tracking-normal">Para tu asesor</span>
                        </label>
                        <div className="w-full px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                          <PhoneInput international defaultCountry="PE" value={phone} onChange={setPhone} className="outline-none bg-transparent text-slate-800" placeholder="Ingresa tu número" required />
                        </div>
                      </div>

                      <button 
                        type="submit" 
                        disabled={isSubmitting} 
                        className="w-full mt-4 bg-slate-900 hover:bg-black disabled:opacity-70 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_25px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-all flex justify-center items-center h-14 tracking-wide"
                      >
                        {isSubmitting ? <Loader2 className="animate-spin" size={22} /> : "ASEGURAR MI ACCESO"}
                      </button>
                      
                      <button 
                        type="button" 
                        onClick={() => setStep(1)} 
                        className="text-xs text-slate-400 hover:text-slate-700 font-bold text-center mt-2 transition-colors"
                      >
                        ← Volver al mensaje
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </WaitlistContext.Provider>
  );
}


// // src/components/WaitlistProvider.tsx
// "use client";

// import { createContext, useContext, useState, useEffect, ReactNode } from "react";
// import { X, Loader2, CheckCircle2, Zap, Brain, Clock, Users, MessageCircle } from "lucide-react";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import { submitWaitlist } from "@/app/actions";

// interface WaitlistContextType {
//   openModal: (promptContext?: string) => void;
//   closeModal: () => void;
// }

// const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

// export function useWaitlist() {
//   const context = useContext(WaitlistContext);
//   if (!context) throw new Error("useWaitlist debe usarse dentro de WaitlistProvider");
//   return context;
// }

// export function WaitlistProvider({ children }: { children: ReactNode }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [step, setStep] = useState<1 | 2>(1); 
//   const [promptData, setPromptData] = useState("");
//   const [phone, setPhone] = useState<string | undefined>("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [alreadyRegistered, setAlreadyRegistered] = useState(false);
//   const [submittedName, setSubmittedName] = useState("");
//   const [submittedEmail, setSubmittedEmail] = useState("");

//   useEffect(() => {
//     if (localStorage.getItem("genio_waitlist_status") === "registered") {
//       setAlreadyRegistered(true);
//     }
//   }, []);

//   const openModal = (promptContext = "") => {
//     setPromptData(promptContext);
//     setStep(1);
//     setIsOpen(true);
//   };

//   const closeModal = () => {
//     setIsOpen(false);
//     setTimeout(() => setStep(1), 300); 
//   };

//   const getWhatsAppLink = () => {
//     const adminNumber = "51947037116"; // TODO: Reemplaza con tu número de WhatsApp real
//     const message = `¡Hola Ferreteros.app! 👋 Me acabo de unir a la lista de espera de Genio PRO.\n\n*Mis datos:*\n- Nombre: ${submittedName}\n- Correo: ${submittedEmail}\n- WhatsApp: ${phone}\n\nQuisiera más información sobre el lanzamiento.`;
//     return `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
//   };

//   const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     // Dentro de tu componente o función de envío
//     const getOrLinkUserId = () => {
//       let existingId = localStorage.getItem("ferreteros_user_id");
      
//       if (!existingId) {
//         existingId = crypto.randomUUID(); // Genera un ID único tipo: "123e4567-e89b-12d3-a456-426614174000"
//         localStorage.setItem("ferreteros_user_id", existingId);
//       }
      
//       return existingId;
//     };

//     const formData = new FormData(e.currentTarget);
//     const data = {
//       waitlist_id: getOrLinkUserId(), // Este es el ID que vincula las ediciones
//       nombre: formData.get("nombre") as string,
//       email: formData.get("email") as string,
//       whatsapp: phone || "",
//       prompt: promptData,
//       honeypot: formData.get("empresa_secundaria") as string,
//     };
    
//     const success = await submitWaitlist(data);
//     setIsSubmitting(false);
    
//     if (success) {
//       setSubmittedName(data.nombre); // Guardamos para el link de WA
//       setSubmittedEmail(data.email); // Guardamos para el link de WA
//       localStorage.setItem("genio_waitlist_status", "registered");
//       setAlreadyRegistered(true);
//       setTimeout(() => {
//         closeModal();
//         setPromptData("");
//       }, 4000);
//     }
//   };

//   return (
//     <WaitlistContext.Provider value={{ openModal, closeModal }}>
//       {children}

//       {isOpen && (
//         <div 
//           /* OPTIMIZACIÓN 1: Fondo oscuro sólido sin blur (bg-slate-900/60) */
//           className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 cursor-pointer transition-opacity"
//           onClick={closeModal} 
//           role="button"
//           tabIndex={0}
//         >
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent transition-all pointer-events-none">
            
//             <div 
//               /* OPTIMIZACIÓN 2: Fondo blanco sólido (bg-white) sin backdrop-blur */
//               className="bg-white border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-[24px] w-full max-w-md p-8 relative animate-in fade-in zoom-in-[0.98] duration-300 overflow-hidden pointer-events-auto" 
//               onClick={(e) => e.stopPropagation()}
//             >
              
//               {/* === SHAPES LIGEROS (Solo CSS blur estándar, muy eficiente) === */}
//               <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[24px]">
//                 {/* Shape Superior Izquierdo */}
//                 <div className="absolute -top-[15%] -left-[15%] w-[65%] h-[65%] bg-blue-300/25 rounded-full blur-3xl animate-blob" />
                
//                 {/* Shape Central Derecho */}
//                 <div className="absolute top-[20%] -right-[15%] w-[75%] h-[75%] bg-indigo-300/25 rounded-full blur-3xl animate-blob animation-delay-200" />
                
//                 {/* Shape Inferior Izquierdo */}
//                 <div className="absolute -bottom-[15%] left-[10%] w-[65%] h-[65%] bg-sky-300/30 rounded-full blur-3xl animate-blob animation-delay-400" />
//               </div>

//               {/* CONTENIDO DEL MODAL */}
//               <div className="relative z-10">
//                 <button 
//                   onClick={closeModal} 
//                   className="absolute top-0 right-0 z-[60] cursor-pointer text-slate-400 bg-slate-50 hover:bg-slate-200 hover:text-slate-700 p-2.5 rounded-full transition-all shadow-sm border border-slate-100 active:scale-95"
//                   aria-label="Cerrar modal"
//                 >
//                   <X size={18} strokeWidth={2.5} />
//                 </button>
                
//                 {alreadyRegistered ? (
//                   <div className="text-center py-6 animate-in fade-in zoom-in duration-500 relative z-10">
//                     {/* Icono de Éxito */}
//                     <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100 relative">
//                       <CheckCircle2 size={40} strokeWidth={2} />
//                       <div className="absolute inset-0 rounded-full bg-emerald-400/20 animate-ping" />
//                     </div>

//                     <h2 className="text-3xl font-serif text-slate-900 mb-3 tracking-tight">
//                       ¡Lugar Asegurado!
//                     </h2>
                    
//                     <p className="text-slate-500 mb-4 text-sm leading-relaxed max-w-[260px] mx-auto font-medium">
//                       Tus datos están a salvo. Nuestro equipo está revisando tu perfil para darte acceso prioritario.
//                     </p>

//                     {/* Caja de Próximo Paso */}
//                     <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-sm text-slate-600 text-left mb-4 shadow-inner">
//                       <span className="flex items-center gap-2 font-bold text-slate-900 mb-2">
//                         <Zap size={16} className="text-blue-600" /> Próximo paso
//                       </span>
//                       <p className="text-[13px] leading-relaxed">
//                         Te contactaremos vía WhatsApp muy pronto para habilitar tu acceso a <strong>Genio PRO</strong>.
//                       </p>
//                     </div>

//                     <div className="flex flex-col gap-2">
//                       <a 
//                         href={getWhatsAppLink()}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="w-full bg-[#25D366] hover:bg-[#20ba56] text-white font-black py-3 rounded-xl transition-all shadow-md active:scale-[0.98] flex items-center justify-center gap-2 uppercase tracking-widest text-[11px]"
//                       >
//                         <MessageCircle size={18} fill="currentColor" />
//                         Continuar por WhatsApp
//                       </a>
//                       <button 
//                         onClick={closeModal} 
//                         className="w-full cursor-pointer bg-slate-900 hover:bg-black text-white font-bold py-2 rounded-xl transition-all shadow-md active:scale-[0.98]"
//                       >
//                         Volver a la página
//                       </button>
                      
//                       {/* OPCIÓN: MODIFICAR REGISTRO */}
//                       <button 
//                         onClick={() => {
//                           setAlreadyRegistered(false); // Quitamos el estado de registrado
//                           setStep(2); // Lo mandamos directo al formulario
//                         }}
//                         className="cursor-pointer text-xs text-slate-400 hover:text-blue-600 font-bold transition-colors py-2"
//                       >
//                         ¿Te equivocaste en algún dato? <br/>
//                         <span className="underline decoration-slate-200 hover:decoration-blue-400">Modificar registro</span>
//                       </button>
//                     </div>
//                   </div>
//                 ) : step === 1 ? (
//                   <div className="py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
//                     <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4 tracking-tight leading-tight">
//                       De ferreteros,<br/> para ferreteros.
//                     </h2>
//                     <p className="text-slate-600 text-[14px] mb-4 leading-relaxed font-medium">
//                       Construimos <strong className="text-blue-600 font-extrabold">Genio</strong> <strong className="text-slate-900 font-extrabold">PRO</strong> para devolverte la confianza y que dirijas tu negocio como un experto.
//                     </p>
                    
//                     <div className="bg-slate-50/80 border border-slate-100 rounded-[24px] p-3 mb-5 space-y-4 shadow-sm">
//                       {/* BENEFICIO 1: EL SOFTWARE (LA IA) */}
//                       <li className="flex items-start gap-2 text-[14px] text-slate-700 font-medium">
//                         <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
//                           <Brain size={16} strokeWidth={2.5} />
//                         </div>
//                         <span>
//                           <strong className="text-slate-900">Inteligencia de Datos:</strong> Auditoría y planificación automática de tu stock.
//                         </span>
//                       </li>

//                       {/* BENEFICIO 2: EL ASESOR (EL HUMANO) - TU NUEVO FEATURE */}
//                       <li className="flex items-start gap-2 text-[14px] text-slate-700 font-medium">
//                         <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
//                           <Users size={16} strokeWidth={2.5} />
//                         </div>
//                         <span>
//                           <strong className="text-slate-900">Asesoría Experta:</strong> Ten consultas ilimitadas con un especialista en inventarios ferreteros.
//                         </span>
//                       </li>

//                       {/* BENEFICIO 3: EL RESULTADO (EL TIEMPO) */}
//                       <li className="flex items-start gap-2 text-[14px] text-slate-700 font-medium">
//                         <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
//                           <Clock size={16} strokeWidth={2.5} />
//                         </div>
//                         <span>
//                           <strong className="text-slate-900">Control Total:</strong> Recupera 20+ horas de trabajo a la semana y elimina compras innecesarias.
//                         </span>
//                       </li>
//                     </div>

//                     <button 
//                       onClick={() => setStep(2)}
//                       className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-full shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex justify-center items-center gap-2"
//                     >
//                       Quiero obtener acceso <span>→</span>
//                     </button>
                    
//                     <div className="text-center text-xs text-slate-500 mt-4 font-medium flex items-center justify-center gap-2.5">
//                       <span className="flex -space-x-2">
//                         <div className="w-7 h-7 rounded-full ring-2 ring-white z-30 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">SM</div>
//                         <div className="w-7 h-7 rounded-full ring-2 ring-white z-20 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">JP</div>
//                         <div className="w-7 h-7 rounded-full ring-2 ring-white z-10 bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">CA</div>
//                       </span>
//                       <span>
//                         Únete a los más de <strong className="font-bold text-slate-700">2k ferreteros.</strong>
//                       </span>
//                     </div>
//                   </div>
//                 ) : (
//                   <div className="py-2 animate-in fade-in slide-in-from-right-8 duration-500">
//                     <div className="text-center md:text-left mb-6">
//                       <h2 className="text-2xl font-serif text-slate-900 mb-2">Reserva tu lugar.</h2>
//                       <p className="text-sm text-slate-500 leading-relaxed font-medium">
//                         Estamos asignando <strong className="text-slate-900">analistas expertos</strong> por orden de registro. Asegura tu posición para el diagnóstico inicial.
//                       </p>
//                     </div>
                    
//                     <form onSubmit={handleModalSubmit} className="flex flex-col gap-2 text-left">
//                       <div aria-hidden="true" className="opacity-0 absolute -left-[9999px]">
//                         <input type="text" name="empresa_secundaria" tabIndex={-1} autoComplete="off" />
//                       </div>

//                       <div className="group">
//                         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">Nombre Completo</label>
//                         {/* OPTIMIZACIÓN 3: Inputs sólidos (bg-slate-50) */}
//                         <input type="text" name="nombre" required placeholder="Ej. Juan Pérez" className="w-full px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" />
//                       </div>

//                       <div className="group">
//                         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">Correo Electrónico</label>
//                         <input type="email" name="email" required placeholder="tu@correo.com" className="w-full px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" />
//                       </div>

//                       <div className="group">
//                         <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 flex justify-between transition-colors">
//                           WhatsApp
//                           <span className="text-blue-500 font-bold normal-case italic tracking-normal">Para tu asesor</span>
//                         </label>
//                         <div className="w-full px-4 py-1.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
//                           <PhoneInput international defaultCountry="PE" value={phone} onChange={setPhone} className="outline-none bg-transparent text-slate-800" placeholder="Ingresa tu número" required />
//                         </div>
//                       </div>

//                       <button 
//                         type="submit" 
//                         disabled={isSubmitting} 
//                         className="w-full mt-4 bg-slate-900 hover:bg-black disabled:opacity-70 text-white font-bold py-4 rounded-xl shadow-[0_10px_20px_rgba(0,0,0,0.15)] hover:shadow-[0_15px_25px_rgba(0,0,0,0.25)] hover:-translate-y-0.5 transition-all flex justify-center items-center h-14 tracking-wide"
//                       >
//                         {isSubmitting ? <Loader2 className="animate-spin" size={22} /> : "ASEGURAR MI ACCESO"}
//                       </button>
                      
//                       <button 
//                         type="button" 
//                         onClick={() => setStep(1)} 
//                         className="text-xs text-slate-400 hover:text-slate-700 font-bold text-center mt-2 transition-colors"
//                       >
//                         ← Volver al mensaje
//                       </button>
//                     </form>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </WaitlistContext.Provider>
//   );
// }