import { HStack, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

export default function FeaturedMember() {
    const title = 'Principal Investigator'
    const member = 'Sarah Ketchley'
    return (
        <Stack paddingTop='20px'>
            <Text
                color='#FFF'
                backgroundColor='#C58A22'
                fontSize='lg'
                fontWeight={500}
                padding='10px' width={`${(title.length + member.length) * 10}px`}
            >
                {title}: {member}
            </Text>
            <HStack maxWidth='1200px'>
                <Stack borderRadius='full' minHeight='75px' minWidth='75px' border='2px solid #C58A22'>
                </Stack> {/* replace with Image later  */}
                <Text paddingLeft='25px'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis earum in dolor dolorem officiis, voluptatum, nisi repudiandae, dolores natus alias nihil sequi nam eligendi? Sapiente repellendus eveniet, et reprehenderit rerum nisi nihil? Ratione, ex. Rerum consectetur repudiandae velit suscipit. Vitae, quo optio? Ad vitae voluptatem neque at, velit laborum dicta!
                </Text>
            </HStack>
        </Stack>
    )
}