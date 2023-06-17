import Image from 'next/image';
import Link from 'next/link';

import Buttons from './AuthButtons';

import styles from './NavMenu.module.css';

const NavMenu = () => (
  <nav className={styles.nav}>
    <Link href="/">
      <Image src="/logo.svg" alt="nextmedia logo" width={216} height={30} />
    </Link>
    <ul className={styles.links}>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <Link href="/users">Users</Link>
      </li>
      <li>
        <Buttons.SignIn />
      </li>
    </ul>
  </nav>
);

export default NavMenu;
