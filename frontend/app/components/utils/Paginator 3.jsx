import { Stack, HStack, Text, UnorderedList, ListItem, IconButton } from "@chakra-ui/react"
import Link from "next/link"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

export default function Paginator({ dataLength, page, display, setResults }) {
    const goBackFormula = parseInt(page) - 1 > 0 ? parseInt(page) - 1 : Math.floor(dataLength / display) + 1
    const goForwardFormula = parseInt(page) + 1 < dataLength / display + 1 ? parseInt(page) + 1 : 1

    return (
        <nav role='navigation' aria-label='Pagination Navigation'>
            <UnorderedList display='inline-block'>
                <HStack>
                    <ListItem listStyleType='none'>
                        <Link href={`nile-travelogues?page=${goBackFormula}&display=${display}`}>
                            <IconButton
                                icon={<FaArrowLeft />}
                                aria-label={`go from page ${page} to ${goBackFormula}`}
                                backgroundColor='#FFF'
                                onClick={() => {
                                    setResults({
                                        page: goBackFormula,
                                        display: display,
                                        pageStart: (goBackFormula * display)
                                    })
                                }}
                            />
                        </Link>
                    </ListItem>
                    {Array.apply(null, Array(Math.round(dataLength / display) + 1)).map((_, i) => { return i }).map((entry, index) => {
                        return (
                            <ListItem listStyleType='none'>
                                <Link href={`nile-travelogues?page=${entry + 1}&display=${display}`}>
                                    <Stack
                                        key={index}
                                        h='25px'
                                        w='25px'
                                        borderRadius='5px'
                                        border='1px solid #EEE'
                                        justifyContent='center'
                                        _hover={{
                                            cursor: 'pointer',
                                            color: '#FFF',
                                            backgroundColor: '#C58A22',
                                            transition: '0.3s'
                                        }}
                                        aria-current='true'
                                        backgroundColor={parseInt(page) === entry + 1 ? '#C58A22' : '#FFF'}
                                        color={parseInt(page) === entry + 1 ? '#FFF' : '#000'}
                                        onClick={() => {
                                            setResults({
                                                page: parseInt(entry),
                                                display: parseInt(display),
                                                pageStart: parseInt((page - 1) * display)
                                            })
                                        }}
                                    >
                                        <Text textAlign='center'>
                                            {entry + 1}
                                        </Text>
                                    </Stack>
                                </Link>
                            </ListItem>
                        )
                    })}
                    <ListItem listStyleType='none'>
                        <Link href={`nile-travelogues?page=${goForwardFormula}&display=${display}`}>
                            <IconButton
                                icon={<FaArrowRight />}
                                aria-label={`go from page ${page} to ${goForwardFormula}`}
                                backgroundColor='#FFF'
                                onClick={() => {
                                    setResults({
                                        page: goForwardFormula,
                                        display: display,
                                        pageStart: ((goForwardFormula) - 1) * display
                                    })
                                }}
                            />
                        </Link>
                    </ListItem>
                </HStack>
            </UnorderedList>
        </nav>
    )
}