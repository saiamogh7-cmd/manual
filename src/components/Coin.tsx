import React from 'react';
import './Coin.css';

export interface CoinProps {
  stepNumber: number | string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  interactive?: boolean;
  ariaLabel?: string;
  className?: string;
  id?: string;
}

export const Coin: React.FC<CoinProps> = ({
  stepNumber,
  checked = false,
  onChange,
  interactive = true,
  ariaLabel,
  className = '',
  id,
}) => {
  const labelText = ariaLabel || `Step ${stepNumber}${checked ? ' completed' : ''}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <label
      className={`tm-coin ${checked ? 'tm-coin-checked' : ''} ${interactive ? 'tm-coin-interactive' : ''} ${className}`.trim()}
      aria-label={labelText}
      htmlFor={id}
    >
      {interactive ? (
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          aria-label={labelText}
        />
      ) : null}
      {checked ? (
        <span className="tm-coin-check-icon" aria-hidden="true">✓</span>
      ) : (
        <span>{stepNumber}</span>
      )}
    </label>
  );
};

export default Coin;
