import React, { useState, useMemo } from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  SectionHeading,
  Accordion,
  Tag,
  Chip,
  Callout,
  Button,
  ScrollReveal,
} from '../components';
import { siteConfig } from '../config/site';
import { helpContent, TroubleshootingItem, FaqItem } from '../content/help';
import { openAppContent } from '../content/openApp';
import { OpenAppButton } from '../components/OpenAppButton';
import './HelpPage.css';

export const HelpPage: React.FC = () => {
  useDocumentTitle('Help & FAQ — Quick Answers & Permissions');

  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = React.useRef<HTMLInputElement>(null);

  // Keyboard shortcut '/' to immediately focus search
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === '/' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const filteredTroubleshooting = useMemo(() => {
    if (!trimmedQuery) return helpContent.troubleshootingItems;
    return helpContent.troubleshootingItems.filter(
      (item: TroubleshootingItem) =>
        item.issue.toLowerCase().includes(trimmedQuery) ||
        item.solution.toLowerCase().includes(trimmedQuery)
    );
  }, [trimmedQuery]);

  const filteredFaq = useMemo(() => {
    if (!trimmedQuery) return helpContent.faqItems;
    return helpContent.faqItems.filter(
      (item: FaqItem) =>
        item.question.toLowerCase().includes(trimmedQuery) ||
        item.answer.toLowerCase().includes(trimmedQuery)
    );
  }, [trimmedQuery]);

  const totalResults = filteredTroubleshooting.length + filteredFaq.length;
  const isSearching = trimmedQuery.length > 0;
  const hasNoResults = isSearching && totalResults === 0;

  return (
    <div className="wrap help-page">
      {/* Header */}
      <SectionHeading
        level="h1"
        align="center"
        eyebrow={<Tag variant="default">{helpContent.eyebrow}</Tag>}
        title={helpContent.title}
        subtitle={helpContent.subtitle}
      />

      {/* 2. Interactive Search Box */}
      <div className="help-search-container">
        <div className="help-search-input-wrap">
          <span className="help-search-icon" aria-hidden="true">🔍</span>
          <input
            ref={searchInputRef}
            type="search"
            className="help-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={helpContent.searchPlaceholder}
            aria-label="Search help, FAQ, and troubleshooting"
          />
          {searchQuery && (
            <button
              type="button"
              className="help-search-clear"
              onClick={() => setSearchQuery('')}
              aria-label="Clear search query"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Search Feedback Header */}
      {isSearching && !hasNoResults && (
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-4)', fontSize: '14px', color: 'var(--text-mute)', fontWeight: 700 }}>
          Found {totalResults} result{totalResults === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
        </div>
      )}

      {/* Empty Search Result State */}
      {hasNoResults && (
        <div className="help-search-empty" role="status">
          <div className="help-search-empty-icon" aria-hidden="true">💡</div>
          <h3>{helpContent.emptySearchTitle}</h3>
          <p>{helpContent.emptySearchTip}</p>
          <div style={{ marginTop: 'var(--space-4)' }}>
            <Button variant="secondary" onClick={() => setSearchQuery('')}>
              Clear search filter
            </Button>
          </div>
        </div>
      )}

      {/* 3. Limits Strip of Chips */}
      {!isSearching && (
        <section className="help-limits-section" aria-label="System Limits">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow={<Tag variant="default">{helpContent.limitsEyebrow}</Tag>}
              title={helpContent.limitsTitle}
            />
            <div className="help-limits-chips">
              {helpContent.limits.map((limitText) => (
                <Chip key={limitText} label={limitText} />
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* 5. Troubleshooting Section */}
      {filteredTroubleshooting.length > 0 && (
        <section aria-label="Troubleshooting Solutions">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow={<Tag variant="default">{helpContent.troubleshootingEyebrow}</Tag>}
              title={helpContent.troubleshootingTitle}
            />
            <div className="help-qa-list">
              {filteredTroubleshooting.map((item) => (
                <Accordion
                  key={item.id}
                  title={item.issue}
                  defaultOpen={isSearching}
                >
                  <p>{item.solution}</p>
                  {siteConfig.features?.openAppButton && (item.id === 'email-domain' || item.id === 'session-expired') && (
                    <div style={{ marginTop: 'var(--space-3)', paddingTop: 'var(--space-2)', borderTop: '1px dashed var(--border-line)' }}>
                      <p style={{ fontSize: '14px', color: 'var(--text-mute)', marginBottom: 'var(--space-2)' }}>
                        {openAppContent.helpLogin.microcopy}
                      </p>
                      <OpenAppButton size="compact" variant="primary" placement="help-login" />
                    </div>
                  )}
                </Accordion>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* General FAQ Section */}
      {filteredFaq.length > 0 && (
        <section aria-label="General Frequently Asked Questions">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow={<Tag variant="default">{helpContent.faqEyebrow}</Tag>}
              title={helpContent.faqTitle}
            />
            <div className="help-qa-list">
              {filteredFaq.map((item) => (
                <Accordion
                  key={item.id}
                  title={item.question}
                  defaultOpen={isSearching}
                >
                  <p>{item.answer}</p>
                </Accordion>
              ))}
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* 4. Permissions Table (Contained horizontal scroll, hidden during active search for cleanliness) */}
      {!isSearching && (
        <section className="help-table-section" aria-label="Role Permissions Table">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow={<Tag variant="default">{helpContent.permissionsEyebrow}</Tag>}
              title={helpContent.permissionsTitle}
              subtitle={helpContent.permissionsSubtitle}
            />

            <div className="help-table-scroll-container">
              <table className="help-permissions-table">
                <thead>
                  <tr>
                    <th scope="col">Action / Capability</th>
                    <th scope="col">Student</th>
                    <th scope="col">Team Lead</th>
                    <th scope="col">Faculty Mentor</th>
                  </tr>
                </thead>
                <tbody>
                  {helpContent.permissionsTable.map((row) => (
                    <tr key={row.capability}>
                      <td className="help-perm-capability">
                        <span>{row.capability}</span>
                        {row.note && <span className="help-perm-note">{row.note}</span>}
                      </td>
                      <td>
                        {row.student ? (
                          <span className="help-perm-yes" aria-label="Yes">✓ Yes</span>
                        ) : (
                          <span className="help-perm-no" aria-label="No">✕ No</span>
                        )}
                      </td>
                      <td>
                        {row.lead ? (
                          <span className="help-perm-yes" aria-label="Yes">✓ Yes</span>
                        ) : (
                          <span className="help-perm-no" aria-label="No">✕ No</span>
                        )}
                      </td>
                      <td>
                        {row.mentor ? (
                          <span className="help-perm-yes" aria-label="Yes">✓ Yes</span>
                        ) : (
                          <span className="help-perm-no" aria-label="No">✕ No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* 6. "Still stuck?" Callout */}
      <section className="help-still-stuck" aria-label="Contact Support">
        <ScrollReveal>
          <Callout variant="tip" title={helpContent.stillStuckTitle}>
            <p style={{ margin: 'var(--space-1) 0 var(--space-3)' }}>
              {helpContent.stillStuckBody}
            </p>
            <div>
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                style={{
                  fontWeight: 800,
                  textDecoration: 'underline',
                  color: 'inherit',
                  textUnderlineOffset: '3px',
                }}
              >
                Send email to {siteConfig.contactEmail} →
              </a>
            </div>
          </Callout>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default HelpPage;
