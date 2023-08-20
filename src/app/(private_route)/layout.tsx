import { authOptions } from '@/lib/authOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/');

  return <>{children}</>;
};
export default RootLayout;
