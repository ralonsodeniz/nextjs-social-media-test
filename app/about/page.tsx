import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Information about who we are',
};

const AboutPage = () => (
  <main>
    <h1>About</h1>
    <p>We are a social media company</p>
  </main>
);

export default AboutPage;
