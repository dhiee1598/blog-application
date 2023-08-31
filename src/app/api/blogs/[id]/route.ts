import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NewBlogPost } from "@/types/types";

export const GET = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const blogId = req.url.slice(req.url.lastIndexOf("/") + 1).toString();

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const blog = await prisma.blog.findFirst({
    where: { id: blogId },
    include: { user: true },
  });
  if (!blog)
    return NextResponse.json({ message: "Blog ID not found" }, { status: 404 });

  return NextResponse.json(blog, { status: 200 });
};

export const PATCH = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const blogId = req.url.slice(req.url.lastIndexOf("/") + 1).toString();

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const blog = await prisma.blog.findFirst({ where: { id: blogId } });
  if (!blog)
    return NextResponse.json({ message: "Blog ID not found" }, { status: 404 });

  const body = (await req.json()) as NewBlogPost;

  const updateBlog = await prisma.blog.update({
    data: { title: body.title, author: body.author, content: body.content },
    where: { id: blogId, userId: session.user.id },
  });

  return NextResponse.json(updateBlog, { status: 200 });
};

export const DELETE = async (req: Request) => {
  const session = await getServerSession(authOptions);
  const blogId = req.url.slice(req.url.lastIndexOf("/") + 1).toString();

  if (!session)
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const blog = await prisma.blog.findFirst({ where: { id: blogId } });
  if (!blog)
    return NextResponse.json({ message: "Blog ID not found" }, { status: 404 });

  await prisma.blog.delete({
    where: { id: blogId, userId: session.user.id },
  });

  return NextResponse.json(
    { message: "Deleted Successfully" },
    { status: 200 },
  );
};
