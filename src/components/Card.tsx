import React from 'react';
import './Card.css';

export type CardRoleAccent = 'student' | 'lead' | 'mentor' | 'success' | 'danger';
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  roleAccent?: CardRoleAccent;
  padding?: CardPadding;
  children: React.ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'li';
}

export const Card: React.FC<CardProps> = ({
  roleAccent,
  padding = 'md',
  children,
  className = '',
  as = 'div',
  ...rest
}) => {
  const accentClass = roleAccent ? `tm-card-accent-${roleAccent}` : '';
  const paddingClass = `tm-card-pad-${padding}`;
  const combinedClasses = `tm-card ${accentClass} ${paddingClass} ${className}`.trim();

  const Component = as as keyof JSX.IntrinsicElements;

  return React.createElement(
    Component,
    { className: combinedClasses, ...rest },
    children
  );
};

export default Card;
