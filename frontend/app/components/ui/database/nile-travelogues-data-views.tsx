import { HStack, IconButton, ModalBody, ModalCloseButton, ModalHeader, Stack, Table, Tbody, Text, Tr } from '@chakra-ui/react'
import { ColumnDef, createColumnHelper } from '@tanstack/react-table'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineLeft } from 'react-icons/ai'
import { ExtensibleTableField, TableProps } from '../../../lib/types'
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

export default function NileTraveloguesDataViews({ data }: Props) {
    const router = useRouter()

    const truncateText = (value: string) => {
        return value.slice(0, 35) + '...'
    }

    const columns: ColumnDef<ExtensibleTableField>[] = [
        {
            header: 'Id',
            accessorKey: 'id'
        },
        {
            header: 'Publications',
            accessorKey: 'Publications.title',
            cell(props) {
                const value = props.getValue() as unknown as string
                return <>{truncateText(value)}</>
            },

        },
        {
            header: 'Travelers',
            accessorKey: 'Travelers.travelers_name',
            cell(props) {
                const value = props.getValue() as unknown as string[]
                return (
                    <Stack>
                        {value.map((entry, index) => (
                            <Text key={index}>{entry}</Text>
                        ))}
                    </Stack>
                )
            }
        },
        {
            header: 'Type',
            accessorKey: 'Travelers.info',
            cell(props) {
                const value = props.getValue() as unknown as Travelers[]
                return (
                    <Stack>
                        {value.map((entry, index) => (
                            <Text key={index}>{entry.travelers_type}</Text>
                        ))}
                    </Stack>
                )
            }
        },
        {
            header: 'can read',
            accessorKey: 'Publications.can_read'
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
                cellAdditionalInfo={[...data.rows]}
                columns={columns}
                ModalTemplate={ModalTemplate}
            />
        </Stack>
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