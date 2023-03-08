import { Stack, VStack, Text, Grid, GridItem, UnorderedList, ListItem } from "@chakra-ui/react"
import Paginator from "../utils/Paginator"

export default function BoatPassengersGrid({ data, results, setResults }) {
    const paginatorProps = {
        dataLength: data.length,
        page: results.page,
        display: parseInt(results.display),
        setResults: setResults,
        id: 'boat-passengers'
    }

    return (
        <Stack>
            {Array.isArray(data) ?
                <Stack>
                    <Paginator {...paginatorProps} />
                    {data.slice(results.pageStart,
                        Math.min(parseInt(results.pageStart) +
                            parseInt(results.display), data.length)
                    ).map((entry, index) => {
                        return (
                            <Stack key={index} pb='50px' borderRadius={5} border='1px solid #EEE' padding='10px'>
                                <VStack alignItems='flex-start'>
                                    <Text fontSize='25px' fontWeight={700}>{entry.name}</Text>
                                    <Text fontSize='25px' fontWeight={600} >{entry.shipdate}</Text>
                                </VStack>
                                <VStack alignItems='flex-start'>
                                    <Text fontSize='25px' fontWeight={700}>People</Text>
                                    <Grid templateColumns='repeat(5, 1fr)'>
                                        {entry.lists.split(',').map((people, index) => {
                                            return (
                                                <UnorderedList key={index}>
                                                    <GridItem p='10px'>
                                                        <ListItem>
                                                            <Text>{people}</Text>
                                                        </ListItem>
                                                    </GridItem>
                                                </UnorderedList>
                                            )
                                        })}
                                    </Grid>
                                </VStack>
                            </Stack>
                        )
                    })}
                    <Paginator {...paginatorProps} />
                </Stack>
                :
                <Text>{data.data}</Text>
            }
        </Stack>
    )
}