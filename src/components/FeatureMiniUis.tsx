import React from 'react';
import { Tag } from './Tag';
import { ProgressBar } from './ProgressBar';
import './FeatureMiniUis.css';

export const ProgressMiniUi: React.FC = () => {
  return (
    <div className="tm-mini-ui-card" aria-hidden="true">
      <div className="tm-mini-ui-header">
        <span className="tm-mini-ui-title">Team Progress Control</span>
        <Tag variant="lead" size="sm">Lead Only</Tag>
      </div>
      <div style={{ margin: 'var(--space-2) 0' }}>
        <ProgressBar value={65} roleAccent="lead" label="Current Sprint Milestone" height="md" />
        <div className="tm-mini-progress-ticks">
          <span>0%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>
      <div className="tm-mini-note-box">
        📝 <strong>Milestone Note:</strong> Completed core login schema and RVCE authentication integration.
      </div>
    </div>
  );
};

export const VotingMiniUi: React.FC = () => {
  return (
    <div className="tm-mini-ui-card" aria-hidden="true">
      <div className="tm-mini-ui-header">
        <span className="tm-mini-ui-title">Lead Deliverable Ballot</span>
        <Tag variant="success" size="sm">2 Votes Reached</Tag>
      </div>
      <div style={{ marginBottom: 'var(--space-3)', fontSize: '13px' }}>
        <strong>Submission:</strong> System Architecture Spec (v2.1)
      </div>
      <div className="tm-mini-vote-item">
        <span>Kiran V. (USN: 042)</span>
        <span className="tm-mini-vote-badge">Voted Yes ✓</span>
      </div>
      <div className="tm-mini-vote-item">
        <span>Asha N. (USN: 088)</span>
        <span className="tm-mini-vote-badge">Voted Yes ✓</span>
      </div>
      <div style={{ fontSize: '11px', color: 'var(--text-mute)', marginTop: '8px', textAlign: 'center' }}>
        Deliverable verified and unlocked for faculty review.
      </div>
    </div>
  );
};

export const FeedbackMiniUi: React.FC = () => {
  return (
    <div className="tm-mini-ui-card" aria-hidden="true">
      <div className="tm-mini-ui-header">
        <span className="tm-mini-ui-title">Faculty Mentor Channel</span>
        <Tag variant="mentor" size="sm">Prof. Code: 4012</Tag>
      </div>
      <div className="tm-mini-alert-flag">
        <span>🚨</span>
        <span>ACTION: COME MEET ME</span>
      </div>
      <div className="tm-mini-quote">
        &quot;Good architecture schema, but please clarify how the proof file size limit is validated before cloud upload.&quot;
      </div>
      <div style={{ display: 'flex', gap: '8px', marginTop: 'var(--space-3)' }}>
        <Tag variant="default" size="sm">500 chars note</Tag>
        <Tag variant="student" size="sm">Slot: 3:30 PM Today</Tag>
      </div>
    </div>
  );
};

export const LedgerMiniUi: React.FC = () => {
  return (
    <div className="tm-mini-ui-card" aria-hidden="true">
      <div className="tm-mini-ui-header">
        <span className="tm-mini-ui-title">Office Hours Entry Ledger</span>
        <Tag variant="default" size="sm">Desk 4 · Dept CSE</Tag>
      </div>
      <div className="tm-mini-queue-status">
        <span>Queue Status</span>
        <span>YOU ARE NEXT (#1)</span>
      </div>
      <div className="tm-mini-ledger-row">
        <span>Team: TM-ALPHA-04</span>
        <strong style={{ color: 'var(--color-status-success)' }}>Attendance Signed ✓</strong>
      </div>
      <div className="tm-mini-ledger-row">
        <span>Timestamp</span>
        <span>20-Oct-2026 · 11:15 AM</span>
      </div>
      <div className="tm-mini-ledger-row">
        <span>Verified By</span>
        <span>Dr. S. Raghavendra (RVCE)</span>
      </div>
    </div>
  );
};

export const RealtimeMiniUi: React.FC = () => {
  return (
    <div className="tm-mini-ui-card" aria-hidden="true">
      <div className="tm-mini-ui-header">
        <span className="tm-mini-ui-title">Live Sync Engine</span>
        <span className="tm-mini-realtime-badge">
          <span className="tm-mini-pulse-dot" />
          <span>LIVE</span>
        </span>
      </div>
      <div style={{ background: 'var(--bg-primary)', padding: '10px 12px', borderRadius: 'var(--radius-md)', marginBottom: '8px' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-mute)', marginBottom: '2px' }}>Student Upload Event</div>
        <strong style={{ fontSize: '13px' }}>Demo_Walkthrough.mp4 (48.2 MB)</strong>
        <div style={{ fontSize: '11px', color: 'var(--tag-text)', marginTop: '2px' }}>
          SHA-256 Verified · 10 Links Attached
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: 'var(--text-mute)', marginTop: 'var(--space-2)' }}>
        <span>Campus Wi-Fi & Mobile 5G</span>
        <span style={{ fontWeight: 800, color: 'var(--text-ink)' }}>Instant Push</span>
      </div>
    </div>
  );
};
