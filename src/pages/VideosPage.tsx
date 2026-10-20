import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { SectionHeading, Tabs, Button, Tag, VideoPlayer, ScrollReveal } from '../components';
import { siteConfig } from '../config/site';
import { videosContent } from '../content/videos';
import { openAppContent } from '../content/openApp';
import { OpenAppButton } from '../components/OpenAppButton';
import './VideosPage.css';

export const VideosPage: React.FC = () => {
  useDocumentTitle('Video Walkthroughs — Step-by-Step Tutorials');
  const location = useLocation();

  const [activeTab, setActiveTab] = useState<'student' | 'mentor'>('student');

  // Support deep links via hash, e.g. /videos#mentor
  useEffect(() => {
    const hash = location.hash.replace('#', '');
    if (hash === 'mentor' || hash === 'student') {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const tabs = [
    { id: 'student', label: 'Student Walkthrough', roleAccent: 'student' as const },
    { id: 'mentor', label: 'Faculty Mentor Walkthrough', roleAccent: 'mentor' as const },
  ];

  const currentVideo = videosContent.videos[activeTab];
  const videoId = siteConfig.videos[activeTab];

  return (
    <div className="wrap videos-page">
      <SectionHeading
        level="h1"
        align="center"
        eyebrow={<Tag variant="default">{videosContent.eyebrow}</Tag>}
        title={videosContent.title}
        subtitle={videosContent.subtitle}
      />

      {/* Tabs */}
      <div className="videos-tab-wrapper">
        <Tabs
          items={tabs}
          selectedId={activeTab}
          onSelect={(id) => {
            setActiveTab(id as 'student' | 'mentor');
            window.location.hash = id;
          }}
          ariaLabel="Choose video tutorial category"
        />
      </div>

      {/* Video Player & Details Layout */}
      <ScrollReveal key={activeTab}>
        <div className="videos-card-layout">
          <div className="videos-player-pane">
            <VideoPlayer
              videoId={videoId}
              title={currentVideo.title}
              roleAccent={currentVideo.roleAccent}
              comingSoonTitle={videosContent.comingSoonTitle}
              comingSoonSubtitle={videosContent.comingSoonSubtitle}
            />
            {siteConfig.features?.openAppButton && (
              <div style={{ marginTop: 'var(--space-4)', textAlign: 'center' }}>
                <p style={{ fontSize: '15px', color: 'var(--text-mute)', marginBottom: 'var(--space-3)' }}>
                  {openAppContent.videoAfter.microcopy}
                </p>
                <OpenAppButton size="large" variant="primary" placement="video-after" />
              </div>
            )}
          </div>

          <div className="videos-info-pane">
            <div>
              <Tag variant={currentVideo.roleAccent} size="sm">
                {currentVideo.tagline}
              </Tag>
              <h2 style={{ marginTop: 'var(--space-2)' }}>{currentVideo.title}</h2>
              <p className="videos-info-desc" style={{ marginTop: 'var(--space-2)' }}>
                {currentVideo.description}
              </p>
            </div>

            <div className="videos-learn-box">
              <h3 className="videos-learn-title">{videosContent.learnSectionTitle}</h3>
              <ul className="videos-learn-list">
                {currentVideo.whatYouWillLearn.map((item) => (
                  <li key={item}>
                    <span className="videos-learn-check" aria-hidden="true">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Button
                variant={currentVideo.roleAccent}
                to={currentVideo.guidePath}
                fullWidth
              >
                {currentVideo.guideCta} →
              </Button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
};

export default VideosPage;
