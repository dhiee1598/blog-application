'use client';

import { useFetchUser } from '@/hooks/useFetch';
import { useUpdateUser } from '@/hooks/usePost';
import { FormEvent, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const Userform = ({ id }: { id: string }) => {
  const { data, isLoading, isError } = useFetchUser(id);
  const { updateUsers } = useUpdateUser(`/api/users/${id}`);

  const [values, setValues] = useState({
    nickname: data?.nickname || '',
    contact: data?.contact || '',
    about: data?.about || '',
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateUsers.mutate(values);
  };

  return (
    <div>
      {isLoading ? (
        <FaSpinner className='animate-spin m-auto' size={40} />
      ) : isError ? (
        <p className='text-center text-lg text-red-500'>Failed to Fetch Data</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            required
            type='text'
            value={values.nickname}
            placeholder={data?.nickname || 'Username'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, nickname: e.target.value })
            }
            className='w-full p-2 mb-1 rounded-md outline-none text-base border shadow-md'
          />
          <input
            required
            type='text'
            value={values.contact}
            placeholder={data?.contact || 'Contact'}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setValues({ ...values, contact: e.target.value })
            }
            className='w-full p-2 mb-1 rounded-md outline-none text-base border shadow-md'
          />
          <textarea
            required
            value={values.about}
            placeholder={data?.about || 'About Me'}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setValues({ ...values, about: e.target.value })
            }
            className='w-full p-2 mb-1 rounded-md outline-none text-base border shadow-md h-40'
          />
          <button
            type='submit'
            disabled={updateUsers.isLoading}
            style={updateUsers.isLoading ? { opacity: '0.8' } : { opacity: '1' }}
            className='w-full bg-cyan-500 p-2 text-sm uppercase rounded-sm'
          >
            {updateUsers.isLoading ? (
              <FaSpinner size={23} className='m-auto animate-spin' />
            ) : (
              'Submit'
            )}
          </button>
        </form>
      )}
    </div>
  );
};
export default Userform;
