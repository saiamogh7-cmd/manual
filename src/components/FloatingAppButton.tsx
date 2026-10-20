import React, { useEffect, useState } from 'react';
import { siteConfig } from '../config/site';
import { OpenAppButton } from './OpenAppButton';
import './FloatingAppButton.css';

export interface FloatingAppButtonProps {
  scrollThreshold?: number;
}

export const FloatingAppButton: React.FC<FloatingAppButtonProps> = ({
  scrollThreshold = 260,
}) => {
  const [isScrolledPast, setIsScrolledPast] = useState(false);
  const [hasLargeButtonInView, setHasLargeButtonInView] = useState(false);

  useEffect(() => {
    if (!siteConfig.features?.openAppButton) return;

    const handleScroll = () => {
      setIsScrolledPast(window.scrollY > scrollThreshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (typeof IntersectionObserver === 'undefined') {
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }

    const intersectingSet = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            intersectingSet.add(entry.target);
          } else {
            intersectingSet.delete(entry.target);
          }
        });
        setHasLargeButtonInView(intersectingSet.size > 0);
      },
      { threshold: 0.05 }
    );

    // Watch all large buttons
    const largeButtons = document.querySelectorAll('.open-app-size-large');
    largeButtons.forEach((btn) => observer.observe(btn));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [scrollThreshold]);

  if (!siteConfig.features?.openAppButton) {
    return null;
  }

  const isVisible = isScrolledPast && !hasLargeButtonInView;

  if (!isVisible) {
    return null;
  }

  return (
    <div className="open-app-floating-container">
      <OpenAppButton size="floating" variant="primary" placement="floating" />
    </div>
  );
};

export default FloatingAppButton;
