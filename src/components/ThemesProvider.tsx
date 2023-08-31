'use client';
import { ThemeProvider } from 'next-themes';

const ThemesProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider enableSystem={true} attribute='class'>
      {children}
    </ThemeProvider>
  );
};

export default ThemesProvider;
