import { 
  Zap, Microscope, FileText, ShoppingBag, 
  Calculator, RefreshCw, CheckSquare, LayoutGrid,
  MessageCircle, Linkedin, Instagram 
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-20 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* COLUMNA 1: MARCA Y MISIÓN */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-sm">F</div>
              <span className="text-xl font-serif tracking-tight font-bold">ferreteros.app</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              La plataforma inteligente para el dueño de ferretería moderno. Datos, estrategia y control en un solo lugar.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Instagram size={20} /></a>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-slate-500 border-l border-slate-800 pl-4">
                🇵🇪 LIMA, PERÚ
              </div>
            </div>
          </div>

          {/* COLUMNA 2: SERVICIOS (Renombrado y Actualizado) */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8 opacity-50">Servicios</h4>
            <ul className="space-y-5">
              <li>
                <a href="#" className="group flex items-center gap-3 hover:text-white transition-colors">
                  <Zap size={16} className="text-blue-500" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-200">Genio PRO</span>
                    <span className="text-[10px] text-slate-600">Integrador y Asesoría</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-3 hover:text-white transition-colors">
                  <Microscope size={16} className="text-slate-500 group-hover:text-blue-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Laboratorio de Datos</span>
                    <span className="text-[10px] text-slate-600">Auditoría de Inventarios</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-3 hover:text-white transition-colors">
                  <FileText size={16} className="text-slate-500 group-hover:text-emerald-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Facturación Electrónica</span>
                    <span className="text-[10px] text-slate-600">Conexión con SUNAT</span>
                  </div>
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center gap-3 hover:text-white transition-colors">
                  <ShoppingBag size={16} className="text-slate-500 group-hover:text-orange-400" />
                  <div className="flex flex-col">
                    <span className="text-sm font-bold">Catálogo de Pedidos</span>
                    <span className="text-[10px] text-slate-600">Ventas por WhatsApp</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 3: HERRAMIENTAS GRATIS (Nuevo Enfoque) */}
          <div>
            <h4 className="text-white font-bold text-[11px] uppercase tracking-[0.2em] mb-8 opacity-50">Herramientas Gratis</h4>
            <ul className="space-y-4">
              <li>
                <a href="#" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <Calculator size={14} className="text-slate-600" /> Calculadora Stock Muerto
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <RefreshCw size={14} className="text-slate-600" /> Calculadora Rotación de Stock
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <CheckSquare size={14} className="text-slate-600" /> Plan de Compra Óptimo
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-3 text-sm hover:text-white transition-colors">
                  <LayoutGrid size={14} className="text-slate-600" /> Análisis ABC
                </a>
              </li>
            </ul>
          </div>

          {/* COLUMNA 4: CONTACTO DIRECTO */}
          <div className="bg-white/[0.03] p-6 rounded-[32px] border border-white/5">
            <h4 className="text-white font-bold text-sm mb-4">¿Tienes dudas?</h4>
            <p className="text-xs mb-6 text-slate-500 leading-relaxed">Habla directamente con nuestro equipo técnico sobre la integración.</p>
            <a 
              href="https://wa.me/51999999999" 
              className="flex items-center justify-center gap-2 bg-white text-slate-950 font-bold py-3.5 rounded-2xl text-[11px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all active:scale-95"
            >
              <MessageCircle size={16} fill="currentColor" />
              WhatsApp Soporte
            </a>
          </div>

        </div>

        {/* BARRA INFERIOR */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Libro de Reclamaciones</a>
          </div>
          <p className="text-[10px] font-medium text-slate-700">
            © {currentYear} ferreteros.app — Lima, Perú.
          </p>
        </div>
      </div>
    </footer>
  );
}