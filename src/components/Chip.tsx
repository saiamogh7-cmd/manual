import React from 'react';
import './Chip.css';

export interface ChipProps {
  label: React.ReactNode;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Chip: React.FC<ChipProps> = ({
  label,
  icon,
  active = false,
  onClick,
  className = '',
}) => {
  const isInteractive = Boolean(onClick);
  const activeClass = active ? 'tm-chip-active' : '';
  const interactiveClass = isInteractive ? 'tm-chip-interactive' : '';
  const combinedClasses = `tm-chip ${interactiveClass} ${activeClass} ${className}`.trim();

  if (isInteractive) {
    return (
      <button
        type="button"
        className={combinedClasses}
        onClick={onClick}
        aria-pressed={active}
      >
        {icon && <span aria-hidden="true">{icon}</span>}
        <span>{label}</span>
      </button>
    );
  }

  return (
    <span className={combinedClasses}>
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{label}</span>
    </span>
  );
};

export default Chip;
