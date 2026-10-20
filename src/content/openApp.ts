/**
 * Open TrackMent Copy & Text Content
 * Plain, honest microcopy. Strictly adheres to PROJECT_BRIEF.md.
 */

export interface OpenAppContent {
  label: string;
  hero: {
    microcopy: string;
  };
  homeFinal: {
    headline: string;
    microcopy: string;
  };
  guideBanner: {
    heading: string;
    subtext: string;
  };
  guideEnd: {
    heading: string;
    subtext: string;
  };
  videoAfter: {
    microcopy: string;
  };
  helpLogin: {
    microcopy: string;
  };
  footer: {
    label: string;
  };
}

export const openAppContent: OpenAppContent = {
  label: 'Open TrackMent',
  hero: {
    microcopy: 'Sign in with your @rvce.edu.in Google account. Profile setup is quick.',
  },
  homeFinal: {
    headline: 'Ready to run your project without the chaos?',
    microcopy: 'Sign in with your @rvce.edu.in Google account. Profile setup is quick.',
  },
  guideBanner: {
    heading: 'Ready to try it?',
    subtext: 'Open the app in a new tab and follow along. Your place in this guide stays saved on this device.',
  },
  guideEnd: {
    heading: 'You know the steps. Now put them to work.',
    subtext: 'Opens in a new tab. Come back to this guide anytime.',
  },
  videoAfter: {
    microcopy: 'Watched the walkthrough? Try it yourself.',
  },
  helpLogin: {
    microcopy: 'Use your @rvce.edu.in Google account.',
  },
  footer: {
    label: 'Open TrackMent',
  },
};
