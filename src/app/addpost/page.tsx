'use client';

import { usePost } from '@/hooks/use-post';
import { NewBlogPost } from '@/types/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

const INITIAL_DATA: NewBlogPost = {
  title: '',
  author: '',
  content: '',
};

const AddPage = () => {
  const { createPost, isLoading, isSuccess } = usePost('http://localhost:3000/api/blogs');
  const [newBlog, setNewBlog] = useState(INITIAL_DATA);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createPost(newBlog);
    if (isSuccess) {
      router.push('/profile');
    }
  };
  return (
    <div className='min-h-[calc(100vh-4rem)] p-5'>
      <h1 className='text-center text-3xl my-3'>Add New Post</h1>
      <form className='w-full m-auto' onSubmit={handleSubmit}>
        <input
          type='text'
          required
          value={newBlog.title}
          placeholder='Title'
          onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
          className='w-full p-1 mb-1 border border-black rounded-md outline-none'
        />
        <input
          type='text'
          required
          placeholder='Author'
          value={newBlog.author}
          onChange={(e) => setNewBlog({ ...newBlog, author: e.target.value })}
          className='w-full p-1 border mb-1 border-black rounded-md outline-none'
        />
        <textarea
          placeholder='Content'
          value={newBlog.content}
          required
          onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
          className='w-full p-1 border border-black h-32 rounded-md outline-none'
        />
        <button
          type='submit'
          disabled={isLoading}
          className='w-full mb-1 bg-blue-600 border border-black rounded-md p-1'
        >
          {isLoading ? 'Adding...' : 'Submit'}
        </button>
        <Link href='/profile'>
          <button className='w-full border bg-red-600 border-black rounded-md p-1'>
            Back
          </button>
        </Link>
      </form>
    </div>
  );
};

export default AddPage;
