import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'student' | 'lead' | 'mentor';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  to,
  href,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  disabled,
  type = 'button',
  ...rest
}) => {
  const isRole = variant === 'student' || variant === 'lead' || variant === 'mentor';
  const variantClass = isRole ? `tm-btn-role-${variant}` : `tm-btn-${variant}`;
  const fullWidthClass = fullWidth ? 'tm-btn-full' : '';
  const combinedClasses = `tm-btn ${variantClass} ${fullWidthClass} ${className}`.trim();

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="tm-btn-icon" aria-hidden="true">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="tm-btn-icon" aria-hidden="true">{icon}</span>}
    </>
  );

  if (to && !disabled) {
    return (
      <Link to={to} className={combinedClasses} role="button">
        {content}
      </Link>
    );
  }

  if (href && !disabled) {
    return (
      <a href={href} className={combinedClasses} role="button" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      disabled={disabled}
      aria-disabled={disabled}
      {...rest}
    >
      {content}
    </button>
  );
};

export default Button;
