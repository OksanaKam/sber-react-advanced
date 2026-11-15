import type {
	ThunkAction,
	ThunkDispatch,
	UnknownAction,
} from '@reduxjs/toolkit';
import { productsApi } from '../api/productsApi';

type ProductsCacheState = {
	productsApi: ReturnType<typeof productsApi.reducer>;
};

export type ProductsCacheDispatch = ThunkDispatch<
	ProductsCacheState,
	unknown,
	UnknownAction
>;

// Сохраняем подтверждённый сервером результат во всех загруженных списках.
export const updateCachedLike =
	(
		productId: string,
		userId: string,
		like: BaseLike | null
	): ThunkAction<void, ProductsCacheState, unknown, UnknownAction> =>
	(dispatch, getState) => {
		const updateProduct = (product: Product) => {
			product.likes = product.likes.filter((item) => item.userId !== userId);
			if (like) product.likes.push(like);
		};
		for (const args of productsApi.util.selectCachedArgsForQuery(
			getState(),
			'getProducts'
		)) {
			dispatch(
				productsApi.util.updateQueryData('getProducts', args, (draft) => {
					const product = draft.products.find((item) => item.id === productId);
					if (product) updateProduct(product);
				})
			);
		}
		dispatch(
			productsApi.util.updateQueryData(
				'getProduct',
				{ id: productId },
				updateProduct
			)
		);
		dispatch(
			productsApi.util.invalidateTags([
				{ type: 'Products', id: 'list' },
				{ type: 'Products', id: productId },
			])
		);
	};
