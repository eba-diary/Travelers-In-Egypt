import { Grid, GridItem, Stack, Text, VStack } from "@chakra-ui/react";
import Layout from "../../components/utils/Layout";
import MarginStack from "../../components/utils/MarginStack";

export default function DatabaseBrowserID({ data }) {
    console.log(data)
    return (
        <Layout index={-1}>
            <MarginStack>
                <Stack>
                    <Text fontSize='32px' fontWeight={900} pb='50px'>
                        Nile Travelogues Database
                    </Text>
                </Stack>
                <Stack>
                    {data.map((entry, index) => {
                        return (
                            <Stack key={index} pb='50px' borderRadius={5} border='1px solid #EEE' padding='10px'>
                                <VStack alignItems='flex-start'>
                                    <Text fontSize='25px' fontWeight={900}>Ship</Text>
                                    <Text fontSize='25px' fontWeight={600} >{entry.name}: {entry.shipdate}</Text>
                                </VStack>
                                <VStack alignItems='flex-start'>
                                    <Text fontSize='25px' fontWeight={900}>People</Text>
                                    <Grid templateColumns='repeat(5, 1fr)'>
                                        {entry.lists.split(',').map((people, index) => {
                                            return (
                                                <ul>
                                                    <GridItem p='10px'>
                                                        <li>
                                                            <Text key={index}>{people}</Text>
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
        props: { data: data }
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