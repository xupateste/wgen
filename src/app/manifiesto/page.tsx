import Link from "next/link";
import { Flag, Send } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nuestro Manifiesto",
  description: "Por qué construimos ferreteros.app y nuestra visión sobre el futuro de las ferreterías independientes.",
};

export default function ManifiestoPage() {
  return (
    // Fondo claro y vivo
    <main className="min-h-screen bg-slate-50 relative selection:bg-blue-200 selection:text-blue-900 py-12 px-4 sm:px-6 md:py-20 flex justify-center items-start overflow-hidden">
      
      {/* Patrón de cuadrícula tenue para dar textura técnica */}
      <div className="fixed inset-0 [background-image:linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none" />
      
      {/* Luces vivas (Mesh Gradient) de fondo */}
      <div className="fixed top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-400/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-300/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed top-[40%] left-[60%] w-[500px] h-[500px] bg-indigo-300/15 blur-[100px] rounded-full pointer-events-none" />

      {/* LA CARTA (Efecto Glass sutil, borde transparente y sombra elevada) */}
      <div className="w-full max-w-3xl bg-white/95 backdrop-blur-xl rounded-[32px] border-2 border-white/60 shadow-[0_30px_80px_-15px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/50 relative z-10 px-6 py-14 md:px-16 md:py-20">
        
        {/* Cabecera del Documento */}
        <header className="mb-14 text-center flex flex-col items-center">

          {/* Logo (Asegúrate de tener logo.png en public) */}
          <div className="h-8 md:h-10 w-48 bg-[url('/logo.png')] bg-contain bg-no-repeat bg-center mb-4" />

          <h1 className="text-2xl md:text-3xl font-black text-blue-600 uppercase tracking-[0.15em] mb-10">
            Manifiesto
          </h1>

          <Flag size={50} className="text-emerald-500" strokeWidth={1.5} />

        </header>

        {/* Cuerpo del Manifiesto */}
        <article className="prose prose-slate prose-base md:prose-lg max-w-none font-sans">
          
          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Creemos en el emprendedor.
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              Cada uno de nosotros puede hacer la diferencia aportando sus talentos únicos y creaciones al mundo. Nuestra energía creativa y emprendedora impulsa no solo a nuestros negocios, sino también a nuestras comunidades. <span className="text-blue-600 font-bold">Nuestra misión es dar a cada emprendedor el poder para desatar todo su potencial.</span>
            </p>
          </div>

          {/* Separador sutil */}
          <hr className="border-slate-100 mb-12" />

          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Creemos en el valor de cada ferretería.
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              Quien abre o dirige una ferretería lo hace con un objetivo claro: obtener rentabilidad. Detrás de cada mostrador hay un inversionista que arriesga capital, tiempo y energía esperando resultados reales.
            </p>
            <p className="text-slate-600 leading-relaxed font-medium mt-4">
              Nuestro propósito es acompañar a esos ferreteros independientes con herramientas y conocimiento que conviertan cada decisión en un retorno tangible. Porque su inversión no solo sostiene un negocio o una familia: también impulsa el progreso de su barrio, su ciudad y su país.
            </p>
          </div>

          {/* Separador sutil */}
          <hr className="border-slate-100 mb-12" />

          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Creemos en el potencial de los datos.
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              Antes, el acceso a información clave para tomar decisiones de inversión estaba reservado a grandes cadenas y distribuidores. Hoy, aunque la brecha comienza a cerrarse, sabemos que para los ferreteros independientes sigue siendo difícil contar con análisis claros y accionables. No habrá verdadera igualdad de condiciones hasta que los datos útiles sean accesibles para todos. 
            </p>
            <p className="text-slate-600 leading-relaxed font-medium mt-4">
              Queremos resolver este problema. El poder del análisis de datos no debe quedar en manos de unos pocos expertos en tecnología, sino estar al alcance de todos los ferreteros — desde quien abre su primera tienda hasta quien lleva décadas construyendo y sosteniendo su negocio.
            </p>
          </div>

          {/* Separador sutil */}
          <hr className="border-slate-100 mb-12" />

          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-4 tracking-tight">
              Creemos en la confianza y la independencia.
            </h2>
            <p className="text-slate-600 leading-relaxed font-medium">
              Acompañar al ferretero en su camino significa estar de su lado, siempre. Por eso no tenemos compromisos con ninguna marca, distribuidora o cadena. Tampoco respondemos a inversionistas con intereses ajenos al ferretero. <strong>No tenemos publicidad. No vendemos tus datos.</strong> 
            </p>
            <p className="text-slate-600 leading-relaxed font-medium mt-4">
              Lo único que ofrecemos es valor real: análisis y claridad puestos siempre de tu lado. Esto crea una alineación real: solo ganamos si nuestra herramienta te aporta tanto valor que eliges seguir usándola. Tu éxito es, literalmente, nuestro modelo de negocio.
            </p>
            <p className="text-slate-600 leading-relaxed font-medium mt-4">
              Creemos firmemente que cada ferretero independiente merece la misma oportunidad de convertir sus ideas en resultados reales. Hoy, estamos dedicados a hacerlo posible para todos. Si compartes esta creencia, únete a nosotros. Construyamos juntos el futuro ferretero, desde la confianza y la independencia.
            </p>
          </div>

        </article>

        {/* Footer / CTA Final */}
        <div className="mt-20 flex flex-col items-center text-center">
          <Send size={50} className="text-emerald-500 mb-8" strokeWidth={1.5} />
          
          {/* El botón redirige al home (Landing) donde está el formulario */}
          <Link 
            href="/" 
            className="bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-12 rounded-full shadow-[0_0_30px_-5px_rgba(37,99,235,0.4)] transition-all hover:-translate-y-1 active:scale-95 uppercase tracking-widest text-sm"
          >
            Comienza
          </Link>
        </div>

      </div>
    </main>
  );
}