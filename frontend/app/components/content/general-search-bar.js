import { Stack, HStack, Text, Input, InputGroup, InputRightElement, Button, Badge } from "@chakra-ui/react";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useRouter } from 'next/router'
import { useState } from "react";
import CmsTester from "../utils/CmsTester";
import MarginStack from "../utils/MarginStack";

export default function GeneralSearchBar({ searchBar }) {
    const [inputValue, setInputValue] = useState('')
    const [validInput, setValidInput] = useState(true)
    const router = useRouter()

    const text = documentToHtmlString(searchBar.description).split('<ul>')
    let links = text[1].split(/(?<=<\/li>)/)
    links.pop()

    return (
        <MarginStack>
            {/* <CmsTester props={inputValue} /> */}
            <HStack width='100%' height='400px' p='0px 25px' justifyContent='space-around'>
                <Stack flex={1}>
                    <Text fontSize='72px' color='#C58A22' textShadow='5px 5px #E3CAA9' fontWeight={700}>
                        {searchBar.title.toUpperCase()}
                    </Text>
                </Stack>
                <Stack flex={1} bgColor='#C58A22' width='100%' height='75%' borderRadius='12px' boxShadow='20px 20px #E3CAA9'>
                    <Stack height='100%' p='20px'>
                        <InputGroup
                            onMouseLeave={() => {
                                setValidInput(true)
                            }}
                            onMouseEnter={() => {
                                setValidInput(inputValue.length > 0 ? true : false)
                            }}
                        >
                            <Input
                                bgColor='#FFF'
                                borderColor='#000'
                                focusBorderColor="#000"
                                _hover={{
                                    borderColor: '#EEE'
                                }}
                                placeholder={searchBar.searchBarPlaceHolder}
                                color='#000'
                                onChange={(event) => {
                                    setInputValue(event.currentTarget.value)
                                    if (event.currentTarget.value.length < 1) {
                                        setValidInput(false)
                                    } else {
                                        setValidInput(true)
                                    }
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter') {
                                        router.push(`/database_browser/${inputValue}`)
                                    }
                                }}
                            />
                            <InputRightElement width='75px'>
                                <Button
                                    backgroundColor='#FFF'
                                    height='80%'
                                    width='90%'
                                    isDisabled={inputValue.length > 0 ? false : true}
                                    onClick={() => {
                                        router.push(`/database_browser/${inputValue}`)
                                    }}
                                >
                                    Search
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        {!validInput && (
                            <Badge colorScheme='red' width='170px'>
                                Query cannot be empty
                            </Badge>
                        )}
                        <Stack fontSize='lg' fontWeight={400} pt={validInput ? '26px' : '0px'}>
                            <Text color='#FFF' pl='20px' pb='10px' dangerouslySetInnerHTML={{ __html: text[0] }} />
                        </Stack>
                        <Stack>
                            <ul>
                                {links.map((entry, index) => {
                                    return (
                                        <Stack p='5px'>
                                            <Text
                                                key={index}
                                                color='#FFF'
                                                pl='40px'
                                                dangerouslySetInnerHTML={{ __html: entry }}
                                                _hover={{
                                                    color: '#FBE2B5',
                                                    transition: '0.2s'
                                                }}
                                            />
                                        </Stack>
                                    )
                                })}
                            </ul>
                        </Stack>
                    </Stack>
                </Stack>
            </HStack>
        </MarginStack>
    )
}