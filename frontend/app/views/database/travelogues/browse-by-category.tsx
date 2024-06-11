import React, { useEffect, useMemo } from 'react';
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useTraveloguesFilter } from './hooks/use-travelogues-filter';
import { BLACK, COMPONENT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from '../../../components/styles.config';
import { useTravelogueData } from '../../../lib/database/global-hooks/use-travelogue-data';

interface BrowsePublicationsByCategoryProps {
	backgroundColor: "primary" | "secondary"
}

export const BrowsePublicationsByCategory: React.FC<BrowsePublicationsByCategoryProps> = ({ backgroundColor }) => {
	const { travelogeusData: originalTravelogues, isError, isLoading } = useTravelogueData();
	const { travelogues: filteredTravelogues, setTravelogues } = useTraveloguesFilter();

	useEffect(() => {
		const fetchData = async () => {
			setTravelogues(originalTravelogues);
		};
		fetchData();
	}, []);

	const categories = ['Title', 'Traveler', 'Decade'];

	const _backgroundColor = useMemo(() => (
		backgroundColor === "primary" ? SECONDARY_BG_COLOR : WHITE
	), [backgroundColor])

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
				<Box p={4}>
					<Heading as="h2" size="lg" mb={4}>
						Browse Publications by Category
					</Heading>
					<Text mb={4}>
						Immerse yourself in the collection by exploring through three curated pathways:
					</Text>
					<Stack spacing={2} mb={4}>
						<Text><strong>Title:</strong> Navigate through the travelogues alphabetically by their titles.</Text>
						<Text><strong>Traveler:</strong> Browse the collection organized by the authors or travelers themselves.</Text>
						<Text><strong>Decade:</strong> Browse the travelogues chronologically.</Text>
					</Stack>
					<Stack direction="row" spacing={4}>
						{categories.map((category) => (
							<Button key={category} backgroundColor={PRIMARY_BG_COLOR} color={BLACK}>{category}</Button>
						))}
					</Stack>

				</Box>
			</Stack>
		</Stack>
	);
};
