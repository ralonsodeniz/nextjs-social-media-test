import type { Metadata } from 'next';

import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import FollowButton from '@/components/FollowButton';

export const dynamic = 'force-dynamic';

interface IUserProfile {
  params: {
    id: string;
  };
}

const getUser = (id: string) => prisma.user.findUnique({ where: { id } });

export const generateMetadata = async ({
  params: { id },
}: IUserProfile): Promise<Metadata> => {
  const user = await getUser(id);

  return {
    title: `${user?.name ?? 'meme'}'s profile`,
  };
};

const UserProfile = async ({ params: { id } }: IUserProfile) => {
  const user = await getUser(id);
  if (!user) notFound();
  const { image, name, bio } = user;

  return (
    <main>
      <h1>{name}</h1>
      <Image
        src={image ?? '/mememan.webp'}
        alt={`${name}'s avatar`}
        width={300}
        height={300}
        style={{ objectFit: 'cover', marginBottom: '0.5 rem' }}
      />
      <h3>Bio</h3>
      <p>{bio ?? 'info not available'}</p>
      <FollowButton targetUserId={id} />
    </main>
  );
};

export default UserProfile;
