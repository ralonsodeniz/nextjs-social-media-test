'use client';

import { signIn, useSession } from 'next-auth/react';

import Link from 'next/link';
import Image from 'next/image';
import Spinner from '@/components/Spinner';
import SignOut from '@/layout/NavMenu/AuthButtons/SingOut';

import styles from './AuthButtons.module.css';

const SingIn = () => {
  const { status, data: session } = useSession();
  const userAvatar = (
    <div className={styles.avatar}>
      <Link href="/dashboard">
        <Image
          src={session?.user?.image ?? '/mememan.webp'}
          alt={`${session?.user?.name ?? 'user'}'s avatar`}
          width={32}
          height={32}
        />
      </Link>
      <SignOut />
    </div>
  );
  const loadedStatusMarkUp =
    status === 'authenticated' ? (
      userAvatar
    ) : (
      <button onClick={() => signIn()}>Sign in</button>
    );

  return status === 'loading' ? <Spinner /> : loadedStatusMarkUp;
};

export default SingIn;
