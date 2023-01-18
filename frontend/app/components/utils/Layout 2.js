import Navbar from "./Navbar"
import Footer from './Footer'
import { Stack } from "@chakra-ui/react"

export default function Layout({ children, index }) {
    return (
        <Stack minHeight='100vh'>
            <Navbar pageIndex={index} />
            <Stack paddingBottom='300px'>
                {children}
            </Stack>
            <Footer />
        </Stack>
    )
}