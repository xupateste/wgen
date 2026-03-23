// src/components/WaitlistProvider.tsx
"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { X, Loader2, CheckCircle2, Zap } from "lucide-react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { submitWaitlist } from "@/app/actions";

// 1. Creamos el "Contexto" para poder llamarlo desde cualquier archivo
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

// 2. El Proveedor que envuelve la aplicación
export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
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
    setPromptData(promptContext); // Guardamos lo que escribió en el Hero (si aplica)
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

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

      {/* AQUÍ VIVE EL MODAL GLOBALMENTE */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md cursor-pointer"
          onClick={closeModal} // Permite cerrar al tocar fuera
          role="button" // Ayuda a iOS a entender que es interactivo
          tabIndex={0}
        >
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/30 backdrop-blur-md transition-all">
            <div className="bg-white/95 backdrop-blur-xl border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[24px] w-full max-w-md p-8 relative animate-in fade-in zoom-in-[0.98] duration-300" onClick={(e) => e.stopPropagation()}>
              
              <button onClick={closeModal} className="absolute top-5 right-5 text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-700 p-2 rounded-full transition-all">
                <X size={18} strokeWidth={2.5} />
              </button>
              
              {alreadyRegistered ? (
                <div className="text-center py-6 animate-in fade-in duration-500">
                  <div className="w-20 h-20 bg-gradient-to-tr from-green-100 to-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100/50">
                    <CheckCircle2 size={40} strokeWidth={2} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">¡Lugar Asegurado!</h2>
                  <p className="text-slate-500 mb-6 text-sm leading-relaxed">Tus datos están a salvo.<br/>Nuestro equipo está revisando tu perfil.</p>
                  <div className="bg-slate-50/80 p-5 rounded-2xl text-sm text-slate-600 text-left border border-slate-300 shadow-inner mb-6">
                    <span className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                      <Zap size={16} className="text-blue-500" /> Próximo paso
                    </span>
                    Te contactaremos vía WhatsApp muy pronto para habilitar tu acceso.
                  </div>
                  <div className="flex flex-col gap-3">
                    <button onClick={closeModal} className="w-full cursor-pointer bg-slate-100 border-1 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors">
                      Volver a la página
                    </button>
                    <button onClick={() => setAlreadyRegistered(false)} className="cursor-pointer text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors py-2">
                      ¿Te equivocaste en algún dato? <br/> Modificar registro
                    </button>
                  </div>
                </div>
              ) : (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4 tracking-tight">
                    Sé el primero
                  </h2>
                  <p className="text-slate-500 text-lg mb-8 leading-relaxed max-w-md mx-auto">
                    Recibe una notificación cuando lancemos la herramienta oficial este 2026.
                  </p>
                  
                  <form onSubmit={handleModalSubmit} className="flex flex-col gap-5 text-left">
                    <div aria-hidden="true" className="opacity-0 absolute -left-[9999px]">
                      <input type="text" name="empresa_secundaria" tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">Nombre Completo</label>
                      <input type="text" name="nombre" required placeholder="Ej. Juan Pérez" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 placeholder:text-slate-400" />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">Correo Electrónico</label>
                      <input type="email" name="email" required placeholder="tu@correo.com" className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 placeholder:text-slate-400" />
                    </div>
                    <div className="group">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">WhatsApp</label>
                      <div className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-transparent focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                        <PhoneInput international defaultCountry="PE" value={phone} onChange={setPhone} className="outline-none bg-transparent text-slate-700" placeholder="Ingresa tu número" required />
                      </div>
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 text-white font-semibold py-4 rounded-xl shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all flex justify-center items-center h-14">
                      {isSubmitting ? <Loader2 className="animate-spin" size={22} /> : "Unirme a la lista de espera"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </WaitlistContext.Provider>
  );
}