import { prisma } from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  const users = await prisma.user.findMany();

  return NextResponse.json(users);
};
