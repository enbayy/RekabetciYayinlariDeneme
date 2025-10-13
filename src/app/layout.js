import Navbar from '../components/Navbar'; // Navbar dosyanızın doğru yolu
import Footer from '../components/Footer';
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from '@/components/ToastProvider'; // ToastProvider ekledik

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://www.rekabetciyayinlari.com'),
  title: {
    default: 'Rekabetçi Yayınları - Deneme Sınavları ve Analiz',
    template: '%s | Rekabetçi Yayınları'
  },
  description: 'YKS, TYT, AYT ve branş denemeleri ile gerçek sınav deneyimi ve detaylı analiz.',
  keywords: ['deneme', 'YKS', 'TYT', 'AYT', 'branş denemeleri', 'analiz'],
  openGraph: {
    title: 'Rekabetçi Yayınları',
    description: 'Gerçek sınav deneyimi ve detaylı analizlerle başarıya hazırlanın.',
    url: 'https://www.rekabetciyayinlari.com',
    siteName: 'Rekabetçi Yayınları',
    images: [
      { url: '/rbylogo2.png', width: 1200, height: 630, alt: 'Rekabetçi Yayınları' }
    ],
    locale: 'tr_TR',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rekabetçi Yayınları',
    description: 'Gerçek sınav deneyimi ve detaylı analizlerle başarıya hazırlanın.',
    images: ['/rbylogo2.png']
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            try {
              var stored = localStorage.getItem('theme');
              var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
              var theme = stored || (prefersDark ? 'dark' : 'light');
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {}
          })();
        `}} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ToastProvider>
          <Navbar />
          {children}
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
