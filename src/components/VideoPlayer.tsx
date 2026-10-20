import React, { useState } from 'react';
import { Tag } from './Tag';
import './VideoPlayer.css';

export interface VideoPlayerProps {
  videoId?: string;
  title: string;
  roleAccent?: 'default' | 'student' | 'lead' | 'mentor';
  comingSoonTitle?: string;
  comingSoonSubtitle?: string;
  className?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoId,
  title,
  roleAccent = 'default',
  comingSoonTitle = 'Video Tutorial Coming Soon',
  comingSoonSubtitle = 'This walkthrough is currently being produced. In the meantime, explore the written step-by-step guide.',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const hasValidVideoId = Boolean(videoId && videoId.trim().length > 0);

  const thumbnailUrl = hasValidVideoId
    ? `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    : '';

  const handlePlay = () => {
    if (hasValidVideoId) {
      setIsPlaying(true);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handlePlay();
    }
  };

  const playBtnAccentClass = roleAccent !== 'default' ? `tm-video-play-btn-${roleAccent}` : '';

  return (
    <div className={`tm-video-container ${className}`.trim()}>
      {!hasValidVideoId ? (
        // Styled "Video Coming Soon" Poster
        <div className="tm-video-coming-soon" aria-label={`${title} — Coming Soon`}>
          <div className="tm-video-coming-soon-badge">
            <Tag variant={roleAccent === 'default' ? 'default' : roleAccent} size="sm">
              In Production
            </Tag>
          </div>
          <div className="tm-video-coming-soon-icon" aria-hidden="true">
            🎬
          </div>
          <h3 className="tm-video-coming-soon-title">{comingSoonTitle}</h3>
          <p className="tm-video-coming-soon-subtitle">{comingSoonSubtitle}</p>
        </div>
      ) : isPlaying ? (
        // Live Iframe Embed with Privacy-Enhanced Mode
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="tm-video-iframe"
        />
      ) : (
        // Poster with Chunky 3D Play Button
        <button
          type="button"
          className="tm-video-poster-button"
          onClick={handlePlay}
          onKeyDown={handleKeyDown}
          aria-label={`Play video: ${title}`}
        >
          <img
            src={thumbnailUrl}
            alt={`Thumbnail for ${title}`}
            className="tm-video-poster-img"
            loading="lazy"
          />
          <div className="tm-video-poster-overlay" aria-hidden="true" />
          <div className={`tm-video-play-btn ${playBtnAccentClass}`} aria-hidden="true">
            <span className="tm-video-play-triangle" />
          </div>
        </button>
      )}
    </div>
  );
};

export default VideoPlayer;
