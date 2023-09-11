import { Stack, HStack, Text, Image, Circle } from "@chakra-ui/react"
import useComponentResizeHeight from "../../lib/hooks/useComponentResizeHeight"
import useComponentWidth from "../../lib/hooks/useComponentWidth"
import { GeneralInformationProps } from "../../lib/types"
import Collapse from "./references/collapse"

interface Props {
    data: GeneralInformationProps
}

export default function GeneralInformation( {data} : Props) {
    const {ref, width} = useComponentWidth()
    const [heightRef, height, test] = useComponentResizeHeight()

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
                        ref={ref}
                        fontSize='64px'
                        fontWeight={800}
                        color='#C58A22'
                        textShadow='5px 5px #E3CAA9'
                        marginTop='-50px'
                        width='fit-content'
                    >
                        {data.fields.title.toUpperCase()}
                    </Text>
                </Stack>
                <Stack gap='5px'>
                    <Text
                        fontSize='lg'
                        fontWeight={500}
                        padding='10px'
                        width={`${width + 150}px`}
                        borderBottom='3px solid #C58A22'
                    >
                        {data.fields.director.directorName} <span style={{ color: '#888' }}>&#40;Principle Investigator&#41;</span>
                    </Text>
                    <HStack width='90%'>
                        <Circle size='150px' backgroundColor='#EEE' overflow='hidden'>
                            <Image
                                src={data.fields.director.directorImage.src}
                                alt={data.fields.director.directorImage.alt}
                                objectFit='contain'
                                width='100px'
                                height='100px'
                            />
                        </Circle>
                        <Text paddingLeft='25px'>
                            {data.fields.director.directorDescription}
                        </Text>
                    </HStack>
                </Stack>
                <HStack width='100%' justifyContent='space-between'>
                    <Stack width='60%'>
                        {/* Type is not within scope of GeneralInformationProps */}
                        <Collapse data={data.fields.section} type={'general-information'} />
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