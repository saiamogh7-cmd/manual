import React, { useEffect, useRef, useState } from 'react';
import { siteConfig } from '../config/site';
import './OpenAppButton.css';

export type OpenAppButtonSize = 'compact' | 'large' | 'floating';
export type OpenAppButtonVariant = 'primary' | 'ghost';

export interface OpenAppButtonProps {
  size?: OpenAppButtonSize;
  variant?: OpenAppButtonVariant;
  placement: string;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  id?: string;
}

// Development-only measure logging
if (typeof window !== 'undefined' && import.meta.env.DEV) {
  const win = window as unknown as { __openAppMeasureLoggerAttached?: boolean };
  if (!win.__openAppMeasureLoggerAttached) {
    win.__openAppMeasureLoggerAttached = true;
    window.addEventListener('open-app', (e: Event) => {
      const custom = e as CustomEvent<{ placement: string }>;
      console.log('[Measure: open-app]', {
        placement: custom.detail?.placement,
        path: window.location.pathname,
        timestamp: new Date().toISOString(),
      });
    });
  }
}

function isValidHttpsUrl(url: string | undefined): boolean {
  if (!url || typeof url !== 'string') return false;
  if (!url.startsWith('https://')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export const OpenAppButton: React.FC<OpenAppButtonProps> = ({
  size = 'compact',
  variant = 'primary',
  placement,
  disabled = false,
  fullWidth = false,
  className = '',
  id,
}) => {
  // Feature flag kill-switch: if disabled, renders nothing
  if (!siteConfig.features?.openAppButton) {
    return null;
  }

  const isUrlValid = isValidHttpsUrl(siteConfig.appUrl);
  const isDisabled = Boolean(disabled || !isUrlValid);

  const anchorRef = useRef<HTMLAnchorElement | null>(null);
  const [isInView, setIsInView] = useState(false);

  // IntersectionObserver for large size 7s arrow nudge animation
  useEffect(() => {
    if (size !== 'large' || isDisabled || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    const el = anchorRef.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
      observer.disconnect();
    };
  }, [size, isDisabled]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }

    window.dispatchEvent(
      new CustomEvent('open-app', {
        detail: { placement },
      })
    );
  };

  const classNames = [
    'open-app-btn',
    `open-app-size-${size}`,
    `open-app-variant-${variant}`,
    placement === 'floating' ? 'open-app-placement-floating' : '',
    fullWidth ? 'open-app-full-width' : '',
    isDisabled ? 'open-app-disabled' : '',
    isInView ? 'open-app-in-view' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const iconDimension = size === 'large' ? 20 : 18;

  return (
    <a
      ref={anchorRef}
      id={id}
      href={isDisabled ? undefined : siteConfig.appUrl}
      target={isDisabled ? undefined : '_blank'}
      rel={isDisabled ? undefined : 'noopener noreferrer'}
      role={isDisabled ? 'link' : undefined}
      aria-disabled={isDisabled ? 'true' : undefined}
      tabIndex={isDisabled ? -1 : undefined}
      aria-label={isDisabled ? 'App opening soon' : 'Open TrackMent (opens in a new tab)'}
      className={classNames}
      onClick={handleClick}
    >
      <span className="open-app-label">
        {isDisabled ? (
          <span className="open-app-label-disabled">App opening soon</span>
        ) : (
          <>
            <span className="open-app-label-full">Open TrackMent</span>
            <span className="open-app-label-short">Open app</span>
          </>
        )}
      </span>

      <svg
        className="open-app-icon"
        width={iconDimension}
        height={iconDimension}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>

      {!isDisabled && (
        <span className="open-app-sr-only">(opens in a new tab)</span>
      )}
    </a>
  );
};

export default OpenAppButton;
