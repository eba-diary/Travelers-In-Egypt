import NavigationTabs from "./navigation-tabs"
import { Footer } from './footer'
import { Heading, Stack, Text } from "@chakra-ui/react"
import { useQueryClient } from '@tanstack/react-query'
import { useViewportDimensions } from "../../lib/hooks/use-viewport-dimensions"
import { WHITE } from "../styles.config"

export default function Layout({ children }) {
	const { viewportDimensions: { y } } = useViewportDimensions();

	return (
		<Stack minHeight={y} spacing={0}>
			<Stack
				height={{ base: "175px", md: "200px" }}
				background="url('/eba_bg.png')"
				backgroundSize="cover"
				backgroundPosition="right"
				alignItems="center"
				zIndex={1}
				justifyContent="center"
			>
				<Heading color={WHITE} fontSize="42px" letterSpacing="10px">
					Travelers In Egypt
				</Heading>
			</Stack>
			<NavigationTabs />
			<Stack spacing={0}>
				{children}
			</Stack>
			<Stack>
				<Footer />
			</Stack>
		</Stack >
	)
}