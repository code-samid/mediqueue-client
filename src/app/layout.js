
// Root layout — wraps all pages with providers and global styles

import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import { Providers } from './providers';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'TutorNova — Find Your Perfect Tutor',
  description: 'Browse, book and learn with the best tutors near you',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: '0.75rem',
                fontSize: '14px',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  );
}