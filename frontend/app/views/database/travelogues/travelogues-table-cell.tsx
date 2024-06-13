import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { NileTravelogue } from "../../../components/ui/database/nile-travelogues-data-views";
import { usePagination } from "../../../lib/hooks/use-pagination";

const ITEMS_PER_PAGE = 10;
export const TraveloguesTableCell: React.FC<{ data: NileTravelogue[] }> = ({
	data
}) => {
	console.log({
		data
	})
	const { paginatedData, currentPage, maxPage, next, prev, jump } = usePagination(data, ITEMS_PER_PAGE);
	return (
		<Box p={4}>
			<Stack spacing={4}>
				{paginatedData.map((item) => (
					<Box key={item.id} p={4} borderWidth="1px" borderRadius="lg">
						<Text fontWeight="bold" fontSize="xl">{item.title}</Text>
						<Text>{item.summary}</Text>
						{item.publication_traveler.map((traveler) => (
							<Text key={traveler.id}>
								{traveler.traveler.traveler_name} ({traveler.traveler.traveler_type})
							</Text>
						))}
						{item.can_read && <Text>📖 Readable on site</Text>}
					</Box>
				))}
			</Stack>
			<Stack direction="row" spacing={4} mt={4} justifyContent="center">
				<Button onClick={prev} disabled={currentPage === 1}>Previous</Button>
				<Button onClick={next} disabled={currentPage === maxPage}>Next</Button>
			</Stack>
		</Box>
	)
}