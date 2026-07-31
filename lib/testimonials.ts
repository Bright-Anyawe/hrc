/**
 * Testimonials & Case Studies data for HRC Ghana.
 *
 * ⚠️ All `testimonials` below are real, named clients who gave this feedback
 * directly (`verified: true`). Only these entries may ever back schema.org
 * Review structured data.
 *
 * All `caseStudies` are still placeholders — every name, company, quote, and
 * metric (e.g. "34% productivity increase", "GHS 2.5M in funding") is
 * invented. The /testimonials page carries a disclaimer banner saying so.
 *
 * Do not reuse placeholder company/person names elsewhere on the site as if
 * they were real clients (e.g. a "client logo wall"), and never attach
 * schema.org Review/AggregateRating to a case study — Google treats review
 * markup as a factual claim.
 */

export interface Testimonial {
  id: string;
  name: string;
  /** Omitted when the client gave feedback without a stated title. */
  role?: string;
  /** Omitted when the client gave feedback as an individual, not on behalf of an organisation. */
  company?: string;
  avatar?: string; // initials used as fallback
  initials: string;
  rating: number; // 1–5
  /** Paragraphs separated by a blank line (`\n\n`) are rendered as separate <p> elements. */
  quote: string;
  service: string;
  /** True only for real, permissioned client feedback. See the file header. */
  verified?: boolean;
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
    id: 't-edward-afoh',
    name: 'Edward Afoh',
    role: 'Teacher',
    initials: 'EA',
    rating: 5,
    verified: true,
    quote:
      "Hedge Resource Centre really enlightened me on my teaching profession. Before I enrolled at the Hedge Resource Centre, I wasn't good at lesson preparation. It was through their training that I learnt how to prepare lessons very effectively. One challenge I was facing then was my class control and management. In fact it wasn't easy for me, but upon the completion of the training it became so easy for me to handle any class with ease.\n\n" +
      'The results from the training have been marvelous. It gave me high profile recognition in the school I was teaching then. I was able to organize in-service training for my colleagues on lesson planning and classroom management.\n\n' +
      'Lastly, the most important one, was the increase in salary. My salary went up — in fact I was really surprised, but that is the difference the training can make. Getting more than 60% increase in salary was amazing.\n\n' +
      'All thanks to the Hedge Resource Centre. God bless the originator.',
    service: 'Training & Tutoring',
  },
  {
    id: 't-melody-appietu',
    name: 'Melody Enyonam Appietu (MPhil)',
    role: 'Lecturer & Facilitator, Hospitality and Tourism Department',
    company: 'Ho Technical University',
    initials: 'MA',
    rating: 5,
    verified: true,
    quote:
      "The mentoring I received through the school-based INSET conducted by Hedge Resource Centre, under the leadership of Mr. Gershon Vorsah, transformed my professional journey. It inspired me to pursue teaching at a higher level, and today I serve as a Lecturer and Facilitator in the Hospitality and Tourism Department of Ho Technical University. The Centre's commitment to continuous professional development equipped me with learner-centered teaching approaches and strengthened my capacity as an educator.",
    service: 'Training & Professional Development',
  },
  {
    id: 't-sanity-electrical',
    name: 'Sanity Electrical Engineering',
    role: 'CEO',
    initials: 'SE',
    rating: 5,
    verified: true,
    quote:
      'Hedge Resource Centre provided us with exceptional support in registering our business and ensuring full regulatory compliance. Their professionalism, efficiency, and expert guidance made the entire process seamless and stress-free. We are grateful for their outstanding service and highly recommend Hedge Resource Centre to any entrepreneur or business seeking reliable business registration and compliance support.',
    service: 'Business Registration & Compliance',
  },
  {
    id: 't-sq-gagbla',
    name: 'Rev. S. Q. Gagbla',
    initials: 'SG',
    rating: 5,
    verified: true,
    quote:
      "Hedge Resource Centre's CEO and Founder, Mr. Gershon Vorsah, is an exceptional resource consultant. He combines strategic insight with genuine empathy. He approaches every engagement with analytical rigor, asking the right questions to uncover practical and sustainable solutions. His professionalism, integrity, and ability to navigate complex challenges have earned him the trust of clients. Beyond delivering technical expertise, he empowers individuals and organizations to make informed decisions and achieve meaningful results.",
    service: 'Advisory',
  },
  {
    id: 't-selk-farms',
    name: 'SEL K FARMS',
    role: 'Project Promoter – Ayiwata Rice Development Project (ARDP)',
    initials: 'SK',
    rating: 5,
    verified: true,
    quote:
      "Working with Hedge Resource Centre on the development of the Ayiwata Rice Development Project (ARDP) has been an outstanding experience. From the initial concept discussions to the preparation of a comprehensive, investment-ready project proposal, the Hedge Resource Centre team demonstrated exceptional professionalism, technical expertise, and a deep understanding of agribusiness project development.\n\n" +
      'Their ability to translate our vision into a well-structured, financially sound, and strategically aligned proposal exceeded our expectations. The team paid close attention to every aspect of the project, including technical design, financial modelling, risk analysis, sustainability planning, monitoring and evaluation, and alignment with national development priorities. The final proposal clearly reflects their commitment to quality, innovation, and excellence.\n\n' +
      'Throughout the engagement, Hedge Resource Centre was highly responsive, collaborative, and dedicated to ensuring that our project met the standards expected by funding institutions. Their guidance and strategic insights significantly strengthened the quality and competitiveness of our proposal.\n\n' +
      'Although the project is currently awaiting funding for implementation, we are confident that the solid foundation laid by Hedge Resource Centre has positioned the Ayiwata Rice Development Project for success. We highly recommend Hedge Resource Centre to organizations seeking professional support in project design, proposal development, business planning, and resource mobilization.',
    service: 'Advisory',
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
