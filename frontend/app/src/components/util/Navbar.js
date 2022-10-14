import { HStack, Stack, Text, Hide, Show, Menu, MenuButton, IconButton, MenuList, Image } from '@chakra-ui/react'
import { FaHamburger } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { useState } from 'react'
import logo from '../../img/WebLogo.png';

export default function Navbar() {
    const navigationItems = ['Home', 'Artifacts Exhibition', ' Culture & Tradition', 'History', 'Contact', 'Support']

    const [pageIndex, setPageIndex] = useState(0)
    const navContent = navigationItems.map((entry, index) => {
        return (
            <Link to={`/${entry}`} key={index}>
                <Stack
                    padding={{ md: '0px 12px', lg: '0px 15px' }}
                    textAlign={{ base: 'left', md: 'center' }}
                    paddingLeft={{ base: '15px', md: '2px', lg: '10px', xl: '15px' }}
                    borderBottom={index === pageIndex ? '1px solid #000' : ''}
                >
                    <Text
                        fontWeight={700}
                        fontSize={{ sm: '16px', md: '13px', lg: '16px', xl: '18px' }}

                        padding={{ base: '10px 0px', md: '' }}
                        onMouseEnter={(event) => {
                            handleEvent(event, '-2')
                        }}
                        onMouseLeave={(event) => {
                            handleEvent(event, '2')
                        }}
                        onClick={() => {
                            setPageIndex(index)
                        }}
                    >
                        {entry.toUpperCase()}
                    </Text>
                </Stack>
            </Link>
        )
    })
    return (
        <HStack backgroundColor=''>
            <Stack
                width={{ base: '80px', md: '150px' }}
                marginLeft={{ base: '5px', md: '1px', lg: '20px' }}
                marginRight={{ base: '10px', md: '18px', lg: '35px' }}
                onMouseEnter={(event) => {
                    handleEvent(event, '-2')
                }}
                onMouseLeave={(event) => {
                    handleEvent(event, '2')
                }}
            >
                <Link to='/'>
                    <Image
                        alt='logo'
                        src={logo}
                        width={{ base: '100px', md: '150px' }}
                        height='100px'
                        objectFit={{ base: 'contain', md: 'contain' }}
                    />
                </Link>
            </Stack>
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
                            icon={<FaHamburger />}
                            backgroundColor='#FFF'
                            color='#8B0000'
                            _hover={{ backgroundColor: '#8B0000', color: '#FFF' }}
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
    )
}

function handleEvent(event, number) {
    event.currentTarget.style.cursor = 'pointer'
    event.currentTarget.style.transform = `translateY(${number}px)`
    event.currentTarget.style.transition = '0.3s'
}