'use client';

import Link from 'next/link';

const UserForm = () => {
  return (
    <form className='mt-3 md:ml-3'>
      <input
        type='text'
        placeholder='Username'
        className='w-full mb-1 border border-black rounded-lg p-1 outline-none lg:p-3 md:p-2'
      />
      <textarea
        placeholder='About Me'
        className='w-full  border border-black rounded-lg p-1 outline-none lg:p-3 md:p-2'
      />
      <input
        type='text'
        placeholder='Contact'
        className='w-full mb-1 border border-black rounded-lg p-1 outline-none lg:p-3 md:p-2'
      />
      <button
        type='submit'
        className='w-1/3 bg-blue-500 p-1 font-light uppercase rounded-md text-lg mr-2'
      >
        Update
      </button>
      <Link href='/addpost'>
        <button
          type='submit'
          className='w-1/3 bg-blue-500 p-1 font-light uppercase rounded-md text-lg mr-2'
        >
          Add Post
        </button>
      </Link>
    </form>
  );
};

export default UserForm;
