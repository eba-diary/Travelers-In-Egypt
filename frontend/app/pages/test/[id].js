import { Stack, Text } from "@chakra-ui/react";
import Layout from "../../components/utils/Layout";
import MarginStack from "../../components/utils/MarginStack";

export default function Test({ data }) {

    return (
        <Layout index={-1}>
            <MarginStack>
                <Stack>
                    <Text>{data}</Text>
                </Stack>
            </MarginStack>
        </Layout>
    )
}

export async function getStaticProps(context) {
    // const id = context.params.id
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/all`)
    const data = await (res.json())
    return {
        props: { data: data }
    }
}

export async function getStaticPaths() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/all`)
    const data = res.json()

    const paths = data.map(entry => {
        return {
            params: { id: entry.toString() }
        }
    })

    return {
        paths: paths,
        fallback: false
    }
}