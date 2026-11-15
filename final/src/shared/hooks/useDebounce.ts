import { useEffect, useRef, useState } from 'react';

export const useDebounce = <V>(outerValue: V, ms: number) => {
	const [optimizedValue, setOptimizedValue] = useState<V>(outerValue);

	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		timeoutRef.current = setTimeout(() => {
			timeoutRef.current = null;
			setOptimizedValue(outerValue);
		}, ms);

		return () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
				timeoutRef.current = null;
			}
		};
	}, [ms, outerValue]);

	return optimizedValue;
};
