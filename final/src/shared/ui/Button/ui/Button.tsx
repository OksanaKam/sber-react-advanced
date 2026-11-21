import { forwardRef } from 'react';
import LoadingButton, { LoadingButtonProps } from '@mui/lab/LoadingButton';

export const Button = forwardRef<HTMLButtonElement, LoadingButtonProps>(
	function Button({ type = 'button', ...props }, ref) {
		return (
			<LoadingButton
				ref={ref}
				type={type}
				fullWidth
				variant='contained'
				{...props}
			/>
		);
	}
);
