export interface SiteConfig {
  name: string;
  tagline: string;
  institution: string;
  appUrl: string;
  features: {
    openAppButton: boolean;
  };
  cta: {
    primary: {
      label: string;
      to: string;
    };
    secondary: {
      label: string;
      to: string;
    };
  };
  videos: {
    student: string; // YouTube video ID
    mentor: string;  // YouTube video ID
  };
  contactEmail: string;
}

export const siteConfig: SiteConfig = {
  name: 'TrackMent',
  tagline: 'Project governance and mentorship tracking for RV College of Engineering',
  institution: 'RV College of Engineering',
  appUrl: 'https://trackment.vercel.app',
  features: {
    openAppButton: true,
  },
  cta: {
    primary: {
      label: 'Start the guide',
      to: '/guide',
    },
    secondary: {
      label: 'Watch the videos',
      to: '/videos',
    },
  },
  videos: {
    student: '',
    mentor: '',
  },
  contactEmail: 'saiamoghrv.ci25@rvce.edu.in',
};
