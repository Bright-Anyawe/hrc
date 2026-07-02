export interface MethodologyStep {
  id: string;
  stepNumber: number;
  title: string;
  shortLabel: string;
  description: string;
  icon: string;
  color: string;
  colorLight: string;
  subPoints?: string[];
  dossier?: { title: string; description: string };
  isDecisionPoint?: false;
}

export interface DecisionPoint {
  id: 'decision';
  isDecisionPoint: true;
  title: string;
  question: string;
  yesLabel: string;
  noLabel: string;
}

export interface ReviseStep {
  id: 'revise';
  stepNumber: number;
  title: string;
  shortLabel: string;
  description: string;
  icon: string;
  color: string;
  colorLight: string;
}

export type MethodologyItem = MethodologyStep | DecisionPoint | ReviseStep;

export const METHODOLOGY_STEPS: MethodologyStep[] = [
  {
    id: 'step-1',
    stepNumber: 1,
    title: 'CLIENT INQUIRY',
    shortLabel: '1. CLIENT INQUIRY',
    description:
      'Receive inquiry via phone, email, website or referral. Every engagement begins with understanding the client\'s initial needs.',
    icon: 'HelpCircle',
    color: '#1a3a5c',
    colorLight: '#e8eef6',
  },
  {
    id: 'step-2',
    stepNumber: 2,
    title: 'INITIAL CONSULTATION / NEEDS ASSESSMENT & DOSSIER',
    shortLabel: '2. INITIAL CONSULTATION',
    description:
      'Assess challenges, needs and goals. Create and open a client Dossier to track documents and correspondence throughout the project.',
    icon: 'Users',
    color: '#2d8a4e',
    colorLight: '#e6f4ec',
    subPoints: [
      'Understand client\'s challenges, needs and goals.',
      'Create and open client Dossier.',
      'Collect preliminary information and documents to build the Dossier.',
    ],
    dossier: {
      title: 'DOSSIER',
      description:
        'Client information, documents, analysis and correspondence filed and updated throughout the project.',
    },
  },
  {
    id: 'step-3',
    stepNumber: 3,
    title: 'DEFINE OBJECTIVES & SCOPE',
    shortLabel: '3. DEFINE OBJECTIVES',
    description:
      'Agree on objectives, deliverables, timeline and budget. Establish clear boundaries and expectations for the engagement.',
    icon: 'Target',
    color: '#3a9d5e',
    colorLight: '#eaf7ee',
  },
  {
    id: 'step-4',
    stepNumber: 4,
    title: 'RESEARCH & SITUATION ANALYSIS',
    shortLabel: '4. RESEARCH & ANALYSIS',
    description:
      'Collect data, assess the situation and identify opportunities. A thorough analysis forms the foundation of effective recommendations.',
    icon: 'Search',
    color: '#17a2b8',
    colorLight: '#e1f5f8',
  },
  {
    id: 'step-5',
    stepNumber: 5,
    title: 'DEVELOP RECOMMENDATIONS / ACTION PLAN',
    shortLabel: '5. RECOMMENDATIONS',
    description:
      'Design practical and effective solutions tailored to the client\'s specific needs and objectives.',
    icon: 'Lightbulb',
    color: '#6f42c1',
    colorLight: '#f0ebf8',
  },
  {
    id: 'step-6',
    stepNumber: 6,
    title: 'PRESENT PROPOSAL TO CLIENT',
    shortLabel: '6. PRESENT PROPOSAL',
    description:
      'Share findings and proposed solutions with the client for review and approval.',
    icon: 'Presentation',
    color: '#4a5fc1',
    colorLight: '#ebedf8',
  },
  {
    id: 'step-7',
    stepNumber: 7,
    title: 'IMPLEMENT CONSULTING SOLUTION',
    shortLabel: '7. IMPLEMENT',
    description:
      'Execute the agreed interventions and strategies. Put the approved plan into action with precision and accountability.',
    icon: 'Settings',
    color: '#28a745',
    colorLight: '#e6f7ea',
  },
  {
    id: 'step-8',
    stepNumber: 8,
    title: 'MONITOR PROGRESS & PROVIDE SUPPORT',
    shortLabel: '8. MONITOR & SUPPORT',
    description:
      'Track progress, address issues and provide ongoing guidance to ensure successful implementation.',
    icon: 'Headphones',
    color: '#20c997',
    colorLight: '#e5faf3',
  },
  {
    id: 'step-9',
    stepNumber: 9,
    title: 'EVALUATE OUTCOMES & KPIs',
    shortLabel: '9. EVALUATE OUTCOMES',
    description:
      'Measure results against agreed objectives and indicators. Data-driven evaluation ensures accountability.',
    icon: 'ClipboardCheck',
    color: '#0d6efd',
    colorLight: '#e6effd',
  },
  {
    id: 'step-10',
    stepNumber: 10,
    title: 'CLIENT FEEDBACK & CONTINUOUS IMPROVEMENT',
    shortLabel: '10. FEEDBACK',
    description:
      'Gather feedback and identify improvements for future. Client input drives our commitment to continuous improvement.',
    icon: 'MessageSquareMore',
    color: '#7c3aed',
    colorLight: '#f1ecfe',
  },
  {
    id: 'step-11',
    stepNumber: 11,
    title: 'PROJECT CLOSURE',
    shortLabel: '11. PROJECT CLOSURE',
    description:
      'Close the project, document lessons learned and explore future opportunities. A successful closure paves the way for lasting partnerships.',
    icon: 'Handshake',
    color: '#1e3a5f',
    colorLight: '#e7edf5',
  },
];

export const DECISION_POINT: DecisionPoint = {
  id: 'decision',
  isDecisionPoint: true,
  title: 'DECISION POINT',
  question: 'APPROVED?',
  yesLabel: 'YES — Proceed to Implementation',
  noLabel: 'NO — Revise Proposal',
};

export const REVISE_STEP: ReviseStep = {
  id: 'revise',
  stepNumber: 0,
  title: 'REVISE PROPOSAL & REASSESS NEEDS',
  shortLabel: 'REVISE',
  description:
      'Incorporate feedback and adjust the plan. Return to Step 6 to present the revised proposal for another review cycle.',
  icon: 'RotateCcw',
  color: '#e67e22',
  colorLight: '#fdf0e2',
};

export const KEY_BENEFITS = [
  'Structured & Client-Centric Approach',
  'Evidence-Based Recommendations',
  'Measurable Results & Accountability',
  'Continuous Improvement',
  'Long-Term Value & Partnerships',
];

export const ALL_WHEEL_ITEMS: WheelItem[] = [
  ...METHODOLOGY_STEPS,
  REVISE_STEP,
];

export type WheelItem = MethodologyStep | ReviseStep;
