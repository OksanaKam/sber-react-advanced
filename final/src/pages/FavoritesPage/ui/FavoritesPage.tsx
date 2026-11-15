import { useNavigate } from 'react-router-dom';
import { WithProtection } from '../../../features/auth/ui/WithProtection';
import { WithQuery } from '../../../shared/ui/WithQuery/WithQuery';
import { useProducts } from '../../../features/products/model/useProducts';
import { ButtonBack } from '../../../shared/ui/ButtonBack';
import { CardList } from '../../../features/products/CardList';

const CardListWithQuery = WithQuery(CardList);

export const FavoritesPage = WithProtection(() => {
	const navigate = useNavigate();
	const { isLoading, isError, products, error } = useProducts();

	return (
		<>
			<br />
			<ButtonBack onClick={() => navigate(-1)} />
			<CardListWithQuery
				title='Избранные'
				isLoading={isLoading}
				isError={isError}
				products={products}
				error={error}
			/>
		</>
	);
});
