import { Grid, GridItem, Stack, Text, VStack } from "@chakra-ui/react";
import Layout from "../../components/utils/Layout";
import MarginStack from "../../components/utils/MarginStack";
import Paginator from "../../components/utils/Paginator";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router'

export default function DatabaseBrowserID({ data, id }) {
    const router = useRouter()
    const { page, display } = router.query
    const [results, setResults] = useState({ page: 1, display: 10, pageStart: 1 })

    const entry = id.split('-').map((word) => {
        if (word.length === 1) {
            word = word + '.'
        }
        return word[0].toUpperCase() + word.substring(1,) + ' '
    })

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
                    <Text fontSize='32px' fontWeight={900} pb='15px'>
                        {entry.toString().replaceAll(',', '') + " Database"}
                    </Text>
                </Stack>
                <Stack>
                    {Array.isArray(data) ?
                        <Stack>
                            <Paginator dataLength={data.length} page={page} display={results.display} setResults={setResults} id={id} />
                            {data.slice(results.pageStart, Math.min(parseInt(results.pageStart) + parseInt(display), data.length)).map((entry, index) => {
                                return (
                                    <Stack key={index} pb='50px' borderRadius={5} border='1px solid #EEE' padding='10px'>
                                        <VStack alignItems='flex-start'>
                                            <Text fontSize='25px' fontWeight={900}>Ship {index}</Text>
                                            <Text fontSize='25px' fontWeight={600} >{entry.name}: {entry.shipdate}</Text>
                                        </VStack>
                                        <VStack alignItems='flex-start'>
                                            <Text fontSize='25px' fontWeight={900}>People</Text>
                                            <Grid templateColumns='repeat(5, 1fr)'>
                                                {entry.lists.split(',').map((people, index) => {
                                                    return (
                                                        <ul key={index}>
                                                            <GridItem p='10px'>
                                                                <li>
                                                                    <Text>{people}</Text>
                                                                </li>
                                                            </GridItem>
                                                        </ul>
                                                    )
                                                })}
                                            </Grid>
                                        </VStack>
                                    </Stack>
                                )
                            })}
                            <Paginator dataLength={data.length} page={page} display={results.display} setResults={setResults} id={id} />
                        </Stack>
                        :
                        <Text>{data.data}</Text>
                    }
                </Stack>
            </MarginStack>
        </Layout>
    )
}

export async function getStaticProps(context) {
    const id = context.params.id
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/database_browser/${id}`)
    const data = await res.json()
    return {
        props: {
            data: data,
            id: id
        }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/database_browser`)
    const data = await res.json()

    const paths = data.map(entry => {
        return {
            params: { id: entry.toString() }
        }
    })
    return {
        paths,
        fallback: false
    }
}