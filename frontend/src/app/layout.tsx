import './globals.css';
import { AuthProvider } from '@/hooks/useAuth';
import Navigation from '@/component/Navigation';

export const metadata = {
  title: 'Auth App',
  description: 'Authentication application with Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Navigation />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}