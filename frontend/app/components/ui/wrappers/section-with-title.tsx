import { Heading, Stack } from "@chakra-ui/react"

interface SectionWithTitleProps {
	title: string,
	children: React.ReactNode
}

export const SectionWithTitle = ({
	title,
	children
}: SectionWithTitleProps) => {
	return (
		<Stack w="100%">
			<Heading pl="90px">
				{title}
			</Heading>
			{children}
		</Stack>
	)
}