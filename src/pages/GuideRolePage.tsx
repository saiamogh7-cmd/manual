import React, { useEffect, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGuideProgress } from '../hooks/useGuideProgress';
import {
  ProgressBar,
  Coin,
  Accordion,
  FakeButton,
  Callout,
  Button,
  Tabs,
  Tag,
  Card,
  VideoPlayer,
} from '../components';
import { NotFoundPage } from './NotFoundPage';
import { siteConfig } from '../config/site';
import { guideContent, GuideRoleKey } from '../content/guide';
import './GuideRolePage.css';

const validRoles: GuideRoleKey[] = ['start', 'student', 'lead', 'mentor'];

const roleOrder: { id: GuideRoleKey; label: string; roleAccent?: 'student' | 'lead' | 'mentor' }[] = [
  { id: 'start', label: 'Start here' },
  { id: 'student', label: 'Student', roleAccent: 'student' },
  { id: 'lead', label: 'Team Lead', roleAccent: 'lead' },
  { id: 'mentor', label: 'Faculty Mentor', roleAccent: 'mentor' },
];

export const GuideRolePage: React.FC = () => {
  const { role } = useParams<{ role: string }>();
  const location = useLocation();
  const { isStepChecked, toggleStep, getRoleProgress, resetRoleProgress } = useGuideProgress();

  const isValid = validRoles.includes(role as GuideRoleKey);
  const currentRoleId = (isValid ? role : 'student') as GuideRoleKey;
  const roleData = guideContent.roles[currentRoleId];

  useDocumentTitle(isValid ? `${roleData.title} Guide — User Manual` : 'Page Not Found');

  // Track which accordions are open; deep-link hash opens that specific step
  const [openSteps, setOpenSteps] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!isValid) return;

    const hash = location.hash.replace('#', '');
    const initialOpen: Record<string, boolean> = {};

    if (hash && roleData.steps.some((s) => s.id === hash)) {
      initialOpen[hash] = true;
      // Scroll to deep-linked step smoothly
      setTimeout(() => {
        const element = document.getElementById(hash);
        element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      // Default: Step 1 open initially
      if (roleData.steps[0]) {
        initialOpen[roleData.steps[0].id] = true;
      }
    }

    setOpenSteps(initialOpen);
  }, [currentRoleId, location.hash, isValid, roleData]);

  if (!isValid) {
    return <NotFoundPage />;
  }

  const progress = getRoleProgress(currentRoleId, roleData.steps.length);

  const currentIndex = roleOrder.findIndex((r) => r.id === currentRoleId);
  const prevRole = currentIndex > 0 ? roleOrder[currentIndex - 1] : null;
  const nextRole = currentIndex < roleOrder.length - 1 ? roleOrder[currentIndex + 1] : null;

  const handleAccordionToggle = (stepId: string, isOpen: boolean) => {
    setOpenSteps((prev) => ({ ...prev, [stepId]: isOpen }));
  };

  const roleAccentForComponent = currentRoleId === 'start' ? 'default' : currentRoleId;

  return (
    <div
      className="wrap guide-role-page"
      style={{
        '--guide-accent-fill': roleData.accent.fill,
        '--guide-accent-edge': roleData.accent.edge,
        '--guide-accent-text': roleData.accent.text,
      } as React.CSSProperties}
    >
      {/* Top Breadcrumb Nav */}
      <div className="guide-role-nav-back">
        <Link to="/guide">← Back to Role Chooser</Link>
      </div>

      {/* Role Switcher Tabs */}
      <Tabs
        items={roleOrder}
        selectedId={currentRoleId}
        onSelect={(newRole) => {
          window.location.hash = '';
          window.history.pushState(null, '', `/guide/${newRole}`);
          const navEvent = new PopStateEvent('popstate');
          window.dispatchEvent(navEvent);
        }}
        ariaLabel="Switch guide role tab"
      />

      {/* Role Header & Meter */}
      <header className="guide-role-header">
        <div className="guide-role-heading-text">
          <div style={{ marginBottom: 'var(--space-2)' }}>
            <Tag variant={currentRoleId === 'start' ? 'default' : currentRoleId}>
              {roleData.title}
            </Tag>
          </div>
          <h1>{roleData.title} Guide</h1>
          <p>{roleData.tagline}</p>
        </div>

        <div className="guide-role-meter">
          <div className="guide-role-meter-label">
            <span>Progress (Device Saved)</span>
            <span>
              {progress.isAllDone
                ? 'All done! 🎉'
                : `${progress.completed} of ${progress.total} done`}
            </span>
          </div>
          <ProgressBar
            value={progress.percentage}
            roleAccent={roleAccentForComponent}
            height="md"
            showValueText={false}
          />
          {progress.completed > 0 && (
            <div style={{ textAlign: 'right', marginTop: '4px' }}>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm(`Reset progress for ${roleData.title}?`)) {
                    resetRoleProgress(currentRoleId);
                  }
                }}
                style={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'var(--text-mute)',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }}
                aria-label={`Reset ${roleData.title} checklist progress`}
              >
                Reset this role's progress
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Small Celebratory State when all steps completed */}
      {progress.isAllDone && (
        <aside className="guide-celebration-banner" role="status" aria-live="polite">
          <div className="guide-celebration-coin-anim" aria-hidden="true">
            ✓
          </div>
          <div>
            <strong style={{ fontSize: '17px', color: 'var(--color-status-success)' }}>
              All steps completed! You’re ready to use TrackMent.
            </strong>
            <p style={{ margin: '4px 0 0', fontSize: '14px', color: 'var(--text-mute)' }}>
              You have reviewed all {progress.total} steps for {roleData.title}. Proceed to the next role or launch TrackMent.
            </p>
          </div>
        </aside>
      )}

      {/* Optional Top Video Walkthrough for Student and Mentor Roles */}
      {(currentRoleId === 'student' || currentRoleId === 'mentor') && (
        <section className="guide-video-section" aria-label={`${roleData.title} Video Tutorial`} style={{ marginBottom: 'var(--space-8)' }}>
          <Card roleAccent={currentRoleId}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-3)', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              <div>
                <Tag variant={currentRoleId} size="sm">Video Walkthrough</Tag>
                <h2 style={{ fontSize: '18px', margin: '4px 0 0' }}>Watch the {roleData.title} Video Guide</h2>
              </div>
              <Button variant="ghost" to={`/videos#${currentRoleId}`} style={{ fontSize: '13px' }}>
                Open in Full Player →
              </Button>
            </div>
            <VideoPlayer
              videoId={siteConfig.videos[currentRoleId]}
              title={`${roleData.title} Walkthrough Video`}
              roleAccent={currentRoleId}
            />
          </Card>
        </section>
      )}

      {/* Vertical Dashed Trail of Steps */}
      <ol className="guide-steps-list" aria-label={`${roleData.title} checklist steps`}>
        {roleData.steps.map((step, idx) => {
          const isChecked = isStepChecked(currentRoleId, step.id);
          const isOpen = Boolean(openSteps[step.id]);

          return (
            <li key={step.id} id={step.id} className="guide-step-row">
              <div className="guide-step-coin-wrap">
                <Coin
                  stepNumber={idx + 1}
                  checked={isChecked}
                  onChange={() => toggleStep(currentRoleId, step.id)}
                  ariaLabel={`Mark step ${idx + 1}: ${step.title} as ${isChecked ? 'not done' : 'done'}`}
                  id={`coin-${step.id}`}
                />
              </div>

              <div className="guide-step-accordion">
                <Accordion
                  title={
                    <span style={{ textDecoration: isChecked ? 'line-through' : 'none', opacity: isChecked ? 0.8 : 1 }}>
                      {step.title}
                    </span>
                  }
                  isOpen={isOpen}
                  onToggle={(open) => handleAccordionToggle(step.id, open)}
                >
                  <div className="guide-step-lookfor">
                    <span>Look for:</span>
                    <FakeButton roleAccent={roleAccentForComponent}>
                      {step.lookFor}
                    </FakeButton>
                  </div>

                  <div className="guide-step-paragraphs">
                    {step.paragraphs.map((para) => (
                      <p key={para}>{para}</p>
                    ))}
                  </div>

                  {step.tip && (
                    <div className="guide-step-tip-wrap">
                      <Callout variant="tip">{step.tip}</Callout>
                    </div>
                  )}
                </Accordion>
              </div>
            </li>
          );
        })}
      </ol>

      {/* Bottom "You Can" and "You Can't" Boxes */}
      <section className="guide-boxes-grid" aria-label="Permitted and Prohibited Actions">
        <div className="guide-do-box">
          <h2 className="guide-box-title" style={{ color: 'var(--color-status-success)' }}>
            You can
          </h2>
          <ul className="guide-box-list">
            {roleData.can.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="guide-dont-box">
          <h2 className="guide-box-title" style={{ color: 'var(--color-status-danger)' }}>
            You can’t
          </h2>
          <ul className="guide-box-list">
            {roleData.cant.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Previous / Next Role Navigation */}
      <nav className="guide-role-bottom-nav" aria-label="Previous and Next Role Navigation">
        <div>
          {prevRole ? (
            <Button variant="secondary" to={`/guide/${prevRole.id}`}>
              ← {prevRole.label}
            </Button>
          ) : (
            <Button variant="secondary" to="/guide">
              ← Role Chooser
            </Button>
          )}
        </div>

        <div>
          {nextRole ? (
            <Button
              variant={nextRole.roleAccent || 'primary'}
              to={`/guide/${nextRole.id}`}
            >
              {nextRole.label} →
            </Button>
          ) : (
            <Button variant="primary" to="/help">
              Quick Answers & FAQ →
            </Button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default GuideRolePage;
