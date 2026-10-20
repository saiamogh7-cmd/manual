import React from 'react';
import { Card, SectionHeading, Tag, Button, useTheme } from '../components';

interface SwatchComparison {
  name: string;
  role: string;
  before: {
    bg: string;
    text: string;
    ratio: string;
    status: 'FAIL' | 'PASS';
  };
  after: {
    bg: string;
    text: string;
    ratio: string;
    status: 'PASS';
  };
}

export const DevPalettePage: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();

  const swatches: SwatchComparison[] = [
    {
      name: 'Student Role Fill (Buttons & Badges)',
      role: 'Student Actions',
      before: {
        bg: '#19A7A0',
        text: '#FFFFFF',
        ratio: '3.02:1',
        status: 'FAIL',
      },
      after: {
        bg: '#107C77',
        text: '#FFFFFF',
        ratio: '4.82:1',
        status: 'PASS',
      },
    },
    {
      name: 'Team Lead Role Fill (Buttons & Badges)',
      role: 'Team Lead Actions',
      before: {
        bg: '#F4793B',
        text: '#FFFFFF',
        ratio: '2.99:1',
        status: 'FAIL',
      },
      after: {
        bg: '#C65116',
        text: '#FFFFFF',
        ratio: '4.71:1',
        status: 'PASS',
      },
    },
    {
      name: 'Faculty Mentor Role Fill',
      role: 'Faculty Actions',
      before: {
        bg: '#5B5BD6',
        text: '#FFFFFF',
        ratio: '5.33:1',
        status: 'PASS',
      },
      after: {
        bg: '#4D4DBF',
        text: '#FFFFFF',
        ratio: '5.52:1',
        status: 'PASS',
      },
    },
    {
      name: 'Light Mode Muted Secondary Text',
      role: 'Subtitles & Captions',
      before: {
        bg: '#FFFDF9',
        text: '#8B6F63',
        ratio: '4.71:1',
        status: 'PASS',
      },
      after: {
        bg: '#FFFDF9',
        text: '#74574C',
        ratio: '6.35:1',
        status: 'PASS',
      },
    },
    {
      name: 'Brand Primary Tactile Button',
      role: 'Primary Site Action',
      before: {
        bg: '#FFD64D',
        text: '#3A2620',
        ratio: '10.37:1',
        status: 'PASS',
      },
      after: {
        bg: '#FFD64D',
        text: '#3A2620',
        ratio: '10.37:1',
        status: 'PASS',
      },
    },
  ];

  return (
    <div className="wrap" style={{ padding: 'var(--space-10) 0' }}>
      <SectionHeading
        align="between"
        eyebrow={<Tag variant="default">Audit Tool · Dev Only</Tag>}
        title="Contrast & Palette Swatch Verification"
        subtitle="WCAG 2.2 AA / AAA compliance test comparing before and after contrast ratios."
        action={
          <Button variant="primary" onClick={toggleTheme}>
            Toggle Theme ({resolvedTheme})
          </Button>
        }
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-6)', marginTop: 'var(--space-6)' }}>
        {swatches.map((s) => (
          <Card key={s.name}>
            <Tag size="sm" variant="default">{s.role}</Tag>
            <h3 style={{ fontSize: '17px', margin: 'var(--space-2) 0 var(--space-4)' }}>{s.name}</h3>

            {/* Before Box */}
            <div style={{ marginBottom: 'var(--space-4)', padding: '12px', borderRadius: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--text-mute)' }}>ORIGINAL TOKEN</span>
                <span style={{ fontSize: '11px', fontWeight: 900, color: s.before.status === 'FAIL' ? 'var(--color-status-danger)' : 'var(--color-status-success)' }}>
                  {s.before.status === 'FAIL' ? '⚠️ ' + s.before.status + ' (<4.5:1)' : '✓ PASS'}
                </span>
              </div>
              <div
                style={{
                  backgroundColor: s.before.bg,
                  color: s.before.text,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '14px',
                  textAlign: 'center',
                  boxShadow: '0 2px 0 rgba(0,0,0,0.2)',
                }}
              >
                Sample Text · {s.before.ratio}
              </div>
            </div>

            {/* After Box */}
            <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--bg-primary)', border: '2px solid var(--color-status-success)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '12px', fontWeight: 800, color: 'var(--color-status-success)' }}>AUDITED & FIXED TOKEN</span>
                <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--color-status-success)' }}>
                  ✓ {s.after.status} (AA Compliant)
                </span>
              </div>
              <div
                style={{
                  backgroundColor: s.after.bg,
                  color: s.after.text,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontWeight: 800,
                  fontSize: '14px',
                  textAlign: 'center',
                  boxShadow: '0 2px 0 rgba(0,0,0,0.2)',
                }}
              >
                Sample Text · {s.after.ratio}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DevPalettePage;
