"use client";
import { redirect } from "next/navigation";
import BlogCard from "@/components/BlogCard";
import { useSession } from "next-auth/react";
import { useFetchBlogs } from "@/hooks/useFetch";
import { FaSpinner } from "react-icons/fa";
import PaginationControl from "@/components/PaginationControl";

const HomePage = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const session = useSession();
  if (session.status === "unauthenticated") redirect("/");

  const { isError, isLoading, data } = useFetchBlogs();

  const page = searchParams["page"] ?? "1";
  const per_page = searchParams["per_page"] ?? "9";

  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const entries = data?.slice(start, end);

  return (
    <div className="min-h-[calc(100vh-4rem)] py-5">
      <h1 className="lg:text-5xl text-center text-xl my-10">All Posted Blog</h1>

      {isLoading ? (
        <FaSpinner className="animate-spin m-auto" size={40} />
      ) : isError ? (
        <p className="text-center text-lg text-red-500">failed to fetch data</p>
      ) : data.length === 0 ? (
        <p className="text-center text-lg">No Post yet</p>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {entries?.map((blog) => <BlogCard key={blog.id} blog={blog} />)}
          </div>
          <PaginationControl
            hasNextPage={end < data.length}
            hasPrevPage={start > 0}
            total_page={Math.ceil(data.length / Number(per_page))}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
