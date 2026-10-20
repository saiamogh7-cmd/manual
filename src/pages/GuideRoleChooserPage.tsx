import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useGuideProgress } from '../hooks/useGuideProgress';
import { SectionHeading, Card, Tag, Button, ProgressBar, ScrollReveal } from '../components';
import { guideContent } from '../content/guide';
import './GuideRoleChooserPage.css';

export const GuideRoleChooserPage: React.FC = () => {
  useDocumentTitle('Choose Your Role — User Guide');
  const { getRoleProgress, resetAllProgress } = useGuideProgress();

  const startRole = guideContent.roles.start;
  const startProgress = getRoleProgress('start', startRole.steps.length);

  const mainRoles = [
    { ...guideContent.roles.student, accentKey: 'student' as const },
    { ...guideContent.roles.lead, accentKey: 'lead' as const },
    { ...guideContent.roles.mentor, accentKey: 'mentor' as const },
  ];

  return (
    <div className="wrap guide-chooser-page">
      <SectionHeading
        level="h1"
        align="center"
        eyebrow={<Tag variant="default">TrackMent User Manual</Tag>}
        title="Learn TrackMent in five minutes"
        subtitle="Pick your role, follow the steps, and tick them off as you go. Every step shows the exact button you’ll tap in the app."
      />

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 'var(--space-3)', margin: 'calc(-1 * var(--space-4)) auto var(--space-6)', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '13px', color: 'var(--text-mute)', fontWeight: 600 }}>
          🔒 Step progress is saved automatically on this device only.
        </span>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset checklist progress across all roles on this device?')) {
              resetAllProgress();
            }
          }}
          style={{
            fontSize: '12px',
            fontWeight: 800,
            color: 'var(--color-status-danger)',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          aria-label="Reset all checklist progress"
        >
          Reset all progress
        </button>
      </div>

      {/* "Start here" Card */}
      <ScrollReveal>
        <div className="guide-start-banner">
          <div className="guide-start-card">
            <div className="guide-start-info">
              <Tag variant="default" size="sm">Prerequisite · Everyone</Tag>
              <h3>{startRole.title}</h3>
              <p>{startRole.tagline}</p>
              <div style={{ marginTop: 'var(--space-3)', maxWidth: '380px' }}>
                <div className="guide-progress-text">
                  <span>Registration & Profile</span>
                  <span>{startProgress.completed} of {startProgress.total} done</span>
                </div>
                <ProgressBar
                  value={startProgress.percentage}
                  height="sm"
                  roleAccent="default"
                  showValueText={false}
                />
              </div>
            </div>

            <div className="guide-start-action">
              <Button variant="primary" to="/guide/start">
                Start Here Guide →
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Three Main Role Cards */}
      <div className="guide-roles-grid">
        {mainRoles.map((role, idx) => {
          const progress = getRoleProgress(role.id, role.steps.length);

          return (
            <ScrollReveal key={role.id} delayMs={idx * 100}>
              <Card roleAccent={role.accentKey} className="guide-role-card">
                <Tag variant={role.accentKey} size="sm">Role 0{idx + 1}</Tag>
                <h3>{role.title}</h3>
                <p className="guide-role-tagline">{role.tagline}</p>

                <div className="guide-card-progress">
                  <div className="guide-progress-text">
                    <span>Your Progress</span>
                    <span>{progress.completed} of {progress.total} done</span>
                  </div>
                  <ProgressBar
                    value={progress.percentage}
                    height="sm"
                    roleAccent={role.accentKey}
                    showValueText={false}
                  />
                </div>

                <Button variant={role.accentKey} to={`/guide/${role.id}`} fullWidth>
                  Open {role.title} Guide →
                </Button>
              </Card>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};

export default GuideRoleChooserPage;
