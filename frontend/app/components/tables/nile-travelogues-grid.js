import { Stack, VStack, Text, Grid, GridItem } from "@chakra-ui/react"
import Paginator from "../utils/Paginator"

export default function NileTraveloguesGrid({ data, results, setResults }) {

    const dataCopy = data
    return (
        <Stack>
            {Array.isArray(data) ?
                <Stack>
                    <Paginator
                        dataLength={data.length} page={results.page} display={parseInt(results.display)} setResults={setResults} id={'nile-travelogues'} />
                    {dataCopy.slice(results.pageStart, Math.min(parseInt(results.pageStart) + parseInt(results.display), data.length)).map((entry, index) => {
                        return (
                            <Stack key={index} pb='50px' borderRadius={5} border='1px solid #EEE' padding='10px'>
                                <VStack alignItems='flex-start'>
                                    <Text fontSize='25px' fontWeight={900}>Travelers {index}</Text>
                                    <Text fontSize='25px' fontWeight={600} >{entry.travelers_names}: {entry.title}</Text>
                                </VStack>
                                <VStack alignItems='flex-start'>
                                    <Text fontSize='25px' fontWeight={900}>Summary</Text>
                                    <Text fontSize='25px' fontWeight={600} >{entry.summary} </Text>
                                </VStack>
                            </Stack>
                        )
                    })}
                    <Paginator dataLength={data.length} page={results.page} display={parseInt(results.display)} setResults={setResults} id={'nile-travelogues'} />
                </Stack>
                :
                <Text>{data.data}</Text>
            }
        </Stack>
    )
}