import { IPost } from '@/types/post';

export const getPosts = () =>
  fetch('http://localhost:3000/api/content', {
    next: { revalidate: 60 },
  }).then(response => response.json() as Promise<IPost[]>);
