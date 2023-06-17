import { getPosts } from '@/app/blog/http/handlers';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'List of blog entries',
};

const Blog = async () => {
  const posts = await getPosts();

  return (
    <main>
      <h1>Welcome to the Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Blog;
