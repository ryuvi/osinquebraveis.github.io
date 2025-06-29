// import BlogCard from "@components/BlogCard";
import { getAllPosts } from "@lib/markdown"; // função que você já deve ter
import { Post } from "@interfaces/post";
import Link from 'next/link'
import Image from 'next/image'
import Header from "@components/Header";
import Footer from "@components/Footer";

type BlogCardProps = {
  post: Post;
  index: number;
};

function BlogCard({ post, index }: BlogCardProps) {
  const { slug, meta } = post;
  const delay = index * 100;
  const formattedDate = new Date(meta.date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link href={`/${slug}`} data-aos="fade-up" data-aos-delay={delay}>
      <article className="group rounded-2xl border border-gray-200 bg-orange-50 p-6 shadow transition-all duration-200 hover:shadow-lg hover:border-gray-300 md:flex">
        
        {/* Imagem de capa */}
        {meta.cover && (
          <Image
            src={'/' + meta.cover}
            alt={`Capa do post: ${meta.title}`}
            width={512}
            height={512}
            className="w-full md:max-w-1/3 md:max-h-1/3 object-cover rounded-lg mr-4"
          />
        )}

        <header className="flex flex-col">
          <time
            className="text-sm text-gray-500 mt-2 md:mt-0"
            dateTime={new Date(meta.date).toISOString()}
          >
            {formattedDate}
          </time>
          <h2 className="text-xl mb-2 font-semibold text-gray-800 group-hover:text-primary transition-colors">
            {meta.title}
          </h2>
          <p className="text-gray-400 text-sm text-justify line-clamp-3">
            {meta.excerpt || 'Leia mais...'}
          </p>
          <small className="inline-block text-sky-500 text-xs text-right w-full mt-5 md:mt-auto self-end">Veja mais</small>
        </header>
      </article>
    </Link>
  );
}

export default async function BlogListPage() {
  const posts = (await getAllPosts()) as Post[]; // função que retorna todos os posts

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      <Header />
      <main className="mt-10 md:mt-5 px-6 h-full w-full md:w-2/3 justify-center self-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-12">
          Nossas Matérias
        </h1>

        <div className="grid gap-12 mx-auto">
          {posts.map((post, index) => (
            <BlogCard post={post} key={post.slug} index={index} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
