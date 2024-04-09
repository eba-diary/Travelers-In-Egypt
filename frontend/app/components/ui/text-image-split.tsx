import { Heading, HStack, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"
import { DEFAULT_PADDING, SECONDARY_BG_COLOR } from "../../components/styles.config"

interface TextImageProps {
	text: string
	heading: string
	imageUrl?: string,
	alt?: string,
	split: `${number}/${number}`
	imagePlacement?: "start" | "end"
}

export const TextImageSplit = ({ text, heading, imageUrl, alt, split, imagePlacement = "end" }: TextImageProps) => {
	const [flexText, flexImage] = split.split('/').map(Number)

	return (
		<Stack
			width="100%"
			backgroundColor={SECONDARY_BG_COLOR}
			padding={DEFAULT_PADDING}
			alignItems="center"
		>
			<HStack
				alignItems="center"
				padding="8px"
				width="7xl"
				flexDirection={imagePlacement === "start" ? "row-reverse" : "row"}
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
			</HStack>
		</Stack>
	)
}