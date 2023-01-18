import { Stack, Text } from '@chakra-ui/react'
import MarginStack from '../utils/MarginStack'
import FeaturedMember from './featured-member'

export default function AboutUs() {
    return (
        <MarginStack padding={{ lg: '35px', xl: '45px 0px 0px 75px' }}>
            <Stack width='100%' paddingTop='100px' >
                <Stack width='610px' height='64px' alignItems='flex-start' paddingLeft='50px' border='6px solid #F8C66C'>
                    <Text fontSize='96px' fontWeight={800} marginTop='-80px' color='#C58A22' textShadow='5px 5px #E3CAA9'>
                        {"ABOUT US"}
                    </Text>
                </Stack>
            </Stack>
            <FeaturedMember />
        </MarginStack>
    )
}