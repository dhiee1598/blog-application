'use client';

import { UpdateBlogProps } from '@/types/types';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { env } from '@/lib/env';
import { FormEvent, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const BlogForm = ({ blog }: { blog: UpdateBlogProps }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>();

  const [updateBlog, setUpdateBlog] = useState({
    title: blog.title,
    author: blog.author,
    content: blog.content,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    await axios
      .patch(`${env.NEXTAUTH_URL}/api/blogs/${blog.id}`, updateBlog)
      .then((res) => {
        console.log(res.data);
        setIsLoading(false);
        router.refresh();
        router.push('/profile');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form className='max-w-[750px] m-auto' onSubmit={handleSubmit}>
        <input
          type='text'
          required
          value={updateBlog.title}
          placeholder='Title'
          onChange={(e) => setUpdateBlog({ ...updateBlog, title: e.target.value })}
          className='w-full md:p-3 md:text-lg p-1 mb-1 border border-black rounded-md outline-none'
        />
        <input
          type='text'
          required
          placeholder='Author'
          value={updateBlog.author}
          onChange={(e) => setUpdateBlog({ ...updateBlog, author: e.target.value })}
          className='w-full p-1 border md:p-3 md:text-lg mb-1 border-black rounded-md outline-none'
        />
        <textarea
          placeholder='Content'
          value={updateBlog.content}
          required
          onChange={(e) => setUpdateBlog({ ...updateBlog, content: e.target.value })}
          className='w-full p-1 border md:p-3 md:text-lg border-black h-32 rounded-md outline-none'
        />
        <button
          type='submit'
          disabled={isLoading}
          className='w-full text-center md:p-2 md:text-lg mb-1 bg-blue-600 border border-black rounded-md p-1'
        >
          {isLoading ? <FaSpinner className='animate-spin m-auto' size={24} /> : 'Submit'}
        </button>
        <Link href='/profile'>
          <button className='w-full md:p-2 md:text-lg border bg-red-600 border-black rounded-md p-1'>
            Back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default BlogForm;
