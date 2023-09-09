import { Stack, HStack, Text, Image, Circle } from "@chakra-ui/react"
import useComponentResizeHeight from "../../lib/hooks/useComponentResizeHeight"
import useComponentWidth from "../../lib/hooks/useComponentWidth"
import Collapse from "./references/collapse"

export default function GeneralInformation({ data }) {
    const [widthRef, width] = useComponentWidth()
    const [heightRef, height, test] = useComponentResizeHeight()
    const titleBorderColor = data.fields.titleBorderColor;
    const titleShadowColor = data.fields.titleShadowColor;
    const titleColor = data.fields.titleColor;
    const directorBottomBorderColor = data.fields.directorBottomBorderColor;
    const imageShadowColor = data.fields.imageShadowColor;

    return (
        <Stack width='100%' alignItems='center' padding='50px 0px' gap='20px'>
            <Stack width='90%' gap='20px'>
                <Stack
                    width={`${width + 150}px`}
                    height='50px'
                    border={`4px solid ${titleBorderColor}`}
                    alignItems='flex-start'
                >
                    <Text
                        ref={widthRef}
                        fontSize='64px'
                        fontWeight={800}
                        color={titleColor}
                        textShadow={`5px 5px ${titleShadowColor}`}
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
                        borderBottom={`3px solid ${directorBottomBorderColor}`}
                    >
                        {data.fields.director.directorName} <span style={{ color: '#888' }}>&#40;Principle Investigator&#41;</span>
                    </Text>
                    <HStack width='90%'>
                        <Circle width='150px' height='150px' backgroundColor='#EEE' overflow='hidden'>
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
                            shadow={`5px 5px 0px 1px ${imageShadowColor}`}
                        />
                    </Stack>
                </HStack>
            </Stack>
        </Stack>
    )
}