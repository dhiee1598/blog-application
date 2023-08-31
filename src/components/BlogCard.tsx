"use client";

import Image from "next/image";
import formatDate from "@/lib/formatDate";
import Link from "next/link";
import { BlogCardProps } from "@/types/types";

const BlogCard = ({ blog }: { blog: BlogCardProps }) => {
  return (
    <Link
      href={`/blogs/${blog.id}`}
      key={blog.id}
      className="flex bg-stone-100 border dark:border-none dark:bg-indigo-950 w-full m-auto max-w-[350px] items-center justify-start p-1"
    >
      <figure className="w-20 px-4">
        <Image
          width={40}
          height={30}
          className="object-cover rounded-full"
          src={blog.user.image || "/default-img.png"}
          alt="Profile Pic"
        />
      </figure>
      <div className="flex-1">
        <p className="text-sm font-bold">{`"${blog.title}"`}</p>
        <p className="text-sm mb-1 text-red-500 italic">
          Author: {blog.author}
        </p>
        <p className="text-xs text-cyan-600">Posted by: {blog.user.name}</p>
        <p className="text-xs text-lime-600">{formatDate(blog.createdAt)}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
