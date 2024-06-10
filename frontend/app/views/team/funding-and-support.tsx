// components/FundingSupport.tsx
import React, { useMemo } from 'react';
import { Box, Text, Grid, GridItem, Spinner, Alert, AlertIcon, Stack } from '@chakra-ui/react';
import { useFundingSupport } from './hooks/use-funding-and-support';
import { isLoadingOrError } from '../../lib/hooks/utils';
import { COMPONENT_PADDING, DEFAULT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from '../../components/styles.config';

interface FundingSupportProps {
	backgroundColor: "primary" | "secondary"
}

const FundingSupport = ({
	backgroundColor
}: FundingSupportProps) => {
	const { data, ...loadingOrError } = useFundingSupport();

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
				<Text fontSize="2xl" fontWeight="bold">Funding and Support</Text>
				<Text mb={4}>
					Our projects, faculty and students have received funding awards and stipends from the following organizations for project expenses, training and travel:
				</Text>
				<Grid templateColumns="repeat(4, 1fr)" gap={6} backgroundColor={PRIMARY_BG_COLOR} p={8}>
					{data.map((item) => (
						<GridItem
							key={item.id}
							border="1px solid #000"
							borderRadius="lg" p={4}
							display="flex"
							justifyContent="center"
							alignItems="center"
							gap={4}
						>
							<Text>{item.name}</Text>
							<Text fontSize="sm">Image here</Text>
						</GridItem>
					))}
				</Grid>
			</Stack>
		</Stack>
	);
};

export default FundingSupport;
