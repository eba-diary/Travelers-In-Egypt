import { useEffect, useRef, useState } from 'react';

function useComponentHeight() {
    const ref = useRef(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const updateHeight = () => {
            if (ref.current) {
                setHeight(ref.current.offsetHeight);
            }
        };

        // Initial height calculation
        updateHeight();

        // Recalculate height whenever the window is resized
        window.addEventListener('resize', updateHeight);

        return () => {
            window.removeEventListener('resize', updateHeight);
        };
    }, []);

    return [ref, height];
}

export default useComponentHeight;
