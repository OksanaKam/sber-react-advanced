import { useOptimistic, useTransition } from 'react';
import {
	updateCachedLike,
	ProductsCacheDispatch,
} from '../../../products/model/updateCachedLike';
import s from './LikeButton.module.css';
import { ReactComponent as LikeSvg } from '../../../../shared/assets/icons/like.svg?react';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../../../../shared/store/utils';
import { userSelectors } from '../../../auth/model/user';
import {
	useSetLikeProductMutation,
	useDeleteLikeProductMutation,
} from '../../../products/api/productsApi';
import { toast } from 'react-toastify';

type TLikeButtonProps = {
	product: Product;
};
export const LikeButton = ({ product }: TLikeButtonProps) => {
	const accessToken = useAppSelector(userSelectors.getAccessToken);
	const user = useAppSelector(userSelectors.getUser);

	const [setLike] = useSetLikeProductMutation();
	const [deleteLike] = useDeleteLikeProductMutation();

	const dispatch = useAppDispatch<ProductsCacheDispatch>();
	const isLike = product.likes.some((like) => like.userId === user?.id);
	const [optimisticLike, setOptimisticLike] = useOptimistic(isLike);
	const [isPending, startTransition] = useTransition();

	const toggleLike = () => {
		const userId = user?.id;
		if (!accessToken || !userId) {
			toast.warning('Вы не авторизованы');
			return;
		}
		if (isPending) return;

		startTransition(async () => {
			setOptimisticLike(!isLike);
			try {
				if (isLike) {
					await deleteLike({ id: product.id }).unwrap();
					dispatch(updateCachedLike(product.id, userId, null));
				} else {
					const response = await setLike({ id: product.id }).unwrap();
					dispatch(updateCachedLike(product.id, userId, response.like));
				}
			} catch {
				toast.error('Не удалось изменить избранное. Попробуйте ещё раз.');
			}
		});
	};

	return (
		<button
			type='button'
			disabled={isPending}
			aria-busy={isPending}
			aria-pressed={optimisticLike}
			aria-label={
				optimisticLike ? 'Убрать из избранного' : 'Добавить в избранное'
			}
			className={classNames(s['card__favorite'], {
				[s['card__favorite_is-active']]: optimisticLike,
			})}
			onClick={toggleLike}>
			<LikeSvg />
		</button>
	);
};
