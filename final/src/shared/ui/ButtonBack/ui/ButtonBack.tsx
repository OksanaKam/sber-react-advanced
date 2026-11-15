import { ReactComponent as BackSvg } from './../../../assets/icons/back.svg?react';

type ButtonBackProps = { onClick: () => void };

export const ButtonBack = ({ onClick }: ButtonBackProps) => {
	return (
		<button type='button' aria-label='Назад' onClick={onClick}>
			<BackSvg />
		</button>
	);
};
