import { Button, Stack } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FaArrowRight } from "react-icons/fa"
import { PRIMARY_BG_COLOR } from "../../../components/styles.config"
import { TextImageSplit } from "../../../components/ui/text-image-split"
import { BrowsePublicationsByCategory, CategoryFilter } from "./browse-by-category"
import { BrowsePublicationsBySearch } from "./browse-by-search"

interface TraveloguesHomeProps {
	categories: CategoryFilter[]
}

export const TraveloguesHome: React.FC<TraveloguesHomeProps> = ({
	categories
}) => {
	const router = useRouter()

	const handlePathChange = () => {
		const tabParams = new URLSearchParams()
		tabParams.append("tab", "table")
		const pathname = router.pathname
		router.push({
			pathname,
			query: tabParams.toString()
		})
	}
	return (
		<div>
			<TextImageSplit
				heading="Travelers in Egypt Travelogues Database"
				text="Nile Travelogues is a database containing travelogues written by those who travelled to Egypt during the Golden Age of Egyptian Archaeology (late 19th and early 20th Century). Nile Travelogues started off with publications listed in Nile Notes of a Howadji by Martin Kalfatovic. Many publications can be read right here, thanks to book scans from the Internet Archive."
				split="3/2"
				backgroundColor="primary"
			>
				<Stack
					width="100%"
					alignItems="center"
				>
					<Stack
						width={{ base: "full", md: "3xl", lg: "4xl", xl: "7xl" }}
					>
						<Stack w="100%">
							<Button
								width="fit-content"
								backgroundColor={PRIMARY_BG_COLOR}
								rightIcon={<FaArrowRight />}
								onClick={handlePathChange}
							>
								Start Browsing
							</Button>
						</Stack>
					</Stack>
				</Stack>
			</TextImageSplit>
			<BrowsePublicationsByCategory
				backgroundColor="secondary"
				categories={categories}
				afterSubmit={handlePathChange}
			/>
			<BrowsePublicationsBySearch
				backgroundColor="secondary"
				afterSubmit={handlePathChange}
			/>
		</div>
	)
}