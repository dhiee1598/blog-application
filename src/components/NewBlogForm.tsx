'use client';

import { usePost } from '@/hooks/use-post';
import { NewBlogPost } from '@/types/types';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const INITIAL_DATA: NewBlogPost = {
  title: '',
  author: '',
  content: '',
};

const NewBlogForm = () => {
  const { createPost, isLoading } = usePost(`/api/blogs`);
  const [newBlog, setNewBlog] = useState(INITIAL_DATA);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createPost(newBlog);
  };
  return (
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
  );
};

export default NewBlogForm;
