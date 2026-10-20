import React, { useRef } from 'react';
import './Tabs.css';

export interface TabItem {
  id: string;
  label: string;
  roleAccent?: 'student' | 'lead' | 'mentor';
  disabled?: boolean;
}

export interface TabsProps {
  items: TabItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  ariaLabel: string;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  items,
  selectedId,
  onSelect,
  ariaLabel,
  className = '',
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const total = items.length;
    let nextIndex = -1;

    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % total;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + total) % total;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = total - 1;
    }

    if (nextIndex !== -1) {
      e.preventDefault();
      // Skip disabled tabs if any
      while (items[nextIndex]?.disabled && nextIndex !== index) {
        nextIndex = e.key === 'ArrowLeft' ? (nextIndex - 1 + total) % total : (nextIndex + 1) % total;
      }
      const targetTab = items[nextIndex];
      if (targetTab && !targetTab.disabled) {
        onSelect(targetTab.id);
        tabRefs.current[nextIndex]?.focus();
      }
    }
  };

  return (
    <div className={`tm-tablist ${className}`.trim()} role="tablist" aria-label={ariaLabel}>
      {items.map((item, index) => {
        const isSelected = item.id === selectedId;
        return (
          <button
            key={item.id}
            ref={(el) => { tabRefs.current[index] = el; }}
            type="button"
            role="tab"
            id={`tab-${item.id}`}
            aria-selected={isSelected}
            aria-controls={`tabpanel-${item.id}`}
            tabIndex={isSelected ? 0 : -1}
            disabled={item.disabled}
            data-role={item.roleAccent}
            className="tm-tab"
            onClick={() => onSelect(item.id)}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
