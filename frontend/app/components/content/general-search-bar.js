import { Stack, HStack, Text, Input, InputGroup, InputRightElement, Button, Badge, UnorderedList, ListItem, filter, list, Select, Code } from "@chakra-ui/react";
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useRouter } from 'next/router'
import { useEffect } from "react";
import { useState, useRef } from "react";
import useOnClickOutside from "../../lib/useOnClickOutside";
import CmsTester from "../utils/CmsTester";
import MarginStack from "../utils/MarginStack";
import axios from "axios";

export default function GeneralSearchBar({ searchBar }) {
    const [inputValue, setInputValue] = useState('')
    const [validInput, setValidInput] = useState(true)
    const [filteredValues, setFilteredValues] = useState([])
    const [show, setShow] = useState(false)
    const [cursor, setCursor] = useState(-1)


    useEffect(() => {
        const item = localStorage.getItem(`${inputValue}Suggestion`)
        if (!item) {
            axios.post(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/api/data/${inputValue}`).then((res) => {
                return res.data
            }).then((json) => {
                if (json.length > 0) {
                    localStorage.setItem(`${inputValue}Suggestion`, json)
                    setFilteredValues(json.slice(0, 5))
                }
            })
        } else if (localStorage.getItem(`${inputValue}Suggestion`) !== null) {
            setFilteredValues(item.split(',').slice(0, 5))
        }
        setTimeout(() => {
            const keys = Object.keys(localStorage)
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                localStorage.removeItem(key);
            }
        }, 1000 * 60 * 5)
    }, [inputValue])

    const autocompleteRef = useRef()
    useOnClickOutside(autocompleteRef, () => setShow(false))

    const router = useRouter()

    const text = documentToHtmlString(searchBar.description).split('<ul>')
    let links = text[1].split(/(?<=<\/li>)/)
    links.pop()

    const handleFocus = () => { setShow(true) }

    const handleChange = (event) => {
        if (localStorage.getItem(`${inputValue}Suggestion`) !== null) {
            const option = localStorage.getItem(`${inputValue}Suggestion`).split(',')
            const filteredOptions = option.filter((option) =>
                option.toLowerCase().startsWith(event.target.value.toLowerCase())
            )
            setFilteredValues(filteredOptions.slice(0, 5));
        } else {
            setFilteredValues([])
        }
    };

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
                            onFocus={handleFocus}
                            position='relative'
                        >
                            <Input
                                bgColor='#FFF'
                                borderColor='#000'
                                focusBorderColor="#000"
                                ref={autocompleteRef}
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
                                    handleChange(event)
                                    setCursor(-1)
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' && validInput) {
                                        if (cursor < 0) {
                                            router.push(`/database_browser/search?query=${inputValue}&page=1&display=10`)
                                        } else {
                                            router.push(`/database_browser/search?query=${filteredValues[cursor]}&page=1&display=10`)
                                            setInputValue(filteredValues[cursor])
                                        }
                                        localStorage.clear()
                                    }
                                    if (event.key === 'ArrowDown') {
                                        if (cursor < filteredValues.length - 1) {
                                            setCursor(cursor + 1)
                                        } else {
                                            setCursor(0)
                                        }
                                    } else if (event.key === 'ArrowUp') {
                                        if (cursor <= 0) {
                                            setCursor(filteredValues.length - 1)
                                        } else {
                                            setCursor(cursor - 1)
                                        }
                                    }
                                }}
                                value={inputValue}
                            />
                            <InputRightElement width='75px'>
                                <Button
                                    backgroundColor='#FFF'
                                    height='80%'
                                    width='90%'
                                    isDisabled={inputValue.length > 0 ? false : true}
                                    onClick={() => {
                                        setShow(false)
                                        router.push(`/database_browser/search?query=${inputValue}&page=1&display=10`)
                                        localStorage.clear()
                                    }}
                                >
                                    Search
                                </Button>
                            </InputRightElement>
                            <Stack
                                top='50px'
                                position='absolute'
                                bgColor='#FFF'
                                borderRadius='5px'
                                border='1px solid #EEE'
                                width='100%'
                                ref={autocompleteRef}
                                visibility={show && inputValue.length > 0 ? 'visible' : 'hidden'}
                                onClick={() => { setShow(false) }}
                            >
                                {filteredValues.length > 0 && (
                                    <UnorderedList
                                        padding='5px'
                                        bgColor='#FFF'
                                        marginLeft='0'
                                    >
                                        {filteredValues.map((option, index) => (
                                            <ListItem
                                                key={index}
                                                style={{ listStyle: 'none' }}
                                                _hover={{ bgColor: '#EEE', cursor: 'pointer' }}
                                                bgColor={cursor === index ? '#EEE' : '#FFF'}
                                                padding='2px'
                                                onClick={() => {
                                                    setInputValue(filteredValues[index] + "")
                                                    router.push(`/database_browser/search?query=${option}&page=1&display=10`)
                                                    localStorage.clear()
                                                }}
                                            >
                                                <HStack>
                                                    <Text>
                                                        {option}
                                                    </Text>
                                                </HStack>
                                            </ListItem>
                                        ))}
                                    </UnorderedList>
                                )}
                            </Stack>
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
                                        <Stack p='5px' key={index}>
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
            </HStack >
        </MarginStack >
    )
}