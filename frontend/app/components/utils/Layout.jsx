import Navbar from "./Navbar"
import Footer from './Footer'
import { Stack, Text } from "@chakra-ui/react"
import { getNavbar } from "../../lib/getPageInfo/getNavbar"
import { useDispatch, useSelector } from "react-redux"
import { createNavbar } from "../../lib/redux/slice/preSlice"
import { useQueryClient, useQuery, useHydrate } from '@tanstack/react-query'

export default function Layout({ children }) {
    const dispatch = useDispatch()
    const index = useSelector((state) => state.pre.index)

    const queryClient = useQueryClient()
    const oneHour = 60 * 60 * 1000

    useHydrate(queryClient)

    const { isLoading, isError, data, error, refetch } = useQuery({
        queryKey: ['navbar'],
        queryFn: async () => {
            const navBar = (await getNavbar())
            dispatch(createNavbar(navBar))
            return navBar
        },
        retry: 5,
        staleTime: oneHour,
        refetchInterval: oneHour + 5000
    })

    const preLoadProps = {
        index,
        pre: data
    }

    return (
        <Stack minHeight='100vh'>
            {!isLoading && (
                <Navbar {...preLoadProps} />
            )}
            {isError && (
                <Text>{error}</Text>
            )}
            <Stack paddingBottom='300px'>
                {children}
            </Stack>
            <Footer />
        </Stack>
    )
}