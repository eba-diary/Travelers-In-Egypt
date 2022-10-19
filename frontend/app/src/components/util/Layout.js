import Navbar from "./Navbar"
import Footer from './Footer'

export default function Layout({ children, index }) {
    return (
        <>
            <Navbar pageIndex={index} />
            {children}
            <Footer />
        </>
    )
}