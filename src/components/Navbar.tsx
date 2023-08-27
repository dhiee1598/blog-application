import Link from 'next/link';
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import axios from 'axios';

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const formatName = session?.user.name
    ?.slice(0, session.user.name.indexOf(' ') + 1)
    .toString();

  return (
    <div className='bg-[#111] w-full min-w-[400px] h-16 flex p-4 justify-between items-center shadow-xl'>
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
            Hi! {formatName}
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
