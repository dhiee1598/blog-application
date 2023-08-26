import BlogForm from '@/components/BlogForm';
import { authOptions } from '@/lib/authOptions';
import { BlogUserProps } from '@/types/types';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const getData = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:3000/api/blogs/${id}`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

const UpdateBlogPage = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }
  const blogUser: BlogUserProps = await getData(params.id);
  if (blogUser.userId !== session.user.id) redirect('/');

  return (
    <div className='min-h-[calc(100vh-4rem)] p-5'>
      <h1 className='text-center text-3xl my-3 md:text-5xl'>Update Blog</h1>
      <BlogForm blog={blogUser} />
    </div>
  );
};

export default UpdateBlogPage;
