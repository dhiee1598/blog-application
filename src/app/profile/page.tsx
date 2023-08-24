'use client';

import UserForm from '@/components/UserForm';
import { signOut } from 'next-auth/react';
import Image from 'next/image';

const ProfilePage = () => {
  return (
    <div className='w-full min-h-[calc(100vh-4rem)] pt-3'>
      <div className='flex justify-center md:flex-row flex-col items-center p-5'>
        <figure>
          <Image
            src='/icons8-test-account-96.png'
            alt='Profile Pic'
            width={100}
            height={100}
          />
        </figure>
        <UserForm />
      </div>
      <div>
        <h1>Your Post</h1>
        <button onClick={() => signOut()}>Logout</button>
      </div>
    </div>
  );
};

export default ProfilePage;
