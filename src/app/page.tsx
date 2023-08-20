import { BlogWithUsers } from '@/types/types';
import Image from 'next/image';
import axios from 'axios';

const getData = async () => {
  const response = await axios.get('http://localhost:3000/api/blogs');

  return response.data;
};

const HomePage = async () => {
  const blogs: BlogWithUsers[] = await getData();

  return (
    <div>
      <div className='min-h-[calc(100vh-4rem)] bg-gray-900 flex justify-center items-center text-center p-4'>
        <div>
          <h1 className='text-5xl mb-10 font-bold drop-shadow-xl uppercase text-yellow-600 lg:text-6xl'>
            Welcome to Blog Mania!
          </h1>
          <p className='mb-3 text-blue-400 font-light lg:text-xl'>
            Where you can share your blog all around the world!
          </p>
          <input
            type='text'
            className='border-2 w-full border-black rounded-md p-3 text-base md:w-1/3 lg:w-1/2'
            placeholder='Search...'
          />
        </div>
      </div>
      <div className='grid grid-cols-1 gap-4 p-4 bg-gray-500 md:grid-cols-2'>
        {blogs.map((data) => (
          <div
            key={data.id}
            className='w-full bg-gray-950 text-gray-300 p-5 rounded-md flex flex-col h-screen items-center overflow-y-hidden border-2 border-black'
          >
            <Image
              width={150}
              height={150}
              src={data.user.image || '/default-img-profile.png'}
              alt='Profile Picture'
              className='rounded-full object-cover'
            />

            <div className='w-full'>
              <h1 className='text-center text-lg font-bold mt-2'>Title: {data.title}</h1>
              <p className='text-center italic text-base'>Author: {data.author}</p>
              <p className='text-sm text-center mb-5'>Posted by: {data.user.name}</p>
              <p>{data.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
