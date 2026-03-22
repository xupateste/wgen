// src/lib/blog.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDirectory = path.join(process.cwd(), "src/content/blog");

export async function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "");
  const fullPath = path.join(blogDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  
  // matter extrae la metadata (title, date) del contenido
  const { data, content } = matter(fileContents);
  
  return { slug: realSlug, meta: data, content };
}

export async function getAllPosts() {
  const files = fs.readdirSync(blogDirectory);
  const posts = files.map((fileName) => {
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(fileContents);
    
    return {
      slug: fileName.replace(/\.mdx$/, ""),
      meta: data,
    };
  });

  // Ordenar por fecha (más recientes primero)
  return posts.sort((a, b) => (new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()));
}