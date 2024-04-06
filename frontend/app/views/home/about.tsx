import { Heading, HStack, Stack, Text } from "@chakra-ui/react"
import { DEFAULT_PADDING, SECONDARY_BG_COLOR } from "../../components/styles.config"

export const About = () => {
	return (
		<Stack
			width="100%"
			backgroundColor={SECONDARY_BG_COLOR}
			padding={DEFAULT_PADDING}
			alignItems="center"
		>
			<HStack alignItems="center" padding="8px" width="7xl">
				<Stack flex={3}>
					<Heading as="h2" size="lg">
						About
					</Heading>
					<Text>
						The Emma B. Andrews Diary Project began in 2011 at the University of Washington, a product of Dr. Sarah Ketchley's work to transcribe and analyze a multi-volume collection of Nile travel journals written by Mrs. Emma B. Andrews, who is best remembered for her association with the millionaire lawyer turned archaeologist/art and antiquities collector, Theodore M. Davis. Traveling to Egypt with him between 1889 and 1912, she kept detailed journals of these voyages along the Nile, including his important yet under-reported excavations of more than 20 significant tombs in the Valley of the Kings.
					</Text>
				</Stack>
				<Stack
					width="250px"
					height="full"
					border="1px"
					flex={2}
					textAlign="center"
					justifyContent="center"
				>
					<p>image here</p>
				</Stack>
			</HStack>
		</Stack>
	)
}