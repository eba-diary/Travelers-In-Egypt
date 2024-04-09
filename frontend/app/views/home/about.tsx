import { Heading, HStack, Stack, Text } from "@chakra-ui/react"
import { useEffect } from "react"
import { DEFAULT_PADDING, SECONDARY_BG_COLOR } from "../../components/styles.config"
import { FlashCard } from "../../components/ui/flashcard"
import { TextImageSplit } from "../../components/ui/text-image-split"
import { useAboutPage } from "../../lib/hooks/use-about-page"
import { isLoadingOrError } from "../../lib/hooks/utils"

export const About = () => {

	const { flashCards: { data: flashCardData, ...loadingOrError } } = useAboutPage();

	if (isLoadingOrError(loadingOrError)) {
		/** TODO replace with generic loading component */
		return <div></div>
	}

	return (
		<Stack>
			<TextImageSplit
				heading="About"
				text="The Emma B. Andrews Diary Project began in 2011 at the University of Washington, a product of Dr. Sarah Ketchley's work to transcribe and analyze a multi-volume collection of Nile travel journals written by Mrs. Emma B. Andrews, who is best remembered for her association with the millionaire lawyer turned archaeologist/art and antiquities collector, Theodore M. Davis. Traveling to Egypt with him between 1889 and 1912, she kept detailed journals of these voyages along the Nile, including his important yet under-reported excavations of more than 20 significant tombs in the Valley of the Kings."
				split="3/2"
			/>
			<HStack
				px="10px"
				justifyContent="center"
				gap="25px"
				py="50px"
			>
				{flashCardData.map(({ imageUrl, alt, title, description }) => (
					<FlashCard
						key={`${title}-${imageUrl}`}
						imageUrl={imageUrl}
						alt={alt}
						title={title}
						description={description}
						width={`${1200 / flashCardData.length}px`}
					/>
				))}
			</HStack>
			<TextImageSplit
				heading="Scope"
				text="The scope of our archival material has expanded beyond the Andrews Diaries to include diaries and letters written by some of the lesser-known figures in Egyptology, including the unpublished writings of some of the 'hidden' women of early Egyptology - the wives of archaeologists. These women had prominent roles in archaeological circles, yet they are mostly forgotten since their records were personal letters and diaries, now dispersed in little-known family or institutional archives. The life writings of these women add important and unique historiographical context to the social and archaeological history of the time, and provide a unique and detailed overview of discipline formation, gendered labor, and social and intellectual networks in Egypt during this period."
				split="3/2"
			/>
		</Stack>
	)
}