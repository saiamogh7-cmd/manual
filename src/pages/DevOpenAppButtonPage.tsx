import React, { useEffect, useState } from 'react';
import { OpenAppButton } from '../components/OpenAppButton';
import './DevOpenAppButtonPage.css';

interface EventLogItem {
  id: number;
  time: string;
  detail: {
    placement: string;
  };
}

export const DevOpenAppButtonPage: React.FC = () => {
  const [logs, setLogs] = useState<EventLogItem[]>([]);

  useEffect(() => {
    let nextId = 1;
    const handleOpenApp = (e: Event) => {
      const customEvt = e as CustomEvent<{ placement: string }>;
      const item: EventLogItem = {
        id: nextId++,
        time: new Date().toLocaleTimeString(),
        detail: customEvt.detail || { placement: 'unknown' },
      };
      setLogs((prev) => [item, ...prev].slice(0, 10));
    };

    window.addEventListener('open-app', handleOpenApp);
    return () => {
      window.removeEventListener('open-app', handleOpenApp);
    };
  }, []);

  return (
    <div className="dev-showcase">
      <div className="dev-showcase-header">
        <h1 className="dev-showcase-title">Open TrackMent Button Showcase</h1>
        <p className="dev-showcase-desc">
          Development showcase verifying sizes (compact, large, floating), variants (primary, ghost), and states in light and dark mode.
        </p>
      </div>

      {/* Event listener monitor */}
      <section className="dev-showcase-section">
        <h2 className="dev-showcase-section-title">Dispatched 'open-app' CustomEvents</h2>
        <div className="dev-showcase-event-log">
          {logs.length === 0 ? (
            <div className="dev-showcase-log-item">
              Click any active button below to dispatch an &quot;open-app&quot; event...
            </div>
          ) : (
            logs.map((log, idx) => (
              <div
                key={log.id}
                className={`dev-showcase-log-item ${idx === 0 ? 'dev-showcase-log-latest' : ''}`}
              >
                [{log.time}] Event &quot;open-app&quot; dispatched with detail: {JSON.stringify(log.detail)}
              </div>
            ))
          )}
        </div>
      </section>

      {/* Light Theme Matrix */}
      <section className="dev-showcase-section">
        <h2 className="dev-showcase-section-title">Light Theme Matrix</h2>
        <div className="dev-showcase-grid">
          {/* Primary */}
          <div className="dev-showcase-card" data-theme="light">
            <div className="dev-showcase-card-title">
              <span>Primary Variant (Default)</span>
              <span className="dev-showcase-badge">Light</span>
            </div>

            <div>
              <p><strong>Compact:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="compact" variant="primary" placement="dev-light-compact" />
              </div>
            </div>

            <div>
              <p><strong>Large:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="large" variant="primary" placement="dev-light-large" />
              </div>
            </div>

            <div>
              <p><strong>Floating (Inline preview):</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="floating" variant="primary" placement="dev-light-floating" />
              </div>
            </div>
          </div>

          {/* Ghost */}
          <div className="dev-showcase-card" data-theme="light">
            <div className="dev-showcase-card-title">
              <span>Ghost Variant</span>
              <span className="dev-showcase-badge">Light</span>
            </div>

            <div>
              <p><strong>Compact:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="compact" variant="ghost" placement="dev-light-ghost-compact" />
              </div>
            </div>

            <div>
              <p><strong>Large:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="large" variant="ghost" placement="dev-light-ghost-large" />
              </div>
            </div>

            <div>
              <p><strong>Floating (Inline preview):</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="floating" variant="ghost" placement="dev-light-ghost-floating" />
              </div>
            </div>
          </div>

          {/* Disabled State */}
          <div className="dev-showcase-card" data-theme="light">
            <div className="dev-showcase-card-title">
              <span>Disabled State (&quot;App opening soon&quot;)</span>
              <span className="dev-showcase-badge">Light</span>
            </div>

            <div>
              <p><strong>Compact Disabled:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="compact" disabled placement="dev-light-disabled-compact" />
              </div>
            </div>

            <div>
              <p><strong>Large Disabled:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="large" disabled placement="dev-light-disabled-large" />
              </div>
            </div>

            <div>
              <p><strong>Floating Disabled:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="floating" disabled placement="dev-light-disabled-floating" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Theme Matrix */}
      <section className="dev-showcase-section">
        <h2 className="dev-showcase-section-title">Dark Theme Matrix</h2>
        <div className="dev-showcase-grid">
          {/* Primary */}
          <div className="dev-showcase-card" data-theme="dark">
            <div className="dev-showcase-card-title">
              <span>Primary Variant (Default)</span>
              <span className="dev-showcase-badge">Dark</span>
            </div>

            <div>
              <p><strong>Compact:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="compact" variant="primary" placement="dev-dark-compact" />
              </div>
            </div>

            <div>
              <p><strong>Large:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="large" variant="primary" placement="dev-dark-large" />
              </div>
            </div>

            <div>
              <p><strong>Floating (Inline preview):</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="floating" variant="primary" placement="dev-dark-floating" />
              </div>
            </div>
          </div>

          {/* Ghost */}
          <div className="dev-showcase-card" data-theme="dark">
            <div className="dev-showcase-card-title">
              <span>Ghost Variant</span>
              <span className="dev-showcase-badge">Dark</span>
            </div>

            <div>
              <p><strong>Compact:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="compact" variant="ghost" placement="dev-dark-ghost-compact" />
              </div>
            </div>

            <div>
              <p><strong>Large:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="large" variant="ghost" placement="dev-dark-ghost-large" />
              </div>
            </div>

            <div>
              <p><strong>Floating (Inline preview):</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="floating" variant="ghost" placement="dev-dark-ghost-floating" />
              </div>
            </div>
          </div>

          {/* Disabled State */}
          <div className="dev-showcase-card" data-theme="dark">
            <div className="dev-showcase-card-title">
              <span>Disabled State (&quot;App opening soon&quot;)</span>
              <span className="dev-showcase-badge">Dark</span>
            </div>

            <div>
              <p><strong>Compact Disabled:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="compact" disabled placement="dev-dark-disabled-compact" />
              </div>
            </div>

            <div>
              <p><strong>Large Disabled:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="large" disabled placement="dev-dark-disabled-large" />
              </div>
            </div>

            <div>
              <p><strong>Floating Disabled:</strong></p>
              <div className="dev-showcase-row">
                <OpenAppButton size="floating" disabled placement="dev-dark-disabled-floating" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DevOpenAppButtonPage;
