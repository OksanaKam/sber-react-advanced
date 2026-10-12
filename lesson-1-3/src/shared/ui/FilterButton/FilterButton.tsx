import type { ReactNode } from 'react';
import styles from './FilterButton.module.css';

interface FilterButtonProps {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}

export function FilterButton({ active, onClick, children }: FilterButtonProps) {
  return (
    <button
      type="button"
      className={styles.button}
      aria-pressed={active}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
