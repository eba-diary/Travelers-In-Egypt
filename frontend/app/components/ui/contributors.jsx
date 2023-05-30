import { HStack, Stack, Text, Image } from "@chakra-ui/react"
import Collapse from "./references/collapse"

export default function Contributors({ data }) {
    return (
        <Stack width='100%' alignItems='center'>
            <Stack width='90%'>
                <Text
                    padding='0px 15px'
                    fontSize='26px'
                    fontWeight={600}
                    borderBottom='3px solid #C58A22'
                    width='50%'
                >
                    {data.fields.title}
                </Text>
                <Collapse
                    data={data.fields.studentCollapse}
                    type={data.type}
                />
            </Stack>
        </Stack>
    )
}