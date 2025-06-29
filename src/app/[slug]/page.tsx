import { getPostHtml, getPostSlugs } from "@lib/markdown";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Post } from "@interfaces/post";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.mdx?$/, ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = (await getPostHtml(params.slug)) as Post;
    return {
      title: post.meta.title,
      description: post.meta.excerpt || "",
    };
  } catch {
    return {
      title: "Post não encontrado",
    };
  }
}

function slugify(text: string): string {
  return text
    .normalize("NFD") // separa acentos das letras
    .replace(/[\u0300-\u036f]/g, "") // remove os acentos
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // remove caracteres especiais
    .replace(/\s+/g, "-") // troca espaços por hífens
    .replace(/-+/g, "-"); // remove hífens duplicados
}

export function ImageDisplay({ title }: { title: string }) {
  const src = `/blog-imgs/${slugify(title)}.jpg`;

  return (
    <div className="flex flex-col items-center my-6">
      <div style={{ height: "fit-content", width: "fit-content" }}>
        <img
          src={src}
          alt={title}
          style={{
            width: "500px",
            marginTop: "0 !important",
            marginBottom: "0 !important",
          }}
          className="object-coverrounded"
        />
      </div>
      <p className="text-center mt-2 text-sm text-gray-500 italic">{title}</p>
    </div>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = params;

  try {
    const post = (await getPostHtml(slug)) as Post;
    const formattedDate = new Date(post.meta.date).toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return (
      <main className="bg-orange-50/50">
        <Header />
        <article className="container mx-auto px-4 py-8 max-w-3xl">
          <header className="mb-6">
            <h1 className="text-4xl font-bold mb-2">{post.meta.title}</h1>
            <h5>
              <b>Autora:</b> {post.meta.author}
            </h5>
            <time className="text-sm text-gray-500">{formattedDate}</time>
          </header>
          <hr className="mb-6" />
          <section className="prose prose-stone prose-p:text-justify prose-ul:leading-2 max-w-none">
            <MDXRemote source={post.content} components={{ ImageDisplay }} />
          </section>
        </article>
        <Footer />
      </main>
    );
  } catch (err) {
    console.error(err)
    notFound();
  }
}
