import { useEffect, useRef, useState } from 'react';

function useComponentResizeHeight() {
    const ref = useRef(null);
    const [height, setHeight] = useState(() => ref.current?.offsetHeight || 0);

    let test = height

    const handleSizeChange = () => {
        setHeight(prevHeight => {
            const newHeight = ref.current.offsetHeight;
            return newHeight !== prevHeight ? newHeight : prevHeight;
        });

        const newHeight = ref.current.offsetHeight;
        test = newHeight !== height ? newHeight : height
    };

    useEffect(() => {
        const currentRef = ref.current;

        if (currentRef) {
            currentRef.addEventListener('click', handleSizeChange);
            handleSizeChange(); // Initial height update

            return () => {
                currentRef.removeEventListener('click', handleSizeChange);
            };
        }
    }, []);

    return [ref, height, test];
}

export default useComponentResizeHeight;
