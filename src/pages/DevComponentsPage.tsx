import React, { useState } from 'react';
import {
  Button,
  Card,
  Chip,
  Tag,
  Coin,
  Tabs,
  Accordion,
  Callout,
  ProgressBar,
  StickyNote,
  SectionHeading,
  FakeButton,
  PhoneMock,
  Logo,
  useTheme,
} from '../components';
import './DevComponentsPage.css';

export const DevComponentsPage: React.FC = () => {
  const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme();

  // State for interactive components
  const [selectedRoleTab, setSelectedRoleTab] = useState('student');
  const [progressVal, setProgressVal] = useState(65);
  const [activeChip, setActiveChip] = useState('all');
  const [coinStates, setCoinStates] = useState<Record<string, boolean>>({
    '1': true,
    '2': false,
    '3': true,
    '4': false,
  });

  const tabItems = [
    { id: 'start', label: 'Start here' },
    { id: 'student', label: 'Student', roleAccent: 'student' as const },
    { id: 'lead', label: 'Team Lead', roleAccent: 'lead' as const },
    { id: 'mentor', label: 'Faculty Mentor', roleAccent: 'mentor' as const },
  ];

  const toggleCoin = (id: string) => {
    setCoinStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="wrap dev-page">
      <header className="dev-header">
        <Logo showSubtext={true} />
        <h1 style={{ marginTop: 'var(--space-3)' }}>TrackMent Component Showcase</h1>
        <p style={{ color: 'var(--text-mute)' }}>
          Design system component test laboratory. Testing all states, themes, and interactive feedback.
        </p>

        <div className="dev-theme-bar">
          <div>
            <strong>Current Theme:</strong> {theme} (Rendering: <em>{resolvedTheme}</em>)
          </div>
          <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
            <Button variant="primary" onClick={toggleTheme}>
              {resolvedTheme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
            </Button>
            <Button variant="secondary" onClick={() => setTheme('light')}>Light</Button>
            <Button variant="secondary" onClick={() => setTheme('dark')}>Dark</Button>
            <Button variant="ghost" onClick={() => setTheme('system')}>System</Button>
          </div>
        </div>
      </header>

      {/* 1. BUTTONS */}
      <section className="dev-section">
        <h2 className="dev-section-title">1. Buttons (Chunky Tactile, 3px active push)</h2>
        <div className="dev-row">
          <Button variant="primary">Primary Action</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="student">Student Action</Button>
          <Button variant="lead">Team Lead Action</Button>
          <Button variant="mentor">Mentor Action</Button>
        </div>
        <div className="dev-row">
          <Button variant="primary" icon={<span>→</span>} iconPosition="right">With Right Icon</Button>
          <Button variant="secondary" icon={<span>★</span>} iconPosition="left">With Left Icon</Button>
          <Button variant="primary" disabled>Disabled State</Button>
          <Button variant="primary" to="/">As React Router Link</Button>
        </div>
        <div style={{ maxWidth: '400px', marginTop: 'var(--space-2)' }}>
          <Button variant="lead" fullWidth>Full Width Lead Button</Button>
        </div>
      </section>

      {/* 2. CARDS */}
      <section className="dev-section">
        <h2 className="dev-section-title">2. Cards (Thick Border & Hard Bottom Shadow)</h2>
        <div className="dev-grid">
          <Card>
            <h3>Standard Card</h3>
            <p>Default card with hard tactile offset shadow and cream background.</p>
          </Card>

          <Card roleAccent="student">
            <h3>Student Card</h3>
            <p>Accent top border in Student Teal (#19A7A0).</p>
          </Card>

          <Card roleAccent="lead">
            <h3>Team Lead Card</h3>
            <p>Accent top border in Team Lead Orange (#F4793B).</p>
          </Card>

          <Card roleAccent="mentor">
            <h3>Faculty Mentor Card</h3>
            <p>Accent top border in Mentor Indigo (#5B5BD6).</p>
          </Card>

          <Card roleAccent="success">
            <h3>Success / Do Card</h3>
            <p>Used for best practices and approved workflows.</p>
          </Card>

          <Card roleAccent="danger">
            <h3>Danger / Don't Card</h3>
            <p>Used for disallowed actions and security caveats.</p>
          </Card>
        </div>
      </section>

      {/* 3. CHIPS & TAGS */}
      <section className="dev-section">
        <h2 className="dev-section-title">3. Chips & Tags</h2>
        <span className="dev-demo-label">Interactive Chips (Filter / Choice)</span>
        <div className="dev-row">
          <Chip label="All Items" active={activeChip === 'all'} onClick={() => setActiveChip('all')} />
          <Chip label="50 MB max" active={activeChip === '50mb'} onClick={() => setActiveChip('50mb')} />
          <Chip label="10 Links max" active={activeChip === 'links'} onClick={() => setActiveChip('links')} />
          <Chip label="RVCE Only" icon={<span>🔒</span>} active={activeChip === 'rvce'} onClick={() => setActiveChip('rvce')} />
        </div>

        <span className="dev-demo-label" style={{ marginTop: 'var(--space-4)' }}>Tags & Badges</span>
        <div className="dev-row">
          <Tag variant="default">Default Tag</Tag>
          <Tag variant="outline">Outline</Tag>
          <Tag variant="student">Student</Tag>
          <Tag variant="lead">Team Lead</Tag>
          <Tag variant="mentor">Faculty Mentor</Tag>
          <Tag variant="success">Approved</Tag>
          <Tag variant="danger">Blocked</Tag>
          <Tag variant="default" size="sm">Small Tag</Tag>
        </div>
      </section>

      {/* 4. COINS */}
      <section className="dev-section">
        <h2 className="dev-section-title">4. Coins (Step Markers & Checkboxes)</h2>
        <p style={{ color: 'var(--text-mute)', marginBottom: 'var(--space-3)' }}>
          Click or hit Space on any coin to toggle completion. Shows step number when unchecked, transforms into a green checkmark when completed.
        </p>
        <div className="dev-row">
          <Coin
            stepNumber="1"
            checked={coinStates['1']}
            onChange={() => toggleCoin('1')}
            ariaLabel="Step 1 sign in"
          />
          <Coin
            stepNumber="2"
            checked={coinStates['2']}
            onChange={() => toggleCoin('2')}
            ariaLabel="Step 2 profile"
          />
          <Coin
            stepNumber="3"
            checked={coinStates['3']}
            onChange={() => toggleCoin('3')}
            ariaLabel="Step 3 team"
          />
          <Coin
            stepNumber="4"
            checked={coinStates['4']}
            onChange={() => toggleCoin('4')}
            ariaLabel="Step 4 mentor"
          />
          <div style={{ marginLeft: 'var(--space-4)', fontSize: '15px' }}>
            Completed steps: <strong>{Object.values(coinStates).filter(Boolean).length} / 4</strong>
          </div>
        </div>
      </section>

      {/* 5. TABS */}
      <section className="dev-section">
        <h2 className="dev-section-title">5. Tabs (Roving tabindex & Arrow Keys)</h2>
        <Tabs
          items={tabItems}
          selectedId={selectedRoleTab}
          onSelect={setSelectedRoleTab}
          ariaLabel="Choose a role to test"
        />
        <div style={{ marginTop: 'var(--space-3)', padding: 'var(--space-4)', background: 'var(--bg-card)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-line)' }}>
          Selected Role: <strong>{selectedRoleTab.toUpperCase()}</strong>
        </div>
      </section>

      {/* 6. ACCORDION */}
      <section className="dev-section">
        <h2 className="dev-section-title">6. Accordion (Native details/summary)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '700px' }}>
          <Accordion title="What happens if a mentor rejects my proof?" badge={<Tag size="sm" variant="danger">Important</Tag>} defaultOpen={true}>
            <p>
              Your mentor will provide actionable feedback notes (up to 500 characters) explaining what needs improvement.
              You can re-upload your proof file and update your description.
            </p>
          </Accordion>

          <Accordion title="How do team lead votes work?">
            <p>
              To maintain democratic balance, contributions submitted by the Team Lead require votes from at least 2 teammates before final approval.
            </p>
          </Accordion>
        </div>
      </section>

      {/* 7. CALLOUTS */}
      <section className="dev-section">
        <h2 className="dev-section-title">7. Callouts (Tip, Warning, Success)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '700px' }}>
          <Callout variant="tip">
            Personal Gmail accounts will not work. Sign-in requires your active <code>@rvce.edu.in</code> Google account.
          </Callout>

          <Callout variant="warning">
            Your 4-digit faculty code cannot be changed once confirmed. Double check before saving.
          </Callout>

          <Callout variant="success">
            Milestone reached! Your mentor has endorsed your project architecture.
          </Callout>
        </div>
      </section>

      {/* 8. PROGRESS BAR */}
      <section className="dev-section">
        <h2 className="dev-section-title">8. Progress Bar (Chunky, Striped, Animated)</h2>
        <div style={{ maxWidth: '600px', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <ProgressBar value={progressVal} label="Sprint Completion" roleAccent="default" />
          <ProgressBar value={85} label="Student Contributions" roleAccent="student" />
          <ProgressBar value={40} label="Team Milestones" roleAccent="lead" />
          <ProgressBar value={95} label="Mentor Verification" roleAccent="mentor" />

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-2)' }}>
            <label htmlFor="progress-slider" style={{ fontSize: '14px', fontWeight: 700 }}>
              Adjust Slider:
            </label>
            <input
              id="progress-slider"
              type="range"
              min="0"
              max="100"
              step="5"
              value={progressVal}
              onChange={(e) => setProgressVal(Number(e.target.value))}
              style={{ flex: 1 }}
            />
            <span>{progressVal}%</span>
          </div>
        </div>
      </section>

      {/* 9. STICKY NOTES */}
      <section className="dev-section">
        <h2 className="dev-section-title">9. Sticky Notes (Playful Handwritten Style)</h2>
        <div className="dev-row" style={{ alignItems: 'flex-start', minHeight: '100px', padding: 'var(--space-4)' }}>
          <StickyNote rotation={-4}>
            📌 Team progress is at 62%!
          </StickyNote>
          <StickyNote rotation={3}>
            💬 Mentor: &quot;Great job on the schema!&quot;
          </StickyNote>
          <StickyNote rotation={-2}>
            📍 Tap here to submit proof
          </StickyNote>
        </div>
      </section>

      {/* 10. SECTION HEADING */}
      <section className="dev-section">
        <h2 className="dev-section-title">10. Section Heading</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <div className="dev-demo-box">
            <span className="dev-demo-label">Between Alignment (Title + Subtitle + Action)</span>
            <SectionHeading
              align="between"
              eyebrow={<Tag variant="lead">Team Lead Flow</Tag>}
              title="Manage Your Squad"
              subtitle="Review member proofs and update sprint milestone completion in 5% increments."
              action={<Button variant="primary">New Milestone</Button>}
            />
          </div>

          <div className="dev-demo-box">
            <span className="dev-demo-label">Centered Alignment</span>
            <SectionHeading
              align="center"
              eyebrow={<Tag variant="default">Quick Answers</Tag>}
              title="Frequently Asked Questions"
              subtitle="Everything you need to know about team codes, proof formats, and faculty queues."
            />
          </div>
        </div>
      </section>

      {/* 11. FAKE BUTTON */}
      <section className="dev-section">
        <h2 className="dev-section-title">11. Fake Button (In-App Visual Replica)</h2>
        <p style={{ color: 'var(--text-mute)', marginBottom: 'var(--space-3)' }}>
          Used inside the step-by-step manual to show users the exact button text they will see inside TrackMent.
        </p>
        <div className="dev-row">
          <span>Look for: <FakeButton>SUBMIT PROOF</FakeButton></span>
          <span>Or tap: <FakeButton roleAccent="student">REQUEST TO JOIN</FakeButton></span>
          <span>Lead action: <FakeButton roleAccent="lead">UPDATE PROGRESS</FakeButton></span>
          <span>Faculty: <FakeButton roleAccent="mentor">CLAIM TEAM</FakeButton></span>
        </div>
      </section>

      {/* 12. PHONE MOCK */}
      <section className="dev-section">
        <h2 className="dev-section-title">12. Phone Mock (CSS 3D Tilt with Mouse)</h2>
        <p style={{ color: 'var(--text-mute)', marginBottom: 'var(--space-3)' }}>
          Move your mouse over the phone stage to tilt in 3D. Tilts gently with ambient animation when idle, stays static under reduced motion.
        </p>
        <div className="dev-phone-wrapper">
          <PhoneMock
            decorations={
              <>
                <div style={{ position: 'absolute', left: '10px', top: '70px' }}>
                  <StickyNote rotation={-6}>Your team progress</StickyNote>
                </div>
                <div style={{ position: 'absolute', right: '10px', top: '160px' }}>
                  <StickyNote rotation={4}>Mentor feedback</StickyNote>
                </div>
                <div style={{ position: 'absolute', left: '20px', bottom: '40px' }}>
                  <StickyNote rotation={-3}>Tap to log work</StickyNote>
                </div>
              </>
            }
          >
            <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '8px' }}>
              Good morning, Asha
            </div>
            <div style={{ color: 'var(--text-mute)', marginBottom: '4px' }}>
              Team progress 62%
            </div>
            <ProgressBar value={62} height="sm" showValueText={false} />
            <div style={{ marginTop: '12px', background: 'var(--bg-card)', padding: '10px', borderRadius: '12px', border: '1.5px solid var(--border-line)' }}>
              <strong>👍 THUMBS UP</strong>
              <div style={{ fontSize: '11px', color: 'var(--text-mute)', marginTop: '2px' }}>
                Nice work on the login screen!
              </div>
            </div>
            <div style={{ marginTop: '8px', background: 'var(--bg-card)', padding: '10px', borderRadius: '12px', border: '1.5px solid var(--border-line)' }}>
              <div style={{ fontSize: '11px', color: 'var(--text-mute)' }}>Recent submission</div>
              <strong>Built login screen</strong>
            </div>
            <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
              <FakeButton className="full-width" style={{ width: '100%', textAlign: 'center' }}>
                SUBMIT PROOF
              </FakeButton>
            </div>
          </PhoneMock>
        </div>
      </section>
    </div>
  );
};

export default DevComponentsPage;
