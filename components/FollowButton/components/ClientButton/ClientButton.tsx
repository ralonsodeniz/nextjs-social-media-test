'use client';

import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import Spinner from '@/components/Spinner';

import styles from './ClientButton.module.css';

interface IClientButton {
  targetUserId: string;
  isFollowing: boolean;
}

const ClientButton = ({ targetUserId, isFollowing }: IClientButton) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const isMutating = isFetching || isPending;
  const buttonText = isFollowing ? 'Unfollow' : 'Follow';
  const buttonLoadingMarkup = (
    <>
      <span className={styles.span}>
        {isFollowing ? 'Unfollowing' : 'Following'}
      </span>{' '}
      <Spinner />
    </>
  );

  const handleFollow = async () => {
    setIsFetching(true);
    await fetch('/api/follow', {
      method: 'POST',
      body: JSON.stringify({ targetUserId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setIsFetching(false);
    startTransition(() => router.refresh());
  };

  const handleUnfollow = async () => {
    setIsFetching(true);
    await fetch(`/api/follow?targetUserId=${targetUserId}`, {
      method: 'DELETE',
    });
    setIsFetching(false);
    startTransition(() => router.refresh());
  };

  return (
    <button
      className={styles.button}
      type="button"
      onClick={isFollowing ? handleUnfollow : handleFollow}
    >
      {isMutating ? buttonLoadingMarkup : buttonText}
    </button>
  );
};

export default ClientButton;
