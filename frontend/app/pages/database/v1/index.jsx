import { Stack, Text } from "@chakra-ui/react";
import { get } from "../../../lib/getStaticPages/get";
import usePageNumber from "../../../lib/hooks/usePageNumber";

export default function V1({ databaseCards }) {
    usePageNumber(1)
    console.log(databaseCards)
    return (
        <Stack>
            <Text>
                V1
            </Text>
        </Stack>
    )
}

export async function getServerSideProps() {
    const databaseCards = await get('research')

    return {
        props: {
            databaseCards
        }
    }
}