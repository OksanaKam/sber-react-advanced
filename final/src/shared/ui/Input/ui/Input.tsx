import { forwardRef } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

export const Input = forwardRef<HTMLInputElement, TextFieldProps>(
	function Input(props, ref) {
		return <TextField margin='normal' fullWidth {...props} inputRef={ref} />;
	}
);
