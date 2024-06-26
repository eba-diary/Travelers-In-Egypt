import { Stack, HStack, Text, Flex, Image, Button, useColorModeValue } from "@chakra-ui/react"
import { useRouter } from "next/router";
import CardSlider from "./content-slider"

export default function CardDeck({ data }) {
    let boxBg = useColorModeValue("white", "white");
    const paddingBg = useColorModeValue("#C58A22", "white");

    const router = useRouter()

    return (
        <HStack justifyContent='center'>
            <Flex
                rowGap='20px'
                columnGap='20px'
                direction='row'
                width='100%'
                background='linear-gradient(180deg, rgba(242,242,242,0) 34%, rgba(248,198,108,1) 35%)'
                justifyContent='center'
            >
                <CardSlider gap={20}>
                    {data.fields.sliderCards.map((entries, index) => {
                        return (
                            <Flex
                                key={index}
                                h='400px'
                                w='300px'
                                direction='column'
                                bg={boxBg}
                                alignItems='center'
                                justifyContent='flex-start'
                                border='6px solid'
                                boxShadow='5px 10px 5px #9c6b19'
                                borderColor={paddingBg}
                                borderRadius='5px'
                                rowGap='20px'
                                columnGap='20px'
                            >
                                <Stack
                                    width='100%'
                                    height='100%'
                                >
                                    <Stack width='100%' height='200px' borderBottom='2px solid #BBB'>
                                        <Image
                                            src={entries.image.src}
                                            alt={entries.image.alt}
                                            height='200px'
                                        />
                                    </Stack>
                                    <Stack padding='5px' justifyContent='space-between' height='100%'>
                                        <Stack>
                                            <Text fontSize='16px' fontWeight={700} color='#C58A22'>
                                                {entries.title}
                                            </Text>
                                            <Text fontSize='14px' noOfLines={3}>
                                                {entries.description}
                                            </Text>
                                        </Stack>
                                        <Stack width='100%' alignItems='flex-end'>
                                            <Button
                                                width='fit-content'
                                                onClick={() => {
                                                    router.push(entries.url)
                                                }}
                                            >
                                                Learn More
                                            </Button>
                                        </Stack>
                                    </Stack>
                                </Stack>
                            </Flex>
                        )
                    })}
                </CardSlider>
            </Flex>
        </HStack>
    )
}