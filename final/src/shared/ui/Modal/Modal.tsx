import { ReactNode, useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

type ModalProps = {
	title: string;
	children: ReactNode;
	onClose: () => void;
};

export const Modal = ({ title, children, onClose }: ModalProps) => {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const closeRef = useRef<HTMLButtonElement>(null);
	const titleId = useId();
	const root = document.getElementById('modal-root');

	useEffect(() => {
		const dialog = dialogRef.current;
		const trigger = document.activeElement;
		const previousOverflow = document.body.style.overflow;
		dialog?.showModal();
		closeRef.current?.focus();
		document.body.style.overflow = 'hidden';
		return () => {
			dialog?.close();
			document.body.style.overflow = previousOverflow;
			if (trigger instanceof HTMLElement && trigger.isConnected) {
				trigger.focus();
			}
		};
	}, []);

	if (!root) throw new Error('Не найден контейнер #modal-root');

	return createPortal(
		// Клик обрабатывает только backdrop; клавиатурное закрытие — нативный Escape.
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
		<dialog
			ref={dialogRef}
			className={s.modal}
			aria-labelledby={titleId}
			onCancel={(event) => {
				event.preventDefault();
				onClose();
			}}
			onClick={(event) => {
				event.stopPropagation();
				if (event.target !== event.currentTarget) return;
				const rect = event.currentTarget.getBoundingClientRect();
				if (
					event.clientX < rect.left ||
					event.clientX > rect.right ||
					event.clientY < rect.top ||
					event.clientY > rect.bottom
				)
					onClose();
			}}>
			<button
				ref={closeRef}
				type='button'
				className={s.close}
				aria-label='Закрыть окно'
				onClick={onClose}>
				×
			</button>
			<h2 id={titleId} className={s.title}>
				{title}
			</h2>
			{children}
		</dialog>,
		root
	);
};
