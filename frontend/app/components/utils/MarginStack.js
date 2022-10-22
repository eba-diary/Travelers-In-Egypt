import { Stack } from "@chakra-ui/react"

export default function MarginStack(
    { children, padding, p }
) {

    const everything = padding ? padding : (p ? p : '0px 20px')

    return (
        <Stack

            padding={everything}
        >
            {children}
        </Stack>
    )
}