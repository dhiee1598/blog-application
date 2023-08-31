"use client";

import { redirect } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useFetchUser } from "@/hooks/useFetch";
import { FaRegCircle } from "react-icons/fa";
import Link from "next/link";
import UserBlogCard from "@/components/UserBlogCard";

const ProfilePage = () => {
  const session = useSession();
  if (session.data === null) redirect("/");

  const { data, isLoading, isError } = useFetchUser(session.data?.user.id);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-5 px-1">
      {isLoading ? (
        <FaRegCircle size={50} className="animate-ping m-auto my-10" />
      ) : isError ? (
        <h1 className="text-center text-red-500 my-5">
          Failed to fetch data !
        </h1>
      ) : (
        <>
          <div className="flex flex-col items-stretch justify-center max-w-[450px] lg:max-w-[600px] m-auto shadow-lg">
            <figure>
              <Image
                src={data.image || "/default-img.png"}
                alt="Profile picture"
                width={80}
                height={80}
                className="lg:h-36 lg:w-36 object-cover rounded-full m-auto"
              />
            </figure>
            <div className="my-3 mx-3 dark:bg-stone-800 p-4 bg-stone-200 rounded-sm">
              <h1 className="mb-1 text-lg lg:text-xl">Welcome Back!</h1>
              <p className="text-sm lg:text-lg">Name: {data.name}</p>
              <p className="text-sm lg:text-lg">Email: {data.email}</p>
              <p className="text-sm lg:text-lg">Nickname: {data.nickname}</p>
              <p className="text-sm lg:text-lg">Contact: {data.contact}</p>
              <p className="text-sm lg:text-lg">About Me: {data.about}</p>
              <Link href={`/updateusers/${data.id}`}>
                <button
                  className="bg-blue-500 my-1 lg:text-lg rounded-md p-2 text-xs uppercase w-full"
                  type="button"
                >
                  Update
                </button>
              </Link>
              <Link href="/newpost">
                <button
                  className="w-full lg:text-lg bg-blue-500 rounded-md p-2 mb-2 text-xs uppercase"
                  type="button"
                >
                  Add Post
                </button>
              </Link>
            </div>
          </div>
          <div>
            <h1 className="text-center my-5 text-xl">Your Post</h1>
            <p className="text-center">Total: {data.Blog.length}</p>
            <div className="grid max-w-[1000px] m-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.Blog.map((blog) => (
                <UserBlogCard
                  key={blog.id}
                  title={blog.title}
                  author={blog.author}
                  createdAt={blog.createdAt}
                  id={blog.id}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfilePage;
