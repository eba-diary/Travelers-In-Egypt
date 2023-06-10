import { Button, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function EmmaBAndrewsDataViews() {
    const router = useRouter()
    return (
        <Stack width='100%' height='500px' alignItems='center' justifyContent='center'>
            <Text>This database is under construction</Text>
            <Button onClick={() => router.back()}>Back</Button>
        </Stack>
    )
}