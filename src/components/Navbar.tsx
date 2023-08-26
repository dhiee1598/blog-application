import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className='bg-[#111] w-full h-16 flex p-4 justify-between items-center shadow-xl'>
      <Link href='/home'>
        <h1 className='text-yellow-400 font-bold uppercase text-xl whitespace-nowrap md:text-2xl'>
          Blog Mania
        </h1>
      </Link>
      {session ? (
        <div className='flex justify-center items-center'>
          <Link
            href='/profile'
            className='text-green-600 p-2 underline underline-offset-8 mr-3 md:text-lg'
          >
            Hi! {session.user.name}
          </Link>
          <Image
            src={session.user.image || '/icons8-test-account-96.png'}
            alt='Profile Image'
            width={35}
            height={35}
            className='rounded-full'
          />
        </div>
      ) : (
        <>
          <Link
            href='/api/auth/signin'
            className='text-green-600 border border-green-600 rounded-md p-2'
          >
            Sign In
          </Link>
        </>
      )}
    </div>
  );
};

export default Navbar;
