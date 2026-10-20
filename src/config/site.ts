export interface SiteConfig {
  name: string;
  tagline: string;
  institution: string;
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
  contactEmail: 'trackment@rvce.edu.in',
};
