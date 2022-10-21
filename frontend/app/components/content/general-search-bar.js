import { Stack, HStack, Text, Input } from "@chakra-ui/react";
import CmsTester from "../utils/CmsTester";
import MarginStack from "../utils/MarginStack";

export default function GeneralSearchBar({ searchBar }) {
    return (
        <MarginStack>
            <CmsTester props={searchBar} />
            <HStack width='100%' height='300px'>
                <Stack flex={1}>
                    <Text fontSize='60px'>
                        {searchBar.title}
                    </Text>
                </Stack>
                <Stack flex={1} bgColor='#C58A22' width='100%' height='80%'>
                    <Stack bgColor='#C58A22' height='80%' p='20px'>
                        <Input
                            bgColor='#FFF'
                            borderColor='#000'
                            focusBorderColor="#000"
                            _hover={{
                                borderColor: '#EEE'
                            }}
                            placeholder={searchBar.searchBarPlaceHolder}
                            color='#000'
                        />
                    </Stack>
                    <div dangerouslySetInnerHTML={{ __html: searchBar.description }} />
                </Stack>
            </HStack>
        </MarginStack>
    )
}