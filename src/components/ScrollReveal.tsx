import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './ScrollReveal.css';

export interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  as?: 'div' | 'section' | 'article';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delayMs = 0,
  as = 'div',
  style = {},
  ...rest
}) => {
  const { ref, isRevealed } = useScrollReveal();

  const combinedStyle: React.CSSProperties = {
    ...style,
    transitionDelay: delayMs > 0 ? `${delayMs}ms` : undefined,
  };

  const Component = as as keyof JSX.IntrinsicElements;

  return React.createElement(
    Component,
    {
      ref,
      className: `tm-scroll-reveal ${isRevealed ? 'is-revealed' : ''} ${className}`.trim(),
      style: combinedStyle,
      ...rest,
    },
    children
  );
};

export default ScrollReveal;
