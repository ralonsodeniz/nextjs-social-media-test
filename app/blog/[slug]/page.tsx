import { notFound } from 'next/navigation';
import type { Metadata, NextPage } from 'next';

import { getPosts } from '@/app/blog/http/handlers';
import type { IPost } from '@/types/post';

interface IBlogPost {
  params: { slug: string };
}

export const generateMetadata = async ({
  params: { slug },
}: IBlogPost): Promise<Metadata> => {
  const post = await getPosts().then(posts =>
    posts.find(post => post.slug === slug),
  );

  return {
    title: post?.title ?? '',
  };
};

export const generateStaticParams = async () => {
  const posts: IPost[] = await fetch('http://localhost:3000/api/content').then(
    response => response.json(),
  );

  return posts.map(post => ({ slug: post.slug }));
};

const BlogPost: NextPage<IBlogPost> = async ({ params: { slug } }) => {
  const post = await getPosts().then(posts =>
    posts.find(post => post.slug === slug),
  );
  return post ? (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  ) : (
    notFound()
  );
};

export default BlogPost;
