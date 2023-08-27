import UserForm from '@/components/UserForm';
import { UserBlogProps } from '@/types/types';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { env } from '@/lib/env';

const getData = async (id: string) => {
  const response = await axios.get(`${env.NEXTAUTH_URL}/api/blogs/user/${id}`);
  return response.data;
};

const UpdatePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  const userBlog: UserBlogProps = await getData(session?.user.id);

  return (
    <div className='min-h-[calc(100vh-4rem)]'>
      <UserForm
        username={userBlog.username || 'Username'}
        aboutMe={userBlog.aboutMe || 'About Me'}
        contact={userBlog.contact || 'Contact'}
        userId={userBlog.id}
      />
    </div>
  );
};

export default UpdatePage;
