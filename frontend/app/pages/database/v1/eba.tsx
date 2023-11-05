import { Stack, Text } from "@chakra-ui/react";
import usePageNumber from "../../../lib/hooks/usePageNumber";
import EmmaBAndrewsDataViews from "../../../components/ui/database/emma-b-andrews-data-views";

export const EmmaBAndrews = () => {
    usePageNumber(1)

    return (
        <Stack>
            <Text>
                <EmmaBAndrewsDataViews />
            </Text>
        </Stack>
    )
}