import React from 'react';
import './Tag.css';

export type TagVariant = 'default' | 'outline' | 'student' | 'lead' | 'mentor' | 'success' | 'danger';
export type TagSize = 'sm' | 'md';

export interface TagProps {
  children: React.ReactNode;
  variant?: TagVariant;
  size?: TagSize;
  className?: string;
}

export const Tag: React.FC<TagProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}) => {
  const combinedClasses = `tm-tag tm-tag-variant-${variant} tm-tag-size-${size} ${className}`.trim();
  return <span className={combinedClasses}>{children}</span>;
};

export default Tag;
