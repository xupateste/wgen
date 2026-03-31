"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { X, Loader2, Zap, Brain, Clock, Users, Trophy, ArrowRight, Check, Sparkles, Pencil } from "lucide-react";
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
	const [willRedirect, setWillRedirect] = useState(false);

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
							className="bg-gradient-to-t from-[#f8faff] to-white to-50% border border-slate-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] rounded-[24px] w-full max-w-lg md:max-w-3xl p-6 md:p-10 relative animate-in fade-in zoom-in-[0.98] duration-300 pointer-events-auto" 
							onClick={(e) => e.stopPropagation()}
						>
							<div className="absolute left-1/2 -translate-x-1/2 -top-8 md:-top-10 z-50">
                <div className="p-3 md:p-4 bg-white rounded-[16px] rotate-12 md:rounded-[20px] border border-slate-100 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.1)] flex items-center justify-center">
                  <Sparkles className="w-7 h-7 md:w-8 md:h-8 text-blue-600" strokeWidth={1.5} />
                </div>
              </div>
							
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
									className="absolute -top-4 -right-4 z-[60] cursor-pointer text-slate-400 bg-slate-50 hover:bg-slate-200 hover:text-slate-700 p-2.5 rounded-full transition-all shadow-sm border border-slate-100 active:scale-95"
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

										{/*<h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2 tracking-tight">
											¡Lugar asegurado{submittedName ? `, ${submittedName.split(' ')[0]}` : ''}!
										</h2>*/}
										
										{/* NOMBRE + BOTÓN EDITAR (La clave del UX) */}
								    <h2 className="text-2xl md:text-3xl font-serif text-slate-900 mb-2 tracking-tight flex items-center justify-center gap-2">
								      ¡Lugar asegurado, {submittedName ? submittedName.split(' ')[0].toUpperCase() : 'FERRETERO'}!
								      <button 
								        onClick={() => {
								          setAlreadyRegistered(false);
								          setStep(2); // Lo mandamos de vuelta al form
								        }}
								        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all cursor-pointer"
								        title="Editar mis datos"
								      >
								        <Pencil size={16} />
								      </button>
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
									<div className="pb-2 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    <h2 className="text-[20px] md:text-[32px] mt-4 md:mt-1 font-sans font-bold text-slate-900 mb-2 md:mb-3 tracking-tight leading-tight text-center max-w-2xl mx-auto">
                      <strong className="text-blue-600 font-bold">Recupera 20 horas a la semana</strong> <br className="block md:hidden"/> y <br className="hidden md:block"/><strong className="text-blue-600 font-bold">optimiza tu capital</strong>. <br className="block md:hidden"/><strong>Dirige como un experto.</strong>
                    </h2>

                    <p className="text-slate-500 text-[11px] md:text-[15px] mb-2 md:mb-4 leading-relaxed font-medium text-center">
                      Únete a Genio PRO y gestiona tu inventario con datos exactos.
                    </p>
                    
                    {/* ATENCIÓN: md:grid-cols-3 es lo que hace que en PC se vea horizontal */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 md:gap-4 mb-3 md:mb-6 max-w-4xl mx-auto">
                      
                      <div className="flex md:flex-col items-center md:items-start gap-3 bg-blue-50/60 border border-blue-100 p-3 md:p-5 rounded-xl md:rounded-2xl">
                        <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                          <Brain className="size-6 md:size-12" />
                        </div>
                        <div>
                          <p className="text-[13px] md:text-[14px] text-slate-700 font-medium leading-snug text-left">
                            <strong className="text-slate-900 block md:mb-1">Inteligencia de Datos</strong> Auditoría y planificación automática.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col items-center md:items-start gap-3 bg-emerald-50/60 border border-emerald-100 p-3 md:p-5 rounded-xl md:rounded-2xl">
                        <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 shrink-0">
                          <Users className="size-6 md:size-12" />
                        </div>
                        <div>
                          <p className="text-[13px] md:text-[14px] text-slate-700 font-medium leading-snug text-left">
                            <strong className="text-slate-900 block md:mb-1">Asesoría Experta</strong> Consultas ilimitadas con un especialista.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex md:flex-col items-center md:items-start gap-3 bg-orange-50/60 border border-orange-100 p-3 md:p-5 rounded-xl md:rounded-2xl">
                        <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                          <Clock className="size-6 md:size-12" />
                        </div>
                        <div>
                          <p className="text-[13px] md:text-[14px] text-slate-700 font-medium leading-snug text-left">
                            <strong className="text-slate-900 block md:mb-1">Control Total</strong> Elimina las compras innecesarias.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="max-w-md mx-auto">
                      <button 
                        onClick={() => setStep(2)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-3.5 md:py-4 rounded-xl md:rounded-2xl shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.35)] transition-all active:scale-[0.98] tracking-wide text-[11px] md:text-[13px] flex justify-center items-center gap-1.5"
                      >
                        OBTENER ACCESO Y DIAGNÓSTICO INICIAL<ArrowRight size={16} strokeWidth={3} />
                      </button>
                      
                      <div className="text-center text-[11px] md:text-xs text-slate-500 mt-4 font-medium flex items-center justify-center gap-2">
                        <span className="flex -space-x-1.5 shrink-0">
                          <div className="w-6 h-6 rounded-full ring-2 ring-white z-30 bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">SM</div>
                          <div className="w-6 h-6 rounded-full ring-2 ring-white z-20 bg-orange-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">JP</div>
                          <div className="w-6 h-6 rounded-full ring-2 ring-white z-10 bg-emerald-500 text-white text-[9px] font-bold flex items-center justify-center shadow-sm">CA</div>
                        </span>
                        <span className="leading-tight text-left">
                          Únete a los más de <strong className="font-bold text-slate-700">2k ferreteros</strong>.
                        </span>
                      </div>
                    </div>
                  </div>

								) : (
									// PASO 2 (Se mantiene igual)
									<div className="py-2 animate-in fade-in slide-in-from-right-8 duration-500">
										<div className="text-center md:text-left mb-6">
											<h2 className="text-[20px] md:text-[32px] font-serif text-slate-900 mb-2">Reserva tu lugar.</h2>
											<p className="text-sm text-slate-500 leading-relaxed font-medium">
												Estamos asignando <strong className="text-slate-900">analistas expertos</strong> por orden de registro. <br className="hidden md:inline-block"/>Asegura tu posición para el <strong className="text-slate-900">diagnóstico de inventario inicial (Gratis).</strong>
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

