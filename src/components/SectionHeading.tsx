import React from 'react';
import './SectionHeading.css';

export interface SectionHeadingProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  align?: 'left' | 'center' | 'between';
  level?: 'h1' | 'h2' | 'h3';
  className?: string;
  id?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  subtitle,
  action,
  align = 'left',
  level = 'h2',
  className = '',
  id,
}) => {
  const alignClass = `tm-section-heading-align-${align}`;
  const TitleTag = level;

  if (align === 'between') {
    return (
      <div id={id} className={`tm-section-heading ${alignClass} ${className}`.trim()}>
        <div>
          {eyebrow && <div className="tm-section-heading-eyebrow">{eyebrow}</div>}
          <TitleTag className="tm-section-heading-title">{title}</TitleTag>
          {subtitle && <p className="tm-section-heading-subtitle">{subtitle}</p>}
        </div>
        {action && <div className="tm-section-heading-action">{action}</div>}
      </div>
    );
  }

  return (
    <header id={id} className={`tm-section-heading ${alignClass} ${className}`.trim()}>
      {eyebrow && <div className="tm-section-heading-eyebrow">{eyebrow}</div>}
      <TitleTag className="tm-section-heading-title">{title}</TitleTag>
      {subtitle && <p className="tm-section-heading-subtitle">{subtitle}</p>}
      {action && <div className="tm-section-heading-action" style={{ marginTop: 'var(--space-4)' }}>{action}</div>}
    </header>
  );
};

export default SectionHeading;
