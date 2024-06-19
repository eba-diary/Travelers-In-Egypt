import React, { useEffect, useMemo } from 'react';
import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useTraveloguesFilter } from './hooks/use-travelogues-filter';
import { BLACK, COMPONENT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from '../../../components/styles.config';
import { useTravelogueData } from '../../../lib/database/global-hooks/use-travelogue-data';
import { useForm } from 'react-hook-form';
import FormFieldWrapper from '../../../components/form';

export type Category = "Title" | "Traveler" | "Decade";
export interface CategoryFilter {
	name: Category,
	method: "asc" | "desc" | "none"
}
interface BrowsePublicationsByCategoryProps {
	backgroundColor: "primary" | "secondary",
	categories: CategoryFilter[],
	afterSubmit?: () => void
}

export interface FormDataByCategory {
	category: CategoryFilter,
	term: string
}

export const BrowsePublicationsByCategory: React.FC<BrowsePublicationsByCategoryProps> = ({
	backgroundColor,
	categories,
	afterSubmit
}) => {
	const { travelogeusData: originalTravelogues, isError, isLoading } = useTravelogueData();
	const { setTravelogues } = useTraveloguesFilter();

	useEffect(() => {
		const fetchData = async () => {
			setTravelogues(originalTravelogues);
		};
		fetchData();
	}, []);

	const defaultValues = {
		category: {
			name: null,
			method: "none" as const
		}
	}

	const methods = useForm<FormDataByCategory>({
		mode: "onBlur",
		defaultValues
	})

	const {
		control,
		watch,
		setValue
	} = methods

	const watchCategory = watch("category")
	const { setFilter } = useTraveloguesFilter();

	useEffect(() => {
		if (watchCategory) {
			setFilter((prev) => ({
				...prev,
				category: watchCategory
			}))
		}
	}, [control, watch, watchCategory])

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
					<Stack direction="row" spacing={4} alignItems="start">
						{categories.map((category) => (
							<FormFieldWrapper
								control={control}
								name="category"
								label="category"
								hiddenLabel={true}
								style={{
									width: "fit-content"
								}}
							>
								{(() => {
									return (
										<Button
											key={category.name}
											backgroundColor={PRIMARY_BG_COLOR}
											color={BLACK}
											value={category.name}
											onClick={() => {
												setValue("category", category)
												if (afterSubmit) {
													afterSubmit();
												}
											}}
										>
											{category.name}
										</Button>
									)
								})}
							</FormFieldWrapper>
						))}
					</Stack>

				</Box>
			</Stack>
		</Stack>
	);
};
