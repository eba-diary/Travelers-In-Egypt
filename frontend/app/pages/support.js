import { Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import Layout from "../components/utils/Layout";

export default function Support() {
    const router = useRouter()
    // const 

    return (
        <Layout index={5}>
            <Stack>
                <Text>
                    Support Page
                </Text>
            </Stack>
        </Layout>
    )
}