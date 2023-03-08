import { Stack, VStack, Text, Grid, GridItem } from "@chakra-ui/react"
import Paginator from "../utils/Paginator"

export default function NileTraveloguesGrid({ data, page, results, setResults, display }) {
    return (
        <Stack>
            {Array.isArray(data) ?
                <Stack>
                    <Paginator dataLength={data.length} page={page} display={parseInt(display)} setResults={setResults} id={'nile-travelogues'} />
                    {data.slice(results.pageStart, Math.min(parseInt(results.pageStart) + parseInt(display), data.length)).map((entry, index) => {
                        return (
                            <Stack key={index} pb='50px' borderRadius={5} border='1px solid #EEE' padding='10px'>
                                <VStack alignItems='flex-start'>
                                    <Text fontSize='25px' fontWeight={900}>Travelers {index}</Text>
                                    <Text fontSize='25px' fontWeight={600} >{entry.travelers_name}: {entry.title}</Text>
                                </VStack>
                                <VStack alignItems='flex-start'>
                                    <Text fontSize='25px' fontWeight={900}>Summary</Text>
                                    <Grid templateColumns='repeat(5, 1fr)'>
                                        {entry.lists.split(',').map((summary, index) => {
                                            return (
                                                <ul key={index}>
                                                    <GridItem p='10px'>
                                                        <li>
                                                            <Text>{summary}</Text>
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
                    <Paginator dataLength={data.length} page={page} display={results.display} setResults={setResults} id={'nile-travelogues'} />
                </Stack>
                :
                <Text>{data.data}</Text>
            }
        </Stack>
    )
}