import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { NewBlogPost } from '@/types/types';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  // ! Check if Blog ID is valid
  const blogId = req.url.slice(req.url.lastIndexOf('/') + 1).toString();
  const findBlog = await prisma.blog.findFirst({
    where: { id: blogId },
    include: { user: true },
  });

  if (!findBlog) return NextResponse.json({ message: 'Blog ID not found' }, { status: 404 });

  return NextResponse.json(findBlog, { status: 200 });
};

export const PATCH = async (req: Request) => {
  // ! Check for session
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  // ! Check if Blog ID is valid
  const blogId = req.url.slice(req.url.lastIndexOf('/') + 1).toString();
  const findBlog = await prisma.blog.findFirst({
    where: { id: blogId },
    include: { user: true },
  });

  if (!findBlog) return NextResponse.json({ message: 'Blog ID not found' }, { status: 404 });

  // ! Check for required fields is not empty
  const body = (await req.json()) as NewBlogPost;
  if (!body.title || !body.author || !body.content)
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });

  const updateBlog = await prisma.blog.update({
    data: { title: body.title, author: body.author, content: body.content },
    where: { userId: session.user.id, id: blogId },
  });

  if (!updateBlog)
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 400 });

  return NextResponse.json(
    { message: 'Updated Blog Successfully', data: updateBlog },
    { status: 200 }
  );
};

export const DELETE = async (req: Request) => {
  // ! Check for session
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  // ! Check if Blog ID is valid
  const blogId = req.url.slice(req.url.lastIndexOf('/') + 1).toString();
  const findBlog = await prisma.blog.findFirst({
    where: { id: blogId },
  });

  if (!findBlog) return NextResponse.json({ message: 'Blog ID not found' }, { status: 404 });

  const deleteBlog = await prisma.blog.delete({
    where: { id: blogId, userId: session.user.id },
  });

  if (!deleteBlog)
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 400 });

  return NextResponse.json({ message: 'Blog Deleted Succesfully' }, { status: 200 });
};
