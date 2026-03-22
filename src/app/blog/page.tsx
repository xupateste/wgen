// src/app/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "@/lib/blog";
import { Zap } from "lucide-react";
import Navbar from "@/components/Navbar";

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      
      {/* NAV (Mismo estilo que la Landing) */}
      <Navbar />

      {/* HEADER DEL BLOG */}
      <header className="py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-slate-900 mb-4">
          Blog
        </h1>
        <p className="text-slate-500 text-sm md:text-base">
          Guías, cálculos y estrategias para optimizar tu ferretería con Genio.
        </p>
      </header>

      {/* CUADRÍCULA DE TARJETAS (Estilo Kleo) */}
      <main className="max-w-[1200px] mx-auto px-6 pb-24 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts.map((post) => (
            <Link href={`/blog/${post.slug}`} key={post.slug} className="group flex flex-col bg-white border border-slate-200 rounded-2xl p-4 md:p-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-slate-300 transition-all h-full">
              
              {/* Contenedor de Imagen Destacada (Aspect Ratio 16:9) */}
              {/* Si luego agregas 'image: "/ruta.jpg"' al MDX, puedes usar un tag <img> aquí */}
              <div className="w-full aspect-[16/10] bg-gradient-to-br from-blue-50 to-slate-100 rounded-xl mb-5 flex items-center justify-center overflow-hidden border border-slate-100">
                <div className="text-blue-500 opacity-20 group-hover:scale-110 transition-transform duration-500">
                  <Zap size={64} fill="currentColor" />
                </div>
              </div>

              {/* Título (Sin fecha ni descripción) */}
              <h2 className="text-[17px] font-bold text-slate-900 leading-snug mb-6 line-clamp-3">
                {post.meta.title}
              </h2>

              {/* Botón de Leer Más (Empuja hacia abajo para alinear las tarjetas) */}
              <div className="mt-auto">
                <div className="w-full py-2.5 rounded-lg border border-slate-200 text-center text-xs font-semibold text-slate-700 uppercase tracking-wide group-hover:border-blue-600 group-hover:text-blue-600 transition-colors">
                  Leer artículo
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

    </div>
  );
}