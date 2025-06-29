import { MDXRemoteSerializeResult } from "next-mdx-remote";

interface PostMeta {
  title: string;
  date: string;
  excerpt: string;
  author: string;
  cover?: string;
  partner?: string;
  partnerLogo?: string;
  partnerUrl?: string;
}

export interface Post {
  slug: string;
  meta: PostMeta;
  content: string; // original raw content, provavelmente não usado aqui diretamente
  mdxSource: MDXRemoteSerializeResult;  // conteúdo processado pelo next-mdx-remote
}