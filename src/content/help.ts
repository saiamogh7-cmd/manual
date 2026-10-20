export interface HelpLimit {
  label: string;
  value: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface TroubleshootingItem {
  id: string;
  issue: string;
  solution: string;
}

export interface PermissionRow {
  capability: string;
  student: boolean;
  lead: boolean;
  mentor: boolean;
  note?: string;
}

export interface HelpContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  emptySearchTitle: string;
  emptySearchTip: string;
  limitsEyebrow: string;
  limitsTitle: string;
  limits: string[];
  permissionsEyebrow: string;
  permissionsTitle: string;
  permissionsSubtitle: string;
  permissionsTable: PermissionRow[];
  troubleshootingEyebrow: string;
  troubleshootingTitle: string;
  troubleshootingItems: TroubleshootingItem[];
  faqEyebrow: string;
  faqTitle: string;
  faqItems: FaqItem[];
  stillStuckTitle: string;
  stillStuckBody: string;
}

export const helpContent: HelpContent = {
  eyebrow: 'Knowledge Base & Support',
  title: 'Help, FAQ & Permissions',
  subtitle: 'Find answers to common questions, system limits, permission boundaries, and instant troubleshooting solutions.',
  searchPlaceholder: 'Search for a problem, like “locked”, “password”, or “upload”...',
  emptySearchTitle: 'No answers match your query',
  emptySearchTip: 'Try using simpler keywords like “email”, “mentor”, or “code”, or contact your department coordinator.',

  limitsEyebrow: 'System Parameters',
  limitsTitle: 'TrackMent Technical Limits',
  limits: [
    'Proof files: 50 MB max',
    'MP4 · MOV · MKV · PDF · DOCX · PPTX · JPG · PNG',
    'Title: 200 characters max',
    'Description: 5,000 characters max',
    'Up to 10 external links',
    'Mentor note: 500 characters max',
    '2 votes decide a lead’s work',
    'Sign-in: @rvce.edu.in accounts only',
  ],

  permissionsEyebrow: 'Access Governance',
  permissionsTitle: 'Role Permissions Matrix',
  permissionsSubtitle: 'Detailed overview of capabilities across Student, Team Lead, and Faculty Mentor roles.',
  permissionsTable: [
    {
      capability: 'Sign in with @rvce.edu.in Google account',
      student: true,
      lead: true,
      mentor: true,
      note: 'Personal Gmail is barred',
    },
    {
      capability: 'Request to join recruiting teams',
      student: true,
      lead: false,
      mentor: false,
      note: 'One active squad per student',
    },
    {
      capability: 'Create a new project team',
      student: true,
      lead: true,
      mentor: false,
      note: 'Creator becomes Team Lead',
    },
    {
      capability: 'Submit contribution proofs (50 MB & 10 links)',
      student: true,
      lead: true,
      mentor: false,
      note: 'Unlimited contributions',
    },
    {
      capability: 'Vote on Team Lead deliverables',
      student: true,
      lead: false,
      mentor: false,
      note: '2 votes decide approval',
    },
    {
      capability: 'Review & validate member contributions',
      student: false,
      lead: true,
      mentor: false,
      note: 'Leads review squad member work',
    },
    {
      capability: 'Adjust sprint progress slider (0–100%)',
      student: false,
      lead: true,
      mentor: false,
      note: '5% steps + milestone note',
    },
    {
      capability: 'Book faculty mentor meetings',
      student: false,
      lead: true,
      mentor: false,
      note: 'Requires claimed team mentor',
    },
    {
      capability: 'Hand over leadership to a squad member',
      student: false,
      lead: true,
      mentor: false,
      note: 'Make Team Lead action',
    },
    {
      capability: 'Leave a team',
      student: true,
      lead: false,
      mentor: false,
      note: 'Leads must handover first',
    },
    {
      capability: 'Claim teams with TM-XXXXX code',
      student: false,
      lead: false,
      mentor: true,
      note: 'Exclusive to claimed mentor',
    },
    {
      capability: 'Send Thumbs Up & feedback notes',
      student: false,
      lead: false,
      mentor: true,
      note: 'Up to 500 characters',
    },
    {
      capability: 'Issue "Come Meet Me" action flags',
      student: false,
      lead: false,
      mentor: true,
      note: 'Appears as red alert on dashboard',
    },
    {
      capability: 'Manage meeting queue & confirm slots',
      student: false,
      lead: false,
      mentor: true,
      note: 'Approve or reject requests',
    },
    {
      capability: 'Record attendance in Entry Ledger',
      student: false,
      lead: false,
      mentor: true,
      note: 'Official RVCE compliance ledger',
    },
  ],

  troubleshootingEyebrow: 'Troubleshooting Guide',
  troubleshootingTitle: 'Quick fixes for common issues',
  troubleshootingItems: [
    {
      id: 'email-domain',
      issue: 'Page says “Use your @rvce.edu.in email”',
      solution: 'Only official RVCE Google Workspace accounts work. Sign in with your college account (e.g. name.branchyy@rvce.edu.in for students, name@rvce.edu.in for faculty). Personal Gmail or external email addresses are strictly blocked.',
    },
    {
      id: 'wrong-password',
      issue: '“Wrong email or password” error',
      solution: 'You may not have set an explicit password yet. Click “Continue with Google” to sign in with your college account, then open Edit Profile and choose “Set a password” (8+ characters) if you wish to use password login.',
    },
    {
      id: 'meeting-locked',
      issue: 'Book Meeting is locked / disabled',
      solution: 'If the app displays “Meeting Booking Locked”, your team does not have an assigned faculty mentor yet. Locate your unique team code (TM-XXXXX) in Team Info and provide it to your faculty guide so they can claim your squad.',
    },
    {
      id: 'upload-failed',
      issue: 'My proof upload failed',
      solution: 'Check your file size: TrackMent allows up to 50 MB per file. Also confirm the format is supported: MP4, MOV, MKV, PDF, DOCX, PPTX, JPG, or PNG. For high-resolution video recordings, export at 720p or upload to Google Drive / YouTube and paste the link in the external links field.',
    },
    {
      id: 'cant-leave-team',
      issue: 'I can’t leave my team',
      solution: 'Team Leads cannot leave a squad while holding leadership because it would orphan the project. You must first transfer leadership to another member via “Make Team Lead”. Once they accept, you become a regular member and can leave.',
    },
    {
      id: 'session-expired',
      issue: 'Session expired / Token invalid',
      solution: 'College security policies automatically cycle authentication sessions after periods of inactivity. Simply click Sign In with RVCE Google Account again to refresh your session and continue right where you left off.',
    },
    {
      id: 'faculty-code',
      issue: 'Faculty code already in use or rejected',
      solution: 'Every faculty member’s 4-digit code is permanently assigned and unique across RVCE departments. Verify the digits with your department head. Note that once saved, faculty codes cannot be edited without administrator assistance.',
    },
    {
      id: 'delete-account',
      issue: 'How do I delete my account?',
      solution: 'Open Edit Profile, scroll to the bottom Danger Zone, and select Delete Account. Note that this cannot be undone: your profile, skills, and solo draft submissions will be permanently wiped from TrackMent.',
    },
  ],

  faqEyebrow: 'General Questions',
  faqTitle: 'Frequently Asked Questions',
  faqItems: [
    {
      id: 'faq-team-size',
      question: 'What is the recommended team size in TrackMent?',
      answer: 'Standard RVCE capstone teams typically consist of 3 to 4 students. Team Leads can view recruiting applicant lists and invite students directly by USN or name.',
    },
    {
      id: 'faq-democratic-review',
      question: 'Why do members need to vote on the Team Lead’s submissions?',
      answer: 'Because Team Leads have authority to approve members’ work, a conflict of interest would arise if they could approve their own deliverables. The Democratic Review system requires at least 2 teammates to review files and vote “Valid” before the lead’s submission is marked completed.',
    },
    {
      id: 'faq-progress-history',
      question: 'Can progress adjustments be reverted by mentors?',
      answer: 'Every progress slider adjustment is permanently logged in the Progress History audit trail with its milestone note, date, and user stamp. Faculty mentors can inspect the full historical timeline during review sessions.',
    },
    {
      id: 'faq-multiple-mentors',
      question: 'Can a faculty mentor supervise multiple teams?',
      answer: 'Yes. Faculty can claim multiple squads by searching and confirming their TM-XXXXX team codes. Each claimed team appears as a card on the mentor’s dashboard with individual queues and ledgers.',
    },
  ],

  stillStuckTitle: 'Still have an unresolved question?',
  stillStuckBody: 'If your problem isn’t listed here or you need administrator intervention for your RVCE Google account, reach out to our campus support team.',
};
