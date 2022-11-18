import { Stack, Text } from "@chakra-ui/react";
import Layout from "../../components/utils/Layout";
import MarginStack from "../../components/utils/MarginStack";


export default function Test({ data }) {

    return (
        <Layout index={-1}>
            <MarginStack>
                <Stack>
                    {data.map((entry, index) => {
                        return (
                            <Stack key={index} pb='50px'>
                                <Text fontSize='22px' fontWeight={900}>{entry.shipdate}</Text>
                                <Text>{entry.lists}</Text>
                            </Stack>
                        )
                    })}
                </Stack>
            </MarginStack>
        </Layout>
    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/all`)
    const data = await (res.json())
    return {
        props: { data: data }
    }
}