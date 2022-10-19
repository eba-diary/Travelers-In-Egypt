import { Stack } from "@chakra-ui/react"

export default function MarginStack({ children }) {
    return (
        <Stack
            paddingLeft='20px'
            paddingRight='20px'
        >
            {children}
        </Stack>
    )
}