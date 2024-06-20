import { Spinner, Stack } from "@chakra-ui/react";
import usePageNumber from "../../../lib/hooks/usePageNumber";
import { TraveloguesProvider } from "../../../views/database/travelogues/hooks/use-travelogues-filter";
import { CategoryFilter } from "../../../views/database/travelogues/browse-by-category";
import { useTravelogueData } from "../../../lib/database/global-hooks/use-travelogue-data";
import { isLoadingOrError } from "../../../lib/hooks/utils";
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
	const categories: CategoryFilter[] = [
		{
			name: "Title",
			method: "none"
		},
		{
			name: "Decade",
			method: "none"
		}, {
			name: "Traveler",
			method: "none"
		}
	]
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