import { useState, useEffect } from 'react';
import { useContentfulLanding } from '../useContentful'
import { Stack, Flex, Text, useColorModeValue, Circle} from "@chakra-ui/react";
import {IoTriangleSharp} from "react-icons/io5"

export default function Landing(props) {

    const { getFeaturedArticles } = useContentfulLanding()

    const [featuredArticles, setFeaturedArticles] = useState({
        articles: []
    })

    useEffect(() => {
        getFeaturedArticles().then(response => setFeaturedArticles({articles: response.items}))
    }, [])

    let boxBg = useColorModeValue("white", "white");
    const paddingBg = useColorModeValue("#C58A22", "white");
    const outerBoxStyles = {
        bgColor: '#F8C66C',
        borderTop: '40px solid white'
    }


    return (
        <Stack fluid>
        { featuredArticles.articles.map((entries, index) => {
                const sliderCards = entries.fields.sliderCards.map((entries, index) => {
                    return (
                        <Flex borderRadius='unset'
                        h='140px'
                        w='170px'
                        direction='column'
                        bg={boxBg}
                        alignItems='center'
                        justifyContent='center'
                        border='5px solid'
                        borderBottom='20px solid'
                        borderColor={paddingBg}
                        key={index} rowGap='20px'
                        columnGap='20px'
                        marginTop='-25px'
                        marginBottom='15px'
                        >
                            <Text> {entries.fields.title} </Text>
                            <Text> {entries.fields.description} </Text>
                         </Flex>
                    )
                })
                return (
                    <Flex key={index} 
                    rowGap='20px'
                    columnGap='20px' 
                    direction='row' 
                    sx={outerBoxStyles} 
                    justifyContent='center'
                    >
                        <Circle size='40px' bg='white' color='white' marginTop='45px' border='5px solid' borderColor={paddingBg}>
                            <Stack transform='rotate(270deg)' size='20px'>
                                <IoTriangleSharp color={paddingBg} transform='rotate(270deg)'></IoTriangleSharp>
                            </Stack>
                        </Circle>
                        { sliderCards }
                        <Circle size='40px' bg='white' color='white' marginTop='45px' border='5px solid' borderColor={paddingBg}>
                            <Stack transform='rotate(90deg)' size='20px'>
                                <IoTriangleSharp color={paddingBg}></IoTriangleSharp>
                            </Stack>
                        </Circle>
                        </Flex>
                    )})
            }
        </Stack>
    )

}