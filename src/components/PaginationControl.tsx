'use client';

import { PaginationProps } from '@/types/types';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaForward } from 'react-icons/fa';
import { FaBackward } from 'react-icons/fa';

const PaginationControl = ({ hasNextPage, hasPrevPage }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const page = searchParams.get('page') ?? '1';
  const per_page = searchParams.get('per_page') ?? '6';

  return (
    <div className='flex justify-center gap-2 p-3'>
      <button
        disabled={!hasPrevPage}
        className='shadow-xl shadow-black px-5 py-1'
        onClick={() => {
          router.push(`/home/?page=${Number(page) - 1}&per_page=${per_page}`);
        }}
      >
        <FaBackward size={20} />
      </button>
      <div>
        <h1 className='text-xl border border-black py-1 px-5 rounded-md'>{`${page} / ${Math.ceil(
          10 / Number(per_page)
        )}`}</h1>
      </div>
      <button
        disabled={!hasNextPage}
        className='shadow-xl shadow-black px-5 py-1'
        onClick={() => {
          router.push(`/home/?page=${Number(page) + 1}&per_page=${per_page}`);
        }}
      >
        <FaForward size={20} />
      </button>
    </div>
  );
};

export default PaginationControl;
