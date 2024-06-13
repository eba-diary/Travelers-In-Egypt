import { Button, Heading, HStack, Input, Stack } from "@chakra-ui/react"
import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import FormFieldWrapper from "../../../components/form"
import { BLACK, COMPONENT_PADDING, PRIMARY_BG_COLOR, SECONDARY_BG_COLOR, SELECTED_BG_COLOR, WHITE } from "../../../components/styles.config"
import { NileTravelogue, NileTraveloguesDataViews } from "../../../components/ui/database/nile-travelogues-data-views"
import { Category, FormDataByCategory } from "./browse-by-category"
import { useTraveloguesFilter } from "./hooks/use-travelogues-filter"
import { TraveloguesTableCell } from "./travelogues-table-cell"

interface TraveloguesTableProps {
	data: NileTravelogue[],
	categories: Category[]
}

export const TraveloguesTable = ({
	data,
	categories
}: TraveloguesTableProps) => {
	return (
		<div>
			<TraveloguesSearch categories={categories} />
			<TraveloguesTableCell data={data} />
		</div>
	)
}

interface TraveloguesSearchProps {
	categories: Category[]
}
const TraveloguesSearch: FC<TraveloguesSearchProps> = ({
	categories
}) => {
	const { setFilter, filter } = useTraveloguesFilter();

	const defaultValues = {
		category: filter?.category ?? null,
		term: filter?.term ?? ""
	}

	const methods = useForm<FormDataByCategory>({
		mode: "onBlur",
		defaultValues
	})

	const {
		control,
		watch,
		setValue,
		handleSubmit
	} = methods

	const watchCategory = watch("category")

	const onSubmit = ({ term }: FormDataByCategory) => {
		setFilter((prev) => ({
			...prev,
			term
		}))
	}

	useEffect(() => {
		if (watchCategory) {
			setFilter((prev) => ({
				...prev,
				category: watchCategory
			}))
		}
	}, [control, watch, watchCategory])

	console.log({
		filter
	})

	return (
		<Stack
			width="100%"
			backgroundColor={SECONDARY_BG_COLOR}
			padding={COMPONENT_PADDING}
			alignItems="center"
		>
			<Stack
				width={{ base: "full", md: "3xl", lg: "4xl", xl: "7xl" }}
				gap={COMPONENT_PADDING}
			>
				<Heading>Travelers In Egypt Database</Heading>
				<HStack w="100%" gap={COMPONENT_PADDING}>
					<HStack flex={2} gap={COMPONENT_PADDING}>
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
											key={category}
											backgroundColor={
												filter?.category?.includes(category) ? SELECTED_BG_COLOR : PRIMARY_BG_COLOR
											}
											color={
												filter?.category?.includes(category) ? WHITE : BLACK}
											value={category}
											onClick={() => {
												if (filter?.category && filter.category === category) {
													setFilter((prev) => ({
														...prev,
														category: null
													}))
													setValue("category", null)
													return;
												}
												setValue("category", category)

											}}
										>
											{category}
										</Button>
									)
								})}
							</FormFieldWrapper>
						))}
					</HStack>
					<Stack flex={2}>
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
					</Stack>
				</HStack>
			</Stack>
		</Stack>
	)
}