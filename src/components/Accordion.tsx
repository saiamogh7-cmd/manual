import React, { useState } from 'react';
import './Accordion.css';

export interface AccordionProps {
  title: React.ReactNode;
  badge?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  className?: string;
  id?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  badge,
  children,
  defaultOpen = false,
  isOpen,
  onToggle,
  className = '',
  id,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const openState = isOpen !== undefined ? isOpen : internalOpen;

  const handleToggle = (e: React.SyntheticEvent<HTMLDetailsElement>) => {
    const nextOpen = e.currentTarget.open;
    if (isOpen === undefined) {
      setInternalOpen(nextOpen);
    }
    if (onToggle) {
      onToggle(nextOpen);
    }
  };

  return (
    <details
      id={id}
      className={`tm-accordion ${className}`.trim()}
      open={openState}
      onToggle={handleToggle}
    >
      <summary className="tm-accordion-summary">
        <div className="tm-accordion-title-wrap">
          <span>{title}</span>
          {badge}
        </div>
        <span className="tm-accordion-arrow" aria-hidden="true">▾</span>
      </summary>
      <div className="tm-accordion-content">
        {children}
      </div>
    </details>
  );
};

export default Accordion;
