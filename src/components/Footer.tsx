import { 
  Zap, Microscope, FileText, ShoppingBag, 
  Calculator, RefreshCw, CheckSquare, LayoutGrid,
  MessageCircle, Youtube, Facebook
} from "lucide-react";

// Icono personalizado para TikTok (Lucide no lo tiene por defecto)
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMNA 1: MARCA Y REDES */}
          <div className="space-y-6">
            <a href="#" className="inline-block outline-none transition-transform hover:scale-[1.02]">
              <div className="h-10 w-48 bg-[url('/logo.png')] bg-contain bg-no-repeat bg-left brightness-0 invert" />
              <span className="sr-only">Ferreteros.app</span>
            </a>
            
            <p className="text-sm leading-relaxed max-w-xs opacity-80">
              La plataforma de inteligencia para dueños de ferretería. Datos, estrategia y control en un solo lugar.
            </p>

            <div className="flex items-center gap-5">
              <a href="https://www.tiktok.com/@ferreteros.app" className="hover:text-white transition-all hover:scale-110" title="TikTok"><TikTokIcon size={20} /></a>
              <a href="https://www.youtube.com/@ferreterosapp" className="hover:text-red-500 transition-all hover:scale-110" title="YouTube"><Youtube size={20} /></a>
              <a href="https://www.facebook.com/ferreteros.app" className="hover:text-blue-500 transition-all hover:scale-110" title="Facebook"><Facebook size={20} /></a>
              <a href="https://wa.me/51947037116" className="hover:text-emerald-500 transition-all hover:scale-110" title="WhatsApp"><MessageCircle size={20} /></a>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-600">
               🇵🇪 LIMA, PERÚ
            </div>
          </div>

          {/* COLUMNA 2: SERVICIOS */}
          <div>
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.25em] mb-8 opacity-40">Servicios</h4>
            <ul className="space-y-5">
              <FooterLink icon={<Zap size={14} className="text-blue-500" />} title="Genio PRO" desc="GESTION IA + Asesoría EXPERTA" url="/"/>
              <FooterLink icon={<Microscope size={14} />} title="Laboratorio de Datos" desc="Auditoría de Inventarios" url="https://laboratorio.ferreteros.app"/>
              <FooterLink icon={<FileText size={14} />} title="Facturación Electrónica" desc="Conexión Directa SUNAT" url="https://facturacion.ferreteros.app"/>
              <FooterLink icon={<ShoppingBag size={14} />} title="Catálogo Digital" desc="Ventas por WhatsApp" url="https://catalogos.ferreteros.app"/>
            </ul>
          </div>

          {/* COLUMNA 3: HERRAMIENTAS GRATIS */}
          <div>
            <h4 className="text-white font-bold text-[10px] uppercase tracking-[0.25em] mb-8 opacity-40">Herramientas Gratis</h4>
            <div className="space-y-4">
              <a href="https://laboratorio.ferreteros.app/stock-muerto" className="flex items-center gap-3 text-sm hover:text-white transition-colors cursor-pointer">
                <Calculator size={14} className="opacity-40" /> Stock Muerto
              </a>
              <a href="https://laboratorio.ferreteros.app/rotacion-de-stock" className="flex items-center gap-3 text-sm hover:text-white transition-colors cursor-pointer">
                <RefreshCw size={14} className="opacity-40" /> Rotación
              </a>
              <a href="https://laboratorio.ferreteros.app/analisis-abc" className="flex items-center gap-3 text-sm hover:text-white transition-colors cursor-pointer">
                <CheckSquare size={14} className="opacity-40" /> Análisis ABC
              </a>
              <a href="https://laboratorio.ferreteros.app/" className="flex items-center gap-3 text-sm hover:text-white transition-colors cursor-pointer">
                <LayoutGrid size={14} className="opacity-40" /> Abrir Laboratorio (Gratis)
              </a>
            </div>
          </div>

          {/* COLUMNA 4: CONTACTO */}
          <div className="bg-white/[0.02] p-6 rounded-3xl border border-white/5 flex flex-col justify-between">
            <div>
              <h4 className="text-white font-bold text-sm mb-3">¿Necesitas ayuda?</h4>
              <p className="text-xs text-slate-500 leading-relaxed mb-6">Habla con un asesor experto sobre cómo integrar tus datos.</p>
            </div>
            <a 
              href="https://wa.me/51947037116" 
              className="flex items-center justify-center gap-2 bg-white text-slate-950 font-black py-3 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95"
            >
              <MessageCircle size={14} fill="currentColor" />
              Contactar Soporte
            </a>
          </div>

        </div>

        {/* BARRA INFERIOR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Libro de Reclamaciones</a>
          </div>
          <p className="text-[10px] font-medium text-slate-700">
            © {currentYear} ferreteros.app — Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ icon, title, desc, url }: { icon: any, title: string, desc: string, url: string }) {
  return (
    <li>
      <a href={url} className="group flex items-center gap-3 hover:text-white transition-colors">
        <div className="text-slate-600 group-hover:text-blue-400 transition-colors">{icon}</div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-300 group-hover:text-white">{title}</span>
          <span className="text-[9px] text-slate-600 uppercase tracking-wider">{desc}</span>
        </div>
      </a>
    </li>
  );
}