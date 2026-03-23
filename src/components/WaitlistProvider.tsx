// src/components/WaitlistProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { X, Loader2, CheckCircle2, Zap } from "lucide-react";
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

  useEffect(() => {
    if (localStorage.getItem("genio_waitlist_status") === "registered") {
      setAlreadyRegistered(true);
    }
  }, []);

  const openModal = (promptContext = "") => {
    setPromptData(promptContext);
    setStep(1);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => setStep(1), 300); 
  };

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      nombre: formData.get("nombre") as string,
      email: formData.get("email") as string,
      whatsapp: phone || "",
      prompt: promptData,
      honeypot: formData.get("empresa_secundaria") as string,
    };
    
    const success = await submitWaitlist(data);
    setIsSubmitting(false);
    
    if (success) {
      localStorage.setItem("genio_waitlist_status", "registered");
      setAlreadyRegistered(true);
      setTimeout(() => {
        closeModal();
        setPromptData("");
      }, 4000);
    }
  };

  return (
    <WaitlistContext.Provider value={{ openModal, closeModal }}>
      {children}

      {isOpen && (
        <div 
          /* OPTIMIZACIÓN 1: Fondo oscuro sólido sin blur (bg-slate-900/60) */
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 cursor-pointer transition-opacity"
          onClick={closeModal} 
          role="button"
          tabIndex={0}
        >
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-transparent transition-all pointer-events-none">
            
            <div 
              /* OPTIMIZACIÓN 2: Fondo blanco sólido (bg-white) sin backdrop-blur */
              className="bg-white border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-[24px] w-full max-w-md p-8 relative animate-in fade-in zoom-in-[0.98] duration-300 overflow-hidden pointer-events-auto" 
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* === SHAPES LIGEROS (Solo CSS blur estándar, muy eficiente) === */}
              <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[24px]">
                {/* Shape Superior Izquierdo */}
                <div className="absolute -top-[15%] -left-[15%] w-[65%] h-[65%] bg-blue-300/25 rounded-full blur-3xl animate-blob" />
                
                {/* Shape Central Derecho */}
                <div className="absolute top-[20%] -right-[15%] w-[75%] h-[75%] bg-indigo-300/25 rounded-full blur-3xl animate-blob animation-delay-200" />
                
                {/* Shape Inferior Izquierdo */}
                <div className="absolute -bottom-[15%] left-[10%] w-[65%] h-[65%] bg-sky-300/30 rounded-full blur-3xl animate-blob animation-delay-400" />
              </div>

              {/* CONTENIDO DEL MODAL */}
              <div className="relative z-10">
                <button onClick={closeModal} className="absolute -top-2 -right-2 text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-700 p-2 rounded-full transition-all shadow-sm border border-slate-100">
                  <X size={18} strokeWidth={2.5} />
                </button>
                
                {alreadyRegistered ? (
                  <div className="text-center py-6 animate-in fade-in duration-500">
                    <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100">
                      <CheckCircle2 size={40} strokeWidth={2} />
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">¡Lugar Asegurado!</h2>
                    <p className="text-slate-500 mb-6 text-sm leading-relaxed">Tus datos están a salvo.<br/>Nuestro equipo está revisando tu perfil.</p>
                    <div className="bg-slate-50 p-5 rounded-2xl text-sm text-slate-600 text-left border border-slate-100 mb-6">
                      <span className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                        <Zap size={16} className="text-blue-500" /> Próximo paso
                      </span>
                      Te contactaremos vía WhatsApp muy pronto para habilitar tu acceso.
                    </div>
                    <div className="flex flex-col gap-3">
                      <button onClick={closeModal} className="w-full cursor-pointer bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors shadow-sm">
                        Volver a la página
                      </button>
                      <button onClick={() => setAlreadyRegistered(false)} className="cursor-pointer text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors py-2">
                        ¿Te equivocaste en algún dato? <br/> Modificar registro
                      </button>
                    </div>
                  </div>
                ) : step === 1 ? (
                  <div className="py-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6 tracking-tight leading-tight">
                      De ferreteros,<br/> para ferreteros.
                    </h2>
                    <p className="text-slate-600 text-[16px] mb-8 leading-relaxed font-medium">
                      Deja de ser el cuello de botella de tu propia ferretería. Construimos <strong className="text-blue-600 font-extrabold">Genio</strong> para devolverte la confianza y que dirijas tu negocio como un experto.
                    </p>
                    
                    <ul className="space-y-3 mb-10 text-left max-w-[280px] mx-auto">
                      <li className="flex items-start gap-3 text-[14px] text-slate-700 font-semibold">
                        <span className="text-blue-600 mt-0.5">⚡️</span>
                        <span>Automatiza tus tareas manuales</span>
                      </li>
                      <li className="flex items-start gap-3 text-[14px] text-slate-700 font-semibold">
                        <span className="text-blue-600 mt-0.5">🧠</span>
                        <span>Decide con seguridad y sin estrés</span>
                      </li>
                      <li className="flex items-start gap-3 text-[14px] text-slate-700 font-semibold">
                        <span className="text-blue-600 mt-0.5">⏳</span>
                        <span>Recupera 20+ horas a la semana</span>
                      </li>
                    </ul>

                    <button 
                      onClick={() => setStep(2)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-full shadow-[0_10px_25px_rgba(37,99,235,0.3)] hover:shadow-[0_15px_30px_rgba(37,99,235,0.4)] transition-all active:scale-[0.98] uppercase tracking-widest text-xs flex justify-center items-center gap-2"
                    >
                      Unirme a la lista de espera <span>→</span>
                    </button>
                    
                    <div className="text-center text-xs text-slate-500 mt-6 font-medium flex items-center justify-center gap-2.5">
                      <span className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full ring-2 ring-white z-30 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">SM</div>
                        <div className="w-7 h-7 rounded-full ring-2 ring-white z-20 bg-orange-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">JP</div>
                        <div className="w-7 h-7 rounded-full ring-2 ring-white z-10 bg-emerald-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">CA</div>
                      </span>
                      <span>
                        Únete a los más de <strong className="font-bold text-slate-700">2 mil ferreteros</strong> en la lista.
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="py-2 animate-in fade-in slide-in-from-right-8 duration-500">
                    <div className="mb-6">
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-2 tracking-tight">
                        Estás casi dentro
                      </h3>
                      <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        Para garantizar que cada ferretería obtenga resultados excepcionales, daremos acceso por <strong>grupos limitados</strong> este 2026.
                      </p>
                    </div>
                    
                    <form onSubmit={handleModalSubmit} className="flex flex-col gap-4 text-left">
                      <div aria-hidden="true" className="opacity-0 absolute -left-[9999px]">
                        <input type="text" name="empresa_secundaria" tabIndex={-1} autoComplete="off" />
                      </div>

                      <div className="group">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">Nombre Completo</label>
                        {/* OPTIMIZACIÓN 3: Inputs sólidos (bg-slate-50) */}
                        <input type="text" name="nombre" required placeholder="Ej. Juan Pérez" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" />
                      </div>

                      <div className="group">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">Correo Electrónico</label>
                        <input type="email" name="email" required placeholder="tu@correo.com" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-800 placeholder:text-slate-400" />
                      </div>

                      <div className="group">
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">WhatsApp</label>
                        <div className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
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
// import { X, Loader2, CheckCircle2, Zap } from "lucide-react";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import { submitWaitlist } from "@/app/actions";

// // 1. Creamos el "Contexto" para poder llamarlo desde cualquier archivo
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

// // 2. El Proveedor que envuelve la aplicación
// export function WaitlistProvider({ children }: { children: ReactNode }) {
//   const [isOpen, setIsOpen] = useState(false);
//   const [promptData, setPromptData] = useState("");
//   const [phone, setPhone] = useState<string | undefined>("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [alreadyRegistered, setAlreadyRegistered] = useState(false);

//   useEffect(() => {
//     if (localStorage.getItem("genio_waitlist_status") === "registered") {
//       setAlreadyRegistered(true);
//     }
//   }, []);

//   const openModal = (promptContext = "") => {
//     setPromptData(promptContext); // Guardamos lo que escribió en el Hero (si aplica)
//     setIsOpen(true);
//   };

//   const closeModal = () => setIsOpen(false);

//   const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsSubmitting(true);
    
//     const formData = new FormData(e.currentTarget);
//     const data = {
//       nombre: formData.get("nombre") as string,
//       email: formData.get("email") as string,
//       whatsapp: phone || "",
//       prompt: promptData,
//       honeypot: formData.get("empresa_secundaria") as string,
//     };
    
//     const success = await submitWaitlist(data);
//     setIsSubmitting(false);
    
//     if (success) {
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

//       {/* AQUÍ VIVE EL MODAL GLOBALMENTE */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md cursor-pointer"
//           onClick={closeModal} // Permite cerrar al tocar fuera
//           role="button" // Ayuda a iOS a entender que es interactivo
//           tabIndex={0}
//         >
//           <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/30 backdrop-blur-md transition-all">
//             <div className="bg-white/95 backdrop-blur-xl border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[24px] w-full max-w-md p-8 relative animate-in fade-in zoom-in-[0.98] duration-300" onClick={(e) => e.stopPropagation()}>
              
//               <button onClick={closeModal} className="absolute top-5 right-5 text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-700 p-2 rounded-full transition-all">
//                 <X size={18} strokeWidth={2.5} />
//               </button>
              
//               {alreadyRegistered ? (
//                 <div className="text-center py-6 animate-in fade-in duration-500">
//                   <div className="w-20 h-20 bg-gradient-to-tr from-green-100 to-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100/50">
//                     <CheckCircle2 size={40} strokeWidth={2} />
//                   </div>
//                   <h2 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">¡Lugar Asegurado!</h2>
//                   <p className="text-slate-500 mb-6 text-sm leading-relaxed">Tus datos están a salvo.<br/>Nuestro equipo está revisando tu perfil.</p>
//                   <div className="bg-slate-50/80 p-5 rounded-2xl text-sm text-slate-600 text-left border border-slate-300 shadow-inner mb-6">
//                     <span className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
//                       <Zap size={16} className="text-blue-500" /> Próximo paso
//                     </span>
//                     Te contactaremos vía WhatsApp muy pronto para habilitar tu acceso.
//                   </div>
//                   <div className="flex flex-col gap-3">
//                     <button onClick={closeModal} className="w-full cursor-pointer bg-slate-100 border-1 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors">
//                       Volver a la página
//                     </button>
//                     <button onClick={() => setAlreadyRegistered(false)} className="cursor-pointer text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors py-2">
//                       ¿Te equivocaste en algún dato? <br/> Modificar registro
//                     </button>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="animate-in fade-in duration-300">
//                   <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
//                     Sé el primero
//                   </h2>
//                   <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-md mx-auto">
//                     Recibe una notificación cuando lancemos la herramienta oficial este 2026.
//                   </p>
                  
//                   <form onSubmit={handleModalSubmit} className="flex flex-col gap-5 text-left">
//                     <div aria-hidden="true" className="opacity-0 absolute -left-[9999px]">
//                       <input type="text" name="empresa_secundaria" tabIndex={-1} autoComplete="off" />
//                     </div>
//                     <div className="group">
//                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">Nombre Completo</label>
//                       <input type="text" name="nombre" required placeholder="Ej. Juan Pérez" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 placeholder:text-slate-400" />
//                     </div>
//                     <div className="group">
//                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">Correo Electrónico</label>
//                       <input type="email" name="email" required placeholder="tu@correo.com" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 placeholder:text-slate-400" />
//                     </div>
//                     <div className="group">
//                       <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">WhatsApp</label>
//                       <div className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-transparent focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
//                         <PhoneInput international defaultCountry="PE" value={phone} onChange={setPhone} className="outline-none bg-transparent text-slate-700" placeholder="Ingresa tu número" required />
//                       </div>
//                     </div>
//                     <button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 text-white font-semibold py-4 rounded-xl shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all flex justify-center items-center h-14">
//                       {isSubmitting ? <Loader2 className="animate-spin" size={22} /> : "Unirme a la lista de espera"}
//                     </button>
//                   </form>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </WaitlistContext.Provider>
//   );
// }