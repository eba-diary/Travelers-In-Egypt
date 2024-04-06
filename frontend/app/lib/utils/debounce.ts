export const debounce = (fn: (...args: any) => any, delay: number) => {
	let timeoutId: NodeJS.Timeout | null = null;
	return function (...args) {
		if (timeoutId) {
			clearTimeout(timeoutId);
		}
		timeoutId = setTimeout(() => {
			fn(...args);
		}, delay);
	};
}
