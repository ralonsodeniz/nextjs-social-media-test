import { notFound } from 'next/navigation';
import type { Metadata, NextPage } from 'next';

import type { IPost } from '@/types/post';

const getPost = (slug: string) =>
  fetch('http://localhost:3000/api/content', {
    next: { revalidate: 60 },
  })
    .then(response => response.json())
    .then((posts: IPost[]) => posts.find(post => post.slug === slug));

export const generateMetadata = async ({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const post = await getPost(slug);

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

const BlogPostPage: NextPage<{ params: { slug: string } }> = async ({
  params: { slug },
}) => {
  const post = await getPost(slug);

  return post ? (
    <main>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </main>
  ) : (
    notFound()
  );
};

export default BlogPostPage;
