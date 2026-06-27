/**
 * Testimonials & Case Studies data for HRC Ghana.
 * Edit the content below to reflect real clients and projects.
 */

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar?: string; // initials used as fallback
  initials: string;
  rating: number; // 1–5
  quote: string;
  service: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  industry: string;
  service: string;
  challenge: string;
  solution: string;
  results: string[];
  metrics: { label: string; value: string }[];
  testimonial: Pick<Testimonial, 'name' | 'role' | 'company' | 'initials' | 'quote' | 'rating'>;
  duration: string;
  image?: string;
}

// ─── Testimonials ───

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Kwame Asante',
    role: 'Managing Director',
    company: 'Asante Holdings Ltd',
    initials: 'KA',
    rating: 5,
    quote:
      'Hedge Resource Centre transformed our staff training approach. Their tailored CPD programmes significantly improved our team\'s performance and productivity. Within six months, we saw a measurable increase in efficiency across departments.',
    service: 'Training & Tutoring',
  },
  {
    id: 't2',
    name: 'Abena Osei',
    role: 'HR Manager',
    company: 'Ghana Financial Services',
    initials: 'AO',
    rating: 5,
    quote:
      'The advisory team at HRC provided invaluable guidance during our restructuring. Their deep understanding of the Ghanaian business landscape combined with global best practices made all the difference. Highly recommended.',
    service: 'Advisory',
  },
  {
    id: 't3',
    name: 'Dr. Emmanuel Sowah',
    role: 'Programme Director',
    company: 'Community Skills Initiative',
    initials: 'ES',
    rating: 5,
    quote:
      'HRC\'s TVET skills development programme for our community youth was exceptional. Over 200 young people gained market-relevant technical skills, and 75% secured employment within three months of completion.',
    service: 'Skills Development',
  },
  {
    id: 't4',
    name: 'Martha Amponsah',
    role: 'CEO',
    company: 'Amponsah Ventures',
    initials: 'MA',
    rating: 4,
    quote:
      'From business formation to funding strategy, HRC guided us through every step. Their research and industry analysis gave us the confidence to enter new markets. A true partner in growth.',
    service: 'Research & Advisory',
  },
  {
    id: 't5',
    name: 'Samuel Tetteh',
    role: 'Project Lead',
    company: 'Rural Development Trust',
    initials: 'ST',
    rating: 5,
    quote:
      'The community assessment conducted by HRC was thorough and insightful. Their recommendations directly shaped our intervention strategy and helped us allocate resources where they were needed most.',
    service: 'Assessment',
  },
];

// ─── Case Studies ───

export const caseStudies: CaseStudy[] = [
  {
    id: 'cs1',
    title: 'Company-Wide Staff Transformation Programme',
    client: 'Asante Holdings Ltd',
    industry: 'Logistics & Supply Chain',
    service: 'Training & Tutoring',
    challenge:
      'Asante Holdings, a mid-sized logistics firm in Accra, faced declining employee performance and low morale. Their existing training was generic and not aligned with specific departmental needs. Turnover rates were high, and middle management lacked the skills to lead effectively.',
    solution:
      'HRC designed and delivered a comprehensive 6-month CPD programme tailored to each department — operations, finance, HR, and sales. The programme included hands-on workshops, one-on-one coaching, performance metrics tracking, and continuous assessment. We also provided train-the-trainer sessions to build internal capacity.',
    results: [
      'Employee productivity increased by 34% within 6 months',
      'Staff turnover reduced from 28% to 12% annually',
      'Middle management reported 92% confidence in leadership skills',
      'Operational efficiency improved, reducing delivery times by 20%',
    ],
    metrics: [
      { label: 'Productivity Increase', value: '34%' },
      { label: 'Turnover Reduction', value: 'from 28% to 12%' },
      { label: 'Training Sessions', value: '48' },
      { label: 'Staff Trained', value: '156' },
    ],
    testimonial: {
      name: 'Kwame Asante',
      role: 'Managing Director',
      company: 'Asante Holdings Ltd',
      initials: 'KA',
      rating: 5,
      quote:
        'HRC didn\'t just deliver training — they transformed how we develop our people. The measurable results speak for themselves.',
    },
    duration: '6 months',
  },
  {
    id: 'cs2',
    title: 'Community Youth TVET Skills Initiative',
    client: 'Community Skills Initiative (CSI)',
    industry: 'Community Development / NGO',
    service: 'Skills Development',
    challenge:
      'A rural community in the Eastern Region had high youth unemployment with limited access to vocational training. Existing programmes were outdated and did not match market demand. Young people lacked the practical technical skills needed for available jobs in construction, agro-processing, and ICT.',
    solution:
      'HRC collaborated with CSI to design and implement a 3-month intensive TVET skills programme. We conducted a market demand assessment, developed modernised curriculum modules, sourced qualified local instructors, and provided mentorship. Tracks included: solar installation, smartphone repair, agro-processing, and digital literacy.',
    results: [
      '212 youth completed the programme (87% completion rate)',
      '75% secured employment or started a business within 3 months',
      '20 micro-enterprises were launched with HRC follow-up advisory',
      'Programme featured as a case study by the Ghana TVET Service',
    ],
    metrics: [
      { label: 'Youth Trained', value: '212' },
      { label: 'Employment Rate', value: '75%' },
      { label: 'Completion Rate', value: '87%' },
      { label: 'Micro-enterprises', value: '20' },
    ],
    testimonial: {
      name: 'Dr. Emmanuel Sowah',
      role: 'Programme Director',
      company: 'Community Skills Initiative',
      initials: 'ES',
      rating: 5,
      quote:
        'This partnership with HRC changed hundreds of lives. The skills these young people gained are transformative — for them, their families, and the community.',
    },
    duration: '3 months',
  },
  {
    id: 'cs3',
    title: 'Strategic Restructuring & Growth Advisory',
    client: 'Ghana Financial Services (GFS)',
    industry: 'Financial Services',
    service: 'Advisory',
    challenge:
      'GFS, a growing financial services firm, was experiencing growing pains — inefficient processes, unclear organisational structure, and difficulty securing funding for expansion. Leadership recognised the need for strategic restructuring but lacked the internal expertise to execute it effectively.',
    solution:
      'HRC conducted a comprehensive organisational audit covering operations, finance, HR, and market positioning. We developed a detailed restructuring plan, redesigned the organisational chart, implemented new financial controls, and developed a compelling funding strategy that included a pitch deck and investor targeting.',
    results: [
      'Secured GHS 2.5M in expansion funding within 4 months',
      'Operational costs reduced by 18% through process optimisation',
      'New organisational structure improved decision-making speed by 40%',
      'Client satisfaction scores increased from 72% to 94%',
    ],
    metrics: [
      { label: 'Funding Secured', value: 'GHS 2.5M' },
      { label: 'Cost Reduction', value: '18%' },
      { label: 'Decision Speed', value: '+40%' },
      { label: 'Client Satisfaction', value: '94%' },
    ],
    testimonial: {
      name: 'Abena Osei',
      role: 'HR Manager',
      company: 'Ghana Financial Services',
      initials: 'AO',
      rating: 5,
      quote:
        'The restructuring was seamless thanks to HRC\'s meticulous planning. They didn\'t just advise — they worked alongside us to ensure successful implementation.',
    },
    duration: '4 months',
  },
];
