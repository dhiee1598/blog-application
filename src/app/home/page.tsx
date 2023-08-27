import PaginationControl from '@/components/PaginationControl';
import formatDate from '@/lib/formatData';
import { BlogUserProps } from '@/types/types';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { authOptions } from '../api/auth/[...nextauth]/route';

const getData = async () => {
  try {
    const response = await axios.get(`${process.env.NEXTAUTH_URL}/api/blogs`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const HomePage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  // ! Check if session is started
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  const page = searchParams['page'] ?? '1';
  const per_page = searchParams['per_page'] ?? '6';
  const start = (Number(page) - 1) * Number(per_page);
  const end = start + Number(per_page);

  const blogUser: BlogUserProps[] = await getData();

  const totalPage = Math.ceil(blogUser.length / Number(per_page));
  const entries = blogUser.slice(start, end);

  return (
    <div className='min-h-[calc(100vh-4rem)] p-1'>
      <h1 className='text-center text-4xl uppercase my-3 lg:text-5xl'>
        <span className='text-yellow-500'>Blog </span>Mania All Post
      </h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 p-2'>
        {entries.map((blog) => (
          <Link
            href={`blog/${blog.id}`}
            key={blog.id}
            className='flex w-full py-2 px-3 h-auto justify-evenly items-center border rounded-md shadow-xl'
          >
            <Image
              src={blog.user.image || `/icons8-test-account-96.png`}
              alt='Profile Picture'
              width={20}
              height={20}
              className='object-contain w-20 rounded-full'
            />
            <div className='w-1/2'>
              <h1 className='font-bold mb-3'>Title: {blog.title}</h1>
              <p className='text-blue-500'>Posted By: {blog.user.name}</p>
              <p className='text-blue-500 text-sm'>Created At: {formatDate(blog.createdAt)}</p>
            </div>
          </Link>
        ))}
      </div>
      <div className='flex justify-center mt-3'>
        <PaginationControl
          totalPage={totalPage}
          hasNextPage={end < blogUser.length}
          hasPrevPage={start > 0}
        />
      </div>
    </div>
  );
};

export default HomePage;
