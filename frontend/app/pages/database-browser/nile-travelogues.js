import Layout from "../../components/utils/Layout"
import MarginStack from "../../components/utils/MarginStack"
import { API_BASE_URI } from "../../lib/globals"
import { useRouter } from 'next/router'
import { Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsFillGrid3X2GapFill, BsListUl } from 'react-icons/bs'
import dynamic from "next/dynamic";
import NileTraveloguesGrid from "../../components/tables/nile-travelogues-grid";
import NileTraveloguesTable from "../../components/tables/nile-travelogues-table";

export default function NileTravelogues({ data }) {
    const router = useRouter()

    const TabUtility = dynamic(() => import('../../components/utils/TabUtility'), {
        loading: () => 'Loading...',
    })

    const { page, display } = router.query
    const [results, setResults] = useState({ page: 1, display: 10, pageStart: 1 })

    const [dbData, setDbData] = useState(data)
    console.log("dbData: ", dbData)

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
                        Nile Travelogues Database
                    </Text>
                    <Stack>
                        <TabUtility buttons={[
                            {
                                ariaLabel: 'Show nile travelogues in a grid',
                                icon: BsFillGrid3X2GapFill
                            },
                            {
                                ariaLabel: 'Show nile travelogues in a table',
                                icon: BsListUl
                            }
                        ]} handleTabChange={handleTabChange} view={view} />
                    </Stack>
                </Stack>

                {view === 0 && (
                    <NileTraveloguesTable ntData={dbData} />
                )}
                {view === 1 && (
                    <NileTraveloguesGrid
                        data={dbData}
                        page={page}
                        display={display}
                        results={results}
                        setResults={setResults}
                    />
                )}
            </MarginStack>
        </Layout>
    )
}

export async function getStaticProps() {
    const res = await fetch(`${API_BASE_URI}/database-browser/nile-travelogues`)
    const data = await res.json()
    return {
        props: { data: data }
    }
}