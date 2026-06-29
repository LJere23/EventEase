import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'EventEase — Zimbabwe\'s AI-Powered Event Planning Platform',
  description: 'Plan your perfect event with AI. Connect with vetted vendors, manage RSVPs, and sell tickets — all in one platform built for Zimbabwe.',
  keywords: 'event planning Zimbabwe, wedding vendors Harare, event caterers Zimbabwe, AI event planner',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Blocking script — applies saved theme before first paint to prevent flash */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var t=localStorage.getItem('ee-theme')||(window.matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',t);}catch(e){}})();` }} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen">
        <ThemeProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                fontFamily: "'Inter', sans-serif",
              },
              success: { iconTheme: { primary: '#006D77', secondary: 'white' } },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
