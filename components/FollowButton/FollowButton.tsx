import { getCurrentUserId } from '@/lib/user';
import { prisma } from '@/lib/prisma';
import ClientButton from '@/components/FollowButton/components/ClientButton';

interface IFollowButton {
  targetUserId: string;
}

const FollowButton = async ({ targetUserId }: IFollowButton) => {
  const currentUserId = await getCurrentUserId();
  const isFollowing = !!(await prisma.follows.findFirst({
    where: { followerId: currentUserId, followingId: targetUserId },
  }));
  return <ClientButton targetUserId={targetUserId} isFollowing={isFollowing} />;
};

export default FollowButton;
