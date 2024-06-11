import { useQuery } from "@tanstack/react-query";
import { NileTravelogue } from "../../../components/ui/database/nile-travelogues-data-views";
import { API_BASE_URL } from "../../constants";

export const useTravelogueData = () => {
	const { data: travelogeusData, isError, isLoading } = useQuery<NileTravelogue[]>(["travelogues"], async () => {
		const data = await fetch(`${API_BASE_URL}/api/v1/db/travelogues`)
		return await data.json()
	});

	return {
		travelogeusData,
		isError,
		isLoading
	}
}