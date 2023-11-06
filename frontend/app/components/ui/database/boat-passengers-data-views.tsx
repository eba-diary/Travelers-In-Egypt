import { HStack, IconButton, ModalBody, ModalCloseButton, ModalHeader, Stack, Table, Tbody, Text, Tr } from "@chakra-ui/react";
import React, { useMemo } from "react";
import TableView from "./tableView";
import { AiOutlineLeft } from 'react-icons/ai'
import { useRouter } from "next/router";
import { createColumnHelper } from "@tanstack/react-table";
import { join } from "lodash"

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
		columnHelper.accessor(row => {
			const dateISO = new Date(row.ship_date).toISOString()
			const dateString = new Date(row.ship_date).toString()
			return `${dateString.match(/.{3}/)}, ${dateISO.replace(/T.*/, "")}`
		}, {
			header: "Trip Date"
		}),
		columnHelper.accessor(row => {
			return row.passenger_list.passengers
		}, {
			cell(props) {
				const data = props.getValue()
				let currentRunningLength = 0;
				const MAX_NAMES_LENGTH = 75;
				const result = []
				console.log(data)
				for (const name of data) {
					console.log({
						name
					})
					if (name.length + currentRunningLength > MAX_NAMES_LENGTH) {
						break;
					}
					result.push(name)
					currentRunningLength += name.length
				}
				return (
					<div style={{ width: "300px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
						<p style={{ maxWidth: "300px" }}>{join(result, ", ")}</p>
						<p style={{ color: "gray" }}>{` +${data.length - result.length} more`}</p>
					</div>
				);
			},
			id: "passenger_list.passengers",
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
					<Tbody width="500px">
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