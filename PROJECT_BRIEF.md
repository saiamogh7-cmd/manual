# TrackMent — Project Brief

## Product Overview
**TrackMent** is a project governance and mentorship tracking web and mobile platform for **RV College of Engineering (RVCE)**. It streamlines student team formation, contribution logging with verified proof, milestone progress tracking, and structured faculty mentorship meetings. Sign-in is strictly restricted to `@rvce.edu.in` Google accounts.

---

## Core Roles & Capabilities

### 1. Student
- Discover and join teams, or form new project teams.
- Submit contribution proofs (Title, Description, one proof file up to 50 MB [MP4, MOV, MKV, PDF, DOCX, PPTX, JPG, PNG], and up to 10 external links).
- Review mentor guidance, notes, and meeting calls ("Come Meet Me").
- Democratic accountability: Vote on the Team Lead's work (2 votes decide).

### 2. Team Lead
- Recruit and manage team members.
- Review and endorse member submissions.
- Update project milestone progress (0–100% slider in 5% increments with required milestone note).
- Book mentor meetings and manage queue position.
- Capability to execute smooth leadership handover.

### 3. Faculty Mentor
- Claim project teams using unique `TM-XXXXX` team codes.
- Provide targeted feedback:
  - Thumbs up endorsement
  - Guidance notes (up to 500 characters)
  - Action flags: "Come Meet Me"
- Manage live meeting queues and office hour slots.
- Record meeting attendance and milestone verification in the Entry Ledger.

---

## Technology Stack & Constraints
- **Core Framework**: React 18 + Vite + TypeScript
- **Routing**: `react-router-dom`
- **Styling**: Vanilla CSS utilizing semantic CSS custom properties (`tokens.css`)
- **Strict Constraint**: No Tailwind CSS, no component/UI libraries, and no unapproved third-party dependencies.

---

## Architecture & Code Standards
1. **Zero Hardcoded Copy**: All text, strings, FAQs, and role workflows must reside in structured data modules under `src/content/*.ts`.
2. **Design Tokens**: All colors, typography, spacing, border radii, shadows, and transitions must be defined in `src/styles/tokens.css`. No inline or component-level hardcoded colors.
3. **Component Architecture**: Atomic and reusable components live in `src/components/`. Page components in `src/pages/` only compose reusable components.
4. **Accessibility & Responsive**: Mobile-first design, keyboard navigation, clear focus outlines, high contrast compliance, ARIA attributes, dark mode (system preference + manual toggle), and full support for `prefers-reduced-motion`.
5. **Aesthetic Direction**: Faithfully match [reference/guide.html](file:///c:/Users/SAI%20AMOGH/Desktop/manualweb/reference/guide.html):
   - Chunky tactile buttons with depressed 3D states and darker bottom border edges.
   - Warm dotted notebook-paper background pattern.
   - Playful tilted sticky-note callouts.
   - Interactive 3D tilt phone mockup on hero.
   - Stepper timeline with numbered "coin" milestones connected by dashed trails.
6. **No AI Tropes**: No purple/blue neon gradients, no generic glassmorphism, no placeholder lorem ipsum, no stock illustrations.
