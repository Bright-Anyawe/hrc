import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const siteUrl = 'https://www.hrcghana.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Hedge Resource Centre (HRC) | Leader in Resource Consulting Ghana',
    template: '%s | Hedge Resource Centre Ghana',
  },
  description:
    'HRC Ghana (Hedge Resource Centre) — Since 2004, Ghana\'s trusted leader in resource consulting, professional training & TVET, skills development, research, and advisory services in Accra. Call 0302907115 for expert business consulting, staff training, CPD, and project management solutions.',
  keywords: [
    'HRC Ghana',
    'Hedge Resource Centre',
    'HRC',
    'resource consulting Ghana',
    'professional development Ghana',
    'skills development Ghana',
    'training and tutoring Ghana',
    'business consulting Accra',
    'staff training Ghana',
    'TVET Ghana',
    'career development Ghana',
    'continuing professional development Ghana',
    'CPD Ghana',
    'micro entrepreneurship Ghana',
    'HR consulting Ghana',
    'human resource management Ghana',
    'assessment services Ghana',
    'advisory services Accra',
    'research services Ghana',
    'academic research Ghana',
    'technical writing Ghana',
    'project management Ghana',
    'business formation Ghana',
    'recruitment Ghana',
    'poverty reduction Ghana',
    'sustainable communities Ghana',
    'quality education Ghana',
    'hrcghana.com',
    'hedge resource',
    'HRC Accra',
    'consulting firm Ghana',
    'professional services Ghana',
    'HRC consulting services Ghana',
    'HRC training programs Ghana',
    'HRC career development Accra',
    'HRC advisory Accra Ghana',
    'Hedge Resource Centre consulting',
    'best consulting firm Ghana',
    'top training company Ghana',
    'Ghana resource centre',
    'GH resource consulting',
    'resource centre Accra',
    'HRC resource centre Ghana',
  ],
  authors: [{ name: 'Hedge Resource Centre', url: siteUrl }],
  creator: 'Hedge Resource Centre',
  publisher: 'Hedge Resource Centre',
  category: 'Business & Professional Services',
  classification: 'Resource Consulting, Professional Development, Training',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hedge Resource Centre (HRC) | Leader in Resource Consulting Ghana',
    description:
      'HRC Ghana provides expert resource consulting, professional training, skills development, research, assessment, and advisory services. Over 15 years serving individuals, businesses, and communities across Ghana.',
    url: siteUrl,
    siteName: 'Hedge Resource Centre',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hedge Resource Centre — Leader in Resource Consulting Ghana',
      },
    ],
    locale: 'en_GH',
    type: 'website',
    countryName: 'Ghana',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hrcghana',
    creator: '@hrcghana',
    title: 'Hedge Resource Centre (HRC) | Resource Consulting Ghana',
    description:
      'Expert resource consulting, professional training & skills development in Ghana since 2004. Trusted by 1000+ clients. Call 0302907115.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Set NEXT_PUBLIC_GOOGLE_VERIFICATION in .env.local with your site verification code
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'add-your-google-search-console-verification-code-here',
  },
  referrer: 'origin-when-cross-origin',
  applicationName: 'Hedge Resource Centre Ghana',
  appleWebApp: {
    capable: true,
    title: 'HRC Ghana',
    statusBarStyle: 'black-translucent',
  },
  other: {
    'geo.region': 'GH-AA',
    'geo.placename': 'Accra, Ghana',
    'geo.position': '5.6037;-0.1870',
    'ICBM': '5.6037, -0.1870',
    'DC.language': 'en',
    'DC.coverage': 'Ghana',
    'revisit-after': '7 days',
    'rating': 'general',
    'language': 'English',
    'copyright': 'Hedge Resource Centre',
    'DC.subject': 'Resource Consulting, Professional Training, Skills Development, Business Advisory Ghana, HRC, Hedge Resource Centre, HR Consulting Ghana',
    'DC.title': 'Hedge Resource Centre (HRC) Ghana - Leader in Resource Consulting',
  },
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import BookNowButton from '@/components/BookNowButton';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import { SAME_AS_URLS } from '@/lib/constants';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${siteUrl}/#organization`,
  name: 'Hedge Resource Centre',
  alternateName: ['HRC Ghana', 'HRC', 'Hedge Resource Centre Ghana'],
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo_page-0001.jpg`,
    width: 200,
    height: 200,
  },
  image: `${siteUrl}/og-image.jpg`,
  description:
    'Hedge Resource Centre (HRC) is a leader in resource consulting, providing professional training, skills development, administrative support, research, assessment, and advisory services in Ghana since 2004.',
  foundingDate: '2004',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ashiaman (Greater Accra)',
    addressCountry: 'GH',
    addressRegion: 'Greater Accra',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 5.6995,
    longitude: -0.0360,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+233-302-907-115',
      contactType: 'customer service',
      areaServed: 'GH',
      availableLanguage: 'English',
      hoursAvailable: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    },
    {
      '@type': 'ContactPoint',
      telephone: '+233-591-481-815',
      contactType: 'customer service',
      areaServed: 'GH',
      availableLanguage: 'English',
    },
  ],
  email: 'info@hrcghana.com',
  sameAs: [siteUrl, ...SAME_AS_URLS],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'HRC Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Training & Tutoring' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Skills Development' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Administrative Support' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Research Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Assessment Services' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Advisory Services' } },
    ],
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '16:00',
    },
  ],
};

const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'Hedge Resource Centre',
  description: 'Leader in resource consulting in Ghana since 2004.',
  publisher: { '@id': `${siteUrl}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/?q={search_term_string}` },
    'query-input': 'required name=search_term_string',
  },
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://images.pexels.com" />
        <link rel="preconnect" href="https://images.pexels.com" />
        <link rel="icon" href="/logo_page-0001.jpg" type="image/jpeg" />
        <link rel="alternate icon" href="/logo_page-0001.jpg" type="image/jpeg" />
        <meta name="theme-color" content="#002366" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={inter.className}>
        {/* Skip to main content link for accessibility and SEO */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:px-4 focus:py-3 focus:bg-hrc-red focus:text-white focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
        <GoogleAnalytics />
        <BackToTop />
        <WhatsAppButton />
        <BookNowButton />
      </body>
    </html>
  );
}
