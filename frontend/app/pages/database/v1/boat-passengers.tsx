import { Spinner, Stack, Text } from "@chakra-ui/react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import usePageNumber from "../../../lib/hooks/usePageNumber";
import { BoatPassengersDataViews, Ship } from "../../../components/ui/database/boat-passengers-data-views";
import { API_BASE_URL, ONE_HOUR } from "../../../lib/constants";
import { TextImageSplit } from "../../../components/ui/text-image-split";

export default function BoatPassengers() {
	usePageNumber(1)
	const { data: boatPassengerData, isLoading, isError } = useQuery<Ship[]>(["ships"], async () => {
		const data = await fetch(`${API_BASE_URL}/api/v1/db/ships`)
		const res = await data.json()
		/* res.forEach((row: Ship) => {
			row.passenger_list = JSON.parse(row.passenger_list)
		}) */
		return res
	}, {
		retry: 3,
		staleTime: ONE_HOUR
	})

	if (isLoading || isError) {
		return (
			<Stack>
				<Spinner />
			</Stack>
		)
	}

	return (
		<Stack>
			{boatPassengerData && (
				<BoatPassengersDataViews data={boatPassengerData} />
			)}
		</Stack>
	)
}  