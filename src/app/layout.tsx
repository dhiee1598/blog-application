import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Session from '@/components/Session';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Blog Mania',
  description: 'This is my first project using NextJS 13.4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Session>
      <html lang='en'>
        <body className={poppins.className}>
          <Navbar />
          <main className='shadow-xl max-w-6xl m-auto min-w-[400px]'>{children}</main>
          <Footer />
        </body>
      </html>
    </Session>
  );
}
