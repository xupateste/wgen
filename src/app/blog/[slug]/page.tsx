// src/app/blog/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { Zap } from "lucide-react";
import Navbar from "@/components/Navbar";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: `${post.meta.title} | Genio by Ferreteros.app`,
    description: post.meta.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* NAVEGACIÓN (Simplificada para el ejemplo) */}
      <Navbar />

      {/* CABECERA DEL POST (Abarca todo el ancho) */}
      <header className="pt-24 md:pt-38 pb-12 max-w-6xl mx-auto px-6">
        <Link href="/blog" className="text-slate-500 text-sm font-semibold hover:text-blue-600 mb-6 flex items-center gap-2 transition-colors">
          &larr; Todos los artículos
        </Link>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6 leading-[1.1] max-w-4xl tracking-tight">
          {post.meta.title}
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl leading-relaxed">
          {post.meta.description}
        </p>
      </header>

      {/* CONTENEDOR PRINCIPAL (Dos columnas) */}
      <div className="max-w-6xl mx-auto px-6 pb-24 flex flex-col lg:flex-row gap-12 lg:gap-16">
        
        {/* COLUMNA IZQUIERDA: Contenido del Markdown (Más ancha) */}
        <article className="lg:w-2/3 prose prose-lg prose-slate prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 max-w-none">
          {/* Aquí podrías inyectar una imagen de portada si la tuvieras en el MDX */}
          <div className="w-full aspect-[16/9] bg-slate-100 rounded-2xl mb-12 border border-slate-200"></div>
          
          <MDXRemote source={post.content} />
        </article>

        {/* COLUMNA DERECHA: Sidebar Sticky */}
        <aside className="lg:w-1/3">
          {/* El contenedor 'sticky' que se queda fijo al hacer scroll */}
          <div className="sticky top-10 flex flex-col bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            
            {/* Visual simulado del sidebar */}
            <div className="w-full h-32 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl mb-6 flex items-center justify-center border border-blue-100/50">
               <Zap className="text-blue-500 w-10 h-10 opacity-50" />
            </div>

            <h3 className="text-2xl font-bold text-slate-900 leading-tight mb-4">
              Tomar el control de tu stock <span className="text-blue-600">nunca fue tan exacto</span>
            </h3>
            
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              Delega el control matemático de tu inventario y recibe la asesoría de especialistas ferreteros.
            </p>

            {/* Como estamos en el blog (Server Component), un Link es mejor que un botón con onClick para navegar a la Home y abrir el modal */}
            <Link 
              href="/" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-colors flex justify-center items-center shadow-sm"
            >
              Asegurar mi lugar
            </Link>
          </div>
        </aside>

      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}