// components/FundingSupport.tsx
import React from 'react';
import { Box, Text, Grid, GridItem, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { useFundingSupport } from './hooks/use-funding-and-support';
import { isLoadingOrError } from '../../lib/hooks/utils';

const FundingSupport = () => {
	const { data, ...loadingOrError } = useFundingSupport();

	if (isLoadingOrError(loadingOrError)) {
		return <div></div>
	}

	return (
		<Box>
			<Text fontSize="2xl" fontWeight="bold">Funding and Support</Text>
			<Text mb={4}>
				Our projects, faculty and students have received funding awards and stipends from the following organizations for project expenses, training and travel:
			</Text>
			<Grid templateColumns="repeat(auto-fit, minmax(150px, 1fr))" gap={6}>
				{data.map((item) => (
					<GridItem key={item.id} borderWidth="1px" borderRadius="lg" p={4} display="flex" justifyContent="center" alignItems="center">
						<Text>{item.name}</Text>
						<Text fontSize="sm">Image here</Text>
					</GridItem>
				))}
			</Grid>
		</Box>
	);
};

export default FundingSupport;
