import { ChangeEvent } from 'react';
import { cartActions, cartSelectors } from '../../model/cart';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../../shared/store/utils';

const MIN_COUNT = 1;
const MAX_COUNT = 99;

export const useCount = (productId: string) => {
	const dispatch = useDispatch();
	const product = useAppSelector(
		(state: Parameters<typeof cartSelectors.getCartProductById>[0]) =>
			cartSelectors.getCartProductById(state, productId)
	);

	const id = productId;
	const count = product?.count ?? MIN_COUNT;
	const stock = product?.stock ?? 0;
	const handleIncrement = () => {
		const newCount = count + 1;
		const validCount = newCount > MAX_COUNT ? MAX_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	const handleDecrement = () => {
		const newCount = count - 1;
		const validCount = newCount < MIN_COUNT ? MIN_COUNT : newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	const handleSetCount = (e: ChangeEvent<HTMLInputElement>) => {
		const newCount = +e.target.value;
		const validCount =
			newCount > MAX_COUNT
				? MAX_COUNT
				: newCount < MIN_COUNT
				? MIN_COUNT
				: newCount;
		dispatch(cartActions.setCartProductCount({ id, count: validCount }));
	};
	return { count, stock, handleSetCount, handleIncrement, handleDecrement };
};
