import React, { useRef, useState, useEffect } from 'react';
import './PhoneMock.css';

export interface PhoneMockProps {
  children?: React.ReactNode;
  decorations?: React.ReactNode;
  className?: string;
  enableInteractiveTilt?: boolean;
}

export const PhoneMock: React.FC<PhoneMockProps> = ({
  children,
  decorations,
  className = '',
  enableInteractiveTilt = true,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);
  const [rotations, setRotations] = useState<{ rx: number; ry: number }>({ rx: 6, ry: -14 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enableInteractiveTilt || prefersReducedMotion || !stageRef.current) return;

    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const normalizedX = (x - centerX) / centerX;
    const normalizedY = (y - centerY) / centerY;

    const maxTilt = 18;
    const nextRy = normalizedX * maxTilt - 14;
    const nextRx = -normalizedY * maxTilt + 6;

    setRotations({ rx: Math.round(nextRx), ry: Math.round(nextRy) });
    setIsInteracting(true);
  };

  const handleMouseLeave = () => {
    if (!enableInteractiveTilt || prefersReducedMotion) return;
    setIsInteracting(false);
    setRotations({ rx: 6, ry: -14 });
  };

  const casingStyle: React.CSSProperties = {
    '--rx': `${rotations.rx}deg`,
    '--ry': `${rotations.ry}deg`,
  } as React.CSSProperties;

  return (
    <div
      ref={stageRef}
      className={`tm-phone-stage ${className}`.trim()}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <div
        className={`tm-phone-casing ${!isInteracting && !prefersReducedMotion ? 'tm-phone-idle-anim' : ''}`}
        style={casingStyle}
      >
        <div className="tm-phone-screen">
          {children}
        </div>
      </div>
      {decorations && <div className="tm-phone-decorations">{decorations}</div>}
    </div>
  );
};

export default PhoneMock;
