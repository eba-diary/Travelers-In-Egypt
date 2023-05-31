import { Stack, Text } from "@chakra-ui/react";
import Layout from "../../../components/utils/Layout";
import usePageNumber from "../../../lib/hooks/usePageNumber";

export default function ArtifactsExhibition() {
    usePageNumber(1)
    return (
        <Stack>
            <Text>
                Artifacts Exhibition Page
            </Text>
        </Stack>
    )
}