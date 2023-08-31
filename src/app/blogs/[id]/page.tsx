"use client";

import { useFetchBlog } from "@/hooks/useFetch";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { FaSpinner } from "react-icons/fa";
import { useDeleteBlog } from "@/hooks/usePost";

const BlogPage = ({ params }: { params: { id: string } }) => {
  const session = useSession();
  const router = useRouter();
  if (session.status !== "authenticated") redirect("/");

  const { data, isLoading, isError } = useFetchBlog(params.id);
  const { deleteBlog } = useDeleteBlog();
  const deleteBlogUsers = (id: string) => {
    deleteBlog.mutate(id);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-4 shadow-md">
      {isLoading ? (
        <FaSpinner size={40} className="animate-spin m-auto" />
      ) : isError ? (
        <p>Failed to Fetch Data</p>
      ) : (
        <div className="flex flex-col justify-center items-center">
          <figure>
            <Image
              src={data.user.image || "/default-img.png"}
              alt="Profile Picture"
              width={50}
              height={50}
              className="lg:h-36 w-36 object-cover"
            />
          </figure>
          <h1 className="text-2xl font-bold mt-5">{`"${data.title}"`}</h1>
          <p className="italic text-red-500 lg:text-xl">
            Author: {data.author}
          </p>
          <p className="text-sm text-cyan-600 lg:text-xl">
            Posted by: {data.user.name}
          </p>
          <p className="mt-5 whitespace-pre-wrap lg:text-xl">{`"${data.content}"`}</p>
          {session.data.user.id === data.user.id && (
            <>
              <button
                onClick={() => router.push(`/updateblog/${data.id}`)}
                className="w-full bg-blue-500 text-sm uppercase p-1 max-w-[400px] lg:text-lg mt-10 mb-1 rounded-md"
              >
                Update
              </button>
              <button
                type="button"
                disabled={deleteBlog.isLoading}
                style={
                  deleteBlog.isLoading ? { opacity: "0.7" } : { opacity: "1" }
                }
                onClick={() => deleteBlogUsers(data.id)}
                className="w-full bg-red-500 text-sm uppercase p-1 rounded-md max-w-[400px] lg:text-xl"
              >
                Delete
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogPage;
