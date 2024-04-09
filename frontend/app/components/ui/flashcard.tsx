import { Box, Heading, HStack, IconButton, Stack, Text } from "@chakra-ui/react"
import { FaArrowRight } from "react-icons/fa"
import { BLACK, BORDER_RADIUS, COMPONENT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from "../styles.config"

interface Flashcard {
	imageUrl: string,
	alt: string,
	title: string,
	description: string,
	width: string
}

export const FlashCard = ({
	imageUrl,
	alt,
	title,
	description,
	width
}: Flashcard) => {
	return (
		<Stack
			backgroundColor={PRIMARY_BG_COLOR}
			w={width}
			padding="15px"
			alignItems="center"
			gap="10px"
			p={COMPONENT_PADDING}
		>
			<Box border="1px" height="250px" width="300px">
				<img src={imageUrl} alt={alt} />
			</Box>
			<HStack
				p="10px"
				borderRadius={BORDER_RADIUS}
				backgroundColor={BLACK}
				_hover={{
					cursor: "pointer"
				}}
				onClick={() => { }}
			>
				<Heading color={WHITE} fontSize="28px">
					{title}
				</Heading>
				<IconButton
					aria-label="go to"
					backgroundColor={BLACK}
					color={WHITE}
					size="xs"
					as={FaArrowRight}
				/>
			</HStack>
			<Box
				backgroundColor={WHITE}
				p="10px"
				borderRadius={BORDER_RADIUS}
			>
				<Text>
					{description}
				</Text>
			</Box>
		</Stack>
	)
}