import { WithProtection } from '../../../features/auth/ui/WithProtection';
import { WithQuery } from '../../../shared/ui/WithQuery/WithQuery';
import { LoadMore } from '../../../features/products/LoadMore';
import { CardList } from '../../../features/products/CardList';
import { useProducts } from '../../../features/products/model/useProducts';

const CardListWithQuery = WithQuery(CardList);

export const HomePage = WithProtection(() => {
	const { products, isLoading, isError, error } = useProducts();

	return (
		<>
			<CardListWithQuery
				title='Лакомства'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
			<LoadMore />
		</>
	);
});
