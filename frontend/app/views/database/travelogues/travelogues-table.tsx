import { Button, Heading, HStack, Icon, Input, Stack, Text } from "@chakra-ui/react"
import { isDate, parseISO } from "date-fns"
import Fuse from "fuse.js"
import { FC, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { FaArrowDown, FaArrowUp, FaBookOpen } from "react-icons/fa"
import FormFieldWrapper from "../../../components/form"
import { BLACK, COMPONENT_PADDING, PRIMARY_BG_COLOR, PRIMARY_ICON_COLOR, SECONDARY_BG_COLOR, SELECTED_BG_COLOR, WHITE } from "../../../components/styles.config"
import { NileTravelogue } from "../../../components/ui/database/nile-travelogues-data-views"
import { Category, FormDataByCategory } from "./browse-by-category"
import { useTraveloguesFilter } from "./hooks/use-travelogues-filter"
import { TraveloguesTableCell } from "./travelogues-table-cell"

interface TraveloguesTableProps {
	data: NileTravelogue[],
	categories: Category[]
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
		return sortedResult
	}, [filter.term, unfilteredData]);
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
					<Heading size="md"> Browsing Publications {filter?.category && `By ${filter.category}`} </Heading>
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
	categories: Category[]
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
									const isCurrentlyFiltered = filter.category?.name?.includes(category)
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
												key={category}
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
												value={category}
												onClick={() => {
													if (filter?.category && filter.category?.name === category) {
														setFilter((prev) => ({
															...prev,
															category: {
																name: category,
																method: findNextSortingStep({ method: watchCategory.method })
															}
														}))
														setValue("category", { name: category, method: findNextSortingStep({ method: watchCategory.method }) })
														return;
													}
													setValue("category", {
														name: category,
														method: "asc"
													})

												}}
											>
												{category}
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

const findNextSortingStep = ({
	method
}: {
	method: "asc" | "desc" | "none"
}): "asc" | "desc" | "none" => {
	switch (method) {
		case "asc":
			return "desc"
		case "desc":
			return "none"
		case "none":
			return "asc"
		default:
			return "none"
	}
}

const sortData = (data: NileTravelogue[], attribute: Category, method: "asc" | "desc" | "none") => {
	if (method === "none" || !attribute) return data;

	const key: keyof NileTravelogue = (() => {
		switch (attribute) {
			case "Title":
				return "title"
			case "Traveler":
				return "publication_traveler"
		}
	})()

	return data.sort((a, b) => {
		const aValue = a[attribute as keyof NileTravelogue];
		const bValue = b[attribute as keyof NileTravelogue];

		if (aValue < bValue) {
			return method === "asc" ? -1 : 1;
		}
		if (aValue > bValue) {
			return method === "asc" ? 1 : -1;
		}
		return 0;
	});
};
