import React from 'react';
import './ProgressBar.css';

export type ProgressBarAccent = 'default' | 'student' | 'lead' | 'mentor';
export type ProgressBarHeight = 'sm' | 'md' | 'lg';

export interface ProgressBarProps {
  value: number; // 0 to max
  max?: number;
  roleAccent?: ProgressBarAccent;
  height?: ProgressBarHeight;
  label?: string;
  showValueText?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  roleAccent = 'default',
  height = 'md',
  label,
  showValueText = true,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  return (
    <div className={`tm-progressbar-container ${className}`.trim()}>
      {(label || showValueText) && (
        <div className="tm-progressbar-header">
          {label && <span>{label}</span>}
          {showValueText && <span>{percentage}%</span>}
        </div>
      )}
      <div
        className={`tm-progressbar-track tm-progressbar-track-${height}`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label || 'Progress'}
      >
        <i
          className={`tm-progressbar-fill tm-progressbar-fill-${roleAccent}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
