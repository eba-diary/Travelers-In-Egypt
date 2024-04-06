import NavigationTabs from "./navigation-tabs"
import Footer from './Footer'
import { Heading, Stack, Text } from "@chakra-ui/react"
import { useQueryClient } from '@tanstack/react-query'
import { useViewportDimensions } from "../../lib/hooks/use-viewport-dimensions"

export default function Layout({ children }) {
	const { viewportDimensions: { y } } = useViewportDimensions();

	return (
		<Stack height={y} spacing={0}>
			<Stack
				height={{ base: "175px", md: "200px" }}
				backgroundImage="url('/eba_bg.png')"
				alignItems="center"
				justifyContent="center"
			>
				<Heading>
					Travelers In Egypt
				</Heading>
			</Stack>
			<NavigationTabs />
			<Stack spacing={0}>
				{children}
			</Stack>
			<Footer />
		</Stack>
	)
}