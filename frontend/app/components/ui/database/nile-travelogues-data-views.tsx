import { HStack, Icon, IconButton, ModalBody, ModalCloseButton, ModalHeader, Stack, Text } from '@chakra-ui/react'
import { createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import TableView from './tableView'
import { capitalize } from "lodash"
import { FcCancel, FcApproval } from "react-icons/fc"

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
						<Text fontSize='28px' fontWeight={700} p='0px 15px'>
							Nile Travelogues Database
						</Text>
					</HStack>
				</Stack>
				<TableView
					data={data}
					cellAdditionalInfo={...data.map(row => row)}
					columns={columns}
					ModalTemplate={ModalTemplate}
				/>
			</Stack>
		</>
	)
}

function ModalTemplate({ rowProps, cellAdditionalInfo }: { rowProps: Record<string, any>, cellAdditionalInfo: any }) {
	return (
		<React.Fragment>
			<ModalHeader>
				&quot;{rowProps.original.Publications.title}&quot;
			</ModalHeader>
			<ModalCloseButton />
			<ModalBody paddingBottom='20px'>
				<Stack padding='15px 0px'>
					{cellAdditionalInfo.Travelers.info.map((entry: { travelers_name: string, travelers_type: string, travelers_id: number }, index: number) => (
						<Text key={index}>
							<span style={{ fontWeight: 600 }}>{entry.travelers_type}:</span> {entry.travelers_name}
						</Text>
					))}
					<Text>
						<span style={{ fontWeight: 600 }}>Can Read:</span> {cellAdditionalInfo.Publications.can_read}
					</Text>
					{cellAdditionalInfo.Publications.can_read ? (
						<Link href='/'>
							<Text
								border='1px solid'
								width='fit-content'
								padding='0px 15px'
								borderRadius='5px'
								fontWeight={600}
								_hover={{
									backgroundColor: '#EEE',
									transition: '0.3s',
									cursor: 'pointer'
								}}
							>
								View
							</Text>
						</Link>
					) : (
						''
					)}
				</Stack>
				<Stack borderBottom='1px solid' margin='10px 0px' padding='5px 0px'>
					<Text fontSize='20px' fontWeight={700}>Summary</Text>
				</Stack>
				<Text>
					{cellAdditionalInfo.Publications.summary}
				</Text>
			</ModalBody>
		</React.Fragment >
	)
}