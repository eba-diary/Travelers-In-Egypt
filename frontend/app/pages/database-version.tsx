import { Button, Stack, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import usePageNumber from "../lib/hooks/usePageNumber";


export default function Database() {
	usePageNumber(1)
	const [viewportHeight, setViewportHeight] = useState(0)
	const router = useRouter()

	useEffect(() => {
		setViewportHeight(window.innerHeight)
	}, [])

	return (
		<Stack width='100%' height={`${viewportHeight / 1.5}px`} alignItems='center' justifyContent='center'>
			<Text fontSize='18px' fontWeight={600}>
				Database version:
			</Text>
			<Text fontSize='48px' fontWeight={800}>
				V1
			</Text>
			<Button
				onClick={() => {
					router.push("database/v1")
				}}
			>
				View databases
			</Button>
		</Stack>
	)
}