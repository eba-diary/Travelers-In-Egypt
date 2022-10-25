import { Stack, Text } from "@chakra-ui/react";

export default function CmsTester({ props }) {
    return (
        <Stack>
            <Text>
                {JSON.stringify(props)}
            </Text>
        </Stack>
    )
}