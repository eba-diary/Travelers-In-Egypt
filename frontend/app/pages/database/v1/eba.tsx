import { Stack, Text } from "@chakra-ui/react";
import { QueryClient, useQuery } from "@tanstack/react-query";
import usePageNumber from "../../../lib/hooks/usePageNumber";
import axios from 'axios'
import { TraveloguesTable } from "../../../components/ui/database/nile-travelogues-data-views";
import EmmaBAndrewsDataViews from "../../../components/ui/database/emma-b-andrews-data-views";

export default function EmmaBAndrews({ prefetchShips }) {
    usePageNumber(1)
    const oneHour = 60 * 60 * 1000
    const { data } = useQuery({
        queryKey: ['eba'],
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
                    <EmmaBAndrewsDataViews />
                )}
            </Text>
        </Stack>
    )
}

export async function getServerSideProps() {
    const queryClient = new QueryClient()
    const ships = await queryClient.prefetchQuery(['eba'], getTravelogues)
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