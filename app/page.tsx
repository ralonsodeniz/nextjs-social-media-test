import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'We are a social media app',
};

const Home = () => (
  <main>
    <h1>Hello!</h1>
  </main>
);

export default Home;
