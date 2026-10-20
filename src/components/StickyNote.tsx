import React from 'react';
import './StickyNote.css';

export interface StickyNoteProps {
  children: React.ReactNode;
  rotation?: number; // In degrees, e.g. -4 or 3
  className?: string;
  style?: React.CSSProperties;
}

export const StickyNote: React.FC<StickyNoteProps> = ({
  children,
  rotation = -3,
  className = '',
  style = {},
}) => {
  const combinedStyle: React.CSSProperties = {
    transform: `rotate(${rotation}deg)`,
    ...style,
  };

  return (
    <div className={`tm-stickynote ${className}`.trim()} style={combinedStyle}>
      {children}
    </div>
  );
};

export default StickyNote;
