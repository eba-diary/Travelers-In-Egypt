import { useEffect, useState } from "react"
import { debounce } from "../utils/debounce"

interface ViewportDimensionProps {
	x: number,
	y: number
}

interface ViewportDimensionHook {
	viewportDimensions: ViewportDimensionProps
}

export const useViewportDimensions = (): ViewportDimensionHook => {
	const [viewportDimensions, setViewportDimensions] = useState<ViewportDimensionProps>({
		x: 0,
		y: 0
	});

	const updateViewport = debounce((x: number, y: number) => {
		setViewportDimensions({ x, y });
	}, 50);

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const { x, y } = { x: window.innerWidth, y: window.innerHeight }
			updateViewport(x, y)

		window?.addEventListener("resize", () => updateViewport(x, y))

			return () => {
				window.removeEventListener("resize", () => updateViewport(x, y))
			}
		}
	}, []);


	return {
		viewportDimensions,
	};
}