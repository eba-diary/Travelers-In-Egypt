import { HStack, IconButton, ModalBody, ModalCloseButton, ModalHeader, Stack, Table, Tbody, Text, Tr } from "@chakra-ui/react";
import React, { useMemo } from "react";
import { TableProps } from "../../../lib/types";
import TableView from "./tableView";
import { AiOutlineLeft } from 'react-icons/ai'
import { useRouter } from "next/router";
import { createColumnHelper } from "@tanstack/react-table";

interface Props {
	data: Ship[]
}

export interface Ship {
	id: number
	ship_name: string
	ship_date: Date,
	passenger_list: { passengers: string[] }
}

export const BoatPassengersDataViews = ({ data }: Props) => {

	const columnHelper = createColumnHelper<Ship>();
	const columns = useMemo(() => [
		columnHelper.accessor("ship_name", {
			header: "Ship Name",
		}),
		columnHelper.accessor("ship_date", {
			header: "Trip Date"
		}),
		columnHelper.accessor("passenger_list.passengers", {
			header: "Passengers"
		})
	], [data])

	const router = useRouter()
	return (
		<>
			<Stack width='100%' alignItems='center' padding='15px' gap='20px'>
				<Stack width='100%' padding='10px 0px'>
					<HStack>
						<IconButton
							aria-label="Go back to database selection"
							icon={<AiOutlineLeft />}
							onClick={() => router.back()}
							backgroundColor='#FFF'
							_hover={{
								backgroundColor: '#FFF',
								transition: '0.3s',
								transform: 'scale(1.3)'
							}}
						/>
						<Text fontSize='28px' fontWeight={700}>
							Boat Passengers Database
						</Text>
					</HStack>
					<Text p='0px 15px'>
						A brief description about the database and its contents.
					</Text>
				</Stack>
				<TableView
					data={data}
					cellAdditionalInfo={...data.map(row => row.passenger_list.passengers)}
					columns={columns}
					ModalTemplate={ModalTemplate}
				/>
			</Stack>
		</>
	)
}

function ModalTemplate({ rowProps, cellAdditionalInfo }: { rowProps: Record<string, any>, cellAdditionalInfo: any[] }) {
	return (
		<React.Fragment>
			<ModalHeader>
				{rowProps.original.ship_name}: {rowProps.original.ship_date}
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody>
				<Stack borderBottom='1px solid' margin='10px 0px' padding='5px 0px'>
					<Text fontSize='20px' fontWeight={700}>Passengers</Text>
				</Stack>
				<Table>
					<Tbody>
						{
							Array.from(
								{ length: Math.ceil(cellAdditionalInfo.length / 3) },
								(_, index) => cellAdditionalInfo.slice(index * 3, index * 3 + 3)
							).map((entry, index) => {
								return (
									<Tr key={index} backgroundColor={index % 2 === 0 ? '#FFF' : '#F3F6F9'}>
										<HStack justifyContent='space-between' padding='20px' alignItems='flex-start'>
											{entry.map((passenger, index) => <Text width='100px' key={index}>{passenger}</Text>)}
										</HStack>
									</Tr>
								)
							})
						}
					</Tbody>
				</Table>
			</ModalBody>
		</React.Fragment >
	)
}