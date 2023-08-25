import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const WelcomePage = async () => {
  const session = await getServerSession(authOptions);
  if (session) redirect('/home');

  return (
    <div className='w-full h-[calc(100vh-4rem)] flex justify-center items-center flex-col'>
      <h1 className='text-5xl uppercase text-center shadow-md p-3 font-extralight md:text-6xl'>
        Welcome to <span className='text-yellow-500'>Blog</span> Mania!
      </h1>
      <p className='text-center p-4 mt-3 w-full md:w-3/4 md:text-lg'>{`Feel free to explore, read, and engage with a diverse range of topics, from travel and tech to fashion and food there's something here for everyone. And if you're ready to make your mark, hit that 'Sign in' button and start shaping your corner of the blogosphere.`}</p>
    </div>
  );
};

export default WelcomePage;
