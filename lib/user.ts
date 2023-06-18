import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const getCurrentUserId = async () => {
  const session = await getServerSession(authOptions);

  return prisma.user
    .findUnique({
      where: { email: session?.user?.email ?? '' },
    })
    .then(user => user?.id);
};
