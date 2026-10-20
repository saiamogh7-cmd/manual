export interface VideoDetail {
  id: 'student' | 'mentor';
  title: string;
  tagline: string;
  description: string;
  roleAccent: 'student' | 'mentor';
  guidePath: string;
  guideCta: string;
  whatYouWillLearn: string[];
}

export interface VideosPageContent {
  eyebrow: string;
  title: string;
  subtitle: string;
  comingSoonTitle: string;
  comingSoonSubtitle: string;
  learnSectionTitle: string;
  videos: Record<'student' | 'mentor', VideoDetail>;
}

export const videosContent: VideosPageContent = {
  eyebrow: 'Video Tutorials',
  title: 'TrackMent Video Walkthroughs',
  subtitle: 'Watch step-by-step demonstrations showing the exact buttons, flows, and ledger controls in TrackMent.',
  comingSoonTitle: 'Video Tutorial Coming Soon',
  comingSoonSubtitle: 'Our team is preparing this high-definition walkthrough for RVCE students and faculty. In the meantime, explore the complete written guide.',
  learnSectionTitle: 'What you’ll learn in this video',
  videos: {
    student: {
      id: 'student',
      title: 'Student Walkthrough: Sign-In to Proof Submission',
      tagline: 'End-to-end walkthrough for RVCE student team members',
      description: 'Follow along as we sign in with an @rvce.edu.in Google account, browse recruiting project teams, submit verified proof files with links, and vote on lead deliverables.',
      roleAccent: 'student',
      guidePath: '/guide/student',
      guideCta: 'Read the written Student Guide',
      whatYouWillLearn: [
        'Signing in and verifying your @rvce.edu.in account and student USN',
        'Finding and requesting to join squads or creating your own team',
        'Submitting verified contribution proofs (50 MB max) and up to 10 links',
        'Reviewing mentor guidance notes and voting on your Team Lead’s work',
      ],
    },
    mentor: {
      id: 'mentor',
      title: 'Faculty Walkthrough: Claiming Teams & Entry Ledger',
      tagline: 'Complete workflow for RVCE faculty supervisors and mentors',
      description: 'See how faculty mentors claim assigned project teams using TM-XXXXX codes, monitor sprint progress, provide targeted feedback, and record attendance in the Entry Ledger.',
      roleAccent: 'mentor',
      guidePath: '/guide/mentor',
      guideCta: 'Read the written Faculty Guide',
      whatYouWillLearn: [
        'Claiming student teams in seconds using unique TM-XXXXX team codes',
        'Reviewing uploaded student proof documents and external links',
        'Sending instant Thumbs Up praise, 500-char feedback, or "Come Meet Me" flags',
        'Managing live office hour meeting queues and logging attendance in the Entry Ledger',
      ],
    },
  },
};
