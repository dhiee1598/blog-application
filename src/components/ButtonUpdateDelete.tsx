'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const ButtonUpdateDelete = ({ id }: { id: string }) => {
  const [isBusy, setIsBusy] = useState<boolean>();
  const router = useRouter();

  const deleteBlog = async (value: string) => {
    setIsBusy(true);

    await axios
      .delete(`/api/blogs/${value}`)
      .then((res) => {
        console.log(res.data);
        setIsBusy(false);
        router.refresh();
        router.replace('/profile');
      })
      .catch((err) => {
        setIsBusy(false);
        console.error(err);
      });
  };

  return (
    <div className='w-full'>
      <button
        disabled={isBusy}
        onClick={() => deleteBlog(id)}
        className='w-1/2 text-center block m-auto mb-1 bg-red-500 border border-black rounded-md p-2'
      >
        {isBusy ? <FaSpinner className='animate-spin m-auto' size={24} /> : 'Delete'}
      </button>
      <Link href={`/updateblog/${id}`}>
        <button className='w-1/2 block m-auto p-2 md:text-lg border bg-blue-500 border-black rounded-md'>
          Update
        </button>
      </Link>
      <Link
        className='mt-1 md:text-lg border border-black rounded-md bg-blue-500 text-center p-2 w-1/2'
        href='/profile'
      >
        Back
      </Link>
    </div>
  );
};

export default ButtonUpdateDelete;
