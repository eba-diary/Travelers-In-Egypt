import Navbar from "./Navbar"
import Footer from './Footer'
import { Stack } from "@chakra-ui/react"
import { useEffect } from "react"
import { getNavbar } from "../../lib/getPageInfo/getNavbar"
import { useDispatch, useSelector } from "react-redux"
import { createNavbar } from "../../lib/redux/slice/preSlice"

export default function Layout({ children, index }) {
    const dispatch = useDispatch()
    const pre = useSelector((state) => state.pre)

    useEffect(() => {
        const preLoad = async () => {
            const navBar = await getNavbar()
            dispatch(createNavbar(navBar))
        }

        preLoad()

    }, [])

    const preLoadProps = {
        index,
        pre
    }

    return (
        <Stack minHeight='100vh'>
            {/* <Navbar pageIndex={index} navbar={navbar}/> */}
            <Navbar {...preLoadProps} />
            <Stack paddingBottom='300px'>
                {children}
            </Stack>
            <Footer />
        </Stack>
    )
}