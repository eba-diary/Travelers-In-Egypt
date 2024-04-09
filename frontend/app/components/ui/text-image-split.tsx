import { Box, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { useMemo } from "react"
import { DEFAULT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from "../../components/styles.config"

interface TextImageProps {
	text: string
	heading: string
	imageUrl?: string,
	alt?: string,
	split: `${number}/${number}`
	imagePlacement?: "start" | "end"
	backgroundColor: "primary" | "secondary"
}

export const TextImageSplit = ({ text, heading, imageUrl, alt, split, imagePlacement = "end", backgroundColor }: TextImageProps) => {
	const [flexText, flexImage] = split.split('/').map(Number)

	const _backgroundColor = useMemo(() => (
		backgroundColor === "primary" ? SECONDARY_BG_COLOR : WHITE
	), [backgroundColor])

	return (
		<Stack
			width="100%"
			backgroundColor={_backgroundColor}
			padding={DEFAULT_PADDING}
			alignItems="center"
		>
			<Box
				display="flex"
				flexDir={{
					base: imagePlacement === "start" ? "column-reverse" : "column",
					md: imagePlacement === "start" ? "row-reverse" : "row"
				}}
				alignItems="center"
				padding="8px"
				width={{ base: "full", md: "3xl", lg: "4xl", xl: "7xl" }}
			>
				<Stack flex={flexText}>
					<Heading as="h2" size="lg">
						{heading}
					</Heading>
					<Text>
						{text}
					</Text>
				</Stack>
				<Stack
					width="250px"
					height="full"
					flex={flexImage}
					textAlign="center"
					justifyContent="center"
				>
					{imageUrl ? <img src={imageUrl} alt={alt} /> : <p>Image here</p>}
				</Stack>
			</Box>
		</Stack >
	)
}