import { ListItem, Stack, Text, UnorderedList } from "@chakra-ui/react";
import Layout from "../../components/utils/Layout";
import MarginStack from "../../components/utils/MarginStack";
import Link from "next/link";


export default function DatabaseBrowser({ data }) {
    const links = data.map((entry) => {
        return entry.split('-').map(word => { return word[0].toUpperCase() + word.substring(1,) + ' ' })
    })
    return (
        <Layout index={-1}>
            <MarginStack>
                <Text fontSize='25px' fontWeight={700}>
                    Select a database to view
                </Text>
                <Stack pt='25px'>
                    <UnorderedList pl='5px'>
                        {data.map((entry, index) => {
                            return (
                                <ListItem key={index} pl='25px'>
                                    <Stack key={index} pb='25px'>
                                        <Link href={`database_browser/${entry}?page=1&display=10`}>
                                            <Text
                                                fontSize='18px'
                                                _hover={{
                                                    cursor: 'pointer',
                                                    color: '#C58A22',
                                                    transition: '0.3s'
                                                }}
                                                width='250px'
                                            >
                                                {links[index]} Database
                                            </Text>
                                        </Link>
                                    </Stack>
                                </ListItem>
                            )
                        })}
                    </UnorderedList>
                </Stack>
            </MarginStack>
        </Layout>
    )
}


export async function getStaticProps() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URI}/database_browser`)
    const data = await (res.json())
    return {
        props: { data: data }
    }
}