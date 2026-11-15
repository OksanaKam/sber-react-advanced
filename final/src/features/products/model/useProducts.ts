import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { userSelectors } from '../../auth/model/user';
import { useAppSelector } from '../../../shared/store/utils';
import { isLiked } from '../../../shared/utils';
import { productsSelectors } from './products';
import { useGetProductsQuery } from '../api/productsApi';

const EMPTY_PRODUCTS: Product[] = [];

export const useProducts = () => {
	const { pathname } = useLocation();

	const { searchText, page, perPage, sort } = useAppSelector(
		productsSelectors.getProductsState
	);

	const isFavoritesPage = pathname === '/favorites';
	const { isLoading, isError, error, data, isFetching } = useGetProductsQuery({
		searchText,
		sort,
		page,
		perPage: isFavoritesPage ? undefined : perPage,
	});

	const userId = useAppSelector(userSelectors.getUser)?.id;
	const remoteProducts = data?.products ?? EMPTY_PRODUCTS;
	const products = useMemo(
		() =>
			isFavoritesPage
				? remoteProducts.filter((product) => isLiked(product.likes, userId))
				: remoteProducts,
		[remoteProducts, isFavoritesPage, userId]
	);

	const productsCount = data?.length || 0;

	return {
		products,
		isLoading,
		isError,
		isFetching,
		error,
		productsCount,
	};
};
