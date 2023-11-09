import { HStack, Icon, IconButton, ModalBody, ModalCloseButton, ModalHeader, Stack, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import TableView from './tableView'
import { capitalize } from "lodash"
import { FcCancel, FcApproval } from "react-icons/fc"
import { Row } from 'react-table'
import { CollapsibleSidebarProvider } from '../../../lib/hooks/context/useCollapsibleSidebar'
import { Sidebar } from './sidebar/sidebar'

export interface NileTravelogue extends Publication {
	id: number
	publication_traveler: PublicationTraveler[]
}

export interface PublicationTraveler {
	id: string
	publication_id: string
	traveler_id: string
	traveler: Traveler
}

export interface Publication {
	title: string
	summary: string
	can_read: boolean
	publications_id: number
}

export interface Traveler {
	traveler_name: string
	traveler_type: "AUTHOR" | "ILLUSTRATOR"
}

interface Props {
	data: NileTravelogue[]
}

export const NileTraveloguesDataViews = ({ data }: Props) => {
	const router = useRouter()

	const truncateText = (value: string, maxChar = 35) => {
		if (value.length <= maxChar) return value
		return value.slice(0, maxChar) + '...'
	}
	const columnHelper = createColumnHelper<NileTravelogue>()
	const columns = useMemo(() => [
		columnHelper.accessor(row => {
			return truncateText(row.title)
		}, {
			id: "publication.title",
			header: "Pub. Title"
		}),
		columnHelper.accessor(row => {
			return truncateText(row.summary)
		}, {
			id: "publication.summary",
			header: "Summary"
		}),
		columnHelper.accessor(row => {
			// if typing in the full title as a string, cannot guarentee type safety
			return row
		}, {
			cell(props) {
				const data = props.getValue()
				const firstTwoTravelerName = data.publication_traveler.slice(0, 2)
				const remainingLength = firstTwoTravelerName.length <= 2 ? 0 : data.publication_traveler.length - 2
				return (
					<div style={{ display: "flex", flexDirection: "column", padding: "2px", gap: "2px" }}>
						{firstTwoTravelerName.map(row => (
							<div>
								<Text>{truncateText(row.traveler.traveler_name, 20)}</Text>
							</div>
						))}
						<div>
							{remainingLength > 0 && (
								<p>...+{remainingLength} more</p>
							)}
						</div>
					</div>
				)
			},
			id: "publication_traveler.traveler_name",
			header: "Traveler(s)"
		}),
		columnHelper.accessor(row => {
			return row
		}, {
			cell(props) {
				const data = props.getValue()
				const firstTwoTravelerTypes = data.publication_traveler.slice(0, 2)
				const remainingLength = firstTwoTravelerTypes.length <= 2 ? 0 : data.publication_traveler.length - 2
				return (
					<div style={{ display: "flex", flexDirection: "column", padding: "2px", gap: "2px" }}>
						{firstTwoTravelerTypes.map(row => (
							<div style={{ padding: "0px 5px" }}>
								<Text>{capitalize(row.traveler.traveler_type)}</Text>
							</div>
						))}
						<div>
							{remainingLength > 0 && (
								<p>...+{remainingLength} more</p>
							)}
						</div>
					</div>
				)
			},
			id: "publication_traveler.traveler_type",
			header: "Contributed As"
		}),
		columnHelper.accessor(row => {
			return row.can_read
		}, {
			cell(props) {
				const canRead = props.getValue()
				return (
					<div style={{ width: "100%", padding: "0px 5px" }}>
						{canRead ? <Icon as={FcApproval} /> : <Icon as={FcCancel} />}
					</div>
				)
			},
			id: "can_read",
			header: "Can Read"
		})
	], [data])

	return (
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
					<Text fontSize='28px' fontWeight={700} p='0px 15px'>
						Nile Travelogues Database
					</Text>
				</HStack>
			</Stack>
			<CollapsibleSidebarProvider>
				<TableView
					data={data}
					columns={columns}
				>
					{(props) => {
						return (
							<Sidebar
								{...props}
							>
								{({ original: { title, summary, can_read, publication_traveler } }: Row<NileTravelogue>) => {
									return (
										<Stack width="100%" maxHeight="1000px" overflowY="scroll" padding="8px">
											<Stack width="100%" borderBottom="1px solid #555">
												<HStack width="100%" justifyContent="space-between">
													<Text
														fontSize={{ base: "20px" }}
														fontWeight={700}
													>
														{title}
													</Text>
													<Text fontSize="sm" fontStyle="italic" color="red.600">
														{!can_read && "Currently not available"}
													</Text>
												</HStack>
												<Text color="#555" fontStyle="italic">
													{publication_traveler.map((pt, index) => {
														const traveler = pt.traveler
														return (
															<>
																{traveler.traveler_type === "AUTHOR" && index === 0 ? `By ${traveler.traveler_name}` :
																	traveler.traveler_type !== "ILLUSTRATOR" ? ` and ${traveler.traveler_name}`
																		: index === 0 ? `Illustrated By ${traveler.traveler_name}` : `and ${traveler.traveler_name}`}
															</>
														)
													})}
												</Text>
											</Stack>
											<Stack>
												<Text
													fontSize={{ base: "18px" }}
													fontWeight={500}
												>
													Summary
												</Text>
												<Text>
													{summary}
												</Text>
											</Stack>
										</Stack>
									)
								}}
							</Sidebar>
						)
					}}
				</TableView>
			</CollapsibleSidebarProvider>
		</Stack>
	)
}