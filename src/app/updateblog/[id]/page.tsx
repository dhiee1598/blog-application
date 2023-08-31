"use client";

import { useFetchBlog } from "@/hooks/useFetch";
import { useUpdateBlog } from "@/hooks/usePost";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { FaRegCircle } from "react-icons/fa";

const UpdateBlog = ({ params }: { params: { id: string } }) => {
  const session = useSession();
  if (session.data === null) redirect("/");

  const { data, isError, isLoading } = useFetchBlog(params.id);

  if (data?.userId !== session.data.user.id) redirect("/home");

  const { updateBlogs } = useUpdateBlog(`/api/blogs/${params.id}`);
  const [updateValue, setUpdateValue] = useState({
    title: data?.title,
    author: data?.author,
    content: data?.content,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    updateBlogs.mutate(updateValue);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-1">
      {isLoading ? (
        <FaRegCircle size={40} className="m-auto my-10 animate-ping" />
      ) : isError ? (
        <p>Invalid Blog ID</p>
      ) : (
        <>
          <h1 className="my-10 text-xl lg:text-5xl text-center">Update Blog</h1>
          <form onSubmit={handleSubmit} className="max-w-[550px] m-auto">
            <input
              required
              type="text"
              placeholder={data.title}
              value={updateValue.title}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUpdateValue({ ...updateValue, title: e.target.value })
              }
              className="w-full p-2 text-lg rounded-md outline-none mb-1"
            />
            <input
              type="text"
              required
              placeholder={data.author}
              value={updateValue.author}
              className="w-full p-2 text-lg rounded-md mb-1 outline-none "
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUpdateValue({ ...updateValue, author: e.target.value })
              }
            />
            <textarea
              required
              placeholder={data.content}
              value={updateValue.content}
              className="w-full p-2 text-lg rounded-md h-40 outline-none mb-1"
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setUpdateValue({ ...updateValue, content: e.target.value })
              }
            />
            <button
              type="submit"
              disabled={updateBlogs.isLoading}
              style={
                updateBlogs.isLoading ? { opacity: "0.7" } : { opacity: "1" }
              }
              className="w-full uppercase text-sm p-2 bg-blue-600 rounded-md lg:text-xl"
            >
              Update
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default UpdateBlog;
