import ButtonSignOut from '@/components/ButtonSignOut';
import { authOptions } from '@/lib/authOptions';
import { UserBlogProps } from '@/types/types';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const getData = async (id: string) => {
  const response = await axios.get(`http://localhost:3000/api/blogs/user/${id}`);
  return response.data;
};

const ProfilePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const userBlog: UserBlogProps = await getData(session?.user.id);

  return (
    <div className=' max-w-[800px] shadow-xl m-auto min-h-[calc(100vh-4rem)] pt-3'>
      <div className='  flex justify-evenly items-center p-5'>
        <figure>
          <Image
            src='/icons8-test-account-96.png'
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
        <h1 className='text-center text-xl pt-5'>Total Post: 4</h1>
      </div>
    </div>
  );
};

export default ProfilePage;
