import { HStack, Stack, Text } from "@chakra-ui/react"
import Image from "next/image"

export default function StudentSection({ students }) {
    return (
        <HStack>
            {students.map((entry, index) => {
                return (
                    <Stack key={index} padding='5px 15px'>
                        <Image
                            src={entry.src}
                            alt={entry.alt}
                            height={1}
                            width={1}
                            layout='responsive'
                            objectFit='contain'
                        />
                        <Text>
                            {entry.name}
                        </Text>
                    </Stack>
                )
            })}
        </HStack>
    )
}