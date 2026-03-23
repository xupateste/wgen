// src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Paperclip, ArrowUp, Zap, X, Loader2, Users, PackageSearch, ShoppingCart, BarChart3, PackageX, TrendingUp, FileText, Receipt, CheckCircle2 } from "lucide-react";
import { submitWaitlist } from "./actions";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; 
import Navbar from "@/components/Navbar";
import { useWaitlist } from "@/components/WaitlistProvider";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [phone, setPhone] = useState<string | undefined>(""); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const { openModal } = useWaitlist();

  const [placeholder, setPlaceholder] = useState("");
  const phrases = [
    "¿Qué productos no han rotado en 90 días?",
    "Generar hoja de actividades para mi equipo en esta semana",
    "¿Cuánto capital hay atrapado en Electricidad?",
    "Comparar mi velocidad de venta actual con un plan de compras optimizado para mejorar el flujo de caja",
    "¿Qué proveedores debo pagar esta semana?",
    "Analizar rentabilidad de la marca Truper",
    "Realizar un análisis de inventario y financiero para ver qué familias de productos no están dejando retorno de inversión",
    "Cruzar registros de ventas con stock físico para detectar discrepancias y mala gestión operativa",
  ];

  useEffect(() => {
    let currentPhraseIndex = 0;
    let currentCharacterIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const phrases = [
      "¿Qué productos no han rotado en 90 días?",
      "Generar hoja de ruta para mi equipo hoy",
      "¿Cuánto capital hay atrapado en Electricidad?",
      "¿Qué proveedores debo pagar esta semana?",
      "Analizar rentabilidad de la marca Truper"
    ];

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      // Determinamos el texto actual
      const nextText = isDeleting 
        ? currentPhrase.substring(0, currentCharacterIndex - 1)
        : currentPhrase.substring(0, currentCharacterIndex + 1);

      // ACTUALIZACIÓN: En iOS, a veces setState no dispara el repintado del placeholder
      // Usamos requestAnimationFrame para asegurar que el navegador esté listo para pintar
      window.requestAnimationFrame(() => {
        setPlaceholder(nextText);
        if (isDeleting) {
          currentCharacterIndex--;
        } else {
          currentCharacterIndex++;
        }
      });

      // --- LÓGICA DE TIEMPOS (ELÁSTICA) ---
      let typeSpeed = isDeleting ? 5 : 15;

      if (!isDeleting && currentCharacterIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pausa al terminar
        isDeleting = true;
      } else if (isDeleting && currentCharacterIndex === 0) {
        isDeleting = false;
        currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
        typeSpeed = 600; // Pausa antes de nueva frase
      } else if (isDeleting) {
        // Aceleración exponencial al borrar para iOS
        typeSpeed = Math.max(15, 60 * Math.pow(0.8, currentPhrase.length - currentCharacterIndex));
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    type();
    return () => clearTimeout(timeoutId);
  }, []);

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
    
    const formData = new FormData(e.currentTarget);
    const data = {
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
    openModal(chatInput); // Le pasamos lo que el usuario escribió al modal global
  };


  return (
    <div className="min-h-screen bg-[#f8faff] text-slate-900 font-sans flex flex-col">
      
      {/* NAV */}
      <Navbar />

      {/* HERO SECTION */}
      {/* pt-24 en móvil y pt-28 en PC para subir el contenido. pb-16 para no dejar tanto espacio abajo */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-24 md:pt-28 pb-16 text-center max-w-4xl mx-auto w-full relative z-10">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-blue-100 bg-blue-50/50 text-blue-600 text-[11px] font-bold tracking-widest uppercase mb-6 shadow-sm">
          {/*<Zap size={14} fill="currentColor" />*/}
          <span>#1 EN OPTIMIZACIÓN DE INVENTARIOS</span>
        </div>

        {/* Cambiamos font-extrabold a font-bold, y text-[64px] a text-[56px] para mayor elegancia */}
        <h1 className="text-3xl md:text-[56px] tracking-tight font-semibold text-slate-900 mb-5 leading-[1.15] md:leading-[1.1]">
          Dirigir tu ferretería como un experto {' '}
          <span className="text-blue-600">nunca fue tan sencillo</span>
        </h1>

        {/* Margen mb-8 (antes 12) y quitamos font-medium para aligerar la lectura */}
        <p className="text-slate-500 tracking-tight max-w-[65ch] md:text-lg mb-6 md:mb-8 max-w-2xl font-semibold px-2 leading-relaxed">
          Genio te ayuda a <strong>planificar</strong>, <strong>auditar</strong> y <strong>optimizar</strong> tu negocio en un solo lugar. Reabastece a tiempo, siempre. Recupera 20+ horas a la semana de trabajo manual.
        </p>

        {/* Borde del chatbox a 1px (border normal) para que sea definido pero no tosco */}
        <div className="w-full max-w-3xl relative shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-2xl bg-white border-2 border border-slate-700 p-1 mb-4 md:mb-6 hover:shadow-[0_8px_30px_rgb(37,99,235,0.12)] hover:border-blue-600 transition-all duration-300">
          <form onSubmit={handleSimulatedChat} className="relative flex flex-col">
            <textarea 
              spellCheck="false"
              autoComplete="off"
              key={placeholder}
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              rows={2}
              placeholder={placeholder}
              className="w-full text-slate-900 bg-transparent border-none outline-none px-4 pt-4 pb-12 md:pb-14 text-base md:text-lg resize-none placeholder:text-slate-400 font-semibold"
            />
            
            <div className="absolute bottom-2 left-3 flex items-center">
              <button type="button" onClick={handleSimulatedChat} className="p-2 text-slate-400 hover:text-slate-800 transition-colors rounded-md">
                <Paperclip size={20} />
              </button>
            </div>

            <div className="absolute bottom-2 right-2 flex items-center">
              <button type="submit" className="bg-[#0f6fff] hover:bg-blue-700 text-white p-2 md:p-2.5 rounded-lg md:rounded-xl transition-transform hover:scale-105 shadow-sm flex items-center justify-center">
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

      {/* 3. FOOTER / SERVICIOS ACTUALES */}
      <footer id="servicios" className="w-full bg-white border-t border-slate-200 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h3 className="text-lg font-bold text-slate-900 mb-8 text-center md:text-left">También disponible en Ferreteros.app</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Freemium */}
            <div className="p-5 border border-slate-100 rounded-xl bg-slate-50">
              <TrendingUp className="text-blue-600 mb-3" size={24} />
              <h4 className="font-semibold text-slate-900 mb-2">Análisis Todo en 1</h4>
              <p className="text-sm text-slate-500">Freemium con créditos gratis diarios y recargas disponibles.</p>
            </div>

            {/* Herramientas Independientes */}
            <div className="p-5 border border-slate-100 rounded-xl bg-slate-50">
              <PackageX className="text-blue-600 mb-3" size={24} />
              <h4 className="font-semibold text-slate-900 mb-2">Gestión de Stock</h4>
              <p className="text-sm text-slate-500">Control de stock-muerto, rotación y plan de compra.</p>
            </div>

            {/* Ejecución Anónima */}
            <div className="p-5 border border-slate-100 rounded-xl bg-slate-50">
              <FileText className="text-blue-600 mb-3" size={24} />
              <h4 className="font-semibold text-slate-900 mb-2">Catálogos y Pedidos</h4>
              <p className="text-sm text-slate-500">Ejecución anónima para generar catálogos de productos.</p>
            </div>

            {/* Facturación */}
            <div className="p-5 border border-slate-100 rounded-xl bg-slate-50">
              <Receipt className="text-blue-600 mb-3" size={24} />
              <h4 className="font-semibold text-slate-900 mb-2">Facturación Electrónica</h4>
              <p className="text-sm text-slate-500">Módulo de pago para la gestión fiscal y emisión de comprobantes.</p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}