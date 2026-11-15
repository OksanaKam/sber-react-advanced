import { fetchBaseQuery } from '@reduxjs/toolkit/query';

// Минимальный контракт состояния, необходимый для заголовка авторизации.
type AuthState = { user: { accessToken: string } };

export const customBaseQuery = fetchBaseQuery({
	baseUrl: process.env.API_URL,
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as AuthState).user.accessToken;

		if (accessToken) {
			headers.set('authorization', accessToken);
		}
		return headers;
	},
});
