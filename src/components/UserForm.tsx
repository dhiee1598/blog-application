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
    <form className='w-full p-5' onSubmit={handleSubmit}>
      <h1 className='text-5xl text-center my-5'>Update Bio</h1>
      <input
        type='text'
        required
        value={updateInfo.username}
        placeholder={updateInfo.username || 'Username'}
        onChange={(e) => setUpdateInfo({ ...updateInfo, username: e.target.value })}
        className='w-full mb-1 border border-black rounded-lg p-2 text-lg outline-none'
      />
      <textarea
        required
        value={updateInfo.aboutMe}
        placeholder={updateInfo.username || 'About Me'}
        onChange={(e) => setUpdateInfo({ ...updateInfo, aboutMe: e.target.value })}
        className='w-full  border border-black rounded-lg p-2 text-lg outline-none'
      />
      <input
        type='text'
        required
        placeholder={updateInfo.contact || 'Contact'}
        onChange={(e) => setUpdateInfo({ ...updateInfo, contact: e.target.value })}
        className='w-full mb-1 border border-black rounded-lg p-2 text-lg outline-none'
      />
      <button
        type='submit'
        disabled={isLoading}
        className='w-full bg-blue-500 m-auto border p-2 border-black rounded-md text-xl mb-2'
      >
        {isLoading ? <FaSpinner className='animate-spin m-auto' size={24} /> : 'Update'}
      </button>
      <Link href='/profile'>
        <button className='w-full p-2 border text-xl border-black m-auto bg-red-600 rounded-md'>
          Back
        </button>
      </Link>
    </form>
  );
};

export default UserForm;
