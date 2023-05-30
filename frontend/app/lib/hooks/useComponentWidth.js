import { useEffect, useRef, useState } from 'react';

function useComponentWidth() {
    const ref = useRef(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const updateWidth = () => {
            if (ref.current) {
                setWidth(ref.current.offsetWidth);
            }
        };

        // Initial height calculation
        updateWidth();

        // Recalculate height whenever the window is resized
        window.addEventListener('resize', updateWidth);

        return () => {
            window.removeEventListener('resize', updateWidth);
        };
    }, []);

    return [ref, width];
}

export default useComponentWidth;
