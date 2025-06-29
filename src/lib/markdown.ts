import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypeHighlight from 'rehype-highlight'; // opcional
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'src', 'content');

export function getPostSlugs() {
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
}

function generateExcerpt(content: string, wordLimit = 40): string {
  const words = content.split(/\s+/); // separa por espaços
  if (words.length <= wordLimit) return content; // se for curto, retorna tudo
  const excerpt = words.slice(0, wordLimit).join(' ');
  return excerpt + '...';
}


export function getPostBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx?$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug: realSlug,
    meta: {...data, excerpt: generateExcerpt(content)},
    content,
  };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  const posts = slugs.map((slug) => {
    const { slug: realSlug, meta } = getPostBySlug(slug);
    return {
      slug: realSlug,
      meta,
    };
  });

  // Ordena por data decrescente
  return posts.sort((a, b) => {
    return new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime();
  });
}


export async function getPostHtml(slug: string) {
  const { meta, content } = getPostBySlug(slug);

  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeHighlight],
    },
  });

  return {
    meta,
    slug,
    content,
    mdxSource,
  };
}
