import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export const GET = async () => {
  const blogs = await prisma.blog.findMany({ include: { user: true } });

  return NextResponse.json(blogs, { status: 200 });
};
