export interface HeroContent {
  eyebrow: string;
  headline: string;
  subtext: string;
  phoneMock: {
    greeting: string;
    teamProgressLabel: string;
    teamProgressValue: number;
    mentorFeedbackTitle: string;
    mentorFeedbackBody: string;
    recentSubmissionLabel: string;
    recentSubmissionTitle: string;
    buttonText: string;
    stickyNotes: {
      progress: string;
      mentor: string;
      submit: string;
    };
  };
}

export interface TrustStripContent {
  title: string;
  tag: string;
  chips: string[];
}

export interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
}

export interface RoleCardContent {
  role: 'student' | 'lead' | 'mentor';
  title: string;
  eyebrow: string;
  description: string;
  capabilities: string[];
  ctaLabel: string;
  to: string;
}

export interface FeatureShowcaseItem {
  id: string;
  title: string;
  eyebrow: string;
  description: string;
  bullets: string[];
  uiType: 'progress' | 'voting' | 'feedback' | 'ledger' | 'realtime';
}

export interface VideoPreviewItem {
  id: string;
  role: 'student' | 'mentor';
  title: string;
  description: string;
  durationTag: string;
  to: string;
}

export interface QuickFact {
  metric: string;
  label: string;
  description: string;
}

export interface FaqPreviewItem {
  question: string;
  answer: string;
}

export interface HomeContent {
  hero: HeroContent;
  trustStrip: TrustStripContent;
  howItWorks: {
    eyebrow: string;
    title: string;
    subtitle: string;
    steps: HowItWorksStep[];
  };
  roles: {
    eyebrow: string;
    title: string;
    subtitle: string;
    cards: RoleCardContent[];
  };
  features: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FeatureShowcaseItem[];
  };
  videos: {
    eyebrow: string;
    title: string;
    subtitle: string;
    allVideosCta: string;
    items: VideoPreviewItem[];
  };
  quickFacts: {
    eyebrow: string;
    title: string;
    items: QuickFact[];
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewAllCta: string;
    items: FaqPreviewItem[];
  };
  finalCta: {
    title: string;
    subtitle: string;
  };
}

export const homeContent: HomeContent = {
  hero: {
    eyebrow: 'RV College of Engineering',
    headline: 'Run your capstone project without the chaos.',
    subtext: 'TrackMent gives RVCE student teams verified contribution logs, milestone progress tracking, and structured faculty mentorship — all tied to your institutional Google account.',
    phoneMock: {
      greeting: 'Good morning, Asha',
      teamProgressLabel: 'Team progress',
      teamProgressValue: 62,
      mentorFeedbackTitle: '👍 THUMBS UP',
      mentorFeedbackBody: 'Nice work on the login screen!',
      recentSubmissionLabel: 'Recent submission',
      recentSubmissionTitle: 'Built login screen',
      buttonText: 'SUBMIT PROOF',
      stickyNotes: {
        progress: 'Your team’s progress',
        mentor: 'Notes from your mentor',
        submit: 'Tap here to log your work',
      },
    },
  },

  trustStrip: {
    title: 'Built exclusively for RVCE',
    tag: 'Institutional Governance',
    chips: [
      'Students · Team Formation & Proofs',
      'Team Leads · 5% Milestone Tracking',
      'Faculty Mentors · TM-XXXXX Entry Ledger',
    ],
  },

  howItWorks: {
    eyebrow: 'Simple Four-Step Workflow',
    title: 'From project kickoff to faculty sign-off',
    subtitle: 'TrackMent mirrors real engineering accountability with clear deliverables, team checks, and faculty review.',
    steps: [
      {
        step: 1,
        title: 'Form a team',
        description: 'Sign in with your @rvce.edu.in account, list your skills, and recruit peers or join an existing squad.',
      },
      {
        step: 2,
        title: 'Log your work',
        description: 'Submit verified proof files up to 50 MB and add up to 10 live external links with every commit.',
      },
      {
        step: 3,
        title: 'Review and vote',
        description: 'Teammates review each other’s deliverables; at least two peer votes approve the Team Lead’s work.',
      },
      {
        step: 4,
        title: 'Meet your mentor',
        description: 'Book office hour slots, join the live queue, receive guidance flags, and sign the official Entry Ledger.',
      },
    ],
  },

  roles: {
    eyebrow: 'Role-Based Architecture',
    title: 'Tailored tools for every project member',
    subtitle: 'Whether you are contributing code, steering squad milestones, or grading capstones, TrackMent keeps everyone aligned.',
    cards: [
      {
        role: 'student',
        eyebrow: 'Core Contributor',
        title: 'Student',
        description: 'Focus on building and logging verified contributions without messy status reports or lost file versions.',
        capabilities: [
          'Submit 50 MB proof files with up to 10 external links',
          'Read direct mentor feedback and "Come Meet Me" flags',
          'Vote democratically to approve Team Lead deliverables',
        ],
        ctaLabel: 'Read Student Guide',
        to: '/guide/student',
      },
      {
        role: 'lead',
        eyebrow: 'Squad Coordinator',
        title: 'Team Lead',
        description: 'Lead team sprints, review member work, communicate progress to mentors, and maintain momentum.',
        capabilities: [
          'Adjust overall progress slider from 0% to 100% in 5% steps',
          'Review, endorse, or request revisions on teammate proofs',
          'Book mentorship slots and handle leadership handover seamlessly',
        ],
        ctaLabel: 'Read Team Lead Guide',
        to: '/guide/lead',
      },
      {
        role: 'mentor',
        eyebrow: 'Academic Supervisor',
        title: 'Faculty Mentor',
        description: 'Claim your assigned teams, track verified deliverables, give targeted feedback, and record attendance.',
        capabilities: [
          'Claim squads easily using unique TM-XXXXX team codes',
          'Send thumbs up notes, 500-character advice, or meeting calls',
          'Manage live office queue and record attendance in Entry Ledger',
        ],
        ctaLabel: 'Read Faculty Guide',
        to: '/guide/mentor',
      },
    ],
  },

  features: {
    eyebrow: 'Engineered for Accountability',
    title: 'Features built for genuine project governance',
    subtitle: 'No guesswork, no fake updates. Every contribution is verified, visible, and backed by institutional rigor.',
    items: [
      {
        id: 'progress',
        eyebrow: 'Sprint Tracking',
        title: 'Granular 5% milestone progress tracking',
        description: 'Team leads adjust project progress using a tactile 5% step slider accompanied by mandatory milestone notes, keeping department heads and mentors informed.',
        bullets: [
          'Strict 5% step progression to prevent arbitrary jumps',
          'Mandatory milestone context notes for audit trails',
          'Historical milestone timeline accessible to mentors',
        ],
        uiType: 'progress',
      },
      {
        id: 'voting',
        eyebrow: 'Democratic Balance',
        title: 'Democratic review on Team Lead work',
        description: 'To prevent unilateral approvals or lead bottlenecks, contributions submitted by Team Leads require affirmative votes from at least 2 team members.',
        bullets: [
          '2 independent peer votes required to approve lead tasks',
          'Transparent ballot log visible to the entire team',
          'Protects squad members against unaccountable leaders',
        ],
        uiType: 'voting',
      },
      {
        id: 'feedback',
        eyebrow: 'Faculty Guidance',
        title: 'Targeted mentor feedback & "Come Meet Me"',
        description: 'Faculty mentors don’t just grade at the end; they provide rapid feedback with thumbs-up endorsements, 500-character targeted tips, or a clear "Come Meet Me" directive.',
        bullets: [
          'Instant feedback flags: Thumbs Up, Needs Revision, Come Meet Me',
          '500-character focused notes for actionable iteration',
          'Visible alert tags on student dashboards',
        ],
        uiType: 'feedback',
      },
      {
        id: 'ledger',
        eyebrow: 'Audit & Compliance',
        title: 'Live meeting queue and Entry Ledger',
        description: 'Eliminate chaotic office-hour lines. Teams join a live meeting queue, and faculty log attendance directly into the timestamped Entry Ledger for RVCE records.',
        bullets: [
          'Real-time queue position for project review meetings',
          'Faculty-signed attendance timestamped in Entry Ledger',
          'Exportable audit records for department project coordinators',
        ],
        uiType: 'ledger',
      },
      {
        id: 'realtime',
        eyebrow: 'Mobile & Desktop',
        title: 'Real-time updates across web and mobile',
        description: 'Engineered as a responsive web app that works on campus lab desktops and students’ mobile devices, keeping everyone notified on sprint deliverables.',
        bullets: [
          'Works reliably on smartphones, tablets, and lab workstations',
          'Zero app store friction — sign in directly with @rvce.edu.in',
          'Light and dark mode tailored for late-night lab sessions',
        ],
        uiType: 'realtime',
      },
    ],
  },

  videos: {
    eyebrow: 'Video Walkthroughs',
    title: 'See TrackMent in action',
    subtitle: 'Watch end-to-end demonstrations of team formation, proof submission, and mentor ledger attendance.',
    allVideosCta: 'View All Video Tutorials →',
    items: [
      {
        id: 'student-video',
        role: 'student',
        title: 'Student Walkthrough: Sign-In to Proof Submission',
        description: 'Learn how to register with your @rvce.edu.in email, join a project team, and upload verified proof files up to 50 MB.',
        durationTag: 'Video Tutorial',
        to: '/videos#student',
      },
      {
        id: 'mentor-video',
        role: 'mentor',
        title: 'Faculty Walkthrough: Claiming Teams & Entry Ledger',
        description: 'Watch how faculty enter TM-XXXXX team codes, review student proofs, send feedback, and record attendance.',
        durationTag: 'Video Tutorial',
        to: '/videos#mentor',
      },
    ],
  },

  quickFacts: {
    eyebrow: 'System Specifications',
    title: 'By the numbers: TrackMent parameters',
    items: [
      {
        metric: '50 MB',
        label: 'Proof File Limit',
        description: 'Supports MP4, MOV, MKV, PDF, DOCX, PPTX, JPG, and PNG files.',
      },
      {
        metric: '10 Links',
        label: 'External References',
        description: 'Link GitHub repos, Figma prototypes, Colab notebooks, and Drive folders.',
      },
      {
        metric: '2 Votes',
        label: 'Lead Verification',
        description: 'Peer votes required to approve work submitted by the Team Lead.',
      },
      {
        metric: '@rvce.edu.in',
        label: 'Google Account Only',
        description: 'Enforced institutional authentication for students and faculty.',
      },
    ],
  },

  faq: {
    eyebrow: 'Got Questions?',
    title: 'Frequently asked questions',
    subtitle: 'Common questions from students and faculty getting started with TrackMent.',
    viewAllCta: 'View All FAQ & Quick Answers →',
    items: [
      {
        question: 'Why won’t my personal Gmail account work for login?',
        answer: 'TrackMent is an official RV College of Engineering system. Access is strictly limited to active @rvce.edu.in institutional Google Workspace accounts for student USN validation and faculty code compliance.',
      },
      {
        question: 'What happens if our team progress slider needs adjustment?',
        answer: 'Only the Team Lead can update the project progress slider, moving in 5% increments. Every adjustment requires a mandatory milestone note explaining what was completed since the last update.',
      },
      {
        question: 'How do faculty mentors claim student project teams?',
        answer: 'Each team is assigned a unique TM-XXXXX team code upon squad formation. The Faculty Mentor simply navigates to their dashboard, inputs the code, and gains instant oversight of the squad’s deliverables and meeting ledger.',
      },
    ],
  },

  finalCta: {
    title: 'Ready to bring order to your capstone project?',
    subtitle: 'Start with the five-minute interactive guide or jump straight into TrackMent with your RVCE Google account.',
  },
};
