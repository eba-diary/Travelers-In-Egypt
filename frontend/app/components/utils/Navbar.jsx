import { HStack, Stack, Text, Hide, Show, Menu, MenuButton, IconButton, MenuList } from '@chakra-ui/react'
import { GiHamburgerMenu } from 'react-icons/gi'
import navItems from '../tempData/navItems.json'
import logo from '../../public/WebLogo.png';
import MarginStack from './MarginStack';
import Image from 'next/image'
import Link from 'next/link'

export default function Navbar({ pageIndex }) {

    const navContent = navItems.map((entry, index) => {
        return (
            <Link href={`${entry.url}`} key={index}>
                <Stack
                    padding={{ md: '0px 12px', lg: '0px 15px' }}
                    textAlign={{ base: 'left', md: 'center' }}
                    paddingLeft={{ base: '15px', md: '2px', lg: '10px', xl: '15px' }}
                    border={{
                        base: index === pageIndex ? '2px solid #C58A22' : '',
                        md: '0px'
                    }}
                    borderBottom={{
                        base: '',
                        md: index === pageIndex ? '3px solid #C58A22' : '0px'
                    }}
                >
                    <Text
                        fontWeight={700}
                        fontSize={{
                            sm: '16px', md: '11px', lg: '14px', xl: '18px'
                        }}
                        onMouseEnter={(event) => {
                            handleEvent(event, '-2')
                        }}
                        onMouseLeave={(event) => {
                            handleEvent(event, '2')
                        }}
                        paddingBottom={index === pageIndex ? '5px' : '8px'}
                    >
                        {entry.title.toUpperCase()}
                    </Text>
                </Stack>
            </Link>
        )
    })
    return (
        <MarginStack>
            <HStack backgroundColor='#FFF' alignItems='center' height='120px'>
                <Link href='/'>
                    <Stack
                        width={{ base: '300px', md: '150px' }}
                        height='80px'
                        justifyContent='flex-start'
                        marginLeft={{ base: '5px', md: '1px', lg: '20px' }}
                        marginRight={{ base: '10px', md: '18px', lg: '35px' }}
                        onMouseEnter={(event) => {
                            handleEvent(event, '-2')
                        }}
                        onMouseLeave={(event) => {
                            handleEvent(event, '2')
                        }}
                    >
                        <Image
                            alt='logo'
                            src={logo}
                            width={1}
                            height={1}
                            layout='responsive'
                            objectFit='contain'
                        />
                    </Stack>
                </Link>
                <Hide below='md'>
                    <HStack height='70px' alignItems='center'>
                        {navContent}
                    </HStack>
                </Hide>
                <Show below='md'>
                    <HStack justifyContent='flex-end' width='100%'>
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                arial-label='Options'
                                icon={<GiHamburgerMenu />}
                                backgroundColor='#FFF'
                                color='#D08800'
                                _hover={{ backgroundColor: '#D08800', color: '#FFF' }}
                                variant='outline'
                            />
                            <MenuList
                                padding='20px'
                                backgroundColor='#FFF'
                            >
                                {navContent}
                            </MenuList>
                        </Menu>
                    </HStack>
                </Show>
            </HStack>
        </MarginStack>
    )
}

function handleEvent(event, number) {
    event.currentTarget.style.cursor = 'pointer'
    event.currentTarget.style.transform = `translateY(${number}px)`
    event.currentTarget.style.transition = '0.3s'
}