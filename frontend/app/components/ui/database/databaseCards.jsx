import { Button, Grid, GridItem, Image, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function DatabaseCards({ data }) {
    const router = useRouter()

    return (
        <Stack width='100%' alignItems='center'>
            <Stack width='90%'>
                <Text fontSize='48px' fontWeight={700}>
                    {data.fields.title}
                </Text>
                <Grid
                    templateColumns={{
                        base: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)'
                    }}
                    gap='50px'
                >
                    {data.fields.databaseCards.map((entry, index) => (
                        <GridItem key={index}>
                            <Stack
                                width='100%'
                                alignItems='center'
                                shadow='3px 3px 0px 3px #f8c66b'
                                borderRadius='10px'
                                position='relative'
                                justifyContent='flex-start'
                            >
                                <Stack
                                    width='100%'
                                    overflow='hidden'
                                    tabIndex={1}
                                    onClick={() => {
                                        router.push(router.asPath + entry.url)
                                    }}
                                >
                                    <Image
                                        src={entry.image.src}
                                        alt={entry.image.alt}
                                        height='300px'
                                        width='100%'
                                        objectFit='cover'
                                        borderRadius='10px'
                                        transition='0.3s'
                                        _hover={{
                                            borderRadius: '10px',
                                            transform: 'scale(1.2)',
                                            filter: 'brightness(50%)',
                                            transition: '0.3s',
                                            cursor: 'pointer'
                                        }}
                                    />
                                </Stack>
                                <Stack
                                    position='absolute'
                                    backgroundColor='#2f2f2f'
                                    color='#f8f8f8'
                                    padding='10px'
                                    left='0'
                                    top='3'
                                    width='75%'
                                    borderRadius='5px'
                                    border='1px solid #f8f8f8'
                                >
                                    <Text fontSize='20px' fontWeight={700}>
                                        {entry.title}
                                    </Text>
                                </Stack>
                                <Stack padding='10px'>
                                    <Text fontSize='18px' fontWeight={600}>Overview</Text>
                                    <Text>{entry.description}</Text>
                                    <Stack width='100%' alignItems='flex-end' paddingTop='10px'>
                                        <Button onClick={() => router.push(router.asPath + entry.url)}>
                                            View Database
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Stack>
                        </GridItem>
                    ))}
                </Grid>
            </Stack>
        </Stack>
    )
}