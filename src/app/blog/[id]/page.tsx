import { BlogUserProps } from '@/types/types';
import { redirect } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import formatDate from '@/lib/formatData';
import ButtonUpdateDelete from '@/components/ButtonUpdateDelete';
import { getServerSession } from 'next-auth';

import Link from 'next/link';
import { Metadata } from 'next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const getData = async (value: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/blogs/${value}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const generateMetadata = async ({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> => {
  const blog: BlogUserProps = await getData(params.id);
  return {
    title: `${blog.title} - Blog Mania`,
    description: `Created by: ${blog.user.name}`,
  };
};

const BlogPage = async ({ params }: { params: { id: string } }) => {
  const blog: BlogUserProps = await getData(params.id);
  const session = await getServerSession(authOptions);

  if (!blog || !session) redirect('/');

  return (
    <div className='min-h-[calc(100vh-4rem)] flex justify-start items-center flex-col p-3 shadow-xl max-w-[750px] m-auto'>
      <Image
        src={blog.user.image || '/icons8-test-account-96.png'}
        alt='Profile Pic'
        width={100}
        height={100}
        className='rounded-full'
      />
      <h1 className='text-3xl mt-3 font-bold'>{`"${blog.title}"`}</h1>
      <p className='text-lg italic text-red-500'>Author: {blog.author}</p>
      <p className='text-base text-blue-500 mb-5'>Posted By: {blog.user.name}</p>
      <p className='whitespace-pre-wrap mb-5'>{`"${blog.content}"`}</p>
      {blog.userId === session.user.id && <ButtonUpdateDelete id={blog.id} />}
      <Link
        className='mt-1 md:text-lg border border-black rounded-md bg-blue-500 px-5 py-1 w-auto'
        href='/home'
      >
        Back
      </Link>
    </div>
  );
};

export default BlogPage;
