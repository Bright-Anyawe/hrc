import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Hedge Resource Centre - Leader in Resource Consulting',
  description: 'Professional resource consulting services including training, skills development, administrative support, research, assessment, and advisory services. Over 15 years of experience in Ghana.',
  keywords: 'resource consulting, training, skills development, Ghana, professional development, business consulting',
  authors: [{ name: 'Hedge Resource Centre' }],
  creator: 'Hedge Resource Centre',
  publisher: 'Hedge Resource Centre',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.hrcghana.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hedge Resource Centre - Leader in Resource Consulting',
    description: 'Professional resource consulting services including training, skills development, administrative support, research, assessment, and advisory services.',
    url: 'https://www.hrcghana.com',
    siteName: 'Hedge Resource Centre',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hedge Resource Centre - Leader in Resource Consulting',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hedge Resource Centre - Leader in Resource Consulting',
    description: 'Professional resource consulting services with over 15 years of experience.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import WhatsAppButton from '@/components/WhatsAppButton';

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Hedge Resource Centre',
  alternateName: 'HRC Ghana',
  url: 'https://www.hrcghana.com',
  logo: 'https://www.hrcghana.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+233-302-907-115',
    contactType: 'customer service',
    areaServed: 'GH',
    availableLanguage: 'en',
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'GH',
  },
  sameAs: [
    'https://www.hrcghana.com',
  ],
  foundingDate: '2004',
  description: 'Leader in resource consulting providing training, skills development, administrative support, research, and advisory services.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <Header />
        {children}
        <Footer />
        <BackToTop />
        <WhatsAppButton />
      </body>
    </html>
  );
}