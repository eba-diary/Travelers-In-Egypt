import { Stack, Text } from "@chakra-ui/react";
import Layout from "../../components/utils/Layout";
import MarginStack from "../../components/utils/MarginStack";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'
import { API_BASE_URI } from "../../lib/globals";
import BoatPassengersTable from "../../components/tables/boat-passengers-table";
import { BsFillGrid3X2GapFill, BsListUl } from 'react-icons/bs'
import BoatPassengersGrid from "../../components/tables/boat-passengers-grid";
import dynamic from "next/dynamic";

export default function DatabaseBrowserID({ data }) {
    const router = useRouter()

    const TabUtility = dynamic(() => import('../../components/utils/TabUtility'), {
        loading: () => 'Loading...',
    })

    const { page, display } = router.query
    const [results, setResults] = useState({ page: 1, display: 10, pageStart: 1 })

    const [dbData, setDbData] = useState(data)

    const [view, setView] = useState(0);

    // useEffect(() => {
    //     localStorage.setItem('tab_index', view)
    // }, [view])

    useEffect(() => {
        setResults({
            page: page ? page : 1,
            display: display ? display : 1,
            pageStart: ((page ? page : 1) - 1) * (display ? display : 10)
        })
    }, [page, display])

    const handleTabChange = (index) => {
        localStorage.setItem('tab_index', index)
        setView(index)
    }

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
                                icon: BsFillGrid3X2GapFill
                            },
                            {
                                ariaLabel: 'Show boat passengers in table',
                                icon: BsListUl
                            }
                        ]} handleTabChange={handleTabChange} view={view} />
                    </Stack>
                </Stack>

                {/* {view === 0 && ( */}
                <BoatPassengersTable bpData={dbData} />
                {/* )} */}
                {/* {view === 1 && ( */}
                {/* <BoatPassengersGrid
                    data={dbData}
                    page={page}
                    display={display}
                    results={results}
                    setResults={setResults}
                /> */}
                {/* )} */}
            </MarginStack>
        </Layout>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`${API_BASE_URI}/database-browser/boat-passengers`)
    console.log(res)
    const data = await res.json()
    return {
        props: { data: data }
    }
}