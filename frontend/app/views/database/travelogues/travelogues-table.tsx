import { Button, Heading, HStack, Icon, Input, Stack, Text } from "@chakra-ui/react"
import { isDate, parseISO } from "date-fns"
import Fuse from "fuse.js"
import { FC, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { FaArrowDown, FaArrowUp, FaBookOpen } from "react-icons/fa"
import FormFieldWrapper from "../../../components/form"
import { BLACK, COMPONENT_PADDING, PRIMARY_BG_COLOR, PRIMARY_ICON_COLOR, SECONDARY_BG_COLOR, SELECTED_BG_COLOR, WHITE } from "../../../components/styles.config"
import { NileTravelogue, PublicationTraveler } from "../../../components/ui/database/nile-travelogues-data-views"
import { CategoryFilter, FormDataByCategory } from "./browse-by-category"
import { useTraveloguesFilter } from "./hooks/use-travelogues-filter"
import { TraveloguesTableCell } from "./travelogues-table-cell"
import { findNextSortingStep, sortData } from "./utils/sort"

interface TraveloguesTableProps {
	data: NileTravelogue[],
	categories: CategoryFilter[]
}

export const TraveloguesTable = ({
	data: unfilteredData,
	categories
}: TraveloguesTableProps) => {
	const { filter } = useTraveloguesFilter();

	const data = useMemo(() => {
		if (filter.term === "") {
			return unfilteredData;
		}

		const { method, name } = filter.category
		const options = {
			keys: ['title', 'summary', 'publication_traveler.traveler.traveler_name'],
			threshold: 0.15
		};
		const fuse = new Fuse(unfilteredData, options);
		const result = fuse.search(filter.term);
		const filteredResult = result.map(res => res.item);
		const sortedResult = sortData(filteredResult, name, method);
		console.log({
			sortedResult
		})
		return sortedResult
	}, [filter, unfilteredData, categories]);
	return (
		<div>
			<TraveloguesSearch categories={categories} />
			<Stack
				width="100%"
				backgroundColor={WHITE}
				padding={COMPONENT_PADDING}
				alignItems="center"
			>
				<Stack
					width={{ base: "full", md: "3xl", lg: "4xl", xl: "7xl" }}
				>
					<Heading size="md"> Browsing Publications {filter?.category?.name && filter?.category?.method !== "none" && `By ${filter.category.name}`} </Heading>
					<HStack>
						<Icon as={FaBookOpen} color={PRIMARY_ICON_COLOR} />
						<Text>indicates publication can be read on this site</Text>
					</HStack>
					<TraveloguesTableCell data={data} />
				</Stack>
			</Stack>
		</div>
	)
}

interface TraveloguesSearchProps {
	categories: CategoryFilter[]
}
const TraveloguesSearch: FC<TraveloguesSearchProps> = ({
	categories
}) => {
	const { setFilter, filter } = useTraveloguesFilter();

	const defaultValues = {
		category: filter?.category,
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

	const onSubmit = async ({ term }: FormDataByCategory) => {
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
								key={category.name}
								control={control}
								name="category"
								label="category"
								hiddenLabel={true}
								style={{
									width: "fit-content"
								}}
							>
								{(() => {
									const isCurrentlyFiltered = filter.category?.name?.includes(category.name)
									const isNotInactiveFilter = filter.category?.method !== "none"
									return (
										<HStack
											backgroundColor={
												isCurrentlyFiltered && isNotInactiveFilter ? SELECTED_BG_COLOR : PRIMARY_BG_COLOR
											}
											color={
												isCurrentlyFiltered && isNotInactiveFilter ? WHITE : BLACK
											}
											borderRadius="5px"
											px="2px"
											gap="2px"
										>
											<Button
												isDisabled={category.name === "Decade" || category.name === "Traveler"}
												key={category.name}
												backgroundColor={
													isCurrentlyFiltered && isNotInactiveFilter ? SELECTED_BG_COLOR : PRIMARY_BG_COLOR
												}
												color={
													isCurrentlyFiltered && isNotInactiveFilter ? WHITE : BLACK
												}
												_hover={{
													backgroundColor: isCurrentlyFiltered && isNotInactiveFilter ? SELECTED_BG_COLOR : PRIMARY_BG_COLOR,
													color: isCurrentlyFiltered && isNotInactiveFilter ? WHITE : BLACK
												}}
												value={category.name}
												onClick={() => {
													if (filter?.category && filter.category?.name === category.name) {
														setFilter((prev) => ({
															...prev,
															category: {
																name: category.name,
																method: findNextSortingStep({ method: watchCategory.method })
															}
														}))
														setValue("category", { name: category.name, method: findNextSortingStep({ method: watchCategory.method }) })
														return;
													}
													setValue("category", {
														name: category.name,
														method: "asc"
													})

												}}
											>
												{category.name}
											</Button>
											{isCurrentlyFiltered && filter.category?.method === "asc" && (
												<Icon as={FaArrowUp} mx="2px" />
											)}
											{isCurrentlyFiltered && filter.category?.method === "desc" && (
												<Icon as={FaArrowDown} mx="2px" />
											)}
										</HStack>
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
											value={value as string}
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