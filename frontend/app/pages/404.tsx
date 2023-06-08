import { Button, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Error() {
    const [height, setHeight] = useState<number>(0)
    const [seconds, setSeconds] = useState<number>(5)

    useEffect(() => {
        setHeight(window.innerHeight)
        const interval = setInterval(() => {
            setSeconds((prevSeconds: number) => {
                if (prevSeconds < 1) {
                    clearInterval(interval)
                    router.back()
                    return 0
                } else {
                    return prevSeconds - 1
                }
            })
        }, 1000)

        return () => clearInterval(interval)

    }, [])

    const router = useRouter()

    return (
        <Stack width='100%' height={`${height}px`} alignItems='center' justifyContent='center'>
            <Stack width='80%' alignItems='center'>
                <Text>
                    404 Page not found. Going home in {seconds} seconds
                </Text>
                <Button onClick={() => router.back()} width='fit-content'>Back</Button>
            </Stack>
        </Stack>
    )
}