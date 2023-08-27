'use client';

import { useUpdateUser } from '@/hooks/use-update';
import { UpdatePageProps } from '@/types/types';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const UserForm = ({ username, contact, aboutMe, userId }: UpdatePageProps) => {
  const [updateInfo, setUpdateInfo] = useState({
    username: username,
    contact: contact,
    aboutMe: aboutMe,
  });

  const { isLoading, updateUser } = useUpdateUser(`/api/blogs/user/${userId}`);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateUser(updateInfo);
  };

  return (
    <form className='w-4/6 m-auto' onSubmit={handleSubmit}>
      <h1 className='text-5xl text-center my-5'>Update Profile Information</h1>
      <input
        type='text'
        required
        value={updateInfo.username}
        placeholder={updateInfo.username}
        onChange={(e) => setUpdateInfo({ ...updateInfo, username: e.target.value })}
        className='w-full mb-1 border border-black rounded-lg p-1 outline-none lg:p-3 md:p-2'
      />
      <textarea
        required
        value={updateInfo.aboutMe}
        placeholder={updateInfo.username}
        onChange={(e) => setUpdateInfo({ ...updateInfo, aboutMe: e.target.value })}
        className='w-full  border border-black rounded-lg p-1 outline-none lg:p-3 md:p-2'
      />
      <input
        type='text'
        required
        placeholder={updateInfo.contact}
        onChange={(e) => setUpdateInfo({ ...updateInfo, contact: e.target.value })}
        className='w-full mb-1 border border-black rounded-lg p-1 outline-none lg:p-3 md:p-2'
      />
      <button
        type='submit'
        disabled={isLoading}
        className='w-full bg-blue-500 pt-1 px-3 font-light uppercase rounded-md text-lg mb-2'
      >
        {isLoading ? <FaSpinner className='animate-spin m-auto' size={24} /> : 'Update'}
      </button>
      <Link href='/profile'>
        <button className='w-full md:p-2 md:text-lg bg-red-600 rounded-md p-1'>Back</button>
      </Link>
    </form>
  );
};

export default UserForm;
