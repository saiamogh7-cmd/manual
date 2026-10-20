import React from 'react';
import './FakeButton.css';

export interface FakeButtonProps {
  children: React.ReactNode;
  roleAccent?: 'default' | 'student' | 'lead' | 'mentor';
  className?: string;
  style?: React.CSSProperties;
}

export const FakeButton: React.FC<FakeButtonProps> = ({
  children,
  roleAccent = 'default',
  className = '',
  style,
}) => {
  const accentClass = roleAccent !== 'default' ? `tm-fakebutton-${roleAccent}` : '';
  return (
    <span
      className={`tm-fakebutton ${accentClass} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      {children}
    </span>
  );
};

export default FakeButton;
