export const isLiked = (likes: BaseLike[], userId: string | undefined) =>
	likes?.some((favorite) => favorite.userId === userId);
