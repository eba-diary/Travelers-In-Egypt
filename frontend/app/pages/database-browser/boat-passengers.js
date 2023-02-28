import { Grid, GridItem, Stack, Text, VStack } from "@chakra-ui/react";
import Layout from "../../components/utils/Layout";
import MarginStack from "../../components/utils/MarginStack";
import Paginator from "../../components/utils/Paginator";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { API_BASE_URI } from "../../lib/globals";
import BoatPassengersTable from "../../components/tables/boat-passengers-table";
import { BsFillGrid3X2GapFill, BsListUl } from 'react-icons/bs'
import TabUtility from "../../components/utils/TabUtility";
import BoatPassengersGrid from "../../components/tables/boat-passengers-grid";

export default function DatabaseBrowserID({ data }) {
    const router = useRouter()
    const { page, display } = router.query
    const [results, setResults] = useState({ page: 1, display: 10, pageStart: 1 })

    useEffect(() => {
        setResults({
            page: page ? page : 1,
            display: display ? display : 1,
            pageStart: ((page ? page : 1) - 1) * (display ? display : 10)
        })
    }, [page, display])

    return (
        <Layout index={-1}>
            <MarginStack>
                <Stack pb='50px'>
                    <Text fontSize='32px' fontWeight={700} pb='15px'>
                        Boat Passengers Database
                    </Text>
                    <Stack>
                        <TabUtility buttons={[
                            {
                                ariaLabel: 'Show boat passengers in a grid',
                                icon: <BsFillGrid3X2GapFill />
                            },
                            {
                                ariaLabel: 'Show boat passengers in table',
                                icon: <BsListUl />
                            }
                        ]} />
                    </Stack>
                </Stack>
                <BoatPassengersTable bpData={data} />
                <BoatPassengersGrid
                    data={data}
                    page={page}
                    display={display}
                    results={results}
                    setResults={setResults}
                />
            </MarginStack>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${API_BASE_URI}/database-browser/boat-passengers`)
    const data = await res.json()
    return {
        props: { data: data }
    }
}