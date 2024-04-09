import { Box, Heading, HStack, IconButton, ResponsiveObject, Stack, Text } from "@chakra-ui/react"
import { FaArrowRight } from "react-icons/fa"
import { BLACK, BORDER_RADIUS, COMPONENT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from "../styles.config"


interface Flashcard {
	imageUrl: string,
	alt: string,
	title: string,
	description: string,
	width: string | ResponsiveObject<string>
}

export const FlashCard = ({
	imageUrl,
	alt,
	title,
	description,
	width
}: Flashcard) => {
	return (
		<Box
			backgroundColor={PRIMARY_BG_COLOR}
			w={width}
			padding="15px"
			alignItems="center"
			gap="10px"
			p={COMPONENT_PADDING}
			display="flex"
			flexDir={{ base: "row", md: "column" }}
		>
			<Box
				border="1px"
				height="200px"
				width={{ base: "280px", md: "240px", lg: "300px" }}
			>
				<img src={imageUrl} alt={alt} />
			</Box>
			<Stack
				w="full"
				alignItems="center"
			>
				<HStack
					p="10px"
					borderRadius={BORDER_RADIUS}
					backgroundColor={BLACK}
					justifyContent="center"
					w={{ base: "100%", lg: "75%" }}
					_hover={{
						cursor: "pointer"
					}}
					onClick={() => { }}
				>
					<Heading
						color={WHITE}
						fontSize={{ base: "18px", lg: "22px", xl: "28px" }}
					>
						{title}
					</Heading>
					<IconButton
						aria-label="go to"
						backgroundColor={BLACK}
						color={WHITE}
						size="xs"
						as={FaArrowRight}
						_hover={{
							backgroundColor: BLACK
						}}
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
		</Box>
	)
}