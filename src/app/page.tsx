// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Paperclip, ArrowUp, Zap, X, Loader2, Users, PackageSearch, ShoppingCart, BarChart3, PackageX, TrendingUp, FileText, Receipt, CheckCircle2 } from "lucide-react";
import { submitWaitlist } from "./actions";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; 
import Navbar from "@/components/Navbar";
import { useWaitlist } from "@/components/WaitlistProvider";
import { SlidingAvatars } from "@/components/SlidingAvatars";
import { TestimonialSection } from "@/components/Testimonials";
import { FeatureSection } from "@/components/Features";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [phone, setPhone] = useState<string | undefined>(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const { openModal } = useWaitlist();

  // Dentro de tu componente Home
  const [isFocused, setIsFocused] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const phrases = [
    "Quiero analizar mis productos sin rotación...",
    "Quiero generar un plan de compras optimizado...",
    "Quiero entender mi rentabilidad por marca...",
    "Quiero auditar el capital atrapado en stock...",
  ];

  useEffect(() => {
    // REGLA DE ORO: Si hay foco o hay texto, no hay animación.
    if (isFocused || chatInput.length > 0) return;

    const currentPhrase = phrases[phraseIndex];
    const speed = isDeleting ? 5 : 20;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        if (displayText === currentPhrase) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, phraseIndex, chatInput, isFocused]);


  // 2. NUEVO EFECTO: Escuchar si venimos del blog con la etiqueta #waitlist
  useEffect(() => {
    if (window.location.hash === "#waitlist") {
      setIsModalOpen(true);
      
      // Limpiamos la URL para que no quede el "#waitlist" arriba 
      // y si el usuario recarga la página, no se le vuelva a abrir forzosamente.
      window.history.replaceState(null, "", "/");
    }
  }, []);

  // Al cargar la página, revisamos si ya hay un registro guardado en el navegador
  useEffect(() => {
    if (localStorage.getItem("genio_waitlist_status") === "registered") {
      setAlreadyRegistered(true);
    }
  }, []);

  const handleModalSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const getOrLinkUserId = () => {
      let existingId = localStorage.getItem("ferreteros_user_id");
      
      if (!existingId) {
        existingId = crypto.randomUUID(); // Genera un ID único tipo: "123e4567-e89b-12d3-a456-426614174000"
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
      prompt: chatInput,
      honeypot: formData.get("empresa_secundaria") as string, // Capturamos el campo trampa
    };
    
    const success = await submitWaitlist(data);
    
    setIsSubmitting(false);
    
    if (success) {
      // Guardamos en el navegador que ya se registró para evitar spam manual
      localStorage.setItem("genio_waitlist_status", "registered");
      setAlreadyRegistered(true);
      
      // Cerramos el modal automáticamente después de 4 segundos
      setTimeout(() => {
        setIsModalOpen(false);
        setChatInput("");
      }, 8000);
    }
  };

  // Función intermediaria para evitar que el navegador recargue al dar "Enter"
  const handleSimulatedChat = (e?: React.FormEvent | React.MouseEvent) => {
    if (e) e.preventDefault();
    // openModal ahora se encarga de abrir el modal global y pasarle el prompt
    openModal(chatInput); 
  };

  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-sans flex flex-col">
      
      {/* NAV */}
      <Navbar />

      {/* HERO SECTION */}
      {/* pt-24 en móvil y pt-28 en PC para subir el contenido. pb-16 para no dejar tanto espacio abajo */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 md:pt-38 pb-16 text-center max-w-4xl mx-auto w-full relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-blue-100 bg-white text-blue-600 text-[11px] font-bold tracking-widest uppercase mb-6 md:mb-8 shadow-sm">
          {/*<Zap size={14} fill="currentColor" />*/}
          <span>Gestión IA + Asesorías Ilimitadas</span>
        </div>

        {/* Cambiamos font-extrabold a font-bold, y text-[64px] a text-[56px] para mayor elegancia */}
        <h1 className="text-3xl md:text-[60px] tracking-tight font-medium text-slate-900 mb-5 md:mb-6 leading-[1.1] md:leading-[1.15]">
          Dirigir tu ferretería como un experto {' '}
          <span className="text-blue-600">nunca fue tan sencillo</span>
        </h1>

        {/* Margen mb-8 (antes 12) y quitamos font-medium para aligerar la lectura */}
        <p className="text-slate-500 tracking-tight max-w-[55ch] md:text-[18px] mb-6 md:mb-8 max-w-2xl font-semibold px-2 leading-[1.7]">
          Genio PRO te ayuda a <strong>planificar</strong>, <strong>auditar</strong> y <strong>optimizar</strong> tu operación en un solo lugar. Obtén el respaldo de un analista experto <strong>dedicado a tu ferreteria</strong>.
        </p>

        {/* Borde del chatbox a 1px (border normal) para que sea definido pero no tosco */}
        <div className="w-full max-w-2xl relative shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl bg-white border-2 border border-slate-700 p-1 mb-4 md:mb-6 hover:shadow-[0_8px_30px_rgb(37,99,235,0.12)] hover:border-blue-600 transition-all duration-300">
          <form onSubmit={handleSimulatedChat} className="relative flex flex-col">

            {/* CAPA DE ANIMACIÓN (GHOST TEXT) */}
            {!isFocused && chatInput.length === 0 && (
              <div className="absolute top-4 left-4 pointer-events-none text-[16px] font-semibold text-slate-400 flex items-center z-0">
                <span className="ml-1 text-slate-600/70 text-left">{displayText}</span>
                <span className="w-[2px] h-[1.2em] bg-slate-600/70 ml-0.5 animate-cursor" />
              </div>
            )}

            {/* TEXTAREA (Capa Z-10) */}
            <textarea 
              spellCheck="false"
              value={chatInput}
              onFocus={() => { setIsFocused(true); setDisplayText(""); }}
              onBlur={() => setIsFocused(false)}
              onChange={(e) => setChatInput(e.target.value)}
              rows={3}
              /* Importante: text-[16px] para evitar zoom en iOS */
              className="w-full text-slate-900 bg-transparent border-none outline-none px-4 pt-4 pb-12 md:pb-14 text-[16px] md:text-base resize-none font-semibold relative z-10 cursor-text"
              placeholder={isFocused ? "Quiero empezar a usar Ferreteros.app..." : ""}
            />
            
            <div className="absolute bottom-2 left-2 flex items-center z-30">
              <button 
                type="button"
                onClick={handleSimulatedChat} 
                className="p-2 text-slate-400 hover:text-slate-800 transition-colors rounded-md cursor-pointer pointer-events-auto"
              >
                <Paperclip size={20} />
              </button>
            </div>

            {/* CONTENEDOR BOTÓN DERECHO (Capa Z-30) */}
            <div className="absolute bottom-2 right-2 flex items-center z-30">
              <button 
                type="submit" 
                /* Usamos cursor-pointer explícito y pointer-events-auto */
                className="bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-xl shadow-sm transition-transform hover:scale-105 flex items-center justify-center cursor-pointer pointer-events-auto"
              >
                <ArrowUp size={20} strokeWidth={2.5} />
              </button>
            </div>
          </form>
        </div>

        {/* Chips de Sugerencias Estratégicos */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 text-[11px] md:text-sm font-semibold text-slate-600 max-w-3xl">
          
          {/* CHIP 1: Operaciones/Equipo (Pain: Improvisación de tareas) */}
          <button 
            onClick={() => openModal("Generar hoja de ruta y tareas diarias para mi equipo de ventas")} 
            className="cursor-pointer px-2 md:px-3 py-1 bg-white border border-slate-200 rounded-xl flex items-center gap-0 shadow-sm hover:bg-slate-50 hover:border-blue-300 transition-all group"
          >
            <div className="p-1 rounded-md bg-gray-50 text-gray-500 group-hover:bg-gray-100 transition-colors">
              <Users size={16} strokeWidth={2.5} />
            </div>
            <span>Establecer plan de trabajo</span>
          </button>

          {/* CHIP 2: Inventario (Pain: Comprar por intuición / Stock muerto) */}
          <button 
            onClick={() => openModal("Analizar productos sin rotación en los últimos 90 días y sugerir liquidación")} 
            className="cursor-pointer px-2 md:px-3 py-1 bg-white border border-slate-200 rounded-xl flex items-center gap-0 shadow-sm hover:bg-slate-50 hover:border-blue-300 transition-all group"
          >
            <div className="p-1 rounded-md bg-gray-50 text-gray-500 group-hover:bg-gray-100 transition-colors">
              <PackageSearch size={16} strokeWidth={2.5} />
            </div>
            <span>Auditar ventas</span>
          </button>

          {/* CHIP 3: Compras (Pain: No saber si reponer u optimizar) */}
          <button 
            onClick={() => openModal("Armar un plan de compras optimizado basado en velocidad de venta real")} 
            className="cursor-pointer px-2 md:px-3 py-1 bg-white border border-slate-200 rounded-xl flex items-center gap-0 shadow-sm hover:bg-slate-50 hover:border-blue-300 transition-all group"
          >
            <div className="p-1 rounded-md bg-gray-50 text-gray-500 group-hover:bg-gray-100 transition-colors">
              <ShoppingCart size={16} strokeWidth={2.5} />
            </div>
            <span>Planear compras</span>
          </button>

          {/* CHIP 4: Finanzas (Pain: No saber si el negocio es rentable) */}
          <button 
            onClick={() => openModal("Analizar rentabilidad real y retorno de inversión por categorías")} 
            className="cursor-pointer px-2 md:px-3 py-1 bg-white border border-slate-200 rounded-xl flex items-center gap-0 shadow-sm hover:bg-slate-50 hover:border-blue-300 transition-all group"
          >
            <div className="p-1 rounded-md bg-gray-50 text-gray-500 group-hover:bg-gray-100 transition-colors">
              <BarChart3 size={16} strokeWidth={2.5} />
            </div>
            <span>Analizar rentabilidad</span>
          </button>
        </div>

        <SlidingAvatars onCtaClick={() => openModal("Click desde el botón + en Avatares")} />
      </main>


      {/* MODAL DE WAITLIST PREMIUM */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/30 backdrop-blur-md transition-all">
          
          {/* Tarjeta del Modal con estilo Glassmorphism y bordes suaves */}
          <div className="bg-white/95 backdrop-blur-xl border border-white/50 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] rounded-[24px] w-full max-w-md p-8 relative animate-in fade-in zoom-in-[0.98] duration-300">
            
            {/* Botón de Cerrar Flotante */}
            <button 
              onClick={() => setIsModalOpen(false)} 
              className="absolute top-5 right-5 text-slate-400 bg-slate-50 hover:bg-slate-100 hover:text-slate-700 p-2 rounded-full transition-all"
            >
              <X size={18} strokeWidth={2.5} />
            </button>
            
            {/* ESTADO 1: YA REGISTRADO O ÉXITO */}
            {alreadyRegistered ? (
              <div className="text-center py-6 animate-in fade-in duration-500">
                <div className="w-20 h-20 bg-gradient-to-tr from-green-100 to-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-green-100/50">
                  <CheckCircle2 size={40} strokeWidth={2} />
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">¡Lugar Asegurado!</h2>
                <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                  Tus datos están a salvo.<br/>Nuestro equipo está revisando tu perfil.
                </p>
                <div className="bg-slate-50/80 p-5 rounded-2xl text-sm text-slate-600 text-left border border-slate-100 shadow-inner mb-6">
                  <span className="flex items-center gap-2 font-semibold text-slate-900 mb-1">
                    <Zap size={16} className="text-blue-500" /> Próximo paso
                  </span>
                  Te contactaremos vía WhatsApp muy pronto para habilitar tu acceso al motor de cálculo.
                </div>
                
                <div className="flex flex-col gap-3">
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-3.5 rounded-xl transition-colors"
                  >
                    Volver a la página
                  </button>
                  
                  {/* BOTÓN PARA PERMITIR MODIFICAR DATOS (NUEVO) */}
                  <button 
                    onClick={() => {
                      setAlreadyRegistered(false);
                      // Opcional: localStorage.removeItem("genio_waitlist_status"); si quieres borrar el rastro
                    }}
                    className="text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors py-2"
                  >
                    ¿Te equivocaste en algún dato? Modificar registro
                  </button>
                </div>
              </div>
            ) : (
              
              /* ESTADO 2: FORMULARIO DE CAPTURA */
              <div className="animate-in fade-in duration-300">
                {/* Badge Superior */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold tracking-wide uppercase mb-6">
                  <Zap size={14} fill="currentColor" /> Acceso Anticipado
                </div>

                <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">Únete a Genio</h2>
                <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                  {chatInput ? <span className="text-blue-600 font-medium">Consulta capturada. </span> : ""}
                  Déjanos tus datos para ser de los primeros en automatizar tu inventario.
                </p>
                
                <form onSubmit={handleModalSubmit} className="flex flex-col gap-5 text-left">
                  
                  {/* CAMPO HONEYPOT (Trampa anti-bots) */}
                  <div aria-hidden="true" className="opacity-0 absolute -left-[9999px]">
                    <input type="text" name="empresa_secundaria" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* 1. Nombre */}
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">
                      Nombre Completo
                    </label>
                    <input 
                      type="text" 
                      name="nombre"
                      required
                      placeholder="Ej. Juan Pérez" 
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 placeholder:text-slate-400"
                    />
                  </div>

                  {/* 2. Correo */}
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">
                      Correo Electrónico
                    </label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      placeholder="tu@correo.com" 
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700 placeholder:text-slate-400"
                    />
                  </div>

                  {/* 3. WhatsApp */}
                  <div className="group">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5 group-focus-within:text-blue-600 transition-colors">
                      WhatsApp
                    </label>
                    <div className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border-transparent focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 transition-all">
                      <PhoneInput
                        international
                        defaultCountry="PE"
                        value={phone}
                        onChange={setPhone}
                        className="outline-none bg-transparent text-slate-700"
                        placeholder="Ingresa tu número"
                        required
                      />
                    </div>
                  </div>

                  {/* Botón Submit Premium */}
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-70 text-white font-semibold py-4 rounded-xl shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 transition-all flex justify-center items-center h-14"
                  >
                    {isSubmitting ? (
                      <Loader2 className="animate-spin" size={22} />
                    ) : (
                      <span className="flex items-center gap-2">
                        Asegurar mi lugar <ArrowUp size={18} className="rotate-45 opacity-80" />
                      </span>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}


      <TestimonialSection />

      <FeatureSection />

      <FinalCTA />

      <Footer />

    </div>
  );
}