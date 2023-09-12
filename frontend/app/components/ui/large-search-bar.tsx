import { Stack, Text, HStack, InputGroup, Input, InputRightElement, Button, Badge, UnorderedList, ListItem } from "@chakra-ui/react"
import Link from "next/link"
import { useState } from "react"
import useComponentHeight from "../../lib/hooks/useComponentHeight"
import { supabase } from "../../lib/supabase/client"
import { LargeSearchBarProps } from "../../lib/types"

interface Props {
    data: LargeSearchBarProps
}

export default function LargeSearchBar({ data } : Props) {
    const {ref, height} = useComponentHeight()
    const [value, setValue] = useState('')
    const [error, setError] = useState(false)
    const [showDescription, setShowDescription] = useState({ show: false, index: -1 })
    const [predictiveSearch, setPredictiveSearch] = useState<{ship_name: string}[]>([])

    const debounceHandleSearch = (searchTerm: string) => {
        const timer = setTimeout(() => {
            handleSearch(searchTerm)
        }, 500)

        return () => clearTimeout(timer)
    }

    const handleSearch = async (searchTerm: string) => {
        const { data, error } = await supabase
            .from('Ships')
            .select('ship_name')
            .filter('ship_name', 'ilike', `%${searchTerm}%`)
            .limit(6)

        const set = new Set(data)

        if (!error) {
            setPredictiveSearch(Array.from(set.values()))
        }
    }

    return (
        <HStack width='100%' height='400px' p='0px 25px' justifyContent='space-around'>
            <Stack
                flex={1}
                height={height}
                justifyContent='flex-start'
            >
                <Text fontSize='48px' color='#C58A22' textShadow='3px 3px #E3CAA9' fontWeight={700}>
                    {data.fields.title.toUpperCase()}
                </Text>
                <Text>
                    {data.fields.description}
                </Text>
            </Stack>
            <Stack
                flex={1}
                bgColor='#C58A22'
                width='100%'
                height='75%'
                borderRadius='5px'
                boxShadow='10px 10px #E3CAA9'
                ref={ref}
            >
                <Stack height='100%' p='20px'>
                    <InputGroup
                        onKeyDown={(event) => {
                            if (event.key == 'Enter') {
                                if (value.length <= 0) {
                                    setError(true)
                                } else {
                                    setError(false)
                                    setValue('')
                                }
                            }
                        }}

                        onChange={() => {
                            setError(false)
                        }}
                    >
                        <Input
                            bgColor='#FFF'
                            borderColor='#000'
                            focusBorderColor="#000"
                            _hover={{
                                borderColor: '#EEE'
                            }}
                            placeholder={'Ex: ' + data.fields.searchPlaceholder}
                            color='#000'
                            onChange={(event) => {
                                setValue(event.target.value)
                                debounceHandleSearch(event.target.value)
                            }}
                            value={value}
                        />
                        <InputRightElement width='75px'>
                            <Button
                                backgroundColor='#FFF'
                                height='80%'
                                width='90%'
                                onClick={() => {
                                    if (value.length <= 0) {
                                        setError(true)
                                    } else {
                                        setError(false)
                                        setValue('')
                                    }
                                }}
                            >
                                Search
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                    {predictiveSearch.length > 0 && value.length > 0 && (
                        <Stack position='absolute' backgroundColor='#FFF' padding='5px' borderRadius='5px'>
                            {predictiveSearch.map((entry, index) => (
                                <Text key={index}>
                                    {JSON.stringify(entry)}
                                </Text>
                            ))}
                        </Stack>
                    )}
                    {error && (
                        <Badge colorScheme='red' width='fit-content'>
                            Cannot submit empty query
                        </Badge>
                    )}
                    <Stack height='70%' justifyContent='space-between' padding='5px' color='#FFF' fontWeight={500}>
                        <Stack>
                            <Text>Already know which database you want to search?</Text>
                            <Text fontWeight={700}>Select one from below</Text>
                        </Stack>
                        <hr />
                        <HStack>
                            <UnorderedList width='fit-content' spacing='10px' flex={1}>
                                {data.fields.databases.map((entry, index) => (
                                    <Link href={`/database${entry.url}`} key={index}>
                                        <ListItem
                                            transition='0.3s'
                                            _hover={{ cursor: 'pointer' }}
                                            onMouseEnter={(event) => {
                                                setShowDescription({
                                                    show: true,
                                                    index: index
                                                })
                                            }}
                                            onMouseLeave={(event) => {
                                                setShowDescription({
                                                    show: false,
                                                    index: -1
                                                })
                                            }}
                                        >
                                            <Text fontWeight={700}>{entry.title}</Text>
                                        </ListItem>
                                    </Link>
                                ))}
                            </UnorderedList>
                            {showDescription.show && (
                                <Stack
                                    flex={1}
                                    height='100%'
                                    borderRadius='5px'
                                    backgroundColor='#f8c66c'
                                    textAlign='center'
                                    justifyContent='center'
                                    color='#000'
                                >
                                    <Text>{data.fields.databases[showDescription.index].title}</Text>
                                </Stack>
                            )}
                        </HStack>
                    </Stack>
                </Stack>
            </Stack>
        </HStack>
    )
}