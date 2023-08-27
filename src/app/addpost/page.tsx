import NewBlogForm from '@/components/NewBlogForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

const AddPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/');

  return (
    <div className='min-h-[calc(100vh-4rem)] p-5'>
      <h1 className='text-center text-3xl my-3 md:text-5xl'>Add New Post</h1>
      <NewBlogForm />
    </div>
  );
};

export default AddPage;
