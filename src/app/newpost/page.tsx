"use client";

import { usePost } from "@/hooks/usePost";
import { NewBlogPost } from "@/types/types";
import { FormEvent, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const INITIAL_VALUE: NewBlogPost = {
  title: "",
  author: "",
  content: "",
};

const AddBlogPage = () => {
  const [values, setValues] = useState(INITIAL_VALUE);

  const { createBlogPost } = usePost("/api/blogs");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    createBlogPost.mutate(values);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] p-2">
      <h1 className="text-center my-5 text-2xl">Create Blog</h1>
      <form onSubmit={handleSubmit} className="max-w-[550px] m-auto">
        <input
          required
          type="text"
          placeholder="Title"
          value={values.title}
          className="w-full border rounded-md p-2 mb-1 text-base outline-none shadow-md"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, title: e.target.value })
          }
        />
        <input
          required
          type="text"
          placeholder="Author"
          value={values.author}
          className="w-full border rounded-md p-2 mb-1 text-base outline-none shadow-md"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, author: e.target.value })
          }
        />
        <textarea
          required
          placeholder="Content"
          value={values.content}
          className="w-full border rounded-md p-2 mb-1 text-base outline-none shadow-md h-40"
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setValues({ ...values, content: e.target.value })
          }
        />
        <button
          type="submit"
          disabled={createBlogPost.isLoading}
          style={
            createBlogPost.isLoading ? { opacity: "0.8" } : { opacity: "1" }
          }
          className="w-full bg-cyan-500 p-2 text-sm uppercase rounded-md"
        >
          {createBlogPost.isLoading ? (
            <FaSpinner size={23} className="m-auto animate-spin" />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddBlogPage;
