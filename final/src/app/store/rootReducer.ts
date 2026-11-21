import { combineReducers } from 'redux';
import { userSlice } from '../../features/auth/model/user';
import { cartSlice } from '../../features/cart/model/cart';
import { productsSlice } from '../../features/products/model/products';
import { authApi } from '../../features/auth/api/authApi';
import { productsApi } from '../../features/products/api/productsApi';

export const rootReducer = combineReducers({
	[userSlice.name]: userSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[productsSlice.name]: productsSlice.reducer,
	[authApi.reducerPath]: authApi.reducer,
	[productsApi.reducerPath]: productsApi.reducer,
});
