import { Button, Spinner, Stack, Text, useRadio } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import usePageNumber from "../../../lib/hooks/usePageNumber";
import { NileTraveloguesDataViews, NileTravelogue } from "../../../components/ui/database/nile-travelogues-data-views";
import { API_BASE_URL } from "../../../lib/constants";
import { TextImageSplit } from "../../../components/ui/text-image-split";
import { TraveloguesProvider } from "../../../views/database/travelogues/hooks/use-travelogues-filter";
import { BrowsePublicationsByCategory, Category } from "../../../views/database/travelogues/browse-by-category";
import { BrowsePublicationsBySearch } from "../../../views/database/travelogues/browse-by-search";
import { useTravelogueData } from "../../../lib/database/global-hooks/use-travelogue-data";
import { isLoadingOrError } from "../../../lib/hooks/utils";
import { PRIMARY_BG_COLOR } from "../../../components/styles.config";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TraveloguesHome } from "../../../views/database/travelogues/travelogues-home";
import { TraveloguesTable } from "../../../views/database/travelogues/travelogues-table";

export default function NileTravelogues() {
	usePageNumber(1)

	const { travelogeusData, ...loadingOrError } = useTravelogueData();
	const router = useRouter();

	const { tab } = router.query;
	const [showTablePage, setShowTablePage] = useState<boolean>(false);

	useEffect(() => {
		if (tab && tab === "table") {
			setShowTablePage(true)
		} else {
			setShowTablePage(false)
		}
	}, [tab, router])

	if (isLoadingOrError(loadingOrError)) {
		return <Spinner />
	}
	const categories: Category[] = ["Title", "Traveler", "Decade"]
	return (
		<Stack>
			<TraveloguesProvider>
				{showTablePage ? (
					<TraveloguesTable
						data={travelogeusData}
						categories={categories}
					/>
				) : (
					<TraveloguesHome
						categories={categories}
					/>
				)}
			</TraveloguesProvider>
		</Stack>
	)
}