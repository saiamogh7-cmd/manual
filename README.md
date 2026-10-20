# TrackMent — RVCE Project Governance Platform

Official web application, marketing showcase, and interactive user manual for **TrackMent**, the project governance and mentorship tracking platform built exclusively for **RV College of Engineering (RVCE)**.

---

## Quick Start & Running Locally

### Prerequisites
- Node.js `v18+` or `v20+` (verified up to `v24.x`)
- npm `v9+` or `v11+`

### Commands
```bash
# 1. Install dependencies
npm install

# 2. Run local development server (with hot module replacement)
npm run dev

# 3. Typecheck and build production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

The dev server will run locally at `http://localhost:5173/`.

---

## Folder Structure

```
manualweb/
├── public/                  # Static assets & Netlify SPA _redirects
│   └── _redirects           # Netlify SPA rewrite rule (/* -> /index.html 200)
├── reference/               # Design & content reference
│   └── guide.html           # Original approved tactile HTML prototype
├── src/
│   ├── components/          # Reusable, atomic tactile UI components
│   │   ├── Accordion.tsx    # Native details/summary disclosure
│   │   ├── Button.tsx       # Chunky 3D tactile button (primary, secondary, roles)
│   │   ├── Card.tsx         # Card container with thick borders & hard drop shadow
│   │   ├── Chip.tsx         # Filter & parameter pill chip
│   │   ├── Coin.tsx         # Circular numbered step marker / checkbox
│   │   ├── FakeButton.tsx   # In-app button replica for guide steps
│   │   ├── FeatureMiniUis.tsx # CSS-drawn widgets for feature showcase
│   │   ├── Footer.tsx       # Multi-column institutional footer
│   │   ├── Logo.tsx         # Organic gold blob mark + typography (swappable)
│   │   ├── Navbar.tsx       # Sticky blur navigation & accessible mobile drawer
│   │   ├── PageLayout.tsx   # Page wrapper with fade transition & skip-to-content
│   │   ├── PhoneMock.tsx    # 3D tilting phone mockup with mouse perspective
│   │   ├── ProgressBar.tsx  # Chunky striped animated progress track
│   │   ├── ScrollReveal.tsx # Gentle IntersectionObserver scroll reveal
│   │   ├── ScrollToTop.tsx  # Scroll restoration on route transitions
│   │   ├── SectionHeading.tsx # Eyebrow, fluid title, and subtitle
│   │   ├── SkipLink.tsx     # Keyboard accessibility skip-to-content link
│   │   ├── StickyNote.tsx   # Handwritten playful post-it with drop shadow
│   │   ├── Tabs.tsx         # Accessible tablist with arrow key navigation
│   │   ├── Tag.tsx          # Role badges and status tags
│   │   ├── ThemeProvider.tsx # Light/dark/system theme context & persistence
│   │   └── VideoPlayer.tsx  # High-performance lazy YouTube facade & player
│   ├── config/              # Site-wide settings
│   │   └── site.ts          # Brand title, tagline, CTAs, video IDs, contact email
│   ├── content/             # 100% of all site copy & data (Zero hardcoding)
│   │   ├── home.ts          # All 9 sections of the Home landing page
│   │   ├── guide.ts         # User manual: roles, steps, buttons, can/cant rules
│   │   ├── help.ts          # FAQ, troubleshooting directory, and permissions matrix
│   │   └── videos.ts        # Video tutorial metadata and learning checklists
│   ├── hooks/               # Custom React hooks
│   │   ├── useDocumentTitle.ts # Dynamic SEO document.title & meta description updater
│   │   ├── useGuideProgress.ts # LocalStorage step checklist persistence per role
│   │   ├── useScrollReveal.ts  # Viewport intersection observer with motion guard
│   │   └── useTheme.ts         # Theme context consumer hook
│   ├── pages/               # Route page compositions
│   │   ├── HomePage.tsx            # Main advertising & feature showcase page
│   │   ├── GuideRoleChooserPage.tsx # /guide role chooser & saved progress
│   │   ├── GuideRolePage.tsx       # /guide/:role step-by-step interactive manual
│   │   ├── VideosPage.tsx          # /videos dual-role video walkthrough hub
│   │   ├── HelpPage.tsx            # /help searchable FAQ, limits & permissions
│   │   ├── NotFoundPage.tsx        # Friendly 404 page
│   │   └── DevComponentsPage.tsx   # UI component test lab (Dev-only)
│   ├── styles/
│   │   ├── tokens.css       # Source of truth: colors, spacing, borders, shadows
│   │   └── global.css       # Notebook dotted background, reset, fluid typography
│   ├── App.tsx              # Root component with code splitting & routes
│   └── main.tsx             # React 18 DOM mount point
├── vercel.json              # Vercel SPA rewrite rule
├── index.html               # Main HTML entry with SVG favicon, OG, & Twitter tags
├── PROJECT_BRIEF.md         # Architecture standards and design rules
└── package.json             # React 18, Vite, TypeScript, and react-router-dom
```

---

## Content Customization Guide

All text and copy are strictly separated from presentation. You will never need to modify JSX or CSS files to update content.

### 1. How to Update Site Configuration & Video IDs
Open [`src/config/site.ts`](src/config/site.ts):
```typescript
export const siteConfig: SiteConfig = {
  name: 'TrackMent',
  tagline: 'Project governance and mentorship tracking for RV College of Engineering',
  institution: 'RV College of Engineering',
  cta: {
    primary: {
      label: 'Start the guide', // Navbar and Hero primary button label
      to: '/guide',             // Target route or external link
    },
    secondary: {
      label: 'Watch the videos',
      to: '/videos',
    },
  },
  videos: {
    student: 'YOUR_STUDENT_YOUTUBE_ID', // e.g. "M7lc1UVf-VE"
    mentor: 'YOUR_MENTOR_YOUTUBE_ID',   // e.g. "dQw4w9WgXcQ"
  },
  contactEmail: 'trackment@rvce.edu.in', // Footer and Help support email
};
```

### 2. How to Edit Home Page Sections
Open [`src/content/home.ts`](src/content/home.ts):
- **Hero**: Edit headline, subtext, and phone mock dashboard texts.
- **How It Works**: Edit the 4-step workflow steps and descriptions.
- **Roles**: Edit role card capabilities, taglines, and guide links.
- **Feature Showcase**: Edit the 5 feature block titles, descriptions, and bullet points.
- **Quick Facts**: Edit parameter metrics (`50 MB`, `10 Links`, `2 Votes`).
- **Final CTA**: Edit the closing invitation headline and subtitle.

### 3. How to Add a New FAQ or Troubleshooting Solution
Open [`src/content/help.ts`](src/content/help.ts):
- **To add an FAQ**: Add a new item to `faqItems`:
  ```typescript
  {
    id: 'faq-new-question',
    question: 'How do team invites work?',
    answer: 'Team Leads search by student USN and click Invite.',
  }
  ```
- **To add a Troubleshooting Solution**: Add to `troubleshootingItems`:
  ```typescript
  {
    id: 'new-issue-id',
    issue: 'My team code is not recognized',
    solution: 'Team codes must begin with TM- followed by 5 alphanumeric characters.',
  }
  ```
*Note: Any item added here is instantly searchable in the real-time search box on `/help`.*

### 4. How to Add a Guide Step
Open [`src/content/guide.ts`](src/content/guide.ts), locate the desired role (`start`, `student`, `lead`, or `mentor`), and append an object to `steps`:
```typescript
{
  id: 'step-6',
  title: 'Export sprint summary report',
  lookFor: 'Export Summary PDF',
  paragraphs: [
    'Open your sprint milestone overview and tap Export Summary PDF.',
    'Share the generated PDF with your department coordinator.',
  ],
  tip: 'PDF exports include all verified member proofs and timestamps.',
}
```
The application will automatically:
- Increase the total step count (e.g. from `5` to `6`).
- Assign the step its circular numbered [Coin](src/components/Coin.tsx).
- Add an expandable [Accordion](src/components/Accordion.tsx) with the tactile [FakeButton](src/components/FakeButton.tsx).
- Persist checkbox states in `localStorage`.
- Support deep linking (e.g. `/guide/student#step-6`).

### 5. How to Add a New Role
Open [`src/content/guide.ts`](src/content/guide.ts) and add the role definition to `guideContent.roles` with `id`, `title`, `tagline`, `accent` (fill, edge, text), `steps`, `can` list, and `cant` list.

---

## How to Swap the Logo

The TrackMent logo is encapsulated in a single component: [`src/components/Logo.tsx`](src/components/Logo.tsx).

To replace the placeholder organic yellow blob with an official RVCE / TrackMent SVG:
1. Open [`src/components/Logo.tsx`](src/components/Logo.tsx).
2. Replace `<span className="trackment-logo-blob" />` with an `<img>` tag or inline `<svg>` element:
   ```tsx
   export const Logo: React.FC<LogoProps> = ({ showSubtext = false, className = '' }) => {
     return (
       <div className={`trackment-logo ${className}`}>
         <img src="/logo.svg" alt="TrackMent Logo" width={38} height={38} />
         <span className="trackment-logo-text">
           TrackMent
           {showSubtext && <span className="trackment-logo-sub">guide</span>}
         </span>
       </div>
     );
   };
   ```
3. Place your `logo.svg` in the `public/` directory.

---

## YouTube Upload & Video Integration

When uploading your Student and Mentor video tutorials:

1. **Upload to YouTube Studio**:
   - Visibility: Select **Public** or **Unlisted** (*do not use Private*, which prevents embedded playback).
   - Under **Settings → License and distribution**, verify that **"Allow embedding"** is **enabled**.
2. **Copy the 11-character Video ID**:
   - From URL `https://www.youtube.com/watch?v=M7lc1UVf-VE`, the ID is `M7lc1UVf-VE`.
3. **Paste into `src/config/site.ts`**:
   ```typescript
   videos: {
     student: 'M7lc1UVf-VE',
     mentor: 'YOUR_MENTOR_ID',
   }
   ```
*If a video ID is left empty (`""`), the application automatically renders a styled "Video Tutorial Coming Soon" card with zero broken player errors.*

---

## Production Deployment Guide

The project is pre-configured for instant zero-configuration deployment to **Vercel** or **Netlify**.

### Deploying on Vercel
1. Push your repository to GitHub / GitLab.
2. Import the project in Vercel.
3. Vercel automatically detects Vite:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. The included [`vercel.json`](vercel.json) handles Single Page Application (SPA) routing rewrites so that refreshing deep routes like `/guide/lead` or `/help` works seamlessly.

### Deploying on Netlify
1. Connect your repository to Netlify.
2. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. The included [`public/_redirects`](public/_redirects) is automatically copied to `dist/_redirects`, routing all URLs (`/*`) to `/index.html 200` to prevent 404 errors on browser refresh.

---

## Design System Tokens

All styling is strictly governed by CSS custom properties in [`src/styles/tokens.css`](src/styles/tokens.css):
- **Brand Colors**: Sunny yellow (`#FFD64D`), gold edge (`#DCA828`), warm brown (`#3A2620`), cream card (`#FFFDF9`), line (`#F2DFCB`).
- **Role Accents**: Student teal (`#107C77`), Team Lead orange (`#C65116`), Faculty Mentor indigo (`#4D4DBF`).
- **Dark Mode**: Deep brown backgrounds (`#2B1D18`, `#1F1512`, card `#35241E`) with cream text (`#FFF1DC`).
- **Notebook Paper Background**: Radial dot grid with soft warm gradient matching `/reference/guide.html`.
- **Accessibility**: Support for `prefers-color-scheme`, manual theme switcher, and `prefers-reduced-motion`.
