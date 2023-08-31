import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { UserProps } from "@/types/types";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = req.url.slice(req.url.lastIndexOf("/") + 1).toString();

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findFirst({
    where: { id: userId },
    include: { Blog: { orderBy: { createdAt: "desc" } } },
  });
  if (!user)
    return NextResponse.json({ message: "User ID not found" }, { status: 404 });

  return NextResponse.json(user, { status: 200 });
};

export const PATCH = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const userId = req.url.slice(req.url.lastIndexOf("/") + 1).toString();

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findFirst({ where: { id: userId } });
  if (!user)
    return NextResponse.json({ message: "User ID not found" }, { status: 404 });

  const body = (await req.json()) as UserProps;

  const updateUser = await prisma.user.update({
    data: { contact: body.contact, nickname: body.nickname, about: body.about },
    where: { id: userId },
  });

  return NextResponse.json(updateUser, { status: 200 });
};
