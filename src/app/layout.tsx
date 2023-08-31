import Navbar from '@/components/Navbar';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Footer from '@/components/Footer';
import QueryProvider from '@/components/QueryProvider';
import SessionProviders from '@/components/SessionProviders';
import { ThemeProvider } from 'next-themes';
import ThemesProvider from '@/components/ThemesProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'Blog Mania',
  description: 'My first project using NextJS 13.4',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='light' style={{ colorScheme: 'light' }}>
      <body className={poppins.className}>
        <SessionProviders>
          <QueryProvider>
            <ThemesProvider>
              <Navbar />
              {children}
              <Footer />
            </ThemesProvider>
          </QueryProvider>
        </SessionProviders>
      </body>
    </html>
  );
}
