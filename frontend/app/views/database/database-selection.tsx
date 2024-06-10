import { Box, Text, Grid, GridItem, Stack, HStack, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";
import { BLACK, BORDER_RADIUS, COMPONENT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from "../../components/styles.config";
import { isLoadingOrError } from "../../lib/hooks/utils";
import { Database, useDatabase } from "./hooks/use-database"

interface DatabaseSelectProps {
	backgroundColor: "primary" | 'secondary'
}
export const DatabaseSelect = ({
	backgroundColor
}: DatabaseSelectProps) => {
	const { data, ...loadingOrError } = useDatabase();

	const _backgroundColor = useMemo(() => (
		backgroundColor === "primary" ? SECONDARY_BG_COLOR : WHITE
	), [backgroundColor])

	if (isLoadingOrError(loadingOrError)) {
		return <div></div>
	}

	return (
		<Stack
			width="100%"
			backgroundColor={_backgroundColor}
			padding={COMPONENT_PADDING}
			alignItems="center"
		>
			<Stack
				width={{ base: "full", md: "3xl", lg: "4xl", xl: "7xl" }}
			>
				<Text fontSize="2xl" fontWeight="bold">Our Databases</Text>
				<Grid templateColumns="repeat(1fr)" gap={6}>
					{data.map(database => (
						<DatabaseCard {...database} />
					))}
				</Grid>
			</Stack>
		</Stack>
	);
}

const DatabaseCard: FC<Database> = ({
	description,
	id,
	name,
	url
}) => {
	const router = useRouter();
	return (
		<GridItem
			key={id}
			borderWidth="1px"
			borderRadius="lg"
			p={4}
			bg={PRIMARY_BG_COLOR}
			display="flex"
			flexDir="column"
			gap={4}
		>
			<HStack
				backgroundColor={BLACK}
				color={WHITE}
				width="fit-content"
				borderRadius={BORDER_RADIUS}
				onClick={() => {
					router.push(url)
				}}
				_hover={{
					cursor: "pointer"
				}}
			>
				<Text
					fontSize="x-large"
					fontWeight="bold"
					borderRadius={BORDER_RADIUS}
					px={4}
					py={2}
				>
					{name}
				</Text>
				<IconButton
					aria-label={`View ${name} database`}
					icon={<FaArrowRight color={WHITE} />}
					backgroundColor="transparent"
					px={6}
					_hover={{
						backgroundColor: "transparent"
					}}
				/>
			</HStack>
			<Stack w="50%">
				<Text
					backgroundColor={WHITE}
					color={BLACK}
					borderRadius={BORDER_RADIUS}
					px={8}
					py={2}
					whiteSpace="pre-line"
				>
					{description}
				</Text>
			</Stack>
		</GridItem>
	)
}