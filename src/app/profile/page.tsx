import ButtonSignOut from '@/components/ButtonSignOut';
import formatDate from '@/lib/formatData';
import { UserBlogProps } from '@/types/types';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { env } from '@/lib/env';

const getData = async (id: string) => {
  try {
    const response = await axios.get(`${env.NEXTAUTH_URL}/api/blogs/user/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const userBlog: UserBlogProps = await getData(session?.user.id);

  return (
    <div className=' max-w-[800px] shadow-xl m-auto min-h-[calc(100vh-4rem)] py-5'>
      <div className='  flex justify-evenly items-center p-5'>
        <figure>
          <Image
            src={userBlog.image || '/icons8-test-account-96.png'}
            alt='Profile Pic'
            width={100}
            height={100}
            className='object-cover md:h-40 md:w-40'
          />
        </figure>
        <div className='ml-3'>
          <h1 className='text-xl mb-1 font-bold uppercase'>Profile Information</h1>
          <p>
            <span className='font-bold'>Name:</span> {userBlog.name}
          </p>
          <p>
            <span className='font-bold'>Email:</span> {userBlog.email}
          </p>
          <p>
            <span className='font-bold'>Username:</span> {userBlog.username}
          </p>
          <p>
            <span className='font-bold'>Contact:</span> {userBlog.contact}
          </p>
          <p className='mb-3'>
            <span className='font-bold'>About Me:</span> {userBlog.aboutMe}
          </p>
          <Link
            href='/update'
            className='border mr-1 bg-blue-500 border-black rounded-md w-auto px-2 md:px-4 py-1'
          >
            Update
          </Link>
          <Link
            href='/addpost'
            className='border mr-1 bg-blue-500 border-black rounded-md w-auto px-2 md:px-4 py-1'
          >
            Add Post
          </Link>
          <ButtonSignOut />
        </div>
      </div>
      <div>
        <h1 className='text-center text-xl pt-5'>Total Post: {userBlog.Blog.length}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3 p-2'>
          {userBlog.Blog.map((blog) => (
            <Link
              key={blog.id}
              href={`blog/${blog.id}`}
              className='shadow-xl p-3 text-center h-auto w-full'
            >
              <h1 className='font-bold text-lg'>Title: {blog.title}</h1>
              <p className='text-base italic text-red-500'>Author: {blog.author}</p>
              <p className='text-xs text-blue-500'>Created At: {formatDate(blog.createdAt)}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
