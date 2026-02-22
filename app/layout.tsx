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
    'Hedge Resource Centre (HRC Ghana) — Over 15 years of expert resource consulting, professional training, skills development, research, and advisory services in Accra, Ghana. Call 0302907115.',
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
    title: 'Hedge Resource Centre (HRC) | Resource Consulting Ghana',
    description:
      'Expert resource consulting, professional training & skills development in Ghana. Over 15 years of excellence. Contact HRC today.',
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
    google: 'add-your-google-search-console-verification-code-here',
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
  },
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import WhatsAppButton from '@/components/WhatsAppButton';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': ['Organization', 'LocalBusiness'],
  '@id': `${siteUrl}/#organization`,
  name: 'Hedge Resource Centre',
  alternateName: ['HRC Ghana', 'HRC', 'Hedge Resource Centre Ghana'],
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo.png`,
    width: 200,
    height: 200,
  },
  image: `${siteUrl}/og-image.jpg`,
  description:
    'Hedge Resource Centre (HRC) is a leader in resource consulting, providing professional training, skills development, administrative support, research, assessment, and advisory services in Ghana since 2004.',
  foundingDate: '2004',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Accra',
    addressCountry: 'GH',
    addressRegion: 'Greater Accra',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 5.6037,
    longitude: -0.1870,
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
  sameAs: [siteUrl],
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
