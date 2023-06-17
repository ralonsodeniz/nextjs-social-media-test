import Image from 'next/image';
import type { Metadata } from 'next';

import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Home',
  description: 'We are a social media app',
};

export default function Home() {
  return <main className={styles.main}></main>;
}
