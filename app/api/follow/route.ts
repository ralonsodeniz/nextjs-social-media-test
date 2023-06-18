import { NextResponse, NextRequest } from 'next/server';

import { prisma } from '@/lib/prisma';
import { getCurrentUserId } from '@/lib/user';

export const POST = async (req: NextRequest) => {
  const { targetUserId } = await req.json();
  const currentUserId = await getCurrentUserId();
  const record = await prisma.follows.create({
    data: {
      followerId: currentUserId ?? '',
      followingId: targetUserId,
    },
  });

  return NextResponse.json(record);
};

export const DELETE = async (req: NextRequest) => {
  const targetUserId = req.nextUrl.searchParams.get('targetUserId');
  const currentUserId = await getCurrentUserId();
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
