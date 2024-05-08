import { useEffect, useRef, useState } from 'react';

const useComponentHeight = () => {
	const ref = useRef(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		const updateHeight = () => {
			if (ref.current) {
				setHeight(ref.current.offsetHeight);
			}
		};

		updateHeight();
		window.addEventListener('resize', updateHeight);

		return () => {
			window.removeEventListener('resize', updateHeight);
		};
	}, []);

	return [ref, height];
}

export default useComponentHeight;
