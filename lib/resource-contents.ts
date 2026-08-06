/**
 * Structured content used to generate downloadable PDFs for the gated
 * resources. Kept here so the server-side download route (/api/download/[slug])
 * can build real .pdf files matching the guides shown on each page.
 */

export interface PdfTable {
  header: string[];
  rows: string[][];
}

export interface PdfSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  checklist?: string[];
  table?: PdfTable;
}

export interface PdfResource {
  slug: string;
  filename: string;
  title: string;
  intro: string;
  sections: PdfSection[];
  footerNote: string;
}

const professionalDevelopmentGuide: PdfResource = {
  slug: 'guide-professional-development',
  filename: 'HRC-Professional-Development-Guide',
  title: 'The Ultimate Guide to Professional Development in Ghana',
  intro:
    'Welcome to your comprehensive guide to professional development in Ghana. This resource covers what you need to know to advance your career in Ghana\u2019s dynamic professional landscape.',
  sections: [
    {
      title: '1. Understanding CPD Requirements',
      paragraphs: [
        'Continuing Professional Development (CPD) is mandatory for many professions in Ghana. Here is a quick reference of common requirements:',
      ],
      table: {
        header: ['Profession', 'Body', 'Annual Requirement'],
        rows: [
          ['Accountants', 'ICAG', '40-50 hours'],
          ['Engineers', 'GhIE', '30 points'],
          ['Lawyers', 'GBA', '12 credits'],
          ['Medical Doctors', 'MDC', '40 credits'],
          ['Nurses', 'NMC', '30 hours'],
          ['Pharmacists', 'Pharmacy Council', '30 points'],
        ],
      },
    },
    {
      title: '2. TVET & Skills Development Pathways',
      paragraphs: [
        'Technical and Vocational Education and Training (TVET) offers practical pathways to employment and entrepreneurship. High-demand areas include:',
      ],
      bullets: [
        'Construction Trades: Masonry, plumbing, electrical, welding',
        'Information Technology: Software, networking, cybersecurity',
        'Agro-Processing: Food preservation, packaging, value addition',
        'Renewable Energy: Solar installation and maintenance',
        'Digital Skills: Digital marketing, e-commerce, graphic design',
      ],
    },
    {
      title: '3. Career Planning Framework',
      paragraphs: ['Use this five-step framework to plan your professional development:'],
      checklist: [
        'Self-Assessment: Evaluate your current skills, strengths, and gaps',
        'Goal Setting: Define clear 1-year, 3-year, and 5-year objectives',
        'Learning Path: Identify the CPD courses, certifications and training needed',
        'Build Network: Connect with mentors and join professional associations',
        'Review & Adjust: Regularly review progress and adapt your plan',
      ],
    },
    {
      title: '4. Building Your Personal Brand',
      paragraphs: ['In Ghana\u2019s competitive job market, a strong personal brand sets you apart:'],
      bullets: [
        'Optimise your LinkedIn profile with keywords relevant to your field',
        'Publish articles and insights to demonstrate thought leadership',
        'Seek speaking opportunities at professional events',
        'Collect testimonials and recommendations from clients and supervisors',
        'Maintain an updated portfolio of your work and achievements',
      ],
    },
    {
      title: '5. Taking Action',
      paragraphs: [
        'Your professional development journey starts today. Take these three actions now:',
      ],
      checklist: [
        'Book a Career Assessment with HRC Ghana to identify your strengths and growth areas',
        'Enrol in a CPD Programme that aligns with your professional body\u2019s requirements',
        'Connect with us on social media and subscribe to our newsletter for ongoing insights',
      ],
    },
  ],
  footerNote:
    'Ready to take the next step? Book a career consultation at hrcghana.com/booking or call 0302907115.',
};

const businessFormationChecklist: PdfResource = {
  slug: 'business-formation-checklist',
  filename: 'HRC-Business-Formation-Checklist',
  title: 'Business Formation Checklist - Start Your Business in Ghana',
  intro:
    'Starting a business in Ghana involves several regulatory steps. This checklist walks you through everything you need to do, in the right order.',
  sections: [
    {
      title: 'Phase 1 - Pre-Registration Preparation',
      checklist: [
        'Define your business idea and value proposition',
        'Conduct market research to validate demand',
        'Choose your business name (check availability at the Registrar General\u2019s Department)',
        'Decide on business structure: Sole Proprietorship, Partnership, or Limited Liability Company',
        'Prepare a basic business plan outlining goals, target market, and financial projections',
        'Identify initial capital requirements and funding sources',
      ],
    },
    {
      title: 'Phase 2 - Business Registration',
      checklist: [
        'Reserve your business name at the Registrar General\u2019s Department (RGD)',
        'Prepare and submit incorporation documents (for Limited Liability Companies)',
        'Obtain your Certificate of Incorporation from the RGD',
        'Register for Tax Identification Number (TIN) at GRA',
        'Register for VAT if annual turnover exceeds GHS 200,000',
        'Register with SSNIT for employee social security contributions',
      ],
    },
    {
      title: 'Phase 3 - Licences, Permits & Compliance',
      checklist: [
        'Obtain industry-specific licences (e.g. FDA clearance for food businesses, EPA permit for manufacturing)',
        'Register with the appropriate regulatory body for your sector',
        'Apply for zoning and building permits if operating from a physical location',
        'Secure trademark or intellectual property protection if needed',
        'Set up compliant record-keeping and accounting systems',
      ],
    },
    {
      title: 'Phase 4 - Financial Setup',
      checklist: [
        'Open a dedicated business bank account',
        'Set up accounting software or engage a bookkeeper',
        'Establish a system for invoicing and expense tracking',
        'Register for mobile money merchant account (if accepting MoMo payments)',
        'Set up a payment gateway for online transactions (if applicable)',
      ],
    },
    {
      title: 'Phase 5 - Launch & Grow',
      checklist: [
        'Develop your brand identity - logo, website, business cards',
        'Create a marketing plan and set up social media profiles',
        'Hire and register employees (if applicable)',
        'Secure business insurance coverage',
        'Establish your customer acquisition channels',
        'Set up a system for tracking key performance indicators (KPIs)',
      ],
    },
  ],
  footerNote:
    'Many entrepreneurs find registration overwhelming. HRC Ghana\u2019s Advisory Services team has helped over 1,000 clients start and grow businesses since 2004. Contact us at hrcghana.com/contact.',
};

const RESOURCES: Record<string, PdfResource> = {
  [professionalDevelopmentGuide.slug]: professionalDevelopmentGuide,
  [businessFormationChecklist.slug]: businessFormationChecklist,
};

export function getPdfResource(slug: string): PdfResource | null {
  return RESOURCES[slug] ?? null;
}