'use client';

import { usePost } from '@/hooks/use-post';
import { NewBlogPost } from '@/types/types';

import { FormEvent, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect, useRouter } from 'next/navigation';

const INITIAL_DATA: NewBlogPost = {
  title: '',
  author: '',
  content: '',
};

const AddPage = () => {
  const { createPost, isLoading } = usePost(
    'https://blogmania-application.vercel.app/api/blogs'
  );
  const [newBlog, setNewBlog] = useState(INITIAL_DATA);
  const session = useSession();

  if (session.status !== 'authenticated') {
    redirect('/');
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createPost(newBlog);
  };

  return (
    <div className='min-h-[calc(100vh-4rem)] p-5'>
      <h1 className='text-center text-3xl my-3 md:text-5xl'>Add New Post</h1>
      <form className='max-w-[750px] m-auto' onSubmit={handleSubmit}>
        <input
          type='text'
          required
          value={newBlog.title}
          placeholder='Title'
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          className='w-full md:p-3 md:text-lg p-1 mb-1 border border-black rounded-md outline-none'
        />
        <input
          type='text'
          required
          placeholder='Author'
          value={newBlog.author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          className='w-full p-1 border md:p-3 md:text-lg mb-1 border-black rounded-md outline-none'
        />
        <textarea
          placeholder='Content'
          value={newBlog.content}
          required
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          className='w-full p-1 border md:p-3 md:text-lg border-black h-32 rounded-md outline-none'
        />
        <button
          type='submit'
          disabled={isLoading}
          className='w-full text-center md:p-2 md:text-lg mb-1 bg-blue-600 border border-black rounded-md p-1'
        >
          {isLoading ? <FaSpinner className='animate-spin m-auto' size={24} /> : 'Add'}
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

export default AddPage;
