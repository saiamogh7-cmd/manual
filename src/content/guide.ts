export interface GuideStep {
  id: string;
  title: string;
  lookFor: string;
  paragraphs: string[];
  tip?: string;
}

export interface GuideRoleAccent {
  fill: string;
  edge: string;
  text: string;
}

export interface GuideRoleData {
  id: 'start' | 'student' | 'lead' | 'mentor';
  title: string;
  tagline: string;
  accent: GuideRoleAccent;
  steps: GuideStep[];
  can: string[];
  cant: string[];
}

export type GuideRoleKey = 'start' | 'student' | 'lead' | 'mentor';

export interface GuideContent {
  roles: Record<GuideRoleKey, GuideRoleData>;
}

export const guideContent: GuideContent = {
  roles: {
    start: {
      id: 'start',
      title: 'Start here',
      tagline: 'Everyone begins here. It takes about two minutes.',
      accent: {
        fill: 'var(--color-brand-yellow)',
        edge: 'var(--color-brand-gold-edge)',
        text: 'var(--color-brand-brown)',
      },
      steps: [
        {
          id: 'step-1',
          title: 'Sign up with your college Google account',
          lookFor: 'Sign up with RVCE Google Account',
          paragraphs: [
            'Use your @rvce.edu.in account. Students look like name.branchyy@rvce.edu.in. Faculty look like name@rvce.edu.in, with no numbers.',
          ],
          tip: 'Personal Gmail accounts will not work.',
        },
        {
          id: 'step-2',
          title: 'Complete your profile',
          lookFor: 'Save Profile',
          paragraphs: [
            'Students: type the last three digits of your USN (the start is filled in for you), then pick branch, semester and section. Add skills and interests so team leads can find you.',
            'Faculty: choose your department and enter your 4-digit faculty code.',
          ],
          tip: 'The faculty code is permanent, so double-check it.',
        },
        {
          id: 'step-3',
          title: 'Set a password (optional)',
          lookFor: 'Set a password',
          paragraphs: [
            'Open Edit Profile and choose Set a password. TrackMent asks you to confirm with Google first. Then enter a password of 8 or more characters.',
          ],
        },
        {
          id: 'step-4',
          title: 'Forgot your password?',
          lookFor: 'Continue with Google',
          paragraphs: [
            'Sign in with Google, then set a new password in Edit Profile.',
          ],
        },
      ],
      can: [
        'Sign in with any @rvce.edu.in account',
        'Switch between student and faculty setup if the app guessed wrong',
        'Log in with email and password after you set one',
      ],
      cant: [
        'Use a personal email',
        'Change your Google email later',
        'Change your faculty code after saving',
      ],
    },

    student: {
      id: 'student',
      title: 'Student',
      tagline: 'Find a team, log your work and keep your mentor updated.',
      accent: {
        fill: 'var(--color-role-student-fill)',
        edge: 'var(--color-role-student-edge)',
        text: 'var(--color-role-student-text)',
      },
      steps: [
        {
          id: 'step-1',
          title: 'Find or form a team',
          lookFor: 'Join or Create a Team',
          paragraphs: [
            'Create: tap Become a Team Leader, fill in name, title, theme and gist, add members, then Create Team.',
            'Browse: open Browse Recruiting Teams, search, then tap Request to Join. It changes to Requested while you wait.',
            'Invitations: tap View Invitations, then Accept or Decline.',
          ],
          tip: 'Add skills to your profile. Leads search by them.',
        },
        {
          id: 'step-2',
          title: 'Know your dashboard',
          lookFor: 'Dashboard',
          paragraphs: [
            'You’ll see team progress, mentor feedback, recent submissions and the Submit Proof button.',
            'A red Come Meet Me alert means your mentor wants to see you. Go during office hours, or ask your lead to book a slot.',
          ],
        },
        {
          id: 'step-3',
          title: 'Submit your first contribution',
          lookFor: 'Submit Proof',
          paragraphs: [
            'Add a title (up to 200 characters) and describe what you did (up to 5,000).',
            'Attach a file (50 MB max) and add up to 10 links that start with http:// or https://.',
            'Tap Submit Contribution and wait for the upload to finish.',
          ],
          tip: 'Video too big? Record at 720p or share a link instead.',
        },
        {
          id: 'step-4',
          title: 'Check Team Info',
          lookFor: 'Team Info',
          paragraphs: [
            'Here you’ll find your team code (TM-XXXXX), all members, your mentor and every note from them.',
            'No mentor yet? Give your team code to your faculty so they can claim the team.',
          ],
        },
        {
          id: 'step-5',
          title: 'Vote on your lead’s work',
          lookFor: 'Democratic Review',
          paragraphs: [
            'Leads can’t approve their own work, so members vote. Open a Team Lead Submission, check the files and links, then choose Valid or Vote Invalid.',
            'If you reject, give a helpful reason. At least 2 votes make the decision.',
          ],
        },
      ],
      can: [
        'Request to join any recruiting team',
        'Submit as many contributions as you need',
        'Vote on your team lead’s submissions',
        'Leave a team (members only)',
      ],
      cant: [
        'Review or approve your own work',
        'Leave while you are the Team Lead',
        'Undo leaving: your submissions to that team are deleted',
        'Upload files over 50 MB',
      ],
    },

    lead: {
      id: 'lead',
      title: 'Team Lead',
      tagline: 'You get every student feature, plus the Lead Dashboard.',
      accent: {
        fill: 'var(--color-role-lead-fill)',
        edge: 'var(--color-role-lead-edge)',
        text: 'var(--color-role-lead-text)',
      },
      steps: [
        {
          id: 'step-1',
          title: 'Recruit your team',
          lookFor: 'Find Members',
          paragraphs: [
            'Invite: tap Find Members, search by name or USN, then tap Invite. It changes to Invited.',
            'Approve: open Join Requests and tap Accept or Decline for each student.',
          ],
        },
        {
          id: 'step-2',
          title: 'Review member work',
          lookFor: 'Review Work',
          paragraphs: [
            'Open a pending item, check files and Submitted Links, then tap Mark Valid. To reject, tap Mark Invalid and write a reason.',
          ],
          tip: 'You can’t review your own work. Your members vote on it.',
        },
        {
          id: 'step-3',
          title: 'Update project progress',
          lookFor: 'Update Progress',
          paragraphs: [
            'Drag the slider (0 to 100%, in 5% steps), write a Milestone Note such as “Completed login screen”, then tap Save Progress. Every update stays in Progress History.',
          ],
        },
        {
          id: 'step-4',
          title: 'Book a mentor meeting',
          lookFor: 'Book Meeting',
          paragraphs: [
            'Pick a date and time, write the agenda, then tap Send Meeting Request. Your mentor confirms or suggests another time.',
          ],
          tip: 'If it says Meeting Booking Locked, your team has no mentor yet. Share your Team Code with your faculty.',
        },
        {
          id: 'step-5',
          title: 'Hand over leadership (when needed)',
          lookFor: 'Make Team Lead',
          paragraphs: [
            'Tap ⋮ next to a member and choose Make Team Lead. You stay lead until they accept.',
            'If nobody has joined, Revert to Member deletes the team and returns you to being a student.',
          ],
        },
      ],
      can: [
        'Invite students and accept join requests',
        'Validate member contributions',
        'Update progress and book meetings',
        'Hand leadership to another member',
      ],
      cant: [
        'Validate your own contributions',
        'Leave the team without handing over leadership',
        'Book a meeting before a mentor claims the team',
      ],
    },

    mentor: {
      id: 'mentor',
      title: 'Faculty Mentor',
      tagline: 'Guide your teams, answer meeting requests and keep attendance.',
      accent: {
        fill: 'var(--color-role-mentor-fill)',
        edge: 'var(--color-role-mentor-edge)',
        text: 'var(--color-role-mentor-text)',
      },
      steps: [
        {
          id: 'step-1',
          title: 'Claim your team',
          lookFor: 'Assign me as Mentor',
          paragraphs: [
            'Tap Add Team, then search by team code (TM-XXXXX), leader USN, name or project. Tap View Team Info to look first, then Assign me as Mentor and Confirm.',
          ],
          tip: 'Teams that already have a mentor show “Mentored by another faculty”.',
        },
        {
          id: 'step-2',
          title: 'Review the team',
          lookFor: 'View details',
          paragraphs: [
            'See the lead and members, every contribution with its status, View proof for files, and the full feedback history.',
          ],
        },
        {
          id: 'step-3',
          title: 'Send feedback',
          lookFor: 'Send Feedback',
          paragraphs: [
            'Thumbs Up: quick praise with an optional note.',
            'Feedback: up to 500 characters, visible to the whole team instantly.',
            'Come Meet Me: an urgent summons. Add a venue like “Lab 3 at 2:30 PM”.',
          ],
        },
        {
          id: 'step-4',
          title: 'Run the meeting queue',
          lookFor: 'Meeting Queue',
          paragraphs: [
            'Confirm or Reject each Pending Request. Red Flags lists students with 2 or more absences in a row.',
          ],
        },
        {
          id: 'step-5',
          title: 'Record the meeting',
          lookFor: 'Record Meeting in Ledger',
          paragraphs: [
            'Tap Log Meeting, set the date, mark each student Present or Absent, add notes (decisions, homework), then Record Meeting in Ledger.',
          ],
        },
      ],
      can: [
        'Claim teams with their code',
        'Send thumbs-ups, notes and Come Meet Me',
        'Confirm or reject meeting requests',
        'Keep attendance and notes in the ledger',
      ],
      cant: [
        'Claim a team another mentor already has',
        'Change your faculty code',
        'Validate a team lead’s own work (members vote)',
      ],
    },
  },
};
