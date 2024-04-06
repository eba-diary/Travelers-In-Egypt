import NavigationTabs from "./navigation-tabs"
import Footer from './Footer'
import { Heading, Stack, Text } from "@chakra-ui/react"
import { useQueryClient, useQuery, useHydrate } from '@tanstack/react-query'

export default function Layout({ children }) {
	const queryClient = useQueryClient()
	const oneHour = 60 * 60 * 1000

	useHydrate(queryClient)
	return (
		<Stack minHeight='100vh' spacing={0}>
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
			<Stack paddingBottom='300px'>
				{children}
			</Stack>
			<Footer />
		</Stack>
	)
}