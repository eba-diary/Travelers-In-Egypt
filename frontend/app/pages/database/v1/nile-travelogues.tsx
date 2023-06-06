import { Spinner, Stack, Text } from "@chakra-ui/react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import usePageNumber from "../../../lib/hooks/usePageNumber";
import axios from 'axios'
import NileTraveloguesDataViews, { TraveloguesTable } from "../../../components/ui/database/nile-travelogues-data-views";

export default function BoatPassengers({ prefetchShips }) {
    usePageNumber(1)
    const oneHour = 60 * 60 * 1000
    const { data } = useQuery({
        queryKey: ['travelogues'],
        queryFn: getTravelogues,
        retry: 5,
        retryDelay: 500,
        staleTime: oneHour,
        refetchInterval: oneHour
    })

    return (
        <Stack>
            <Text>
                {data && (
                    <NileTraveloguesDataViews data={data} />
                )}
            </Text>
        </Stack>
    )
}

export async function getServerSideProps() {
    const queryClient = new QueryClient()
    const ships = await queryClient.prefetchQuery(['travelogues'], getTravelogues)
    return {
        props: {
            prefetchShips: await getTravelogues()
        }
    }
}

const getTravelogues = async () => {
    const data = await axios.get(process.env.NODE_ENV === 'development' ? 'http://localhost:8080/api/v1/db/travelogues' : 'https://tie-backend.vercel.app/api/v1/db/travelogues'
    ).then(res => res.data)
    return { rows: data } as TraveloguesTable
}