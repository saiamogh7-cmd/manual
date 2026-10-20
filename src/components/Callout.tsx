import React from 'react';
import './Callout.css';

export type CalloutVariant = 'tip' | 'warning' | 'success';

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const defaultPrefixes: Record<CalloutVariant, string> = {
  tip: 'Tip:',
  warning: 'Warning:',
  success: 'Note:',
};

export const Callout: React.FC<CalloutProps> = ({
  variant = 'tip',
  title,
  icon,
  children,
  className = '',
}) => {
  const prefixText = title !== undefined ? title : defaultPrefixes[variant];

  return (
    <aside className={`tm-callout tm-callout-${variant} ${className}`.trim()} role="note">
      {icon && <span aria-hidden="true">{icon}</span>}
      {prefixText && <span className="tm-callout-prefix">{prefixText}</span>}
      <div className="tm-callout-body">{children}</div>
    </aside>
  );
};

export default Callout;
