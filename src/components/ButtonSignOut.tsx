'use client';

import { signOut } from 'next-auth/react';

const ButtonSignOut = () => {
  return (
    <button
      onClick={() => signOut()}
      className='border bg-red-500 border-black rounded-md w-auto px-2 md:px-4 py-1'
    >
      Logout
    </button>
  );
};

export default ButtonSignOut;
