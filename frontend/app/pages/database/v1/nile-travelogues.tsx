import { Spinner, Stack, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import usePageNumber from "../../../lib/hooks/usePageNumber";
import { NileTraveloguesDataViews, NileTravelogue } from "../../../components/ui/database/nile-travelogues-data-views";
import { API_BASE_URL } from "./types/types";

export default function NileTravelogues() {
	usePageNumber(1)

	const { data: travelogeusData, isError, isLoading } = useQuery<NileTravelogue[]>(["travelogues"], async () => {
		const data = await fetch(`${API_BASE_URL}/api/v1/db/travelogues`)
		return await data.json()
	});

	if (isError || isLoading) {
		return <Spinner />
	}
	return (
		<Stack>
			<Text>
				<NileTraveloguesDataViews data={travelogeusData} />
			</Text>
		</Stack>
	)
}