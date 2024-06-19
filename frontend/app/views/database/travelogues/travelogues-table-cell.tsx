import { Box, Button, HStack, Icon, Stack, Text, VStack, Input, Select } from "@chakra-ui/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { PRIMARY_BG_COLOR, PRIMARY_ICON_COLOR, SECONDARY_BG_COLOR, WHITE } from "../../../components/styles.config";
import { NileTravelogue } from "../../../components/ui/database/nile-travelogues-data-views";
import { usePagination } from "../../../lib/hooks/use-pagination";
import { useState } from "react";
import { FaBookOpen } from "react-icons/fa6";

const DEFAULT_ITEMS_PER_PAGE = 10;

export const TraveloguesTableCell: React.FC<{ data: NileTravelogue[] }> = ({ data }) => {
	const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE);
	const { paginatedData, currentPage, maxPage, next, prev, jump } = usePagination(data, itemsPerPage);

	const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setItemsPerPage(Number(event.target.value));
	};

	const handlePageJump = (event: React.ChangeEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
		const pageNumber = Number(event.currentTarget.value);
		if (pageNumber >= 1 && pageNumber <= maxPage) {
			jump(pageNumber);
		}
	};

	const renderPaginationButtons = () => {
		const paginationRange = 7;
		let startPage = Math.max(1, currentPage - Math.floor(paginationRange / 2));
		let endPage = Math.min(maxPage, startPage + paginationRange - 1);

		if (endPage - startPage < paginationRange - 1) {
			startPage = Math.max(1, endPage - paginationRange + 1);
		}

		const pages = [];
		for (let i = startPage; i <= endPage; i++) {
			const isActive = i === currentPage;
			pages.push(
				<Button
					key={i}
					onClick={() => jump(i)}
					disabled={isActive}
					bg={isActive ? PRIMARY_BG_COLOR : SECONDARY_BG_COLOR}
				>
					{i}
				</Button>
			);
		}
		return pages;
	};

	return (
		<Box p={4}>
			<Stack>
				<HStack alignItems="center" justifyContent="space-between">
					<Text fontSize="lg" fontWeight={700}>
						Showing {(currentPage - 1) * itemsPerPage + 1}&#45;{Math.min(currentPage * itemsPerPage, data.length)} of {data.length}
					</Text>
					<Stack alignItems="flex-end">
						<HStack>
							<Select value={itemsPerPage} onChange={handleItemsPerPageChange} width="auto">
								{[10, 20, 30, 50].map(size => (
									<option key={size} value={size}>
										{size} items per page
									</option>
								))}
							</Select>
							<Input
								type="number"
								placeholder="Jump to page"
								onBlur={handlePageJump}
								onKeyDown={(event) => {
									if (event.key === "Enter") {
										handlePageJump(event)
									}
								}}
								width="auto"
							/>
						</HStack>
						<Stack direction="row" spacing={4} mt={4} justifyContent="center">
							<Button onClick={prev} disabled={currentPage === 1} backgroundColor="transparent">
								<Icon as={FaArrowLeft} />
							</Button>
							{renderPaginationButtons()}
							<Button onClick={next} disabled={currentPage === maxPage} backgroundColor="transparent">
								<Icon as={FaArrowRight} />
							</Button>
						</Stack>
					</Stack>
				</HStack>
				{paginatedData.map((item, index) => {
					const uniqueTravelers = new Set<string>();
					return (
						<HStack
							key={item.id}
							height="175px"
							maxHeight="175px"
							borderWidth="1px"
							borderRadius="lg"
							backgroundColor={index % 2 === 0 ? SECONDARY_BG_COLOR : WHITE}
							gap={12}
							p="16px"
							justifyContent="space-between"
							alignItems="flex-start"
						>
							<HStack alignItems="flex-start">
								<Text px={4} fontSize="22px" fontWeight={700}>
									{(currentPage - 1) * itemsPerPage + index + 1}
								</Text>
								<VStack alignItems="flex-start">
									<Text fontWeight="bold" fontSize="xl" noOfLines={1}>
										{item.title}
									</Text>
									{item.publication_traveler.map(traveler => {
										if (uniqueTravelers.has(traveler.traveler.traveler_name)) {
											return null;
										}
										uniqueTravelers.add(traveler.traveler.traveler_name);
										return (
											<Text key={traveler.id}>
												{traveler.traveler.traveler_name} ({traveler.traveler.traveler_type})
											</Text>
										);
									})}
									<Text fontStyle="italic" w="75%" whiteSpace="normal" noOfLines={3}>
										{item.summary}
									</Text>
									{item.can_read && <Text>📖 Readable on site</Text>}
								</VStack>
							</HStack>
							{item.can_read && <Icon as={FaBookOpen} color={PRIMARY_ICON_COLOR} />}
						</HStack>
					);
				})}
			</Stack>
			<Stack direction="row" spacing={4} mt={4} justifyContent="center">
				<Button onClick={prev} disabled={currentPage === 1} backgroundColor="transparent">
					<Icon as={FaArrowLeft} />
				</Button>
				{renderPaginationButtons()}
				<Button onClick={next} disabled={currentPage === maxPage} backgroundColor="transparent">
					<Icon as={FaArrowRight} />
				</Button>
			</Stack>
		</Box>
	);
};
