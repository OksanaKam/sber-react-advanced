import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ConfirmDialogOptions } from './useConfirmDialog';
import styles from './ConfirmDialog.module.css';

type ConfirmDialogProps = ConfirmDialogOptions & {
  onResult: (confirmed: boolean) => void;
};

export function ConfirmDialog({ title, description, onResult }: ConfirmDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const dialogRoot = document.getElementById('dialog-root');

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    cancelRef.current?.focus();

    return () => {
      dialog?.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, []);

  if (!dialogRoot) {
    throw new Error('Для ConfirmDialog нужен элемент #dialog-root');
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => {
        event.preventDefault();
        onResult(false);
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <h2 id={titleId} className={styles.title}>{title}</h2>
      <p id={descriptionId} className={styles.description}>{description}</p>
      <div className={styles.actions}>
        <button ref={cancelRef} type="button" className={styles.cancel} onClick={() => onResult(false)}>
          Отмена
        </button>
        <button type="button" className={styles.confirm} onClick={() => onResult(true)}>
          Подтвердить
        </button>
      </div>
    </dialog>,
    dialogRoot,
  );
}
