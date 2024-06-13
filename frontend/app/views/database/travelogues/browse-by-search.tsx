import React, { useMemo } from 'react';
import { Box, Heading, Input, Button, Stack, Text, HStack } from '@chakra-ui/react';
import { BLACK, COMPONENT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, WHITE } from '../../../components/styles.config';
import { useForm } from 'react-hook-form';
import { FormDataByCategory } from './browse-by-category';
import { useTraveloguesFilter } from './hooks/use-travelogues-filter';
import FormFieldWrapper from '../../../components/form';
import { useRouter } from 'next/router';

interface BrowsePublicationsByCategoryProps {
	backgroundColor: "primary" | "secondary",
	afterSubmit?: () => void
}


export const BrowsePublicationsBySearch: React.FC<BrowsePublicationsByCategoryProps> = ({
	backgroundColor,
	afterSubmit
}) => {
	const _backgroundColor = useMemo(() => (
		backgroundColor === "primary" ? SECONDARY_BG_COLOR : WHITE
	), [backgroundColor])

	const router = useRouter();

	const defaultValues = {
		category: null,
		term: ""
	}

	const methods = useForm<FormDataByCategory>({
		mode: "onBlur",
		defaultValues
	})

	const {
		control,
		handleSubmit
	} = methods

	const { setFilter } = useTraveloguesFilter();

	const onSubmit = ({ term }: FormDataByCategory) => {
		setFilter((prev) => ({
			...prev,
			term
		}))

		if (afterSubmit) {
			afterSubmit();
		}
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
				<Box p={4}>
					<Heading as="h2" size="lg" mb={4}>
						Browse Publications by Search
					</Heading>
					<Text mb={4}>
						For targeted inquiries, leverage the robust search feature to pinpoint relevant information across the entire database.
					</Text>
					<Stack direction="row" spacing={4} alignItems="center">
						<form onSubmit={handleSubmit(onSubmit)}>
							<FormFieldWrapper
								control={control}
								name="term"
								label="Search"
								hiddenLabel={true}
							>
								{({ value, onChange }) => (
									<HStack>
										<Input
											backgroundColor={WHITE}
											value={value}
											onChange={onChange}
										/>
										<Button
											type="submit"
											backgroundColor={PRIMARY_BG_COLOR}
										>
											Search
										</Button>
									</HStack>
								)}
							</FormFieldWrapper>
						</form>
						{/* <Button variant="outline">Advanced Search</Button> */}
					</Stack>
				</Box>
			</Stack>
		</Stack>
	);
};
