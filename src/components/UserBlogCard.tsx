"use client";

import formatDate from "@/lib/formatDate";
import Link from "next/link";
import { UserBlogCardProps } from "@/types/types";

const UserBlogCard = ({ id, title, author, createdAt }: UserBlogCardProps) => {
  return (
    <Link
      href={`/blogs/${id}`}
      className="flex text-center bg-stone-100 border dark:border-none dark:bg-slate-800 w-full m-auto max-w-[350px] items-center justify-evenly shadow-md p-1"
    >
      <div>
        <p className="text-sm font-bold">{`"${title}"`}</p>
        <p className="text-sm mb-1 text-red-500 italic">Author: {author}</p>
        <p className="text-xs text-lime-600">
          Created on: {formatDate(createdAt)}
        </p>
      </div>
    </Link>
  );
};

export default UserBlogCard;
