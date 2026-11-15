import ReactDOM from 'react-dom';
import { useState, type MouseEvent, type ReactNode } from 'react';
import styles from './Tooltip.module.css';
import { TooltipPosition } from './TooltipPosition';

type TooltipProps = {
  children: ReactNode;
  content: ReactNode;
  position?: TooltipPosition;
};

export const Tooltip = ({ children, content, position = TooltipPosition.Bottom }: TooltipProps) => {
  const tooltipRoot = document.getElementById('tooltip-root');
  const [isOpen, setIsOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ top: 0, left: 0 });

  const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const gap = 8;
    const positions = {
      [TooltipPosition.Top]: {
        top: rect.top - gap,
        left: rect.left + rect.width / 2,
      },
      [TooltipPosition.Bottom]: {
        top: rect.bottom + gap,
        left: rect.left + rect.width / 2,
      },
      [TooltipPosition.Left]: {
        top: rect.top + rect.height / 2,
        left: rect.left - gap,
      },
      [TooltipPosition.Right]: {
        top: rect.top + rect.height / 2,
        left: rect.right + gap,
      },
    };
    setCoordinates(positions[position]);
    setIsOpen(true);
  };

  return (
    <>
      <div
        className={styles.trigger}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsOpen(false)}
      >
        {children}
      </div>
      {isOpen && tooltipRoot && ReactDOM.createPortal(
        <div role="tooltip" className={`${styles.tooltip} ${styles[position]}`} style={coordinates}>
          {content}
        </div>,
        tooltipRoot
      )}
    </>
  );
}
