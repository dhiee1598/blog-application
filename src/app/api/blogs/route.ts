import { prisma } from '@/lib/prisma';
import { NewBlogPost } from '@/types/types';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/[...nextauth]/route';
import { revalidatePath } from 'next/cache';

export const GET = async () => {
  const allBlog = await prisma.blog.findMany({
    include: { user: true },
    orderBy: { createdAt: 'desc' },
  });
  return NextResponse.json(allBlog, { status: 200 });
};

export const POST = async (req: Request) => {
  // ! Check for session
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  // ! Check for required fields is not empty
  const body = (await req.json()) as NewBlogPost;
  if (!body.title || !body.author || !body.content)
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });

  const newBlog = await prisma.blog.create({
    data: {
      title: body.title,
      author: body.author,
      content: body.content,
      userId: session.user.id,
    },
  });

  NextResponse.json({ message: 'New Blog Created', data: newBlog }, { status: 201 });
  return NextResponse.redirect('/profile');
};
