import React from 'react';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import {
  Button,
  Card,
  Chip,
  Tag,
  Coin,
  Accordion,
  ProgressBar,
  StickyNote,
  SectionHeading,
  FakeButton,
  PhoneMock,
  ScrollReveal,
  VideoPlayer,
} from '../components';
import {
  ProgressMiniUi,
  VotingMiniUi,
  FeedbackMiniUi,
  LedgerMiniUi,
  RealtimeMiniUi,
} from '../components/FeatureMiniUis';
import { siteConfig } from '../config/site';
import { homeContent } from '../content/home';
import { openAppContent } from '../content/openApp';
import { OpenAppButton } from '../components/OpenAppButton';
import { FloatingAppButton } from '../components/FloatingAppButton';
import './HomePage.css';

export const HomePage: React.FC = () => {
  useDocumentTitle('Home — Project Governance Platform');

  const { hero, trustStrip, howItWorks, roles, features, videos, quickFacts, faq, finalCta } = homeContent;

  const renderMiniUi = (uiType: string) => {
    switch (uiType) {
      case 'progress':
        return <ProgressMiniUi />;
      case 'voting':
        return <VotingMiniUi />;
      case 'feedback':
        return <FeedbackMiniUi />;
      case 'ledger':
        return <LedgerMiniUi />;
      case 'realtime':
        return <RealtimeMiniUi />;
      default:
        return null;
    }
  };

  return (
    <div className={`home-container ${siteConfig.features?.openAppButton ? 'open-app-page-pad' : ''}`}>
      {/* 1. HERO SECTION */}
      <section className="home-hero-section" aria-label="Hero Introduction">
        <div className="wrap">
          <div className="home-hero-grid">
            <div className="home-hero-copy">
              <div className="home-hero-eyebrow">
                <Tag variant="default">{hero.eyebrow}</Tag>
              </div>
              <h1 className="home-hero-title">{hero.headline}</h1>
              <p className="home-hero-subtext">{hero.subtext}</p>
              <div className="home-hero-ctas">
                {siteConfig.features?.openAppButton ? (
                  <>
                    <OpenAppButton size="large" variant="primary" placement="hero" />
                    <Button variant="secondary" to={siteConfig.cta.primary.to}>
                      {siteConfig.cta.primary.label}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" to={siteConfig.cta.primary.to}>
                      {siteConfig.cta.primary.label} →
                    </Button>
                    <Button variant="secondary" to={siteConfig.cta.secondary.to}>
                      {siteConfig.cta.secondary.label}
                    </Button>
                  </>
                )}
              </div>
              {siteConfig.features?.openAppButton && (
                <p style={{ fontSize: '14px', color: 'var(--text-mute)', marginTop: 'var(--space-3)' }}>
                  {openAppContent.hero.microcopy}
                </p>
              )}
            </div>

            <div className="home-hero-stage-wrapper">
              <PhoneMock
                decorations={
                  <>
                    <div className="home-hero-note-progress">
                      <StickyNote rotation={-5}>{hero.phoneMock.stickyNotes.progress}</StickyNote>
                    </div>
                    <div className="home-hero-note-mentor">
                      <StickyNote rotation={4}>{hero.phoneMock.stickyNotes.mentor}</StickyNote>
                    </div>
                    <div className="home-hero-note-submit">
                      <StickyNote rotation={-3}>{hero.phoneMock.stickyNotes.submit}</StickyNote>
                    </div>
                  </>
                }
              >
                <div style={{ fontWeight: 800, fontSize: '15px', marginBottom: '8px' }}>
                  {hero.phoneMock.greeting}
                </div>
                <div style={{ color: 'var(--text-mute)', fontSize: '12px', marginBottom: '4px' }}>
                  {hero.phoneMock.teamProgressLabel} {hero.phoneMock.teamProgressValue}%
                </div>
                <ProgressBar
                  value={hero.phoneMock.teamProgressValue}
                  height="sm"
                  showValueText={false}
                />
                <div style={{ marginTop: '12px', background: 'var(--bg-card)', padding: '10px', borderRadius: '13px', border: '1.5px solid var(--border-line)' }}>
                  <strong>{hero.phoneMock.mentorFeedbackTitle}</strong>
                  <div style={{ fontSize: '11px', color: 'var(--text-mute)', marginTop: '2px' }}>
                    {hero.phoneMock.mentorFeedbackBody}
                  </div>
                </div>
                <div style={{ marginTop: '8px', background: 'var(--bg-card)', padding: '10px', borderRadius: '13px', border: '1.5px solid var(--border-line)' }}>
                  <div style={{ fontSize: '11px', color: 'var(--text-mute)' }}>{hero.phoneMock.recentSubmissionLabel}</div>
                  <strong>{hero.phoneMock.recentSubmissionTitle}</strong>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '10px' }}>
                  <FakeButton style={{ width: '100%', textAlign: 'center', display: 'block' }}>
                    {hero.phoneMock.buttonText}
                  </FakeButton>
                </div>
              </PhoneMock>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRUST STRIP */}
      <section className="home-trust-strip" aria-label="Institutional Trust">
        <div className="wrap">
          <div className="home-trust-inner">
            <div className="home-trust-title-wrap">
              <Tag variant="outline">{trustStrip.tag}</Tag>
              <h2 className="home-trust-title">{trustStrip.title}</h2>
            </div>
            <div className="home-trust-chips">
              {trustStrip.chips.map((chipText) => (
                <Chip key={chipText} label={chipText} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS SECTION */}
      <section className="home-how-section" aria-label="How TrackMent Works">
        <div className="wrap">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow={<Tag variant="default">{howItWorks.eyebrow}</Tag>}
              title={howItWorks.title}
              subtitle={howItWorks.subtitle}
            />
          </ScrollReveal>

          <div className="home-step-trail">
            {howItWorks.steps.map((item, idx) => (
              <ScrollReveal key={item.step} delayMs={idx * 100}>
                <div className="home-step-card">
                  <div className="home-step-header">
                    <Coin stepNumber={item.step} interactive={false} />
                    <h3>{item.title}</h3>
                  </div>
                  <p>{item.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ROLE CARDS SECTION */}
      <section className="home-roles-section" aria-label="Role Pathways">
        <div className="wrap">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow={<Tag variant="default">{roles.eyebrow}</Tag>}
              title={roles.title}
              subtitle={roles.subtitle}
            />
          </ScrollReveal>

          <div className="home-roles-grid">
            {roles.cards.map((card, idx) => (
              <ScrollReveal key={card.role} delayMs={idx * 120}>
                <Card roleAccent={card.role} className="home-role-card">
                  <Tag variant={card.role} size="sm">{card.eyebrow}</Tag>
                  <h3>{card.title}</h3>
                  <p className="home-role-desc">{card.description}</p>
                  <ul className="home-role-capabilities">
                    {card.capabilities.map((cap) => (
                      <li key={cap}>
                        <span className="home-role-check" aria-hidden="true">✓</span>
                        <span>{cap}</span>
                      </li>
                    ))}
                  </ul>
                  <Button variant={card.role} to={card.to} fullWidth>
                    {card.ctaLabel} →
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FEATURE SHOWCASE (Alternating Blocks) */}
      <section className="home-features-section" aria-label="Feature Showcase">
        <div className="wrap">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow={<Tag variant="default">{features.eyebrow}</Tag>}
              title={features.title}
              subtitle={features.subtitle}
            />
          </ScrollReveal>

          <div className="home-features-list">
            {features.items.map((feat, index) => {
              const isEven = index % 2 === 1;
              return (
                <ScrollReveal key={feat.id}>
                  <div className={`home-feature-row ${isEven ? 'is-reversed' : ''}`}>
                    <div className="home-feature-content">
                      <Tag variant="default" size="sm">{feat.eyebrow}</Tag>
                      <h3>{feat.title}</h3>
                      <p>{feat.description}</p>
                      <ul className="home-feature-bullets">
                        {feat.bullets.map((b) => (
                          <li key={b}>{b}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="home-feature-visual">
                      {renderMiniUi(feat.uiType)}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. VIDEOS PREVIEW SECTION */}
      <section className="home-videos-section" aria-label="Video Walkthroughs">
        <div className="wrap">
          <ScrollReveal>
            <SectionHeading
              align="between"
              eyebrow={<Tag variant="default">{videos.eyebrow}</Tag>}
              title={videos.title}
              subtitle={videos.subtitle}
              action={
                <Button variant="secondary" to="/videos">
                  {videos.allVideosCta}
                </Button>
              }
            />
          </ScrollReveal>

          <div className="home-videos-grid">
            {videos.items.map((vid, idx) => (
              <ScrollReveal key={vid.id} delayMs={idx * 120}>
                <Card roleAccent={vid.role}>
                  <Tag variant={vid.role} size="sm">{vid.durationTag}</Tag>
                  <h3 style={{ marginTop: 'var(--space-2)' }}>{vid.title}</h3>
                  <p style={{ color: 'var(--text-mute)', marginTop: 'var(--space-2)', fontSize: '14px' }}>
                    {vid.description}
                  </p>
                  <div style={{ margin: 'var(--space-4) 0' }}>
                    <VideoPlayer
                      videoId={siteConfig.videos[vid.role]}
                      title={vid.title}
                      roleAccent={vid.role}
                    />
                  </div>
                  <Button variant={vid.role} to={vid.to} fullWidth>
                    Explore in Video Hub →
                  </Button>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 7. QUICK FACTS BAND */}
      <section className="home-facts-section" aria-label="System Quick Facts">
        <div className="wrap">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow={<Tag variant="default">{quickFacts.eyebrow}</Tag>}
              title={quickFacts.title}
            />
          </ScrollReveal>

          <div className="home-facts-grid">
            {quickFacts.items.map((fact, idx) => (
              <ScrollReveal key={fact.label} delayMs={idx * 80}>
                <div className="home-fact-card">
                  <div className="home-fact-metric">{fact.metric}</div>
                  <div className="home-fact-label">{fact.label}</div>
                  <p className="home-fact-desc">{fact.description}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ PREVIEW SECTION */}
      <section className="home-faq-section" aria-label="Frequently Asked Questions">
        <div className="wrap">
          <ScrollReveal>
            <SectionHeading
              align="center"
              eyebrow={<Tag variant="default">{faq.eyebrow}</Tag>}
              title={faq.title}
              subtitle={faq.subtitle}
            />
          </ScrollReveal>

          <div className="home-faq-list">
            {faq.items.map((faqItem, idx) => (
              <ScrollReveal key={faqItem.question} delayMs={idx * 100}>
                <Accordion title={faqItem.question} defaultOpen={idx === 0}>
                  <p>{faqItem.answer}</p>
                </Accordion>
              </ScrollReveal>
            ))}

            <div style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
              <Button variant="secondary" to="/help">
                {faq.viewAllCta}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA BAND */}
      <section className="home-final-cta-section" aria-label="Call to Action">
        <div className="wrap">
          <ScrollReveal>
            <div className="home-final-cta-card">
              <h2>{siteConfig.features?.openAppButton ? openAppContent.homeFinal.headline : finalCta.title}</h2>
              <p>{siteConfig.features?.openAppButton ? openAppContent.homeFinal.microcopy : finalCta.subtitle}</p>
              <div className="home-final-cta-buttons">
                {siteConfig.features?.openAppButton ? (
                  <>
                    <OpenAppButton size="large" variant="primary" placement="home-final" />
                    <Button variant="secondary" to={siteConfig.cta.primary.to}>
                      {siteConfig.cta.primary.label} →
                    </Button>
                  </>
                ) : (
                  <>
                    <Button variant="primary" to={siteConfig.cta.primary.to}>
                      {siteConfig.cta.primary.label} →
                    </Button>
                    <Button variant="secondary" to={siteConfig.cta.secondary.to}>
                      {siteConfig.cta.secondary.label}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {siteConfig.features?.openAppButton && (
        <FloatingAppButton scrollThreshold={320} />
      )}
    </div>
  );
};

export default HomePage;
