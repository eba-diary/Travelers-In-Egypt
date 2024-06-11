import { Spinner, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import usePageNumber from "../../../lib/hooks/usePageNumber";
import { NileTraveloguesDataViews, NileTravelogue } from "../../../components/ui/database/nile-travelogues-data-views";
import { API_BASE_URL } from "../../../lib/constants";
import { TextImageSplit } from "../../../components/ui/text-image-split";
import { TraveloguesProvider } from "../../../views/database/travelogues/hooks/use-travelogues-filter";
import { BrowsePublicationsByCategory } from "../../../views/database/travelogues/browse-by-category";
import { BrowsePublicationsBySearch } from "../../../views/database/travelogues/browse-by-search";
import { useTravelogueData } from "../../../lib/database/global-hooks/use-travelogue-data";
import { isLoadingOrError } from "../../../lib/hooks/utils";

export default function NileTravelogues() {
	usePageNumber(1)

	const { travelogeusData, ...loadingOrError } = useTravelogueData();

	if (isLoadingOrError(loadingOrError)) {
		return <Spinner />
	}
	return (
		<Stack>
			<TraveloguesProvider>
				<TextImageSplit
					heading="Travelers in Egypt Travelogues Database"
					text="Nile Travelogues is a database containing travelogues written by those who travelled to Egypt during the Golden Age of Egyptian Archaeology (late 19th and early 20th Century). Nile Travelogues started off with publications listed in Nile Notes of a Howadji by Martin Kalfatovic. Many publications can be read right here, thanks to book scans from the Internet Archive."
					split="3/2"
					backgroundColor="primary"
				/>
				<BrowsePublicationsByCategory backgroundColor="secondary" />
				<BrowsePublicationsBySearch backgroundColor="secondary" />
				<NileTraveloguesDataViews data={travelogeusData} />
			</TraveloguesProvider>
		</Stack>
	)
}