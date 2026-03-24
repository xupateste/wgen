"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Menu, X, ChevronDown, Zap, Microscope, FileText, 
  ShoppingBag, Calculator, RefreshCw, CheckSquare, 
  LayoutGrid, GraduationCap 
} from "lucide-react";
import { useWaitlist } from "./WaitlistProvider";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openModal } = useWaitlist();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  // Función para manejar el click en items internos (como Genio PRO)
  const handleInternalNav = (e: React.MouseEvent) => {
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
      // Si el menú está abierto o hay scroll, el fondo es blanco sólido
      (scrolled || isOpen) 
        ? "py-3 bg-white border-b border-slate-200/50 shadow-sm" 
        : "py-5 bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* LOGO */}
        <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 group cursor-pointer outline-none">
          <div className="h-12 w-34 md:h-14 md:w-50 bg-[url('/logo.png')] bg-contain bg-no-repeat bg-left transition-transform group-hover:scale-[1.02]" />
          <span className="sr-only">ferreteros.app</span>
        </Link>

        {/* DESKTOP NAV */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {/* ... (Dropdowns de Servicios y Herramientas se mantienen igual) */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-blue-600 transition-colors py-2 uppercase tracking-widest">
              Servicios <ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-[24px] p-4 w-72">
                {/* Genio PRO es interno (#) */}
                <ServiceItem 
                  href="#" 
                  onClick={handleInternalNav}
                  icon={<Zap size={18} className="text-blue-600" />} 
                  title="Genio PRO" desc="Gestión IA + Asesoría Experta" badge="Core" 
                />
                <ServiceItem href="https://analisis.ferreteros.app" icon={<Microscope size={18} className="text-slate-400" />} title="Laboratorio de Datos" desc="Auditoría de Inventarios" />
                <ServiceItem href="https://facturacion.ferreteros.app" icon={<FileText size={18} className="text-slate-400" />} title="Facturación Electrónica" desc="Conexión Directa SUNAT" />
                <ServiceItem href="https://catalogos.ferreteros.app" icon={<ShoppingBag size={18} className="text-slate-400" />} title="Catálogo Digital" desc="Ventas por WhatsApp" />
              </div>
            </div>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-1 text-[11px] font-bold text-slate-600 hover:text-blue-600 transition-colors py-2 uppercase tracking-widest">
              Herramientas Gratis<ChevronDown size={12} className="group-hover:rotate-180 transition-transform duration-300" />
            </button>
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
              <div className="bg-white border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] rounded-[24px] p-4 w-72">
                <ServiceItem href="https://analisis.ferreteros.app/stock-muerto" icon={<Calculator size={18} className="text-slate-400" />} title="Stock Muerto" desc="Calcula tu capital parado" />
                <ServiceItem href="https://analisis.ferreteros.app/rotacion-de-stock" icon={<RefreshCw size={18} className="text-slate-400" />} title="Rotación" desc="Días de inventario ideal" />
                {/*<ServiceItem href="/herramientas/plan-compra" icon={<CheckSquare size={18} className="text-slate-400" />} title="Plan de Compra" desc="Optimiza tus pedidos" />*/}
                <ServiceItem href="https://analisis.ferreteros.app/analisis-abc" icon={<LayoutGrid size={18} className="text-slate-400" />} title="Análisis ABC" desc="Clasifica tu mercadería" />
              </div>
            </div>
          </div>

          <Link href="https://analisis.ferreteros.app/manifiesto" className="text-[11px] font-bold text-slate-600 hover:text-blue-600 uppercase tracking-widest transition-colors">
            Nuestro Manifiesto 🏳
          </Link>
        </div>

        {/* BOTONES ACCIÓN */}
        <div className="flex items-center gap-0 md:gap-4">
          <button 
            onClick={() => openModal("Navbar CTA")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-black py-2 md:py-4 px-3 md:px-8 rounded-full text-[10px] md:text-xs uppercase tracking-[0.15em] shadow-lg shadow-blue-600/20 transition-all active:scale-95"
          >
            Obtener acceso
          </button>
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-xl transition-colors relative z-[110]">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU - Ajustado para ser persistente */}
      <div className={`fixed inset-0 top-0 bg-white z-[90] md:hidden transition-all duration-500 ease-in-out transform ${
        isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      }`}>
        {/* Padding top para que el contenido no quede bajo el navbar */}
        <div className="p-8 pt-24 space-y-10 overflow-y-auto h-full pb-32">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Servicios</h4>
            <div className="grid grid-cols-1 gap-3">
              <MobileItem href="#" onClick={handleInternalNav} icon={<Zap size={20} className="text-blue-600" />} title="Genio PRO" />
              <MobileItem href="https://analisis.ferreteros.app" icon={<Microscope size={20} className="text-slate-400" />} title="Laboratorio de Datos" />
              <MobileItem href="https://facturacion.ferreteros.app" icon={<FileText size={20} className="text-slate-400" />} title="Facturación Electrónica" />
              <MobileItem href="https://catalogo.ferreteros.app" icon={<ShoppingBag size={20} className="text-slate-400" />} title="Catálogo Digital" />
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Herramientas Gratis</h4>
            <div className="grid grid-cols-1 gap-3">
              <MobileItem href="https://analisis.ferreteros.app/stock-muerto" icon={<Calculator size={20} className="text-slate-400" />} title="Calculadora de Stock" />
              <MobileItem href="https://analisis.ferreteros.app/rotacion-de-stock" icon={<RefreshCw size={20} className="text-slate-400" />} title="Análisis de Rotación" />
              <MobileItem href="https://analisis.ferreteros.app/analisis-abc" icon={<LayoutGrid size={18} className="text-slate-400" />} title="Análisis ABC" />
              <MobileItem href="https://laboratorio.ferreteros.app" icon={<GraduationCap size={20} className="text-slate-400" />} title="Academia Ferretera" />
            </div>
          </div>

          <div>
            <Link href="https://analisis.ferreteros.app/manifiesto" className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em] mb-6">Sobre Nosotros</Link>
            <div className="grid grid-cols-1 gap-3">
              <MobileItem href="https://analisis.ferreteros.app/manifiesto" icon={<Calculator size={20} className="text-slate-400" />} title="Nuestro Manifiesto Ferretero 🏳" />
            </div>
          </div>


          <div className="pt-8 border-t border-slate-100">
             <button 
                onClick={() => { setIsOpen(false); openModal("Mobile Menu CTA"); }}
                className="w-full bg-slate-900 text-white font-black py-5 rounded-2xl flex items-center justify-center gap-3 uppercase tracking-widest text-[11px]"
             >
                Obtener acceso <Zap size={16} fill="currentColor" />
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

function ServiceItem({ href, icon, title, desc, badge, onClick }: { href: string, icon: any, title: string, desc: string, badge?: string, onClick?: (e: any) => void }) {
  const isExternal = href.startsWith('http');
  
  const content = (
    <div className="flex items-start gap-4 p-3 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer group/item" onClick={onClick}>
      <div className="mt-1 transition-transform group-hover/item:scale-110">{icon}</div>
      <div className="flex flex-col text-left">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-sm">{title}</span>
          {badge && <span className="text-[8px] bg-blue-600 text-white px-2 py-0.5 rounded-full uppercase font-black tracking-tighter">{badge}</span>}
        </div>
        <p className="text-[11px] text-slate-500 leading-tight mt-0.5">{desc}</p>
      </div>
    </div>
  );

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block outline-none">{content}</a>
  ) : (
    <Link href={href} className="block outline-none">{content}</Link>
  );
}

function MobileItem({ href, icon, title, onClick }: { href: string, icon: any, title: string, onClick?: (e: any) => void }) {
  const isExternal = href.startsWith('http');
  const content = (
    <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl active:bg-slate-100 transition-colors" onClick={onClick}>
      <div className="shrink-0">{icon}</div>
      <span className="font-bold text-slate-900 text-[13px]">{title}</span>
    </div>
  );

  return isExternal ? (
    <a href={href} target="_blank" rel="noopener noreferrer" className="block outline-none">{content}</a>
  ) : (
    <Link href={href} className="block outline-none">{content}</Link>
  );
}