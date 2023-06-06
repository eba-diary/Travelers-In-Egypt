import { HStack, IconButton, ModalBody, ModalCloseButton, ModalHeader, Stack, Table, Tbody, Text, Tr } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { TableProps } from '../../../lib/types'
import TableView from './tableView'

export interface TraveloguesTable extends TableProps {
    rows: {
        id: number
        Publications: Publications,
        Travelers: Travelers
    }[]
}

export interface Publications {
    title: string
    summary: string
    can_read: boolean
    publications_id: number
}

export interface Travelers {
    travelers_name: string
    travelers_type: string
    travelers_id: number
}

interface Props {
    data: TraveloguesTable
}

function truncateText(value: string) {
    return value.slice(0, 45) + '...'
}
export default function NileTraveloguesDataViews({ data }: Props) {

    const router = useRouter()

    const columns = [
        {
            Header: 'Id',
            accessor: 'id'
        },
        {
            Header: 'Publications',
            accessor: 'Publications.title',
            Cell: ({ value }: { value: string }) => truncateText(value)
        },
        {
            Header: 'Travelers',
            accessor: 'Travelers.travelers_name'
        },
        {
            Header: 'Type',
            accessor: 'Travelers.travelers_type'
        },
        {
            Header: 'can read',
            accessor: 'Publications.can_read'
        }
    ]

    return (
        <Stack width='100%' alignItems='center' padding='15px' gap='20px'>
            <Stack width='100%' padding='10px 0px' borderBottom='1px solid'>
                <HStack>
                    <IconButton
                        aria-label="Go back to database selection"
                        icon={<AiOutlineLeft />}
                        onClick={() => router.back()}
                    />
                    <Text fontSize='28px' fontWeight={700}>
                        Nile Travelogues Database
                    </Text>
                </HStack>
                <Text>
                    A brief description about the database and its contents.
                </Text>
            </Stack>
            <TableView
                data={{
                    rows: data.rows.map(row => ({
                        id: row.id,
                        Publications: row.Publications,
                        Travelers: row.Travelers
                    }))
                }}
                cellAdditionalInfo={data.rows.map((row) => {
                    return {
                        publications_id: row.Publications.publications_id,
                        travelers_id: row.Travelers.travelers_id,
                        summary: row.Publications.summary
                    }
                })}
                columns={columns}
                ModalTemplate={ModalTemplate}
            />
        </Stack>
    )
}

function ModalTemplate({ rowProps, cellAdditionalInfo }: { rowProps: Record<string, any>, cellAdditionalInfo: any[] }) {
    return (
        <React.Fragment>
            <ModalHeader>
                {rowProps.values.ship_name}: {rowProps.values.ship_date}
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