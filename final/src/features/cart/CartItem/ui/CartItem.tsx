import { Modal } from '../../../../shared/ui/Modal';
import { Button } from '../../../../shared/ui/Button';
import { memo, useState } from 'react';
import { ReactComponent as TrashIcon } from '../../../../shared/assets/icons/trash.svg?react';
import { Link } from 'react-router-dom';
import s from '../../ui/Cart.module.css';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../model/cart';
import { CartCounter } from '../../CartCounter';

type CartItemProps = {
	product: CartProduct;
};
export const CartItem = memo(function CartItem({ product }: CartItemProps) {
	const dispatch = useDispatch();
	const [isDeleteOpen, setIsDeleteOpen] = useState(false);
	const { id, name, images, price, discount } = product;

	const handleDelete = () => {
		dispatch(cartActions.deleteCartProduct(id));
	};
	return (
		<div className={classNames(s['cart-item'])}>
			<div className={classNames(s['cart-item__desc'])}>
				<img
					src={images}
					alt={name}
					className={classNames(s['cart-item__image'])}
				/>

				<div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
					<div style={{ display: 'flex', gap: '20px', flexGrow: 1 }}>
						<Link
							className={classNames(s['cart-item__title'])}
							to={`/products/${id}`}>
							<h2>{name}</h2>
						</Link>

						<div style={{ display: 'flex', flexDirection: 'column' }}>
							<CartCounter productId={id} />

							<div className={classNames(s['cart-item__price'])}>
								<div className={classNames(s['price-big'], s['price-wrap'])}>
									<span
										className={classNames(s['price_old'], s['price_right'])}>
										{price}
									</span>
									<span className={classNames(s['price_discount'], s['price'])}>
										{price - discount}
									</span>
								</div>
							</div>
						</div>
						<button
							type='button'
							aria-label={`Удалить ${name}`}
							onClick={() => setIsDeleteOpen(true)}
							className={classNames(s['cart-item__bnt-trash'])}>
							<TrashIcon />
						</button>
					</div>
				</div>
			</div>
			{isDeleteOpen && (
				<Modal title='Удалить товар?' onClose={() => setIsDeleteOpen(false)}>
					<p>Удалить «{name}» из корзины?</p>
					<Button onClick={handleDelete}>Удалить</Button>
					<Button
						variant='outlined'
						onClick={() => setIsDeleteOpen(false)}
						sx={{ mt: 1 }}>
						Отмена
					</Button>
				</Modal>
			)}
		</div>
	);
});
