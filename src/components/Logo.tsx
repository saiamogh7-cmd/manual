import React from 'react';
import './Logo.css';

interface LogoProps {
  showSubtext?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ showSubtext = false, className = '' }) => {
  return (
    <div className={`trackment-logo ${className}`}>
      <span className="trackment-logo-blob" aria-hidden="true" />
      <span className="trackment-logo-text">
        TrackMent
        {showSubtext && <span className="trackment-logo-sub">guide</span>}
      </span>
    </div>
  );
};

export default Logo;
