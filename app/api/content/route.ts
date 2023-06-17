import { NextResponse } from 'next/server';
import post from '@/public/posts.json';

export const GET = async () => {
  return NextResponse.json(post);
};
