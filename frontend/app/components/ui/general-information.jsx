import { Stack, HStack, Text, Image, Circle, useMediaQuery } from "@chakra-ui/react"
import useComponentWidth from "../../lib/hooks/useComponentWidth"
import Collapse from "./references/collapse"

export default function GeneralInformation({ data }) {
    const [widthRef, width] = useComponentWidth()

    const isMediumOrLarger = useMediaQuery("(min-width: 768px)")[0];

    return (
        <Stack width='100%' alignItems='center' padding='50px 0px' gap='20px'>
            <Stack width='90%' gap='20px'>
                <Stack
                    width={`${width + 150}px`}
                    height='50px'
                    border='4px solid #F8C66C'
                    alignItems='flex-start'
                >
                    <Text
                        ref={widthRef}
                        fontSize={{ base: '32px', sm: '48px', md: '54px', lg: '64px' }}
                        fontWeight={800}
                        color='#C58A22'
                        textShadow='5px 5px #E3CAA9'
                        marginTop={{ base: '-35px', sm: '-40px', md: '-45px', lg: '-50px' }}
                        width='fit-content'
                    >
                        {data.fields.title.toUpperCase()}
                    </Text>
                </Stack>
                <Stack gap='5px'>
                    <HStack>
                        {!isMediumOrLarger && (
                            <Circle width='150px' height='150px' backgroundColor='#EEE' overflow='hidden' float='left'>
                                <Image
                                    src={data.fields.director.directorImage.src}
                                    alt={data.fields.director.directorImage.alt}
                                    objectFit='contain'
                                    width='100px'
                                    height='100px'
                                />
                            </Circle>
                        )}
                        <Text
                            fontSize={{ base: '16px', md: '18px', lg: '20px' }}
                            fontWeight={500}
                            padding='10px'
                            width={`${width + 150}px`}
                            borderBottom='3px solid #C58A22'
                        >
                            {data.fields.director.directorName} <span style={{ color: '#888' }}>&#40;Principle Investigator&#41;</span>
                        </Text>
                    </HStack>
                    <HStack width='90%'>
                        {isMediumOrLarger && (
                            <Circle width='150px' height='150px' backgroundColor='#EEE' overflow='hidden' float='left'>
                                <Image
                                    src={data.fields.director.directorImage.src}
                                    alt={data.fields.director.directorImage.alt}
                                    objectFit='contain'
                                    width='100px'
                                    height='100px'
                                />
                            </Circle>
                        )}
                        <Text paddingLeft='25px' fontSize={{ base: '14px', md: '16px' }}>
                            {data.fields.director.directorDescription}
                        </Text>
                    </HStack>
                </Stack>
                <HStack width='100%' justifyContent='space-between'>
                    <Stack width='60%'>
                        <Collapse data={data.fields.section} type={data.type} />
                    </Stack>
                    <Stack width='30%' justifyContent='center'>
                        <Image
                            src={data.fields.sectionImage.src}
                            alt={data.fields.sectionImage.alt}
                            height='275px'
                            width='300px'
                            objectFit='cover'
                            borderRadius='5px'
                            shadow='5px 5px 0px 1px #C58A22'
                        />
                    </Stack>
                </HStack>
            </Stack>
        </Stack>
    )
}