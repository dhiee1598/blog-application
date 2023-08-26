import { authOptions } from '@/lib/authOptions';
import { prisma } from '@/lib/prisma';
import { UpdatePageProps } from '@/types/types';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export const GET = async (req: Request) => {
  const userId = req.url.slice(req.url.lastIndexOf('/') + 1).toString();

  // ! Check if User ID is valid
  const checkUserId = await prisma.user.findFirst({
    where: { id: userId },
    include: { Blog: { orderBy: { createdAt: 'desc' } } },
  });
  if (!checkUserId)
    return NextResponse.json({ message: 'User ID not found' }, { status: 404 });

  return NextResponse.json(checkUserId);
};

export const PATCH = async (req: Request) => {
  // ! Check for session
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

  const userId = req.url.slice(req.url.lastIndexOf('/') + 1).toString();

  // ! Check if User ID is valid
  const checkUserId = await prisma.user.findFirst({ where: { id: userId } });
  if (!checkUserId)
    return NextResponse.json({ message: 'User ID not found' }, { status: 404 });

  // ! Check for required fields is not empty
  const body = (await req.json()) as UpdatePageProps;
  if (!body.username || !body.aboutMe || !body.contact)
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });

  const updateUserInfo = await prisma.user.update({
    data: { username: body.username, aboutMe: body.aboutMe, contact: body.contact },
    where: { id: session.user.id },
  });

  if (!updateUserInfo)
    return NextResponse.json({ message: 'Something went wrong!' }, { status: 400 });

  return NextResponse.json(
    { message: 'Updated Profile Information Successfully', data: updateUserInfo },
    { status: 200 }
  );
};
