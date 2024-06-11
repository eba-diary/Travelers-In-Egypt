import React, { useMemo } from 'react';
import { Box, Heading, Input, Button, Stack, Text } from '@chakra-ui/react';
import { BLACK, COMPONENT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from '../../../components/styles.config';

interface BrowsePublicationsByCategoryProps {
	backgroundColor: "primary" | "secondary"
}


export const BrowsePublicationsBySearch: React.FC<BrowsePublicationsByCategoryProps> = ({ backgroundColor }) => {

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
						Browse Publications by Search
					</Heading>
					<Text mb={4}>
						For targeted inquiries, leverage the robust search feature to pinpoint relevant information across the entire database.
					</Text>
					<Stack direction="row" spacing={4} alignItems="center">
						<Input placeholder="Search by Title, Traveler, Year, etc." />
						<Button backgroundColor={PRIMARY_BG_COLOR} color={BLACK}>Search</Button>
						<Button variant="outline">Advanced Search</Button>
					</Stack>
				</Box>
			</Stack>
		</Stack>
	);
};
