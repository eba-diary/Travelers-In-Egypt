import { Box, Button, HStack, Icon, Stack, Text, VStack } from "@chakra-ui/react";
import { FaBookOpen } from "react-icons/fa";
import { PRIMARY_ICON_COLOR, SECONDARY_BG_COLOR, WHITE } from "../../../components/styles.config";
import { NileTravelogue } from "../../../components/ui/database/nile-travelogues-data-views";
import { usePagination } from "../../../lib/hooks/use-pagination";

const ITEMS_PER_PAGE = 10;
export const TraveloguesTableCell: React.FC<{ data: NileTravelogue[] }> = ({
	data
}) => {
	const { paginatedData, currentPage, maxPage, next, prev, jump } = usePagination(data, ITEMS_PER_PAGE);

	return (
		<Box p={4}>
			<Stack>
				<HStack alignItems="center" justifyContent="space-between" >
					<Text fontSize="lg" fontWeight={700}>Showing {currentPage}&#45;{currentPage + ITEMS_PER_PAGE - 1} of {data.length}</Text>
					<Stack direction="row" spacing={4} justifyContent="center">
						<Button onClick={prev} disabled={currentPage === 1}>Previous</Button>
						<Button onClick={next} disabled={currentPage === maxPage}>Next</Button>
					</Stack>
				</HStack>
				{paginatedData.map((item, index) => {
					const uniqueTravelers = new Set<string>();
					return (
						<HStack
							key={item.id}
							borderWidth="1px"
							borderRadius="lg"
							backgroundColor={index % 2 === 0 ? SECONDARY_BG_COLOR : WHITE}
							gap={12}
							p="16px"
							justifyContent="space-between"
							alignItems="flex-start"
						>
							<HStack alignItems="flex-start">
								<Text px={4} fontSize="22px" fontWeight={700}>{currentPage + index}</Text>
								<VStack
									alignItems="flex-start"
								>
									<Text fontWeight="bold" fontSize="xl">{item.title}</Text>
									{item.publication_traveler.map((traveler) => {
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
									<Text fontStyle="italic" w="75%" whiteSpace="normal">{item.summary}</Text>
									{item.can_read && <Text>📖 Readable on site</Text>}
								</VStack>
							</HStack>
							{item.can_read && (
								<Icon as={FaBookOpen} color={PRIMARY_ICON_COLOR} />
							)}
						</HStack>
					)
				})}
			</Stack>
			<Stack direction="row" spacing={4} mt={4} justifyContent="center">
				<Button onClick={prev} disabled={currentPage === 1}>Previous</Button>
				<Button onClick={next} disabled={currentPage === maxPage}>Next</Button>
			</Stack>
		</Box>
	)
}