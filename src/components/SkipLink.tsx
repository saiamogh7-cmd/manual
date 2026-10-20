import React from 'react';
import './SkipLink.css';

export interface SkipLinkProps {
  targetId?: string;
  children?: React.ReactNode;
}

export const SkipLink: React.FC<SkipLinkProps> = ({
  targetId = 'main-content',
  children = 'Skip to main content',
}) => {
  return (
    <a href={`#${targetId}`} className="tm-skip-link">
      {children}
    </a>
  );
};

export default SkipLink;
