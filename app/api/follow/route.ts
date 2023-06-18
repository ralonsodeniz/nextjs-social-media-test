import { NextResponse, NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prisma';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export const POST = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const cookies = req.cookies.getAll();
  console.log(cookies);
  const { targetUserId } = await req.json();
  const currentUserId = await prisma.user
    .findUnique({
      where: { email: session?.user?.email ?? '' },
    })
    .then(user => user?.id);
  const record = await prisma.follows.create({
    data: {
      followerId: currentUserId ?? '',
      followingId: targetUserId,
    },
  });

  return NextResponse.json(record);
};

export const DELETE = async (req: NextRequest) => {
  const session = await getServerSession(authOptions);
  const targetUserId = req.nextUrl.searchParams.get('targetUserId');
  const currentUserId = await prisma.user
    .findUnique({
      where: { email: session?.user?.email || '' },
    })
    .then(user => user?.id);
  const record = await prisma.follows.delete({
    where: {
      followerId_followingId: {
        followerId: currentUserId ?? '',
        followingId: targetUserId ?? '',
      },
    },
  });

  return NextResponse.json(record);
};
