import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NewBlogPost } from "@/types/types";

export const GET = async () => {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const allBlogs = await prisma.blog.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(allBlogs, { status: 200 });
};

export const POST = async (req: Request) => {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const body: NewBlogPost = await req.json();

  const newBlogPost = await prisma.blog.create({
    data: { ...body, userId: session.user.id },
  });
  return NextResponse.json(newBlogPost, { status: 201 });
};
