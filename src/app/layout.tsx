import Navbar from '@/components/Navbar/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import SessionProviders from '@/components/Session/SessionProviders';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Blogs Mania',
  description: 'My first project using NextJS 13.4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProviders>
      <html lang='en'>
        <body className={poppins.className}>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProviders>
  );
}
