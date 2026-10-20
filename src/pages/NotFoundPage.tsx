import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { Button, Card, StickyNote } from '../components';
import { siteConfig } from '../config/site';
import { OpenAppButton } from '../components/OpenAppButton';

export const NotFoundPage: React.FC = () => {
  useDocumentTitle('404 — Page Not Found');

  return (
    <div className="wrap" style={{ padding: 'var(--space-16) var(--space-4)', minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
      <Card style={{ maxWidth: '480px', width: '100%', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-18px', right: '-12px' }}>
          <StickyNote rotation={6}>Lost in the hallway?</StickyNote>
        </div>

        <div style={{ fontSize: '48px', marginBottom: 'var(--space-2)' }}>🧭</div>
        <h1 style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>404 — Page Not Found</h1>
        <p style={{ color: 'var(--text-mute)', margin: 'var(--space-3) 0 var(--space-6)' }}>
          We could not find the page you were looking for. It might have been moved or the URL might be mistyped.
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'center', flexWrap: 'wrap' }}>
          {siteConfig.features?.openAppButton ? (
            <>
              <OpenAppButton size="large" variant="primary" placement="404" />
              <Button variant="secondary" to="/">
                Go to home
              </Button>
            </>
          ) : (
            <>
              <Button variant="primary" to="/">
                Go to home
              </Button>
              <Button variant="secondary" to="/guide">
                Open Guide
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NotFoundPage;
