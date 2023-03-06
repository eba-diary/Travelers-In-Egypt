import Layout from "../../components/utils/Layout"
import { Text } from "@chakra-ui/react"
import MarginStack from "../../components/utils/MarginStack"
import { API_BASE_URI } from "../../lib/globals"

export default function NileTravelogues({ data }) {
    return (
        <Layout index={-1}>
            <MarginStack>
                <Text>{JSON.stringify(data)}</Text>
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