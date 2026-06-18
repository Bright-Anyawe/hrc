/**
 * Site-wide constants — edit URLs and handles here, and all pages/components update automatically.
 */

export const SITE = {
  name: 'Hedge Resource Centre',
  shortName: 'HRC Ghana',
  url: 'https://www.hrcghana.com',
  email: 'info@hrcghana.com',
  phone: '+233-302-907-115',
  phoneAlt: '+233-591-481-815',
  phoneDisplay: '0302907115',
  phoneDisplayAlt: '0591481815',
  foundingYear: 2004,
  address: {
    locality: 'Ashiaman',
    country: 'GH',
    region: 'Greater Accra',
  },
  geo: {
    latitude: 5.6995,
    longitude: -0.0360,
  },
} as const;

/**
 * Official social media profiles — update these when profiles are created.
 * Used in Footer links and schema.org sameAs structured data.
 */
export const SOCIAL = {
  facebook: {
    label: 'Facebook',
    url: 'https://facebook.com/hrcghana',
    icon: 'Facebook',
  },
  twitter: {
    label: 'Twitter / X',
    url: 'https://twitter.com/hrcghana',
    icon: 'Twitter',
  },
  linkedin: {
    label: 'LinkedIn',
    url: 'https://linkedin.com/company/hrcghana',
    icon: 'Linkedin',
  },
  instagram: {
    label: 'Instagram',
    url: 'https://instagram.com/hrcghana',
    icon: 'Instagram',
  },
} as const;

/** Array of social profiles for iteration (Footer, sameAs, etc.) */
export const SOCIAL_LINKS = Object.values(SOCIAL);

/** SameAs URLs for schema.org structured data */
export const SAME_AS_URLS = SOCIAL_LINKS.map((s) => s.url);
